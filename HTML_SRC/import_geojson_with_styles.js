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
			var marker = [];
			var loaded_data = L.geoJson(json, {
				
				//assign styles to properties objects
				style: function (f) {
					return f.properties;
				},
				//assign function for color changing
        		onEachFeature: function (feature, layer) {
					layer.on({  
						click: function(e){
    						// Check if the clicked layer is a polygon or polyline
    						if(color_edit_mode == 1){
        						var clr = idx_color_to_color(newColor);
			  					layer.setStyle({
									//weight: 2,
									//opacity: 1,
									color: clr,
									//dashArray: '',
									//fillOpacity: 0.25,
									fillColor: clr
								});
    						}
						  //bring to front selected layer function
						  //if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) { layer.bringToFront();}
						}
					  });
					//setup loaded markers
					if (feature.properties.name != undefined){
						if (feature.properties.depth != undefined){
							if(feature.properties.name.search(":") != -1){
								//markers with additional info and depth
								var new_txt = feature.properties.name.split(":");
								marker = L.marker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], {
									textMarker: true,
									text: new_txt[0] + ":" + feature.properties.depth + plan_lng("ch_mtr"),
									textMarkerCentered: true,
									depth: feature.properties.depth
								}).addTo(map_editor);
							} else {
								//marker with depth
								marker = L.marker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], {
									textMarker: true,
									text: feature.properties.depth + plan_lng("ch_mtr"),
									textMarkerCentered: true,
									depth: feature.properties.depth
								}).addTo(map_editor);
							}
						} else {
							//marker without depth only with text info
							marker = L.marker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], {
								textMarker: true,
								text: feature.properties.name,
								textMarkerCentered: true,
							}).addTo(map_editor);
						}
						//marker.bindTooltip(feature.properties.name, {permanent: true, direction: "top", className: "my-labels"}).openTooltip();
						//marker.bindPopup("LatLon : "+ feature.geometry.coordinates +"<br />Name : "+feature.properties.name);
						//marker.removeFrom(map_editor);
					}
        		}
				//add styles changer
				//,onEachFeature: onEachFeatureClick,
			}).addTo(map_editor);
			
			var layers = loaded_data.getLayers();
			//console.log(layers);
			for (var i = 0; i < layers.length; i++) {
				if (layers[i].feature.properties.name != undefined){
					map_editor.removeLayer(layers[i]);
				}
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


