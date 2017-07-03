---
layout: post
title: Measuring execution time
date: 2017-07-02
comments: true
---

Sometimes we want measure how long a method takes to execute. How do we do this?

Looking at the `java.lang.System` class, we see two methods that return the time: `System.currentTimeMillis()` and `System.nanotime()`. 

The purpose of `currentTimeMillis` is to "return the current time in milliseconds," and the purpose of `nanoTime` is to "return the current value of the running Java Virtual Machine's high-resolution time source, in nanoseconds." Since `currentTimeMillis` depends on the system clock, it is safer to use the system-independent `nanoTime` to measure execution time. 

**Code that measures execution time:**

```java
long startTime = System.nanoTime();
Thread.sleep(10000);
long executionTime = System.nanoTime() - startTime;
System.out.println(executionTime);  // prints something like 10000472572
```

To convert the execution time to any format you want, a good library to use is `java.util.concurrent.TimeUnit`. It isn't a good idea to divide or multiply time to change units, because this is senselessly error-prone and harder to read. Always use a library. 

**Code that converts execution time to minutes and seconds:**

```java
long minutes = TimeUnit.NANOSECONDS.toMinutes(executionTime);
long seconds = TimeUnit.NANOSECONDS.toSeconds(executionTime) - TimeUnit.MINUTES.toSeconds(minutes);
System.out.println(String.format("%d min, %d sec", minutes, seconds));  // prints 0 min, 10 sec
```

**The complete code:**

```java
import java.util.concurrent.TimeUnit;

public class ExecutionTimeMeasurer {
    public static void main(String[] args) throws InterruptedException {
        // Measure execution time
        long startTime = System.nanoTime();
        Thread.sleep(10000);
        long executionTime = System.nanoTime() - startTime;
        System.out.println(executionTime);
        // Convert execution time to minutes and seconds
        long minutes = TimeUnit.NANOSECONDS.toMinutes(executionTime);
        long seconds = TimeUnit.NANOSECONDS.toSeconds(executionTime) - TimeUnit.MINUTES.toSeconds(minutes);
        System.out.println(String.format("%d min, %d sec", minutes, seconds));
    }
}
```

