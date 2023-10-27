var lngs_usr = 1;
var dmns_usr = 1;
var color_usr = 1;

var rec_freq_usr = 1;
var meas_len_usr = "2,11";
var const_spd_usr = "1,4925373134";
var calib_f_usr = "0,0";

var igrf_13_usr = 1;
var accel_use_usr = 1;
var default_lat_usr = "47,4946796";
var default_lon_usr = "19,0272695";

function default_set() {
	lngs_usr = 1;
	dmns_usr = 1;
	color_usr = 1;

	rec_freq_usr = 1;
	meas_len_usr = "2,11";
	const_spd_usr = "1,4925373134";
	calib_f_usr = "0,0";

	igrf_13_usr = 1;
	accel_use_usr = 1;
	default_lat_usr = "47,4946796";
	default_lon_usr = "19,0272695";
}

var lng_arr = [{
		text: "English",
		id: "tn_english",
		isdisable: "enabled"
	},
	{
		text: "Русский",
		id: "tn_russia",
		isdisable: "enabled"
	},
	{
		text: "Español",
		id: "tn_portuguese",
		isdisable: "enabled"
	},
	{
		text: "Português",
		id: "tn_port",
		isdisable: "enabled"
	},
	{
		text: "中文",
		id: "tn_china",
		isdisable: "enabled"
	},
	{
		text: "Български",
		id: "tn_bu",
		isdisable: "enabled"
	},
	{
		text: "Français",
		id: "tn_fr",
		isdisable: "enabled"
	},
	{
		text: "한국어",
		id: "tn_kr",
		isdisable: "enabled"
	},
	{
		text: "Italiano",
		id: "tn_it",
		isdisable: "enabled"
	}
];
var dmns_arr = [{
		text: "Meters/Liters/Bar.",
		id: "tn_dmn_mtr",
		isdisable: "enabled"
	},
	{
		text: "Feet/Cu.Feet/PSI",
		id: "tn_dmn_imp",
		isdisable: "disabled"
	}
];
var color_arr = [{
		text: "Dark Theme",
		id: "tn_color_dark",
		isdisable: "enabled"
	},
	{
		text: "Light Theme",
		id: "tn_color_light",
		isdisable: "enabled"
	}
];
var igrf_13_arr = [{
	text: "igrf_13_yes",
	id: "tn_igrf_13_yes",
	isdisable: "enabled"
},
{
	text: "igrf_13_no",
	id: "tn_igrf_13_no",
	isdisable: "enabled"
}
];
var accel_use_arr = [{
	text: "accel_use_yes",
	id: "tn_accel_use_yes",
	isdisable: "enabled"
},
{
	text: "accel_use_no",
	id: "tn_accel_use_no",
	isdisable: "enabled"
}
];

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
}

function return_idx(html_ids) {
	tmp4 = document.getElementById(html_ids);
	idx_me = tmp4.options[tmp4.selectedIndex].value;
	return idx_me;
}

function return_val(html_ids) {
	tmp5 = document.getElementById(html_ids);
	val_me = tmp5.value;
	return val_me;
}

//settings doesn`t saved ad it is first start. it will be saved now
if (getCookie("default_lon_usr1") == undefined) {
	//need explanation for me. If uncomment below line all is don`t work on Android
	//upd_all();
	//console.log("cookie not found!");
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

	igfr_13 = $("#igrf_13_opt").val();
	accel_use = $("#accel_use_opt").val();
	default_lat = $("#default_lat_opt").val();
	default_lon = $("#default_lon_opt").val();
	
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
	create_option("tr_rec_freq", "rec_freq_opt", 1, 10, rec_freq_usr, 1, 0, "none");
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
	create_input_val("tr_default_lat", "default_lat_opt", default_lat_usr);
	del_html_elem("tr_default_lon");
	create_input_val("tr_default_lon", "default_lon_opt", default_lon_usr);
	
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
}

create_custom_option_arr("tr_lng_sel", "tn_lng", lngs_usr, lng_arr);
create_custom_option_arr("tr_dmn_sel", "tn_dmn", dmns_usr, dmns_arr);
create_custom_option_arr("tn_ifc_set", "tn_color", color_usr, color_arr);

create_option("tr_rec_freq", "rec_freq_opt", 1, 10, rec_freq_usr, 1, 0, "none");
create_input_val("tr_meas_len", "meas_len_opt", meas_len_usr);
create_input_val("tr_const_spd", "const_spd_opt", const_spd_usr);
create_input_val("tr_calib_f", "calib_f_opt", calib_f_usr);

create_custom_option_arr("tr_igrf_13", "igrf_13_opt", igrf_13_usr, igrf_13_arr);
create_custom_option_arr("tr_accel_use", "accel_use_opt", accel_use_usr, accel_use_arr);
create_input_val("tr_default_lat", "default_lat_opt", default_lat_usr);
create_input_val("tr_default_lon", "default_lon_opt", default_lon_usr);

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
}