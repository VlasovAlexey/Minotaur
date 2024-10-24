var route_map_disp = [];
var c_lat = 0;
var c_lon = 0;

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
        layers_map.remove();
        //spd_textbox.remove();
    }
    
    layers_map = L.control.layers(translate_map_selector(td_lng,osm,esri), null, {
        collapsed: true,
        position: "topright"
    }).addTo(map);
}
draw_path();

//disable heading button
document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';

// Display some debug info
//L.Rotate.debug(map);
var PlayerIcon = L.icon({
    iconUrl: 'leaflet/images/person_marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 30] 
});
var playerLoc = new L.Marker(map.getCenter() , {icon: PlayerIcon}).addTo(map);
var rec_vls;
function start_draw_path(){
    rec_vls = document.getElementById("rec_freq_opt").value * 1000.0;
    if($("#data_format_opt").val() * 1.0 == 1){
        //regular GPS track
        rec_vls = 1000;
    } else {
        //constant speed DPV track
    }
    setInterval(()=>{
        updatemap();
    }, rec_vls);
}
start_draw_path();

function updatemap() {  // Update the current player location on map
    
    //button record pressed
    if (record_state == 1){
        path1.removeFrom(map);
        if($("#data_format_opt").val() * 1.0 == 1){
            //Regular GPS Tracking
            playerLoc.setLatLng([lat_reg,lon_reg]);
            map.invalidateSize();
            map.panTo([lat_reg,lon_reg]);
            draw_path();
            document.getElementById("ele_val_text").innerHTML = (ele_reg * 1.0).toFixed(1);
            document.getElementById("time_val_text").innerHTML = dec_sec_to_time_format(t_time);
            document.getElementById("speed_val_text").innerHTML = speed_map.toFixed(1);
            document.getElementById("distance_val_text").innerHTML = (distance_map / 1000).toFixed(2);
            
        } else {
            //all others modes with Constant Speed
            playerLoc.setLatLng([c_lat,c_lon]);
            map.invalidateSize();
            map.panTo([c_lat,c_lon]);
            draw_path();    
            document.getElementById("ele_val_text").innerHTML = ele_reg_const.toFixed(1);
            document.getElementById("time_val_text").innerHTML = dec_sec_to_time_format(t_time);
            document.getElementById("speed_val_text").innerHTML = speed_map.toFixed(1);
            document.getElementById("distance_val_text").innerHTML = (distance_map / 1000).toFixed(2);
        }
    }
    //button record not pressed
    if (record_state == 0){
        playerLoc.setLatLng([lat_reg,lon_reg]);
        map.invalidateSize();
        map.panTo([lat_reg,lon_reg]);

        document.getElementById("speed_val_text").innerHTML = speed_map.toFixed(1);
        document.getElementById("ele_val_text").innerHTML = parseFloat((document.getElementById("default_ele_opt").value).replace(",", ".")).toFixed(1);
    }
}

//convert decimal time in seconds to regular time format xx:xx:xx
function dec_sec_to_time_format(sec_num){
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    return hours + ":" + minutes + ":" + seconds;
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

//elevation value
var ele_val_textbox = L.Control.extend({
    onAdd: function() {
        spd_text = L.DomUtil.create('div');
        spd_text.innerHTML = "<div id=\"ele_val_text\" class=\"ele_val_text\"></div>"
        return spd_text;
    },
});
new ele_val_textbox({ position: 'bottomleft' }).addTo(map);

//add elevation(altitude) text to the map
var ele_textbox = L.Control.extend({
    onAdd: function() {
        ele_text = L.DomUtil.create('div');
        ele_text.innerHTML = "<div id=\"ele_info_text\" class=\"ele_info_text\"></div>"
        return ele_text;
    },
});
new ele_textbox({ position: 'bottomleft' }).addTo(map);

//distance value to the map
var distance_val_textbox = L.Control.extend({
    onAdd: function() {
        t1_text = L.DomUtil.create('div');
        t1_text.innerHTML = "<div id=\"distance_val_text\" class=\"distance_val_text\">0.0</div>"
        return t1_text;
    },
});
new distance_val_textbox({ position: 'bottomleft' }).addTo(map);

//distance text to the map
var distance_textbox = L.Control.extend({
    onAdd: function() {
        t1_text = L.DomUtil.create('div');
        t1_text.innerHTML = "<div id=\"distance_info_text\" class=\"distance_info_text\"></div>"
        return t1_text;
    },
});
new distance_textbox({ position: 'bottomleft' }).addTo(map);

//time text to the map
var time_textbox = L.Control.extend({
    onAdd: function() {
        t1_text = L.DomUtil.create('div');
        t1_text.innerHTML = "<div id=\"time_info_text\" class=\"time_info_text\"></div>"
        return t1_text;
    },
});
new time_textbox({ position: 'topleft' }).addTo(map);

//time value to the map
var time_val_textbox = L.Control.extend({
    onAdd: function() {
        t2_text = L.DomUtil.create('div');
        t2_text.innerHTML = "<div id=\"time_val_text\" class=\"time_val_text\">00:00:00</div>"
        return t2_text;
    },
});
new time_val_textbox({ position: 'topleft' }).addTo(map);

//speed value to the map
var speed_val_textbox = L.Control.extend({
    onAdd: function() {
        t1_text = L.DomUtil.create('div');
        t1_text.innerHTML = "<div id=\"speed_val_text\" class=\"speed_val_text\">0</div>"
        return t1_text;
    },
});
new speed_val_textbox({ position: 'bottomright' }).addTo(map);

//speed text to the map
var speed_textbox = L.Control.extend({
    onAdd: function() {
        t1_text = L.DomUtil.create('div');
        t1_text.innerHTML = "<div id=\"speed_info_text\" class=\"speed_info_text\">0</div>"
        return t1_text;
    },
});
new speed_textbox({ position: 'bottomright' }).addTo(map);