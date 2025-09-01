//Add custom path
var path_status = 0;
map_editor.pm.Toolbar.createCustomControl({
  block: "custom",
  name: "create_path",
  title: "",
  //actions: ["cancel",],
  onClick: () => {
  },
  afterClick: () => {
    draw_custom_path();
    if(path_status == 0){
      
    }
    path_status = path_status + 1;
    if(path_status > 1){
      path_status = 0;
    }
    //document.querySelector('.control-icon.leaflet-pm-icon-path-gen').click();
  },
  doToggle: false,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-path-gen',
});

function draw_custom_path(){
  if(path_status == 1){
    document.getElementsByClassName('input_center_map_editor')[0].style.display = 'none';
    document.getElementsByClassName('input_path_create')[0].style.display = 'none';
  } else {
    finish_line_map_editor();
    document.getElementsByClassName('input_path_create')[0].style.display = 'block';
    document.getElementsByClassName('input_center_map_editor')[0].style.display = 'block';
  }
}

L.marker_center = L.Control.extend({
  options: {
      position: 'middlecenter'
  },
  onAdd: function (map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      container.className = "input_center_map_editor";
      container.id = "input_center_map_editor";
      container.innerHTML = `<div style="color:#ee0000; font-size: 40px;">☉</div>`;
      //container.title = "Title";
      return container;
  },
  onRemove: function(map) {},
  
});
var control = new L.marker_center();
control.addTo(map_editor);

L.window = L.Control.extend({
  options: {
      position: 'topcenter'
  },
  onAdd: function (map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      
      //disable touch and zoom on window
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      //window class and id
      container.className = "input_path_create";
      container.id = "input_path_create";
      var table_1 = '<table class="input_table_style"><thead><tr class="input_table_style"><td class="input_table_style" id="input_path_lat"></td><td class="input_table_style" id="input_path_lon"></td><td class="input_table_style" id="input_path_depth_start"></td></tr></thead></table>'
      var table_2 = `<table class="input_table_style"><thead><tr class="input_table_style"><td class="input_table_style" id="input_btn_coord"></td></tr></thead></table>`
      var table_3 = '<table class="input_table_style"><thead><tr class="input_table_style"><td class="input_table_style" id="input_path_distance"></td><td class="input_table_style" id="input_path_azimuth"></td><td class="input_table_style" id="input_path_depth"></td></tr></thead></table>'
      var table_4 = '<table class="input_table_style"><thead><tr class="input_table_style"><td class="input_table_style" id="input_add_point"></td><td class="input_table_style" id="input_finish_line"></td></tr></thead></table>'
      container.innerHTML = table_1 + table_2 + table_3 + table_4;
      //container.title = "Title";
      return container;
  },
  onRemove: function(map) {},

});
var control = new L.window();
control.addTo(map_editor);

//create all interface element inside created window
create_html_text("input_path_lat","opt_line_lat" ,"");
create_input_val_sign("input_path_lat", "opt_input_create_lat", document.getElementById("default_lat_opt").value);
create_html_text("input_path_lon","opt_line_lon" ,"");
create_input_val_sign("input_path_lon", "opt_input_create_lon", document.getElementById("default_lon_opt").value);
create_html_text("input_path_depth_start","opt_line_depth_start" ,"");
create_input_val("input_path_depth_start", "opt_input_create_depth_start", document.getElementById("default_ele_opt").value);
create_html_button("input_btn_coord", "opt_button_get_coord", "get_data_from_center_map_editor();")
create_html_text("input_path_distance", "opt_line_distance", "");
create_input_val("input_path_distance", "opt_input_create_distance", "10,0");
create_html_text("input_path_azimuth", "opt_line_azimuth", "");
create_input_val("input_path_azimuth", "opt_input_create_azimuth", "45,0");
create_html_text("input_path_depth", "opt_line_depth", "");
create_input_val("input_path_depth", "opt_input_create_depth", "0,0");
create_html_button("input_add_point", "opt_button_add_point", "add_point_map_editor();")
create_html_button("input_finish_line", "opt_button_finish_line", "finish_line_map_editor();")

document.getElementsByClassName('input_path_create')[0].style.display = 'none';
document.getElementsByClassName('input_center_map_editor')[0].style.display = 'none';

var xy_line_array_add = [];
var z_line_array_add = [];
var line_add_first_start = 0;
//main functions
function get_data_from_center_map_editor(){
  var txt = map_editor.getCenter();
  txt = txt.toString();
  txt = (txt.slice((txt.indexOf('LatLng(')) + 7));
  document.getElementById("opt_input_create_lat").value = (txt.slice(0 , (txt.indexOf(',')) - 1)).replace("." , ",");
  document.getElementById("opt_input_create_lat_seacraft").value = (txt.slice(0 , (txt.indexOf(',')) - 1)).replace("." , ",");
  document.getElementById("default_lat_opt").value = (txt.slice(0 , (txt.indexOf(',')) - 1)).replace("." , ",");
  
  txt = (txt.slice((txt.indexOf(' ')) + 1));
  document.getElementById("opt_input_create_lon").value = (txt.slice(0 , (txt.indexOf(')')) - 1)).replace("." , ",");
  document.getElementById("opt_input_create_lon_seacraft").value = (txt.slice(0 , (txt.indexOf(')')) - 1)).replace("." , ",");
  document.getElementById("default_lon_opt").value = (txt.slice(0 , (txt.indexOf(')')) - 1)).replace("." , ",");
  upd_all();
}

