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

var editor_file_num = 1;

c_lat = document.getElementById("default_lat_opt").value;
c_lat = (c_lat.replace(",", ".")) * 1.0;

c_lon = document.getElementById("default_lon_opt").value;
c_lon = (c_lon.replace(",", ".")) * 1.0;

var esri_editor = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    id: 'mapbox.streets',
    maxZoom: 25,
    maxNativeZoom: 18,
    //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    // noWrap: true
});

var osm_editor = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 25,
    maxNativeZoom: 18,
    //attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // noWrap: true
});

var map_editor = L.map('map_editor', {
  center: [c_lat, c_lon],
  zoom: 18,
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
  if(td_lng == 4){ map_editor.pm.setLang("pt_br");}
  if(td_lng == 5){ map_editor.pm.setLang("zh");}
  if(td_lng == 6){ map_editor.pm.setLang("bg");}
  if(td_lng == 7){ map_editor.pm.setLang("fr");}
  if(td_lng == 8){ map_editor.pm.setLang("ko");}
  if(td_lng == 9){ map_editor.pm.setLang("it");}
}


//add meters line
L.control.betterscale().addTo(map_editor);

var drawnItems = L.featureGroup().addTo(map_editor);

//customize buttons for draw primitives adding geoman controls
map_editor.pm.addControls({
    drawMarker: true,
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

//add save and load buttons to geoman
let gjson_load = new L.Control.PMButton({
  title: "load gjson",
  actions: [""],
  //actions: ["cancel"],
  onClick: () => {
    //import any files
    document.getElementById("btn_import").click();
  },
  afterClick: () => {
  },
  doToggle: false,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-load',
});
map_editor.addControl(gjson_load);

let gjson_save = new L.Control.PMButton({
  block: "custom",
  title: "save gjson",
  actions: [],
  onClick: () => {
    var layers = L.PM.Utils.findLayers(map_editor);
    var group = L.featureGroup();
    layers.forEach((layer)=>{
      group.addLayer(layer);
    });
    //console.log(group);
    shapes = group.toGeoJSON();
    console.log(JSON.stringify(shapes));
    
    //save current map
    function toGeoJSON() {
      var allLayers = new L.featureGroup();
      map_editor.eachLayer(function (layer) {
        if (layer instanceof L.Path) {
          allLayers.addLayer(layer);
        } else {
          if (layer instanceof L.Marker) {
            allLayers.addLayer(layer);
          }
        }
      });
      var geojson = allLayers.toGeoJSON();
      //console.log(JSON.stringify(geojson));

      //and write file
		  scr_n_add = "";
		  if (GPX_file_num < 10 ) {
			  scr_n_add = "0";
		  }
		  var fl_name = scr_n_add + editor_file_num + "_" + (track_name.value).toString() + "_" + get_date_hr() + ".geojson";
      var blob = new Blob([JSON.stringify(geojson)], {type: "application/geojson;charset=utf-8"});
      saveAs(blob, fl_name);

      editor_file_num = editor_file_num + 1;
    }
    toGeoJSON();
  },
  afterClick: () => {},
  doToggle: false,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-save',
});
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

//import file button
var options = {
  button: document.getElementById("btn_import"),
  position: 'topright', // Leaflet control position
  fileSizeLimit: 50024, // File size limit in kb (default: 1024 kb)
  style: () => {
    
  }, // Overwrite the default BFL GeoJSON style function
  onEachFeature: () => {
    
  }, // Overwrite the default BFL GeoJSON onEachFeature function
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
L.Control.betterFileLayer(options).addTo(map_editor);

//error handlers for file importing
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

map_editor.pm.Toolbar.setBlockPosition("custom", "topright");


//custom buttons for custom features
//measure
map_editor.pm.Toolbar.createCustomControl({
  block: "custom",
  name: "measure",
  title: "",
  actions: ["cancel",],
  onClick: () => {
    //start measure

  },
  afterClick: () => {

  },
  doToggle: true,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-measure',
});


//import ariane files
const ariane = [
  "ariane_import_csv",
  "ariane_import_tml",
  "ariane_import_kml",
  "cancel",
];

map_editor.pm.Toolbar.createCustomControl({
  block: "custom",
  name: "ariane import",
  actions: ariane,
  title: "",
  onClick: () => {
  },
  afterClick: () => {
  },
  doToggle: true,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-ariane',
});


//import seacraft files
const seacraft = [
  "seacraft_import_csv",
  "seacraft_import_kml",
  "cancel",
];

map_editor.pm.Toolbar.createCustomControl({
  block: "custom",
  name: "seacraft import",
  actions: seacraft,
  title: "",
  onClick: () => {
  },
  afterClick: () => {
  },
  doToggle: true,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-seacraft',
});

//save map as image
const save_image = [
  "cancel", 
];
map_editor.pm.Toolbar.createCustomControl({
  block: "custom",
  name: "save image",
  title: "",
  onClick: () => {
      alert("🙋‍♂️");
  },
  afterClick: () => {
    
  },
  doToggle: false,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-save-image',
});

//add overlay image
const overlay_image = [
  "cancel",
];

map_editor.pm.Toolbar.createCustomControl({
  block: "custom",
  name: "overlay image",
  title: "",
  onClick: () => {
  },
  doToggle: true,
  toggleStatus: true,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-overlay-image',
});

//add special objects creation button
const special_objects_list = [
  "special_objects_boulders",
  "special_objects_stalactites",
  "cancel",
];

map_editor.pm.Toolbar.createCustomControl({
  block: "custom",
  name: "special objects",
  actions: special_objects_list,
  title: "",
  onClick: () => {

  },
  doToggle: true,
  toggleStatus: true,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-special-objects',
});

//add to editor lines from xy_arr array
//xy_arr - array with lat lon
//color_line - line color format 
//weight_line - weight_line ;)
function add_line_arr(xy_arr, color_line, weight_line){
	//build data for leaflet geojson layers
	var myLines = [];
	for (i = 0; i < xy_arr.length - 1; i++) {
		myLines.push({
			"type": "LineString",
			"properties": {"color": color_line},
			"coordinates": [[xy_arr[i][1],xy_arr[i][0]] , [xy_arr[i+1][1],xy_arr[i+1][0]]]
		});
	}

	//highlight mouse over elements on the map
	var geojson;
	function highlightFeature(e) {
		  var layer = e.target;
		  layer.setStyle({
			  weight: 7,
			  color: '#ffffff',
			  fillOpacity: 0.99
		  });
		  layer.bringToFront();
	}

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
	}

	function style(feature) {
		return {
			"color": color_line,
			"weight": weight_line,
			"opacity": 0.99
		};
	}
	
	function onEachFeature(feature, layer) {
		  layer.on({
			  mouseover: highlightFeature,
			  mouseout: resetHighlight
		  });
	}

	geojson = L.geoJson(myLines, {
		  style: style,
		  onEachFeature: onEachFeature
	}).addTo(map_editor);

	// zoom the map to the polygon after data loaded
	var fit_polygon = L.polyline([xy_arr], {color: color_line}).addTo(map_editor);
	map_editor.fitBounds(fit_polygon.getBounds());
	fit_polygon.remove();
}
