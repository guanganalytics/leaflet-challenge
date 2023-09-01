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


// Get the data with d3 and ensure it is successfully loaded
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
d3.json(geoData).then(function(response) {
    console.log(response)

// Looping through the cities array, create one marker for each city, bind a popup , and add it to the map.
let location_list=[]
for (let i = 0; i < response.length; i++) {
    earthquake_lon=response.geometry.coordinates[0]
    earthquake_lat=response.geometry.coordinates[1]
    earthquake_location=[earthquake_lon,earthquake_lat]
    earthquake_list.push(earthquake_location)
    L.marker(location_list)
      .bindPopup(`<h1>${earthquake_location[i] }</h1> <hr> <h3>Population ${properties.title[i] }</h3>`)
      .addTo(myMap);
}

});
// earthquake_mag=
// earthquake_depth=geometry.coordinates[2]

