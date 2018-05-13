---
layout: post
title: "Machine Learning Specialization: Course 1, Week 2"
date: 2018-05-11
comments: true
---

> This week you will build your first intelligent application that makes predictions from data. We will explore this idea within the context of our first case study, predicting house prices, where you will create models that predict a continuous value (price) from input features (square footage, number of bedrooms and bathrooms,...). This is just one of the many places where regression can be applied. Other applications range from predicting health outcomes in medicine, stock prices in finance, and power usage in high-performance computing, to analyzing which regulators are important for gene expression. You will also examine how to analyze the performance of your predictive model and implement regression in practice using an iPython notebook.

## Overview of linear regression:

Linear rgression is a popular statistical tool with the following uses:

- Prediction 
    - We have a set of features and we want to model how our observations that are associated with these features change as we change the values of the features. For example, a house has some set of features like the size of the house, number of bedrooms, number of bathrooms, and so on. The observation that we have is the value of the house. 
- Classification
    - If we have an email and we want to classify it as spam or not, we can think of that email as having features related to its text that are indicative of whether that email is spam or not.
- Analyze importance of features

## Linear regression modeling

Problem: We want to sell our house, but we don't know how much to list it for. 

### Simple approaches (not using linear regression)

To try to estimate the value of our house, we might look at other recent sales in the neighborhood and what those houses look like. 

![Recent house sales](/assets/05-11-18/image1.png)

*An x-value is also called an independent variable, **feature**, covariate, or predictor. A y-value is also called a dependent variable, **observation**, or response.*

How do we use these observations to estimate our house value? 

We might look at how big our house is, and then look for other sales of houses of that size. 

![Predict our house by similar houses](/assets/05-11-18/image2.png)

However, most likely that no house sold recently had exactly the same square footage as our house. So we can't use this approach.

A slightly more flexible approach is to look at a range of square footage around our actual square footage. 

![Predict our house by similar houses](/assets/05-11-18/image3.png)

But even with this approach, we only have two house sales that we're going to base our estimage off of. And we're throwing out all these other observations as if they had nothing to do with the value of our house. That isn't reasonable. There is still information in these other observations. We should leverage all the information that we can to come up with good predictions.

### Linear regression approach

Let's try linear regression to model the relationship between the square footage of the house and the house sales price. The simplest linear regression model is to just fit a line through the data. 

![Linear regression model](/assets/05-11-18/image4.png)

This line is defined by f<sub>w</sub>(x) = w<sub>0</sub> + w<sub>1</sub>x with an intercept w<sub>0</sub> and a slope w<sub>1</sub>.

The w in f<sub>w</sub>(x) indicates that this function is specified by parameters. For this function, our parameters are the intercept and the slope, which means the function is parameterized by the set of w<sub>0</sub> and w<sub>1</sub>, or w = (w<sub>0</sub> and w<sub>1</sub>). 

The slope, or w<sub>1</sub>, is also called the regression coefficient, or the weight on the feature x. As we vary x, the square footage of the house, the regression coefficient determines how much of an impact this change has on changes in the observed house sales price.

We could draw slightly different lines, each given by a different set of parameters w. Which line is the right line or a good line? Which w do we want to choose for our model? 

![Linear regression model](/assets/05-11-18/image5.png)

We choose by defining a cost for a given line. One very common cost associated with a specific fit to the data is something called the residual sum of squares (RSS).

With RSS, we get the difference between our prediction and our actual observation. To do this, we first look at how far each observation is from the fitted line, or from what the model would predict.

![Linear regression model](/assets/05-11-18/image6.png)

Then we look at the square of these distances and sum over them. 

RSS(w<sub>0</sub>, w<sub>1</sub>) =  <br/>
      ($<sub>house1</sub> - [w<sub>0</sub> + w<sub>1</sub>sq.ft.<sub>house1</sub>])<sup>2</sup>  <br/>
    + ($<sub>house2</sub> - [w<sub>0</sub> + w<sub>1</sub>sq.ft.<sub>house2</sub>])<sup>2</sup>  <br/>
    + ($<sub>house3</sub> - [w<sub>0</sub> + w<sub>1</sub>sq.ft.<sub>house3</sub>])<sup>2</sup>  <br/>
    + ... [include all houses]

After we calculate the cost of all possible w's, or lines, we choose the one that minimizes the RSS. The resulting w that we choose is denoted as ŵ = (ŵ<sub>0</sub>, ŵ<sub>1</sub>). You can say the ŵ as "w hat."

The best guess of our house price is what f<sub>ŵ</sub>(x) = ŵ<sub>0</sub> + ŵ<sub>1</sub>x predicts. 

![Linear regression model](/assets/05-11-18/image7.png)

### Adding higher order effects

Perhaps a linear fit is not the best fit. Let's try a quadratic fit. (Even though we're talking about a quadratic fit to the data, this is actually still called linear regression, because we think of x<sup>2</sup> just as another feature, in addition to x.)

![Linear regression model](/assets/05-11-18/image8.png)

This line is defined by f<sub>w</sub>(x) = w<sub>0</sub> + w<sub>1</sub>x + w<sub>2</sub>x<sup>2</sup>. Here we have three parameters.

Now we need to figure out which is the best quadratic fit to this data. We can do this by minimizing our RSS, again. 

A 13th-order polynomial looks like it would be an even better fit.

![Linear regression model](/assets/05-11-18/image9.png)

Our RSS here are basically zero. But can we believe this fit? It shows that our house is worth very little. Yes, we talked about RSS as being this cost of the fit. And we have really minimized our RSS here, but this function just looks crazy. We need a way to evaluate our fit.

