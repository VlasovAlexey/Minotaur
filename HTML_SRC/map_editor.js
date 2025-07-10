//track editor here
var color_edit_mode = 0;
var style_line_edit_mode = 0;
var layer_style_edit_mode = 0;

var newColor = 1;
var newStyle = 1;
var LayerOrder = 1;

var layer_marker1_create_mode = 0;
var layer_marker2_create_mode = 0;
var layer_marker_type = 0;

var layer_optimize_mode = 0;
var layer_optimize_mode_val = 0;
//global arr to gpx tracks
gpx_arr_glb = [];

L.Map.include({
  _initControlPos: function () {
    var corners = this._controlCorners = {},
      l = 'leaflet-',
      container = this._controlContainer =
        L.DomUtil.create('div', l + 'control-container', this._container);

    function createCorner(vSide, hSide) {
      var className = l + vSide + ' ' + l + hSide;

      corners[vSide + hSide] = L.DomUtil.create('div', className, container);
    }

    createCorner('top', 'left');
    createCorner('top', 'right');
    createCorner('bottom', 'left');
    createCorner('bottom', 'right');

    createCorner('top', 'center');
    createCorner('middle', 'center');
    createCorner('middle', 'left');
    createCorner('middle', 'right');
    createCorner('bottom', 'center');
  }
});

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

var context_menu_list = [//{
  //text: 'Show coordinates',
  //callback: showCoordinates
//},
{
  text: 'Center map here',
  callback: centerMap
}, '-', {
  text: 'Zoom in',
  icon: 'images/zoom-in.png',
  callback: zoomIn
}, {
  text: 'Zoom out',
  icon: 'images/zoom-out.png',
  callback: zoomOut
}]

var map_editor = L.map('map_editor', {
  attributionControl: false,
  preferCanvas: true,
  renderer: L.canvas(),
  center: [c_lat, c_lon],
  maxZoom: 25,
  zoom: 18,
  zoomSnap: 0.01,
  //add context menu
  //contextmenu: false,
  //contextmenuWidth: 140,
  //contextmenuItems: context_menu_list,
  //add fullscreen control
  fullscreenControl: true,
	fullscreenControlOptions: {
					// optional
					title: "", //'Fullscreen mode',
					titleCancel: "",// 'Exit fullscreen mode'
				},
  layers: [osm_editor],
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
    $("#btn_import")[0].value = "";
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
  position: 'middleleft', // Leaflet control position
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
  notification.alert(plan_lng("ch_alert"), plan_lng("import_no_file"));
  Pbar_Hide();
});

map_editor.on("bfl:filenotsupported", ({layer}) => {
  del_html_elem("tn_overlay_text");
  notification.alert(plan_lng("ch_alert"), plan_lng("import_bad_ext_file"));
	Pbar_Hide();
});

map_editor.on("bfl:filesizelimit", ({file}) => {
  del_html_elem("tn_overlay_text");
  notification.alert(plan_lng("ch_alert"), plan_lng("import_big_file"));
	Pbar_Hide();
});
map_editor.pm.Toolbar.setBlockPosition("custom", "topright");

//custom buttons for custom features
//measure
const measure_menu = [
  "measure_clear",
  "cancel",
];
map_editor.pm.Toolbar.createCustomControl({
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
  toggleStatus: true,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-measure',
});

