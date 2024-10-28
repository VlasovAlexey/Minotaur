function arr_to_gpx(){
    GPX_File = "";
    //start writing to gpx array data
	//Add header
	GPX_File = GPX_File + "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	GPX_File = GPX_File + "<gpx creator=\"Minotaur https://vlasovalexey.github.io/Minotaur/HTML_SRC/\" version=\"0.1\" xmlns=\"https://vlasovalexey.github.io/Minotaur/HTML_SRC/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"https://vlasovalexey.github.io/Minotaur/HTML_SRC/\">\n";
	GPX_File = GPX_File + " <metadata>\n <time>" + get_date() + "</time>\n </metadata>\n";
	GPX_File = GPX_File + " <trk>\n  <name>Minotaur_Track_" + get_date() + "</name>\n  <trkseg>\n";

    //main track data
    for (i = 0; i < route_map_disp.length; i++) {
        GPX_File = GPX_File + "    <trkpt lat=\"" + route_map_disp[i][0] + "\" lon=\"" + route_map_disp[i][1] + "\">\n";
		GPX_File = GPX_File + "     <ele>" + route_map_disp[i][2] + "</ele>\n";
        //write all other data
		GPX_File = GPX_File + "     <course>" + route_map_disp[i][3] + "</course>\n";
		GPX_File = GPX_File + "     <extensions>\n";
		GPX_File = GPX_File + "      <orient_a>" + route_map_disp[i][4] + "</orient_a>\n";
		GPX_File = GPX_File + "      <orient_b>" + route_map_disp[i][5] + "</orient_b>\n";
		GPX_File = GPX_File + "      <orient_g>" + route_map_disp[i][6] + "</orient_g>\n";
		GPX_File = GPX_File + "      <meas_tick>" + route_map_disp[i][7] + "</meas_tick>\n";
        GPX_File = GPX_File + "     </extensions>\n";
		GPX_File = GPX_File + "    </trkpt>\n";
        GPX_File = GPX_File + route_map_disp[i][8];
    }

    //closed  track info
	GPX_File = GPX_File + "  </trkseg>\n </trk>\n";
	//add two way points
	GPX_File = GPX_File + "    <wpt lat=\"" + lat_start + "\" lon=\"" + lon_start + "\">\n";
	GPX_File = GPX_File + "     <ele>" + ele_start + "</ele>\n";
	GPX_File = GPX_File + "     <name>Track Minotaur Start " + lat_start + ", " + lon_start + "</name>\n";
	GPX_File = GPX_File + "     <desc>Track Minotaur Start " + lat_start + ", " + lon_start + "</desc>\n";
	GPX_File = GPX_File + "    </wpt>\n";
	GPX_File = GPX_File + "    <wpt lat=\"" + lat_end + "\" lon=\"" + lon_end + "\">\n";	
	if($("#data_format_opt").val() * 1.0 == 1){		
        //regular GPS file
		GPX_File = GPX_File + "     <ele>" + ele_end + "</ele>\n";
	} else {
		//constant speed DPV file other variations
		GPX_File = GPX_File + "     <ele>" + ele_reg_const + "</ele>\n";
	}
	GPX_File = GPX_File + "     <name>Track Minotaur End " + lat_end + ", " + lon_end + "</name>\n";
	GPX_File = GPX_File + "     <desc>Track Minotaur End " + lat_end + ", " + lon_end + "</desc>\n";
	GPX_File = GPX_File + "    </wpt>\n";
	GPX_File = GPX_File + "    <extensions>\n";
	GPX_File = GPX_File + "     <speed>" + speed_reg + "</speed>\n";
		
	var rec_vls = document.getElementById("rec_freq_opt").value;
	if($("#data_format_opt").val() * 1.0 == 1){
        //regular GPS track
    	rec_vls = 1;
    }
    
	GPX_File = GPX_File + "     <freq>" + rec_vls + "</freq>\n";
	GPX_File = GPX_File + "     <meas_len>" + ((document.getElementById("meas_len_opt").value).replace(",", ".")) + "</meas_len>\n";
	GPX_File = GPX_File + "     <calib_f>" + ((document.getElementById("calib_f_opt").value).replace(",", ".")) + "</calib_f>\n";
	GPX_File = GPX_File + "    </extensions>\n";
	//end create gpx array
	GPX_File = GPX_File + "</gpx>\n";
    return GPX_File;
}