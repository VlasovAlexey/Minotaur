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
    }
    
    layers_map = L.control.layers(translate_map_selector(td_lng,osm,esri), null, {
        collapsed: true,
        position: "topleft",
    }).addTo(map);
}
draw_path();

//disable heading button
document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';

// Display some debug info
//L.Rotate.debug(map);
const person_marker_icon_png = `data:@file/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAYAAAAWy4frAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE7mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OSwgMjAyMy8wNi8yNS0yMDowMTo1NSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjMgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wOC0yOFQyMDoxNzoyOSswMzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDktMDNUMjE6MjY6NTQrMDM6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDktMDNUMjE6MjY6NTQrMDM6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIxMjcwNzIxLTU3ZTUtNDg0Zi1iYjAxLTg5YjU3ZGZmZTQ5ZCIgeG1wTU06RG9jdW1lbnRJRD0i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`;
var PlayerIcon = L.icon({
    iconUrl: person_marker_icon_png,
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
        //map.options.rotate = true;
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
        
        if (first_start_app == 1){
            //first app start
            playerLoc.setLatLng([lat_reg,lon_reg]);
            map.invalidateSize();
            map.panTo([lat_reg,lon_reg]);
            //map.options.rotate = true;
            document.getElementById("speed_val_text").innerHTML = speed_map.toFixed(1);
            //document.getElementById("ele_val_text").innerHTML = parseFloat((document.getElementById("default_ele_opt").value).replace(",", ".")).toFixed(1);
        }
        
        if (first_start_app == 0){
			//app already written track
            playerLoc.setLatLng(path1.getBounds().getCenter());
			map.invalidateSize();
            map.panTo(path1.getBounds().getCenter());
		}
        //loaded data from 
        if (first_start_app == 3){
			//focus on loaded track from route builder
            playerLoc.setLatLng(path_gray.getBounds().getCenter());
			map.invalidateSize();
            map.panTo(path_gray.getBounds().getCenter());
		}
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
    var tree_size_arr = [];
    for (i = 0; i < route_map_disp.length; i++) {
        tree_size_arr.push([route_map_disp[i].x,route_map_disp[i].y,route_map_disp[i].z]);
    }
    path1 = L.hotline(tree_size_arr, {
        min: ele_line_max,
        max: ele_line_min,
        palette: {
            0.0: '#5abdff',
            0.25: '#007acc',
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

  /* 
			var html2canvasConfiguration = {
				allowTaint: true,
				foreignObjectRendering: true,
				useCORS: true,
				width: map._size.x,
				height: map._size.y,
				backgroundColor: null,
				logging: true,
				imageTimeout: 0
			};
			
			var elementToCapture = map._container.getElementsByClassName('leaflet-pane leaflet-map-pane')[0];
			html2canvas(elementToCapture, html2canvasConfiguration).then(function (canvas) {
				var link = document.createElement('a');
				link.download = 'test_a.png';
				link.href = canvas.toDataURL();
				link.click();
				link.remove();
			})
			*/