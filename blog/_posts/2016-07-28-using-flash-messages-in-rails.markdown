---
title: "Utilizing Flash Messages in Rails"
date: 2016-07-29 12:09:12 -0700
tags: rails
---

Common in today's web applications are friendly notifications that alert you of important information. For example, a message that informs you whether or not the changes you made to your profile saved successfully. Or, if your attempt to post to your blog was registered by the web application. Rails makes handling these kinds of notifications easy with the use of *flash messages*.

## Setting up our flash message

In Rails, flash messages are most commonly defined inside a controller. For example, if we had a `PostsController`, we would include a couple of flash messages in our `create` which will let our user know whether or not a post was successfully created. The code in our `create` action might look something like this:

{% highlight ruby linenos %}
class PostsController < ActionController::Base
  def create
    if @post.save
      flash[:success] = "Post successfully created."
      redirect_to @post
    else
      flash[:danger] = "Uh oh. Something went wrong. Please try again."
      render 'new'
    end
  end
end
{% endhighlight %}

If a post saves successfully, we pass `flash` a hash containing the key `:success` and the value `"Post successfully created."` This is written as `flash[:success] = "Post successfully created."` on Line 4.

Similarly, if the post fails to save, our `if` statement's `else` clause will execute. Here, we do the same thing. We pass a hash to `flash` containing a key/value pairing. This time, we're passing in the key `:danger`, along with the value `"Uh oh. Something went wrong. Please try again."`

You may be wondering why I've chosen the keys `:success` and `:danger` as opposed to something else. This is because in this tutorial I'm using Bootstrap so I don't have to worry much about the CSS styling. This allows us to focus on the implementation of the flash messages themselves and not have to worry about styles.

If you're not using Bootstrap in your project, you'll have to replace the class properties used in this tutorial with the ones from your own framework.

## Bootstrap's alert styles

The Bootstrap framework includes [four contextual classes for basic alerts messages][1]: success, info, warning, and danger. Alongside a base class—which defines the structure of the alert messages—the contextual class gives the messages a certain look and feel. The code for a typical Bootstrap alert message looks like this:

{% highlight html linenos %}
<div class="alert alert-success" role="alert">
  <p>Some alert message here.</p>
</div>
{% endhighlight %}

Here, we have two classes: the base class,`alert`, and the contextual class, `alert-success`. This is the primary reason why we provided our `flash` hash with the key `:success` or `:danger`. It is so that—later—when we write our HTML, we can style our alert message dynamically based on the flash's key. In other words, whether or not our post saves determines whether our contextual class will be `alert-success` or `alert-danger`.

With that brief explanation and the logic for our flash messages in place, we're ready to write our HTML.

## Writing the HTML code

Our HTML will look similar to the one in the previous section, except we'll add some embedded ruby code to it. Everything will go directly into our *application.html.erb* file, right beneath the opening `<body>` tag.

*/views/layouts/application.html.erb*
{% highlight html linenos %}
<html>
<!-- <head> omitted -->
<body>
  <% flash.each do |type, msg| %>
    <div class="alert alert-<%= type %>" role="alert">
      <p><%= msg %></p>
    </div>
  <% end %>

  <!-- rest of code omitted -->
</body>
</html>
{% endhighlight %}

Our code is on Lines 4-8.

On Line 4, we embed Ruby code that iterates through each key/value pairing stored within `flash`. We end the iteration on Line 8.

Because of how we designed the logic in the `PostsController`, our `flash` will only ever contain a single key/value pairing. It's either going to hold the `:success`/`"Post successfully created."` pairing or the `:danger`/`"Uh oh. Something went wrong. Please try again."` pairing.

Lines 5-7 contains the familiar HTML code we saw in the previous section, except now we've included some embedded Ruby code. The embedded code references the key/value pairing from our `flash`—which, in our iterator, we've labeled as `type` and `msg` because it better reflects the kind of data we're passing through.

On Line 5, we feed the `type`, or key, into the class property. If the post saves successfully, our `type` would be `:success`, which when converted to a string and fed into the class property gives us the class `alert-success`. If the post fails, our `type` would be `:danger`, which gives us the class `alert-danger`.

On Line 6, we simply feed the value corresponding to our key into the HTML.

Here's what our code would look like in production when an attempt to save a post succeeds:

{% highlight html linenos %}
<div class="alert alert-success" role="alert">
  <p>Post successfully created.</p>
</div>
{% endhighlight %}

And, when it fails:

{% highlight html linenos %}
<div class="alert alert-danger" role="alert">
  <p>Uh oh. Something went wrong. Please try again.</p>
</div>
{% endhighlight %}

## Extracting the flash message into a partial

To keep our *application.html.erb* file simple—especially when your application grows—we can extract our flash message into a Rails partial. We'll name our file *_flash_message.html.erb* and place it into a *shared* subfolder inside the *layouts* folder. Partial files should always start with a *_ underscore*.

*/views/layouts/shared/_flash_message.html.erb*
{% highlight html linenos %}
<% flash.each do |type, msg| %>
  <div class="alert alert-<%= type %>" role="alert">
    <p><%= msg %></p>
  </div>
<% end %>
{% endhighlight %}

Now, we can update our *application.html.erb* file with the following to include our partial:

*/views/layouts/application.html.erb*
{% highlight html linenos %}
<html>
<!-- <head> omitted -->
<body>
  <%= render 'shared/flash_message' %>

  <!-- rest of code omitted -->
</body>
</html>
{% endhighlight %}

Note, in the above we do not include the underscore at the beginning of the filename. When rendering partials, Rails automatically knows to look for a corresponding file with an underscore at the beginning of the filename.

And there you have it! Nice, informative flash messages for your users!

[1]: http://getbootstrap.com/components/#alerts "Bootstrap Alerts"