var gpx_file = "";
document.querySelector("#gpx_file").addEventListener('change', function() {
	// files that user has chosen
	var all_files = this.files;
	if(all_files.length == 0) {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("gpx_no_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
		Pbar_Hide();
		return;
	}

	// first file selected by user
	var file = all_files[0];

	// files types allowed
	var allowed_name = "";
  
  allowed_name = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);
	if(allowed_name != "gpx") {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("gpx_bad_ext_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
		Pbar_Hide();
		return;
	}

	// Max 30 MB allowed
	var max_size_allowed = 30*1024*1024
	if(file.size > max_size_allowed) {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("gpx_big_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
		Pbar_Hide();
		return;
	}

	// file validation is successfull
	// we will now read the file

	var reader = new FileReader();

	// file reading started
	reader.addEventListener('loadstart', function() {
	    //document.querySelector("#file-input-label").style.display = 'none'; 
	});

	// file reading finished successfully
	reader.addEventListener('load', function(e) {
		//Show progress bar
		Pbar_Show();
		setTimeout(function() {
			gpx_file = [];
			arr = [];
        	gpx_file = e.target.result;
			gpx_file_to_massive(e.target.result);
			arr = gpx_file_to_arr(gpx_file);

			//optimize loaded gpx track
			result = opt3D_Line(arr , 0.000001);

			//clear previous data
			//send to 3d view new recorded track
			x = [];
			y = [];
			z = [];
			c = [];
			for (i = 0; i < result.length; i++) {
				x.push((result[i].y));
				y.push((result[i].x));
				z.push((result[i].z));
				c.push(i);
			}

			//draw new 3d chart with new data
			del_html_elem("trackChart_opt");
			gps_chart();

			//send loaded data to map rotator
			first_start_app = 3;
			
			//prepare data
			var tree_size_arr = [];
			var z_tmp = [];
    		for (i = 0; i < arr.length; i++) {
        		tree_size_arr.push([arr[i].x,arr[i].y,arr[i].z]);
    		}
			for (i = 0; i < arr.length; i++) {
        		z_tmp.push(arr[i].z);
    		}
			//compute min/max value for color gradient
			var color_max = z_tmp[0] + 1;
			var color_min = z_tmp[0] - 1;

			for (i = 0; i < z_tmp.length; i++) {
				if(z_tmp[i] > color_max){
					color_max = z_tmp[i];
				}
				if(z_tmp[i] < color_min){
					color_min = z_tmp[i];
				}
			}

			if(Math.abs(color_max - z_tmp[0]) > Math.abs(z_tmp[0] - color_min)){
				color_min = z_tmp[0] - Math.abs(color_max - z_tmp[0]);
			} else {
				color_max = z_tmp[0] + Math.abs(z_tmp[0] - color_min);
			}

			//push to map picker
			path_gray_picker = L.polyline(tree_size_arr, {
				weight: 10,
				color: "gray",
			}).addTo(map_picker);

			//push to map rotator
			path_gray = L.hotline(tree_size_arr, {
				min: color_min,
				max: color_max,
				palette: {
					0.0: '#000000',
					0.25: '#3b3b3b',
					0.5: '#808080',
					0.75: '#a9a9a9',
					1.0: '#cdcdcd'
				},
				weight: 10,
				outlineColor: '#eeeeee',
				outlineWidth: 0,
				smoothFactor: factor_scale
			}).addTo(map);

			//Hide progress bar
			Pbar_Hide();
		}, 1000);
		$("#gpx_file")[0].value = "";
	});


	// file reading failed
	reader.addEventListener('error', function() {
	    del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("gpx_bad_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
        Pbar_Hide();
	});

	// file read progress 
    /*
	reader.addEventListener('progress', function(e) {
	    if(e.lengthComputable == true) {
	    	document.querySelector("#file-progress-percent").innerHTML = Math.floor((e.loaded/e.total)*100);
	    	document.querySelector("#file-progress-percent").style.display = 'block';
	    }
	});
    */
	// read as text file
	reader.readAsText(file);
});

//save current track from rout builder
function gpx_save_current_track(){
	var arr =[];
	for (i = 0; i < x.length; i++) {
		arr.push({
			x: y[i],
			y: x[i],
			z: z[i],
		});
	}
	arr = arr_to_gpx(arr);
	//and write file marked as EDITED
	var fl_name = "EDITED_" + (track_name.value).toString() + "_" + get_date_hr() + ".gpx";
	GPX_file_num = GPX_file_num + 1;
	var blob = new Blob([arr], {
		type: "application/gpx;charset=utf-8"
	});
	saveAs(blob, fl_name);
	
	//Android save from WebView
	generateAndDownload(arr, fl_name, "application/gpx;charset=utf-8");
}

//convert loaded gpx text to array
function gpx_file_to_arr(gpx_file){
	if(gpx_file != ""){
		let str = gpx_file;
		var arr = [];
		let target1 = "<trkpt "; // searching begin
		let target2 = "</trkpt>"; //end
		let pos = 0.0;
		let c_ele = 0.0;
		let c_lat = 0.0;
		let c_lon = 0.0;
		let fPos1 = 0.0;
		let fPos2 = 0.0;
		let c_speed = 0.0;
		let c_time_freq = 0.0;
		let c_course_m = 0.0;
		let c_orient_a = 0.0;
		let c_orient_b = 0.0;
		let c_orient_g = 0.0;

		numerator = 0;
		while (true) {
  			let foundPos = str.indexOf(target1, pos);
  			if (foundPos == -1) break;
			let foundPos2 = str.indexOf(target2, foundPos + 1);
			
			let cut = str.slice(foundPos + 1,foundPos2);

			
				//find current lat
				fPos1 = cut.indexOf("lat=", 0);
				fPos2 = cut.indexOf("\"", fPos1 + 5);
				c_lat = ((cut.slice(fPos1 + 5 ,fPos2 - 1))*1.0);
			
				//find current lon
				fPos1 = cut.indexOf("lon=", 0);
				fPos2 = cut.indexOf("\"", fPos1 + 5);
				c_lon = ((cut.slice(fPos1 + 5 ,fPos2 - 1))*1.0);

				//find elevation
				c_ele = cut;
				fPos1 = c_ele.indexOf("<ele>", 0);
				fPos2 = c_ele.indexOf("</ele>", fPos1 + 5);
				c_ele = ((c_ele.slice(fPos1 + 5 ,fPos2)*1.0));
				
				//find course
				c_course_m = cut;
				fPos1 = c_course_m.indexOf("<course>", 0);
				fPos2 = c_course_m.indexOf("</course>", fPos1 + 8);
				c_course_m = ((c_course_m.slice(fPos1 + 8 ,fPos2)*1.0));

				//find orient a
				c_orient_a = cut;
				fPos1 = c_orient_a.indexOf("<orient_a>", 0);
				fPos2 = c_orient_a.indexOf("</orient_a>", fPos1 + 10);
				c_orient_a = ((c_orient_a.slice(fPos1 + 10 ,fPos2)*1.0));

				//find orient b
				c_orient_b = cut;
				fPos1 = c_orient_b.indexOf("<orient_b>", 0);
				fPos2 = c_orient_b.indexOf("</orient_b>", fPos1 + 10);
				c_orient_b = ((c_orient_b.slice(fPos1 + 10 ,fPos2)*1.0));

				//find orient g
				c_orient_g = cut;
				fPos1 = c_orient_g.indexOf("<orient_g>", 0);
				fPos2 = c_orient_g.indexOf("</orient_g>", fPos1 + 10);
				c_orient_g = ((c_orient_g.slice(fPos1 + 10 ,fPos2)*1.0));

				//find speed
				fPos1 = str.indexOf("<speed>", 0);
				fPos2 = str.indexOf("</speed>", fPos1 + 7);
				c_speed = ((str.slice(fPos1 + 7 ,fPos2))*1.0);

				//find freq
				fPos1 = str.indexOf("<freq>", 0);
				fPos2 = str.indexOf("</freq>", fPos1 + 6);
				c_time_freq = ((str.slice(fPos1 + 6 ,fPos2))*1.0);
			
  			pos = foundPos + 1; // continued search from next one position
			numerator = numerator + 1;
			arr.push({
				x: c_lat,
				y: c_lon,
				z: c_ele,
				course: c_course_m,
				a: c_orient_a,
				b: c_orient_b,
				g: c_orient_g,
				speed: c_speed,
				time_frequency: c_time_freq
			});
		}
		return arr;
	}
}

//draw gps tracks chart
//del_html_elem("trackChart");
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

//optimize 3d line before draw on screen
function opt3D_Line(arr, optFactor){
	
	//optimize by simplify function
	return simplify(arr , optFactor , true);
}

var layout = 0;
//crappy code for centering graph
var width_calc = (window.innerWidth/100*(88+((window.innerWidth-500)/650)));



function gps_chart() {
	//compute aspect for proper 3d lines proportions
	var x_tmp = min_max_arr(x);
	var y_tmp = min_max_arr(y);
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

	//console.log(x_tmp,y_tmp);
	create_html_text("trackChart","trackChart_opt","");
	//color dark
	if(document.getElementById("tn_color").value == 1){
		layout = {
			//autosize: true,
			scene: {
				aspectmode: "manual",
				aspectratio: {x: y_aspect, y: x_aspect, z: 0.2},
				//aspectmode: "data",
				bgcolor: "#2b2b2c",
				xaxis: {
					//mirror: "true",
					color: "#929292",
					spikecolor: "#000000",
					title: plan_lng("gps_lat"),
					backgroundcolor: "#3c4e3d",
					gridcolor: "rgb(100, 100, 100)",
					showbackground: true,
					zerolinecolor: "rgb(255, 255, 255)"
				},
				yaxis: {
					//mirror: "true",
					color: "#929292",
					spikecolor: "#000000",
					title: plan_lng("gps_lon"),
					backgroundcolor: "#4e3e3c",
					gridcolor: "rgb(100, 100, 100)",
					showbackground: true,
					zerolinecolor: "rgb(255, 255, 255)"
				},
				zaxis: {
					color: "#929292",
					spikecolor: "#000000",
					title: plan_lng("gps_ele"),
					backgroundcolor: "#3c444e",
					gridcolor: "rgb(100, 100, 100)",
					showbackground: true,
					zerolinecolor: "rgb(255, 255, 255)"
				}
			},
			width: width_calc,
			showlegend: false,
			paper_bgcolor: "#2b2b2c",
			'margin': {
				'l': 0,
				'r': 0,
				't': 0,
				'b': 0
			}
		};	
	}
	//color light
	if(document.getElementById("tn_color").value == 2){
		layout = {
			//autosize: true,
			scene: {
				aspectmode: "manual",
				aspectratio: {x: y_aspect, y: x_aspect, z: 0.3},
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
			width: width_calc,
			showlegend: false,
			paper_bgcolor: "#ffffff",
			'margin': {
				'l': 0,
				'r': 0,
				't': 0,
				'b': 0
			}
		};	
	}
	//height: 1000,
	var config = {
		displayModeBar: false // this is the line that hides the bar.
	};
	Plotly.newPlot("trackChart_opt", [{
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
gps_chart();

function getSquareDistance(p1, p2) { // square distance between 2 points

	var dx = p1.x - p2.x,
		dz = p1.z - p2.z,
		dy = p1.y - p2.y;
  
	return dx * dx +
		   dz * dz +
		   dy * dy;
  }
  
  function getSquareSegmentDistance(p, p1, p2) { // square distance from a point to a segment
  
	var x = p1.x,
		y = p1.y,
		z = p1.z,
  
		dx = p2.x - x,
		dy = p2.y - y,
		dz = p2.z - z,
  
		t;
  
	if (dx !== 0 || dy !== 0) {
  
	  t = ((p.x - x) * dx +
		   (p.z - z) * dz +
		   (p.y - y) * dy) /
			  (dx * dx +
			   dz * dz +
			   dy * dy);
  
	  if (t > 1) {
		x = p2.x;
		y = p2.y;
		z = p2.z;
  
	  } else if (t > 0) {
		x += dx * t;
		y += dy * t;
		z += dz * t;
	  }
	}
  
	dx = p.x - x;
	dy = p.y - y;
	dz = p.z - z;
  
	return dx * dx +
		   dz * dz +
		   dy * dy;
  }
  
  
	  // distance-based simplification
	function simplifyRadialDistance(points, sqTolerance) {
  
	  var i,
		  len = points.length,
		  point,
		  prevPoint = points[0],
		  newPoints = [prevPoint];
  
	  for (i = 1; i < len; i++) {
		point = points[i];
  
		if (getSquareDistance(point, prevPoint) > sqTolerance) {
		  newPoints.push(point);
		  prevPoint = point;
		}
	  }
  
	  if (prevPoint !== point) {
		newPoints.push(point);
	  }
  
	  return newPoints;
	}
  
  
	// simplification using optimized Douglas-Peucker algorithm with recursion elimination
  
	function simplifyDouglasPeucker(points, sqTolerance) {
  
	  var len = points.length,
  
		  MarkerArray = (typeof Uint8Array !== undefined + '')
					  ? Uint8Array
					  : Array,
  
		  markers = new MarkerArray(len),
  
		  first = 0,
		  last  = len - 1,
  
		  i,
		  maxSqDist,
		  sqDist,
		  index,
  
		  firstStack = [],
		  lastStack  = [],
  
		  newPoints  = [];
  
	  markers[first] = markers[last] = 1;
  
	  while (last) {
  
		maxSqDist = 0;
  
		for (i = first + 1; i < last; i++) {
		  sqDist = getSquareSegmentDistance(points[i], points[first], points[last]);
  
		  if (sqDist > maxSqDist) {
			index = i;
			maxSqDist = sqDist;
		  }
		}
  
		if (maxSqDist > sqTolerance) {
		  markers[index] = 1;
  
		  firstStack.push(first);
		  lastStack.push(index);
  
		  firstStack.push(index);
		  lastStack.push(last);
		}
  
		first = firstStack.pop();
		last = lastStack.pop();
	  }
  
	  for (i = 0; i < len; i++) {
		if (markers[i]) {
		  newPoints.push(points[i]);
		}
	  }
  
	  return newPoints;
	}
  
  
	function simplify(points, tolerance, highestQuality) {
  
	  var sqTolerance = (tolerance !== undefined)
					  ? tolerance * tolerance
					  : 1;
  
	  if (!highestQuality) {
		points = simplifyRadialDistance(points, sqTolerance);
	  }
	  points = simplifyDouglasPeucker(points, sqTolerance);
  
	  return points;
	};

	