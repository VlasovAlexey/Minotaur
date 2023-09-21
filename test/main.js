//get current date time string in UTC
function get_date(){

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

// /main prg start
init_global();

function getSize() {
    if ((window.innerWidth) > (window.innerHeight)){
        openNav();
        
    }
    if ((window.innerWidth) <= (window.innerHeight)){
        closeNav();
    }  
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
function upd_all() {
    //Show progress bar
    Pbar_Show();

    //Update GUI dimension first. It is important for correct update GUI elements at any time
    changeGuiDim();

    //auto save all settings
    btn_save();

    reset_me();
    Pbar_Hide();
}
upd_all();

function reset_me(){
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
    if(f_start == 1){
        f_start = 0;
    }
    if(f_start == 0){
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

//gps_enable
document.getElementById("btn_gps").style.background = "url(gps_no.svg) no-repeat left center";

//Recording button start here
element_id_hide("rec_blinking");

var GPX_File = "";
var lat_start = "0.0";
var lon_start = "0.0";
var ele_start = "0.0";

var lat_reg = "0.0";
var lon_reg = "0.0";
var ele_reg = "0.0";

var lat_end = "0.0";
var lon_end = "0.0";
var ele_end = "0.0";

var rec_first_start = 0;

function btn_record(){
    if (record_state == 0){
        document.getElementById("btn_rec").style.background = "url(rec_press.svg) no-repeat center center";
        document.getElementById("btn_rec").style.border = "6px solid #fe2b2c";
        element_id_show("rec_blinking");
        record_state = 1;

        //start writing to gpx array data
        //Add header
        GPX_File = GPX_File + "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";

        GPX_File = GPX_File + "<gpx creator=\"Minotaur https://vlasovalexey.github.io/Minotaur/HTML_SRC/\" version=\"0.1\" xmlns=\"https://vlasovalexey.github.io/Minotaur/HTML_SRC/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"https://vlasovalexey.github.io/Minotaur/HTML_SRC/\">\n";
        GPX_File = GPX_File + " <metadata>\n <time>"+ get_date() + "</time>\n </metadata>\n";
        GPX_File = GPX_File + " <trk>\n  <name>Minotaur_Track_"+ get_date() + "</name>\n  <trkseg>\n";

    }
    else{
        document.getElementById("btn_rec").style.background = "url(rec_main.svg) no-repeat center center";
        document.getElementById("btn_rec").style.border = "6px solid #969696";
        element_id_hide("rec_blinking");
        record_state = 0;
        rec_first_start = 0;
        //close trk
        GPX_File = GPX_File + "  </trkseg>\n </trk>\n";

        //add two way points
        GPX_File = GPX_File + "    <wpt lat=\""+ lat_start + "\" lon=\"" + lon_start + "\">\n";
        GPX_File = GPX_File + "     <ele>"+ ele_start + "</ele>\n";
        GPX_File = GPX_File + "     <name>Track Minotaur Start "+ lat_start +", " + lon_start + "</name>\n";
        GPX_File = GPX_File + "     <desc>Track Minotaur Start "+ lat_start +", " + lon_start + "</desc>\n";
        GPX_File = GPX_File + "    </wpt>\n";

        GPX_File = GPX_File + "    <wpt lat=\""+ lat_end + "\" lon=\"" + lon_end + "\">\n";
        GPX_File = GPX_File + "     <ele>"+ ele_end + "</ele>\n";
        GPX_File = GPX_File + "     <name>Track Minotaur End "+ lat_end +", " + lon_end + "</name>\n";
        GPX_File = GPX_File + "     <desc>Track Minotaur End "+ lat_end +", " + lon_end + "</desc>\n";
        GPX_File = GPX_File + "    </wpt>\n";

        //end create gpx array
        GPX_File = GPX_File + "</gpx>\n";
        //and write file
        //console.log(GPX_File);
        var fl_name = "minotaur_track_"+ get_date() + ".gpx";
        var blob = new Blob([GPX_File], {type: "application/gpx;charset=utf-8"});
        saveAs(blob, fl_name);
        GPX_File = [];
    }
}

//Measure button start here
document.getElementById("btn_meas").style.background = "url(meas_main.svg) no-repeat center center";
document.getElementById("btn_meas").style.border = "6px solid #969696";

function btn_meas_click(){
    if (meas_state == 0){
        document.getElementById("btn_meas").style.background = "url(meas_press.svg) no-repeat center center";
        document.getElementById("btn_meas").style.border = "6px solid #188958";
        meas_state = 1;
    }
    else{
        document.getElementById("btn_meas").style.background = "url(meas_main.svg) no-repeat center center";
        document.getElementById("btn_meas").style.border = "6px solid #969696";
        meas_state = 0;
    }
}


      
// The date of the last geolocation update.
var lastUpdate = new Date();

window.addEventListener("load", () => {
	if (!navigator.geolocation) {
		updateError({
			code: NONAVIGATION
		});
		return;
	}

 

	window.addEventListener("deviceorientation", event => {
		let orient_a = Math.round(event.alpha)
        let orient_b = Math.round(event.beta)
        let orient_g = Math.round(event.gamma)
        
        
		document.getElementById("data-angle").textContent = orient_a;
        document.getElementById("data-beta").textContent = orient_b;
        document.getElementById("data-gamma").textContent = orient_g;
        //document.getElementById("compass").style.transform = `rotate(${((orient_a-90)*1.0)}deg)`;
		
	});

	navigator.geolocation.watchPosition(g => {
		lastUpdate = new Date();
		errorHidden();
		updateTime();
		updateGeo(g.coords);
	}, updateError, {
		enableHighAccuracy: true,
	    });
	    window.setInterval(updateTime, 2000);
    },
    {
	    once: true,
    });



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
		document.getElementById(`data-${p}`).textContent = String(c[p]);
	});
    
    //recording and we need add every interval data to file
    if(record_state == 1){

        //errors handler
        if(c.latitude == null || c.latitude == undefined){lat_reg = "0.0"}else{lat_reg = c.latitude}
        if(c.longitude == null || c.longitude == undefined){lon_reg = "0.0"}else{lon_reg = c.longitude}
        if(c.altitude == null || c.altitude == undefined){ele_reg = "0.0"}else{ele_reg = c.altitude}

        GPX_File = GPX_File + "    <trkpt lat=\""+ lat_reg +"\" lon=\""+ lon_reg + "\">\n";
        GPX_File = GPX_File + "     <ele>"+ ele_reg + "</ele>\n";
        GPX_File = GPX_File + "    </trkpt>\n";

        if(rec_first_start == 0){
            lat_start = c.latitude;
            lon_start = c.longitude;
            ele_start = c.altitude;

            rec_first_start = 1;
        }
        else{
            lat_end = c.latitude;
            lon_end = c.longitude;
            ele_start = c.altitude;
        }

        if(lat_start == null || lat_start == undefined){lat_start = "0.0"};
        if(lat_end == null || lat_end == undefined){lat_end = "0.0"};
        
        if(lon_start == null || lon_start == undefined){lon_start = "0.0"};
        if(lon_end == null || lon_end == undefined){lon_end = "0.0"};

        if(ele_start == null || ele_start == undefined){ele_start = "0.0"};
        if(ele_end == null || ele_end == undefined){ele_end = "0.0"};
    }

    //console.log(c.latitude);
	if (typeof c.accuracy === "number") {
		document.getElementById("data-accuracy").textContent = Math.round(c.accuracy);
	}
}



const Second = 1000;
const Minute = 60 * Second;

// Update the durattion since the last geolocalisation element.
function updateTime() {
	let d = new Date() - lastUpdate;
	let min = Math.floor(d / Minute);
	let sec = Math.floor(d % Minute / Second);
	document.getElementById("lastUpdate").textContent = `${min}m ${sec}s`;
}



const NONAVIGATION = -1; // a non-standart error code
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
		break;
	case PERMISSION_DENIED:
		t = "PERMISSION_DENIED";
		break;
	case POSITION_UNAVAILABLE:
		t = "POSITION_UNAVAILABLE";
		break;
	case TIMEOUT:
		t = "TIMEOUT";
		break;
	default:
		t = "OTHER";
		console.error(err);
	}

	document.getElementById(`error-${t}`).hidden = false;
}
