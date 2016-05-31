---
title: "Setting Up Categories in Jekyll"
date: 2016-05-21 17:44:20 -0700
disqus_identifier: "1e90b835-9580-41c4-a05a-eafc158e84b7"
tags: [jekyll, categories]
---

I recently transitioned over from WordPress to Jekyll because I wanted more control over the layout of the blog. Working through Jekyll's guide, I was initially excited when I came across the [Front Matter][1] section and read that, instead of having to place my posts in separate folders, I can just use Jekyll's Category/Categories global variable to set my post's category. All I had to do was add the category to my post's front matter, like so:

~~~~
---
title: "Setting Up Categories in Jekyll"
date: 2016-05-21 17:44:20 -0700
category: "development"
---
~~~~

This, in turn, creates the following permalink for my post:

> http://www.iamjhu.com/blog/development/2016-05-21-setting-up-categories-in-jekyll.html

What Jekyll does is—when the site is generated—it sets the post with the category listed in the front matter. Cool. But what if my post belongs to more than one category? Good question. We simply need to update our front matter variable, for example, to:

`categories: [development, jekyll]`

**Note:** when assigning multiple categories to a post, we use the `categories` (plural) variable instead of `category`. We also use an array—or [YAML list][2]—to store our values. Alternatively, you can use a comma-separated string, so that `categories: "development, jekyll"` would work just the same.

With this change, my post's new permalink becomes:

> http://www.iamjhu.com/blog/development/jekyll/2016-05-21-setting-up-categories-in-jekyll.html

One thing to point out here is how Jekyll processes the list of categories. It basically nests the latter category inside the category that precedes it. In my example above, the category `jekyll` is nested inside—and therefore, is effectively a subcategory—of `development`. (Now, whether or not this is your intentions, this side effect can become a potential problem—and one I plan to write about in the future, after I do a little more research.)

Going back to our example, one scenario where this approach may become troublesome is when you decide to change or update one of the existing categories. Let's say, six months down the road, I decide to change the `development` category to `web development` instead. How would I go about doing this? With the current approach, the only way to make this change would be to go back into every post belonging to the `development` category and update the front matter. *Eek!* That could take awhile.

These are the types of things you need to think about when you're deciding on which approach to take to tackle a problem. For me, given the above scenario, I decided to go with the alternate approach instead—placing posts in folders. Instead of identifying the categories within each post's front matter, I create a development folder within my site's blog folder. Inside the development folder, I create a _posts subfolder and store all of my posts related to that development into that subfolder. Visually, the folder structure would look something like this:

{% include image.html 
    url="/assets/images/2016-05-21-category-folder-structure.png" 
    description="Screenshot of folder structure with category folders: design and development." 
%}

Let's break this down real quick.

- The blog folder sits in the root directory. 
- Within the blog folder contains an index.html and two category folders: design and development.
- Within each category folder is a subfolder called _posts.
- Within the _posts folder lives all of the posts related to that category.

Now, some might argue that this folder structure will become cluttered over time—especially for a site with a bunch of categories. That's a fair point. And it might be true, too! I just haven't gotten to that point yet (I'm new to Jekyll, remember?). But definitely something I'll keep in mind. 

For my purposes, which is a blog with a few targeted categories, I feel this approach works best because if, down the road, I decide to change my `development` category to `web development`, all I need to do is rename the folder.

{% include image.html 
    url="/assets/images/2016-05-21-category-folder-structure-renamed.png" 
    description="Screenshot of folder structure with updated category folders: design and web development." 
%}

By performing this one action, the permalinks of all the posts belonging to this category is updated automatically. The permalink for my example post is now:

> http://www.iamjhu.com/blog/web%20development/2016/05/21/setting-up-categories-in-jekyll.html

**Note:** %20 is URL encoding for a space.

Best of all, Jekyll recognizes this change and updates the post's metadata! If you don't believe me, add {% raw %} `{{ page.categories }}` {% endraw %} to the body of one of your posts and view the page. You'll see that the category metadata for that post has been updated too. Cool! Now you can manipulate that data just like you would had the categories been listed in the post's front matter! Go bonkers!

The last thing I want to add is that if I wanted to move a post from one category to another, I simply have to drag and drop the file into the appropriate folder and everything updates itself as a side effect. That's pretty damn great, right? :D

[1]: https://jekyllrb.com/docs/frontmatter/ "Front Matter"
[2]: https://en.wikipedia.org/wiki/YAML#Lists "YAML List"