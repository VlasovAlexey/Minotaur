//watcher function for seacraft file reading
var geojson_with_styles_file = [];

//combiner for 3d marker properties
function marker_3d_prop(text, depth){
	var i = {depth: depth};
	if(depth == undefined){i = {}}
	var ret = {
		textMarker: true,
		text: text,
		textMarkerCentered: true,
		i,
		//context menu assign default disable
		contextmenu: false,
		contextmenuItems: [{
			text: text,
			index: 0
		}, {
			separator: true,
			index: 1
		}]
	}
	return ret;
}

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
							layer_styling(layer, true);
						}
					});
        		}
			}).addTo(map_editor);
			
			var layers = loaded_data.getLayers();
			//console.log(layers);
			for (var i = 0; i < layers.length; i++) {
					//setup loaded markers
					if (layers[i].feature.properties.name != undefined){
						if (layers[i].feature.properties.depth != undefined){
							if(layers[i].feature.properties.name.search(":") != -1){
								//markers with additional info and depth
								var new_txt = layers[i].feature.properties.name.split(":");
								var text = new_txt[0] + ":" + layers[i].feature.properties.depth + plan_lng("ch_mtr")
								var depth = layers[i].feature.properties.depth;
								marker = L.marker([layers[i].feature.geometry.coordinates[1],layers[i].feature.geometry.coordinates[0]],
									marker_3d_prop(text, depth)
								).addTo(map_editor);
							} else {
								//marker with depth
								var text = layers[i].feature.properties.depth + plan_lng("ch_mtr");
								var depth = layers[i].feature.properties.depth;
								marker = L.marker([layers[i].feature.geometry.coordinates[1],layers[i].feature.geometry.coordinates[0]], 
									marker_3d_prop(text, depth)
								).addTo(map_editor);
							}
						} else {
							//marker without depth only with text info
							marker = L.marker([layers[i].feature.geometry.coordinates[1],layers[i].feature.geometry.coordinates[0]],
								marker_3d_prop(layers[i].feature.properties.name, undefined),
							).addTo(map_editor);
						}
						//marker.bindTooltip(feature.properties.name, {permanent: true, direction: "top", className: "my-labels"}).openTooltip();
						//marker.bindPopup("LatLon : "+ feature.geometry.coordinates +"<br />Name : "+feature.properties.name);
						//marker.removeFrom(map_editor);
					}
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

//
function layer_styling(layer,is_polygon){
	//layer styling on click
	if(style_line_edit_mode == 1){
		if(newStyle == 1){
			layer.setStyle({
				weight: 3,
			});	
		}
		if(newStyle == 2){
			layer.setStyle({
				weight: 5,
			});
		}
		if(newStyle == 3){
			layer.setStyle({
				weight: 8,
			});	
		}
		if(newStyle == 4){
			layer.setStyle({
				opacity: 1,
				dashArray: '10000',
			});	
		}
		if(newStyle == 5){
			layer.setStyle({
				opacity: 1,
				dashArray: '0 8 0',
			});	
		}
		if(newStyle == 6){
			layer.setStyle({
				opacity: 1,
				dashArray: '0 0 0 8',
			});	
		}
		if(newStyle == 7){
			if (layer instanceof L.Polygon) {
				layer.setStyle({
					opacity: 0,
				});	
			}
		}
	}

	// Check if the clicked layer is a polygon or polyline
	if(color_edit_mode == 1){
		var clr = idx_color_to_color(newColor);
		if(is_polygon == true){
			layer.setStyle({
				color: clr,
				//fillOpacity: 0.25,
				fillColor: clr
			});
		} else {
			layer.setStyle({
				color: clr,
			});
		}
		  
	}
	//layer ordering
	if(layer_style_edit_mode == 1){
		if(LayerOrder == 1){
			//bring to front selected layer function
			if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) { layer.bringToFront();}
		}
		if(LayerOrder == 2){
			//bring to front selected layer function
			  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) { layer.bringToBack();}
		}
	};
}