//add button for show\hide function
  L.Control.Button = L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function (map) {
        var container = document.getElementsByClassName("leaflet-bar leaflet-control")[0];
        var button = L.DomUtil.create('a', 'leaflet-control-show-hide-button', container);
        L.DomEvent.disableClickPropagation(button);
        L.DomEvent.on(button, 'click', function(){
            show_hide_elements();
        });
  
        //container.title = "Title";
  
        return container;
    },
    onRemove: function(map) {},
  });
  var control = new L.Control.Button()
  control.addTo(map_editor);

  var shide_status = 0;
  function show_hide_elements(){
    if(shide_status == 0){
        var labels = document.querySelectorAll('.leaflet-marker-icon.not-important-icon');
	    for (let i = 0; i < labels.length; i++) {
		    if(labels != undefined){
                labels[i].style.opacity = 0;
            }
	    }
        var labels = document.querySelectorAll('.leaflet-marker-icon.pm-text-marker');
	    for (let i = 0; i < labels.length; i++) {
		    if(labels != undefined){
                labels[i].style.opacity = 0;
            }
	    }
        
        //document.getElementsByClassName('leaflet-special')[0].style.display = "none";
        document.getElementsByClassName('leaflet-pm-custom')[0].style.display = "none";
        document.getElementsByClassName('leaflet-control-paintpolygon')[0].style.display = "none";

        shide_status = 1;
        return;
    }
    if(shide_status == 1){
        var labels = document.querySelectorAll('.leaflet-marker-icon.not-important-icon');
	    for (let i = 0; i < labels.length; i++) {
		    if(labels != undefined){
                labels[i].style.opacity = 0;
            }
	    }
        var labels = document.querySelectorAll('.leaflet-marker-icon.pm-text-marker');
	    for (let i = 0; i < labels.length; i++) {
		    if(labels != undefined){
                labels[i].style.opacity = 0;
            }
	    }
        document.getElementsByClassName('leaflet-pm-draw')[0].style.display = "none";
        document.getElementsByClassName('leaflet-pm-edit')[0].style.display = "none";
        document.getElementsByClassName('leaflet-control-better-scale')[0].style.display = "none";
        document.getElementsByClassName('leaflet-control-layers-toggle')[0].style.display = "none";

        shide_status = 2;
        return;
    }
    if(shide_status == 2){
        var labels = document.querySelectorAll('.leaflet-marker-icon.not-important-icon');
	    for (let i = 0; i < labels.length; i++) {
		    if(labels != undefined){
                labels[i].style.opacity = 1;
            }
	    }
        var labels = document.querySelectorAll('.leaflet-marker-icon.pm-text-marker');
	    for (let i = 0; i < labels.length; i++) {
		    if(labels != undefined){
                labels[i].style.opacity = 1;
            }
	    }
        
        shide_status = 3;
        return;
    }
    if(shide_status == 3){
        
        //document.getElementsByClassName('leaflet-special')[0].style.display = "block";
        document.getElementsByClassName('leaflet-pm-draw')[0].style.display = "block";
        document.getElementsByClassName('leaflet-pm-edit')[0].style.display = "block";
        document.getElementsByClassName('leaflet-pm-custom')[0].style.display = "block";
        document.getElementsByClassName('leaflet-control-paintpolygon')[0].style.display = "block";
        
        document.getElementsByClassName('leaflet-control-better-scale')[0].style.display = "block";
        document.getElementsByClassName('leaflet-control-layers-toggle')[0].style.display = "block";
        
        shide_status = 0;
        return;
    }
  }