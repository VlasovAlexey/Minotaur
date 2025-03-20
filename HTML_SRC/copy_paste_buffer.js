//current page location constants creation
const {
    host, hostname, href, origin, pathname, port, protocol, search
  } = window.location

var host_name = "https://vlasovalexey.github.io/Minotaur/HTML_SRC/";
var link_buffer = "";

//put to clipboard plan
function btn_link() {
    navigator.clipboard.writeText(share_plan_link_gen());
    openLnkWrn();
}

//Open overlay window with copy link warning
function openLnkWrn() {
    del_html_elem("tn_overlay_text");
    create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("ch_lnkClipboard"));
    document.getElementById("AlertOverlay").style.height = "100%";
    document.getElementById("AlertOverlay").style.opacity = "1";
}

function share_plan_link_gen(){
    //add to var for plan sharing link
    link_buffer = host_name + "?:mtr=3:"

    //get styled geojson from map editor
    var allLayers = new L.featureGroup();
    map_editor.eachLayer(function (layer) {
      if (layer instanceof L.Path) {
        allLayers.addLayer(layer);
        } else {
            if (layer instanceof L.Marker) {
              allLayers.addLayer(layer);
            }
        }
    });
    
    link_buffer += btoa(drawnItemsToJSON(allLayers));
    return link_buffer;
}

//paste and open data if link containing info
var first_start = 0;
var url_loaded = 0;
function paste_link(){
    if(first_start == 0){

        first_start = 1;
        url_loaded = 1;
        
        var url_arr = search;
	    //data present
	    if(url_arr.indexOf("%") != -1){
		    url_arr = decodeURIComponent(url_arr);
	    }
	    if(url_arr.length > 10){
		    url_arr = url_arr.split(":");
	    }
        if(url_arr[1] == "mtr=3"){        
            geojson_styled_import(atob(url_arr[2]), 1);
            document.getElementById("7-header").click();
            map_editor.toggleFullscreen();
        }
    }
}

