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
      container.id = "input_path_create";
      container.innerHTML = `<div>O</div>`;
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
      container.className = "input_path_create";
      container.id = "input_path_create";
      var table_1 = '<table class="input_path_table"><thead><tr><td class="input_path_lat" id="input_path_lat"></td><td class="input_path_lon" id="input_path_lon"></td></tr></thead></table>'
      var table_2 = `<table class="input_path_table"><thead><tr><td class="input_btn_coord" id="input_btn_coord"></td></tr></thead></table>`
      var table_3 = '<table class="input_path_table"><thead><tr><td class="input_path_distance" id="input_path_distance"></td><td class="input_path_azimuth" id="input_path_azimuth"></td><td class="input_path_depth" id="input_path_depth"></td></tr></thead></table>'
      var table_4 = '<table class="input_path_table"><thead><tr><td class="input_add_point" id="input_add_point"></td><td class="input_finish_line" id="input_finish_line"></td></tr></thead></table>'
      container.innerHTML = table_1 + table_2 + table_3 + table_4;
      //container.title = "Title";
      return container;
  },
  onRemove: function(map) {},
});
var control = new L.window();
control.addTo(map_editor);

create_html_text("input_path_lat","opt_line_lat" ,"");
create_input_val("input_path_lat", "opt_input_create_lat", "1.0");
create_html_text("input_path_lon","opt_line_lon" ,"");
create_input_val("input_path_lon", "opt_input_create_lon", "1.0");
create_html_button("input_btn_coord", "opt_button_get_coord", "get_data_from_center_map_editor();")
create_html_text("input_path_distance", "opt_line_distance", "");
create_input_val("input_path_distance", "opt_input_create_distance", "10.0");
create_html_text("input_path_azimuth", "opt_line_azimuth", "");
create_input_val("input_path_azimuth", "opt_input_create_azimuth", "45.0");
create_html_text("input_path_depth", "opt_line_depth", "");
create_input_val("input_path_depth", "opt_input_create_depth", "0.0");
create_html_button("input_add_point", "opt_button_add_point", "add_point_map_editor();")
create_html_button("input_finish_line", "opt_button_finish_line", "finish_line_map_editor();")
document.getElementsByClassName('input_path_create')[0].style.display = 'none';

function get_data_from_center_map_editor(){
  console.log("get_data_from_center_map_editor");
}

function add_point_map_editor(){
  console.log("add_point_map_editor");
}

function finish_line_map_editor(){
  console.log("finish_line_map_editor");
}