---
title: "Making Use of Jekyll Collections"
date: 2016-10-19 11:24:18 -0700
tags: [jekyll]
---

One of the things I like about Jekyll is the ability to create collections. Collections are a lot like Jekyll's posts and pages. They allow you to create a new type of document with its own properties and namespace.

To start, create a subdirectory within your Jekyll site. This is where you'll store your collection. The name of the folder should represent what your collection is. I'll be using *members*. Make sure, when you create your subdirectory, you prepend it with an underscore, like so: `_members`.

Next, create a `members.html` in the root directory to serve as the index page for our collection. If you're using the defauly method that came with Jekyll for listing nav items, your new collection will be added automatically. Otherwise, you might have to add it to your nav manually.

In the front matter of `members.html`, we'll set the layout to Jekyll's page layout so it's consistent with the rest of the sites pages. Again, I'm using the Jekyll's defaults. 

{% highlight ruby %}
# members.html

---
layout: page
title: Members
permalink: /members/
---

<!-- HTML code here -->
{% endhighlight %}

Next, similar to a Jekyll post, we'll want a dedicated page for each of the members on the team. But we also want its layout to be consistent from member page to member page. So, let's create a new layout. 

In the `_layouts` subdirectory, create a corresponding `member.html` layout. Notice we're using the singular form, which matches the naming convention of the other layouts in the directory.

Inside the front matter, set the layout to default. You might not need to do this depending on how your site's structure is laid out. But, for my site, every page eventually inherits from the default layout. This helps ensure what the reader sees in terms of layout will be consistent.

{% highlight ruby %}
# _layouts/member.html

---
layout: default
---
{% endhighlight %}

So far, we've created:

* the directory in the root: `_members`
* the members index page in the root: `members.html`
* the layout page in the _layout directory: `member.html`

Next, we'll create an individual member's page inside our `_members` directory named `johnny.markdown`. If you prefer, you can use `.html` here, instead.

Inside the file, we'll define a some front matter properties.

{% highlight ruby %}
# _members/johnny.markdown

---
layout: member
name: Johnny Hu
position: Developer
---

# Markdown text goes here
{% endhighlight%}

Notice we're specifying which layout to use—the `member.html` layout we just created. Next, we'll go back and modify the layout page so it retrieves the information from our member's page. 

{% highlight ruby %}
# _layouts/member.html

<section class="member">
  <h1 class="member__name"> {% raw %}{{ page.name }}{% endraw %} </h1>
  <p class="member__position"> {% raw %}{{ page.position }}{% endraw %} </p>
  <p class="member__bio"> {% raw %}{{ content }}{% endraw %} </p>
</section>
{% endhighlight %}

Whenever a layout pulls information from another file, that file is referenced by Jekyll as `page`. We can then retrieve attributes belonging to that page by calling the corresponding property names, like `page.name` and `page.position`.

`{% raw %}{{ content }}{% endraw %}` will then pull everything else from the page—the content that appears after the front matter.

The last thing we need to do is add some configuration to `_config.yml` file.

{% highlight ruby %}
# _config.yml

collections:
  members:
    status: employed
    output: true
{% endhighlight %}

Here, we tell Jekyll about our collection by passing in our collection's name, `members`, followed by a nested hash of metadata. 

Metadata is optional, and you can define any metadata you want and it'll be applied to the entire collection. I define a `status: employed` metadata just as an example. A popular metadata is `permalink` if you want your collection to have a particular url path.

The second metadata, `output: true`, is required if you want to render your collection's documents into individual, public-facing files—i.e., converting `.markdown` files to `.html` files.

So that the file:

{% highlight ruby %}
_members/johnny.markdown
{% endhighlight %}

renders to:

{% highlight ruby %}
<site-destination>/members/johnny.html
{% endhighlight %}

Next, add the following to `_config.yml`

{% highlight ruby %}
defaults:
  -
    scope:
      path: ""
      type: "members"
    values:
      layout: "member"
{% endhighlight %}

This bit of code adds some default behavior for our new collection. The behavior is scoped to **all** files (`path: ""`) residing in the **members** directory (`type: "members"`). The behavior itself is for all member pages to default to the **member** layout (`layout: "member"). Now, we no longer need to define the layout in each individual member page's front matter.

Save your `_config.yml` file and restart your server if you haven't already. And there you have it, a new collection of documents for your Jekyll site!


Reference(s): [Jekyll Collections][1]

[1]: https://jekyllrb.com/docs/collections/