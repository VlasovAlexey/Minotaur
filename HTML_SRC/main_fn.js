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
	//element_id_hide("6-header");
	element_id_hide("8-header");
	element_id_hide("9-header");
	
	element_id_hide("11-header");
	element_id_hide("td_warn_div");

	//hide not used now elements from GUI but later may be enabled
	element_id_hide("tn_meas_len");
	element_id_hide("tr_meas_len");
	element_id_hide("tn_calib_f");
	element_id_hide("tr_calib_f");
}
hide_unused_elements();