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

  // maybe we should put this in the CSS
  // var mapStyle = {
  //   color: "#00661a",
  //   fillColor: "#d7bde2",
  //   fillOpacity: 0.6,
  //   weight: 1.0
  //     };

// const dataFile = "static/data/bdry_school_district_boundaries.gpkg"
// var districts = L.geoPackageFeatureLayer([], {
//   geoPackageUrl: "static/data/bdry_school_district_boundaries.gpkg",
//   layerName: 'Districts',
//   style: {color: 'blue'}
// }).addTo(myMap)

// District Boundaries Layer 
var districts = L.esri.featureLayer({
  url: 'https://services.arcgis.com/GXwOsvnLQI6EDOp7/ArcGIS/rest/services/Minnesota_School_District_Boundaries_2020/FeatureServer/0',
  simplifyFactor: 0.5,
  precision: 5,
  style: {
      color: 'blue',
      weight: 1
  }
}).addTo(myMap);

var overlayMaps = {
  "Districts": districts
};

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


  // d3.json(dataFile).then((data) => {
  //   function onEachFeature(feature, layer) {
  //     layer.bindPopup("<h6>" + feature.properties.UNI_NAM + "</h6><hr><h6>Avg. Enrollment:&nbsp;" + feature.properties.admtotal + "</h6>");
  //     console.log(data);
  //       }
    
  //   var geoFile = L.geoJson(data, {onEachFeature: onEachFeature, style: mapStyle});
  //     geoFile.addTo(myMap);

      // chloropleth interactivity code starts here - Micah
      
      // getColor function start
      // we are going to need to get the data we want to choose colors before this and change it based on the layer selected
      // right now, they all show up beige
      // ===== Function to get the color of the state based on thresholds we set and gradient we choose ======
    //   function getColor(variableChosen) {
    //     return variableChosen > "300" ? "darkred" :
    //         variableChosen > "200" ? "crimson" :
    //         variableChosen > "100" ? "red" :
    //         variableChosen > "50" ? "orange" :
    //         variableChosen > "10" ? "yellow" :
    //                                 "beige";
    //       }
    //   // getColor function ends
    
    //   // ====================
    //   // style function start
    //   // ====================

    //   // ===== Function to style each district by the variable chosen =====
    //   function style(feature) {
    //     return {
    //         fillColor: getColor(feature.properties.density), // change what we pass through to this function to rep. selected layer variable
    //         weight: 2,
    //         opacity: 1,
    //         color: 'white',
    //         dashArray: '3',
    //         fillOpacity: 0.7
    //     };
    //   }
    //   // ===== adding style to map =====
    //   L.geoJson(data, {style: style}).addTo(myMap); // change data

    //   // ==================================
    //   // style function & adding style ends
    //   // ==================================


    //   // =================================
    //   // highlighting features starts here
    //   // =================================
    //   // ===== adding interaction to make districts highlight when hovered on =====
    //   // need to go over with instructor, not working as expected but also not giving errors
    //   function highlightFeature(e) {

    //     // sets targert layer
    //     var layer = e.target;

    //     // creates style for target layer
    //     layer.setStyle({
    //         weight: 5,
    //         color: '#666',
    //         dashArray: '',
    //         fillOpacity: 0.7
    //     });

    //     // brings layer to front on mouseover
    //     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    //         layer.bringToFront();
    //     }

    //     info.update(layer.feature.properties);
    //   }

    //   // resets styling of previously highlighted layer on mouseout
    //   function resetHighlight(e) {
    //     geojson.resetStyle(e.target);
    //     info.update();
    //   }

    //   // check this syntax
    //   geojson = L.geoJson();

    //   // ==============================
    //   // hightlighting interaction ends
    //   // ==============================

    //   // ==============================
    //   // zoom on click function start 
    //   // ==============================
    //   // function to zoom to selected district on click
    //   function zoomToFeature(e) {
    //     myMap.fitBounds(e.target.getBounds());
    //   }
    //   // ==============================
    //   // zoom on click function end
    //   // ==============================


    //   // function to add event listeners to our event listener functions
    //   // function to add listeners to district layer functions
    //   function onEachFeature(feature, layer) {
    //     layer.on({
    //         mouseover: highlightFeature,
    //         mouseout: resetHighlight,
    //         click: zoomToFeature
    //     });
    //   }
    //   // ===========================
    //   // event listener function ends
    //   // ============================

    //   // adding above to map
    //   geojson = L.geoJson(data, {
    //     style: style,
    //     onEachFeature: onEachFeature
    //   }).addTo(myMap);

    //   // =======================================
    //   // adding special info tab in upper corner
    //   // ========================================
    //   // custom info control to show popup info on hover
    //   var info = L.control();

    //   info.onAdd = function (myMap) {
    //       this._div = L.DomUtil.create('div', 'info'); // div with class info
    //       this.update();
    //       return this._div;
    //   };

    //   // method to update info control based on the district hovered on
    //   info.update = function (props) {
    //       this._div.innerHTML = '<h4> School District: </h4>' + (props ? '<b>' + props.UNI_NAM + '</b>' : 'Hover over a state');
    //   }

    //   //add to map
    //   info.addTo(myMap);
      



    // });
    
      
    
  
