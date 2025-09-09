//watcher function for seacraft file reading
var ariane_csv_file = [];
document.querySelector("#ariane_csv_file").addEventListener('change', function() {
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
			ariane_csv_file = [];
        	ariane_csv_file = e.target.result;
			
			//search for right format marker
			if (ariane_csv_file.indexOf("StationID;Longitude(DD);Latitude(DD);Elevation(m);") != -1) {
				//all is ok and truing read
				var pos_start = -1;
				var pos_old = 0
				var xy_arr = [];
				var z_arr = [];
				var xyz_arr = [];
				while ((pos_start = ariane_csv_file.indexOf("\n", pos_start + 1)) != -1) {
					var tmp = ariane_csv_file.slice(pos_old, pos_start - 1).split(";");
					//skip first line element
					if(pos_old != 0){
						//WARNING! Lat Lon inverted for GeoJSON!
						xyz_arr.push([(1.0*tmp[2]) , (1.0*tmp[1]) , (1.0*tmp[3])]);
					}				
					pos_old = pos_start + 1;
				}
				
				//filter array before draw
				var filtered_xyz_arr = filterPoints(xyz_arr, (parseFloat(document.getElementById("opt_trs_ariane_input").value.replace("," , "."))));
				for (i = 0; i < filtered_xyz_arr.length-1; i++) {
					xy_arr.push([filtered_xyz_arr[i][0] , filtered_xyz_arr[i][1]]);
					z_arr.push(filtered_xyz_arr[i][2]);
					
					//add markers with depth postfix
					var depth_text = String(Math.abs(Math.round((filtered_xyz_arr[i][2]) * 100) / 100));
					new Marker3d([(filtered_xyz_arr[i][0]),(filtered_xyz_arr[i][1])], marker_3d_prop(depth_text + plan_lng("ch_mtr"), depth_text)).addTo(map_editor);
				}
				//add loaded data to map editor
				add_line_arr(xy_arr, "#ff7800", 5, z_arr, "false", undefined);

				//finish loading data to the map editor
				map_editor.toggleFullscreen();
				Pbar_Hide();

			} else {
				//bad format
				notification.alert(plan_lng("ch_alert"), plan_lng("bad_file_format"));
				Pbar_Hide();
			}
			
		}, 1000);
		$("#ariane_csv_file")[0].value = "";
	});

	// file reading failed
	reader.addEventListener('error', function() {
	    notification.alert(plan_lng("ch_alert"), plan_lng("csv_bad_file"));
        Pbar_Hide();
	});

	// read as text file
	reader.readAsText(file);
});

/*Coordinate transformation: The WGS84 model is used to transform geographic coordinates into ECEF Cartesian coordinates.
Distance calculation: The exact Euclidean distance between points in three-dimensional space is calculated.
Filtering algorithm: All subsequent points are checked for each point. If a point is found at a distance closer than the specified threshold, it is marked for deletion.
Guarantee of preserving at least one point: The first detected point always remains in a group of closely spaced points.*/
function filterPoints(points, minDistance) {
	if (points.length === 0) return points.slice();

	// Constants for the WGS84 model
	const a = 6378137.0; // semi-major axis of the ellipsoid (m)
	const e2 = 0.00669437999014; // square of eccentricity

	// Transformation of geographic coordinates to ECEF (Earth-Centered, Earth-Fixed)
	function toECEF(lat, lon, height) {
		const latRad = lat * Math.PI / 180;
		const lonRad = lon * Math.PI / 180;

		const N = a / Math.sqrt(1 - e2 * Math.sin(latRad) * Math.sin(latRad));

		const x = (N + height) * Math.cos(latRad) * Math.cos(lonRad);
		const y = (N + height) * Math.cos(latRad) * Math.sin(lonRad);
		const z = (N * (1 - e2) + height) * Math.sin(latRad);

		return [x, y, z];
	}

	// Calculate Euclidean distance between two points in ECEF
	function calculateDistance(point1, point2) {
		const dx = point2[0] - point1[0];
		const dy = point2[1] - point1[1];
		const dz = point2[2] - point1[2];

		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}

	// Convert all points to ECEF coordinates
	const ecefPoints = points.map(point =>
		toECEF(point[0], point[1], point[2])
	);

	const result = points.slice(); // Copy the original array
	const kept = new Array(points.length).fill(true);

	// Loop through all points and check distances
	for (let i = 0; i < ecefPoints.length; i++) {
		if (!kept[i]) continue;

		// Check all subsequent points
		for (let j = i + 1; j < ecefPoints.length; j++) {
			const distance = calculateDistance(ecefPoints[i], ecefPoints[j]);

			if (distance < minDistance) {
				// Assign point j the same coordinates as point i
				result[j] = [...result[i]];
				kept[j] = false; // Mark this point as changed
			}
		}
	}
	return result;
}

function filterPointsWindow(points, minDistance, windowSize = 3) {
    if (points.length === 0) return points.slice();
    
    //Constants for the WGS84 model
    const a = 6378137.0; //major axis of an ellipsoid (m)
    const e2 = 0.00669437999014; //square of eccentricity

    //Conversion of geographic coordinates to ECEF (Earth-Centered, Earth-Fixed)
    function toECEF(lat, lon, height) {
        const latRad = lat * Math.PI / 180;
        const lonRad = lon * Math.PI / 180;
        
        const N = a / Math.sqrt(1 - e2 * Math.sin(latRad) * Math.sin(latRad));
        
        const x = (N + height) * Math.cos(latRad) * Math.cos(lonRad);
        const y = (N + height) * Math.cos(latRad) * Math.sin(lonRad);
        const z = (N * (1 - e2) + height) * Math.sin(latRad);
        
        return [x, y, z];
    }

    //Calculating the Euclidean distance between two points in ECEF
    function calculateDistance(point1, point2) {
        const dx = point2[0] - point1[0];
        const dy = point2[1] - point1[1];
        const dz = point2[2] - point1[2];
        
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    //Create copies of arrays
    const result = points.map(point => [...point]);
    let ecefPoints = points.map(point => toECEF(point[0], point[1], point[2]));

    //We go through all points and check distances only in the specified window.
    for (let i = 0; i < result.length; i++) {
        
		//Define the window boundaries for the current point
        const start = Math.max(0, i - windowSize);
        const end = Math.min(result.length - 1, i + windowSize);
        
        //Checking points in the window (except for itself)
        for (let j = start; j <= end; j++) {
            if (i === j) continue;
            
            const distance = calculateDistance(ecefPoints[i], ecefPoints[j]);
            
            if (distance < minDistance) {
                //Assign point j the same coordinates as point i
                result[j] = [...result[i]];
                
				//Recalculate ECEF coordinates for point j
                ecefPoints[j] = toECEF(result[i][0], result[i][1], result[i][2]);
            }
        }
    }

    return result;
}