---
title: "Ruby in Bits: The Receiver and the Method"
date: 2016-05-31 11:31:52 -0700
disqus_identifier: 67b3bec4-432c-4287-b294-a029cec1eea1
tags: [ruby, fundamentals, receiver, method]
---

So last night, while reading [Programming Ruby][1], I thought to myself, "How can I reinforce the things I learn from reading?" I don't know about you but I'm hardly able to retain any information from reading alone. So, after some pondering, I came up with this "Ruby in Bits" idea where I essentially create images resembling flashcards that contain some Ruby code—along with labels that highlight things like syntax, definitions, and whatnot. Then I follow it up with another—less formal, less technical—image that reflects my understanding of the code—and how I see it from my perspective. I'm hoping that by performing these exercises, it'll help reinforce the things that I learn. And hopefully, they can help you out as well!

Alright, so here's the first one: **the receiver** and **the method**.

{% include image.html 
    url="2016-05-31-receiver-and-method-01.png" 
    description="An image showing the receiver (a string) and the method (the index method) in the Ruby code 'Johnny'.index('h')."
    caption="" 
%}

And this is how I make sense of their interaction with each other!

{% include image.html 
    url="2016-05-31-receiver-and-method-02.png" 
    description="The same image but with added dialogue, where the method asks the receiver which index position the letter 'h' is in the string 'Johnny'. The answer is index position 2." 
    caption=""
%}

How do you interpret the interaction between a receiver and its method? I'd love to hear about it! 

[1]: https://pragprog.com/book/ruby4/programming-ruby-1-9-2-0 "Programming Ruby"