---
layout: post
title: "An exercise in writing dry code"
date: 2017-09-15
comments: true
---

In ISTE-200, I wrote a program, `OrderNumbers.java`, that accepts three integers from the user as three separate variables and sorts and prints the numbers in ascending numerical order, using only if statements and no arrays.

The final version of my code: 

```java
import java.util.Scanner;

public class OrderNumbers {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        // Declare and initialize all variables
        int num1 = 0;
        int num2 = 0;
        int num3 = 0;
        int temp = 0;  // for sorting numbers
        int count = 0;  // for keeping track of user input

        while (true) {
            // If user has entered 3 valid numbers, break loop
            if (pointer > 3) {
                break;
            }

            // Prompt user to input a number
            System.out.print("Enter number: ");

            // If input is invalid, notify user
            if (!scan.hasNextInt()) {
                System.out.println("Invalid input.");
            } else {
                // Otherwise assign input to appropriate variable
                if (pointer == 1) {
                    num1 = scan.nextInt();
                } else if (pointer == 2) {
                    num2 = scan.nextInt();
                } else if (pointer == 3) {
                    num3 = scan.nextInt();
                } 
                pointer++;
            }
            scan.nextLine();  // eats line
        }
        
        // Sort numbers in ascending order
        if (num1 > num2) {
            temp = num1;
            num1 = num2;
            num2 = temp;
        } 
        if (num2 > num3) {
            temp = num2; 
            num2 = num3;
            num3 = temp;
        }
        if (num1 > num2) {
            temp = num1;
            num1 = num2;
            num2 = temp;
        }

        // Print the ordered numbers
        System.out.println("Ordered numbers are: " + num1 + ", " + 
            num2 + ", " + num3);

    }

}
```

It took me a while to code the part that checks whether the user input is valid, and if it isn't, to continue prompting the user for a valid input. The final version of my code makes use of the best approach I could come up with without using an array.

This was my first approach: 

```java
// Prompt user to input numbers while checking validity
while (true) {
    System.out.print("Enter number: ");
    if (!scan.hasNextInt()) {
        System.out.println("Invalid input");
        scan.nextLine(); // eats line
    } else {
        num1 = scan.nextInt();
        break;
    }
}
while (true) {
    System.out.print("Enter number: ");
    if (!scan.hasNextInt()) {
        System.out.println("Invalid input");
        scan.nextLine(); 
    } else {
        num2 = scan.nextInt();
        break;
    }
}
while (true) {
    System.out.print("Enter number: ");
    if (!scan.hasNextInt()) {
        System.out.println("Invalid input");
        scan.nextLine(); 
    } else {
        num3 = scan.nextInt();
        break;
    }
}
```

A bit redundant, eh? To mop up this wet code, I added the variable `pointer` to keep track of user input for variable assignment, allowing me to reuse the same block of code to validate all user inputs.
