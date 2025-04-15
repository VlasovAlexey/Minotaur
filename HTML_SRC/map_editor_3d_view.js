//Add custom path
var view_3d_status = 0;
var scale_x,scale_y

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
    //getSizeFor3D();
    document.getElementsByClassName('draw_3d_window')[0].style.display = 'none';
  } else {
    document.getElementsByClassName('draw_3d_window')[0].style.display = 'block';
    getSizeFor3D();
    //3d view tool is opened
  //Show progress bar
	setTimeout(function() {
    document.getElementById("Overlay_progress").style.height = "100%";
    document.getElementById("Overlay_progress").style.opacity = "1";
  }, 20);

	setTimeout(function() {
    create3D_Lines(scale_x); 
  //finish loading data to the map editor
  setTimeout(function() {
		document.getElementById("Overlay_progress").style.height = "0%";
		document.getElementById("Overlay_progress").style.opacity = "0";
	}, 200);
}, 200);
  }
}

L.window = L.Control.extend({
  options: {
      position: 'middlecenter'
  },
  onAdd: function (map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      
      //disable touch and zoom on window
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      //window class and id
      container.className = "draw_3d_window";
      container.id = "draw_3d_window";
      container.style = "z-index: -100 !important;";
      var table_1 = ''
      container.innerHTML = table_1;
      //container.title = "Title";
      return container;
  },
  onRemove: function(map) {},

});
var control = new L.window();
control.addTo(map_editor);

//create all interface element inside created window
document.getElementsByClassName('draw_3d_window')[0].style.display = 'none';

//watching leaflet map current size
function getSizeFor3D() {
  scale_x = Math.round(1.0 * document.getElementsByClassName('map_editor')[0].offsetWidth);
  scale_y = Math.round(1.0 * document.getElementsByClassName('map_editor')[0].offsetHeight);
  document.getElementsByClassName('draw_3d_window')[0].style.width = (scale_x.toString()) + "px";
  document.getElementsByClassName('draw_3d_window')[0].style.height = (scale_y.toString()) + "px";

}
//getSizeFor3D();
window.addEventListener("resize", getSizeFor3D);

function min_max_arr(array_z) {
	var tmp_arr = [];
	var min = array_z[0];
	var max = array_z[0];
	for (i = 0; i < array_z.length; i++) {
		if ( min > array_z[i]) {min = array_z[i];}
		if ( max < array_z[i]) {max = array_z[i];}
	}
	tmp_arr.push(min , max);
	return tmp_arr;
}

function plotly_3d_line(x,y,z,color_r){
  var fin_arr = [];
  
  //compute min/max value for color gradient
	var color_max = z[0] + 1;
	var color_min = z[0] - 1;

	for (i = 0; i < z.length; i++) {
		if(z[i] > color_max){
			color_max = z[i];
		}
		if(z[i] < color_min){
			color_min = z[i];
		}
	}

	if(Math.abs(color_max - z[0]) > Math.abs(z[0] - color_min)){
		color_min = z[0] - Math.abs(color_max - z[0]);
	} else {
		color_max = z[0] + Math.abs(z[0] - color_min);
	}

  fin_arr =
    {
      type: "scatter3d",
      mode: "lines+markers",
      x: x,
      y: y,
      z: z,
      line: {
        width: 6,
        //color: z,
        color: color_r,
        //colorscale: "Minotaur_colored",
        //cmin: color_min,
        //cmax: color_max
      },
      marker: {
        size: 3,
        //color: z,
        color: color_r,
        //colorscale: "Minotaur_colored",
        //cmin: color_min,
        //cmax: color_max
      }
    }
  return fin_arr;
}

//convert hex color to rgba
function hexToRgbA(hex){
  if(hex == "black"){hex = "#000"}
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
  }
  throw new Error('Bad Hex');
}

