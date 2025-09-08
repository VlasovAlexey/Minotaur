//show hide ariane import custom properties
function draw_custom_ariane(){
  if(ariane_status == 1){
    document.getElementsByClassName('input_path_create_ariane')[0].style.display = 'none';
  } else {
    document.getElementsByClassName('input_path_create_ariane')[0].style.display = 'block';
  }
}

//create custom properties window
L.window = L.Control.extend({
  options: {
      position: 'topcenter'
  },
  onAdd: function (map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      
      //disable touch and zoom on window
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      //window class and id
      container.className = "input_path_create_ariane";
      container.id = "input_path_create_ariane";
      var table_1 = '<table class="input_table_style"><thead><tr class="input_table_style"><td class="input_table_style" id="input_trs_ariane"></td></td></tr></thead></table>'
      var table_2 = `<table class="input_table_style"><thead><tr class="input_table_style"><td class="input_table_style" id="input_btn_apply_ariane"></td></tr></thead></table>`
      
      container.innerHTML = table_1 + table_2;
      //container.title = "Title";
      return container;
  },
  onRemove: function(map) {},

});
var control = new L.window();
control.addTo(map_editor);

//create all interface element inside created window
create_html_text("input_trs_ariane","opt_trs_ariane" ,"");
create_input_val_sign("input_trs_ariane", "opt_trs_ariane_input", parseFloat(document.getElementById("trs_main_val_opt").value.replace("," , ".")));

document.getElementsByClassName('input_path_create_ariane')[0].style.display = 'none';

w_input_trs_ariane = document.getElementById("opt_trs_ariane_input");
w_input_trs_ariane.addEventListener('change', upd_trs_total_ariane);

function upd_trs_total_ariane(){
	document.getElementById("trs_main_val_opt").value = parseFloat(document.getElementById("opt_trs_ariane_input").value.replace("," , "."));
	upd_all_no_lang();
}

//watcher function for Ariane tml file reading
var ariane_tml_file = [];
function onTMLload(fileInput) {
	if(fileInput.files[0] == undefined) {
		//file is not selected
		notification.alert(plan_lng("ch_alert"), plan_lng("tml_no_file"));
		Pbar_Hide();
		return;
	}

	// Max 30 MB allowed
	var max_size_allowed = 30*1024*1024
	if(fileInput.files[0].size > max_size_allowed) {
		notification.alert(plan_lng("ch_alert"), plan_lng("tml_big_file"));
		Pbar_Hide();
		return;
	}

	allowed_name = fileInput.files[0].name.slice((Math.max(0, fileInput.files[0].name.lastIndexOf(".")) || Infinity) + 1);
	if(allowed_name != "tml") {
		notification.alert(plan_lng("ch_alert"), plan_lng("tml_bad_ext_file"));
		Pbar_Hide();
		return;
	}

	var reader = new FileReader();
	reader.onload = function(ev) {
		JSZip.loadAsync(ev.target.result).then(function(zip) {
			zip.file("Data.xml").async("string").then(function(data) {
				// data is a string
				ariane_tml_file = new XML.ObjTree().parseXML(data);
				
				//create lines if exist
				var xy_arr = [];
				var z_arr =[];
				var xyz_arr = [];

				var id_color_arr = [];
				var id_tp, x_tp, y_tp, z_tp, id_current_tp;
				
				for (i = 0; i < ariane_tml_file.CaveFile.Data.SurveyData.length; i++) {
					id_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].FromID;
					id_current_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].ID;
					color_tp = ariane_tml_file.CaveFile.Data.SurveyData[i].Color;
					if(i == 0){
						//first station and we need get lat lng start
						//and push to line array
						x_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Latitude;
						y_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Longitude;
						z_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Depth;
						
						xy_arr.push([x_tp , y_tp]);
						z_arr.push(z_tp);
						xyz_arr.push([x_tp , y_tp , z_tp]);

						color_tp = color_tp.slice(2);
						color_tp = color_tp.slice(0,6);
						id_color_arr.push([ id_tp, "#" + color_tp]);

						//if not exist or 0.0 we use default
						if(x_tp == 0.0 && y_tp == 0.0){
							var lat_tp = parseFloat(document.getElementById("default_lat_opt").value.replace("," , "."));
							var lon_tp = parseFloat(document.getElementById("default_lon_opt").value.replace("," , "."));
							var z_tp = parseFloat(document.getElementById("default_ele_opt").value.replace("," , "."));
							
							xy_arr.push([lat_tp , lon_tp]);
							z_arr.push(z_tp);
							xyz_arr.push([lat_tp , lon_tp , z_tp]);
						}
					} else {
						//all other stations
						x_tp = xyz_arr[id_tp][0];
						y_tp = xyz_arr[id_tp][1];

						z_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Depth;
						distance_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Length;
						if(distance_tp <= 0.0){distance_tp = 0.01};
						heading_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Azimut;

						var lat_new_tmp = destinationPoint(x_tp, y_tp, distance_tp , heading_tp).lat;
						var lon_new_tmp = destinationPoint(x_tp, y_tp, distance_tp , heading_tp).lon;
		
						xy_arr.push([lat_new_tmp , lon_new_tmp]);
						z_arr.push(z_tp);
						xyz_arr.push([lat_new_tmp , lon_new_tmp , z_tp]);

						color_tp = color_tp.slice(2);
						color_tp = color_tp.slice(0,6);
						id_color_arr.push([ id_tp, "#" + color_tp]);
					}
				}
				//create markers from pale marks if exist
				for (i = 0; i < ariane_tml_file.CaveFile.Data.SurveyData.length; i++) {

					if(ariane_tml_file.CaveFile.Data.SurveyData[i].Comment != undefined){
						//marker with comments and depth
						var depth_text = ariane_tml_file.CaveFile.Data.SurveyData[i].Comment + ":" + String(Math.abs(Math.round((1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Depth) * 100) / 100));
						new Marker3d(xy_arr[i], marker_3d_prop(depth_text + plan_lng("ch_mtr"), depth_text)).addTo(map_editor);
					} else {
						//only depth marker
						var depth_text = String(Math.abs(Math.round((1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Depth) * 100) / 100));
						new Marker3d(xy_arr[i], marker_3d_prop(depth_text + plan_lng("ch_mtr"), depth_text)).addTo(map_editor);
					}
				}

				//filter array before draw
				var xy_arr = [];
				var z_arr =[];
				var filtered_xyz_arr = filterPoints(xyz_arr, (parseFloat(document.getElementById("opt_trs_ariane_input").value.replace("," , "."))));
				for (i = 0; i < filtered_xyz_arr.length-1; i++) {
					xy_arr.push([filtered_xyz_arr[i][0] , filtered_xyz_arr[i][1]]);
					z_arr.push(filtered_xyz_arr[i][2]);
				}

				//add loaded data to map editor
				add_line_arr(xy_arr, "#ff7800", 5, z_arr, "false", id_color_arr);

				//finish loading file
				map_editor.toggleFullscreen();
				Pbar_Hide();
			})
			$("#ariane_tml_file")[0].value = "";
		}).catch(function(err) {
			//bad file or file structure
			notification.alert(plan_lng("ch_alert"), plan_lng("bad_file_format"));
        	Pbar_Hide();
			return;
		})
	};
	reader.onerror = function(err) {
		//bad file format
		notification.alert(plan_lng("ch_alert"), plan_lng("tml_bad_file"));
        Pbar_Hide();
	}
	reader.readAsArrayBuffer(fileInput.files[0]);
}
