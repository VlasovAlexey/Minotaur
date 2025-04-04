//hide map on app start
element_id_hide("map_picker_base");

//show map if button pick map pressed
function btn_open_map_picker(){
    element_id_show("map_picker_base");
    if (first_start_app == 1){
        map_picker.panTo([lat_reg,lon_reg]);
        map_picker.invalidateSize();
    }
    if (first_start_app == 0){
        map_picker.panTo(path1.getBounds().getCenter());
        map_picker.invalidateSize();
    }
    if (first_start_app == 3){
        map_picker.panTo(path_gray_picker.getBounds().getCenter());
        map_picker.invalidateSize();
    }
}

//hide on exit
function btn_close_map_picker(){
    var txt = map_picker.getCenter();
    txt = txt.toString();
    txt = (txt.slice((txt.indexOf('LatLng(')) + 7));
    
    //check internet connection
    if (lat_reg != "0.0" && lon_reg != "0.0"){
        
        //all is ok
        document.getElementById("default_lat_opt").value = (txt.slice(0 , (txt.indexOf(',')) - 1)).replace("." , ",");
        txt = (txt.slice((txt.indexOf(' ')) + 1));
        document.getElementById("default_lon_opt").value = (txt.slice(0 , (txt.indexOf(')')) - 1)).replace("." , ",");
        
        //if on desktop we doesn`t have altitude sensor
        if (ele_reg == null || ele_reg == 0){
            openSensorError();
        } else {
            document.getElementById("default_ele_opt").value = (ele_reg.toFixed(2)).replace("." , ",");
        }    
        upd_all();
    } else {
        //check internet connection warning
        openInternetError();
    }

    element_id_hide("map_picker_base");
    
    
}

//create map for picking
var esri_picker = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    id: 'mapbox.streets',
    maxZoom: 24,
    maxNativeZoom: 18,

});

var osm_picker = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 24,
    maxNativeZoom: 19,
});

var map_picker = L.map('map_picker', {
    center: [lat_reg, lon_reg],
    zoom: 17,
    layers: [esri_picker],
    zoomAnimation: false,
    rotate: true,
    zoomControl: false,
    rotateControl: false
});

var layers = L.control.layers({
    'Empty': L.tileLayer(''),
    'Streets': osm_picker,
    'Satellite': esri_picker,
}, null, {
    collapsed: true,
    position: 'bottomright'
}).addTo(map_picker);


//disable heading button
document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';
