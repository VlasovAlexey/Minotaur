//watcher function for Ariane tml file reading
	//generate zip file example and save
	/*
	var zip = new JSZip();
	zip.file("hello.txt", "Hello World\n");
	zip.generateAsync({type:"blob"})
		.then(function (blob) {
    saveAs(blob, "hello.zip");
	});
	*/
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

				console.log(ariane_tml_file.CaveFile.Data.SurveyData);
				
				var xy_arr = [];
				var z_arr =[];
				var id_tp, x_tp, y_tp, z_tp;
				for (i = 0; i < ariane_tml_file.CaveFile.Data.SurveyData.length; i++) {
					
					if(i == 0){
						//first station and we need get lat lng start
						//and push to line array
						x_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Latitude;
						y_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Longitude;
						z_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Depth;
						xy_arr.push([x_tp , y_tp]);
						z_arr.push(z_tp);
						
						//if not exist or 0.0 we use default
						if(x_tp == 0.0 && y_tp == 0.0){
							var lat_tp = parseFloat(document.getElementById("default_lat_opt").value.replace("," , "."));
							var lon_tp = parseFloat(document.getElementById("default_lon_opt").value.replace("," , "."));
							var z_tp = parseFloat(document.getElementById("default_ele_opt").value.replace("," , "."));
							
							xy_arr.push([lat_tp , lon_tp]);
							z_arr.push(z_tp);
						}
					} else {
						//all other stations
						id_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].FromID;
						x_tp = xy_arr[id_tp][0];
						y_tp = xy_arr[id_tp][1];
						//z_tp = z_arr[id_tp];

						z_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Depth;
						distance_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Length;
						if(distance_tp <= 0.0){distance_tp = 0.1};
						heading_tp = 1.0*ariane_tml_file.CaveFile.Data.SurveyData[i].Azimut;

						var lat_new_tmp = destinationPoint(x_tp, y_tp, distance_tp , heading_tp).lat;
						var lon_new_tmp = destinationPoint(x_tp, y_tp, distance_tp , heading_tp).lon;
						xy_arr.push([lat_new_tmp , lon_new_tmp]);
						z_arr.push(z_tp);
					}
				}
				//add loaded data to map editor
				
				add_line_arr(xy_arr, "#ff7800", 5, z_arr, "false");

				//finish loading file
				//map_editor.toggleFullscreen();
				Pbar_Hide();
			})
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
