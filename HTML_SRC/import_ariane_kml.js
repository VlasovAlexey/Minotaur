//watcher function for seacraft file reading
var ariane_kml_file = [];
document.querySelector("#ariane_kml_file").addEventListener('change', function() {
	//Show progress bar
	Pbar_Show();
	// files that user has chosen
	var all_files = this.files;
	if(all_files.length == 0) {
		notification.alert(plan_lng("ch_alert"), plan_lng("kml_no_file"));
		Pbar_Hide();
		return;
	}

	// first file selected by user
	var file = all_files[0];

	// files types allowed
	var allowed_name = "";
  
  allowed_name = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);
	if(allowed_name != "kml") {
		notification.alert(plan_lng("ch_alert"), plan_lng("kml_bad_ext_file"));
		Pbar_Hide();
		return;
	}

	// Max 30 MB allowed
	var max_size_allowed = 30*1024*1024
	if(file.size > max_size_allowed) {
		notification.alert(plan_lng("ch_alert"), plan_lng("kml_big_file"));
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
        	ariane_kml_file = e.target.result;
			if (ariane_kml_file.indexOf("</Folder></Document></kml>") == -1){
				//wrong file
				notification.alert(plan_lng("ch_alert"), plan_lng("kml_bad_file"));
        		Pbar_Hide();
				return;
			}

			ariane_kml_file = new XML.ObjTree();
			ariane_kml_file = ariane_kml_file.parseXML(e.target.result);

			//create placemarks if exist
			for (i = 0; i < ariane_kml_file.kml.Document.Folder.length; i++) {
				if(ariane_kml_file.kml.Document.Folder[i].name == "Stations") {
					for (f = 0; f < ariane_kml_file.kml.Document.Folder[i].Placemark.length; f++) {
						if(ariane_kml_file.kml.Document.Folder[i].Placemark[f].Point != undefined){
							var coord = String(ariane_kml_file.kml.Document.Folder[i].Placemark[f].Point.coordinates).split(",");
							var pls_text_depth = ariane_kml_file.kml.Document.Folder[i].Placemark[f].name + ":" + String(Math.abs(Math.round((1.0*coord[2]) * 100) / 100));
							var depth_text = String(Math.abs(Math.round((1.0*coord[2]) * 100) / 100))
							new Marker3d([coord[1],coord[0]], marker_3d_prop(pls_text_depth + plan_lng("ch_mtr"), depth_text)).addTo(map_editor);
						}
					}
				}
			}

			//create lines if exist
			var xy_arr = [];
			var z_arr =[]
			//all is fine
			for (i = 0; i < ariane_kml_file.kml.Document.Folder.length; i++) {
				if(ariane_kml_file.kml.Document.Folder[i].name == "Line") {
					for (f = 0; f < ariane_kml_file.kml.Document.Folder[i].Placemark.length; f++) {
						if(ariane_kml_file.kml.Document.Folder[i].Placemark[f].LineString.coordinates != undefined){
							var coord = ariane_kml_file.kml.Document.Folder[i].Placemark[f].LineString.coordinates.split(" ");
							for (s = 0; s < coord.length-1; s++){
								var coord1 = coord[s].split(",");
								xy_arr.push([(1.0*coord1[1]) , (1.0*coord1[0])]);
								z_arr.push((1.0*coord[2]));
								/*
								L.polyline([xy_arr] , {
									color: "red",
									weight: 5,
								}).addTo(map_editor);
								*/
								//xy_arr = [];	
							}
						}
					}
				}
			}
			//add loaded data to map editor
			add_line_arr(xy_arr, "#ff7800", 5, z_arr, "false");

			//Hide progress bar
			Pbar_Hide();	
				
		}, 1000);
	});

	// file reading failed
	reader.addEventListener('error', function() {
	    del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("kml_bad_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
        Pbar_Hide();
	});

	// read as text file
	reader.readAsText(file);
});

