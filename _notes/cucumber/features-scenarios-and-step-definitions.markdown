---
title: "Features, Scenarios, and Step Definitions"
last_updated: 2016-10-18 11:35:14 -0700
topic: "cucumber"
---

Cucumber is a tool that not only automates tests but aims to eliminate the language barrier that often exist between business stakeholders and developers. Additionally, Cucumber's simple language and format—thanks to the Gherkin language—makes writing and reading scenarios easily for both technical and nontechnical personnel. 

## Three Parts of Cucumber

* Features
  * has a title
  * a free-form narrative
  * an arbitrary number of scenarios
    * each can contain an arbitrary number of step definitions
* Step definitions
  * are written in the language of the system
  * serve as acceptance criterias
* `cucumber` command
  * parses the steps outline in the feature and attempts to map it to corresponding step definitions

{% highlight ruby %}
Feature: User likes other users' posts
  In order to encourage interaction between users
  As a site owner
  I want users to be able to like other users' posts
  
  Scenario: Successful like
{% endhighlight %}

## Features

Features are high-level requirements expressed from the perspective of a person or another computer using the system. They're similar to *user stories* in UX.

* Title
  * typically represents an activity or engagement between a user and the system
    * Chess player makes a move
    * User uploads a new picture
  * should be short, terse, and make it easy to formulate a big picture without getting bogged down with too much details

* Narrative
  * provides context for the executable scenarios you'll be writing
    * should be short but descriptive
    * should include the role of the user, the action the user takes, and the expected response to the action
  * Connextra Text
    * `As a <user>`
    * `I want <feature>`
    * `So that <business value>`
  * should match "requirement" with "reason"
    * focus on features that will actually be used

* Customer Acceptance Tests
  * represents an agreement between shareholders and delivery team
  * specifics how a feature should behave
  * are scoped to the current iterations
    * new ideas are added to a backlog for future consideration
  * while not always true, changing stories mid-iteration is often very costly

## Gherkin

Cucumber features are written in Gherkin in `.feature` files. Gherkin supports thirty-five different languages and can be defined on the first line of a `.feature` file, like this: `# language: en`.

* Gherkin Keywords
  * Feature
  * Background
  * Scenerio
  * Scenario Outline
  * Scenarios
  * Given
  * When
  * Then
  * And
  * But
  * &#124; (used to define tables)
  * """ (used to define multi-line strings)
  * &#35; (used for comments)

## Scenarios

Scenarios are concrete examples of how we want the software to behave. They should describe exactly what should happen under what circumstances. 

Scenarios:
* are best approached by describing the "happy path" first
  * followed by edge cases 

{% highlight ruby %}
Feature: User likes other users' posts
  In order to encourage interaction between users
  As a site owner
  I want users to be able to like other users' posts
  
  Scenario: Successful like

  Scenario: Unliking an existing like
{% endhighlight %}


## Steps

Steps are used to describe everything that happens within a scenario. There can be an arbitrary number of steps. Steps begin with one of the following keywords: `Given`, `When`, `Then`, `And`, and `But`.

## Given/When/Then

Given/When/Then is used to describe behavior because it closely relates to how one might describe a real-life scenario in conversation.

* Given: indicates something we accept to be true in a scenario
  * often miscontrued to mean precondition, however givens are not bound by preconditions
* When: indicates the event in a scenario
  * typically, a scenario should only have a single event
* Then: indicates an expected outcome
  * multiple outcomes are OK, but they should be cohesive

## Declarative and Imperative Scenario Styles

Two of the most common ways of writing scenarios are the declarative and imperative styles.

{% highlight ruby %}
Scenario: transfer money (declarative)
  Given I have $100 in checking
  And I have $20 in savings
  When I transfer $15 from checking to savings Then I should have $85 in checking
  And I should have $35 in savings

Scenario: transfer money (imperative) 
  Given I have $100 in checking
  And I have $20 in savings
  When I go to the transfer form
  And I select "Checking" from "Source Account" And I select "Savings" from "Target Account" And I fill in "Amount" with "15"
  And I press "Execute Transfer"
  Then I should see that I have $85 in checking And I should see that I have $35 in savings
{% endhighlight %}

Both styles tell the same story but at different levels of abstraction. Each comes with their own benefits and trade-offs.

* Declarative steps:
  * tend to be more customized to each scenario
  * time spend writing step definitions are more spread out throughout the development of the application
  * more of the maintenance burden is carried by step definitions
  * smaller teams where developers are also responsible for business analysis typically benefit from this style

* Imperative steps:
  * are more composable
    * which generally allows you to support more scenarios with fewer step definitions
  are more verbose
  * more time is spent on building generic step definitions early on
  * more of the maintenance burden is carried by the plain-text features
  * larger teams with dedicated business analysts typically benefit from this style

Instead of adhering to one specific style, perhaps the most effective style to use is a balance between both imperative and declarative styles.

## Organizing Features

There are a number of ways to organize features. For smaller projects, it's sometimes easier to just store the `.feature` files within the `./features` directory.

For larger projects, there are several options available:

* create subdirectories for each feature inside the `./features` directory 
  * each subdirectory has multiple files
    * each file has a cohesive subset of scenarios
    * cohesive scenarios are typically those that share the same background
* create subdirectories of feature sets, or themes, inside the `./features` directory

## Tags

While tags can be used to as a grouping method for organization features, it's recommended that they instead be used for workflow. Leave the organization of features to directories and subdirectories.

Tags are useful for controlling a subset of scenarios within a full suite. For example, you might have a test suite with some passing tests, a few pending ones, and a couple of work-in-progress tests. When you run your suite, you don't want to run the pending or work-in-progress scenarios for obvious reasons.

### This is where tags come

The anatomy of a tag:

* begins with an @, followed by any number of alphanumeric characters and underscores
* can be applied to features and scenarios by adding them to the line before a `Feature` or `Scenario` keyword
* scenarios inherit the tags of it's parent (the feature)

To run all of the scenarios with a given tag, you add `--tag @tag_name` after the `cucumber` command, like so:

`cucumber --tag @wip`

The `--tag` also accepts a variety of complex *tag expressions*, allowing you to orchestrate conditional expressions.

{% highlight gherkin %}
cucumber --tags @foo,@bar
  # @foo || @bar
  # runs all of the scenarios tagged with @foo OR @bar
cucumber --tags @foo --tags @bar
  # @foo && @bar
  # runs all of the scenarios tagged with @foo AND @bar
cucumber --tags ~@dev
  # !@dev
  # runs all of the scenarios NOT tagged with @dev
cucumber --tags @foo,~@bar --tags @baz
  # (@foo || !@bar) && @baz
  # runs all of the scenarios (tagged with @foo OR NOT tagged with @bar) AND
  # tagged with @baz
{% endhighlight%}

In addition to using tags for workflow, and organization—as mentioned earlier—tags can also be used to:

* identify scenarios that should only be run in a certain environment
* identify scenarios that represent different sorts of testing, like workflow scenarios vs business rules
* run only scenarios that run quickly
* run only scenarios related to a feature set or theme

*Source: [The RSpec Book][1]*

[1]: https://pragprog.com/book/achbd/the-rspec-book
