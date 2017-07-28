---
layout: post
title: "Don't block the GUI: Dealing with long-running tasks using a SwingWorker"
date: 2017-07-13
comments: true
---

Swing is not thread-safe. Because of this, you can update the GUI from only the event dispatch thread, and not any other thread, otherwise unwanted behavior may result. If you can update the GUI from only the event dispatch thread, how do you handle long-running tasks that may lock up this thread, freezing the GUI?

This post explains how, using a simple counter GUI for demonstration purposes.

### Types of threads in Swing

There are three types of threads in Swing: 

- **initial thread** — where the program starts.
- **event dispatch thread** — where all the code that interacts with the GUI is executed. 
- **worker thread (background thread)** — where long-running tasks are executed.

You don't need to explicitly create these threads; they are provided by the runtime or the Swing framework. You just utilize these threads to create a responsive, maintainable Swing program.

### A Swing program runs on the event dispatch thread

Like other standard Java programs, a Swing program starts on the initial thread. The initial thread could simply create the GUI itself, but this isn't recommended. For a Swing program, the initial thread's recommended job is to "create a Runnable object that initializes the GUI and schedule that object for execution on the event dispatch thread" [(Oracle)](https://docs.oracle.com/javase/tutorial/uiswing/concurrency/initial.html).

To do this job, invoke `SwingUtilities.invokeLater`. Executing on the event dispatch thread, this method asynchronously invokes the Runnable object you pass to it, taking into consideration that the thread may be busy at the time.

```java
package counter;

import javax.swing.SwingUtilities;

public class Main {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                CounterView view = new CounterView();
                view.activate();
            }
        });
    }
}
```

### Don't block the GUI by putting long-running tasks on the event dispatch thread 

"Once the GUI is created, the program is primarily driven by GUI events, each of which causes the execution of a short task on the event dispatch thread" [(Oracle)](https://docs.oracle.com/javase/tutorial/uiswing/concurrency/initial.html). 

All of the tasks that you perform on the event dispatch thread should be instantaneous. Long-running tasks should not happen on this thread.

The following code builds the counter GUI, but the "Start counter" button action listener executes a long-running task *on* the event dispatch thread.

```java
package counter;

import java.awt.BorderLayout;
import javax.swing.JPanel;
import javax.swing.JFrame;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.SwingWorker;
import javax.swing.SwingConstants;
import java.awt.event.*;

public class CounterView {
    private JFrame frame;
    private JPanel gui;
    private JButton button;
    private JLabel count;

    public CounterView() {
        customizeFrame();
        createMainPanel();
        createCountText();
        createButton();
        addComponentsToFrame();
        frame.setVisible(true);
    }

    private void customizeFrame() {
        frame = new JFrame();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    private void createMainPanel() {
        gui = new JPanel();
        gui.setLayout(new BorderLayout());
    }

    private void createCountText() {
        count = new JLabel("0");
        count.setHorizontalAlignment(SwingConstants.CENTER);
    }

    private void createButton()  {
        button = new JButton("Start counter");
        button.addActionListener(new ActionListener() {
            /* 
             * This task will freeze the GUI because it is a long-running
             * task happening on the event dispatch thread
             */
            public void actionPerformed(ActionEvent e) {
                try {
                    for (int i = 0; i <= 50; i++) {
                        Thread.sleep(100);
                        System.out.println(i);
                        count.setText(Integer.toString(i));
                    }
                } catch (Exception error) { 
                    System.out.println(error);
                }
            }
        });
    }

    private void addComponentsToFrame() {
        gui.add(count, BorderLayout.CENTER);
        gui.add(button, BorderLayout.SOUTH);
        frame.add(gui);
        frame.pack();
    }
}
```

![frozen gui](/assets/07-13-17/frozen_gui.gif){: .center-image}

As the GIF shows, the GUI has frozen. Because there is a long-running task happening on the event dispatch thread, I am unable to resize the window or do anything with the GUI until the task has completed.

### How to handle long-running tasks

To avoid blocking the GUI, move a long-running task to another thread, the worker thread. 

Since you can update the GUI from only the event dispatch thread, you need to faciliate communication between the worker thread and the event dispatch thread. The easiest way to do this in Swing is to use the `javax.swing.SwingWorker` class, which runs a task on a worker thread and manages the interthread communication. 

In the following code edit, the "Start counter" button action listener creates and executes an instance of `SwingWorker` from the event dispatch thread. When the user presses the button, the worker object launches a worker thread and runs the task on it, leaving the event dispatch thread unblocked.

```java
private void createButton()  {
    button = new JButton("Start counter");
    button.addActionListener(new ActionListener() {
        /* 
         * This long-running task doesn't freeze the GUI because it is 
         * happening on a worker thread, not the event dispatch thread
         */
        public void actionPerformed(ActionEvent e) {
            // Create the worker
            SwingWorker<Void, Void> worker = new SwingWorker<Void, Void>() {

                @Override
                protected Void doInBackground() throws InterruptedException {
                    for (int i = 0; i <= 50; i++) {
                        Thread.sleep(100);
                        System.out.println(i);
                        count.setText(Integer.toString(i));
                    }

                    return null;
                }
            };

            button.setEnabled(false);
            // Start the worker
            worker.execute();
            button.setEnabled(true); 
        }
    });
}
```

![unfrozen gui](/assets/07-13-17/unfrozen_gui.gif){: .center-image}

As the GIF shows, the GUI does not freeze, because the long-running task has been moved to a worker thread. 

Note about `SwingWorker`: Each long-running task gets its own `SwingWorker` worker, and each worker can be used only once. 

*Note about the GIFs: The GIFs don't show the button becoming disabled after the click, because this edit occurred after the GIFs' creation.*

### Troubleshooting

If you need to determine whether your code is running on the event dispatch thread, invoke `javax.swing.SwingUtilities.isEventDispatchThread`.
