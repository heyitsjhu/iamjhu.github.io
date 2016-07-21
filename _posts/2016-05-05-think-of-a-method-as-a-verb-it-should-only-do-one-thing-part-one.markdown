---
title: "Think of a Method as a Verb—It Should Only Do One Thing, Part I"
date: 2016-05-05 16:08:10 -0700
disqus_identifier: "18914311-0a94-4b52-b78a-e3b920f001db"
tags: [ruby, programming, coding]
---

I’m new to programming and so when I first learned about methods, knowing when and how to use them wasn’t always apparent. And, while I knew that methods are useful in the sense that they can be reused, I didn’t necessarily know what they should do.

It wasn’t until I came across the following concept did I start to better understand the usage of methods and how to go about creating them. The approach that’s stuck with me the most is to think of methods as verbs—an action that does something.

But that’s not all—a method should only do *one* thing.

When a method performs only one action, it accomplishes a few of things—it makes:

* your code cleaner, simpler, and easier to understand 
* naming your method easier 
* you, and other programmers, less confused!

The more I think about this approach, the more it makes sense to me. When I think of the word, kick, it does one thing. The same with the word, jump.

In the context of, say, a baseball game, there’d be a method for the player swinging the bat and another for the player running to first base. Said another way, you wouldn’t have a method that contains both the logic for the player swinging the bat and running to first base. Why? Because the player doesn’t always run towards first base after swinging his bat. He could, for example, swing and miss.

When you separate the two actions, the code becomes simpler. Each method does exactly one thing and you don’t need to include any conditional logic within the method to determine if the player runs or not. The methods would look something like this:

{% highlight ruby linenos %}
def player_swing(pitch)
  # code
end

def player_run(base)
  # code
end
{% endhighlight %}

As you can see, keeping the actions separate also makes naming your methods much, much easier. Had the two actions been enclosed in a single method, what would we have named our method—`player_swing_and_run`, `player_swing_and_or_run`?

The first one wouldn’t work—it’s misleading too—because the player may or may not run after swinging, depending on whether or not he hits the ball. The second one works, but it’s a bit verbose. It’s also not reusable. What if we wanted to reuse the run logic for running to second base? And third base? With our `player_swing_and_or_run` method, you can’t really do that. Even if you did, the resulting code is not going to be an easy read.

I hope by now you’re beginning to understand the benefits of creating methods that perform only one action. To close out, I’d like to show you how this approach also enhances readability, not just for you but for other programmers reading your code as well. Once we’ve defined our methods, our code might look something like this:

{% highlight ruby linenos %}
player_swing(pitch)
if player_swing(pitch) == hit_ball?
  player_run(first_base)
end
{% endhighlight %}

The code above reads almost like English: “Player swings at pitch. If player’s swing hits the ball, player runs to first base.” Here, if the player doesn’t hit the ball, nothing happens. But in a real application, we’d probably tally the strike, check if the player struck out, and if not, add a loop to perform the next pitch.

I’m still in the early stages of learning how to program, so I may not be 100% correct. Any constructive feedback is greatly appreciated!

Happy coding!

jhu