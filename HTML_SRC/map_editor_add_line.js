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
    document.getElementsByClassName('input_path_create')[0].style.display = 'none';
  } else {
    document.getElementsByClassName('input_path_create')[0].style.display = 'block';
  }
}

L.window = L.Control.extend({
  options: {
      position: 'topcenter'
  },
  onAdd: function (map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      container.className = "input_path_create";
      container.id = "input_path_create";
      //container.innerHTML = '<div class="input_path_create"><button type="button" >asssasini</button><input type="text" inputmode="decimal">Lat</input></div>';
      //container.title = "Title";
      return container;
  },
  onRemove: function(map) {},
});
var control = new L.window();
control.addTo(map_editor);

create_html_text("input_path_create","opt_line_lat" ,"");
create_input_val("input_path_create", "opt_input_create_lat", "1.0");
create_html_text("input_path_create","opt_line_lon" ,"");
create_input_val("input_path_create", "opt_input_create_lon", "1.0");
create_html_button("input_path_create", "opt_button_get_coord", "get_data_from_center_map_editor();")
create_html_text("input_path_create", "opt_line_distance", "");
create_input_val("input_path_create", "opt_input_create_distance", "10.0");
create_html_text("input_path_create", "opt_line_azimuth", "");
create_input_val("input_path_create", "opt_input_create_azimuth", "45.0");
create_html_text("input_path_create", "opt_line_depth", "");
create_input_val("input_path_create", "opt_input_create_depth", "0.0");
create_html_button("input_path_create", "opt_button_add_point", "add_point_map_editor();")
create_html_button("input_path_create", "opt_button_finish_line", "finish_line_map_editor();")
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