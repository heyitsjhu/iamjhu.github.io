---
title: "Ruby in Bits: Variable Types"
date: 2016-06-02 17:53:54 -0700
disqus_identifier: "11a4fe4e-fe07-4e42-a384-0e3b5a9b66de"
tags: [ruby, fundamentals, variables]
excerpt_separator: <!-- more -->
---

Hello!

So for today's Ruby in Bits, I thought I'd cover variables. More specifically, the different types of variables and how to declare them in Ruby. I won't dive into all the nitty gritty details though—just the really high-level stuff. For a bit more insight on Ruby variables, I'd encourage you to check out Wikibook's [chapter on Ruby variables and constants][1]. If you want to dive a bit deeper, SitePoint has a good [article on variable scopes][2]. For those who aren't familiar with scopes, it's basically how *visible* and *available* an object (i.e., a variable or method) is in a program. For example, can the variable be accessed anywhere witnin the program or only from a specific class or method? Anyways, check out the SitePoint article, it does a good job explaining variable scopes and scope in general.
<!-- more -->
Here's an example of a local variable named `foo_bar`. When naming a variable in Ruby, you can use any combination of letters, digits and underscores. However, the letters are typically lowercase, especially the first letter of the variable. Multiword variables, such as foo_bar, are separated by underscores.

{% include image.html
    url="/assets/images/2016-06-02-variable-types-01.png"
    description="An example of a local variable, along with some common conventions followed by Rubyists."
%}

Appending one of the following prefixes to your variable will change its variable type. Appending a "$"-symbol will change your variable into a global variable. Appending two "@"-symbols will change your variable into a class variable. Appending one "@"-symbol will change your variable into an instance variable. And finally, an underscore or lack of any symbol in front of a variable name, will declare that variable as a local variable.

{% include image.html
    url="/assets/images/2016-06-02-variable-types-02.png"
    description="By appending one of these prefixes, your variable changes to that variable type—affecting its characteristics and scope."
%}

In addition to global, class, instance and local variables. There'ss also a variable called a constant variable. By convention, constant variables are written in all uppercase letters. For example, `FOO_BAR`. The value stored in a constant variable is expected to remain the same throughout the program. However, nothing actually stops you from changing its value if you really wanted to—with the sole exception of Ruby complaining about it. A general rule of thumb, of course, is to not make Ruby complain. :)

{% include image.html
    url="/assets/images/2016-06-02-variable-types-03.png"
    description="By convention, a constant variable is written in all uppercase letters and its value is not expected to change throughout the program."
%}

Did these flashcards help you better remember the different types of variables in Ruby? Is there a specific topic you'd like me to cover in the future? Let me know!


[1]: https://en.wikibooks.org/wiki/Ruby_Programming/Syntax/Variables_and_Constants "Ruby Variables and Constants"
[2]: https://www.sitepoint.com/understanding-scope-in-ruby/ "Understanding Scope in Ruby"