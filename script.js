// Define polyline coordinates for Route 1
var polylineCoords = [
  [41.9198343, 42.0064616],
  [41.9201936, 42.0061666],
  [41.9210917, 42.0058715],
  [41.9214309, 42.0059949],
  [41.9214908, 42.0065798],
  [41.9212194, 42.0071428],
  [41.9209200, 42.0081192],
  [41.9207723, 42.0088917],
  [41.9213551, 42.0125449],
  [41.9219299, 42.0122498],
  [41.9225166, 42.0120138],
  [41.9245681, 42.0110267],
  [41.9251449, 42.0129445],
  [41.9254402, 42.0138933],
  [41.9257416, 42.0148489],
  [41.9252925, 42.0149562],
  [41.9248375, 42.0150420],
  [41.9244284, 42.0152378],
  [41.9240732, 42.0154121],
  [41.9230634, 42.0160371],
  [41.9220177, 42.0165896],
  [41.9231752, 42.0198620],
  [41.9241451, 42.0194381],
  [41.9252027, 42.0190680]
];




// Define a flag to track if coordinates have been reversed for N2 route









// Initialize variables to hold sum of latitudes and longitudes
var sumLat = 0;
var sumLng = 0;

// Loop through each coordinate and sum up latitudes and longitudes
for (var i = 0; i < polylineCoords.length; i++) {
  sumLat += polylineCoords[i][0]; // Latitude is the first element in each coordinate pair
  sumLng += polylineCoords[i][1]; // Longitude is the second element in each coordinate pair
}

// Calculate average latitude and longitude
var avgLat = sumLat / polylineCoords.length;
var avgLng = sumLng / polylineCoords.length;

//console.log("Average Latitude:", avgLat);
//console.log("Average Longitude:", avgLng);



var map = L.map('map').setView([avgLat, avgLng], 16.0);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);



var streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

var satelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
});

var currentLayer = streetLayer; // Start with street map layer

function toggleMapStyle() {
  if (currentLayer === streetLayer) {
    map.removeLayer(streetLayer);
    map.addLayer(satelliteLayer);
    currentLayer = satelliteLayer;
  } else {
    map.removeLayer(satelliteLayer);
    map.addLayer(streetLayer);
    currentLayer = streetLayer;
  }
}


var leftIcon = L.icon({
  iconUrl: 'icons/turn-left-90.png',
  iconSize: [28, 28],
  iconAnchor: [12, 12],
  popupAnchor: [0, -10],
});

var rightIcon = L.icon({
  iconUrl: 'icons/turn-right-90.png',
  iconSize: [28, 28],
  iconAnchor: [12, 12],
  popupAnchor: [0, -10],
});

// var crossroad2 = L.marker(polylineCoords[3], { icon: leftIcon }).addTo(map).bindPopup('Crossroad 2');
// var crossroad3 = L.marker(polylineCoords[4], { icon: rightIcon }).addTo(map).bindPopup('Crossroad 3');


// Loop through each coordinate and add a circle marker
// for (var i = 0; i < polylineCoords.length; i+=3) {
//   var coordinate = polylineCoords[i];
//   var circle = L.circle(coordinate, {
//       color: 'green',
//       fillColor: 'green',
//       fillOpacity: 0.5,
//       radius: 33 // Adjust the radius as needed
//   }).addTo(map);
// }

