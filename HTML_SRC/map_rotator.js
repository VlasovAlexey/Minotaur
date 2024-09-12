
var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    id: 'mapbox.streets',
    maxZoom: 24,
    maxNativeZoom: 18,
    //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    // noWrap: true
});

var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 24,
    maxNativeZoom: 19,
    //attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // noWrap: true
});

var map = L.map('map', {
    center: [lat_reg, lon_reg],
    zoom: 17,
    layers: [esri],
    // worldCopyJump: true,
    // preferCanvas: false,
    zoomAnimation: false,
    /* DEBUG: L.Renderer._updateTransform() */
    rotate: true,
    rotateControl: {
        closeOnZeroBearing: false,
        position: 'bottomleft',
    },
    bearing: 30,
    zoomControl: false,
    rotateControl: false,
    // attributionControl: false,
    // zoomControl: false,
    compassBearing: true,
    // trackContainerMutation: false,
    // shiftKeyRotate: false,
    // touchGestures: true,
    // touchRotate: true,
    // touchZoom: true
});

// map.setBearing(90);
// map.touchRotate.enable();

// map.touchZoom.disable()
// map.compassBearing.disable()
// map.touchGestures.enable()

// map.zoomControl.setPosition('bottomleft');
// map.rotateControl.setPosition('bottomleft');
// map.setMaxBounds([[-90,-180], [90,180]]);

var layers = L.control.layers({
    'Empty': L.tileLayer(''),
    'Streets': osm,
    'Satellite': esri,
}, null, {
    collapsed: true,
    position: 'bottomright'
}).addTo(map);

//style for main line
var style = {
    color: "#ff0000",
    weight: 5,
    opacity: 1.0
     }, 
    stroke = {
    color: "#fff",
    weight: 9,
    opacity: 1.0
    };

//draw main line with outline
var path1 = L.polyline(route_map_disp, stroke, {
    renderer: L.canvas()
}).addTo(map);
var path2 = L.polyline(route_map_disp, style, {
    renderer: L.canvas()
}).addTo(map);

//disable heading button
document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';
// Display some debug info
//L.Rotate.debug(map);

var playerLoc = new L.Marker(map.getCenter()).addTo(map);


//var currentAutoMove = false; // needed to check in `movestart` event-listener if moved from interval or by user
//var pauseAutoMove = false; // if true -> Stops moving map

setInterval(()=>{
    updatemap();
}, 500)

function updatemap() {  // Update the current player location on map
    playerLoc.setLatLng([lat_reg,lon_reg]);
    map.invalidateSize();
    map.panTo([lat_reg,lon_reg]);
    
    //button record pressed
    if (record_state == 1){
        path1.removeFrom(map);
        path2.removeFrom(map);
        route_map_disp.push([lat_reg,lon_reg]);
        path1 = L.polyline(route_map_disp, stroke, {
            renderer: L.canvas()
        }).addTo(map);
        path2 = L.polyline(route_map_disp, style, {
            renderer: L.canvas()
        }).addTo(map);
    }
    //button record pressed
    if (record_state == 0){
        path1.removeFrom(map);
        path2.removeFrom(map);
        route_map_disp = [[0,0]];
        path1 = L.polyline(route_map_disp, stroke, {
            renderer: L.canvas()
        }).addTo(map);
        path2 = L.polyline(route_map_disp, style, {
            renderer: L.canvas()
        }).addTo(map);
    }

}

map.on('movestart',(e)=>{
	//console.log(e, currentAutoMove);
})

