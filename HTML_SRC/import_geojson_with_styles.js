//watcher function for seacraft file reading
var geojson_with_styles_file = [];

document.querySelector("#geojson_with_styles_file").addEventListener('change', function() {
	// files that user has chosen
	var all_files = this.files;
	if(all_files.length == 0) {
		notification.alert(plan_lng("ch_alert"), plan_lng("geojson_no_file"));
		Pbar_Hide();
		return;
	}

	// first file selected by user
	var file = all_files[0];

	// files types allowed
	var allowed_name = "";
  
  allowed_name = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);
	if(allowed_name != "geojson") {
		notification.alert(plan_lng("ch_alert"), plan_lng("geojson_bad_ext_file"));
		Pbar_Hide();
		return;
	}

	// Max 30 MB allowed
	var max_size_allowed = 30*1024*1024
	if(file.size > max_size_allowed) {
		notification.alert(plan_lng("ch_alert"), plan_lng("geojson_big_file"));
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
		geojson_styled_import(e, 0);
	});

	// file reading failed
	reader.addEventListener('error', function() {
		notification.alert(plan_lng("ch_alert"), plan_lng("geojson_bad_file"));
        Pbar_Hide();
	});

	// read as text file
	reader.readAsText(file);
});

function geojson_styled_import(e, type){
	//Show progress bar
	Pbar_Show();
	setTimeout(function() {
		//geojson_with_styles_file = [];
		if(type == 0){
			geojson_with_styles_file = e.target.result;
		}
		if(type == 1){
			geojson_with_styles_file = e;
		}
		
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
				if (layers[i].feature.properties.name != undefined && layers[i].feature.properties.markerType == undefined){
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
				//create markers with custom shapes
				if(layers[i].feature.properties.markerType != undefined){
					marker_custom_shape([layers[i].feature.geometry.coordinates[1],layers[i].feature.geometry.coordinates[0]], layers[i].feature.properties.markerType, layers[i].feature.properties.name);
					map_editor.removeLayer(layers[i]);
				}
				//create markers with special icons
				if(layers[i].feature.properties.markerOptions != undefined){
					if(layers[i].feature.properties.markerOptions.iconBase != undefined){
					
						var Icon = L.icon({
							iconUrl: layers[i].feature.properties.markerOptions.iconUrl,
							iconSize: [25, 41],
							iconAnchor: [12, 30],
							iconBase: "true",
						});
						new L.marker([layers[i].feature.geometry.coordinates[1],layers[i].feature.geometry.coordinates[0]], {icon: Icon}).addTo(map_editor);
						map_editor.removeLayer(layers[i]);
					}
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
}