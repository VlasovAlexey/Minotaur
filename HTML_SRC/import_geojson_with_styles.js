//watcher function for seacraft file reading
var geojson_with_styles_file = [];
document.querySelector("#geojson_with_styles_file").addEventListener('change', function() {
	// files that user has chosen
	var all_files = this.files;
	if(all_files.length == 0) {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("geojson_no_file"));
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
	if(allowed_name != "geojson") {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("geojson_bad_ext_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
		Pbar_Hide();
		return;
	}

	// Max 30 MB allowed
	var max_size_allowed = 30*1024*1024
	if(file.size > max_size_allowed) {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("geojson_big_file"));
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
			//geojson_with_styles_file = [];
        	geojson_with_styles_file = e.target.result;
			
			//remove any \n or \r for GeoJSON compatibility
			geojson_with_styles_file = geojson_with_styles_file.replace(/(\r\n|\n|\r)/gm,"");
			//parse loaded text to json objects
			var json = JSON.parse(geojson_with_styles_file);
			var loaded_data = L.geoJson(json, {
				
				//assign styles to properties objects
				style: function (f) {
					return f.properties;
				},
        		onEachFeature: function (feature, my_Layer) {
					if (feature.properties.name != undefined){
						//my_Layer.bindTooltip(feature.properties.name, {permanent: true, direction: "top", className: "my-labels"}).openTooltip();
						//my_Layer.setOpacity
						//console.log(feature.geometry.coordinates[1]);
						L.marker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], {
							textMarker: true,
							text: feature.properties.name,
							textMarkerCentered: true,
						  }).addTo(map_editor);

						  //my_Layer.removeFrom(map_editor);
					}
            		//my_Layer.bindPopup("ID : "+feature.properties.id+"<br />Name : "+feature.properties.name);
        		}
			}).addTo(map_editor);
			
			var layers = loaded_data.getLayers();
			//console.log(layers);
			for (var i = 0; i < layers.length; i++) {
				if (layers[i].feature.properties.name != undefined){
					map_editor.removeLayer(layers[i]);
				}
				//layers[i].feature.properties.name = "text";
				//layers[i].feature.properties.name = "text";
			}
				//added labels if exist
				/*L.geoJson(json, {
					onEachFeature: function (feature, layer) {
	
						if (feature.properties.name != undefined){
							layer.bindTooltip(feature.properties.name, {permanent: true, direction: "center", className: "my-labels"}).openTooltip();
						}
						
					}
				  }).addTo(map_editor);
				*/

			map_editor.fitBounds(loaded_data.getBounds());

			//Hide progress bar
			Pbar_Hide();
		}, 1000);
	});

	// file reading failed
	reader.addEventListener('error', function() {
	    del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("geojson_bad_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
        Pbar_Hide();
	});

	// read as text file
	reader.readAsText(file);
});
