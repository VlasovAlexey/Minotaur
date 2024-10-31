//convert array to gpx text file
function arr_to_gpx(t_arr){
    var out_file = "";
    //start writing to gpx array data
	//Add header
	out_file = out_file + "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	out_file = out_file + "<gpx creator=\"Minotaur https://vlasovalexey.github.io/Minotaur/HTML_SRC/\" version=\"0.1\" xmlns=\"https://vlasovalexey.github.io/Minotaur/HTML_SRC/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"https://vlasovalexey.github.io/Minotaur/HTML_SRC/\">\n";
	out_file = out_file + " <metadata>\n <time>" + get_date() + "</time>\n </metadata>\n";
	out_file = out_file + " <trk>\n  <name>Minotaur_Track_" + get_date() + "</name>\n  <trkseg>\n";

    //main track data
    for (i = 0; i < t_arr.length; i++) {
        out_file = out_file + "    <trkpt lat=\"" + t_arr[i].x + "\" lon=\"" + t_arr[i].y + "\">\n";
		out_file = out_file + "     <ele>" + t_arr[i].z + "</ele>\n";
        //write all other data
		if(t_arr[i].course != undefined){out_file = out_file + "     <course>" + t_arr[i].course + "</course>\n";}
		out_file = out_file + "     <extensions>\n";
		if(t_arr[i].a != undefined){out_file = out_file + "      <orient_a>" + t_arr[i].a + "</orient_a>\n";}
		if(t_arr[i].b != undefined){out_file = out_file + "      <orient_b>" + t_arr[i].b + "</orient_b>\n";}
		if(t_arr[i].g != undefined){out_file = out_file + "      <orient_g>" + t_arr[i].g + "</orient_g>\n";}
		if(t_arr[i].meas != undefined){out_file = out_file + "      <meas_tick>" + t_arr[i].meas + "</meas_tick>\n";}
		if(t_arr[i].accel != undefined){out_file = out_file + t_arr[i].accel;}
        out_file = out_file + "     </extensions>\n";
		out_file = out_file + "    </trkpt>\n";
    }

    //closed  track info
	out_file = out_file + "  </trkseg>\n </trk>\n";
	//add two way points
	out_file = out_file + "    <wpt lat=\"" + t_arr[0].x + "\" lon=\"" + t_arr[0].y + "\">\n";
	out_file = out_file + "     <ele>" + t_arr[0].z + "</ele>\n";
	out_file = out_file + "     <name>Track Minotaur Start " + t_arr[0].x + ", " + t_arr[0].y + "</name>\n";
	out_file = out_file + "     <desc>Track Minotaur Start " + t_arr[0].x + ", " + t_arr[0].y + "</desc>\n";
	out_file = out_file + "    </wpt>\n";
	out_file = out_file + "    <wpt lat=\"" + t_arr[(t_arr.length-1)].x + "\" lon=\"" + t_arr[(t_arr.length-1)].y + "\">\n";	
	out_file = out_file + "     <ele>" + t_arr[(t_arr.length-1)].z + "</ele>\n";
	out_file = out_file + "     <name>Track Minotaur End " + t_arr[(t_arr.length-1)].x + ", " + t_arr[(t_arr.length-1)].y + "</name>\n";
	out_file = out_file + "     <desc>Track Minotaur End " + t_arr[(t_arr.length-1)].x + ", " + t_arr[(t_arr.length-1)].y + "</desc>\n";
	out_file = out_file + "    </wpt>\n";
	out_file = out_file + "    <extensions>\n";
	out_file = out_file + "     <speed>" + speed_reg + "</speed>\n";
		
	var rec_vls = document.getElementById("rec_freq_opt").value;
	if($("#data_format_opt").val() * 1.0 == 1){
        //regular GPS track
    	rec_vls = 1;
    }
	out_file = out_file + "     <freq>" + rec_vls + "</freq>\n";
	out_file = out_file + "     <meas_len>" + ((document.getElementById("meas_len_opt").value).replace(",", ".")) + "</meas_len>\n";
	out_file = out_file + "     <calib_f>" + ((document.getElementById("calib_f_opt").value).replace(",", ".")) + "</calib_f>\n";
	out_file = out_file + "    </extensions>\n";
	//end create gpx array
	out_file = out_file + "</gpx>\n";
    return out_file;
}