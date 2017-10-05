---
layout: post
title: "Java uses only \"pass by value\""
date: 2017-10-04
comments: true
---

There are two ways to pass objects, by reference or by value. To pass by reference means that you pass the reference. To pass by value means that you pass a copy of the reference.

Java passes by value, but this is often misunderstood. An excerpt from "Big Java" (p. 337):

>You will sometimes read in Java books that "numbers are passed by value, objects are passed by reference." That is technically not quite correct. In Java, objects themselves are never passed as parameters; instead, both numbers and *object references* are passed by value.

I had thought I understood the difference between the two ways of passing objects, but understanding it as a fact is different than understanding it in practice. Today I found myself stuck on an ISTE200 homework assignment because I tried to do something that isn't possible with pass by value. 

I was working on a class with several setter methods. Each setter receives an index and, if it is valid, sets an instance variable to refer to the String object found at the index of the specified array.

to set as an instance variable if it is a valid index in a specified array. 

For example, `setEngine` and `setLoad`:

```java
public void setEngine(int index) {
    if (index >= 0 && index < ENGINES.length) {
      engine = ENGINES[index];  
    } 
}

public void setLoad(int index) {
    if (index >= 0 && index < LOADS.length) {
      load = LOADS[index];
    } 
}
```

Both setters are similar, so I wanted to see if I could write a generic setter that receives the instance variable as a parameter:

```java
public boolean setVariable(int index, String[] list, String var) {
  if (index >= 0 && index < list.length) {
    var = list[index];  
  }
}
```

It didn't work. `var` got set, but the instance variables stayed as they were.

Why? **`var` is a copy of a reference, not the reference itself**. The instance variable stores a reference to a String object. When I pass the instance variable to `setVariable`, I am assigning `var` a copy of that reference. At this moment, the instance variable and `var` both refer to the same object. `LOADS[index]`, however, stores a reference to a different object. So when I write `var = LOADS[index]`, I am replacing the reference `var` currently stores with a new one. Now the instance variable and `var` no longer refer to the same object. This is why the instance variable doesn't get updated. With pass by value, a Java method can update an object's state, but it can't *replace* the contents of an object reference.

And in this particular situation I happen to be passing a String reference. A String is immutable, meaning that there are no methods in its public API that I can call to update its state. Possible solutions are to instead pass a StringBuilder or a wrapper class containing the String reference.
