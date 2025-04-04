//Recording button start here
element_id_hide("rec_blinking");
element_id_hide("rec_blinking_map_rotator");

var GPX_File = "";
var GPX_file_num = 1;
var lat_start = "0.0";
var lon_start = "0.0";
var ele_start = "0.0";

var lat_reg = "0.0";
var lon_reg = "0.0";

var ele_reg = "0.0";
var ele_reg_const = 0;
var speed_reg = document.getElementById("const_spd_opt").value;
speed_reg = (speed_reg.replace(",", "."));

var course_reg = "0.0";
course_reg = wmm_correction(course_reg);

var lat_end = "0.0";
var lon_end = "0.0";
var ele_end = "0.0";

var meas_tick = 0;
var rec_first_start = 0;

var t_time = 0;
var t_time_interval;

var distance_map = 0;
var speed_map = 0;
var speed_map_arr = [];
var g84 = geodesic.Geodesic.WGS84;

var first_start_app = 1;

//track only display time on gui
function start_t_time(){
    t_time_interval = setInterval(()=>{
        t_time = t_time + 1;
    }, (1000));
}
function stop_t_time(){
	clearInterval(t_time_interval);
	t_time = 0;
}



function btn_record() {
	if (record_state == 0) {
		//move map rotator to fullscreen
		meas_state = 0;
		btn_meas_click();
		first_start_app = 0;

		//map rotator clear tracks and try create first point
		if (lat_reg != "0.0" && lon_reg != "0.0"){
			if($("#data_format_opt").val() * 1.0 == 1){
				//gps track and sensors on
				c_lat = lat_reg * 1.0;
				c_lon = lon_reg * 1.0;
				route_map_disp = [[lat_reg * 1.0 , lon_reg * 1.0]];

				//start min\max value for line coloring for map rotator
				ele_line_min = ele_reg - 10;
				ele_line_max = ele_reg + 10;
			} else {
				//constant speed track and sensors on
				c_lat = document.getElementById("default_lat_opt").value;
				c_lat = (c_lat.replace(",", ".")) * 1.0;

				c_lon = document.getElementById("default_lon_opt").value;
				c_lon = (c_lon.replace(",", ".")) * 1.0;
				route_map_disp = [[c_lat, c_lon]];
				ele_reg_const = parseFloat((document.getElementById("default_ele_opt").value).replace(",", "."));
				
				//start min\max value for line coloring for map rotator
				ele_line_min = ele_reg_const - 10;
				ele_line_max = ele_reg_const + 10;
			}
		} else {
			//bad news - sensor data or internet not available and get start value from default for all track modes
			c_lat = document.getElementById("default_lat_opt").value;
			c_lat = (c_lat.replace(",", ".")) * 1.0;

			c_lon = document.getElementById("default_lon_opt").value;
			c_lon = (c_lon.replace(",", ".")) * 1.0;
			route_map_disp = [[c_lat, c_lon]];

			ele_reg_const = parseFloat((document.getElementById("default_ele_opt").value).replace(",", "."));
			
			//start min\max value for line coloring for map rotator
			ele_line_min = ele_reg_const - 10;
			ele_line_max = ele_reg_const + 10;
		}
		

		document.getElementById("btn_rec").style.background = "url(rec_press.svg) no-repeat center center";
		document.getElementById("btn_rec").style.border = "6px solid #fe2b2c";
		element_id_show("rec_blinking");
		element_id_show("rec_blinking_map_rotator");
		element_id_hide("main_parameters");
		element_id_hide("data_format");
		element_id_hide("tn_btn_restore");
		
		record_state = 1;
		
		//start time track display for gui
		start_t_time();

		//reset previous distance and speed if exist
		distance_map = 0;
		speed_map = 0;
		
		//clear once map path on realtime
		route_map_disp = [];
		
		//start path watcher for map rotator
		start_draw_path();

		//start sensor watchers for path writing
		geolocation_pos_watcher();
	} else {
		
		document.getElementById("btn_rec").style.background = "url(rec_main.svg) no-repeat center center";
		document.getElementById("btn_rec").style.border = "6px solid #969696";
		element_id_hide("rec_blinking");
		element_id_hide("rec_blinking_map_rotator");
		element_id_show("main_parameters");
		element_id_show("data_format");
		element_id_show("tn_btn_restore");
		record_state = 0;
		rec_first_start = 0;

		GPX_File = arr_to_gpx(route_map_disp);

		//and write file
		scr_n_add = "";
		if (GPX_file_num < 10 ) {
			scr_n_add = "0";
		}
		var fl_name = scr_n_add + GPX_file_num + "_" + (track_name.value).toString() + "_" + get_date_hr() + ".gpx";
		GPX_file_num = GPX_file_num + 1;
		var blob = new Blob([GPX_File], {
			type: "application/gpx;charset=utf-8"
		});
		saveAs(blob, fl_name);
		stop_t_time();
		GPX_File = [];

		//send to 3d view new recorded track
		result = opt3D_Line(route_map_disp , 0.0000001);

		//clear previous data
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

		//draw middle speed value after all
		speed_map = 0;
		for (i = 1; i < route_map_disp.length-1; i++) {
			lat_1 = route_map_disp[i-1].x;
			lon_1 = route_map_disp[i-1].y;
			lat_2 = route_map_disp[i].x;
			lon_2 = route_map_disp[i].y;
			g84inv = g84.Inverse(lat_1, lon_1, lat_2, lon_2);
			
			var rec_vls = document.getElementById("rec_freq_opt").value;
			if($("#data_format_opt").val() * 1.0 == 1){
        		//regular GPS track
        		rec_vls = 1;
    		}
			speed_map = speed_map + ((1 / rec_vls) * g84inv.s12);
		}
		speed_map = (speed_map/(route_map_disp.length - 1)) * 3600 / 1000;
		
	}
}