function add_point_map_editor(){
  var sp_start_depth = document.getElementById("opt_input_create_depth_start").value.replace("," , ".");
  var sp_next_depth = document.getElementById("opt_input_create_depth").value.replace("," , ".");
  var sp_lat = document.getElementById("opt_input_create_lat").value.replace("," , ".");
  var sp_lon = document.getElementById("opt_input_create_lon").value.replace("," , ".");

  var azmt = parseFloat(document.getElementById("opt_input_create_azimuth").value.replace("," , "."));
  var dst_nt = parseFloat(document.getElementById("opt_input_create_distance").value.replace("," , "."));
  
  if (line_add_first_start == 0){
    if ((Math.abs(parseFloat(sp_start_depth) - parseFloat(sp_next_depth)) > parseFloat(dst_nt))){
      //depth > distance error notice
      notification.alert(plan_lng("ch_alert"), plan_lng("ch_big_depth"));
    } else {
      //all is ok
      //first add marker with start depth
      var text = sp_start_depth + plan_lng("ch_mtr");
      var depth = parseFloat(sp_start_depth);
      marker = L.marker([parseFloat(sp_lat) , parseFloat(sp_lon)], 
        marker_3d_prop(text, depth)
      ).addTo(map_editor);

      //compute values for line
      xy_line_array_add.push([parseFloat(sp_lat), parseFloat(sp_lon)]);
      z_line_array_add.push((sp_start_depth));

      //correct for top projection distance value
      dst_nt = Math.sqrt(Math.abs((Math.pow(dst_nt, 2)) - (Math.pow(Math.abs(sp_next_depth - z_line_array_add[z_line_array_add.length-1]), 2))));

      var lat_new_tmp = destinationPoint(xy_line_array_add[xy_line_array_add.length-1][0], xy_line_array_add[xy_line_array_add.length-1][1], dst_nt, azmt).lat;
		  var lon_new_tmp = destinationPoint(xy_line_array_add[xy_line_array_add.length-1][0], xy_line_array_add[xy_line_array_add.length-1][1], dst_nt, azmt).lon;
      
		  if (lat_new_tmp == undefined || lon_new_tmp ==undefined){
			  lat_new_tmp = xy_line_array_add[xy_line_array_add.length-1][0];
			  lon_new_tmp = xy_line_array_add[xy_line_array_add.length-1][1];
		  }
      xy_line_array_add.push([lat_new_tmp , lon_new_tmp]);
      z_line_array_add.push(sp_next_depth);
      add_line_arr(xy_line_array_add, "#ff7800", 5, z_line_array_add, "false", undefined);
    
      //add second marker with depth
      var text = sp_next_depth + plan_lng("ch_mtr");
      var depth = parseFloat(sp_next_depth);
      marker = L.marker([lat_new_tmp , lon_new_tmp], 
        marker_3d_prop(text, depth)
      ).addTo(map_editor);

      line_add_first_start = 1;
    }
  } else {
    if ((Math.abs(parseFloat(z_line_array_add[z_line_array_add.length-1]) - parseFloat(sp_next_depth)) > parseFloat(dst_nt))){
      //depth > distance error notice
      notification.alert(plan_lng("ch_alert"), plan_lng("ch_big_depth"));

    } else {
      //all is ok
      //correct for top projection distance value
      dst_nt = Math.sqrt(Math.abs((Math.pow(dst_nt, 2)) - (Math.pow(Math.abs(sp_next_depth - z_line_array_add[z_line_array_add.length-1]), 2))));

      var lat_new_tmp = destinationPoint(xy_line_array_add[xy_line_array_add.length-1][0], xy_line_array_add[xy_line_array_add.length-1][1], dst_nt, azmt).lat;
		  var lon_new_tmp = destinationPoint(xy_line_array_add[xy_line_array_add.length-1][0], xy_line_array_add[xy_line_array_add.length-1][1], dst_nt, azmt).lon;
					
		  if (lat_new_tmp == undefined || lon_new_tmp ==undefined){
			  lat_new_tmp = xy_line_array_add[xy_line_array_add.length-1][0];
			  lon_new_tmp = xy_line_array_add[xy_line_array_add.length-1][1];
		  }
      xy_line_array_add.push([lat_new_tmp , lon_new_tmp]);
      z_line_array_add.push(sp_next_depth);
      currentgeojson.remove();
      add_line_arr(xy_line_array_add, "#ff7800", 5, z_line_array_add, "true", undefined);

      //add next marker with depth
      var text = sp_next_depth + plan_lng("ch_mtr");
      var depth = sp_next_depth;
      marker = L.marker([lat_new_tmp , lon_new_tmp], 
        marker_3d_prop(text, depth)
      ).addTo(map_editor);

      line_add_first_start = line_add_first_start + 1;
    }
  }
}

function finish_line_map_editor(){
  if (line_add_first_start > 0){
    // zoom the map to the polygon after data loaded
	  var fit_polygon = L.polyline([xy_line_array_add]).addTo(map_editor);
	  map_editor.fitBounds(fit_polygon.getBounds());
	  fit_polygon.remove();
    //reset values
    xy_line_array_add = [];
    z_line_array_add = [];
    line_add_first_start = 0;
    document.querySelector('.leaflet-pm-icon-path-gen').click();
  }
}

