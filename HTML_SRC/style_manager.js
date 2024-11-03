//buttons default state to start
var record_state = 0;
var meas_state = 0;

//Load default Style
function CSSLoad(file) {
	var link = document.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
	link.setAttribute("href", file);
	document.getElementsByTagName("head")[0].appendChild(link);
}

// Apply selected style
function assign_css_style() {
	tn_cng_color = document.getElementById("tn_color");
	tn_color_idx = tn_cng_color.options[tn_cng_color.selectedIndex].value;


	if (tn_color_idx * 1.0 === 1) {
		CSSLoad("style_main.css?v01141811ds1ds13111345");
		document.getElementById("compass_svg").src = "compass_main.svg";
		if (record_state != 1) {
			document.getElementById("btn_rec").style.background = "url(rec_main.svg) no-repeat center center";
			document.getElementById("btn_rec").style.border = "6px solid #969696";
		}

		if (meas_state != 1) {
			document.getElementById("btn_meas").style.background = "url(meas_main.svg) no-repeat center center";
			document.getElementById("btn_meas").style.border = "6px solid #969696";
		}
	}
	if (tn_color_idx * 1.0 === 2) {
		CSSLoad("style_light.css?v511111041sd131sd31113");
		document.getElementById("compass_svg").src = "compass_light.svg";
		if (record_state != 1) {
			document.getElementById("btn_rec").style.background = "url(rec_light.svg) no-repeat center center";
			document.getElementById("btn_rec").style.border = "6px solid #000000";
		}

		if (meas_state != 1) {
			document.getElementById("btn_meas").style.background = "url(meas_light.svg) no-repeat center center";
			document.getElementById("btn_meas").style.border = "6px solid #000000";
		}
		
	}
}
assign_css_style();