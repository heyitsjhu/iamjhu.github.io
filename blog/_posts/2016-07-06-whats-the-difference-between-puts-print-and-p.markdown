---
title: "What's the Difference between puts, print and p"
date: 2016-07-06 17:30:44 -0700
category: [ruby]
---

`puts` calls the `to_s` method on an `object`, and appends a newline at the end of its output. Its `return` value is `nil`.

`print` also calls `to_s` on an `object` and `return`s `nil`. But, it does not append a newline at the end.

`p` calls the `inspect` method on an `object` and appends a newline at the end of its output. Its `return` value is a string containing a human-readable representation of `object`.

## A basic example

{% highlight ruby linenos %}
> puts "hello world!"
hello world!             # output
=> nil                   # return value

> print "hello world!"
hello world!=> nil       # notice, no newline

> p "hello world!"
"hello world!"
=> "hello world!"
{% endhighlight %}

## A slightly more complex example

{% highlight ruby linenos %}
> class Foo
>   def initialize
>     @name = "Johnny"
>     @city = "San Francisco"
>     @state = "California"
>   end
> end
=> :initialize

> puts Foo.new
#<Foo:0x007fe5da0b5208>
=> nil

> print Foo.new
#<Foo:0x007fe5da086b38>=> nil

> p Foo.new
#<Foo:0x007fe5da06e128 @name="Johnny", @city="San Francisco", @state="California">
=> #<Foo:0x007fe5da06e128 @name="Johnny", @city="San Francisco", @state="California">
{% endhighlight %}

On Lines 1-7, I created a new class, `Foo`, with a few attributes, `@name`, `@city`, and `@state`, that are prepopulated and initialized when a new instance of `Foo` is created.

When we call `puts` and `print` on an instance of `Foo`, it prints out the class name of the object along with a hex number representing the object's position in the computer's memory—`#<Foo:0x007fe5da086b38>`. And as expected, both of these methods' return value is `nil`. And in `print`'s case, there is no newline appended.

Turning to 'p' now, the results are slightly different. It not only prints the object's class and relative position in memory, it also includes the attributes of the object. In this case, the data that's stored in the `@name`, `@city`, and `@state` instance variables.

## Which method should you use?

Deciding on which method to use really depends on your use case.
Below are a few examples—however, there are many different ways to use these methods.

### Printing out elements in an array

Given an array of names, if a list is what you're looking to print, the `puts` method is probably going to be your best option.

{% highlight ruby linenos %}
> names = ["Draymond", "Kevin", "Klay", "Stephen", "Steve"]
=> ["Draymond", "Kevin", "Klay", "Stephen", "Steve"]

> puts names
Draymond
Kevin
Klay
Stephen
Steve
=> nil

> print names
["Draymond", "Kevin", "Klay", "Stephen", "Steve"]=> nil

> p names
["Draymond", "Kevin", "Klay", "Stephen", "Steve"]
=> ["Draymond", "Kevin", "Klay", "Stephen", "Steve"]
{% endhighlight %}

### Positioning user input inline with prompts

Let's say your program asks a question and you want the user's input (where he types) to appear right after your prompt. If this is the case, the `print` method will achieve this for you.

{% highlight ruby linenos %}
> puts "Hi, there!";
  print "Please enter your name: ";
  input = gets.chomp
Hi, there!
Please enter your name: []
{% endhighlight %}

The `[]` above represents the console's cursor. Because `print` doesn't append a newline after its output, the cursor for the user's input will be positioned right after the output. When the user enters his or her name, it'll show up inline with the prompt `Please enter your name: `.


### Debugging an object

If you're debugging an object and need to view all of its instance variables—aka, its attributes—use the `p` method. Remember, it uses `inspect` which, by default, shows the object's class name, an encoding of the object id, and a list of the instance variables and their values.

{% highlight ruby linenos %}
> puts Article.first
#<Article:0x007f96ee9904f8>
=> nil

> print Article.first
#<Article:0x007f96e9d867b0>=> nil

> p Article.first
#<Article id: 1, title: "Sample Article Title", body: "This is some sample text for our article.", created_at: "2016-07-08 17:24:38", updated_at: "2016-07-08 21:06:29", image_file_name: "rabbit-logo.png", image_content_type: "image/png", image_file_size: 23792, image_updated_at: "2016-07-08 21:06:29">
=> #<Article id: 1, title: "Sample Article Title", body: "This is some sample text for our article.", created_at: "2016-07-08 17:24:38", updated_at: "2016-07-08 21:06:29", image_file_name: "rabbit-logo.png", image_content_type: "image/png", image_file_size: 23792, image_updated_at: "2016-07-08 21:06:29">
{% endhighlight %}


## And finally, a prettier way to print

As you can see in the last example, the output of `p` is not very "reader-friendly", it just crams everything onto one line. Fortunately, Ruby comes with PrettyPrint, or `pp`, which helps "prettifies" the output of lengthy, data-filled objects. In `irb`, make sure you run `require 'pp'` first in order to use it. To use, simply use `pp` instead of `p`.

{% highlight ruby linenos %}
> require 'pp'
=> true

pp Article.first
#<Article:0x007f96e8dd00a0
 id: 1,
 title: "Sample Article Title",
 body: "This is some sample text for our article.",
 created_at: Fri, 08 Jul 2016 17:24:38 UTC +00:00,
 updated_at: Fri, 08 Jul 2016 21:06:29 UTC +00:00,
 image_file_name: "rabbit-logo.png",
 image_content_type: "image/png",
 image_file_size: 23792,
 image_updated_at: Fri, 08 Jul 2016 21:06:29 UTC +00:00>
=> #<Article id: 1, title: "Sample Article Title", body: "This is some sample text for our article.", created_at: "2016-07-08 17:24:38", updated_at: "2016-07-08 21:06:29", image_file_name: "rabbit-logo.png", image_content_type: "image/png", image_file_size: 23792, image_updated_at: "2016-07-08 21:06:29">
{% endhighlight %}

Ahhh, now isn't that easier to read? :)

-- jhu

#### Additional Resources

* [Displaying Objects: puts and p, to_s and inspect - Ruby Monk](https://rubymonk.com/learning/books/4-ruby-primer-ascent/chapters/45-more-classes/lessons/108-displaying-objects)
* [p vs puts in Ruby - Stack Overflow](http://stackoverflow.com/questions/1255324/p-vs-puts-in-ruby)
* [What Is the Difference Between Print Puts and P - Code Sapling](http://www.codesapling.com/blog/2014/08/30/what-is-the-difference-between-print-puts-and-p/)
