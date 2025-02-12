//track editor here
var color_edit_mode = 0;
var style_line_edit_mode = 0;
var layer_style_edit_mode = 0;

var newColor = 1;
var newStyle = 1;
var LayerOrder = 1;
//global arr to gpx tracks
gpx_arr_glb = [];

//custom properties for marker with depth options
Marker3d = L.Marker.extend({
	options: { 
	   depth: 0.0,
	   bearing: 0.0
	}
});
  
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

//load geojson with styles button to geoman
let gjson_load = new L.Control.PMButton({
  title: "Load Styled GeoJSON",
  actions: [""],
  //actions: ["cancel"],
  onClick: () => {
    //native import with styled geojson
    document.getElementById("geojson_with_styles_file").click();
  },
  afterClick: () => {
  },
  doToggle: false,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-load',
});
map_editor.addControl(gjson_load);

//import any files with styles button to geoman
let importer_file = new L.Control.PMButton({
  title: "Import Files",
  actions: [""],
  //actions: ["cancel"],
  onClick: () => {
    //import any files with betterFileLayer plugin
    document.getElementById("btn_import").click();
  },
  afterClick: () => {
  },
  doToggle: false,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-import',
});
map_editor.addControl(importer_file);

//import file button configuration
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
  formats:['.json', '.kml', '.gpx', '.kmz', '.csv', '.zip', '.gjson','.topojson','.wkt', '.shp', '.shx', '.prj', '.dbf'],

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
  //console.log("Was successful added!");
});

map_editor.on("bfl:layerloaderror", ({layer}) => {
  del_html_elem("tn_overlay_text");
	create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("geojson_bad_file"));
	document.getElementById("AlertOverlay").style.height = "100%";
	document.getElementById("AlertOverlay").style.opacity = "1";
  Pbar_Hide();
});

map_editor.on("bfl:filenotsupported", ({layer}) => {
  del_html_elem("tn_overlay_text");
	create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("geojson_bad_ext_file"));
	document.getElementById("AlertOverlay").style.height = "100%";
	document.getElementById("AlertOverlay").style.opacity = "1";
	Pbar_Hide();
});

map_editor.on("bfl:filesizelimit", ({file}) => {
  del_html_elem("tn_overlay_text");
	create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("geojson_big_file"));
	document.getElementById("AlertOverlay").style.height = "100%";
	document.getElementById("AlertOverlay").style.opacity = "1";
	Pbar_Hide();
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
    document.querySelector('.leaflet-control-measure.leaflet-bar-part.leaflet-bar-part-top-and-bottom').click();
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
  //"cancel",
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
  //"cancel",
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

//color picker
const color_picker = [
  "color_picker_blue",
  "color_picker_gold",
  "color_picker_gray",
  "color_picker_black",
  "color_picker_white",
  "color_picker_red",
  //"cancel",
];
map_editor.pm.Toolbar.createCustomControl({
  block: "custom",
  name: "color picker",
  actions: color_picker,
  title: "",
  onClick: () => {
    color_edit_mode = 1;
  },
  afterClick: () => {
    color_edit_mode = 0;
  },
  doToggle: true,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-color-picker',
});

//line style picker
const line_style_picker = [
  "line_style_picker_3",
  "line_style_picker_5",
  "line_style_picker_8",
  "line_style_picker_line",
  "line_style_picker_dash",
  "line_style_picker_dot",
  "line_style_picker_none",
  //"cancel",
];
map_editor.pm.Toolbar.createCustomControl({
  block: "custom",
  name: "line styling",
  actions: line_style_picker,
  title: "",
  onClick: () => {
    style_line_edit_mode = 1;
  },
  afterClick: () => {
    style_line_edit_mode = 0;
  },
  doToggle: true,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-line-style',
});

//layers modification
const layer_style = [
  "layer_to_front",
  "layer_to_back",
  "cancel",
];
map_editor.pm.Toolbar.createCustomControl({
  block: "custom",
  name: "layer styling",
  actions: layer_style,
  title: "",
  onClick: () => {
    layer_style_edit_mode = 1;
  },
  afterClick: () => {
    layer_style_edit_mode = 0;
  },
  doToggle: true,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-layer-style',
});

//save map as image
/*
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
*/
//add overlay image
/*
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
*/
//add special objects creation button
/*
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
*/

//add to editor lines from xy_arr array
//xy_arr - array with lat lon
//color_line - line color format 
//weight_line - weight_line ;)
function add_line_arr(xy_arr, color_line, weight_line, z_arr, line_status){
	//build data for leaflet geojson layers
	var myLines = [];
  if(line_status == "false"){
    for (i = 0; i < xy_arr.length - 1; i++) {
      //line with two points
      myLines.push({
        "type": "LineString",
        "properties": {"color": color_line},
        "coordinates": [[xy_arr[i][1],xy_arr[i][0]] , [xy_arr[i+1][1],xy_arr[i+1][0]]]
      });
    }
  }

  if(line_status == "true") {
    var xy_arr_done = []
    for (i = 0; i < xy_arr.length; i++) {
      xy_arr_done.push([xy_arr[i][1],xy_arr[i][0]]);
    }
      //one big line
      myLines.push({
        "type": "LineString",
        "properties": {"color": color_line},
        "coordinates": xy_arr_done
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
    layer_styling(layer,true);
	  //layer.on({
		  //mouseover: highlightFeature,
		  //mouseout: resetHighlight
	  //});
	}

	geojson = L.geoJson(myLines, {
		  style: style,
		  onEachFeature: function (feature, layer) {
        layer.on({  
          click: function(e){
            layer_styling(layer, true);
          }
        });
      }
	}).addTo(map_editor);
   
	// zoom the map to the polygon after data loaded
	var fit_polygon = L.polyline([xy_arr], {color: color_line}).addTo(map_editor);
	map_editor.fitBounds(fit_polygon.getBounds());
	fit_polygon.remove();
}

//add measure tools to the map editor
var plugin = L.control.measure({
  //  control position
  position: 'bottomleft',
  //  weather to use keyboard control for this plugin
  keyboard: true,
  //  shortcut to activate measure
  activeKeyCode: 'M'.charCodeAt(0),
  //  shortcut to cancel measure, defaults to 'Esc'
  cancelKeyCode: 27,
  //  line color
  lineColor: 'red',
  //  line weight
  lineWeight: 2,
  //  line dash
  lineDashArray: '6, 6',
  //  line opacity
  lineOpacity: 1,
  //  distance formatter
  // formatDistance: function (val) {
  //   return Math.round(1000 * val / 1609.344) / 1000 + 'mile';
  // }
}).addTo(map_editor);
