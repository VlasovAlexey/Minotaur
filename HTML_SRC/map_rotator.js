var route_map_disp = [];
var c_lat = 0;
var c_lon = 0;

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
}, ($("#rec_freq_opt").val() * 1000.0))

function updatemap() {  // Update the current player location on map
    
    //button record pressed
    if (record_state == 1){
        if($("#data_format_opt").val() * 1.0 == 1){
            //Regular GPS Tracking
            playerLoc.setLatLng([lat_reg,lon_reg]);
            map.invalidateSize();
            map.panTo([lat_reg,lon_reg]);
            
            path1.removeFrom(map);
            path2.removeFrom(map);
            route_map_disp.push([lat_reg,lon_reg]);
            path1 = L.polyline(route_map_disp, stroke, {
                renderer: L.canvas()
            }).addTo(map);
            path2 = L.polyline(route_map_disp, style, {
                renderer: L.canvas()
            }).addTo(map);
        } else {
            //all others modes with Constant Speed
            playerLoc.setLatLng([c_lat,c_lon]);
            map.invalidateSize();
            map.panTo([c_lat,c_lon]);
            
            c_time_freq = $("#rec_freq_opt").val() * 1.0;
            c_speed = document.getElementById("const_spd_opt").value;
            c_speed = (c_speed.replace(",", ".")) * 1.0;
            //console.log(route_map_disp);
            
            c_lat_new = destinationPoint(c_lat, c_lon, c_time_freq * c_speed, course_reg * 1.0).lat;
			c_lon_new = destinationPoint(c_lat, c_lon, c_time_freq * c_speed, course_reg * 1.0).lon;

            path1.removeFrom(map);
            path2.removeFrom(map);
            route_map_disp.push([c_lat,c_lon]);
            path1 = L.polyline(route_map_disp, stroke, {
                renderer: L.canvas()
            }).addTo(map);
            path2 = L.polyline(route_map_disp, style, {
                renderer: L.canvas()
            }).addTo(map);
            
            c_lat = c_lat_new;
            c_lon = c_lon_new;
        }
    }
    //button record pressed
    if (record_state == 0){
        playerLoc.setLatLng([lat_reg,lon_reg]);
        map.invalidateSize();
        map.panTo([lat_reg,lon_reg]);
        
        path1.removeFrom(map);
        path2.removeFrom(map);
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

