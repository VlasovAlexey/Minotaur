
//watcher function for seacraft file reading
var ariane_csv_file = [];
document.querySelector("#ariane_csv_file").addEventListener('change', function() {
	//Show progress bar
	Pbar_Show();
	
	// files that user has chosen
	var all_files = this.files;
	if(all_files.length == 0) {
		notification.alert(plan_lng("ch_alert"), plan_lng("csv_no_file"));
		Pbar_Hide();
		return;
	}

	// first file selected by user
	var file = all_files[0];

	// files types allowed
	var allowed_name = "";
  
  allowed_name = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);
	if(allowed_name != "csv") {
		notification.alert(plan_lng("ch_alert"), plan_lng("csv_bad_ext_file"));
		Pbar_Hide();
		return;
	}

	// Max 30 MB allowed
	var max_size_allowed = 30*1024*1024
	if(file.size > max_size_allowed) {
		notification.alert(plan_lng("ch_alert"), plan_lng("csv_big_file"));
		Pbar_Hide();
		return;
	}

	// file validation is successful
	// we will now read the file
	var reader = new FileReader();

	// file reading started
	reader.addEventListener('loadstart', function() {
	    //document.querySelector("#file-input-label").style.display = 'none'; 
	});

	// file reading finished successfully
	reader.addEventListener('load', function(e) {
		setTimeout(function() {
			ariane_csv_file = [];
        	ariane_csv_file = e.target.result;
			
			//search for right format marker
			if (ariane_csv_file.indexOf("StationID;Longitude(DD);Latitude(DD);Elevation(m);") != -1) {
				//all is ok and truing read
				var pos_start = -1;
				var pos_old = 0
				var xy_arr = [];
				var z_arr = [];
				while ((pos_start = ariane_csv_file.indexOf("\n", pos_start + 1)) != -1) {
					var tmp = ariane_csv_file.slice(pos_old, pos_start - 1).split(";");
					//skip first line element
					if(pos_old != 0){
						xy_arr.push([(1.0*tmp[2]),(1.0*tmp[1])]);
						z_arr.push((1.0*tmp[3]));

						//add markers with depth postfix
						var depth_text = String(Math.abs(Math.round((1.0*tmp[3]) * 100) / 100));
						new Marker3d([(1.0*tmp[2]),(1.0*tmp[1])], marker_3d_prop(depth_text + plan_lng("ch_mtr"), depth_text)).addTo(map_editor);
						//WARNING! Lat Lon inverted for GeoJSON!
						//xy_arr_inv.push([(1.0*tmp[1]),(1.0*tmp[2])]);
					}				
					pos_old = pos_start + 1;
				}

				//add loaded data to map editor
				add_line_arr(xy_arr, "#ff7800", 5, z_arr, "false");

				//finish loading data to the map editor
				map_editor.toggleFullscreen();
				Pbar_Hide();

			} else {
				//bad format
				notification.alert(plan_lng("ch_alert"), plan_lng("bad_file_format"));
				Pbar_Hide();
			}
			
		}, 1000);
	});

	// file reading failed
	reader.addEventListener('error', function() {
	    notification.alert(plan_lng("ch_alert"), plan_lng("csv_bad_file"));
        Pbar_Hide();
	});

	// read as text file
	reader.readAsText(file);
});

