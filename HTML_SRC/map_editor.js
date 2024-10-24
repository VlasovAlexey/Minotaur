//track editor here
//global arr to gpx tracks
gpx_arr_glb = [];

//convert GPX file format and adding to global arr tracks
function gpx_file_to_massive(res){
    return gpx_arr_glb + res;
}

//delete current track
function btn_delete_track() {
    x = [0];
    y = [0];
    z = [0];
    c = [0];

    //redraw empty track
	del_html_elem("trackChart_opt");
	gps_chart();
}

//share track via link
function btn_share_track() {

}

c_lat = document.getElementById("default_lat_opt").value;
c_lat = (c_lat.replace(",", ".")) * 1.0;

c_lon = document.getElementById("default_lon_opt").value;
c_lon = (c_lon.replace(",", ".")) * 1.0;

var esri_editor = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    id: 'mapbox.streets',
    maxZoom: 24,
    maxNativeZoom: 18,
    //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    // noWrap: true
});

var osm_editor = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 24,
    maxNativeZoom: 19,
    //attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // noWrap: true
});

var map_editor = L.map('map_editor', {
  center: [c_lat, c_lon],
  zoom: 17,
  fullscreenControl: true,
	fullscreenControlOptions: {
					// optional
					title: "", //'Fullscreen mode',
					titleCancel: "",// 'Exit fullscreen mode'
				},
  layers: [esri_editor],
  zoomAnimation: true,
  rotate: true, //we use rotator version of leaflet and need disable rotator functionality for map editor usage
  rotateControl: {
      closeOnZeroBearing: false,
      position: 'bottomleft',
  },
  bearing: 0,
  zoomControl: false,
  rotateControl: false,
  compassBearing: false,
});


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
  if(td_lng == 4){ map_editor.pm.setLang("pt");}
  if(td_lng == 5){ map_editor.pm.setLang("zh");}
  if(td_lng == 6){ map_editor.pm.setLang("bg");}
  if(td_lng == 7){ map_editor.pm.setLang("fr");}
  if(td_lng == 8){ map_editor.pm.setLang("ko");}
  if(td_lng == 9){ map_editor.pm.setLang("it");}
}


//add meters line
L.control.betterscale().addTo(map_editor);

var drawnItems = L.featureGroup().addTo(map_editor);

//draw primitives adding geoman controls
map_editor.pm.addControls({
    drawMarker: true,
    drawPolygon: true,
    editMode: true,
    drawPolyline: true,
    removalMode: true,
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

//add save and load buttons to geoman
let gjson_load = new L.Control.PMButton({
  title: "load gjson",
  actions: [""],
  //actions: ["cancel"],
  onClick: () => {
    console.log("test");
  },
  afterClick: () => {},
  doToggle: false,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-load',
});
let gjson_save = new L.Control.PMButton({
  title: "save gjson",
  actions: [],
  onClick: () => {
    console.log("test");
  },
  afterClick: () => {},
  doToggle: false,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-save',
});

map_editor.addControl(gjson_load);
map_editor.addControl(gjson_save);

//paint polygon settings
var paintpolygonControl = L.control.paintPolygon(
{
    layerOptions: {
        color: '#2c8aff',
        weight: 3
    },
     drawOptions: {
        color: '#2c8aff',
        weight: 4
    },
    eraseOptions: {
        color: 'red',
        weight: 2
    }
}).addTo(map_editor);

/*
var stateChangingButton = L.easyButton({
  states: [{
          stateName: 'zoom-to-forest',        // name the state
          icon:      'leaflet/fullscreen.png',               // and define its properties
          title:     'zoom to a forest',      // like its title
          onClick: function(btn, map) {       // and its callback
              map.setView([46.25,-121.8],10);
              btn.state('zoom-to-school');    // change state on click!
          }
      }]
})
stateChangingButton.addTo(map_editor);

L.easyButton('<img src="leaflet/fullscreen.png">', function(btn, map){
  var antarctica = [-77,70];
  map.setView(antarctica);
  var container = L.DomUtil.create('div', 'leaflet-control-fullscreen leaflet-bar leaflet-control');
  L.DomUtil.addClass(container, 'leaflet-fullscreen-on');
}).addTo(map_editor);
*/

//import file button
var options = {
  position: 'topright', // Leaflet control position
  fileSizeLimit: 50024, // File size limit in kb (default: 1024 kb)
  //style: () => {}, // Overwrite the default BFL GeoJSON style function
  onEachFeature: () => {}, // Overwrite the default BFL GeoJSON onEachFeature function
  //layer: L.customLayer, // If you want a custom layer to be used (must be a GeoJSON class inheritance)
  // Restrict accepted file formats (default: .gpx, .kml, .kmz, .geojson, .json, .csv, .topojson, .wkt, .shp, .shx, .prj, .dbf, .zip)
  formats:['.geojson', '.kml', '.gpx', '.kmz', '.csv', '.zip'],
  importOptions: { // Some file types may have import options, for now, just csv is documented
    csv: {
      delimiter: ';',
      latfield: 'LAT',
      lonfield: 'LONG',
    },
  },
  //text: { // If you need translate
    //title: "Import a layer", // Plugin Button Text
  //},
};

//error handlers for file importing
L.Control.betterFileLayer(options).addTo(map_editor);
map_editor.on("bfl:layerloaded", () => {
  console.log("Layer was successful added to the map canvas!");
});

map_editor.on("bfl:layerloaderror", ({layer}) => {
  console.log("Ops! Your file have an error!, please check it. File name: ", layer);
});

map_editor.on("bfl:filenotsupported", ({layer}) => {
  console.log("Your file type is not supported!, the list are: geojson, json, kml, kmz, topojson, wkt, csv, polyline, gpx, (.shp, .shx, .prj, .dbf), or zip with (.shp, .shx, .prj, .dbf) inside", layer);
});

map_editor.on("bfl:filesizelimit", ({file}) => {
  console.log("Your file is too big! Please, the file have to be bellow 50 Megabyte.", file);          
});