function create3D_Lines(scale_x){
  //collect all existing paths and markers
  var layers = new L.featureGroup();
  map_editor.eachLayer(function (layer) {
    if (layer instanceof L.Path) {
      layers.addLayer(layer);
    } else {
      if (layer instanceof L.Marker) {
        layers.addLayer(layer);
      }
    }
  });
  layers = layers.getLayers();
  //combining data to plotly
  var data_plotly = [];
  var color_r;
  //for aspect calculation
  var x_as = [];
  var y_as = [];
  //var z_as = [];
  for (var i = 0; i < layers.length; i++) {
    //found polygon
    
    if(layers[i]._latlngs != undefined){
      if(layers[i]._latlngs.length > 0){
        //console.log(layers[i]._latlngs)
        if(layers[i] instanceof L.Polygon && layers[i]._latlngs[0][0].lng != undefined){
          x = [];
          y = [];
          z = [];
          //console.log("Polygon");
          for (ll = 0; ll < layers[i]._latlngs[0].length; ll++) {
            x.push(layers[i]._latlngs[0][ll].lng);
            y.push(layers[i]._latlngs[0][ll].lat);
            z.push(0.0);
    
            x_as.push(layers[i]._latlngs[0][ll].lng);
            y_as.push(layers[i]._latlngs[0][ll].lat);
          };
          x.push(layers[i]._latlngs[0][0].lng);
          y.push(layers[i]._latlngs[0][0].lat);
          z.push(0.0);
    
          x_as.push(layers[i]._latlngs[0][0].lng);
          y_as.push(layers[i]._latlngs[0][0].lat);
          
          color_r = hexToRgbA(layers[i].options.color);
          data_plotly.push(plotly_3d_line(x,y,z,color_r));
        }
      }
    }
    
    //founded polyline
    if(layers[i]._latlngs != undefined){
      if(layers[i]._latlngs.length > 0){
        if(layers[i] instanceof L.Polyline && layers[i]._latlngs[0].lng != undefined){
          x = [];
          y = [];
          z = [];
          var dp = [];
          //console.log("Polyline");
          if(layers[i].options.depth_polyline != undefined){
            console.log(layers[i].options.depth_polyline);
            dp = (layers[i].options.depth_polyline).toString().split(",");
          }
          for (ll = 0; ll < layers[i]._latlngs.length; ll++) {
            x.push(layers[i]._latlngs[ll].lng);
            y.push(layers[i]._latlngs[ll].lat);
            if(layers[i].options.depth_polyline != undefined){
              z.push(parseFloat(-1.0 * dp[ll]));
            } else {
              z.push(0.0);
            }
    
            x_as.push(layers[i]._latlngs[ll].lng);
            y_as.push(layers[i]._latlngs[ll].lat);
            
          };
          color_r = hexToRgbA(layers[i].options.color);
          data_plotly.push(plotly_3d_line(x,y,z,color_r));
        }
      }
    }
  }
  
  //compute aspect for proper 3d lines proportions
	var x_tmp = min_max_arr(x_as);
	var y_tmp = min_max_arr(y_as);
	var x_aspect = 1.0;
	var y_aspect = 1.0;
	
	x_tmp = x_tmp[1] - x_tmp[0];
	y_tmp = y_tmp[1] - y_tmp[0];
	
	if ((x_tmp/y_tmp) > 1) {
		y_aspect = 1;
		x_aspect = ((y_tmp/x_tmp));
	}
	if ((x_tmp/y_tmp) < 1) {
		x_aspect = 1;
		y_aspect = ((x_tmp/y_tmp));
	}

  //build layout for 3d scene
  layout = {
    //autosize: true,
    scene: {
      aspectmode: "manual",
      aspectratio: {x: y_aspect, y: x_aspect, z: 0.2},
      bgcolor: "#ffffff",
      xaxis: {
        //mirror: "true",
        color: "#202020",
        spikecolor: "#ff0000",
        title: plan_lng("gps_lat"),
        autorange: "reversed",
        backgroundcolor: "#ebc5c1",
        gridcolor: "rgb(255, 255, 255)",
        showbackground: true,
        zerolinecolor: "rgb(0, 0, 0)"
      },
      yaxis: {
        //mirror: "true",
        color: "#202020",
        spikecolor: "#ff0000",
        title: plan_lng("gps_lon"),
        backgroundcolor: "#c1ebc4",
        gridcolor: "rgb(255, 255, 255)",
        showbackground: true,
        zerolinecolor: "rgb(0, 0, 0)"
      },
      zaxis: {
        color: "#202020",
        spikecolor: "#ff0000",
        title: plan_lng("gps_ele"),
        backgroundcolor: "#c1d4eb",
        gridcolor: "rgb(255, 255, 255)",
        showbackground: true,
        zerolinecolor: "rgb(0, 0, 0)"
      }
    },
    width: scale_x,
    showlegend: false,
    paper_bgcolor: "#ffffff",
    'margin': {
      'l': 0,
      'r': 0,
      't': 0,
      'b': 0
    }
  };
  var config = {
		displayModeBar: false // this is the line that hides the bar.
	};
	Plotly.newPlot("draw_3d_window", data_plotly, layout, config);
}