//add measure with bearing
var polylineMeasure = undefined;
function measure_polyline_add(){
  //var polylineMeasure = [];
  if(polylineMeasure != undefined){
    polylineMeasure.remove(map_editor);
  }
  polylineMeasure = L.control.polylineMeasure({position:'topright', unit:'metres', showBearings:true, clearMeasurementsOnStop: false, showClearControl: true,
    bearingTextIn: plan_lng(`td_in`),            // language dependend label for inbound bearings
    bearingTextOut: plan_lng(`td_out`),          // language dependend label for outbound bearings
    tooltipTextFinish: plan_lng(`td_f_line`),
    tooltipTextDelete: plan_lng(`td_delete_pnt`),
    tooltipTextMove: plan_lng(`td_move_pnt`),
    tooltipTextResume: plan_lng(`td_res_line`),
    tooltipTextAdd: plan_lng(`td_add_pnt`),
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
      metres: plan_lng(`td_mtr`),
      kilometres: plan_lng(`td_km`),
      feet: plan_lng(`td_ft`),
      landmiles: plan_lng(`td_mi`),
      nauticalmiles: plan_lng(`td_nm`)
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
  document.querySelector('.leaflet-bar-measure.leaflet-control').style.display = 'none';
}

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
  "layer_copy",
  "layer_to_front",
  //"layer_to_back",
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

//create link from map editor
var lnk_status = 0;
map_editor.pm.Toolbar.createCustomControl({
  block: "custom",
  name: "create_link",
  title: "",
  //actions: ["cancel",],
  onClick: () => {
  },
  afterClick: () => {
    if(lnk_status == 0){
      btn_link();
    }
    lnk_status = lnk_status + 1;
    if(lnk_status > 1){
      lnk_status = 0;
    }
    document.querySelector('.control-icon.leaflet-pm-icon-link-gen').click();
  },
  doToggle: false,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-link-gen',
});

//add to editor lines from xy_arr array
//xy_arr - array with lat lon
//color_line - line color format 
//weight_line - weight_line ;)
//line_status - true if we need one polyline. if false - we build line by small part from point to point
//id_color_arr - contain ID of previous point and color of current point
function add_line_arr(xy_arr, color_line, weight_line, z_arr, line_status, id_color_arr){
	//build data for leaflet geojson layers
  var compare;
  if(line_status == "false"){
    for (i = 0; i < xy_arr.length - 1; i++) {
      myLines = [];
      //line with two points
      myLines.push({
        "type": "LineString",
        //"properties": {"color": color_line},
        "coordinates": [[xy_arr[i][1],xy_arr[i][0]] , [xy_arr[i+1][1],xy_arr[i+1][0]]]
      });
      if(id_color_arr != undefined){
        compare = (id_color_arr[i][0]-id_color_arr[i+1][0]);
        if(compare == -1 || compare == 1 || compare < -1 ){
          //custom color
          currentgeojson = L.geoJson(myLines, {
            depth_polyline: [z_arr[i], z_arr[i+1]],
            style: {
              "color": id_color_arr[i+1][1],
              "weight": weight_line,
              "opacity": 0.99,
            },
            onEachFeature: function (feature, layer) {
              layer.on({  
                click: function(e){
                  layer_styling(layer, true);
                }
              });
            }
          }).addTo(map_editor);
        }
      } else {
        //no custom color
        currentgeojson = L.geoJson(myLines, {
          depth_polyline: [z_arr[i], z_arr[i+1]],
          style: style,
          onEachFeature: function (feature, layer) {
            layer.on({  
              click: function(e){
                layer_styling(layer, true);
              }
            });
          }
      }).addTo(map_editor);
      }
    }
  }

  if(line_status == "true") {
    var myLines = [];
    var xy_arr_done = [];
    for (i = 0; i < xy_arr.length; i++) {
      xy_arr_done.push([xy_arr[i][1],xy_arr[i][0]]);
    }
      //one big line
      myLines.push({
        "type": "LineString",
        //"properties": {"color": color_line},
        "coordinates": xy_arr_done
      });

      currentgeojson = L.geoJson(myLines, {
        depth_polyline: z_arr,
        style: style,
        onEachFeature: function (feature, layer) {
          layer.on({  
            click: function(e){
              layer_styling(layer, true);
            }
          });
        }
    }).addTo(map_editor);
  }

	function style(feature) {
		return {
			"color": color_line,
			"weight": weight_line,
			"opacity": 0.99,
		};
	}
	
	
   
	// zoom the map to the polygon after data loaded
	var fit_polygon = L.polyline([xy_arr], {color: color_line}).addTo(map_editor);
	map_editor.fitBounds(fit_polygon.getBounds());
	fit_polygon.remove();
}

//context menu functions
function showCoordinates (e) {
alert(e.latlng);
}

function centerMap (e) {
map_editor.panTo(e.latlng);
}

function zoomIn (e) {
map_editor.zoomIn();
}

function zoomOut (e) {
map_editor.zoomOut();
}

//combiner for 3d marker properties
function marker_3d_prop(text, depth){
	if(depth == undefined){
    var ret = {
      className: 'not-important-icon',
      textMarker: true,
      text: text,
      textMarkerCentered: true,
      //context menu assign default disable
      contextmenu: false,
      contextmenuItems: [{
        text: text,
        index: 0
      }, {
        separator: true,
        index: 1
      }]
    }
  } else {
    var ret = {
      className: 'not-important-icon',
      textMarker: true,
      text: text,
      textMarkerCentered: true,
      depth: depth,
      //context menu assign default disable
      contextmenu: false,
      contextmenuItems: [{
        text: text,
        index: 0
      }, {
        separator: true,
        index: 1
      }]
    }
  }
	return ret;
}

var frst = 1;
//layer styling for map editor
function layer_styling(layer,is_polygon){
	//layer styling on click
	if(style_line_edit_mode == 1){
		if(newStyle == 1){
			layer.setStyle({
				weight: 3,
			});	
		}
		if(newStyle == 2){
			layer.setStyle({
				weight: 5,
			});
		}
		if(newStyle == 3){
			layer.setStyle({
				weight: 8,
			});	
		}
		if(newStyle == 4){
			layer.setStyle({
				opacity: 1,
				dashArray: '10000',
			});	
		}
		if(newStyle == 5){
			layer.setStyle({
				opacity: 1,
				dashArray: '0 8 0',
			});	
		}
		if(newStyle == 6){
			layer.setStyle({
				opacity: 1,
				dashArray: '0 0 0 8',
			});	
		}
		if(newStyle == 7){
			if (layer instanceof L.Polygon) {
				layer.setStyle({
					opacity: 0,
				});	
			}
		}
	}

	// Check if the clicked layer is a polygon or polyline
	if(color_edit_mode == 1){
		var clr = idx_color_to_color(newColor);
		if(is_polygon == true){
			layer.setStyle({
				color: clr,
				//fillOpacity: 0.25,
				fillColor: clr
			});
		} else {
			layer.setStyle({
				color: clr,
			});
		}
		  
	}
	//layer ordering
	if(layer_style_edit_mode == 1){
		if(LayerOrder == 1){
			//bring to front selected layer function
      L.geoJson(layer.toGeoJSON(), {
				style: function (f) {
					return layer.options
				},
				//assign function for color changing
        		onEachFeature: function (feature, layer) {
					layer.on({  
						click: function(e){
							layer_styling(layer, true);
						}
					});
        		}
			}).addTo(map_editor);
      map_editor.removeLayer(layer);
			//if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) { layer.bringToFront();}
		}
		if(LayerOrder == 2){
			//bring to back selected layer function
			  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) { layer.bringToBack();}
		}
    
    if(LayerOrder == 3){
      //copy layer
      var l_arr = layer.toGeoJSON();
      var offset_bnd_x = ((layer.getBounds().getNorth() - layer.getBounds().getSouth()))*((Math.random(10.0345)*0.2));
      var offset_bnd_y = ((layer.getBounds().getNorth() - layer.getBounds().getSouth()))*((Math.random(10.0345)*0.2));
       
      //for polygons
      if(l_arr.geometry.type == "Polygon"){
        for (var i = 0; i < l_arr.geometry.coordinates[0].length; i++) {
          l_arr.geometry.coordinates[0][i] = [l_arr.geometry.coordinates[0][i][0] + (offset_bnd_x) , l_arr.geometry.coordinates[0][i][1] + (offset_bnd_y)];
        }    
      }
      //for polyline
      if(l_arr.geometry.type == "LineString"){
        for (var i = 0; i < l_arr.geometry.coordinates.length; i++) {
          l_arr.geometry.coordinates[i] = [l_arr.geometry.coordinates[i][0] + (offset_bnd_x) , l_arr.geometry.coordinates[i][1] + (offset_bnd_y)];
        }    
      }
      L.geoJson(l_arr, {
				style: function (f) {
					return layer.options
				},
				//assign function for color changing
        		onEachFeature: function (feature, layer) {
              layer.on({  
						click: function(e){
							layer_styling(layer, true);
						}
					});
        		}
			}).addTo(map_editor);
    }
	};
}

//custom markers1
const custom_markers1 = [
  "m_rest_major",
  "m_rest_minor",
  "m_zero_datum",
  "m_entrance",
  "m_max_depth",
  "m_quest"
];
map_editor.pm.Toolbar.createCustomControl({
  block: "draw",
  name: "custom_markers1",
  title: "",
  actions: custom_markers1,
  onClick: () => {  
  },
  afterClick: () => {
    //star here
    if(layer_marker1_create_mode == 1) {layer_marker1_create_mode = 0; layer_marker_type = 0} else {layer_marker1_create_mode = 1;}
  },
  doToggle: true,
  toggleStatus: true,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-custom-markers1',
});

//custom markers2
const custom_markers2 = [
  "m_spell",
  "m_bones",
  "m_artifact",
  "m_gold_marker",
];
map_editor.pm.Toolbar.createCustomControl({
  block: "draw",
  name: "custom_markers2",
  title: "",
  actions: custom_markers2,
  onClick: () => {
  },
  afterClick: () => {
    //star here
    if(layer_marker2_create_mode == 1) {layer_marker2_create_mode = 0; layer_marker_type = 0} else {layer_marker2_create_mode = 1;}
  },
  doToggle: true,
  toggleStatus: true,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-custom-markers2',
});

//adding markers on click
map_editor.on('click', addMarker);
function addMarker(e){
  
  if(layer_marker1_create_mode == 1){
    if(layer_marker_type == 1){
      // Add rest_major marker
      var Icon = L.icon({
        iconUrl: icon_cave_x,
        iconSize: [25, 41],
        iconAnchor: [12, 30],
        iconBase: "true",
        className: 'not-important-icon',
      });
      new L.marker(e.latlng, {icon: Icon}).addTo(map_editor);
    }
    if(layer_marker_type == 2){
      // Add rest minor marker
      var Icon = L.icon({
        iconUrl: icon_cave_restriction_small,
        iconSize: [25, 41],
        iconAnchor: [12, 30],
        iconBase: "true",
        className: 'not-important-icon',
      });
      new L.marker(e.latlng, {icon: Icon}).addTo(map_editor);    
    }
    if(layer_marker_type == 3){
      // Add zero datum marker
      var Icon = L.icon({
        iconUrl: icon_cave_zero_datum,
        iconSize: [25, 41],
        iconAnchor: [12, 30],
        iconBase: "true",
        className: 'not-important-icon',
      });
      new L.marker(e.latlng, {icon: Icon}).addTo(map_editor);    
    }
    
    if(layer_marker_type == 4){
      // Add distance from zero datum marker
      marker_custom_shape(e.latlng, 1, plan_lng("td_distance"));
    }
    if(layer_marker_type == 5){
      // Add depth marker
      marker_custom_shape(e.latlng, 2, plan_lng("td_depth"));
    }
    if(layer_marker_type == 10){
      // Add gold marker
      var Icon = L.icon({
      iconUrl: icon_cave_quest,
      iconSize: [25, 41],
      iconAnchor: [12, 30],
      iconBase: "true",
      className: 'not-important-icon',
      });
      new L.marker(e.latlng, {icon: Icon}).addTo(map_editor);
    }
  }

  if(layer_marker2_create_mode == 1){
    if(layer_marker_type == 6){
      // Add speleothemes marker
      var Icon = L.icon({
        iconUrl: icon_cave_speleothems,
        iconSize: [25, 41],
        iconAnchor: [12, 30],
        iconBase: "true",
        className: 'not-important-icon',
      });
      new L.marker(e.latlng, {icon: Icon}).addTo(map_editor);    
    }
    if(layer_marker_type == 7){
      // Add bones and bodies marker
      var Icon = L.icon({
        iconUrl: icon_cave_bones,
        iconSize: [25, 41],
        iconAnchor: [12, 30],
        iconBase: "true",
        className: 'not-important-icon',
      });
      new L.marker(e.latlng, {icon: Icon}).addTo(map_editor);    
    }
    if(layer_marker_type == 8){
      // Add artifacts marker
      var Icon = L.icon({
        iconUrl: icon_cave_artifact,
        iconSize: [25, 41],
        iconAnchor: [12, 35],
        iconBase: "true",
        className: 'not-important-icon',
      });
      new L.marker(e.latlng, {icon: Icon}).addTo(map_editor);
    }
    if(layer_marker_type == 9){
      // Add gold marker
      var Icon = L.icon({
      iconUrl: gold_marker_01,
      iconSize: [30, 50],
      iconAnchor: [15, 39],
      iconBase: "true",
      className: 'not-important-icon',
      });
      new L.marker(e.latlng, {icon: Icon}).addTo(map_editor);
    }
  }
}

//create custom shape markers
function marker_custom_shape(latlng, type, name){
  if(type == 1){
    var icon_distance = new L.marker(latlng, {
      className: 'not-important-icon',
      markerType: 1,
      textMarker: true,
      text: name,
      textMarkerCentered: true,
    }).addTo(map_editor);    
    icon_distance.pm.getElement().style.borderRadius = "50%";
    icon_distance.pm.getElement().style.color = "#666666";
    icon_distance.pm.getElement().style.fontWeight = "bold";
    icon_distance.pm.getElement().style.border = "2px solid #666666";
  }
  if(type == 2){
    var icon_depth = new L.marker(latlng, {
      className: 'not-important-icon',
      markerType: 2,
      textMarker: true,
      text: name,
      textMarkerCentered: true,
      
    }).addTo(map_editor);
    icon_depth.pm.getElement().style.textDecorationLine = "overline";
    icon_depth.pm.getElement().style.fontWeight = "bold";
    icon_depth.pm.getElement().style.color = "#666666";
    icon_depth.pm.getElement().style.borderRadius = "10px";
    icon_depth.pm.getElement().style.border = "2px solid #666666";
  }
}

//layers optimize
/*
const layer_optimize = [
  "layer_optimize_1",
  "layer_optimize_2",
  "layer_optimize_3",
  "layer_optimize_4",
];
map_editor.pm.Toolbar.createCustomControl({
  block: "edit",
  name: "layer optimize",
  actions: layer_optimize,
  title: "",
  onClick: () => {
  },
  afterClick: () => {
    if(layer_optimize_mode == 1) {layer_optimize_mode = 0; layer_optimize_mode_val = 0} else {layer_optimize_mode = 1;}
  },
  doToggle: true,
  toggleStatus: true,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-layer-optimize',
});
*/

//add meters line
L.control.betterscale().addTo(map_editor);

//add notifications 
var notification = L.control.notifications({
  timeout: 7000,
  position: 'bottomleft',
  closable: false,
  dismissable: true,
}).addTo(map_editor);