//Measure button start here
document.getElementById("btn_meas").style.background = "url(meas_main.svg) no-repeat center center";
document.getElementById("btn_meas").style.border = "6px solid #969696";

element_id_hide("map_hide");

function btn_meas_click() {
	//move all GUI to up every time if used full screen map rotator
	//this keep record button position on one place
	document.getElementById("8-header").click();
	document.getElementById("4-header").click();

	meas_tick = meas_tick + 1;
	if (meas_state == 0) {
		document.getElementById("btn_rec_fullscreen").className = "map_button_rec_fullscreen";
		
		document.getElementById("btn_meas").style.background = "url(meas_press.svg) no-repeat center center";
		document.getElementById("btn_meas").style.border = "6px solid #188958";
		meas_state = 1;

		element_id_show("map_hide");
		element_id_hide("gps_base");
		element_id_hide("dialContainer");
		element_id_hide("info_glob");
		element_id_hide("compas_head_box");
		element_id_hide("map_editor");

	} else {
		document.getElementById("btn_rec_fullscreen").className = "map_button_rec_hided";

		document.getElementById("btn_meas").style.background = "url(meas_main.svg) no-repeat center center";
		document.getElementById("btn_meas").style.border = "6px solid #969696";
		meas_state = 0;
		
		element_id_hide("map_hide");
		element_id_show("gps_base");
		element_id_show("dialContainer");
		element_id_show("info_glob");
		element_id_show("compas_head_box");
		element_id_show("map_editor");
	}
}

// The date of the last geolocation update.
var lastUpdate = new Date();
var orient_a = 0;
var orient_b = 0;
var orient_bt = 0;
var orient_g = 0;

function geolocation_pos_watcher() {	
	//display geolocation warning usage
	window.addEventListener("load", () => {
		if (!navigator.geolocation) {
			updateError({
				code: NONAVIGATION
			});
			return;
		}

		window.addEventListener("deviceorientation", event => {
			orient_a = Math.round(event.alpha);
			orient_b = Math.round(event.beta);
			orient_g = Math.round(event.gamma);
		});

		//acceleration 
		window.addEventListener("devicemotion", event => {
			accel_x = parseFloat(event.acceleration.x).toFixed(3);
			accel_y = parseFloat(event.acceleration.y).toFixed(3);
			accel_z = parseFloat(event.acceleration.z).toFixed(3);
			rot_rate_a = parseFloat(event.rotationRate.alpha).toFixed(3);
			rot_rate_b = parseFloat(event.rotationRate.beta).toFixed(3);
			rot_rate_g = parseFloat(event.rotationRate.gamma).toFixed(3);
		});
		navigator.geolocation.watchPosition(g => {
			//document.getElementById("btn_nav").style.background = "url(nav_ok.svg) no-repeat left center";
			lastUpdate = new Date();
			errorHidden();
			updateTime();
			updateGeo(g.coords);
		}, updateError, {
			enableHighAccuracy: true,
		});
		window.setInterval(updateTime, 1);
	}, {
		//once: true,
	});
}

