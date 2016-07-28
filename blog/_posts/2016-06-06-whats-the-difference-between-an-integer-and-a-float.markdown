---
title: "What's the Difference Between an Integer and a Float?"
date: 2016-06-06 11:40:36 -0700
disqus_identifier: "0f62e9ad-6e64-4535-b0d5-3a1919fc8c94"
tags: [ruby]
---

In Ruby, an `integer` represents whole numbers (i.e., `1`, `50`, and `23`), while a `float` represents inexact real numbers (i.e., `1.6`, `54.39`, and `20.0`). 

### Using `integer` and `float`
When dividing `integers`, if the numbers don't divide equally, Ruby will drop the decimals from the result. For example, let's say you had the following calculation, `7 / 3`. You'd expect the answer to be `2.33` because three goes into seven two-times with a third remainder. However, put this into `irb` and Ruby will spit back out `2`. Where did the `0.33` go? Well, it disappeared. Vanished.

Why?

Because if you calculate two `integers` in Ruby, it'll return the result back to you as an `integer`—and there is no place for decimals or inexact numbers in an `integer`. 

### So how do we fix this?

The solution, when you're entering the numbers directly, is pretty straightforward. Simply change one of the numbers into a `float`. For example, instead of `7 / 3`, put `7.0 / 3` or `7 / 3.0`. You can even change both numbers into `floats`, like so: `7.0 / 3.0`. The point is, as long as one of the numbers is written as a `float`, Ruby will return the result back to you as a `float`—where decimals have a place. 

### What if I'm not directly entering the numbers?

Most of the time, you won't be entering numbers directly. Instead, you'll have them passed into the calculations via variables. In this scenario, if you know your variable is storing `integers`, you can invoke the `.to_f` method on the variable to convert it into a `float` before passing it into your calculation. Here's an example:

{% highlight ruby linenos %}
total_amount = 100
number_of_people = 3

split_check_equally = total_amount.to_f / number_of_people
{% endhighlight %}

In the above, we have two variables—`total_amount` and `number_of_people`—containing the `integers` `100` and `3`, respectively. On Line 4, we calculate what the cost is per person by dividing the `total_amount` with the `number_of_people`. One thing to note is that we're invoking the `.to_f` method on the `total_amount` variable to convert the `integer` into a `float`. By doing so, Ruby will return the result back to us as a `float`—`33.33`. Alternatively, we could have invoked the `.to_f` method on the `number_of_people` variable—or both—and gotten the same result.

Had we not done this, Ruby would have returned `33`. Everyone would have paid their share of $33–thinking it was enough, only to be short by $1. Which may not be a big deal in this particular example—though the waiter may wonder what he did wrong—but in an application dealing with, say, hundreds of millions of dollars, this can be very problematic.

### Beware: Float has a funky behavior

Calculate the following in `irb`: `(5.0-4.2)`. You'd expect the answer to be `0.8`, right? Me, too. But what did you get?

Instead, Ruby likely returned `0.7999999999999998`. What in the hell!?

Remember in the beginning of this post when I said `floats` represent inexact real numbers? Well, according to Ruby, this mean by default floats are slightly imprecise and that this is not a fault of Ruby's. But rather, floating point numbers in general suffer from this type of rounding error because they're limited to a certain number of bytes and, therefore, cannot store decimal numbers perfectly. 

Check out [this FAQ](https://github.com/rdp/ruby_tutorials_core/wiki/ruby-talk-faq#floats_imprecise) which provides a few options you can take when you run into this situation. 

Until next time, don't forget to convert your `integers` into `floats` if you're expecting a result to return with a decimal. 

Happy coding!

jhu