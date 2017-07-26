---
layout: post
title: Building a simple Swing GUI using the MVC design pattern
date: 2017-06-28
comments: true
---

I’m learning how to build a simple Swing GUI in Java using the MVC design pattern.

*Note: I'm unsure if MVC is the correct name for the design pattern. I see conflicting explanations. Some say it is MVC. Some say that it's PAC, what inexperienced programmers accidentally ended up with when they tried to implement MVC. Some say that since a web application doesn't map nicely to either MVC or PAC, it's a sort of hybrid pattern. When I figure this out, I'll edit the post.*

### What is MVC?

Model-View-Controller (MVC) is a pattern for organizing code in applications that implement user interfaces. MVC achieves its organization by separating the application code into three components: the Model, the View, and the Controller. 

<u>Components:</u>

**Model** — contains the data and the methods needed to manipulate the data. 

**View** — contains the interface that the outside world sees and interacts with. 

**Controller** — coordinates interactions between the Model and the View.

<u>Interactions between the components:</u>

![mvc diagram of interactions](/assets/06-28-17/mvc.png){: .center-image}

The key to the MVC pattern is the *direction* in which instructions flow. The View and the Model are both "dumb"; they don't know about the existence of anything outside of themselves. Neither component ever sends instructions out. The Controller is the master; it is in command of everything. All instructions flow from it. 

Although the View and Model don't send instructions, they can notify the Controller in event-driven systems when information changes. The Controller listens for such notifications and defines the actions that the View and Model will execute in response. It does this by defining and passing listeners to the View and Model, which should provide methods that take the listeners as parameters and attach them to the appropriate objects.

This separateness makes for maintainable code, since the programmer can go in to change only one part, without breaking apart the entire program. 

In fact, the test of a true MVC design is whether the program is fully functional even without the View and Controller. Yes, the outside world probably will have trouble interacting with the program in that form, but as long as one knows the Model's API, the program should hold and manipulate data as it would with a View and Controller. 

### A simple Swing GUI that uses the MVC design pattern

Following Derek Banas' [YouTube tutorial](https://www.youtube.com/watch?v=dTVVa2gfht8), I built a simple calculator with Swing and MVC that lets the user enter two numbers, press a button to add the numbers, and view the sum.

![Derek Banas' calculator](/assets/06-28-17/derek banas mvc.png){: .center-image}

The package structure:

```
mvc_tutorial
    |_ MVCCalculator.java   
    |_ CalculatorModel.java 
    |_ CalculatorView.java
    |_ CalculatorController.java  
```

`CalculatorModel.java` contains the model, `CalculatorView.java` the view, and `CalculatorController.java` the controller. `MVCCalculator.java` launches the program.

MVCCalculator.java:

```java
package mvc_tutorial;

/**
 * 
 * Runs the MVC. 
 *
 */
public class MVCCalculator {
    public static void main(String[] args) {
        // Create the View
        CalculatorView theView = new CalculatorView();
        // Create the Model
        CalculatorModel theModel = new CalculatorModel();
        // Create the Controller
        CalculatorController theController = new CalculatorController(theView, theModel);
        // Show the view on the screen
        theView.setVisible(true);
    }
}
```

CalculatorModel.java:

```java
package mvc_tutorial;

/**
 * 
 * Contains the data and the methods needed to manipulate the data.
 *
 */
public class CalculatorModel {
    // The sum of the numbers entered in the view
    private int calculationValue;
    
    // Perform a calculation
    public void addTwoNumbers(int firstNumber, int secondNumber) {
        calculationValue = firstNumber + secondNumber;
    }
    
    // Provide access to data
    public int getCalculation() {
        return calculationValue;
    }
}
```

CalculatorView.java:

```java
package mvc_tutorial;

import java.awt.event.ActionListener;
import javax.swing.*;

/**
 * 
 * Contains the interface (GUI) that the outside world sees and interacts with.
 *
 */
public class CalculatorView extends JFrame {
    private JTextField firstNumber = new JTextField(10);
    private JLabel additionLabel = new JLabel("+");
    private JTextField secondNumber = new JTextField(10);
    private JButton calculateButton = new JButton("Calculate");
    private JTextField calcSolution = new JTextField(10);
    
    // Set up the view and add the components
    CalculatorView() {
        JPanel calcPanel = new JPanel();
        
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setSize(600, 200);
        
        calcPanel.add(firstNumber);
        calcPanel.add(additionLabel);
        calcPanel.add(secondNumber);
        calcPanel.add(calculateButton);
        calcPanel.add(calcSolution);
        
        this.add(calcPanel);
    }
    
    public int getFirstNumber() {
        return Integer.parseInt(firstNumber.getText());
    }
    
    public int getSecondNumber() {
        return Integer.parseInt(secondNumber.getText());
    }
    
    public int getCalcSolution() {
        return Integer.parseInt(calcSolution.getText());
    }
    
    // Set solution
    public void setCalcSolution(int solution) {
        calcSolution.setText(Integer.toString(solution));
    }
    
    // If the calculateButton is clicked, execute listener's actionPerformed method
    void addCalculateListener(ActionListener listener) {
        calculateButton.addActionListener(listener);
    }
    
    // Open a popup that contains the error message passed
    void displayErrorMessage(String errorMessage) {
        JOptionPane.showMessageDialog(this, errorMessage);
    }
}
```

CalculatorController.java:

```java
package mvc_tutorial;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * 
 * Coordinates interactions between the Model and the View.
 *
 */
 public class CalculatorController {
    private CalculatorView theView;
    private CalculatorModel theModel;
    
    public CalculatorController(CalculatorView view, CalculatorModel model) {
        theView = view;
        theModel = model;
        
        // Tell the view that whenever the calculate button is clicked,
        // to execute the actionPerformed method in the CalculateListener inner class
        theView.addCalculateListener(new CalculateListener());
    }
    
    // inner class
    class CalculateListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            int firstNumber, secondNumber = 0;
            
            // Surround interactions with the view with 
            // a try block in case numbers weren't properly entered
            try {
                firstNumber = theView.getFirstNumber();
                secondNumber = theView.getSecondNumber();
                theModel.addTwoNumbers(firstNumber, secondNumber);
                theView.setCalcSolution(theModel.getCalculation());
            } catch (NumberFormatException ex) {
                System.out.println(ex);
                theView.displayErrorMessage("You need to enter 2 integers");
            }
        }
    }
}
```

When the user clicks the "Calculate" button, the View notifies the Controller of this user action via the `CalculateListener` listener. The Controller defined this listener and passed it to the View via the `addCalculateListener` method, which attached the listener to the button. In the listener's `actionPerformed` method, the Controller retrieves the number that the user entered, instructs the Model to add them, and retrieves the sum, telling the View to display it. 
