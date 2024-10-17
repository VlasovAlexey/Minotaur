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
    fullscreenControl: {
      pseudoFullscreen: false
    },
    center: [c_lat, c_lon],
    zoom: 17,
    layers: [esri_editor],
    zoomAnimation: true,
    rotate: false, //we use rotator version of leaflet and need disable rotator functionality for map editor usage
    rotateControl: {
        closeOnZeroBearing: false,
        position: 'bottomleft',
    },
    bearing: 0,
    zoomControl: false,
    rotateControl: false,
    compassBearing: false,
});

//add meters line
L.control.betterscale().addTo(map_editor);

var drawnItems = L.featureGroup().addTo(map_editor);
var layers_map_editor = L.control.layers({
        "Empty": L.tileLayer(""),
        "Streets": osm_editor,
        "Satellite": esri_editor,
    }, null, {
        collapsed: true,
        position: "bottomright"
}).addTo(map_editor);

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
  
  map_editor.pm.enableDraw('Polygon', {
    snappable: true,
    templineStyle: {
      color: 'blue',
    },
    hintlineStyle: {
      color: 'blue',
      dashArray: [5, 5],
    },
    pathOptions: {
      color: 'red',
      fillColor: 'orange',
      fillOpacity: 0.7,
    },
    markerStyle,
    cursorMarker: false,
    // finishOn: 'contextmenu',
    finishOnDoubleClick: true,
  });

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

//move camera to default lat lon
map_editor.invalidateSize();
map_editor.panTo([c_lat,c_lon]);
