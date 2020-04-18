
//     // ===================================================================================================================
//     // ===================================================================================================================
  // defining desired variabales globally for data collection below
var totalEnrollment = [];
var perPupilExpenditure = [];
var readingProficiencyScores = [];
var teacherSalaries = [];
var medianHouseholdIncome = [];
var districtSize = [];
var geoId = []; 

// // // reading in MNEducationDashboard.csv combined dataset and parsing desired variables from above
d3.csv("static/data/MNEducationDashboard.csv").then((data) => {

                                                                  data.forEach((d) => {
                                                                                        totalEnrollment.push(+d.total_enroll);
                                                                                        perPupilExpenditure.push(+d.perpupilexpends);
                                                                                        readingProficiencyScores.push(+d.readingproficiency);
                                                                                        teacherSalaries.push(+d.avgteachersalary);
                                                                                        medianHouseholdIncome.push(+d.medianhouseincome);
                                                                                        geoId.push(+d.geoid);
                                                                                        districtSize.push(+d.total_enroll);
                                                                                      });
                                                                
                                                               }

);

// defining variable arrays
var variablesArray = ["totalEnrollment" , "perPupilExpenditure", "readingProficiencyScores", "teacherSalaries", "medianHouseholdIncome"];

d3.json(dataFile).then((geoData) => {

    // ===================================================================================================================
    // ===================================================================================================================
    var features = geoData.features;

    features.forEach(feature => {

        // properties object for each feature (I want to add other data to 
        // each property object in the geoJSON file that has a matching geoID is associated with geojson file for mapping)
        var props = feature.properties;

        geojId = props.GeoID;

        for (var i = 0; i < geoId.length; i++) {

            if (geoId[i] == geojId) {
                props.totalEnrollment = totalEnrollment[i];
                props.perPupilExpenditure = perPupilExpenditure[i];
                props.readingProficiencyScores = readingProficiencyScores[i];
                props.teacherSalaries = teacherSalaries[i];
                props.medianHouseholdIncome = medianHouseholdIncome[i];
            };

        };
    });
    // Successfully added additional traits to each properties object in geojson file
    // ===================================================================================================================
    // ===================================================================================================================

    // functioncs
var geojson;
  // ===================================================================================================================
    // ===================================================================================================================
    function highlightFeature(e) {
        
        // sets targert layer
        var layer = e.target;

        // creates style for target layer
        layer.setStyle({
                        weight: 5,
                        color: '#666',
                        dashArray: '',
                        fillOpacity: 0.7
                      });

        // brings layer to front on mouseover
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

          info.update(layer.feature.properties);
}
geojson = L.geoJson();
// resets styling of previously highlighted layer on mouseout
function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
}

// ==============================
// hightlighting interaction ends
// ==============================

// ==============================
// zoom on click function start 
// ==============================
// function to zoom to selected district on click
function zoomToFeature(e) {
      myMap.fitBounds(e.target.getBounds());
}
// ==============================
// zoom on click function end
// ==============================


// function to add event listeners to our event listener functions
// function to add listeners to district layer functions
function onEachFeature(feature, layer) {
                    layer.on({
                        mouseover: highlightFeature,
                        mouseout: resetHighlight,
                        click: zoomToFeature
});
}
var geojson = L.geoJson();
// end event listener functions
    

    // create a layer for each variable in variablesArray
    // ===================================================================================================================
    // ===================================================================================================================

    // TOTAL ENROLLMENT LAYER ====================================================================

    // ===== Function to get the color of the state based on thresholds we set and gradient we choose ======
    function getColorEnroll(d) {

            return d > 38802 ? "darkred" :
                  d > 31049 ? "darkred" :
                  d > 23296 ? "red" :
                  d > 15543 ? "orange" :
                  d > 7790 ? "yellow" :
                            "lemonchiffon";
         }
         
    function totalEnrollstyle(feature) {
        return {
            fillColor: getColorEnroll(feature.properties.totalEnrollment), // change what we pass through to this function to rep. selected layer variable in other promise for others?
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    // totalEnrollmentLayer = L.geoJson(geoData, {
    //                                             style: totalEnrollstyle,
    //                                             onEachFeature: onEachFeature
    //                                 }).addTo(myMap);

    // PER PUPIL EXPENDITURE LAYER ====================================================================
    // ===== Function to get the color of the state based on thresholds we set and gradient we choose ======
    function getColorPupil(d) {

            return d > 22536 ? "darkred" :
                  d > 19348 ? "darkred" :
                  d > 16161 ? "red" :
                  d > 12973 ? "orange" :
                  d > 9786 ? "yellow" :
                            "lemonchiffon";
         }

    function perPupilstyle(feature) {
        return {
            fillColor: getColorPupil(feature.properties.perPupilExpenditure), // change what we pass through to this function to rep. selected layer variable in other promise for others?
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    // perPupilExpenditureLayer = L.geoJson(geoData, {
    //                                                 style: perPupilstyle, 
    //                                                 onEachFeature: onEachFeature
    //                                     }).addTo(myMap);

    // READING PROFICIENCY LAYER ====================================================================
     // ===== Function to get the color of the state based on thresholds we set and gradient we choose ======
     function getColorReading(d) {

        return d > 88.5 ? "darkred" :
              d > 75.2 ? "darkred" :
              d > 62 ? "red" :
              d > 48.8 ? "orange" :
              d > 35.6 ? "yellow" :
                        "lemonchiffon";
     }

    function readingStyle(feature) {
        return {
            fillColor: getColorReading(feature.properties.readingProficiencyScores), // change what we pass through to this function to rep. selected layer variable in other promise for others?
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    // readingProficiencyScoresLayer = L.geoJson(geoData, {
    //                                                     style: readingStyle, 
    //                                                     onEachFeature: onEachFeature
    //                                          }).addTo(myMap);

    // TEACHER SALARY LAYER ====================================================================
    // ===== Function to get the color of the state based on thresholds we set and gradient we choose ======
    function getColorTeacher(d) {

            return d > 75489 ? "darkred" :
                  d > 66790 ? "darkred" :
                  d > 58091 ? "red" :
                  d > 49392 ? "orange" :
                  d > 40693 ? "yellow" :
                            "lemonchiffon";
         }
    
    function teacherSalaryStyle(feature) {
        return {
            fillColor: getColorTeacher(feature.properties.teacherSalaries), // change what we pass through to this function to rep. selected layer variable in other promise for others?
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    // teacherSalariesLayer = L.geoJson(geoData, {
    //                                             style: teacherSalaryStyle,
    //                                             onEachFeature: onEachFeature
    //                                         }).addTo(myMap);

    // MEDIAN HOUSEHOLD INCOME LAYER ====================================================================
    // ===== Function to get the color of the state based on thresholds we set and gradient we choose ======
    function getColorMHI(d) {

            return d > 119294 ? "darkred" :
                  d > 100697 ? "darkred" :
                  d > 82102 ? "red" :
                  d > 63505 ? "orange" :
                  d > 44909 ? "yellow" :
                            "lemonchiffon";
         }
    
    function mhiStyle(feature) {
        return {
            fillColor: getColorMHI(feature.properties.medianHouseholdIncome), // change what we pass through to this function to rep. selected layer variable in other promise for others?
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    // medianHouseholdIncomeLayer = L.geoJson(geoData, {
    //                                                     style: mhiStyle, // change style per layer
    //                                                     onEachFeature: onEachFeature
    //                                         }).addTo(myMap);   

    // ================================================================================ LAYERS END 
    totalEnrollmentLayer = L.geoJson(geoData, {
        style: totalEnrollstyle,
        onEachFeature: onEachFeature
}).addTo(myMap);

perPupilExpenditureLayer = L.geoJson(geoData, {
    style: perPupilstyle, 
    onEachFeature: onEachFeature
}).addTo(myMap);

readingProficiencyScoresLayer = L.geoJson(geoData, {
    style: readingStyle, 
    onEachFeature: onEachFeature
}).addTo(myMap);

teacherSalariesLayer = L.geoJson(geoData, {
    style: teacherSalaryStyle,
    onEachFeature: onEachFeature
}).addTo(myMap);

medianHouseholdIncomeLayer = L.geoJson(geoData, {
    style: mhiStyle, // change style per layer
    onEachFeature: onEachFeature
}).addTo(myMap);   

    // ====================================================================
    // ADDING OVERLAY MAPS LAYER TO MAP
    // ====================================================================
    var overlayMaps = {
                        "Total Enrollment" : totalEnrollmentLayer,
                        "Per Pupil Expenditure" : perPupilExpenditureLayer,
                        "Reading Proficiency Scores" : readingProficiencyScoresLayer,
                        "Average Teacher Salary" : teacherSalariesLayer,
                        "Median Household Income" : medianHouseholdIncomeLayer
                    };
    L.control.layers(overlayMaps).addTo(myMap);  


// =====================================================================
// MANAGING THE LEGEND
// =====================================================================
// // Add method to layer control class
L.Control.Layers.include({
    getActiveOverlays: function () {

        // Create array for holding active layers
        var active;

        // Iterate all layers in control
        this._layers.forEach(function (obj) {

            // Check if it's an overlay and added to the map
            if (obj.overlay && this._map.hasLayer(obj.layer)) {

                // Push layer to active array
                active = obj.layer;
            }
        });

        // Return active layer
        return active;
    }
});

var control = new L.Control.Layers(overlayMaps);

var layerSelected = control.getActiveOverlays();

console.log("current", layerSelected);

var gradesTotalEnrollment = [0,7790,15543,23296,31049,38802],
    gradesPerPupilExpenditure = [6598,9786,12973,16161,19348,22536],
    gradesReadingProficiencyScores = [22.4,35.6,48.8,62,75.2,88.5],
    gradesTeacherSalaries = [31994,40693,49392,58091,66790,75489],
    gradesMedianHouseholdIncome = [26313,44909,63505,82102,100697,119294];

var legend = L.control({position: 'bottomright'});

function getGrade(layerSelected) {
    if (layerSelected == medianHouseholdIncomeLayer) {
        return grade = gradesMedianHouseholdIncome;
    }
    else if (layerSelected == readingProficiencyScoresLayer) {
        return grade = gradesReadingProficiencyScores;
    }
    else if (layerSelected == perPupilExpenditureLayer) {
        return grade = gradesPerPupilExpenditure;
    }
    else if (layerSelected == teacherSalariesLayer) {
        return grade = gradesTeacherSalaries;
    }
    else {
        return returngrade = gradesTotalEnrollment;
    }
};

function getColor(d) {

    return d > 100 ? "darkred" :
          d > 80 ? "darkred" :
          d > 60 ? "red" :
          d > 40 ? "orange" :
          d > 20 ? "yellow" :
                    "lemonchiffon";
 }
 
legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        // change so grades change by selected variable
        grades = [0,20,40,60,80,100], // CHANGE THIS TO GET GRADE FROM SELECTED LAYER USING GETGRADE FUNCITON
        labels = [];

    // loop through intervals 'grades' and generate label
    for (var i = 0; i < grades.length - 1; i++) {
      div.innerHTML += 
      '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '%<br>' : '+');
    } 

    return div;

  };

legend.addTo(myMap);


});


