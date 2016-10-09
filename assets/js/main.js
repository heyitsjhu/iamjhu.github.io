// Show loader animation if sessionStorage is null
$(document).ready(function() {
    if (sessionStorage.getItem('iamjhu') != 'true') {
      $('.loader').css({'display':'block'});
      
      setTimeout(function(){
          $('body').addClass('loaded');
      }, 2500);
      sessionStorage.setItem('iamjhu', 'true');
    }
})

// Toggle nav menu on mobile devices
function toggleNavbarMenu() {
  var nav = document.getElementById('navbarMenu');
  if (nav.className === 'navbar-nav') {
    nav.className += '--show';
  } else {
    nav.className = 'navbar-nav';
  }
}


// toggle filtering for blog posts based on tags
function filter(tag) {
  setActiveTag(tag);
  showContainer(tag);
}

function setActiveTag(tag) {
  // loop through all items and remove active class
  var items = document.getElementsByClassName('tags-list__item--active');
  for(var i=0; i < items.length; i++) {
    items[i].setAttribute('class', 'tags-list__item');
  }

  // set the selected tag's item to active
  var item = document.getElementById(tag + '-item');
  if(item) {
    item.setAttribute('class', 'tags-list__item--active');
  }
}

function showContainer(tag) {
  // loop through all lists and hide them
  var lists = document.getElementsByClassName('blog');
  for(var i=0; i < lists.length; i++) {
    lists[i].setAttribute('class', 'blog--hidden');
  }

  // remove the hidden class from the list corresponding to the selected tag
  var list = document.getElementById(tag + '-posts');
  if(list) {
    list.setAttribute('class', 'blog');
  }
}

// Changes copyright information based on screen width
function expandCopyrightText() {
  var windowSize = $(window).width();
  if(windowSize >= 768) {
    $('.footer__copyright').html("<span>Copyright 2016 Johnny Hu. All rights reserved.</span>");
  } else {
    $('.footer__copyright').html("<span>&copy; 2016 Johnny Hu.</span>");
  }
}

// Listens to the browser's window width
$(window).on('resize', expandCopyrightText);