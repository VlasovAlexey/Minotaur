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