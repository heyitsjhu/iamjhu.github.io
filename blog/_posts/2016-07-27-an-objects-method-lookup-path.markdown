---
title: "An Object's Method-Lookup Path"
date: 2016-07-27 10:34:46 -0700
tags: ruby
---

In Ruby, when you send a message to an object, that object searches a path, known as the method-lookup path, for a corresponding method to execute.  The first method it finds matching the corresponding message it received is the method that gets executed. But where exactly does the object look and does it look in a particular order?

## Searching class and superclasses

We'll start with a simple example. Let's say we have a class, `D`, and it inherits from a parent class, `C`. Both classes have a method named `greeting`. If we call `greeting` on an instance of class `D`, which method would our object execute?

{% highlight ruby linenos %}
class C
  def greeting
    puts "Hello. You're receiving this message from Class C."
  end
end

class D < C         # class D inherits from class C
  def greeting
    puts "Greeting. You're receiving this message from Class D."
  end
end

>d = D.new
=> #<D:0x007ff24a094fb8>
d.greeting
Greeting. You're receiving this message from Class D.
=> nil
{% endhighlight %}

Predictably, object `d` executes the `greeting` method defined in class `D`. This is because an object first looks at the instance methods defined in its own class. For a simple example like ours, this is the first stop in an object's *method-lookup path*.

If our object doesn't find a corresponding method in its class, it moves onto the class's superclass. And if it doesn't find one in the superclass, it checks the superclass's superclass. This process continues until there are no more superclasses to left.

To find out which class is our class's superclass, we can call the `superclass` method on our class. We can then do the same to each subsequent superclass to find its superclass.

{% highlight ruby linenos %}
> D.superclass
=> C
> C.superclass
=> Object
> Object.superclass
=> BasicObject
> BasicObject.superclass
=> nil
{% endhighlight %}

As you can see, class `D`'s superclass is the class it inherits from, class `C`. Class `C`'s superclass is the `Object` class, and `Object`'s superclass is the `BasicObject` class. `BasicObject`, as its name suggest, is the most basic object in Ruby and doesn't have a superclass.

An easier way of finding out all the superclasses—or, ancestors—of a class is by using the `ancestors` method. Calling this method on a class will return an array containing the ancestor chain for the particular class.

{% highlight ruby linenos %}
> D.ancestors
=> [D, C, Object, Kernel, BasicObject]
{% endhighlight %}

The result is similiar to calling the `superclass` method on every class. But wait, what's `Kernel`?

Good question. `Kernel` is actually a *module* and modules are included in the ancestor chain. But where does it come from exactly?

## Modules in the method-lookup path

`module`s are packages of methods and characteristics. You mix `module`s into existing classes to give the class's objects more functionality.

To see this in action and look at how a `module` fits into the method-lookup path, we'll create a module with a `greeting` method and include the module in class `D`.

{% highlight ruby linenos %}
module Hello            # defining our module and method.
  def greeting
    puts "Yo-yo-yo! This is from module Hello."
  end
end

class C
  def greeting
    puts "Hello. You're receiving this message from Class C."
  end
end

class D < C
  include Hello       # including the Hello module in our class.

  def greeting
    puts "Greeting. You're receiving this message from Class D."
  end
end

> d = D.new
=> #<D:0x007feebc8b4fb8>
> d.greeting
Greeting. You're receiving this message from Class D.
=> nil
{% endhighlight %}

Wait, nothing happened... Besides defining and including our module in class `D`, it didn't really affect the results of calling `greeting` on our object. It still executed the method inside class `D`.

Before we say this thing is broken, let's comment out the `greeting` method in class `D` and run the code again to see what happens.

{% highlight ruby linenos %}
...       # code omitted

class D < C
  include Hello

  # commenting out our method
  # def greeting
  #   puts "Greeting. You're receiving this message from Class C."
  # end
end

> d = D.new
=> #<D:0x007ff073847ce8>
> d.greeting
Yo-yo-yo! This is from module Hello.
=> nil
{% endhighlight %}

It worked! This leads me to believe the first stop in our object's method-lookup path is *still* its own class, even if we include a module. Once we comment out the method in our class, the method in our module executed flawlessly.

This mean our module is the second stop in an object's method-lookup path. After not finding a match in its class, our object moves onto the `Hello` module, finds a `greeting` method, and executes it. Had our object not found a `greeting` method inside the `Hello` module, it would've moved onto the class's superclass, class `C`.

You can confirm this by calling the `ancestors` method on our object's class.

{% highlight ruby linenos %}
> D.ancestors
=> [D, Hello, C, Object, Kernel, BasicObject]
{% endhighlight %}

You can see the `Hello` module is now included in the ancestor chain. And, confirming what was discussed above, after searching its own class, the next stop in the lookup path is the module `Hello`, and then the parent class, `C`—and so on.

## Changing a module's priority in the method-lookup path

Another way to attach a module onto a class is to use the `prepend` keyword instead of the `include` keyword. Doing so changes the order in which the module is searched in the method-lookup path.

Let's see this in action.