//important request for interface geolocation here!
if(url_arr.indexOf("?:mtr") != -1){
} else {
	geolocation_pos_watcher();
}

//acceleration watch sensor write info to arr
var accel_arr = [];

var accel_x = 0;
var accel_y = 0;
var accel_z = 0;

var rot_rate_a = 0;
var rot_rate_b = 0;
var rot_rate_g = 0;

function AccelWatch(){
	if (record_state == 1) {
		//errors handler
		if (accel_x == null || accel_x == undefined || isNaN(accel_x) == true) {
			accel_x = "0.0";
		}
		if (accel_y == null || accel_y == undefined || isNaN(accel_y) == true) {
			accel_y = "0.0";
		}
		if (accel_z == null || accel_z == undefined || isNaN(accel_z) == true) {
			accel_z = "0.0";
		}
		if (rot_rate_a == null || rot_rate_a == undefined || isNaN(rot_rate_a) == true) {
			rot_rate_a = "0.0";
		}
		if (rot_rate_b == null || rot_rate_b == undefined || isNaN(rot_rate_b) == true) {
			rot_rate_b = "0.0";
		}
		if (rot_rate_g == null || rot_rate_g == undefined|| isNaN(rot_rate_g) == true) {
			rot_rate_g = "0.0";
		}
	
		accel_arr = accel_arr + "      <a_x>" + accel_x + "</a_x>\n";
		accel_arr = accel_arr + "      <a_y>" + accel_y + "</a_y>\n";
		accel_arr = accel_arr + "      <a_z>" + accel_z + "</a_z>\n";

		accel_arr = accel_arr + "      <rr_a>" + rot_rate_a + "</rr_a>\n";
		accel_arr = accel_arr + "      <rr_b>" + rot_rate_b + "</rr_b>\n";
		accel_arr = accel_arr + "      <rr_g>" + rot_rate_g + "</rr_g>\n";

	}
	else{
		accel_arr = [];
	}
}

