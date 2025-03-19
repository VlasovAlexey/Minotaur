//current page location constants creation
const {
    host, hostname, href, origin, pathname, port, protocol, search
  } = window.location

var host_name = "https://vlasovalexey.github.io/Minotaur/HTML_SRC/";
var link_buffer = "";

var lngs_usr = 1;
var dmns_usr = 1;
var color_usr = 1;

var rec_freq_usr = 2;
var meas_len_usr = "2,11";
var const_spd_usr = "1,4925373134";
var calib_f_usr = "0,0";

var igrf_13_usr = 1;
var accel_use_usr = 2;
var default_lat_usr = "47,4946796";
var default_lon_usr = "19,0272695";

var default_ele_usr = "0,0";
var data_format_usr = 1;

var igrf_13_val_usr = "0,0";
var track_name_usr = "Minotaur Explorer";

function default_set() {
	lngs_usr = 1;
	dmns_usr = 1;
	color_usr = 1;

	rec_freq_usr = 2;
	meas_len_usr = "2,11";
	const_spd_usr = "1,4925373134";
	calib_f_usr = "0,0";

	igrf_13_usr = 1;
	accel_use_usr = 2;
	default_lat_usr = "47,4946796";
	default_lon_usr = "19,0272695";

	default_ele_usr = "0,0";

	data_format_usr = 1;
	igrf_13_val_usr = "0,0";
	track_name_usr = "Minotaur Explorer";
}

var lng_arr = [{
		text: "English",
		id: "tn_english",
		value: "1",
		isdisable: "enabled"
	},
	{
		text: "Русский",
		id: "tn_russia",
		value: "2",
		isdisable: "enabled"
	},
	{
		text: "Español",
		id: "tn_portuguese",
		value: "3",
		isdisable: "enabled"
	},
	{
		text: "Português",
		id: "tn_port",
		value: "4",
		isdisable: "enabled"
	},
	{
		text: "中文",
		id: "tn_china",
		value: "5",
		isdisable: "enabled"
	},
	{
		text: "Български",
		id: "tn_bu",
		value: "6",
		isdisable: "enabled"
	},
	{
		text: "Français",
		id: "tn_fr",
		value: "7",
		isdisable: "enabled"
	},
	{
		text: "한국어",
		id: "tn_kr",
		value: "8",
		isdisable: "enabled"
	},
	{
		text: "Italiano",
		id: "tn_it",
		value: "9",
		isdisable: "enabled"
	}
];
var dmns_arr = [{
		text: "Meters/Liters/Bar.",
		id: "tn_dmn_mtr",
		value: "1",
		isdisable: "enabled"
	},
	{
		text: "Feet/Cu.Feet/PSI",
		id: "tn_dmn_imp",
		value: "2",
		isdisable: "disabled"
	}
];
var color_arr = [{
		text: "Dark Theme",
		id: "tn_color_dark",
		value: "1",
		isdisable: "enabled"
	},
	{
		text: "Light Theme",
		id: "tn_color_light",
		value: "2",
		isdisable: "enabled"
	}
];
var igrf_13_arr = [{
	text: "igrf_13_yes",
	id: "tn_igrf_13_yes",
	value: "1",
	isdisable: "enabled"
},
{
	text: "igrf_13_no",
	id: "tn_igrf_13_no",
	value: "2",
	isdisable: "enabled"
}
];
var accel_use_arr = [{
	text: "accel_use_yes",
	id: "tn_accel_use_yes",
	value: "1",
	isdisable: "enabled"
},
{
	text: "accel_use_no",
	id: "tn_accel_use_no",
	value: "2",
	isdisable: "enabled"
}
];

var data_format_arr = [{
	text: "data_format_gps",
	id: "data_format_gps",
	value: "1",
	isdisable: "enabled"
},
{
	text: "data_format_dpv",
	id: "data_format_dpv",
	value: "2",
	isdisable: "enabled"
},
{
	text: "data_format_seacraft",
	id: "data_format_seacraft",
	value: "3",
	isdisable: "disabled"
},
{
	text: "data_format_ariane",
	id: "data_format_ariane",
	value: "4",
	isdisable: "disabled"
}
];

