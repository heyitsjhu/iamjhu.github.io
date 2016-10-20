---
title: "Step Definitions, Scenario Outlines, and Cucumber Configurations"
last_updated: 2016-10-20 13:20:41 -0700
topic: "cucumber"
---

Within Cucumber scenarios are steps—the lines of Given/When/Then statements that describe the our feature's behavior under a specific environment.

{% highlight gherkin %}
# language:en
Feature: Traveler books room
  In order to reduce staff
  As a hotel owner
  I want travelers to book rooms on the web

  Scenario: Successful booking
    Given a hotel with "5" rooms and "0" bookings
{% endhighlight %}

When you run the `cucumber` command, any undefined step statementsthose without a block—are labeled as pending in the output. Cucumber will also provide code snippets for each pending step statement you have. These code snippets are called **step definitions**. 

{% highlight gherkin %}
# step definition example

Given /^a hotel with "([^"]*)" rooms and "([^"]*)" bookings$/ do |arg1, arg2|
  pending # express the regexp above with the code you wish you had
end
{% endhighlight %}


## Step Definitions

Step definitions are stored inside a `step_definitions/` subdirectory within the `features` folder, as `.rb` files. The code that hooks up to the application goes inside the blocks of these step definitions.

* Each step definition consists of a regular expression and a block
* Regular expressions can also contain capture groups, enclosed in double-quotes
  * capture groups are treated as arguments to the block
    * syntax: `"([^\"]*)"`
    * arguments captured are always passed as "string"


## Cucumber `World`

Every scenario runs in the context of a new instance of an object, called `World`. All of the step definitions for a scenario will execute their blocks in the context of this same instance.

### Customizing World

Helper methods can be made available to step definitions by adding modules using the `World()` method.

{% highlight ruby %}
module HelperMethods
  def some_helper
  end

  def another_helper
  end
end

World(HelperMethods)    # includes helper methods in World
{% endhighlight %}

`World` can be configured in any Ruby file stored in `features` or its subdirectory. But, a common location is in `features/support/world.rb`.

In addition to mixing Ruby modules, we can change `World`'s default behavior so that it takes on an instance of some other class. To achieve this, pass a block to the `World()` method.

{% highlight ruby %}
class MyWorld
  def some_helper
  end
end

World do
  MyWorld.new
end
{% endhighlight %}


### Real World Examples

* `cucumber-rails` configures `World` to be an instance of `ActionController::IntegrationTest`.
* RSpec and Webrat mixes in various modules so their libraries' helper methods are available within step definitions.


## Calling Steps Within Step Definitions

It is possible to call steps from within step definitions by passing them into the block. This approach is often used to encapsulate several steps within a higher-level step definition.
* Benefits
  * reduces duplication among repeated series of steps across scenarios
  * keeps code DRY
* Trade-offs
  * becomes difficult to understand failures if steps are nested too many levels
  * adds different layers of abstraction across step definitions

{% highlight ruby %}
# example taken from The RSpec Book, p. 252

# Consider the following scenario:
When I select checking as the source account
And I select savings as the target account
And I set $20.00 as the amount
And I click transfer

# It can be condensed to:
When I transfer $20.00 from checking to savings

# Which we can use to encapsulate the previous steps
When /I transfer (.*) from (.*) to (.*)/ do |amount, source, target|
  When "I select #{source} as the source account"
  When "I select #{target} as the target account"
  When "I set #{amount} as the amount"
  When "I click transfer"
end

# An alternative syntax that yields the same results
When /I transfer (.*) from (.*) to (.*)/ do |amount, source, target|
  steps %Q{
    When I select #{source} as the source account
    And I select #{target} as the target account
    And I set #{amount} as the amount
    And I click transfer
  }
end
{% endhighlight %}


## Hooks

Hooks allow you to perform common operations before and after each scenario. RSpec has `before()` and `after()`. MiniTest has `setup()` and `teardown()`. Cucumber uses `Before` and `After`.

* Hooks can be configured in any Ruby file
  * But more commonly, are defined in `features/support/hooks.rb`
* Hooks are executed in the order that they're defined
* Hooks can be tagged so that they only run under certain scenarios

### Tagged Hooks

To tag a hook, pass in one or more tag expressions into the hook.

{% highlight ruby %}
Before("@tag") do
  puts "This hook will only run in scenarios tagged with @tag"
end
{% endhighlight %}

More complex tag expressions can also be used:

{% highlight ruby %}
Before("@tag_1, ~@tag_2", "@tag_3") do
  puts "This hook will run in scenarios tagged with @tag_1 or not @tag_2 AND @tag_3"
end
{% endhighlight %}


## Background

Since `Before` and `After` hooks are written in Ruby, they may not be as easily readable to nontechnical team members than steps. So, in situations where we have steps we want to invoke before every scenario and want those steps to be easily readable to nontechnical, we can use the `Background` keyword in the feature file.

A `Background` will run before each scenario. If there are also `Before` hooks defined, they will run before the `Background`.

{% highlight gherkin %}
Feature: posting
  
  Background: Logged in
    Given I am logged in as "Johnny"
    And there is a user name, "Bobby"
    And "Bobby" has a post "Bobby's Post"

  Scenario: Create a post
  Scenario: Comment on another user's post
{% endhighlight %}


## Tables

Tables can be defined in Cucumber steps using the pipe symbol `|`. 

{% highlight gherkin %}
Scenario: hand with higher total beats hand with lower total

Given a hand with the following cards:
  | rank | suit |
  | K    | H    |
  | 7    | S    |
And another hand with the following cards:
  | rank | suit |
  | 8    | D    |
  | 6    | C    |
Then the first hand should beat the second hand
{% endhighlight %}

Cucumber will convert the data into an array of hashes—via a `hashes()` method—with the header as keys.

{% highlight ruby %}
[
  { :rank => 'K', :suit => 'H' }, { :rank => '7', :suit => 'S' }
]
{% endhighlight %}

Cucumber then delivers the data to the step's block as the *last block argument*. If there are no other arguments captured in the step, then the hashed table data would be the only argument passed into the block.

The corresponding step definition might like something like this:

{% highlight ruby %}
Given /^a hand with the following cards:$/ do |cards_table| 
  hands << Hand.new do |hand|
    cards_table.hashes.each {|hash| hand << Card.new(hash)}
  end 
end
{% endhighlight %}


## Scenario Outlines

In cases where there are several similar steps across multiple scenarios, we can extract those steps using scenario outlines to keep the codebase DRY. They're defined once with placeholders for the values that may change from scenario to scenario. The values can then be expressed using tables.

{% highlight gherkin %}
# example taken from The RSpec Book, p. 259

Scenario Outline: 
  Given the secret code is "<code>"
  When I guess "<guess>"
  Then the mark should be "<mark>"
Scenarios: all numbers correct 
  | code | guess | mark | 
  | 1234 | 1234  | ++++ | 
  | 1234 | 1243  | ++-- | 
  | 1234 | 1423  | +--- | 
  | 1234 | 4321  | ---- |
{% endhighlight %}

The `Scenarios` keyword identifies a collection of input data for the outline. An alias keyword—`Examples`—is also available. Notice that the column headers in the table matches the placeholders in the scenario outline.


## Configuration

The `cucumber` command can be configured with switches and options. One such example is in the use of tags: `cucumber --tags @wip`. These configurations can be placed inside a `cucumber.yml` saved either in the `root` or `config/` directories.

{% highlight yml %}
# cucumber.yml

wip: --tags @wip
{% endhighlight %}

You can now run the `cucumber` command with the profile—`wip`—in place of the more verbose syntax: `cucumber -p wip`. The `-p`, and its verbose counterpart `--profile` informs the `cucumber` command that what comes after it is a profile.


Sources: [The RSpec Book][1]

// todo: multi-line text

[1]: https://pragprog.com/book/achbd/the-rspec-book
