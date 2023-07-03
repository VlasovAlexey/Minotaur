// /main prg start
function hide_unused_elements() {
    element_id_hide("visuallyhidden");
    element_id_hide("tr_plan_ccr");
    element_id_hide("tn_plan_ccr_sel");
    element_id_hide("tr_mdl");
    element_id_hide("tr_mdl_sel");
    element_id_hide("tr_gf");
    element_id_hide("tn_gf");
    element_id_hide("tr_water");
    element_id_hide("tn_water_set");
    element_id_hide("tr_slevel");
    element_id_hide("tn_slevel");
    element_id_hide("tr_celsus");
    element_id_hide("tn_celsus");
    element_id_hide("tr_plan_style");
    element_id_hide("tn_plan_style_sel");
    element_id_hide("1-header");
    element_id_hide("2-header");
    element_id_hide("3-header");
    element_id_hide("btn_export_pdf_profile");
    element_id_hide("5-header");
    element_id_hide("6-header");
    element_id_hide("7-header");
    element_id_hide("8-header");
    element_id_hide("9-header");
    element_id_hide("11-header");
    element_id_hide("td_warn_div");
    element_id_hide("div_block_main_profile"); 
}
//hide_unused_elements();

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
		let a = Math.round(event.alpha)
		document.getElementById("data-angle").textContent = a;
		document.getElementById("compass").style.transform = `rotate(${a}deg)`;
	});

	navigator.geolocation.watchPosition(g => {
		lastUpdate = new Date();
		errorHidden();
		updateTime();
		updateGeo(g.coords);
	}, updateError, {
		enableHighAccuracy: true,
	});

	window.setInterval(updateTime, 1000);
}, {
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

	if (typeof c.accuracy === "number") {
		document.getElementById("data-accuracy").textContent = Math.round(c.accuracy);
	}
}

/* TIME */

const Second = 1000;
const Minute = 60 * Second;

// Update the durattion since the last geolocalisation element.
function updateTime() {
	let d = new Date() - lastUpdate;
	let min = Math.floor(d / Minute);
	let sec = Math.floor(d % Minute / Second);
	document.getElementById("lastUpdate").textContent = `${min}m ${sec}s`;
}

/* ERROR */

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

