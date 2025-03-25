var first_start_map_editor = 1;

//main function for update lng on map editor
function lng_map_editor(){
  td_lng = lng_opt.options[lng_opt.selectedIndex].value * 1.0;
  if (first_start_map_editor == 1){
    first_start_map_editor = 0;
  } else {
      layers_map_editor.remove();
      
  }
  layers_map_editor = L.control.layers(translate_map_selector(td_lng , osm_editor , esri_editor), null, {
      collapsed: true,
      position: "bottomright"
  }).addTo(map_editor);

  if(td_lng == 1){ map_editor.pm.setLang("en");}
  if(td_lng == 2){ map_editor.pm.setLang("ru");}
  if(td_lng == 3){ map_editor.pm.setLang("es");}
  if(td_lng == 4){ map_editor.pm.setLang("pt_pt");}
  if(td_lng == 5){ map_editor.pm.setLang("zh");}
  if(td_lng == 6){ map_editor.pm.setLang("bg");}
  if(td_lng == 7){ map_editor.pm.setLang("fr");}
  if(td_lng == 8){ map_editor.pm.setLang("ko");}
  if(td_lng == 9){ map_editor.pm.setLang("it");}
}

var drawnItems = L.featureGroup().addTo(map_editor);

//customize buttons for draw primitives adding geoman controls
map_editor.pm.addControls({
    drawMarker: false,
    drawPolygon: true,
    drawCircle: false,
    drawCircleMarker: false,
    drawRectangle: false,
    editMode: true,
    drawPolyline: true,
    removalMode: true,
    dragMode: true,

  });

const markerStyle = {
    opacity: 0.5,
    draggable: false,
};
  
//styling geoman primitives
map_editor.pm.enableDraw('Polygon', {
    snappable: true,
    templineStyle: {
      color: '#2c8aff',
    },
    hintlineStyle: {
      color: '#2c8aff',
      dashArray: [5, 5],
    },
    pathOptions: {
      color: '#2c8aff',
      fillColor: '#2c8aff',
      fillOpacity: 0.25,
    },
    markerStyle,
    cursorMarker: false,
    // finishOn: 'contextmenu',
    finishOnDoubleClick: true,
});
map_editor.pm.enableDraw('Line', {
    snappable: true,
    templineStyle: {
      color: '#2c8aff',
    },
    hintlineStyle: {
      color: '#2c8aff',
      dashArray: [5, 5],
    },
    pathOptions: {
      color: 'black',
      fillColor: '#2c8aff',
      fillOpacity: 0.7,
    },
    markerStyle,
    cursorMarker: false,
    // finishOn: 'contextmenu',
    finishOnDoubleClick: true,
});
map_editor.pm.disableDraw();

// Add event listener to the featureGroup layer for when a new shape is created for STYLE changing on click
map_editor.on('pm:create', function(e) {
  var layer = e.layer;
  // Attach click event to the new shape
  layer.on('click', function() {
    // Check if the clicked layer is a polygon or polyline
    if (layer instanceof L.Polygon) {
      layer_styling(layer, true);
    }
    if (layer instanceof L.Polyline) {
      layer_styling(layer, false);
    }      
  });
});

function idx_color_to_color(color_idx){
    if(color_idx == 1){color_idx = "#089cff"};
    if(color_idx == 2){color_idx = "#ffc400"};
    if(color_idx == 3){color_idx = "#808080"};
    if(color_idx == 4){color_idx = "#000"};
    if(color_idx == 5){color_idx = "#fff"};
    if(color_idx == 6){color_idx = "#ff0000"};
    return color_idx;
}