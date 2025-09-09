function seacraft_add_path(){
  if(seacraft_status == 1){
    document.getElementsByClassName('input_center_map_editor_seacraft')[0].style.display = 'none';
    document.getElementsByClassName('input_create_seacraft')[0].style.display = 'none';
  } else {
    //seacraft_map_editor();
    document.getElementsByClassName('input_create_seacraft')[0].style.display = 'block';
    document.getElementsByClassName('input_center_map_editor_seacraft')[0].style.display = 'block';
  }
}

//add map center picker
L.marker_center = L.Control.extend({
  options: {
      position: 'middlecenter'
  },
  onAdd: function (map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      container.className = "input_center_map_editor_seacraft";
      container.id = "input_center_map_editor_seacraft";
      container.innerHTML = `<div style="color:#ee0000; font-size: 40px;">☉</div>`;
      //container.title = "Title";
      return container;
  },
  onRemove: function(map) {},
  
});
var control = new L.marker_center();
control.addTo(map_editor);

//add window with picker, lat and lon and button
L.window = L.Control.extend({
  options: {
      position: 'topcenter'
  },
  onAdd: function (map) {
      var container = L.DomUtil.create('div', 'leaflet-bar-seacraft leaflet-control-seacraft');
      
      //disable touch and zoom on window
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      //window class and id
      container.className = "input_create_seacraft";
      container.id = "input_create_seacraft";
      var table_1 = '<table class="input_table_style"><thead><tr class="input_table_style"><td class="input_table_style" id="input_path_lat_seacraft"></td><td class="input_table_style" id="input_path_lon_seacraft"></td></tr></thead></table>'
      var table_2 = `<table class="input_table_style"><thead><tr class="input_table_style"><td class="input_table_style" id="input_btn_coord_seacraft"></td></tr></thead></table>`
	  var table_3 = '<table class="input_table_style"><thead><tr class="input_table_style"><td class="input_table_style" id="trs_seacraft"></td></tr></thead></table>'
      container.innerHTML = table_3 + table_1 + table_2;
      //container.title = "Title";
      return container;
  },
  onRemove: function(map) {},

});
var control = new L.window();
control.addTo(map_editor);

//create all interface element inside created window
create_html_text("trs_seacraft","opt_trs_seacraft" ,"");
create_input_val_sign("trs_seacraft", "opt_input_trs_seacraft", parseFloat(document.getElementById("trs_main_val_opt").value.replace("," , ".")));
create_html_text("input_path_lat_seacraft","opt_line_lat_seacraft" ,"");
create_input_val_sign("input_path_lat_seacraft", "opt_input_create_lat_seacraft", document.getElementById("default_lat_opt").value);
create_html_text("input_path_lon_seacraft","opt_line_lon_seacraft" ,"");
create_input_val_sign("input_path_lon_seacraft", "opt_input_create_lon_seacraft", document.getElementById("default_lon_opt").value);
create_html_button("input_btn_coord_seacraft", "opt_button_get_coord_seacraft", "get_data_from_center_map_editor();")

document.getElementsByClassName('input_create_seacraft')[0].style.display = 'none';
document.getElementsByClassName('input_center_map_editor_seacraft')[0].style.display = 'none';

w_opt_input_trs_seacraft = document.getElementById("opt_input_trs_seacraft");
w_opt_input_trs_seacraft.addEventListener('change', upd_trs_total_seacraft);

function upd_trs_total_seacraft(){
	document.getElementById("trs_main_val_opt").value = parseFloat(document.getElementById("opt_input_trs_seacraft").value.replace("," , "."));
	upd_all_no_lang();
}

//watcher function for seacraft file reading
var seacraft_csv_file = [];
document.querySelector("#seacraft_csv_file").addEventListener('change', function() {
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
			seacraft_csv_file = [];
        	seacraft_csv_file = e.target.result;
			
			if (seacraft_csv_file.indexOf("Date,Time,Pos3Dx,Pos3Dy,Pos3Dz,Course,Pitch,Roll,Distance,Speed,Temp,BattV") == -1){
				//wrong file
				notification.alert(plan_lng("ch_alert"), plan_lng("bad_file_format"));
        		Pbar_Hide();
				return;
			}

			seacraft_csv_file = seacraft_csv_file.split("\n");
			var data_start = 0;
			var xy_arr = [];
			var z_arr = [];
			var xyz_arr = [];
			var lat_tmp = parseFloat(document.getElementById("default_lat_opt").value.replace("," , "."));
			var lon_tmp = parseFloat(document.getElementById("default_lon_opt").value.replace("," , "."));

			for (i = 0; i < seacraft_csv_file.length-1; i++) {
				if (seacraft_csv_file[i].indexOf("Date,Time,Pos3Dx,Pos3Dy,Pos3Dz,Course,Pitch,Roll,Distance,Speed,Temp,BattV") != -1 ){
					data_start = 1;
					i = i + 1;
				}
				if (data_start == 1){
					var data = seacraft_csv_file[i].split(",");
					var distance_heading = xy_to_distance_heading(data[3], data[2]);

					var lat_new_tmp = destinationPoint(lat_tmp, lon_tmp, distance_heading[0] , distance_heading[1]).lat;
					var lon_new_tmp = destinationPoint(lat_tmp, lon_tmp, distance_heading[0] , distance_heading[1]).lon;
					
					if (lat_new_tmp == undefined || lon_new_tmp ==undefined){
						lat_new_tmp = lat_tmp;
						lon_new_tmp = lon_tmp;
					}
					xyz_arr.push([(lat_new_tmp) , (lon_new_tmp) , 1.0*data[4]]);
				}
			}
			
			//filter array before draw
			filtered_xyz_arr = filterPointsWindow(xyz_arr, (parseFloat(document.getElementById("opt_input_trs_seacraft").value.replace("," , "."))));
			for (i = 0; i < filtered_xyz_arr.length-1; i++) {
				xy_arr.push([filtered_xyz_arr[i][0] , filtered_xyz_arr[i][1]]);
				z_arr.push(filtered_xyz_arr[i][2]);
			}
			//add loaded data to map editor
			add_line_arr(xy_arr, "#ff7800", 5, z_arr, "true", undefined);

			//finish loading data to the map editor
			map_editor.toggleFullscreen();
			Pbar_Hide();
		}, 1000);
		$("#seacraft_csv_file")[0].value = "";
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

//convert 2d text coordinates to distance and heading values
function xy_to_distance_heading(x,y) {
	x = 1.0*x;
	y = 1.0*y;
	var distance = 0.0;
	var heading = 0.0;
	result = [];
	var x1 = Math.abs(x);
	var y1 = Math.abs(y);
	if(x>=0 && y>=0){
		heading = 90 - Math.atan(y1/x1)*(180/Math.PI);
	}
	if(x>=0 && y<0){
		heading = 90 + Math.atan(y1/x1)*(180/Math.PI);
	}
	if(x<0 && y<0){
		heading = 180 + (90 - Math.atan(y1/x1)*(180/Math.PI));
	}
	if(x<0 && y>=0){
		heading = 270 + Math.atan(y1/x1)*(180/Math.PI);
	}
	
	distance = Math.sqrt(Math.pow(x1,2) + Math.pow(y1,2));
	if(isNaN(distance)){distance = 0};
	if(isNaN(heading)){heading = 0};

	result.push(distance,heading);
	return (result);
}

