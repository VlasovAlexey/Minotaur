//watcher function for seacraft file reading
var seacraft_kml_file = [];
document.querySelector("#seacraft_kml_file").addEventListener('change', function() {
	//Show progress bar
	Pbar_Show();

	// files that user has chosen
	var all_files = this.files;
	if(all_files.length == 0) {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("kml_no_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
		Pbar_Hide();
		return;
	}

	// first file selected by user
	var file = all_files[0];

	// files types allowed
	var allowed_name = "";
  
  allowed_name = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);
	if(allowed_name != "kml") {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("kml_bad_ext_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
		Pbar_Hide();
		return;
	}

	// Max 30 MB allowed
	var max_size_allowed = 30*1024*1024
	if(file.size > max_size_allowed) {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("kml_big_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
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
			// data is a string
			seacraft_kml_file = e.target.result;
			if (seacraft_kml_file.indexOf("<styleUrl>#MainLine</styleUrl>") == -1){
				//wrong file
				del_html_elem("tn_overlay_text");
				create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("bad_file_format"));
				document.getElementById("AlertOverlay").style.height = "100%";
				document.getElementById("AlertOverlay").style.opacity = "1";
        		Pbar_Hide();
				return;
			}
			seacraft_kml_file = new XML.ObjTree();
			seacraft_kml_file = seacraft_kml_file.parseXML(e.target.result);
			
			//read and create Placemarks if exist
			for (i = 0; i < seacraft_kml_file.Document.Placemark.length; i++) {
				if(seacraft_kml_file.Document.Placemark[i].styleUrl == "#SpecialPointF" || seacraft_kml_file.Document.Placemark[i].styleUrl == "#SpecialPointR"){
					var coord = String(seacraft_kml_file.Document.Placemark[i].Point.coordinates).split(",");
					var pls_text_depth = seacraft_kml_file.Document.Placemark[i].name.split(" ");
					pls_text_depth = pls_text_depth[0] + String(Math.abs(Math.round((1.0*coord[2]) * 100) / 100));
					var depth_text = String(Math.abs(Math.round((1.0*coord[2]) * 100) / 100))
					new Marker3d([coord[1],coord[0]], {
						textMarker: true,
						text: pls_text_depth + plan_lng("ch_mtr"),
						textMarkerCentered: true,
						depth: depth_text
					}).addTo(map_editor);
				}
			}

			//read and create lines if exist
			var xy_arr = [];
			var z_arr = [];
			for (i = 0; i < seacraft_kml_file.Document.Placemark.length; i++) {
				if(seacraft_kml_file.Document.Placemark[i].styleUrl == "#MainLine"){
					var a = seacraft_kml_file.Document.Placemark[i].Track["gx:coord"];
					for (s = 0; s < a.length-1; s++) {
						var coord = String(seacraft_kml_file.Document.Placemark[i].Track["gx:coord"][s]["#text"]).split(" ");
						xy_arr.push([(1.0*coord[1]) , (1.0*coord[0])]);
						z_arr.push((1.0*coord[2]));
					}
				}
			}

			//add loaded data to map editor
			add_line_arr(xy_arr, "#ff7800", 5, z_arr, "true");

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
