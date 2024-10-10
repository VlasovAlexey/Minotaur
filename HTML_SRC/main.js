// /main prg start important for save all settings
init_global();

//Main RECORD Loop
GlobalInterval = 0;
AccelInterval = 0;

function upd_wmm_gui(){
    if($("#igrf_13_opt").val() == 1){
        element_id_show("tr_igrf_13_val");
        element_id_show_inline("btn_wmm");
    }
    if($("#igrf_13_opt").val() == 2){
        element_id_hide("tr_igrf_13_val");
        element_id_hide("btn_wmm");
        $(".igrf_13_val_opt").val("0,0");
    }
    //upd_all();
}

function upd_all() {
	if ($("#data_format_opt").val() * 1.0 == 1) {
		element_id_hide("div_block_dpv1");
		element_id_hide("div_block_dpv2");
		element_id_hide("div_block_dpv3");
	}
	if ($("#data_format_opt").val() * 1.0 == 2) {
		element_id_show("div_block_dpv1");
		element_id_show("div_block_dpv2");
		element_id_show("div_block_dpv3");
	}
	upd_wmm_gui();

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
	compass_upd_main();

	//auto save all settings
	btn_save();
	changeGuiDim();
	changeLang();
	assign_css_style();
	Pbar_Hide();
	
}
upd_all();

//Show progress bar
var f_start = 1;

function Pbar_Show() {
	if (f_start == 1) {
		f_start = 0;
	}
	if (f_start == 0) {
		setTimeout(function() {
			document.getElementById("Overlay_progress").style.height = "100%";
			document.getElementById("Overlay_progress").style.opacity = "1";
		}, 20);
	}
}

function Pbar_Hide() {
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

//Open overlay window with UNDER DEV text
function openNav() {
	del_html_elem("tn_overlay_text");
	create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("ch_UnderDev"));
	document.getElementById("AlertOverlay").style.height = "100%";
	document.getElementById("AlertOverlay").style.opacity = "1";

}

//and close
function closeNav() {
	setTimeout(function() {
		document.getElementById("AlertOverlay").style.height = "0%";
	}, 400);
	document.getElementById("AlertOverlay").style.opacity = "0";
}

//warning window with sensor error
function openSensorError() {
	del_html_elem("tn_overlay_text");
	create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("ch_SensorError"));
	document.getElementById("AlertOverlay").style.height = "100%";
	document.getElementById("AlertOverlay").style.opacity = "1";

}

//warning window with no Internet connection
function openInternetError() {
	del_html_elem("tn_overlay_text");
	create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("ch_InternetError"));
	document.getElementById("AlertOverlay").style.height = "100%";
	document.getElementById("AlertOverlay").style.opacity = "1";

}

//warning window about current date of WMM generation value
function openWMMWarn() {
	del_html_elem("tn_overlay_text");
	create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("ch_WMMWarn"));
	document.getElementById("AlertOverlay").style.height = "100%";
	document.getElementById("AlertOverlay").style.opacity = "1";

}

//reset gps and location icons to disabled state
document.getElementById("btn_gps").style.background = "url(gps_no.svg) no-repeat left center";
document.getElementById("btn_nav").style.background = "url(nav_no.svg) no-repeat left center";
