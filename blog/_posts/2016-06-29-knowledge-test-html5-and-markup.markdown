---
title: "Knowledge Test: HTML5 and Markup"
date: 2016-06-29 12:24:10 -0700
disqus_identifier: "13accf0b-1f06-4094-af10-e1335b82019c"
tags: [coding, html5, semantics]
---

HTML5 has been around for several years now. Most major browsers now support HTML5, so it makes sense to start incorporating the new semantic elements, features and functionalities into your webpages. Doing so will not only make your site more accessible to screen readers but help search engines more properly index the contents on your page. So, let's take a look at HTML5 and its new features.

## Introduction to HTML5
* ### What are "semantics"?
  * Semantics is the study of meaning. In HTML, semantic elements define the various parts of a webpage. For example, the `<form>`, `<img>` and `<article>` tags define a form, image and article—respectively—on a webpage. Semantic elements also [help search engines][1], like Google, identify the correct web page content.
* ### What is HTML5 (in a definitional sense)?
  * HTML5 is the fifth and current version of the Hypertext Markup Language.
* ### How has HTML5 evolved from HTML4?
  * HTML5 introduces new functional tags and features. In addition to the semantic tags mentioned earlier, HTML5 is also equipped with tags like `<header>`, `<footer>`, `<video>` and `<audio>`. HTML5 comes with new features too like [accessible forms][2] and [links][3], as well as a bunch of new form [`<input>` attributes][4].

* ### How can you find out which HTML5 features are supported by which browsers?
  * All major browsers have supported most HTML5 features for several years now.
* ### What is a MIME type and why is this important to your browser?
  * A MIME-type is an HTTP header attribute that tells the web server what content type to use (for example, HTML or XHTML).
* ### Do you need to "close" all tags in HTML5 (e.g. `<br />`)?
  * No. This was something you needed to do back when development groups tried to push everyone to use XHTML, which blows up when any syntax errors are detected. In HTML5, you no longer need to "close" unpaired tags.
* ### How do you declare a new HTML5 document?
  * With the `<!DOCTYPE html>` tag.

## HTML5 Semantic Tags
* ### What are "sectioning elements" and why are they called that?
  * Sectioning elements define specific parts of a webpage. For example, `<article>`, `<nav>`, `<aside>` and `<section>` are all sectioning tags.
* ### Are sectioning tags required?
  * Sectioning tags aren't required but are highly recommended and encouraged because it gives parts of your webpage meaning and helps search engines identify your site's content better.
* ### What is an `<article>` tag?
  * An `<article>` tag is used to mark up a standalone section of content. An example of a standalone content would be a blog post.
* ### What is a `<section>` tag?
  * A `<section>` tag is used to mark up a more general section—sometimes–of an article or to create separation among content, like chapters.
* ### How is an `<article>` different from a `<section>`?
  * An `<article>` tag can be a standalone piece of content—often with its on navigation, header and even footer—while a `<section>` tag is a generic container meant to create separation among content. Check out this [blog post][5] by Ian Devlin for more on when to use which element tag.
* ### Can you have multiple header hierarchies (e.g. `<h1>`) inside `<article>` or `<section>` tags?
  * Yes, you can. Doing so also helps search engines index the content of your page properly. Otherwise, your page's main `<h1>` will be used, which may not always represent the contents of certain pages.
* ### When would you use a `<nav>` or `<footer>` tag?
  * You'd typically want to use a `<nav>` tag for any major grouping of links on a page. You'd use a `<footer>` tag at the end of a content section, like an `<article>`, or at the very bottom of your main site. You'd usually include details like the site map, or footnotes, or any information pertinent to the section immediately before the footer.
* ### What is an `<aside>`?
  * An `<aside>` is content that is tangential to the current flow. It's usually styled differently and is considered outside of the current content flow. For example, an advertisement would be a classic piece of content for an `<aside>` section.
* ### When would you use the `<main>` tag?
  * Use the `<main>` tag to define the main content of your site. It shouldn't be enclosed in any other tags other than the `<body>` tag. Also, avoid including any elements that are repeated throughout your site (i.e., the header navigation or footer) within the `<main>` tag.

## HTML5 Functional Tags and New Functionality
* ### What new forms of on-page media do you get in HTML5?
  * `<audio>`, `<video>`, and `<canvas>`.
* ### What new `<input>` types do you now get in HTML5?
  * With HTML5, you have a lot of new input types, including search, number, tel(ephone), color, range, email and date.
* ### What other interesting functionality is baked into HTML5 that you might want to explore later?
  * HTML5 also comes with deeper functionality including "local storage" for websites to store bits of information on a user's browser over time, "web workers" for running multiple JavaScript threads more efficiently, "geolocation" to discover where the user is by querying the browser, and "microdata" to add additional undisplayed data to items on a page.



[1]: https://www.gravitatedesign.com/blog/seo-benefits-of-html5-and-schema/ "SEO Benefits of HTML5 & Schema"
[2]: http://htmldog.com/guides/html/advanced/forms/ "Accessible Forms"
[3]: http://htmldog.com/guides/html/advanced/links/ "Accessible Links"
[4]: http://htmldog.com/guides/html/advanced/html5forms1/ "Form Input Attributes"
[5]: https://www.iandevlin.com/blog/2011/04/html5/html5-section-or-article "HTML5 Section or Article"