var p1 = L.circleMarker(polylineCoords[3], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');
var p2 = L.circleMarker(polylineCoords[7], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');
var p3 = L.circleMarker(polylineCoords[8], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');
var p4 = L.circleMarker(polylineCoords[11], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');
var p5 = L.circleMarker(polylineCoords[14], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');
var p6 = L.circleMarker(polylineCoords[20], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');
var p7 = L.circleMarker(polylineCoords[21], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');


// Define breathing animation for circles p1 to p7
function animateBreathing(circle) {
  var scaleFactor = 1.5; // Adjust the scale factor as needed for the breathing effect
  var minRadius = 10; // Define the minimum radius for the circle
  var maxRadius = 20.1; // Define the maximum radius for the circle
  var deltaRadius = 1; // Define the step size for increasing or decreasing the radius

  var increasing = true; // Flag to track if the radius is currently increasing

  setInterval(function() {
    var currentRadius = circle.getRadius();
    
    // Check if the radius should increase or decrease
    if (increasing) {
      currentRadius += deltaRadius;
    } else {
      currentRadius -= deltaRadius;
    }

    // Reverse the direction if the radius reaches the minimum or maximum
    if (currentRadius >= maxRadius || currentRadius <= minRadius) {
      increasing = !increasing;
    }

    circle.setRadius(currentRadius); // Update the radius of the circle
  }, 80); // Adjust the interval as needed for smoother animation
}

// Apply breathing animation to circles p1 to p7
animateBreathing(p1);
animateBreathing(p2);
animateBreathing(p3);
animateBreathing(p4);
animateBreathing(p5);
animateBreathing(p6);
animateBreathing(p7);



var startPoint = L.circleMarker(polylineCoords[0], { color: 'blue', fillColor: 'red', fillOpacity: 1, radius: 30 }).addTo(map).bindPopup('Start Point');

var endCircle = L.circleMarker(polylineCoords[polylineCoords.length - 1], { color: 'black', fillColor: 'blue', fillOpacity: 1, radius: 30 }).addTo(map).bindPopup('Start Point');

// Define the custom icon
var flagIcon = L.icon({
  iconUrl: 'icons/panel.png',
  iconSize: [55, 55], // Adjust the size of the icon as needed
  iconAnchor: [27, 55], // Adjust the anchor point if necessary
});

// Create the endPoint marker with the custom icon
// var endPoint = L.marker(polylineCoords[polylineCoords.length - 1], { icon: flagIcon }).addTo(map).bindPopup('End Point');


// var endPoint = L.circleMarker(polylineCoords[polylineCoords.length - 1], { color: 'red', fillColor: 'blue', fillOpacity: 1, radius: 10 }).addTo(map).bindPopup('End Point');

var polyline = L.polyline([polylineCoords], {color: 'blue', weight: 5, dashArray: '12, 12'}).addTo(map);

map.on('zoomend', function() {
  var zoomLevel = map.getZoom();
  var scaleFactor = 1 + (zoomLevel - 15); // Adjust this value as needed
  var minIconSize = 2; // Define a minimum size for the icon

  var newIconSize = 25 * scaleFactor;
  if (newIconSize < minIconSize) {
    newIconSize = minIconSize;
  }

  leftIcon.options.iconSize = [newIconSize, newIconSize];
  rightIcon.options.iconSize = [newIconSize, newIconSize];
  
  // Update icon sizes using setStyle()
  // crossroad2.setStyle({icon: leftIcon});
  // crossroad3.setStyle({icon: rightIcon});
});


var bigCircle = L.circle(polylineCoords[0], {
  color: 'blue',
  fillColor: 'cyan',
  fillOpacity: 0.9,
  radius: 18 // Adjust the radius as needed to make it bigger
}).addTo(map).bindPopup('Big Circle at Start Point');

//console.log(polylineCoords[0]);
function resetAnimation() {
  clearInterval(animationInterval); // Stop the animation
  bigCircle.setLatLng(polylineCoords[0]); // Reset the position of the bigCircle to the start point
}


var audioPlayed = false; // Flag to track if the audio has been played

function startAnimation() {

  // Play the start audio
  var startAudio = document.getElementById("startAudio");
  startAudio.play();

  

  var currentIndex = 0;
  var totalSteps = 200; // Increased total steps for finer interpolation
  var currentStep = 0;

  animationInterval = setInterval(function() {
    if (currentIndex === polylineCoords.length - 1) {
      clearInterval(animationInterval); // Stop the animation when reaching the end of the polyline
      return;
    }

    var startPoint = polylineCoords[currentIndex];
    var endPoint = polylineCoords[currentIndex + 1];
    var interpolatedPoint = [
      startPoint[0] + (endPoint[0] - startPoint[0]) * (currentStep / totalSteps),
      startPoint[1] + (endPoint[1] - startPoint[1]) * (currentStep / totalSteps)
    ];

    bigCircle.setLatLng(interpolatedPoint); // Set the position of the bigCircle to the interpolated point

    // Check if the bigCircle is near crossroad2
    var distanceToCrossroad2 = bigCircle.getLatLng().distanceTo(p1.getLatLng());
    var alertThreshold = 100; // Define the threshold distance for triggering the alert

    if (!audioPlayed && distanceToCrossroad2 < alertThreshold) {
      var audioPlayer = document.getElementById("audioPlayer");
      audioPlayer.play(); // Play the audio only if it hasn't been played already
      audioPlayed = true; // Set the flag to true to indicate that the audio has been played
    }

    currentStep++;
    if (currentStep > totalSteps) {
      currentIndex++; // Move to the next segment of the polyline
      currentStep = 0; // Reset current step
    }
  }, 50); // Decreased interval duration for smoother animation
}

function stopAudio() {
  var audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.pause(); // Pause the audio when it finishes playing
}

function resetAnimation() {
  clearInterval(animationInterval); // Stop the animation
  var audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.pause(); // Pause the audio
  audioPlayed = false; // Reset the flag to indicate that the audio hasn't been played
  //console.log(polylineCoords[1]);
  // Reset the position of the bigCircle to thes start point
  bigCircle.setLatLng(polylineCoords[0]);
}