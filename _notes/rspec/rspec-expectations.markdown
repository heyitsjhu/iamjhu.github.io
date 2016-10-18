---
title: "RSpec Expectations"
last_updated: 2016-10-17 10:37:30 -0700
topic: "rspec"
---

RSpec's `RSpec::Expectations` class provides a set of methods that allow you to test an object's state at any point in the code's execution against an expect result.

## A Basic Expectation

The basic structure looks like this:

{% highlight ruby %}
expect(actual).to matcher(expected)
expect(actual).not_to matcher(expected)
{% endhighlight %}

When read, the lines would sound something like, "I expect this (actual) to match this (expected)," or "I expect this (actual) not to match this (expected)."

* `actual` is the state of the object you're testing 
* `expected` is what the expected state should be
* `.to` creates a positive relationship between the `actual` and `expected` values
* `.not_to` creates a negative relationshi between the `actual` and `expected` values 
  * In addition to `.not_to`, you can also use `.to_not`—an alias—giving you another way to express your statements in a way that sounds like plain English.

## Built-in Matchers

RSpec's built-in matchers—and any custom matchers you define—are what determines how the two values will be compared.

### Object Identity and Equivalence

{% highlight ruby %}
# Object Identity
expect(actual).to be(expected) # passes if actual.equal?(expected)
# Object Equivalence
expect(actual).to eq(expected) # passes if actual == expected
# (Optional) APIs
expect(actual).to eql(expected) # passes if actual.eql?(expected)
expect(actual).to equal(expected) # passes if actual.equal?(expected)

# NOTE: `expect` does not support `==` matcher.

{% endhighlight %}

### Object Comparisons

{% highlight ruby %}
expect(actual).to be >  expected
expect(actual).to be >= expected
expect(actual).to be <= expected
expect(actual).to be <  expected
expect(actual).to be_between(minimum, maximum).inclusive
expect(actual).to be_between(minimum, maximum).exclusive
expect(actual).to match(/expression/)
expect(actual).to be_within(delta).of(expected)
expect(actual).to start_with expected
expect(actual).to end_with expected

# NOTE: `expect` does not support `=~` matcher.
{% endhighlight %}


## Expecting Errors

RSpec allows you to develop informative error classes and messages using the `raise_error()` matcher. 

Example: 

`expect { do_something_invalid }.to raise_error`

The `raise_error()` method:

* accepts zero, one, or two arguments.
  * if there are no arguments passed in, the example code will pass as long as any subclass of `Exception` is raised.
  * the first argument can be:
    * a `String` message,
    * a `Regexp` matching the actual message, or
    * the `Class` of the expected error

{% highlight ruby %}
  expect {
    account.withdraw 75, :dollars
  }.to raise_error(/attempted to withdraw 75 dollars/)
{% endhighlight %}

When the first argument is an error class, you can pass in a second argument that is a `String` or `Regexp` matching an actual message

{% highlight ruby %}
  expect {
    account.withdraw 75, :dollars
  }.to raise_error(InsufficientFundsError, 
                  "attempted to withdraw 75 dollars from an account with 25 dollars")
{% endhighlight %}


## Predicate Matchers

In Ruby, a predicate method is one whose name ends with "?" and returns a Boolean response. In RSpec, the `method_missing` method is overridden to allow methods beginning with `be_` and `have_` to test whether a predicate returns true.

{% highlight ruby %}
expect(actual).to be_xxx         # passes if actual.xxx?
{% endhighlight %}

`xxx` should match an existing Ruby predicate method. For example, `be_empty` will be converted by RSpec's `method_missing` to `empty?`, returning true if the object is indeed empty.

In addition to the `be_` and `have_` predicate methods, RSpec also has `be_a_` and `be_an_` methods for Ruby predicates like, `instance_of?` and `kind_of?`.

If you find yourself in a situation where none of the predicates mentioned above will read like plain English, you can create your own custom predicate matchers. 

## To Be Or Not To Be Truthy

To specifically test whether something is `true` or `false` in a Boolean context, you can use RSpec's `be_truthy` and `be_falsey`. These follow Ruby's definition of what's `true` and `false`. Remember, everything in Ruby is truthy except for `false` and `nil`. 

{% highlight ruby %}
expect(0).to be_truthy
expect("this").to be_truthy
expect("nil").to be_truthy
expect(true).to be_truthy

expect(false).to be_falsey
expect(nil).to be_falsey
{% endhighlight %}

To test the actual values `true` and `false`, use the `be()` matcher and simply pass in the value as the argument.

{% highlight ruby %}
expect(true).to be true
expect(false).to be false
{% endhighlight%}


## You Can Have Whatever You Like

In addition to the `be_` predicate matcher, you also have the `have_` matcher. RSpec converts this to a predicate beginning with `has_`. For example, `have_key(:title)` will be converted into Ruby's `has_key?(:title)`. This method will work on any Ruby predicate that begins with `has_`.

{% highlight ruby %}
expect(actual).to have_xxx(:arg) # passes if actual.has_xxx?(:arg)
{% endhighlight %}


## Appointing a Subject

Most example code objects—or subjects—are instantiated in the `before` block, like so:

{% highlight ruby %}
describe Person do
  before(:each) do
    @legal_drinker = Person.new(:birthdate => 21.years.ago)
  end
  
  context "is over 21 years old" do
    it "can buy alcohol" do
      expect(@legal_drinker).to be_able_to_buy(alcohol)
    end
  end
end
{% endhighlight %}

RSpec offers an alternative way to appoint a subject in your examples, using the `subject()` method.


### Explicit Subjects

An explicit subject can be declared, like so:

{% highlight ruby %}
describe Person do
  subject { Person.new(:birthdate => 21.years.ago) }
  
  # you can then interact with the subject with:
  context "is over 21 years old" do
    specify { expect(subject).to be_able_to_buy(alcohol) }
  end
end
{% endhighlight %}

If you use this method, delegation to the subject is done automatically by RSpec, allowing you to drop the `subject` from the statement altogether, while replacing `specify()` with `it()`.

{% highlight ruby %}
describe Person do
  subject { Person.new(:birthdate => 21.years.ago) }
  
  # you can then interact with the subject with:
  context "is over 21 years old" do
    it { is_expected.to be_able_to_buy(alcohol) }
  end
end
{% endhighlight %}

### Implicit Subjects

If you have a class that doesn't require any arguments when instantiated, you can leave out the explicit subject declaration and turn to RSpec's to create an implicit subject.

{% highlight ruby %}
describe Person do
  it { is_expected.to be_alive }
end
{% endhighlight %}

This level of consciseness does come with a fair warning. Relying on RSpec's implicit subject declaration can be error-prone because it takes a lot for granted. This really only works when all the pieces fit. For example, the `describe()` method has to receive a class that can safely instantiate a new object without any arguments, and the resulting instance has to be in the correct state. Otherwise, it will fail. 

Sources: [RSpec Built-in Matchers][1], [The RSpec Book][2]


*Potential topics to be added in the future: Owned Collections, Unowned Collections*

[1]: https://relishapp.com/rspec/rspec-expectations/docs/built-in-matchers
[2]: https://pragprog.com/book/achbd/the-rspec-book