We'll keep our `Hello` module in place and create a new module, `Goodbye`. We'll create a `greeting` method within this module as well. Next, we'll `prepend` the module to class `D`. (Don't forget to *uncomment* the `greeting` method in our class. We want all our methods to be active and ready to respond to our object.) What do you think will happen?

{% highlight ruby linenos %}
module Hello
  def greeting
    puts "Yo-yo-yo! This is from module Hello."
  end
end

module Goodbye          # our new module
  def greeting
    puts "The conversation ends before it even starts! Goodbye!"
  end
end

class C
  def greeting
    puts "Hello. You're receiving this message from Class C."
  end
end

class D < C
  include Hello
  prepend Goodbye       # prepending our new module

  def greeting
    puts "Greeting. You're receiving this message from Class D."
  end
end

> d = D.new
=> #<D:0x007ffa6a026ea0>
> d.greeting
The conversation ends before it even starts! Goodbye!
=> nil
{% endhighlight %}

Did you expect our object to execute the `greeting` method inside our `Goodbye` module? If so, you're correct!

Using `prepend` puts the `Goodbye` module in front of the class itself in the method-lookup path. So, before, where the object would look first at the class's instance methods for a match, it now looks in the `Goodbye` module first.

Again, we can use the `ancestors` method to see this updated method-lookup path.

{% highlight ruby linenos %}
> D.ancestors
=> [Goodbye, D, Hello, C, Object, Kernel, BasicObject]
{% endhighlight %}

In case you're wondering, when it comes to a `prepend`ed and an `include`d module, their code placement in relation to each other has no affect on their order in the method-lookup path. In other words, whether we `prepend` the `Goodbye` module before or after the `Hello` module makes no difference in the order which our object will search.

This:

{% highlight ruby linenos %}
class D < C
  prepend Goodbye       # prepending before Hello
  include Hello

  def greeting
    puts "Greeting. You're receiving this message from Class D."
  end
end
{% endhighlight %}

And this:

{% highlight ruby linenos %}
class D < C
  include Hello
  prepend Goodbye       # prepending after Hello

  def greeting
    puts "Greeting. You're receiving this message from Class D."
  end
end
{% endhighlight %}

Both yields the same result and method-lookup path:

{% highlight ruby linenos %}
> D.ancestors
=> [Goodbye, D, Hello, C, Object, Kernel, BasicObject]
{% endhighlight %}

If you attach two or more modules using either the `include` or the `prepend` keyword, however, then there is an order to them that's worth noting.

## A party of modules

Let's change the `prepend` on our `Goodbye` module to an `include`. What do you think will happen?

{% highlight ruby linenos %}
...       # code omitted

class D < C
  include Hello
  include Goodbye       # change prepend to include

  def greeting
    puts "Greeting. You're receiving this message from Class D."
  end
end

> d = D.new
=> #<D:0x007f88e3837408>
> d.greeting
The conversation ends before it even starts! Goodbye!
=> nil
{% endhighlight %}

When we take this approach, the `Hello` module is loaded before the `Goodbye` module—*however*, during the method-lookup process, the *most recently mixed-in module* is searched first. Meaning, our object will search the `Goodbye` module first, before searching the `Hello` module.

Let's look at one last example. What happens if we load our `Hello` module twice? Once before the `Goodbye` module, and then again after?

{% highlight ruby linenos %}
...       # code omitted

class D < C
  include Hello
  include Goodbye
  include Hello         #load Hello module again

  def greeting
    puts "Greeting. You're receiving this message from Class D."
  end
end

> d = D.new
=> #<D:0x007f88e3058e58>
> d.greeting
The conversation ends before it even starts! Goodbye!
=> nil
{% endhighlight %}

Shouldn't it have executed the `greeting` method inside the `Hello` module?

Not if the module has been loaded earlier in the code. In other words, since our `Hello` module was already loaded, re-including it again later in the code has no affect on its position in  method-lookup path. In fact, the second inclusion of the `Hello` module does nothing. Ruby ignores it. Therefore, our `Goodbye` module is still the most recently mixed-in module in our class.

## Back to our friend, Kernel

Let's take a look at our ancestor chain one more time.

{% highlight ruby linenos %}
> D.ancestors
=> [Goodbye, D, Hello, C, Object, Kernel, BasicObject]
{% endhighlight %}

We know `D`, `C`, `Object`, and `BasicObject` are classes. Modules prepended on a class is searched before the class itself (i.e., `Goodbye`), and modules included in a class is searched after the class (i.e., `Hello`).

`Kernel` sits between the `Object` and `BasicObject` classes. So, the question is: Is `Kernel` included in the `Object` class or prepended onto the `BasicObject` class.

The answer is the former: `Kernel` is included in the `Object` class. It provides additionally functionality for all instances of the `Object` class, equipping them with over 100 methods including `chomp`, `loop`, `rand`, `require`, and the familiar `puts`.

## Summary

An objecting in search of a method will look in

1. Modules prepended to the class, in reverse order of prepending
2. Within its class
3. Modules included in its class—again, in reverse order of inclusion
4. Modules included in its superclass
5. Its class's superclass
6. Modules included in its superclass
7. Repeat, all the way up to the `Object` and `BasicObject` class.

You know have the knowledge and tools necessary to debug the next time you have an object executing a method from somewhere other than where you'd expect.
