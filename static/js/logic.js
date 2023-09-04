// Store our API endpoint as queryUrl.
// set up const and basic color index
const QUERY_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
const RADIUS_SCALE = 10;
const RADIUS_MIN = 4;
let color_color=[0,30,50,70,90]
let color_hex=["89FF33","EBFF33","FFBB33","FF7F33","BC2910","#ff0000"]

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
        color: getColor(feature),
        fillColor: getColor(feature),
        fillOpacity: 0.5,
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
    style: getGeoStyle
  };
  let earthquakes = L.geoJSON(earthquakeData, geoJSONOptions);
    createMap(earthquakes);
}

// Send our earthquakes layer to the createMap function/
function createMap(earthquakes) {
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  let baseMaps = {"Street Map": street,};
  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street, earthquakes]
  });
}




















// // Looping through the cities array, create one marker for each city, bind a popup , and add it to the map.
//     let location_list=[]
//     let earthquake_magnitude=features.
//     for (let i = 0; i < features.length; i++) {
//         geometry=features[i].geometry
//         earthquake_lon=geometry.coordinates[0];
//         earthquake_lat=geometry.coordinates[1];
//         earthquake_location=[earthquake_lon,earthquake_lat];
//         location_list.push(earthquake_location);

//     console.log(earthquake_location)
//         L.circle(earthquake_location,{fillOpacity: 0.75,
//             radius: Math.sqrt(earthquake_magnitude) * 500})
//         .bindPopup(`<h1>${earthquake_location}</h1> <hr> <h3>${features[i].properties.title}</h3>`)
//         .addTo(myMap);
//     };

// });

// // This function determines the color of the marker based on the magnitude of the earthquake.
//     function determineColor(earthquake_depth) { 
//         if (earthquake_depth < 10) { return 'green'; } 
//         else if (earthquake_depth <30) { return 'yellow'; } 
//         else if (earthquake_depth <50) { return 'darkeryellow'; } 
//         else if (earthquake_depth <70) { return 'orange'; } 
//         else if (earthquake_depth <90) { return 'darkerorange'; } 
//         else { return 'red'; } } 
//         var Marker = L.AwesomeMarkers.icon ({ markerColor: determineColor (earthquake_depth) });

// // This function determines the radius of the earthquake marker based on its magnitude.

//     function determineSize(earthquake_magnitude) { 
//         let earthquake_magnitude=featu
//         leaflet(df) %>% addTiles() %>%
//         addCircleMarkersradius = ~ sqrt(earthquake_magnitude),stroke = FALSE, fillOpacity = 0.5
// };

// // This function create the legend at the bottom right to show the earthquake marker based on its magnitude.
// map %>%
//   addLegend("bottomright", 
//             colors = c("#FFC125",  "#FFC125", "#8A4117", "#7D0552", "#571B7E"),
//             labels = c("-10-10", "10-30", "30-50", "50-70", "70-90"."90+"),
//             title = "Marker color based of Magnitude of the Earthquake",
//             opacity = 1)


