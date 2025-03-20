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

//paste and open to full screen if link containing info
function paste_link(){
    var url_arr = search;
    
    //assign values from url if present and recognized
	if(search == "" ){
		//do nothing but in future :)
	}
	else
	{
	//data present
		if(url_arr.indexOf("%") != -1){
			url_arr = decodeURIComponent(url_arr);
		}
		if(url_arr.length > 10){
			url_arr = url_arr.split(":");
		}
        if(url_arr[1] == "mtr=3"){
            geojson_styled_import(atob(url_arr[2]), 1);
        }
	}
}
paste_link();