---
layout: post
title: "Machine Learning Specialization: Course 1, Week 1"
date: 2018-05-10
comments: true
---

# Week 1, Welcome

>"Machine learning is everywhere, but is often operating behind the scenes. This introduction to the specialization provides you with insights into the power of machine learning, and the multitude of intelligent applications you personally will be able to develop and deploy upon completion. We also discuss who we are, how we got here, and our view of the future of intelligent applications."

This specialization does things a little differently than other courses in machine learning. Rather than supplying you with a laundry list of algorithms and methods, this specialization focuses on helping you to figure out what task you're trying to solve, what algorithms and methods make sense in the context of the task, and how to measure their performance. By focusing on use cases and treating algorithms as black boxes, you will be able to better grasp the key concepts that allow you to build and measure a strong intelligent application, rather than a simple application that may be disconnected from reality.  

In the first course in this specialization, you will build intelligent applications. In the second, third, and fourth courses, you will formulate, implement, and evaluate machine learning methods. 

Required math background: basic calculus (derivatives) and basic linear algebra (vectors, matrices, and matrix multiplication). 

This specialization uses the Jupyter Notebook (formerly IPython Notebook), which is Python plus wiki pages. To open a notebook via Terminal, navigate to the directory containing the notebook, then execute `jupyter notebook`.

**Other useful Jupyter operations:**

- Change cell type to code, while inside cell: esc + Y
- Change cell type to markdown, while inside cell: esc + M
- Execute a cell, while inside cell: shift + enter

**Short Python refresher:**

In addition to the conventional way of creating a function with the `def` command, you can also create an anonymous function with `lambda`. Borrowed from Lisp, the `lambda` function has the following syntax `lamba arg1, arg2 : expression`. Arguments can be numerous, but there can be only one expression that is evaluated and returned. 

```python
# Conventional function
def f(x):
    return x * x

f(3)  # 9

# Lambda function
g = lambda x: x * x

g(3)  # 9
```

As you can see, the conventional function `f()` and the `lambda` function `g()` do the exact same thing, taking input `x`, squaring it, and returning the result. `lambda` functions are a matter of style. It is never required to use them; you could use a conventional function anywhere you would use a `lambda` function. However, `lambda` functions can be useful if you want to encapsulate specific, non-reusable code without cluttering your code with many short functions.

### Resources 

- [Machine Learning Specialization](https://www.coursera.org/specializations/machine-learning)
- [My GitHub repo for the specialization](https://github.com/briennakh/machine-learning)
- [My GitHub repo subdirectory for Course 1, Week 1](https://github.com/briennakh/machine-learning/tree/master/1.%20Machine%20learning%20foundations%20-%20A%20case%20study%20approach/Week%201%2C%20Welcome)



