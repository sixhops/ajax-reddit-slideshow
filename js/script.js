
var button;
var stopButton;
var searchBox;
var show;
var splash;
var content;
// This holds the user's search phrase
var searchTerm = '';
var firstPart = "https://www.reddit.com/search.json?q=";
var lastPart = "+nsfw:no";
var url = '';
var imageIndex = 0;
var handle = null;

// This event fires when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  button = document.getElementById('searchbutton');
  searchBox = document.getElementById('searchterm');
  show = document.getElementById('show');
  splash = document.getElementById('splash');
  content = document.getElementById('content');
  stopButton = document.getElementById("stop");

  stopButton.addEventListener('click', function(e) {
    clearInterval(handle);
    splash.classList.add('visible');
    splash.classList.remove('hidden');
    content.classList.remove('visible');
    content.classList.add('hidden');
  })

  button.addEventListener('click', function(e) {
    searchTerm = searchBox.value;
    searchBox.value = '';
    splash.classList.remove('visible');
    splash.classList.add('hidden');
    content.classList.add('visible');
    content.classList.remove('hidden');
    url = firstPart + searchTerm + lastPart;
    console.log(url);
    fetch(url)
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        // console.log(json.data.children[1].data.thumbnail);
        var newThumbs = json.data.children.map(function(thumb) {
          if (thumb.data.url.includes('jpg') || thumb.data.url.includes('png')) {
            return thumb.data.url;
          }
        });
        newThumbs = newThumbs.filter(function(item) {
          return typeof item !== 'undefined';
        })
        console.log(newThumbs);
        show.src = newThumbs[0];
        handle = setInterval(function() {
          if (imageIndex >= newThumbs.length) {
            imageIndex = -1;
          }
          imageIndex++;
          show.src = newThumbs[imageIndex];
        }, 1200);
      });
  });
})