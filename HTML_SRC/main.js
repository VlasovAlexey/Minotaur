//get current date time string in UTC
function get_date() {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	//var milliseconds = now.getMilliseconds();
	var final_time = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
	return final_time;
}

//get current date time string in human readable
function get_date_hr() {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	//var milliseconds = now.getMilliseconds();
	var final_time = `${day}_${month}_${year} ${hours}:${minutes}:${seconds}`;
	return final_time;
}

//os detector
function getOS() {
	var userAgent = window.navigator.userAgent,
		platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'Mac OS';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
	} else if (/Linux/.test(platform)) {
		os = 'Linux';
	}

	return os;
}

// /main prg start
init_global();

function getSize() {
	if ((window.innerWidth) > (window.innerHeight)) {
		if (getOS() == "iOS" || getOS() == "Android"){
			openNav();
		}
	}
	if ((window.innerWidth) <= (window.innerHeight)) {
		closeNav();
	}
	gps_chart();
}
getSize();
window.addEventListener("resize", getSize);

function hide_unused_elements() {
	element_id_hide("tn_btn_save");
	element_id_hide("1-header");
	element_id_hide("2-header");
	element_id_hide("3-header");
	element_id_hide("7-header");
	element_id_hide("8-header");
	element_id_hide("9-header");
	element_id_hide("11-header");
	element_id_hide("td_warn_div");
}
hide_unused_elements();

//Main Loop
GlobalInterval = 0;
AccelInterval = 0;
function upd_all() {
	
	//Show progress bar
	Pbar_Show();

	//Update GUI dimension first. It is important for correct update GUI elements at any time
	changeGuiDim();

	//get and set record frequency
	if (GlobalInterval == 0 || GlobalInterval != 0) {
		clearTimeout(GlobalInterval);
	};
	GlobalInterval = setInterval(GlobalWatch, (1000 * document.getElementById("rec_freq_opt").value));

	//get and set frequency for accelerometer
	if (AccelInterval == 0 || AccelInterval != 0) {
		clearTimeout(AccelInterval);
	}
	AccelInterval = setInterval(AccelWatch, 40);

	//get speed from interface and set it
	speed_reg = document.getElementById("const_spd_opt").value;
	speed_reg = (speed_reg.replace(",", "."));

	gps_chart();
	
	//auto save all settings
	btn_save();
	reset_me();
	Pbar_Hide();
	
}
upd_all();

function reset_me() {
	//default_set();
	//create_html();
	//init_global();
	changeGuiDim();
	changeLang();
	assign_css_style();
}

//Show progress bar
var f_start = 1;

function Pbar_Show() {
	if (f_start == 1) {
		f_start = 0;
	}
	if (f_start == 0) {
		//del_html_elem("tn_overlay_text_progress");
		//create_html_text("tn_overlay_text_progress", "opt_overlay_text_progress", "Please Wait...");
		setTimeout(function() {
			document.getElementById("Overlay_progress").style.height = "100%";
			document.getElementById("Overlay_progress").style.opacity = "1";
		}, 20);
		//document.getElementById("Overlay_progress").style.height = "100%";
		//document.getElementById("Overlay_progress").style.opacity = "1";
	}
}

function Pbar_Hide() {
	//document.getElementById("Overlay_progress").style.height = "0%";
	//document.getElementById("Overlay_progress").style.opacity = "0";
	setTimeout(function() {
		document.getElementById("Overlay_progress").style.height = "0%";
		document.getElementById("Overlay_progress").style.opacity = "0";
	}, 200);

}


//Main Function for AnyErrors
function upd_error() {
	openNav();
	upd_all();

}
//Open overlay window with custom text
function openNav() {
	del_html_elem("tn_overlay_text");
	create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("ch_UnderDev"));
	document.getElementById("AlertOverlay").style.height = "100%";
	//document.getElementById("AlertOverlay").style.display = "block";
	document.getElementById("AlertOverlay").style.opacity = "1";

}

//and close
function closeNav() {
	setTimeout(function() {
		document.getElementById("AlertOverlay").style.height = "0%";
	}, 400);
	document.getElementById("AlertOverlay").style.opacity = "0";
	//document.getElementById("AlertOverlay").style.display = "none";
}

