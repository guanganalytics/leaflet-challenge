// Create our initial map object.
// Set the longitude, latitude, and starting zoom level.
let myMap = L.map("map", {
    center: [38.627003, -90.199402],
    zoom:4
  });


// Add a tile layer (the background map image) to our map.
// Use the addTo() method to add objects to our map.
let base_map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Get the data with d3.
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
d3.json(geoData).then(function(response) {
    
    console.log(response)
});














