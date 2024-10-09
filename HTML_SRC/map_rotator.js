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

//draw main line with outline
//function draw_line(){}

var path1 = L.hotline(route_map_disp, {
    min: 150,
    max: 350,
    palette: {
        0.0: '#008800',
        0.5: '#ffff00',
        1.0: '#ff0000'
    },
    weight: 15,
    outlineColor: '#000000',
    outlineWidth: 3,
    smoothFactor: 4
}).addTo(map);

//disable heading button
document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';

// Display some debug info
//L.Rotate.debug(map);

var playerLoc = new L.Marker(map.getCenter()).addTo(map);

function start_draw_path(){
    setInterval(()=>{
        updatemap();
    }, (document.getElementById("rec_freq_opt").value * 1000.0));
}
start_draw_path();

function updatemap() {  // Update the current player location on map
    
    //button record pressed
    if (record_state == 1){
        path1.removeFrom(map);
        //path2.removeFrom(map);
        if($("#data_format_opt").val() * 1.0 == 1){
            //Regular GPS Tracking
            playerLoc.setLatLng([lat_reg,lon_reg]);
            map.invalidateSize();
            map.panTo([lat_reg,lon_reg]);
            
            route_map_disp.push([lat_reg,lon_reg,ele_reg]);

            path1 = L.hotline(route_map_disp, {
                min: 150,
                max: 350,
                palette: {
                    0.0: '#008800',
                    0.5: '#ffff00',
                    1.0: '#ff0000'
                },
                weight: 15,
                outlineColor: '#000000',
                outlineWidth: 3,
                smoothFactor: 4
            }).addTo(map);
            
        } else {
            //all others modes with Constant Speed
            playerLoc.setLatLng([c_lat,c_lon]);
            map.invalidateSize();
            map.panTo([c_lat,c_lon]);
            
            route_map_disp.push([c_lat,c_lon,ele_reg]);
            
            path1 = L.hotline(route_map_disp, {
                min: 150,
                max: 350,
                palette: {
                    0.0: '#008800',
                    0.5: '#ffff00',
                    1.0: '#ff0000'
                },
                weight: 15,
                outlineColor: '#000000',
                outlineWidth: 3,
                smoothFactor: 4
            }).addTo(map);
        }
    }
    //button record not pressed
    if (record_state == 0){
        
    }

}

map.on('movestart',(e)=>{
	//console.log(e, currentAutoMove);
})

