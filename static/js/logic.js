//js file for supreme-team-project-2

//Initialize map object:
let myMap = L.map("map", {
    center: [46.3527, -94.2020],
    zoom: 6.5
    //layers: [lightmap, circles]
    });

    //Create & load tile layer:
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    minZoom: 4,
    id: "mapbox.light",
    accessToken: accessToken
    }).addTo(myMap);


// Adding tile layer
var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 11,
  id: "mapbox.streets",
  accessToken: accessToken
}).addTo(myMap);

    //Create baseMaps object:
  var baseMaps = {
      "Light Map" : lightmap,
      "Street Map" : streets
      };

d3.json("static/data/districts.geojson").then(function(data) {
    L.geoJson(data.features);
    console.log(data.features);

circArr = [];
districtNames = [];

let mnMapData = data.features;

for (var i = 0; i < mnMapData.length; i++) {
    coordinates = [mnMapData[i].geometry.coordinates[1], mnMapData[i].geometry.coordinates[0]];
      console.log(coordinates);

    ids = mnMapData[i].properties.GEOID;
      console.log(ids);
    names = mnMapData[i].properties.NAME;
      console.log(names);
      districtNames.push(names);
          
          let circles = L.circle(coordinates, {
            fillOpacity: 0.7,
            color: "#2554C7",
            fillColor: "#E0FFFF",
            radius: 4700
            }).addTo(myMap)
              .bindPopup("<h6>" + names + "</h6>");
            circArr.push(circles);  
        }
          
            let districts =  L.layerGroup(circArr);

//Create overlayMaps object:
var overlayMaps = {
    "Districts": districts
      };    

L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
        }).addTo(myMap); 
      
 }); //END of D3.JSON GET DATA