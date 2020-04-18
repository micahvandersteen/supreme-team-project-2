
// ======================
// SETTING UP BASE MAP
// ======================
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

var baseMaps = {
  "Light" : lightmap,
  "Streets" : streets
};

// ======================
// END BASE MAP SETUP
// ======================

 // =========================================

// Defining file path of geojson data file used to draw district boundaries
const dataFile = "static/data/newdistrictboundaries.geojson";

// ==================================================
// Drawing district boundaries on map ** PROMISE **
// ==================================================

    // =======================================
    // adding special info tab in upper corner
    // ========================================
     // custom info control to show popup info on hover
     var info = L.control();

     info.onAdd = function (myMap) {
         this._div = L.DomUtil.create('div', 'info'); // div with class info
         this.update();
         return this._div;
     };
 
     // method to update info control based on the district hovered on
     // change so that it shows variable that is selected in layer
     info.update = function (props) {
         this._div.innerHTML = '<h4> School District: </h4>' + (props ? '<b>' + props.NAME + '</b> <br />' 
                                                                + props.totalEnrollment + ' Students Enrolled <br/>' 
                                                                + '$' + props.medianHouseholdIncome + ' Median Household Income <br/>' 
                                                                + '$' + props.teacherSalaries + ' Mean Teacher Salary <br/>' 
                                                                + '$' + props.perPupilExpenditure + ' per Pupil Expenditure <br/>'
                                                                + props.readingProficiencyScores.toFixed(2) + '% Reading Proficiency'
         : 'Hover over a district');
     }
 
     //add to map
     info.addTo(myMap); 


    // =======================================================
    // ============== Legend stuff starts here ===============
    // =======================================================

    // ==================================
    // Defining grades object for legend
    // ==================================
    // var gradesTotalEnrollment = [0,7790,15543,23296,31049,38802],
    //   gradesperPupilExpenditure = [6598,9786,12973,16161,19348,22536],
    //   gradesreadingProficiencyScores = [22.4,35.6,48.8,62,75.2,88.5],
    //   gradesteacherSalaries = [31994,40693,49392,58091,66790,75489],
    //   gradesmedianHouseholdIncome = [26313,44909,63505,82102,100697,119294]
    //   gradesP = [0,20,40,60,80,100];


    // var legend = L.control({position: 'bottomright'});

    // legend.onAdd = function (myMap) {

    //   var div = L.DomUtil.create('div', 'info legend'),
    //       // change so grades change by selected variable
    //       grades = gradesP, // CHANGE THIS TO SELECT GRADE FROM GRADE OBJECTS
    //       labels = [];

    //   // loop through intervals 'grades' and generate label
    //   for (var i = 0; i < grades.length - 1; i++) {
    //     div.innerHTML += 
    //     '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
    //     grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '%<br>' : '+');
    //   } 

    //   return div;

    // };

    // legend.addTo(myMap);


// Adding Layer Control for Chorpleth layers
// var overlayMaps = {
//   "Total Enrollment" : geojson,
//   };

// L.control.layers(overlayMaps).addTo(myMap);

