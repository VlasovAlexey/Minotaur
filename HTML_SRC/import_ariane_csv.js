//watcher function for seacraft file reading
var ariane_csv_file = [];
document.querySelector("#ariane_csv_file").addEventListener('change', function() {
	// files that user has chosen
	var all_files = this.files;
	if(all_files.length == 0) {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("csv_no_file"));
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
	if(allowed_name != "csv") {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("csv_bad_ext_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
		Pbar_Hide();
		return;
	}

	// Max 30 MB allowed
	var max_size_allowed = 30*1024*1024
	if(file.size > max_size_allowed) {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("csv_big_file"));
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
		//Show progress bar
		Pbar_Show();
		setTimeout(function() {
			ariane_csv_file = [];
        	ariane_csv_file = e.target.result;
			
			//search for right format marker
			if (ariane_csv_file.indexOf("StationID;Longitude(DD);Latitude(DD);Elevation(m);") != -1) {
				//all is ok and truing read
				var pos_start = -1;
				var pos_old = 0
				var xy_arr = [];
				var xy_arr_inv = [];
				while ((pos_start = ariane_csv_file.indexOf("\n", pos_start + 1)) != -1) {
					var tmp = ariane_csv_file.slice(pos_old, pos_start - 1).split(";");
					//skip first line element
					if(pos_old != 0){
						xy_arr.push([(1.0*tmp[2]),(1.0*tmp[1])]);

						//WARNING! Lat Lon inverted for GeoJSON!
						xy_arr_inv.push([(1.0*tmp[1]),(1.0*tmp[2])]);
					}				
					pos_old = pos_start + 1
				}

				//build data for leaflet geojson layers
				var myLines = [];
				for (i = 0; i < xy_arr_inv.length - 1; i++) {
					myLines.push({
						"type": "LineString",
						"properties": {"color": "orange"},
						"coordinates": [xy_arr_inv[i] , xy_arr_inv[i + 1]]
					});
				}

				//highlight mouse over elements on the map
				var geojson;
				function highlightFeature(e) {
  					var layer = e.target;
  					layer.setStyle({
      					weight: 7,
      					color: '#ffffff',
      					fillOpacity: 0.99
  					});
  					layer.bringToFront();
				}

				function resetHighlight(e) {
					geojson.resetStyle(e.target);
				}

				function style(feature) {
    				return {
        				"color": "#ff7800",
						"weight": 5,
						"opacity": 0.99
    				};
				}
				
				function onEachFeature(feature, layer) {
  					layer.on({
      					mouseover: highlightFeature,
      					mouseout: resetHighlight
  					});
				}

				geojson = L.geoJson(myLines, {
  					style: style,
  					onEachFeature: onEachFeature
				}).addTo(map_editor);

				// zoom the map to the polygon after data loaded
				var fit_polygon = L.polyline([xy_arr], {color: 'red'}).addTo(map_editor);
				map_editor.fitBounds(fit_polygon.getBounds());
				fit_polygon.remove();
				
				//Hide progress bar
				Pbar_Hide();
			} else {
				//bad format
				del_html_elem("tn_overlay_text");
				create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("bad_file_format"));
				document.getElementById("AlertOverlay").style.height = "100%";
				document.getElementById("AlertOverlay").style.opacity = "1";
				Pbar_Hide();
			}
			
		}, 1000);
	});

	// file reading failed
	reader.addEventListener('error', function() {
	    del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("csv_bad_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
        Pbar_Hide();
	});

	// read as text file
	reader.readAsText(file);
});