//reset gps and location icons to disabled state
document.getElementById("btn_gps").style.background = "url(gps_no.svg) no-repeat left center";
document.getElementById("btn_nav").style.background = "url(nav_no.svg) no-repeat left center";

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
		if (GPX_file_num < 9 ) {
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

function btn_meas_click() {
	meas_tick = meas_tick + 1;
	if (meas_state == 0) {
		document.getElementById("btn_meas").style.background = "url(meas_press.svg) no-repeat center center";
		document.getElementById("btn_meas").style.border = "6px solid #188958";
		meas_state = 1;

	} else {
		document.getElementById("btn_meas").style.background = "url(meas_main.svg) no-repeat center center";
		document.getElementById("btn_meas").style.border = "6px solid #969696";
		meas_state = 0;
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
		//document.getElementById(`data-${p}`).textContent = String(c[p]);
	});

	lat_reg = c.latitude;
	lon_reg = c.longitude;
	ele_reg = c.altitude;
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

//compass code start here
var lastNamedLat = 0;
var lastNamedLong = 0;

var popupShown = false;

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
	// Prevents the default mini-infobar or install dialog from appearing on mobile
	e.preventDefault();
	// Save the event because you'll need to trigger it later.
	deferredPrompt = e;
	// Show your customized install prompt for your PWA
	// Your own UI doesn't have to be a single element, you
	// can have buttons in different locations, or wait to prompt
	// as part of a critical journey.
	showInAppInstallPromotion();

	document.getElementById("installInstructions").style.display = "none";
	document.getElementById("installBtn").style.display = "block";
});

function showPosition(position) {
	var nameLat = position.coords.latitude.toFixed(2);
	var nameLong = position.coords.longitude.toFixed(2);
	if (lastNamedLat != nameLat || lastNamedLong != nameLong) {

		lastNamedLat = nameLat;
		lastNamedLong = nameLong;
	}
	document.getElementById("location-info").innerHTML = convertCoordinates(position.coords.latitude, position.coords.longitude);
	document.getElementById("location-elev").innerHTML = "Elevation <br>" + (Math.round(position.coords.altitude)) + " m";
}


function updatePosition() {
	navigator.geolocation.getCurrentPosition(showPosition);
}

//if app run on Desktop Devices we see nothing warning about permissions
if (getOS() == "Windows" || getOS() == "Linux" || getOS() == "Mac OS"){
	document.getElementById("accessbutton").style.display = "none";
	document.getElementById("accessblur").style.opacity = "0";
	document.getElementById("accessblur").style.display = "none";
}

//permission button for acess geo data on mobile devices
function grantPremission() {

	document.getElementById("accessbutton").style.display = "none";
	document.getElementById("accessblur").style.opacity = "0";
	document.getElementById("accessblur").style.display = "none";
	document.getElementById("btn_nav").style.background = "url(nav_ok.svg) no-repeat left center";
	if (navigator.geolocation) {
		updatePosition();
		setInterval(updatePosition(), 100);
	}
	try {
		DeviceOrientationEvent.requestPermission();
	} catch {
		//display error here
		document.getElementById("btn_nav").style.background = "url(nav_no.svg) no-repeat left center";
	}
}



const startBtn = document.querySelector(".start-btn");
const isIOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/);

function init() {
	startBtn.addEventListener("click", startCompass);
	//navigator.geolocation.getCurrentPosition(locationHandler);

	if (!isIOS) {
		window.addEventListener("deviceorientationabsolute", handler, true);
	}
}

//deploy
function startCompass() {
	if (isIOS) {
		DeviceOrientationEvent.requestPermission().then((response) => {
				if (response === "granted") {
					window.addEventListener("deviceorientation", handler, true);
					document.getElementById("btn_nav").style.background = "url(nav_ok.svg) no-repeat left center";
				} else {
					//alert("has to be allowed!");
					document.getElementById("btn_nav").style.background = "url(nav_no.svg) no-repeat left center";
				}
			})
			.catch(() => {
				//document.getElementById("btn_gps").style.background = "url(nav_no.svg) no-repeat left center";
			}
		);
	}
}

//android device orientation watcher
var AHeading = 0;

function handler(e) {
	AHeading = -(e.webkitCompassHeading || Math.abs(e.alpha - 360));
}
init();

