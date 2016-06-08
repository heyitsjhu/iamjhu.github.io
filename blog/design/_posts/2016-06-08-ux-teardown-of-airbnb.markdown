---
title: "UX Teardown of Airbnb.com"
date: 2016-06-08 09:47:48 -0700
disqus_identifier: "87c7d8e7-210d-43dd-8c8f-b4b1ba490c8b"
tags: [ux, user experience, airbnb]
---

In this post, I visit [Airbnb's website][1] to explore and analysis their UX information architecture. In order words, how well does the site do in helping its users reach their goal. Of course, I won't know exactly who Airbnb's users are and what their user's critical goal is when they visit the site. However, by exploring the site myself, I'll be able to get a feel for what the site is aiming to accomplish and, based on that information, assess and analyze of the site's UX. For those interested, this is an exercise from [Viking Code School][2]'s prep course on [Web Design Basics][3]—which provides an excellent primer on UX and its importance.

### Who is the key user?
The key user visiting Airbnb is likely someone who is planning for an upcoming trip and looking for a place to stay. Additionally, this individual may be looking for an alternative to hotels or perhaps a place to stay that is in close proximity to the places he or she is planning to visit during the trip.

### What is that user’s number one critical goal when using the site?
The number one goal for using Airbnb is to find a place to stay at a specified destination—preferably at an affordable price.

### What is likely to make that user’s experience particularly positive?

- **Sense of trust and safety** -- users would likely want to know the places they are booking are safe and trustworthy. (Surprisingly, as I was exploring the site, I came across Airbnb's [Trust and Safety][4] page—which is definitely reassuring.)
- **Number of available options to choose from** -- users would probably want to be able to choose from a number of available options—and not just one or two.
- **Good images and detailed descriptions** -- users would want to be able to get a good sense of what the place will look like before booking it.
- **Tailored search options** -- users may want to narrow their search results based on various criteria and preferences.

### What is the approximate information architecture of the site?
On the home page, you have a simplistic navigation bar—with links to 'Become a Host', 'Help', Log In', and 'Sign Up'—a search form, and content for exploring various destinations. If you're signed in, your navigation changes slightly with links to 'Profile' and 'Messages'. Lastly, you have the footer section, containing the site map.

In terms of data, the primary data models are likely the users (people), the destinations, and the individual listings. 
{%include image.html
  url="2016-06-08-airbnb-ia-01.png"
  description=""
%}

### What is the flow through that architecture for the user who is accomplishing the critical goal you identified above?
To accomplish the user's goal, the flow through the architecture would be:

- Search for available listings using search form
- View search results and individual listings for details, information, photos, and reviews
- Book listing

{%include image.html
  url="2016-06-08-airbnb-ia-02.png"
  description=""
%}

### What style(s) of navigation is/are used? Do they answer the two key questions (Where am I and how did I get here? Where should I go next and how do I get there?)?

The navigation on the home page is very straightforward and, in isolation, would seem ineffective because it's missing a search bar for users to look up destinations. 
{% include image.html
  url="2016-06-08-airbnb-navbar-01.png"
  description=""
%}

However, when you look at the home page as a whole, you'll notice a search form right in the middle of the screen with a nice, bright call-to-action button. And just to make sure your attention is drawn to the button, Airbnb uses a video background where the search form is located. For the home page, this works perfectly.
{% include image.html
  url="2016-06-08-airbnb-hero.png"
  description=""
%}

Once you navigate away from the home page, a search field is added to the navbar making it easy to look up destinations. 
{% include image.html
  url="2016-06-08-airbnb-navbar-02.png"
  description=""
%}

### What key interactions does the user have? Are they clear and usable?
The two overarching interactions users have on the site are basically search and book. However, the act of searching itself includes a number of interactions that I believe help make the experience more enjoyable and usable.

1. You can tailor the search with criterias like room type, price range, and "map scrolling".
  * Map Scrolling: this is basically the feature where you can move a map around and have search results update automatically to that map area—similar to the feature Yelp uses.
2. You can easily see a listing's review summary, pricing, and photos right from the search results.
3. You can click on the host's image from the search results to view their profile and view other listings they may have.

### What did the site do well to allow the user to accomplish his goal effectively, efficiently and with good satisfaction?

The site did well with the placement of its call-to-action on the home page. You can tell that the primary function is to search for destinations. The search results page is well thought out—large image listings along with a map of the location, which you can move around and  have the search results will update based on the new location.

Once you pick a listing from the search results, all of the details are there. You have the description, list of amenities, photo gallery, reviews, and similar listings down the main column of the page. On the right, you have the pricing and option to book the room. The links are nice and bright, which does a good job drawing your attention to important information, such as cancellation policies, house rules, and contacting the host. 

### What did the site do poorly when allowing the user to accomplish his goal effectively, efficiently and with good satisfaction?

There really isn't anything that this site doesn't do well. Especially when we're talking about whether a user visiting the site will encounter any roadblocks or difficulties accomplishing their goal of finding a place to stay.

### Conclusion
I enjoyed exploring Airbnb's website. It's very well thought out and was surely designed with the user in mind. Navigating the site is easy and almost effortless. I never really found myself "stuck" on any given page. If I needed to start over, or search for a new location, the search field was right there in the navbar–easy. Overall, I think Airbnb did a great job creating a website that provides good user experience.

[1]: https://www.airbnb.com/ "Airbnb"
[2]: https://www.vikingcodeschool.com/ "Viking Code School"
[3]: https://www.vikingcodeschool.com/web-design-basics "Web Design Basics"
[4]: https://www.airbnb.com/trust "Trust and Safety at Airbnb"