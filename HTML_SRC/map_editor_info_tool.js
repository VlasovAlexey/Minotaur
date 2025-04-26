
//add button for info tool
L.Control.Button2 = L.Control.extend({
    options: {
        position: 'topright'
    },
    onAdd: function (map) {
        var container = document.getElementsByClassName("leaflet-control-paintpolygon leaflet-bar leaflet-control")[0];
        var button = L.DomUtil.create('a', 'leaflet-control-info', container);
        L.DomEvent.disableClickPropagation(button);
        L.DomEvent.on(button, 'click', function(){
            show_hide_info();
        });
  
        //container.title = "Title";
  
        return container;
    },
    onRemove: function(map) {},
  });
  var control_info = new L.Control.Button2()
  control_info.addTo(map_editor);

  //show hide info for current map
  function show_hide_info(){

  }
  