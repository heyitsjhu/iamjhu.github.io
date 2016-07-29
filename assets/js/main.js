$(document).ready(function() {
 
    setTimeout(function(){
        $('body').addClass('loaded');
    }, 1500);
 
});

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