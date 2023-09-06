// Store our API endpoint as queryUrl.
// set up const and basic color index
const QUERY_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
const RADIUS_SCALE = 10;
const RADIUS_MIN = 4;
let color_color=[10,30,50,70,90]
let color_hex=["#73d016","#faff68","#fbcb03","#e13535","#ec1010","#a40a0a"]

// Perform a GET request to the query URL/
// Once we get a response, send the data.features object to the createFeatures function.
d3.json(QUERY_URL).then(function (data) {
   createFeatures(data.features);
});

// Give each feature a popup that describes the place,mag and depth of the earthquake.
function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
    <p>${"Magnitude: "+feature.properties.mag+ "    "+"Depth: "+feature.geometry.coordinates[2]}</p>`
    );
}
// Give a feature to generate the circle markers
function pointToLayer(feature, latLng) {
    return L.circleMarker(latLng);
}
// Give a feature to generate the color based of depth of each earthquake
function getColor(feature){
    let depth = feature.geometry.coordinates[2];
    if (depth <color_color[0]){
        return color_hex[0];}
    else if (depth <color_color[1]){
        return color_hex[1];}
    else if (depth <color_color[2]){
        return color_hex[2];}
    else if (depth <color_color[3]){
        return color_hex[3];}
    else if (depth <color_color[4]){
        return color_hex[4];}
    else return color_hex[5];
}

// Give a feature to generate the size based of the mag of each earthquake
function getRadius(feature){
    let mag = feature.properties.mag;
    let radius = mag * RADIUS_SCALE;
    radius = Math.max(RADIUS_MIN, radius);
    return radius;
}

// Define a function that we want to run once for each feature in the features array.
function getGeoStyle(feature){
    let style = {
        color: "black",
        fillColor: getColor(feature),
        fillOpacity: 0.6,
        radius: getRadius(feature),
    };
    return style;
}




// Create a GeoJSON layer that contains the features array on the earthquakeData object.
// Run the onEachFeature function once for each piece of data in the array.
function createFeatures(earthquakeData) {
  let geoJSONOptions = {
    onEachFeature: onEachFeature,
    pointToLayer: pointToLayer,
    style: getGeoStyle,
  }; 
  let earthquakes = L.geoJSON(earthquakeData, geoJSONOptions);
    createMap(earthquakes);
}


// Send our earthquakes layer to the createMap function
function createMap(earthquakes) {
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // Here we create a legend control object.
let legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let grades = [-10, 10, 30, 50, 70, 90];
    let colors = color_hex;

// Loop through our intervals and generate a label with a colored square for each interval.
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML += "<i style='background: "
        + colors[i]
        + "'></i> "
        + grades[i]
        + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
  };

  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
  });
  street.addTo(myMap)
  earthquakes.addTo(myMap)
  legend.addTo(myMap)
}

