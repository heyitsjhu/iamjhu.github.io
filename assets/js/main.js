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


function filter(tag) {
  setActiveTag(tag);
  showContainer(tag);
}

function setActiveTag(tag) {
  // loop through all items and remove active class
  var items = document.getElementsByClassName('tag__item');
  for(var i=0; i < items.length; i++) {
    items[i].setAttribute('class', 'tag__item');
  }

  // set the selected tag's item to active
  var item = document.getElementById(tag + '-item');
  if(item) {
    item.setAttribute('class', 'tag__item tag--active');
  }
}

function showContainer(tag) {
  // loop through all lists and hide them
  var lists = document.getElementsByClassName('posts');
  for(var i=0; i < lists.length; i++) {
    lists[i].setAttribute('class', 'posts hidden');
  }

  // remove the hidden class from the list corresponding to the selected tag
  var list = document.getElementById(tag + '-posts');
  if(list) {
    list.setAttribute('class', 'posts');
  }
}