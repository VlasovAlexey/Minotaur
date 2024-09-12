//Recording button start here
element_id_hide("rec_blinking");

var GPX_File = "";
var GPX_file_num = 1;
var lat_start = "0.0";
var lon_start = "0.0";
var ele_start = "0.0";

var lat_reg = "0.0";
var lon_reg = "0.0";
var ele_reg = "0.0";

var speed_reg = document.getElementById("const_spd_opt").value;
speed_reg = (speed_reg.replace(",", "."));

var course_reg = "0.0";

var lat_end = "0.0";
var lon_end = "0.0";
var ele_end = "0.0";

var meas_tick = 0;

var rec_first_start = 0;

function btn_record() {
	if (record_state == 0) {
		document.getElementById("btn_rec").style.background = "url(rec_press.svg) no-repeat center center";
		document.getElementById("btn_rec").style.border = "6px solid #fe2b2c";
		element_id_show("rec_blinking");
		element_id_hide("main_parameters");
		
		record_state = 1;

		//start writing to gpx array data
		//Add header
		GPX_File = GPX_File + "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";

		GPX_File = GPX_File + "<gpx creator=\"Minotaur https://vlasovalexey.github.io/Minotaur/HTML_SRC/\" version=\"0.1\" xmlns=\"https://vlasovalexey.github.io/Minotaur/HTML_SRC/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"https://vlasovalexey.github.io/Minotaur/HTML_SRC/\">\n";
		GPX_File = GPX_File + " <metadata>\n <time>" + get_date() + "</time>\n </metadata>\n";
		GPX_File = GPX_File + " <trk>\n  <name>Minotaur_Track_" + get_date() + "</name>\n  <trkseg>\n";

	} else {
		document.getElementById("btn_rec").style.background = "url(rec_main.svg) no-repeat center center";
		document.getElementById("btn_rec").style.border = "6px solid #969696";
		element_id_hide("rec_blinking");
		element_id_show("main_parameters");
		record_state = 0;
		rec_first_start = 0;
		//close trk
		GPX_File = GPX_File + "  </trkseg>\n </trk>\n";

		//add two way points
		GPX_File = GPX_File + "    <wpt lat=\"" + lat_start + "\" lon=\"" + lon_start + "\">\n";
		GPX_File = GPX_File + "     <ele>" + ele_start + "</ele>\n";
		GPX_File = GPX_File + "     <name>Track Minotaur Start " + lat_start + ", " + lon_start + "</name>\n";
		GPX_File = GPX_File + "     <desc>Track Minotaur Start " + lat_start + ", " + lon_start + "</desc>\n";
		GPX_File = GPX_File + "    </wpt>\n";

		GPX_File = GPX_File + "    <wpt lat=\"" + lat_end + "\" lon=\"" + lon_end + "\">\n";
		GPX_File = GPX_File + "     <ele>" + ele_end + "</ele>\n";
		GPX_File = GPX_File + "     <name>Track Minotaur End " + lat_end + ", " + lon_end + "</name>\n";
		GPX_File = GPX_File + "     <desc>Track Minotaur End " + lat_end + ", " + lon_end + "</desc>\n";
		GPX_File = GPX_File + "    </wpt>\n";
		GPX_File = GPX_File + "    <extensions>\n";
		GPX_File = GPX_File + "     <speed>" + speed_reg + "</speed>\n";
		GPX_File = GPX_File + "     <freq>" + (document.getElementById("rec_freq_opt").value) + "</freq>\n";
		GPX_File = GPX_File + "     <meas_len>" + ((document.getElementById("meas_len_opt").value).replace(",", ".")) + "</meas_len>\n";
		GPX_File = GPX_File + "     <calib_f>" + ((document.getElementById("calib_f_opt").value).replace(",", ".")) + "</calib_f>\n";
		GPX_File = GPX_File + "    </extensions>\n";
		//end create gpx array
		GPX_File = GPX_File + "</gpx>\n";

		//and write file
		scr_n_add = "";
		if (GPX_file_num < 10 ) {
			scr_n_add = "0";
		}
		var fl_name = scr_n_add + GPX_file_num + "_minotaur_" + get_date_hr() + ".gpx";
		GPX_file_num = GPX_file_num + 1;
		var blob = new Blob([GPX_File], {
			type: "application/gpx;charset=utf-8"
		});
		saveAs(blob, fl_name);
		GPX_File = [];
	}
}

