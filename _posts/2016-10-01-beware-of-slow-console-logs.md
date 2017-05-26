---
layout: post
title: Beware of slow console logs
date: 2016-09-28
---

JavaScript being silly? `console.log`

But console logging is not perfect, which I realized the other day when helping [Gregb1609](https://github.com/Gregb1609) on FreeCodeCamp's Gitter chat. He was working on an intermediate algorithm scripting problem called [Sum All Primes](https://www.freecodecamp.com/challenges/sum-all-primes), where you're supposed to sum all the prime numbers up to and including the provided number. His solution worked with lower numbers, like 10, but lagged badly with higher numbers, like 977.

```javascript
function sumPrimes(num) {
  var multiple=false;
  var sum=0;
  for(var i=num;i>1;i--){
    for(var j=i-1;j>1;j--){
      console.log("modulo i"+i+" j"+j+"="+i%j);
      if(i%j===0){
        multiple=true;
        console.log("not prime");
        break;
      }
    }
    if(!multiple){
      sum+=i;
    }else{
      multiple=false;
    }
  }
  console.log("end");
  return sum;
}

sumPrimes(10);   // works fine
sumPrimes(977);  // lags badly
```

When I took a look at his code, it looked fine. No obvious bugs. So using a sort of elimination method, I gradually reformatted my own solution to the problem, which worked, to match his. In doing so, I realized that the only true difference between his and my code was that he console logged while I didn't. 

I commented out his `console.log`s and voilà! His code now worked with higher numbers.

Gregb1609's case was extreme, but it showed me that console logging really slows down a program's execution. To prevent giving up performance for nothing, I'll have to remember to comment out any console log statements before I push code to production. 