//global watch function for all global values in one place
function GlobalWatch() {
	//recording and we need add every interval data to file
	if (record_state == 1) {

		//errors handler
		if (lat_reg == null || lat_reg == undefined || isNaN(lat_reg) == true) {
			lat_reg = "0.0";
		}
		if (lon_reg == null || lon_reg == undefined || isNaN(lon_reg) == true) {
			lon_reg = "0.0";
		}
		if (ele_reg == null || ele_reg == undefined  || isNaN(ele_reg) == true) {
			ele_reg = "0.0";
		}

		if (acHeading == null || acHeading == undefined  || isNaN(acHeading) == true) {
			acHeading = "0.0";
		} else {
			course_reg = acHeading;
		}

		//write to file
		if($("#data_format_opt").val() * 1.0 == 1){
            //Regular GPS Tracking
			if(document.getElementById("accel_use_opt").value == 1){
				route_map_disp.push({
					x: lat_reg,
					y: lon_reg,
					z: ele_reg,
					course: course_reg,
					a: orient_a,
					b: orient_b,
					g: orient_g,
					meas: meas_tick,
					accel: accel_arr
				});
			} else {
				route_map_disp.push({
					x: lat_reg,
					y: lon_reg,
					z: ele_reg,
					course: course_reg,
					a: orient_a,
					b: orient_b,
					g: orient_g,
					meas: meas_tick,
					accel: ""
				});
			}
        } else {
            //all others modes with Constant Speed e.g.
            c_time_freq = document.getElementById("rec_freq_opt").value;
            c_speed = document.getElementById("const_spd_opt").value;
            c_speed = (c_speed.replace(",", ".")) * 1.0;
            
			//check device orientation about beta angle
			if (orient_b >= 0) {
				orient_bt = orient_b;
				if (orient_b > 89){orient_bt = 89;}
			} else {
				orient_bt = orient_b;
				if (orient_b < -89){orient_bt = -89;}
			}

			//make new altitude calculation
			if (orient_bt >= 0) {
				ele_reg_const = ele_reg_const + (Math.sin((Math.PI * Math.abs(orient_bt)) / 180) * (c_time_freq * c_speed));
			} else {
				ele_reg_const = ele_reg_const - (Math.sin((Math.PI * Math.abs(orient_bt)) / 180) * (c_time_freq * c_speed));
			}
            c_lat_new = destinationPoint(c_lat, c_lon, (Math.cos((Math.PI * Math.abs(orient_bt)) / 180) * (c_time_freq * c_speed)) , acHeading * 1.0).lat;
			c_lon_new = destinationPoint(c_lat, c_lon, (Math.cos((Math.PI * Math.abs(orient_bt)) / 180) * (c_time_freq * c_speed)) , acHeading * 1.0).lon;
			c_lat = c_lat_new;
            c_lon = c_lon_new;

			if(document.getElementById("accel_use_opt").value == 1){
				//route_map_disp.push([c_lat,c_lon,ele_reg_const,course_reg,orient_a,orient_b,orient_g,meas_tick,accel_arr]);
				route_map_disp.push({
					x: c_lat,
					y: c_lon,
					z: ele_reg_const,
					course: course_reg,
					a: orient_a,
					b: orient_b,
					g: orient_g,
					meas: meas_tick,
					accel: accel_arr
				});
			} else {
				//route_map_disp.push([c_lat,c_lon,ele_reg_const,course_reg,orient_a,orient_b,orient_g,meas_tick,""]);
				route_map_disp.push({
					x: c_lat,
					y: c_lon,
					z: ele_reg_const,
					course: course_reg,
					a: orient_a,
					b: orient_b,
					g: orient_g,
					meas: meas_tick,
					accel: ""
				});
			}
        }
		accel_arr = [];
		meas_tick = 0;
		if (rec_first_start == 0) {
			if($("#data_format_opt").val() * 1.0 == 1){
				//regular GPS
				lat_start = lat_reg;
				lon_start = lon_reg;
				ele_start = ele_reg;
			} else {
				//constant speed DPV
				lat_start = c_lat;
				lon_start = c_lon;
				ele_start = ele_reg_const;
			}

			rec_first_start = 1;
		} else {
			if($("#data_format_opt").val() * 1.0 == 1){
				//regular GPS
				lat_end = lat_reg;
				lon_end = lon_reg;
				ele_end = ele_reg;
			} else {
				//constant speed DPV
				lat_end = c_lat;
				lon_end = c_lon;
				ele_end = ele_reg_const;
			}
		}
		
		//if($("#data_format_opt").val() * 1.0 == 1){
            //Regular GPS Tracking need get bigger distances between points
			if(route_map_disp.length > 20){
				var arr_size = route_map_disp.length - 1;
				var lat_1 = route_map_disp[arr_size - 1].x;
				var lon_1 = route_map_disp[arr_size - 1].y;
				var lat_2 = route_map_disp[arr_size].x;
				var lon_2 = route_map_disp[arr_size].y;
				// Do the classic `geodesic inversion` computation
				g84inv = g84.Inverse(lat_1, lon_1, lat_2, lon_2);
				distance_map = distance_map + g84inv.s12;
				
				//compute highly approximated speed
				speed_map = 0;
				for (i = route_map_disp.length - 20; i < route_map_disp.length - 1; i++) {
					lat_1 = route_map_disp[i-1].x;
					lon_1 = route_map_disp[i-1].y;
					lat_2 = route_map_disp[i].x;
					lon_2 = route_map_disp[i].y;
					g84inv = g84.Inverse(lat_1, lon_1, lat_2, lon_2);
					var rec_vls = document.getElementById("rec_freq_opt").value;
					if($("#data_format_opt").val() * 1.0 == 1){
        				//regular GPS track
        				rec_vls = 1;
    				}
					speed_map = (speed_map + ((1 / rec_vls) * g84inv.s12));
					//speed_map = speed_map.toFixed(6) * 1.0;
				}
				//display in kilometers per hour
				speed_map = (speed_map/19) * 3600 / 1000;
			}
		
		//error handler
		if (lat_start == null || lat_start == undefined) {
			lat_start = "0.0"
		};
		if (lat_end == null || lat_end == undefined) {
			lat_end = "0.0"
		};

		if (lon_start == null || lon_start == undefined) {
			lon_start = "0.0"
		};
		if (lon_end == null || lon_end == undefined) {
			lon_end = "0.0"
		};

		if (ele_start == null || ele_start == undefined) {
			ele_start = "0.0"
		};
		if (ele_end == null || ele_end == undefined) {
			ele_end = "0.0"
		};
	}
}

