var gpx_file = "";
document.querySelector("#gpx_file").addEventListener('change', function() {

	// files that user has chosen
	var all_files = this.files;
	if(all_files.length == 0) {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("gpx_no_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
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
		return;
	}

	// Max 2 MB allowed
	var max_size_allowed = 30*1024*1024
	if(file.size > max_size_allowed) {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("gpx_big_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
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
	    //var text = e.target.result;
        gpx_file = e.target.result;
		gpx_file_to_massive(e.target.result);
	});

	// file reading failed
	reader.addEventListener('error', function() {
	    alert('Error : Failed to read file');
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

//save final glued gpx file
function gpx_final_save(){
	if(gpx_file != ""){
		let str = gpx_file;
		let target1 = "<trkpt "; // searching begin
		let target2 = ">"; //end
		let pos = 0;
		let first_f = 0;
		let c_lat = 0;
		let c_lon = 0;
		let fPos1 = 0;
		let fPos2 = 0;
		let c_speed = 0;
		let c_time_freq = 0;
		let c_course_m = 0;

		while (true) {
  			let foundPos = str.indexOf(target1, pos);
  			if (foundPos == -1) break;
			let foundPos2 = str.indexOf(target2, foundPos + 1);
			
			let cut = str.slice(foundPos + 1,foundPos2);

			if(first_f == 0){
				first_f = 1;
				//find current lat
				fPos1 = cut.indexOf("lat=", 0);
				fPos2 = cut.indexOf("\"", fPos1 + 5);
				c_lat = parseFloat(cut.slice(fPos1 + 5 ,fPos2 - 1));
			
				//find current lon
				fPos1 = cut.indexOf("lon=", 0);
				fPos2 = cut.indexOf("\"", fPos1 + 5);
				c_lon = parseFloat(cut.slice(fPos1 + 5 ,fPos2 - 1));

				//find speed
				fPos1 = str.indexOf("<speed>", 0);
				fPos2 = str.indexOf("</speed>", fPos1 + 7);
				c_speed = parseFloat(str.slice(fPos1 + 7 ,fPos2));

				//find freq
				fPos1 = str.indexOf("<freq>", 0);
				fPos2 = str.indexOf("</freq>", fPos1 + 6);
				c_time_freq = parseFloat(str.slice(fPos1 + 6 ,fPos2));

				//console.log(c_lat,c_lon,c_speed,c_time_freq);
			}
			else{
				//find course
				fPos1 = str.indexOf("<course>", foundPos2 + 1);
				fPos2 = str.indexOf("</course>", fPos1 + 8);
				c_course_m = parseFloat(str.slice(fPos1 + 8 ,fPos2));
				//console.log(c_course_m);

				//destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lat

				//insert new coordinates
				c_lat_wrt = destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lat;
				c_lon_wrt = destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lon;

				str = str.replace(str.slice(foundPos,foundPos2 + 1),"<trkpt lat=\""+ c_lat_wrt + "\" lon=\""+ c_lon_wrt + "\">");
				//str = str.replace(str.slice(foundPos + 1,foundPos2),"<trkpt lat=\"" + destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lat + "\" lon=\"" + destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lon + "\"");

				//update old position with new calculated position
				c_lat = destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lat;
				c_lon = destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lon;
			}
  			pos = foundPos + 1; // continued search from next one position
		}
		//and write file
        var blob = new Blob([str], {type: "application/gpx;charset=utf-8"});
        saveAs(blob, "res.gpx");
		//console.log(str);
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
	c.push(i)
}
var layout = 0;
//crappy code for centering graph
var width_calc = (window.innerWidth/100*(88+((window.innerWidth-500)/650)));

function gps_chart() {
	//class="plot-container plotly"
	//id="trackChart"
	
	create_html_text("trackChart","trackChart_opt","");
	//color dark
	if(document.getElementById("tn_color").value == 1){
		layout = {
			scene: {
				aspectmode: "auto",
				bgcolor: "#2b2b2c",
				xaxis: {
					color: "#929292",
					spikecolor: "#000000",
					title: plan_lng("gps_lat"),
					backgroundcolor: "#3c4e3d",
					gridcolor: "rgb(100, 100, 100)",
					showbackground: true,
					zerolinecolor: "rgb(255, 255, 255)"
				},
				yaxis: {
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
			autosize: false,
			scene: {
				aspectmode: "auto",
				bgcolor: "#ffffff",
				xaxis: {
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
			color: "#993300",
			colorscale: "Hot",
			cmin: -(x.length/5),
			cmax: x.length
		},
		marker: {
			size: 3.5,
			color: c,
			colorscale: "Hot",
			cmin: -(x.length/5),
			cmax: x.length
		}
	}, ], layout, config);
	
}

gps_chart();