//js file for DEFAULT MAP DISPLAY

//Initialize map object:
let myMap = L.map("map", {
    center: [46.3527, -94.2020],
    zoom: 6.5
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

  var mapStyle = {
    color: "#00661a",
    fillColor: "#d7bde2",
    fillOpacity: 0.6,
    weight: 1.0
      };
   
  const dataFile = "static/data/merge_geoj_enrollment.geojson"

  d3.json(dataFile).then((data) => {
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h6>" + feature.properties.UNI_NAM + "</h6><hr><h6>Avg. Enrollment:&nbsp;" + feature.properties.admtotal + "</h6>");
      console.log(data);
        }
    
    var geoFile = L.geoJson(data, {onEachFeature: onEachFeature, style: mapStyle});
      geoFile.addTo(myMap);
    
    });
    
      
    
  
