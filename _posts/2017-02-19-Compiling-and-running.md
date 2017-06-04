---
layout: post
title: Compiling and running a Java package from the command line
date: 2017-02-09
comments: true
---

Up to this point, my experience with Java and the command line has covered only classes in unnamed, or default, packages. Now I'm coding a named package to process DNA sequence alignments, and it took me a while to grasp how to properly compile and run my code from the command line. 

I named my package `alignmentparser` and set its directory structure as

    [root]
        alignmentparser
            |_____ Subject.java
            |_____ TestRunner.java

At the top of each Java file, I added the package statement `package alignmentparser`, the package name corresponding to the directory structure relative to the file. 

My first attempt at compiling `TestRunner`, which includes a dependency on `Subject`, resulted in errors indicating that the compiler was not finding `Subject`.

    Briennas-MacBook-2:alignmentparser Brienna$ javac TestRunner.java
    TestRunner.java:9: error: cannot find symbol
      private Subject subj = new Subject("NM_080704", 1710, 2495);
              ^
      symbol:   class Subject
      location: class TestRunner
    TestRunner.java:9: error: cannot find symbol
      private Subject subj = new Subject("NM_080704", 1710, 2495);
                                 ^
      symbol:   class Subject
      location: class TestRunner
    2 errors

After digging through online resources and enlisting the help of a friend (who asked me why in the world I wasn't using an IDE like any sane person would), I chanced upon something that worked — going up one level in my working directory and compiling from there instead. 

    Briennas-MacBook-2:GitHub repositories Brienna$ javac alignmentparser/TestRunner.java

The reason why I messed up my first attempt at compiling `TestRunner` was because of something called the class path. The class path is the location where the compiler begins its search. It defaults to the current working directory. So when I compiled `TestRunner` while in the `alignmentparser` directory, the class path defaulted to `[root]/alignmentparser`. Then when the compiler encountered the reference to `Subject`, it began its search for that class by appending `Subject`'s package declaration to the default class path, making the class path now `[root]/alignmentparser/alignmentparser`. This path does not exist, hence the compilation errors.

Going up a directory worked, because there, the class path defaults to `[root]`. Then when I compiled `TestRunner` and the compiler encountered the reference to `Subject`, it appended `Subject`'s package declaration to the default class path, making the class path now `[root]/alignmentparser`. This path exists, so compilation succeeds.

### To compile a file within a named package:

1. Compile from outside the package itself, due to the package statement getting appended to the default class path. 
2. Compile from anywhere but set the class path explicitly to the root folder, such as `Briennas-MacBook-2:alignmentparser Brienna$ javac -cp .. TestRunner.java`.

Also, the compilation of multiple files can be specified in just one command: `javac FileName1.java FileName2.java` or `javac *.java`. When you compile one file, all of its dependencies will compile too.

To run a compiled class, follow the same rules with compiling, but use a period instead of a slash to represent directory levels, e.g. `alignmentparser.TestRunner` instead of `alignmentparser/TestRunner`. 

### Helpful resources:
- http://docs.oracle.com/javase/7/docs/technotes/tools/windows/classpath.html
- http://www.kevinboone.net/classpath.html



