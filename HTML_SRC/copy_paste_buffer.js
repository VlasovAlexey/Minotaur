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
    //assign values from url if present and recognized
	if(search == "" ){
		//do nothing but in future :)
	}
	else
	{
	//data present	
		url_arr = search;
        //url_arr = `https://vlasovalexey.github.io/Minotaur/HTML_SRC/?:mtr=3:eyJ0eXBlIjoiRmVhdHVyZUNvbGxlY3Rpb24iLCJmZWF0dXJlcyI6W3sidHlwZSI6IkZlYXR1cmUiLCJwcm9wZXJ0aWVzIjp7Im1hcmtlck9wdGlvbnMiOnsiaWNvblNpemUiOlsyNSwyNV0sImljb25VcmwiOiJpY29ucy9pY29uX2NhdmVfeC5zdmciLCJpY29uQmFzZSI6InRydWUifX0sImdlb21ldHJ5Ijp7InR5cGUiOiJQb2ludCIsImNvb3JkaW5hdGVzIjpbMTkuMDI1NDgyMTQ4MDIwMDksNDcuNDk0Nzk5NjMyNzI2NzRdfSwic3R5bGUiOnsib3BhY2l0eSI6MX19XX0=`;
		if(url_arr.indexOf("%") != -1){
			url_arr = decodeURIComponent(url_arr);
		}

		if(url_arr.length > 10){
			url_arr = url_arr.split(":");
		}
        if(url_arr[2] == "mtr=3"){
            geojson_styled_import(atob(url_arr[3]), 1);
        }
	}
}
paste_link();