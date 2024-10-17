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
    layers: [esri_editor],
    zoomAnimation: false,
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
}, { //draw primitives settings start here
    'drawlayer': drawnItems
},{
    position: 'topleft',
    collapsed: false
}).addTo(map_editor);

//draw primitives adding controls
map_editor.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        polygon: {
            allowIntersection: false,
            showArea: true
        }
    }
}));

map_editor.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;

    drawnItems.addLayer(layer);
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