var record_step_arr = [
	{
		text: "0,5",
		id: "r_step_06",
		value: "0.5",
		isdisable: "enabled"
	},
	{
		text: "1,0",
		id: "r_step_07",
		value: "1.0",
		isdisable: "enabled"
	}
];

//put to clipboard plan
function btn_link() {
    navigator.clipboard.writeText(share_plan_link_gen());
    openLnkWrn();
}

//Open overlay window with copy link warning
function openLnkWrn() {
    del_html_elem("tn_overlay_text");
    create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("ch_lnkClipboard"));
    document.getElementById("AlertOverlay").style.height = "100%";
    document.getElementById("AlertOverlay").style.opacity = "1";
}

function share_plan_link_gen(){
    //add to var for plan sharing link
    link_buffer = host_name + "?mtr=3:"
    //link_buffer += "decomix_usr1=" + deco_mix_arr.join(",") + ":";
    link_buffer += ":mtr_end";
    return link_buffer;
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

//wmm geo model add compensation to compass heading
function wmm_correction(heading_t) {
	if($("#igrf_13_opt").val() * 1.0 == 1){
		
		if (getOS() == "iOS"){
			//iOS
			heading_t = heading_t + parseFloat((document.getElementById("igrf_13_val_opt").value).replace("," , "."));
		}
		if (getOS() == "Android"){
			//Android
			heading_t = heading_t - parseFloat((document.getElementById("igrf_13_val_opt").value).replace("," , "."));
		}
		if (getOS() == "Windows" || getOS() == "Linux" || getOS() == "Mac OS"){
			//No sensor platforms e.g. desktop
			heading_t = heading_t - parseFloat((document.getElementById("igrf_13_val_opt").value).replace("," , "."));
		}
	}
	if (heading_t < 0) {
		heading_t = 360 + heading_t;
	}
	if (heading_t > 360) {
		heading_t = heading_t - 360;
	}
	return heading_t;
}

//Show\Hide HTML elements
function element_id_show(id) {
	var x = document.getElementById(id);
	x.style.display = "block";
}

function element_id_show_inline(id) {
	var x = document.getElementById(id);
	x.style.display = "inline-block";
}

function element_id_hide(id) {
	var x = document.getElementById(id);
	x.style.display = "none";
}
//set cookie
function setCookie(name, value) {
	if (IsAndroid() == true) {
		var expires = "; expires=" + "Mon, 01-Jan-2224 00:00:00 GMT";
		var SameSite = "";
		document.cookie = name + "=" + value + expires + SameSite;

	} else {
		localStorage.setItem(name, value);
	}
}

function getCookie(name) {
	if (IsAndroid() == true) {
		var r = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
		if (r) return r[2];
		else return null;
	} else {
		return (localStorage.getItem(name));
	}
}

function deleteCookie(name) {
	if (IsAndroid() == true) {
		var date = new Date();
		date.setTime(date.getTime() - 1);
		document.cookie = name += "=; expires=" + date.toGMTString();

	} else {
		localStorage.removeItem(name);
	}
}

function write_cookie() {
	setCookie("lngs_usr1", return_idx("tn_lng"));
	setCookie("dmns_usr1", return_idx("tn_dmn"));
	setCookie("color_usr1", return_idx("tn_color"));

	setCookie("rec_freq_usr1", return_idx("rec_freq_opt"));
	setCookie("meas_len_usr1", return_val("meas_len_opt"));
	setCookie("const_spd_usr1", return_val("const_spd_opt"));
	setCookie("calib_f_usr1", return_val("calib_f_opt"));

	setCookie("igrf_13_usr1", return_val("igrf_13_opt"));
	setCookie("accel_use_usr1", return_val("accel_use_opt"));
	setCookie("default_lat_usr1", return_val("default_lat_opt"));
	setCookie("default_lon_usr1", return_val("default_lon_opt"));

	setCookie("default_ele_usr1", return_val("default_ele_opt"));

	setCookie("data_format_usr1", return_val("data_format_opt"));
	
	setCookie("igrf_13_val_usr1", return_val("igrf_13_val_opt"));
	setCookie("track_name_usr1", return_val("track_name_opt"));
}

function read_cookie() {
	lngs_usr = parseInt(getCookie("lngs_usr1"));
	dmns_usr = parseInt(getCookie("dmns_usr1"));
	color_usr = parseInt(getCookie("color_usr1"));

	rec_freq_usr = getCookie("rec_freq_usr1");
	meas_len_usr = getCookie("meas_len_usr1");
	const_spd_usr = getCookie("const_spd_usr1");
	calib_f_usr = getCookie("calib_f_usr1");

	igrf_13_usr = getCookie("igrf_13_usr1");
	accel_use_usr = getCookie("accel_use_usr1");
	default_lat_usr = getCookie("default_lat_usr1");
	default_lon_usr = getCookie("default_lon_usr1");

	default_ele_usr = getCookie("default_ele_usr1");

	data_format_usr = getCookie("data_format_usr1");
	igrf_13_val_usr = getCookie("igrf_13_val_usr1");
	track_name_usr = getCookie("track_name_usr1");

	
    //assign values from url if present and recognised
	if(search == "" ){
		//do nothing but in future :)
	}
	else
	{
	//data present	
		url_arr = search;
		console.log(url_arr);
		if(url_arr.indexOf("%") != -1){
			url_arr = decodeURIComponent(url_arr);
		}

		if(url_arr.length > 10){
			url_arr = url_arr.split(":");
		}
	}
}

function return_idx(html_ids) {
	tmp4 = document.getElementById(html_ids);
	idx_me = tmp4.options.selectedIndex + 1.0;
	return idx_me;
}

function return_val(html_ids) {
	tmp5 = document.getElementById(html_ids);
	val_me = tmp5.value;
	return val_me;
}

//settings doesn`t saved ad it is first start. it will be saved now
if (getCookie("default_ele_usr1") == undefined) {
	
} else
// read if exist but it is second start
{
	read_cookie();
}

function split_fn_to_int(arr) {
	tmp_arr = getCookie(arr).split(",");
	for (c = 0; c < tmp_arr.length; c++) {
		tmp_arr[c] = parseInt(tmp_arr[c]);
	}
	return tmp_arr;
}

//save settings
function btn_save() {
	write_cookie();
}


//Restore all default settings
function btn_restore() {
	default_set();
	create_html();
	init_global();
	changeGuiDim();
	changeLang();
	assign_css_style();

	write_cookie();

	upd_all();
}

//Change Dimension whit update all interface
function dim_cng() {
	//get current values from interface
	//it is very important because after dimension changed we need recreate all selectors whit text and val
	//and we need story ACTUAL modified values to our global variables for future use
	lngs_usr = $("#tn_lng").val();
	dmns_usr = $("#tn_dmn").val(); //
	color_usr = $("#tn_color").val();

	rec_freq = $("#rec_freq_opt").val();
	meas_len = $("#meas_len_opt").val();
	const_spd = $("#const_spd_opt").val();
	calib_f = $("#calib_f_opt").val();

	IGRF_13 = $("#igrf_13_opt").val();
	accel_use = $("#accel_use_opt").val();
	default_lat = $("#default_lat_opt").val();
	default_lon = $("#default_lon_opt").val();

	default_ele = $("#default_ele_opt").val();

	data_format = $("#data_format_opt").val();
	
	igrf_13_val = $("#igrf_13_val_opt").val();
	track_name = $("#track_name_opt").val();
	
	create_html();
	init_global();
	changeGuiDim();
	changeLang();
	assign_css_style();

	upd_all();

}

//Create dynamic HTML elements
function create_html() {
	del_html_elem("tr_lng_sel");
	create_custom_option_arr("tr_lng_sel", "tn_lng", lngs_usr, lng_arr);
	del_html_elem("tr_dmn_sel");
	create_custom_option_arr("tr_dmn_sel", "tn_dmn", dmns_usr, dmns_arr);
	del_html_elem("tn_ifc_set");
	create_custom_option_arr("tn_ifc_set", "tn_color", color_usr, color_arr);


	del_html_elem("tr_rec_freq");
	//create_option("tr_rec_freq", "rec_freq_opt", 0.02, 1, rec_freq_usr, 0.02, 2, "none");
	create_custom_option_arr("tr_rec_freq", "rec_freq_opt", rec_freq_usr, record_step_arr);
	del_html_elem("tr_meas_len");
	create_input_val("tr_meas_len", "meas_len_opt", meas_len_usr);
	del_html_elem("tr_const_spd");
	create_input_val("tr_const_spd", "const_spd_opt", const_spd_usr);
	del_html_elem("tr_calib_f");
	create_input_val("tr_calib_f", "calib_f_opt", calib_f_usr);

	del_html_elem("tr_igrf_13");
	create_custom_option_arr("tr_igrf_13", "igrf_13_opt", igrf_13_usr, igrf_13_arr);
	del_html_elem("tr_accel_use");
	create_custom_option_arr("tr_accel_use", "accel_use_opt", accel_use_usr, accel_use_arr);
	del_html_elem("tr_default_lat");
	create_input_val_sign("tr_default_lat", "default_lat_opt", default_lat_usr);
	del_html_elem("tr_default_lon");
	create_input_val_sign("tr_default_lon", "default_lon_opt", default_lon_usr);

	del_html_elem("tr_default_ele");
	create_input_val_sign("tr_default_ele", "default_ele_opt", default_ele_usr);

	del_html_elem("tr_data_format");
	create_custom_option_arr("tr_data_format", "data_format_opt", data_format_usr, data_format_arr);

	del_html_elem("tr_igrf_13_val");
	create_input_val_sign("tr_igrf_13_val", "igrf_13_val_opt", igrf_13_val_usr);
	del_html_elem("tr_track_name");
	create_input_val_text("tr_track_name", "track_name_opt", track_name_usr);

	//Re create watchers for changes
	tn_cng_color = document.getElementById("tn_color");
	tn_cng_color.addEventListener('change', assign_css_style);
	tn_cng_color.addEventListener('change', upd_all);

	lng_opt = document.getElementById("tn_lng");
	lng_opt.addEventListener('change', upd_all);
	lng_opt.addEventListener('change', changeLang);

	Dmn_opt = document.getElementById("tn_dmn");
	Dmn_opt.addEventListener('change', dim_cng);

	w_rec_freq = document.getElementById("rec_freq_opt");
	w_rec_freq.addEventListener('change', upd_all);
	w_meas_len = document.getElementById("meas_len_opt");
	w_meas_len.addEventListener('change', upd_all);
	w_const_spd = document.getElementById("const_spd_opt");
	w_const_spd.addEventListener('change', upd_all);
	w_calib_f = document.getElementById("calib_f_opt");
	w_calib_f.addEventListener('change', upd_all);

	w_igrf_13 = document.getElementById("igrf_13_opt");
	w_igrf_13.addEventListener('change', upd_all);
	w_accel_use = document.getElementById("accel_use_opt");
	w_accel_use.addEventListener('change', upd_all);
	w_default_lat = document.getElementById("default_lat_opt");
	w_default_lat.addEventListener('change', upd_all);
	w_default_lon = document.getElementById("default_lon_opt");
	w_default_lon.addEventListener('change', upd_all);

	w_default_ele = document.getElementById("default_ele_opt");
	w_default_ele.addEventListener('change', upd_all);

	w_data_format = document.getElementById("data_format_opt");
	w_data_format.addEventListener('change', upd_all);

	w_igrf_13_val = document.getElementById("igrf_13_val_opt");
	w_igrf_13_val.addEventListener('change', upd_all);
	track_name = document.getElementById("track_name_opt");
	track_name.addEventListener('change', upd_all);

}

create_custom_option_arr("tr_lng_sel", "tn_lng", lngs_usr, lng_arr);
create_custom_option_arr("tr_dmn_sel", "tn_dmn", dmns_usr, dmns_arr);
create_custom_option_arr("tn_ifc_set", "tn_color", color_usr, color_arr);

//create_option("tr_rec_freq", "rec_freq_opt", 0.02, 1, rec_freq_usr, 0.01, 2, "none");
create_custom_option_arr("tr_rec_freq", "rec_freq_opt", rec_freq_usr, record_step_arr);

create_input_val("tr_meas_len", "meas_len_opt", meas_len_usr);
create_input_val("tr_const_spd", "const_spd_opt", const_spd_usr);
create_input_val("tr_calib_f", "calib_f_opt", calib_f_usr);

create_custom_option_arr("tr_igrf_13", "igrf_13_opt", igrf_13_usr, igrf_13_arr);
create_custom_option_arr("tr_accel_use", "accel_use_opt", accel_use_usr, accel_use_arr);
create_input_val_sign("tr_default_lat", "default_lat_opt", default_lat_usr);
create_input_val_sign("tr_default_lon", "default_lon_opt", default_lon_usr);

create_input_val_sign("tr_default_ele", "default_ele_opt", default_ele_usr);

create_custom_option_arr("tr_data_format", "data_format_opt", data_format_usr, data_format_arr);

create_input_val_sign("tr_igrf_13_val", "igrf_13_val_opt", igrf_13_val_usr);
create_input_val_text("tr_track_name", "track_name_opt", track_name_usr);

var force_lng = 0;

function init_global() {
	//if you want force language to eng you change to 1
	//this "feature" very important for PDF generation with other languages is not possible. Only eng.
	force_lng = 0;

	//Create first start watchers for changes
	tn_cng_color = document.getElementById("tn_color");
	tn_cng_color.addEventListener('change', assign_css_style);
	tn_cng_color.addEventListener('change', upd_all);

	lng_opt = document.getElementById("tn_lng");
	lng_opt.addEventListener('change', upd_all);
	lng_opt.addEventListener('change', changeLang);

	Dmn_opt = document.getElementById("tn_dmn");
	Dmn_opt.addEventListener('change', dim_cng);

	w_rec_freq = document.getElementById("rec_freq_opt");
	w_rec_freq.addEventListener('change', upd_all);
	w_meas_len = document.getElementById("meas_len_opt");
	w_meas_len.addEventListener('change', upd_all);
	w_const_spd = document.getElementById("const_spd_opt");
	w_const_spd.addEventListener('change', upd_all);
	w_calib_f = document.getElementById("calib_f_opt");
	w_calib_f.addEventListener('change', upd_all);

	w_igrf_13 = document.getElementById("igrf_13_opt");
	w_igrf_13.addEventListener('change', upd_all);
	w_accel_use = document.getElementById("accel_use_opt");
	w_accel_use.addEventListener('change', upd_all);
	w_default_lat = document.getElementById("default_lat_opt");
	w_default_lat.addEventListener('change', upd_all);
	w_default_lon = document.getElementById("default_lon_opt");
	w_default_lon.addEventListener('change', upd_all);

	w_default_ele = document.getElementById("default_ele_opt");
	w_default_ele.addEventListener('change', upd_all);

	w_data_format = document.getElementById("data_format_opt");
	w_data_format.addEventListener('change', upd_all);

	w_igrf_13_val = document.getElementById("igrf_13_val_opt");
	w_igrf_13_val.addEventListener('change', upd_all);
	track_name = document.getElementById("track_name_opt");
	track_name.addEventListener('change', upd_all);
}