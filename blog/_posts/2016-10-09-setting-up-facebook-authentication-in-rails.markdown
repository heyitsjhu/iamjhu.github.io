---
title: "Setting Up Facebook Authentication in Rails"
date: 2016-10-09 17:57:49 -0700
tags: [rails, omniauth, omniauth-facebook]
---

If you've watched the [Railscast episode on facebook authentication][1] recently and tried implementing it in your Rails application, you may have ran into a few issues along the way, especially if you—like I did—copied the Ryan's code line for line. Since its posting in 2012, some things have changed in both Rails and Facebook's Developer platform. For example, with the introduction of strong parameters in Rails, the `auth.slice(:provider, :uid)` code in the `from_omniauth` method will throw an error message. On the Facebook end, the interface looks different now and can be confusing to navigate as you're comparing it to the layout in screencast. My goal for this post is to highlight these changes and provide solutions to get the omniauth-facebook authentication feature working flawlessly with your application.

To start, below is a list of the gems I'll use in this tutorial so you can add them to your Gemfile at the same time:

{% highlight ruby %}
# Gemfile

gem 'omniauth', '~> 1.3', '>= 1.3.1'
gem 'omniauth-facebook', '~> 4.0'
gem 'figaro', '~> 1.1', '>= 1.1.1'
{% endhighlight %}

Following along with Ryan's screencast, at 1:40 he enters `localhost:3000` in the "Site URL" field on Facebook's Developer page. To find this field in the current layout, go to Basic Settings, then at the bottom of the screen click on "Add Platform", and then "Website". You should now see a "Site URL" field. Go ahead and enter `http://localhost:3000/` here and save the changes.

At 2:20, Ryan goes over the "Auth Dialog" section located under the settings tab. However, note that Facebook no longer has this section so you should just skip it. The Privacy Policy and Terms of Service fields are now located under Basic Settings.

At the 4-minute mark, we come across the *environment variables* used to store our app's ID and SECRET. If you're new to Rails or have never dealt with Ruby's environment variables, you may be lost at this point wondering where exactly where you're supposed to store these values. This is where the **figaro** gem comes into play. Figaro gives us a place within our Rails app to declare environment variables. You can read more about it [here][2].

In the command line, run:

{% highlight shell %}
$ bundle exec figaro install

      create  config/application.yml
      append  .gitignore
{% endhighlight %}

The command will create a new file, `config/application.yml`, and modify your existing `.gitignore`—keeping any environment variables you declare in this new file from being submitting to Git. Open `config/application.yml` and add your environment variables to this file. You can find your APP_ID and SECRET in the Facebook Developer dashboard. It's also located under Basic Settings. If your Rails server is currently running, don't forget to restart it after this step.

Here's an example of what it should look like:

{% highlight ruby %}
# config/application.yml

FACEBOOK_APP_ID: '<YOUR_APP_ID_STRING_HERE>'
FACEBOOK_SECRET: '<YOUR_APP_SECRET_STRING_HERE>'
{% endhighlight %}

Next, Ryan goes over the routes for the application. In newer versions of Rails, you may get an `ArgumentError` when using `match` in your routes without specifying an HTTP method. Something like this:

> **ArgumentError**: You should not use the match method in your router without specifying an HTTP method.
> If you want to expose your action to both GET and POST, add via: [:get, :post] option.
> If you want to expose your action to GET, use get in the router

To resolve this, update your routes so that each line contains `via: [:get, :post]`, as suggested in the error message.

{% highlight ruby %}
# config/routes.rb

Rails.application.routes.draw do
  match 'auth/:provider/callback', to: 'sessions#create',                 via: [:get, :post]
  match 'auth/failure',            to: redirect('/'),                     via: [:get, :post]
  match 'signout',                 to: 'sessions#destroy', as: 'signout', via: [:get, :post]
end
{% endhighlight %}

At 4:50, we'll modify the code to add an extra layer of protection to our application by extracting the `omniauth.auth` hash into a protected method.

{% highlight ruby %}
# app/controllers/sessions_controller.rb

class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(auth_hash)
    session[:user_id] = user.id
    redirect_to root_url
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end

  protected
  def auth_hash
    request.env["omniauth.auth"]
  end
end
{% endhighlight %}

At 5:55, due to Rails 4 introducing the use of strong parameters, the `from_omniauth` method will raise an `ActiveModel::ForbiddenAttributesError`

To fix this, change:

{% highlight ruby %}
where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
{% endhighlight %}

to:

{% highlight ruby %}
where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
{% endhighlight %}

Follow the rest of the video until the end and you should have a working Facebook authentication system in your application!

## Optional

Personally, I am not very familiar with CoffeeScript and don't plan on learning it anytime soon, so I ended up converting it back to Javascript using an online compiler. I included the code below in case you want to do the same. Don't forget to remove the `.coffee` extension from the filename, too.

{% highlight javascript %}
// app/assets/javascripts/facebook.js.erb

jQuery(function() {
  $('body').prepend('<div id="fb-root"></div>');
  
  return $.ajax({
    url: "" + window.location.protocol + "//connect.facebook.net/en_US/all.js",
    dataType: 'script',
    cache: true
  });

});

window.fbAsyncInit = function() {
  FB.init({
    appId: '<%= ENV["FACEBOOK_APP_ID"] %>',
    cookie: true
  });

  $('#sign_in').click(function(e) {
    e.preventDefault();
    return FB.login(function(response) {
      if (response.authResponse) {
        return window.location = '/auth/facebook/callback';
      }
    });
  });

  return $('#sign_out').click(function(e) {
    FB.getLoginStatus(function(response) {
      if (response.authResponse) {
        return FB.logout();
      }
    });
    return true;
  });
  
};
{% endhighlight %}

[1]: http://railscasts.com/episodes/360-facebook-authentication "Facebook Authentication by Ryan Bates"
[2]: https://github.com/laserlemon/figaro, "Figaro gem on GitHub"