//Measure button start here
document.getElementById("btn_meas").style.background = "url(meas_main.svg) no-repeat center center";
document.getElementById("btn_meas").style.border = "6px solid #969696";

element_id_hide("map_hide");

function btn_meas_click() {
	meas_tick = meas_tick + 1;
	if (meas_state == 0) {
		document.getElementById("btn_meas").style.background = "url(meas_press.svg) no-repeat center center";
		document.getElementById("btn_meas").style.border = "6px solid #188958";
		meas_state = 1;

		element_id_show("map_hide");
		element_id_hide("gps_base");
		element_id_hide("dialContainer");
		element_id_hide("info_glob");
		element_id_hide("compas_head_box");

	} else {
		document.getElementById("btn_meas").style.background = "url(meas_main.svg) no-repeat center center";
		document.getElementById("btn_meas").style.border = "6px solid #969696";
		meas_state = 0;
		
		element_id_hide("map_hide");
		element_id_show("gps_base");
		element_id_show("dialContainer");
		element_id_show("info_glob");
		element_id_show("compas_head_box");
	}
}

// The date of the last geolocation update.
var lastUpdate = new Date();
var orient_a = 0;
var orient_b = 0;
var orient_g = 0;

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

		
		//document.getElementById("data-test1").textContent = String(accel_x + " : " + accel_y + " : " + accel_z);
		//document.getElementById("data-test2").textContent = String(rot_rate_a + " : " + rot_rate_b + " : " + rot_rate_g);
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
	window.setInterval(updateTime, 10);
}, {
	//once: true,
});

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
		GPX_File = GPX_File + "    <trkpt lat=\"" + lat_reg + "\" lon=\"" + lon_reg + "\">\n";
		GPX_File = GPX_File + "     <ele>" + ele_reg + "</ele>\n";

		GPX_File = GPX_File + "     <course>" + course_reg + "</course>\n";
		GPX_File = GPX_File + "     <extensions>\n";
		GPX_File = GPX_File + "      <orient_a>" + orient_a + "</orient_a>\n";
		GPX_File = GPX_File + "      <orient_b>" + orient_b + "</orient_b>\n";
		GPX_File = GPX_File + "      <orient_g>" + orient_g + "</orient_g>\n";
		GPX_File = GPX_File + "      <meas_tick>" + meas_tick + "</meas_tick>\n";
		
		if(document.getElementById("accel_use_opt").value == 1){
			GPX_File = GPX_File + accel_arr;
		}
		accel_arr = [];
		
		GPX_File = GPX_File + "     </extensions>\n";
		GPX_File = GPX_File + "    </trkpt>\n";
		meas_tick = 0;
		if (rec_first_start == 0) {
			lat_start = lat_reg;
			lon_start = lon_reg;
			ele_start = ele_reg;

			//map rotator clear tracks and try create first point
			if (lat_reg != "0.0" && lon_reg != "0.0"){
				route_map_disp = [[lat_reg * 1.0 , lon_reg * 1.0]];
				c_lat = lat_reg * 1.0;
				c_lon = lon_reg * 1.0;
			} else {
				//bad news - sensor data or internet not available and get start value from default
				c_lat = document.getElementById("default_lat_op").value;
				c_lat = (c_lat.replace(",", ".")) * 1.0;

				c_lon = document.getElementById("default_lon_op").value;
				c_lon = (c_lon.replace(",", ".")) * 1.0;

				route_map_disp = [[c_lat, y_lon]];
			}

			rec_first_start = 1;
		} else {
			lat_end = lat_reg;
			lon_end = lon_reg;
			ele_start = ele_reg;
		}

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

	//document.getElementById(`data-latitude`).textContent = lat_reg;
	//document.getElementById(`data-longitude`).textContent = lon_reg;
}

const Second = 1000;
const Minute = 60 * Second;

// Update the duration since the last geolocation element.
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
