---
title: "Let's Create: Reverse - Part I (Strings)"
date: 2016-07-12 15:15:44 -0700
tags: ruby
---

In Ruby, the `String` class's `reverse` method produces a new string whose characters are in the reverse order of the original string.

{% highlight ruby linenos %}
> "hello world".reverse
=> "dlrow olleh"
{% endhighlight %}

Let's recreate it!

First, let us name our method—we'll go with `my_reverse`. Our method will accept a single parameter—the `string` we want to reverse.

{% highlight ruby linenos %}
def my_reverse(string); end
{% endhighlight %}

Next, we'll initialize a `local variable` within our method. We're going to use this variable to store our reversed string. Appropriately so, we'll name this variable `reversed_str`. And we'll leave it as an empty string for now. In addition to this variable, we'll also need a variable to keep track of our position as we work through the original string. For simplicity, we'll name this local variable `i` and set it to `0`. This variable is commonly referred to as a `counter` where it increments or decrements after each iteration.

Here's what our method looks like after adding our local variables.

{% highlight ruby linenos %}
def my_reverse(string)
  reversed_str = ''
  i = 0
end
{% endhighlight %}

Now, to the meat of our method, where all the logic happens.

We'll take the following approach:

* iterate through the string one character at a time
* iterate through the string backwards, from the last character to the first character
* during each iteration, grab the current character and append it to our `reversed_str` variable

To iterate through the string, we'll use Ruby's `times` method. The `times` method will iterate a given block of code `int` times, where `int` is the number of times we want to iterate.

{% highlight ruby linenos %}
> 5.times { puts "hello" }
hello
hello
hello
hello
hello
=> 5
{% endhighlight %}

Notice the `5` on the last line. This is because the `times` method returns the `int` that called it. 

So now we know how to iterate a certain number of times, but what if we don't know beforehad how many times we'll need to iterate our block of code? Since we're not going to know what the string being passed in will be ahead of time, it's character count will vary from string to string. For example, the string `"hello"` has five characters but the string `"hello world!"` has 12 characters. How do we take into account the variability. Fortunately, the `String` class has a method that will return the number of characters in a string—the `length` method.

{% highlight ruby linenos %}
> "hello".length
=> 5
> "hello world!".length
=> 12
{% endhighlight %}

Great, with `times` and `length` we're ready to create our iteration block.

{% highlight ruby linenos %}
def my_reverse(string)
  reversed_str = ''
  i = 0
  string.length.times { }   # our iteration block
end
{% endhighlight %}

Within our iteration block, we'll write the logic that builds our reverse string. Each time our block iterates, we want to navigate *backwards* across the original string. To do this, we can use indexing. In Ruby, every character within a string can be targeted through its index position. For example, in `string = "hello"`, we can target the letter `"h"` with  `string[0]`. (Recall, indexing starts at zero in Ruby—and most programming languages.) To index from the end of a string, we simply use negative numbers and it'll traverse the string from right-to-left. `string[-1]` will return the last character in the string—`"o"`. `string[-2]` will yield the second-to-last character in the string.

{% highlight ruby linenos %}
> string = "hello"
=> "hello"
> string[0]   # targets first char
=> "h"
> string[-1]  # targets last char
=> "o"
> string[-2]  # targets second-to-last char
=> "l"
{% endhighlight %}

All we need to do now is figure out how to traverse the string backwards automatically, from `string[-1]` to `string[-2]` to `string[-n]` without us explicitly telling it so. Remember that counter variable we initialized in our method? We can use that. Each time we iterate our block, we'll subtract 1 from the current counter. To do this, we simply use the code `i = i - 1`. This will reassign `i` to equal itself minus one. To further simplify, we can use the shorthand notation: `i -= 1`. This will take the place of the index position, so instead of `string[-1]`, we use `string[i -= 1]`.

Since our counter starts a zero, on our first iteration, `i` will equal `i - 1`—or `0 - 1`—which is `-1`, giving us the last character in the string. Then, on the next iteration, `i` will become `-2`—and so on and so on.

To see this in action, let's initialize our method in `irb` and have our block `puts` each character to the console.

{% highlight ruby linenos %}
> def my_reverse(string)
>   reversed_str = ''
>   i = 0
>   string.length.times { puts string[i -= 1] }
> end
=> :my_reverse   # Ruby letting us know how method has been created

> my_reverse("hello")
o
l
l
e
h
=> 5
{% endhighlight %}

It worked! It traversed our `"hello"` string backwards, printing each character out as it went. Do you notice the `5` at the end? That's the current return value of our method. It comes from the `times` method in our code which returns the integer that calls it if the block doesn't return anything. In our example, `puts` returns `nil`—effectively, nothing—so at the end of the execution, `times` refers back to the `integer` that called it, which was `5`—the length for the string.

Our code is almost complete. Instead of printing each character to the screen, we need to store it in our `reversed_str` variable. The easiest way to do this is with the `<<` (append) method. Note that `<<` is *destructive*, meaning it'll mutate the string that calls it. In our case, this is okay because we're building out the reversed string a character at a time and so we want them to accumulate. So let's replace `puts string[i -= 1]` with `reversed_str << string[i -= 1]`.


Our final code looks like this:

{% highlight ruby linenos %}
def my_reverse(string)
  reversed_str = ''
  i = 0
  string.length.times { reversed_str << string[i -= 1] }
  reversed_str
end
{% endhighlight %}

On Line 5, you'll see that we call our variable `reversed_str`. Why? When you call a variable, it returns its contents to you. And since a method returns the last line of code it evaluates, calling out variable at the very end will ensure that our method gives us the contents of our `reversed_str` variable, which is really what we care about.

Let's see this in action with a few examples.

{% highlight ruby linenos %}
> def my_reverse(string)
>   reversed_str = ''
>   i = 0
>   string.length.times { reversed_str << string[i -= 1] }
>   reversed_str
> end
=> :my_reverse        # initialize method

> my_reverse("bubbles")
=> "selbbub"

# works on super long words
> my_reverse("supercalifragilisticexpialidocious")
=> "suoicodilaipxecitsiligarfilacrepus"

# works on multiple words
> my_reverse("red octopus")
=> "supotco der"

> my_reverse("blue telescopes")
=> "sepocselet eulb"

# works on sentences, too
> my_reverse("Sometimes life hits you in the head with a brick. Don't lose faith.")
=> ".htiaf esol t'noD .kcirb a htiw daeh eht ni uoy stih efil semitemoS"
{% endhighlight %}

A long explanation for just six lines of code but it goes to show how much thinking actually goes into creating code. And it's important to fully understand the code that your write—or in our case, the code we write that mimics a functionality that already exist. This helps us understand the code that *other* people write, which is just as important as understanding your own code.