//device orientation
var dial = document.getElementById("dial");
var acHeading = 0;
window.addEventListener('deviceorientation', function(e) {
	if (popupShown) {
		popupShown = false;
		document.getElementById("accessblur").style.opacity = "0";
		updatePosition();
	}

	var levelDisp = document.getElementById("level-disp");
	var levelX = 0;
	var levelY = 0;
	var levelG = Math.min(Math.max((e.gamma / 9), -5), 5);
	var levelB = Math.min(Math.max((e.beta / 9), -5), 5);

	var heading = 0;
	var screenAngle = window.orientation;

	var rot_sensor = 0;
	var rot_android_cor = 0;

	//check os and select data from different watchers sensors
	if (getOS() == "Android") {
		//android
		rot_sensor = AHeading;
		if (rot_sensor < 0) {
			rot_sensor = 360 + rot_sensor;
		}
		rot_android_cor = 180;
		rot_dif = 360;
	} else {
		//ios
		rot_sensor = e.webkitCompassHeading;
		rot_sensor = Math.abs(rot_sensor);
		rot_android_cor = 0;
		rot_dif = 0;
	}

	if (screenAngle == 0 || screenAngle == 360) { // rightside up
		heading = (360 - rot_sensor);
		levelY = levelB;
		levelX = levelG;
	} else if (screenAngle == 90) { //landscape left
		if (getOS() == "Android") {
			//android
			heading = (270 - rot_sensor - rot_android_cor);
			if (heading < 0) {
				heading = 360 + heading
			}
		} else {
			//ios
			heading = (270 - rot_sensor);
		}
		levelY = levelG * -1;
		levelX = levelB;
	} else if (screenAngle == 180) { //upside down
		heading = (180 - rot_sensor);
		levelY = levelB * -1;
		levelX = levelG * -1;
	} else if (screenAngle == 270 || screenAngle == -90) { //landscape right

		if (getOS() == "Android") {
			//android
			heading = (90 - rot_sensor + rot_android_cor);
			if (heading < 0) {
				heading = 360 + heading
			}
		} else {
			//ios
			heading = (90 - rot_sensor);
		}

		levelY = levelG;
		levelX = levelB * -1;
	} else {
		console.log("The browser doesn`t support window.orientation");
	}
	levelDisp.style.top = (levelY + 50) + "%";
	levelDisp.style.left = (levelX + 50) + "%";

	var labelAngle = 0;
	acHeading = 0;
	var cross_01 = document.getElementById("level-disp");
	var cross_02 = document.getElementById("level-cross");

	if (getOS() == "Android") {
		//android
		labelAngle = rot_dif - (360 - heading);
		dial.style.transform = "rotate(" + (rot_dif - heading) + "deg)"
		acHeading = rot_dif - (360 - Math.round(heading));

		//android fix
		if (acHeading < 0) {
			acHeading = 360 + acHeading
		}

		cross_01.style.transform = "translate(-50%, -50%) rotate(" + (heading - rot_dif) + "deg)"
		cross_02.style.transform = "translate(-50%, -50%) rotate(" + (heading - rot_dif) + "deg)"
	} else {
		//ios
		labelAngle = (Math.abs(360 - heading));
		dial.style.transform = "rotate(" + (heading - 360) + "deg)"
		acHeading = (Math.abs(360 - Math.round(heading)));
		cross_01.style.transform = "translate(-50%, -50%) rotate(-" + (heading + 360) + "deg)"
		cross_02.style.transform = "translate(-50%, -50%) rotate(-" + (heading + 360) + "deg)"

	}

	const labels = document.querySelectorAll(".label");
	for (let i = 0; i < labels.length; i++) {
		labels[i].style.transform = "translate(-50%, -50%) rotate(" + labelAngle + "deg";
	}

	if (acHeading >= 360) {
		acHeading -= 360;
	}

	//document.getElementById("heading-value").innerHTML = acHeading + "&deg";
	var directionName = "";
	if (acHeading > 337 || acHeading < 22) {
		directionName = "N"
	} else if (acHeading < 67) {
		directionName = "NE"
	} else if (acHeading < 112) {
		directionName = "E"
	} else if (acHeading < 157) {
		directionName = "SE"
	} else if (acHeading < 202) {
		directionName = "S"
	} else if (acHeading < 247) {
		directionName = "SW"
	} else if (acHeading < 292) {
		directionName = "W"
	} else {
		directionName = "NW"
	}
	directionName = directionName + " " + acHeading + "&deg"
	document.getElementById("heading-name").innerHTML = directionName;


}, false);


function convertCoordinates(latitude, longitude) {
	const latDegrees = Math.floor(latitude);
	const latMinutes = Math.floor((latitude - latDegrees) * 60);
	const latSeconds = Math.round((latitude - latDegrees - latMinutes / 60) * 3600);

	let lonDegrees = Math.floor(Math.abs(longitude));
	let lonMinutes = Math.floor((Math.abs(longitude) - lonDegrees) * 60);
	let lonSeconds = Math.round((Math.abs(longitude) - lonDegrees - lonMinutes / 60) * 3600);

	let direction = longitude >= 0 ? 'E' : 'W';
	if (longitude < 0) {
		direction = 'W';
	}

	const latString = `${latDegrees}Р’В°${latMinutes}'${latSeconds}" ${latitude >= 0 ? 'N' : 'S'}`;
	const lonString = `${lonDegrees}Р’В°${lonMinutes}'${lonSeconds}" ${direction}`;

	return (latString + " <br>" + lonString);
}