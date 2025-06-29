

//put to clipboard plan
function btn_link() {
    navigator.clipboard.writeText(share_plan_link_gen());
}

//Open overlay window with copy link warning
function openLnkWrn() {
    notification.success(plan_lng("ch_suc"), plan_lng("ch_lnkClipboard"));
    //notification.alert('Alert', 'some alert message');
    //notification.info('Info', 'some infomessage');
    //notification.success('Success', 'some successmessage');
    //notification.warning('Warning', 'some warning message');
    //notification.custom('Custom', 'some <span>custom</span> message');
}

function share_plan_link_gen(){
    //add to var for plan sharing link
    link_buffer = host_name + "?:mtr=100:"

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
    link_buffer += ":lnk";
    if(link_buffer.length > 7999){
        notification.alert(plan_lng("ch_alert"), plan_lng("big_file_url"));
        link_buffer = "";
    } else {
        openLnkWrn();
    }
    return link_buffer;
}
function welcome_scr(){
    del_html_elem("tn_overlay_text_URL");
    create_html_text("tn_overlay_text_URL", "opt_overlay_text_URL", plan_lng("ch_lnkClipboard_URL"));
    document.getElementById("AlertOverlay_URL").style.height = "100%";
    document.getElementById("AlertOverlay_URL").style.opacity = "1";
}

function check_data_URL(){
    if(url_arr.indexOf("?:mtr=1:") != -1){
        welcome_scr();
    }
    if(url_arr.indexOf("?:mtr=2:") != -1){
        welcome_scr();
    }
    if(url_arr.indexOf("?:mtr=3:") != -1){
        welcome_scr();
    }
    if(url_arr.indexOf("?:mtr=4:") != -1){
        welcome_scr();
    }
    if(url_arr.indexOf("?:mtr=100:") != -1){
        welcome_scr();
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

	if(url_arr.length > 5){
	   url_arr = url_arr.split(":");
	}
    if(url_arr[1] == "mtr=100"){
        geojson_styled_import(atob(url_arr[2]), 1);
        document.getElementById("7-header").click();
        map_editor.toggleFullscreen();
    }
    if(url_arr[1] == "mtr=1"){
        loadFile(Lila);
        //loadFile(host_name + 'example_maps/Lila_cave_Matanzas_Cuba.geojson');
    }
    if(url_arr[1] == "mtr=2"){
        loadFile(El_Brinco_2);
        //loadFile(host_name + 'example_maps/El_Brinco_2_cave_Matanzas_Cuba.geojson');
    }
    if(url_arr[1] == "mtr=3"){
        loadFile(Cristales_de_Papaya);
        //loadFile(host_name + 'example_maps/Cristales_de_Papaya_Caletones_Holguin_Cuba.geojson');
    }
     if(url_arr[1] == "mtr=4"){
        loadFileURL(host_name + 'example_maps/Susana_cave_Matanzas_Cuba.geojson');
    }
}

//load geojson file from value array
//file:///H:/Minotaur/HTML_SRC/index.html?:mtr=1:
function loadFile(data) {
    geojson_styled_import(data, 1);
    document.getElementById("7-header").click();
    map_editor.toggleFullscreen();
    setTimeout(function() {
        show_hide_elements();
        show_hide_elements();
	}, 1000);
  }

  //load geojson file from URL
  async function loadFileURL(url) {
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
