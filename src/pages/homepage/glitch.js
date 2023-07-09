/*
Code modified from Codepen User: Gage Henderson: https://codepen.io/callgage/pen/RxQqGr
*/

var glitchIntensity = 5;
var glitchFramerate = 20;

export default function glitch() {
  var gridItems = document.getElementById('grid').childNodes;
  var images = [];
  for (var i = 0; i < gridItems.length; i++) {
    if (gridItems[i].tagName === 'IMG') {
      images.push(gridItems[i]);
    }
  }
  var timer = 0;
  var timerLim = 100;
  var speed = 1000 / 20;
  var copies = [];
  for (var i = 0; i < images.length; i++) {
    // Create the psuedo-grid
    var copy = document.createElement('img');
    copy.src = images[i].src;
    copy.style.width = images[i].offsetWidth;
    copy.style.height = images[i].offsetHeight;
    copy.style.position = 'relative';
    document.getElementById('grid-copy').append(copy);
    copies.push(copy);
  }
  for (var i = 0; i < images.length; i++) {
    // Glitch it out
    glitchImage(images[i], i, copies);
  }
}

function glitchImage(el, i, copies) {
  var interval = setInterval(function () {
    glitch(copies, i);
  }, 1000 / glitchFramerate);

  var glitch = function (copies, i) {
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    var path = `0% 0%, 100% 0%`;
    var sliceHeightRange = [5, 17];
    var sliceCount = Math.floor(getRandom(1, 3));
    var currentY = 0;
    var addPoint = function (x, y) {
      // Add to the polygon path
      path += `,${x}% ${y}%`;
    };

    var copy = copies[i];
    var shake = glitchIntensity;
    copy.style.left = Math.floor(getRandom(-shake, shake)) + 'px';
    copy.style.top = Math.floor(getRandom(-shake, shake)) + 'px';

    var addSlice = function (cutHeight) {
      currentY += Math.floor(getRandom(5, 33));

      // Show image above
      addPoint(100, currentY);
      addPoint(0, currentY);

      // Cut out
      currentY += cutHeight;
      addPoint(0, currentY);
      addPoint(100, currentY);
    };

    for (var i = 0; i < sliceCount; i++) {
      addSlice(Math.floor(getRandom(sliceHeightRange[0], sliceHeightRange[1])));
    }

    // Apply
    path += ',100% 100%, 0% 100%, 0% 0%';
    el.style.clipPath = `polygon(${path})`;
  };
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
