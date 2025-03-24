//current page location constants creation
const {
    host, hostname, href, origin, pathname, port, protocol, search
} = window.location

var url_arr = search;

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
function check_data_URL(){
    if(url_arr.indexOf("?:mtr=1:") != -1){
        del_html_elem("tn_overlay_text_URL");
        create_html_text("tn_overlay_text_URL", "opt_overlay_text_URL", plan_lng("ch_lnkClipboard_URL"));
        document.getElementById("AlertOverlay_URL").style.height = "100%";
        document.getElementById("AlertOverlay_URL").style.opacity = "1";
    }
    if(url_arr.indexOf("?:mtr=2:") != -1){
        del_html_elem("tn_overlay_text_URL");
        create_html_text("tn_overlay_text_URL", "opt_overlay_text_URL", plan_lng("ch_lnkClipboard_URL"));
        document.getElementById("AlertOverlay_URL").style.height = "100%";
        document.getElementById("AlertOverlay_URL").style.opacity = "1";
    }
    if(url_arr.indexOf("?:mtr=3:") != -1){
        del_html_elem("tn_overlay_text_URL");
        create_html_text("tn_overlay_text_URL", "opt_overlay_text_URL", plan_lng("ch_lnkClipboard_URL"));
        document.getElementById("AlertOverlay_URL").style.height = "100%";
        document.getElementById("AlertOverlay_URL").style.opacity = "1";
    }
}
check_data_URL();

function load_data_URL(){
    paste_link();
    setTimeout(function() {
		document.getElementById("AlertOverlay_URL").style.height = "0%";
	}, 400);
	document.getElementById("AlertOverlay_URL").style.opacity = "0";
}

//paste and open data if link containing info
function paste_link(){        
    //data present
	if(url_arr.indexOf("%") != -1){
	    url_arr = decodeURIComponent(url_arr);
	}
	if(url_arr.length > 5){
	   url_arr = url_arr.split(":");
	}
    if(url_arr[1] == "mtr=3"){        
        geojson_styled_import(atob(url_arr[2]), 1);
        //document.getElementById("7-header").click();
        map_editor.toggleFullscreen();
    }
    if(url_arr[1] == "mtr=1"){
        loadFile(host_name + 'example_maps/Lila_cave_Matanzas_Cuba.geojson');
    }
    if(url_arr[1] == "mtr=2"){
        loadFile(host_name + 'example_maps/El_Brinco_2_cave_Matanzas_Cuba.geojson');
    }
}


//file:///H:/Minotaur/HTML_SRC/index.html?:mtr=1:
async function loadFile(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        geojson_styled_import(data, 1);
        document.getElementById("7-header").click();
        map_editor.toggleFullscreen();
    } catch (err) {
      console.error(err);
    }
  }
