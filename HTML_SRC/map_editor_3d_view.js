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
    getSizeFor3D();
    document.getElementsByClassName('draw_3d_window')[0].style.display = 'none';
  } else {
    getSizeFor3D();
    finish_line_map_editor();
    document.getElementsByClassName('draw_3d_window')[0].style.display = 'block';
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
  var scale_x = Math.round(1.0 * document.getElementsByClassName('map_editor')[0].offsetWidth);
  var scale_y = Math.round(1.0 * document.getElementsByClassName('map_editor')[0].offsetHeight);
  document.getElementsByClassName('draw_3d_window')[0].style.width = (scale_x.toString()) + "px";
  document.getElementsByClassName('draw_3d_window')[0].style.height = (scale_y.toString()) + "px";

  create3D_Lines(scale_x);
}
getSizeFor3D();
window.addEventListener("resize", getSizeFor3D);

function create3D_Lines(scale_x){
  var pointCount = 300;
  var i, r;
  var x = [];
  var y = [];
  var z = [];
  var c = [];
  for (i = 0; i < pointCount; i++) {
	  r = 10 * Math.cos(i / 10);
	  x.push(r * Math.cos(i*0.01));
	  y.push(r * Math.sin(i*0.01));
	  z.push(i);
	  //c.push(i);
  }

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

  layout = {
    //autosize: true,
    scene: {
      aspectmode: "manual",
      //aspectratio: {x: y_aspect, y: x_aspect, z: 0.3},
      //aspectmode: "cube",
      //aspectmode: "data",
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
	Plotly.newPlot("draw_3d_window", [{
		type: "scatter3d",
		//mode: "lines+markers",
		mode: "lines+markers",
		x: x,
		y: y,
		z: z,
		line: {
			width: 6,
			//color: ["rgb(255,0,0)","#ffff00","#00ff00"],
			//color_discrete_map: "identity",
			color: z,
			colorscale: "Minotaur_colored",
			cmin: color_min,
			cmax: color_max
		},
		marker: {
			size: 3,
			//color: ["rgb(255,0,0)","#ffff00","#00ff00"],
			//color_discrete_map: "identity",
			color: z,
			colorscale: "Minotaur_colored",
			cmin: color_min,
			cmax: color_max
		}
	}, ], layout, config);
}