//Add custom path
var view_3d_status = 0;
map_editor.pm.Toolbar.createCustomControl({
  block: "custom",
  name: "view_3d",
  title: "",
  //actions: ["cancel",],
  onClick: () => {
  },
  afterClick: () => {
    draw_3d();
    if(view_3d_status == 0){      
    }
    view_3d_status = view_3d_status + 1;
    if(view_3d_status > 1){
      view_3d_status = 0;
    }
  },
  doToggle: false,
  toggleStatus: false,
  disableOtherButtons: true,
  className: 'control-icon leaflet-pm-icon-3d-view',
});

function draw_3d(){
  if(view_3d_status == 1){
    document.getElementsByClassName('draw_3d_window')[0].style.display = 'none';
  } else {
    finish_line_map_editor();
    document.getElementsByClassName('draw_3d_window')[0].style.display = 'block';
  }
}

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
      container.className = "draw_3d_window";
      container.id = "draw_3d_window";
      var table_1 = '<table class="window_3d"><thead><tr class="window_3d"><td class="window_table_3d_main" id="window_table_3d_main"></td></tr></thead></table>'
      container.innerHTML = table_1;
      //container.title = "Title";
      return container;
  },
  onRemove: function(map) {},

});
var control = new L.window();
control.addTo(map_editor);

//create all interface element inside created window
create_html_text("window_table_3d_main","opt_test_vrt" ,"TEST_TEXT");
document.getElementsByClassName('draw_3d_window')[0].style.display = 'none';
