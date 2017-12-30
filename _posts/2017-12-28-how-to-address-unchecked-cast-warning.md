---
layout: post
title: "Addressing a unchecked cast warning"
date: 2017-12-28
comments: true
---

I wrote some code, so that I could, among other things, read a serialized `ArrayList<Vehicle>` from an `ObjectInputStream`, `in`, into `orders`:

```java
orders = (ArrayList<Vehicle>) in.readObject();
```

But the Java compiler gives an unchecked cast warning:

```
MacBook:Homework Brienna$ javac Orders.java -Xlint:unchecked
Orders.java:152: warning: [unchecked] unchecked cast
                    orders = (ArrayList<Vehicle>) in.readObject();
                                                                ^
  required: ArrayList<Vehicle>
  found:    Object
1 warning
```

The problem is that a cast is a runtime check, but a generic type (the `<Vehicle>` part of `ArrayList<Vehicle>`) gets erased during compilation and is not available at runtime for the cast. In fact, at runtime there is no difference between an `ArrayList<Vehicle>` and an `ArrayList<AnythingElse>`. Because of this type erasure, I can't check that I actually have an `ArrayList<Vehicle>` when I am casting. So I need to do the check myself by looping through the ArrayList and casting each element individually:

```java
ArrayList<?> ar = (ArrayList<?>) in.readObject();
for (Object x : ar) {
    orders.add((Vehicle) x);
}
```

Note: Since I have control over the objects which were originally serialized, I could avoid the loop by using an array instead of an ArrayList. Array types are always a safe cast (if they don't have a generic type themselves).

More info about type erasure can be found [here](https://docs.oracle.com/javase/tutorial/java/generics/erasure.html) and [here](https://stackoverflow.com/questions/339699/java-generics-type-erasure-when-and-what-happens).

The full code for this assignment can be found [here](https://github.com/briennakh/ISTE200/tree/master/Day%206/Homework).
