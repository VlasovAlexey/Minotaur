//measure
var measure_tool = [];
var polylineMeasure = [];
function measure_tool_create(){
    const measure_menu = [
      "measure_clear",
      "cancel",
    ];
   
    if(measure_tool == ""){
        measure_tool = map_editor.pm.Toolbar.createCustomControl({
            block: "custom",
            name: "measure",
            title: "",
            actions: measure_menu,
            onClick: () => {
              //start measure
            },
            afterClick: () => {
              document.querySelector('.polyline-measure-unicode-icon').click();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: false,
            className: 'control-icon leaflet-pm-icon-measure',
          });
    }
    
    if (polylineMeasure != undefined){
        
    }
    //polylineMeasure.remove();
    //map_editor.removeLayer(polylineMeasure);
    //add measure with bearing
    polylineMeasure = L.control.polylineMeasure({position:'topright', unit:'metres', showBearings:true, clearMeasurementsOnStop: false, showClearControl: true,
      bearingTextIn: 'In',            // language dependend label for inbound bearings
      bearingTextOut: 'Out',          // language dependend label for outbound bearings
      tooltipTextFinish: 'Click to <b>finish line</b><br>',
      tooltipTextDelete: 'Press SHIFT-key and click to <b>delete point</b>',
      tooltipTextMove: 'Click and drag to <b>move point</b><br>',
      tooltipTextResume: '<br>Press CTRL-key and click to <b>resume line</b>',
      tooltipTextAdd: 'Press CTRL-key and click to <b>add point</b>',
      measureControlTitleOn: 'Turn on PolylineMeasure',   // Title for the Measure Control going to be switched on
      measureControlTitleOff: 'Turn off PolylineMeasure', // Title for the Measure Control going to be switched off
      unitControlUnits: ["kilometres", "landmiles", "nauticalmiles"],
      unitControlTitle: {             // Title texts to show on the Unit Control
        text: 'Change Units',
        kilometres: 'kilometres',
        landmiles: 'land miles',
        nauticalmiles: 'nautical miles'
    },
    unitControlLabel: {             // Unit symbols to show in the Unit Control and measurement labels
        metres: 'm',
        kilometres: 'km',
        feet: 'ft',
        landmiles: 'mi',
        nauticalmiles: 'nm'
    },
      tempLine: {                     // Styling settings for the temporary dashed line
        color: '#d40000',              // Dashed line color
        weight: 2                   // Dashed line weight
    },          
    fixedLine: {                    // Styling for the solid line
        color: '#d40000',              // Solid line color
        weight: 2                   // Solid line weight
    },
    arrow: {                        // Styling of the midway arrow 
        color: '#d40000',              // Color of the arrow
    },
    startCircle: {                  // Style settings for circle marker indicating the starting point of the polyline
        color: '#d40000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#fff',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 10                   // Radius of the circle
    },
    intermedCircle: {               // Style settings for all circle markers between startCircle and endCircle
        color: '#d40000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#ff0',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 10                 // Radius of the circle
    },
    currentCircle: {                // Style settings for circle marker indicating the latest point of the polyline during drawing a line
        color: '#d40000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#f0f',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 10                  // Radius of the circle
    },
    endCircle: {                    // Style settings for circle marker indicating the last point of the polyline
        color: '#d40000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#fff',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 10                  // Radius of the circle
    },
    })
    polylineMeasure.addTo(map_editor);
    //document.querySelector('.leaflet-bar-measure.leaflet-control').style.display = 'none';
  }