// Update all the element in DOM with the new geolocation information in a GeolocationCoordinates object 
function updateGeo(c) {
	[
		"accuracy",
		"altitude",
		"altitudeAccuracy",
		"latitude",
		"longitude",
		"speed",
	].forEach(p => {
		
	});

	lat_reg = c.latitude;
	lon_reg = c.longitude;
	ele_reg = c.altitude;
}

const Second = 1000;
const Minute = 60 * Second;
const NONAVIGATION = -1; // a non-standard error code
const PERMISSION_DENIED = 1;
const POSITION_UNAVAILABLE = 2;
const TIMEOUT = 3;

// Hidden all error paragraph.
function errorHidden() {
	[
		"error-NONAVIGATION",
		"error-PERMISSION_DENIED",
		"error-POSITION_UNAVAILABLE",
		"error-TIMEOUT",
		"error-OTHER",
	].forEach(e => document.getElementById(e).hidden = true);

}

// Take a GeolocationPositionError object and display the error with the
// good paragraph.
function updateError(err) {
	errorHidden();
	let t;
	switch (err.code) {
		case NONAVIGATION:
			t = "NONAVIGATION";
			document.getElementById("btn_gps").style.background = "url(gps_no.svg) no-repeat left center";
			break;
		case PERMISSION_DENIED:
			t = "PERMISSION_DENIED";
			document.getElementById("btn_gps").style.background = "url(gps_no.svg) no-repeat left center";
			break;
		case POSITION_UNAVAILABLE:
			t = "POSITION_UNAVAILABLE";
			document.getElementById("btn_gps").style.background = "url(gps_no.svg) no-repeat left center";
			break;
		case TIMEOUT:
			t = "TIMEOUT";
			document.getElementById("btn_gps").style.background = "url(gps_no.svg) no-repeat left center";
			break;
		default:
			t = "OTHER";
			document.getElementById("btn_gps").style.background = "url(gps_no.svg) no-repeat left center";
			console.error(err);
	}
	//document.getElementById(`error-${t}`).hidden = false;
}

// Update the duration since the last geolocation element
let gps_bad_count = 0;
let sec_old = 0;
function updateTime() {
	let d = new Date() - lastUpdate;
	let min = Math.floor(d / Minute);
	let sec = Math.floor(d % Minute / Second);
	tot_time = min + "m " + sec + "s"
	if(sec_old != sec){
		gps_bad_count = gps_bad_count - 1;
	}
	if(sec > 3) {
		if(document.getElementById("tn_color").value == 1){
			document.getElementById("btn_gps").style.background = "url(gps_bad.svg) no-repeat left center";
			gps_bad_count = 4;
		}
		else{
			document.getElementById("btn_gps").style.background = "url(gps_bad_light.svg) no-repeat left center";
			gps_bad_count = 4;
		}
		
		if(sec > 10){
			document.getElementById("btn_gps").style.background = "url(gps_no.svg) no-repeat left center";
		}	
	}
	else{
		if(gps_bad_count < 1){
			document.getElementById("btn_gps").style.background = "url(gps_ok.svg) no-repeat left center";
		}
		
	}
	document.getElementById("lastUpdate").innerHTML = "Last Update <br>" + tot_time;
	sec_old = sec;
}