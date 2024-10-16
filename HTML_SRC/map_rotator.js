var route_map_disp = [];
var c_lat = 0;
var c_lon = 0;



// map.setBearing(90);
// map.touchRotate.enable();

// map.touchZoom.disable()
// map.compassBearing.disable()
// map.touchGestures.enable()

// map.zoomControl.setPosition('bottomleft');
// map.rotateControl.setPosition('bottomleft');
// map.setMaxBounds([[-90,-180], [90,180]]);


var layers_map;
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

var first_start_map_rot = 1;
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
    bearing: 0,
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
function lng_map_rot(){
    td_lng = lng_opt.options[lng_opt.selectedIndex].value * 1.0;
    if (first_start_map_rot == 1){
        first_start_map_rot = 0;
    } else {
        map.remove();
        map = L.map('map', {
            center: [lat_reg, lon_reg],
            zoom: 17,
            layers: [esri],
            zoomAnimation: false,
            rotate: true,
            rotateControl: {
                closeOnZeroBearing: false,
                position: 'bottomleft',
            },
            bearing: 30,
            zoomControl: false,
            rotateControl: false,
            compassBearing: true,
        });
    }
    //eng
    if (td_lng == 1) {
        layers_map = L.control.layers({
            "Empty": L.tileLayer(""),
            "Streets": osm,
            "Satellite": esri,
        }, null, {
            collapsed: true,
            position: "bottomright"
        }).addTo(map);
    }
    //ru
    if (td_lng == 2) {
        layers_map = L.control.layers({
            "Пустая карта": L.tileLayer(""),
            "Улицы": osm,
            "Спутниковая карта": esri,
        }, null, {
            collapsed: true,
            position: "bottomright"
        }).addTo(map);
    }
    //sp
    if (td_lng == 3) {
        layers_map = L.control.layers({
            "Vacío": L.tileLayer(""),
            "Calles": osm,
            "Satélite": esri,
        }, null, {
            collapsed: true,
            position: "bottomright"
        }).addTo(map);
    }
    //pt
    if (td_lng == 4) {
        layers_map = L.control.layers({
            "Vazio": L.tileLayer(""),
            "Ruas": osm,
            "Satélite": esri,
        }, null, {
            collapsed: true,
            position: "bottomright"
        }).addTo(map);
    }
    //ch
    if (td_lng == 5) {
        layers_map = L.control.layers({
            "空": L.tileLayer(""),
            "街道": osm,
            "衛星": esri,
        }, null, {
            collapsed: true,
            position: "bottomright"
        }).addTo(map);
    }
    //br
    if (td_lng == 6) {
        layers_map = L.control.layers({
            "Празен": L.tileLayer(""),
            "Улици": osm,
            "Сателит": esri,
        }, null, {
            collapsed: true,
            position: "bottomright"
        }).addTo(map);
    }
    //fr
    if (td_lng == 7) {
        layers_map = L.control.layers({
            "Vide": L.tileLayer(""),
            "Rues": osm,
            "Satellite": esri,
        }, null, {
            collapsed: true,
            position: "bottomright"
        }).addTo(map);
    }
    //kr
    if (td_lng == 8) {
        layers_map = L.control.layers({
            "비어 있음": L.tileLayer(""),
            "거리": osm,
            "위성": esri,
        }, null, {
            collapsed: true,
            position: "bottomright"
        }).addTo(map);
    }
    //it
    if (td_lng == 9) {
        layers_map = L.control.layers({
            "Vuoto": L.tileLayer(""),
            "Strade": osm,
            "Il satellite": esri,
        }, null, {
            collapsed: true,
            position: "bottomright"
        }).addTo(map);
    }
    playerLoc = new L.Marker(map.getCenter()).addTo(map);
}


//draw main line with outline
//function draw_line(){}

draw_path();

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
            
            //route_map_disp.push([lat_reg,lon_reg,ele_reg]);
            draw_path();
            
        } else {
            //all others modes with Constant Speed
            playerLoc.setLatLng([c_lat,c_lon]);
            map.invalidateSize();
            map.panTo([c_lat,c_lon]);
            
            //route_map_disp.push([c_lat,c_lon,ele_reg_const]);
            draw_path();           
        }
    }
    //button record not pressed
    if (record_state == 0){
        playerLoc.setLatLng([lat_reg,lon_reg]);
        map.invalidateSize();
        map.panTo([lat_reg,lon_reg]);
    }

}

var ele_line_min = 0;
var ele_line_max = 150;
var ele_tmp = 0;

var factor_scale = 1;
if (getOS() == "Windows" || getOS() == "Linux" || getOS() == "Mac OS"){
    factor_scale = 0;
}

function draw_path() {
    if($("#data_format_opt").val() * 1.0 == 1){
        //regular GPS track
        if(ele_line_min > ele_reg){
            ele_tmp = ele_line_min - ele_reg;
            ele_line_min = ele_reg;
            if((ele_line_max - ele_start) < (ele_start - ele_line_min)){
                ele_line_max = ele_line_max + ele_tmp;
            }
        };
        if(ele_line_max < ele_reg){
            ele_tmp = ele_reg - ele_line_max;
            ele_line_max = ele_reg;
            if((ele_line_max - ele_start) > (ele_start - ele_line_min)){
                ele_line_min = ele_line_min - ele_tmp;
            }
        };
        
        /*
        if((ele_line_max - ele_start) > (ele_start - ele_line_min)){
            ele_line_min = ele_line_min - ((ele_line_max - ele_start) - (ele_start - ele_line_min));
        };
        if((ele_line_max - ele_start) < (ele_start - ele_line_min)){
            ele_line_max = ele_line_max + ((ele_start - ele_line_min) - (ele_line_max - ele_start));
        };
        */
    }  else {
        //constant speed track
        if(ele_line_min > ele_reg_const){
            ele_tmp = ele_line_min - ele_reg_const;
            ele_line_min = ele_reg_const;
            if((ele_line_max - ele_start) < (ele_start - ele_line_min)){
                ele_line_max = ele_line_max + ele_tmp;
            }
        };
        if(ele_line_max < ele_reg_const){
            ele_tmp = ele_reg_const - ele_line_max;
            ele_line_max = ele_reg_const;
            if((ele_line_max - ele_start) > (ele_start - ele_line_min)){
                ele_line_min = ele_line_min - ele_tmp;
            }
        };
    }

    path1 = L.hotline(route_map_disp, {
        min: ele_line_max,
        max: ele_line_min,
        palette: {
            0.0: '#ff0000',
            0.25: '#ffff00',
            0.5: '#008800',
            0.75: '#ffff00',
            1.0: '#ff0000'
        },
        weight: 10,
        outlineColor: '#000000',
        outlineWidth: 2,
        smoothFactor: factor_scale
    }).addTo(map);
}
