var gpx_file = "";
document.querySelector("#gpx_file").addEventListener('change', function() {

	// files that user has chosen
	var all_files = this.files;
	if(all_files.length == 0) {
		alert('Error : No file selected');
		return;
	}

	// first file selected by user
	var file = all_files[0];

	// files types allowed
	var allowed_name = "";
  
  allowed_name = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);
	if(allowed_name != "gpx") {
		alert('Error : Incorrect file type');
		return;
	}

	// Max 2 MB allowed
	var max_size_allowed = 10*1024*1024
	if(file.size > max_size_allowed) {
		alert('Error : Exceeded size 10MB');
		return;
	}

	// file validation is successfull
	// we will now read the file

	var reader = new FileReader();

	// file reading started
	reader.addEventListener('loadstart', function() {
	    //document.querySelector("#file-input-label").style.display = 'none'; 
	});

	// file reading finished successfully
	reader.addEventListener('load', function(e) {
	    //var text = e.target.result;
        gpx_file = e.target.result;
		
	    // contents of the file
	    //document.querySelector("#contents").innerHTML = text;
	    //document.querySelector("#contents").style.display = 'block';

	    //document.querySelector("#file-input-label").style.display = 'block'; 
	});

	// file reading failed
	reader.addEventListener('error', function() {
	    alert('Error : Failed to read file');
	});

	// file read progress 
    /*
	reader.addEventListener('progress', function(e) {
	    if(e.lengthComputable == true) {
	    	document.querySelector("#file-progress-percent").innerHTML = Math.floor((e.loaded/e.total)*100);
	    	document.querySelector("#file-progress-percent").style.display = 'block';
	    }
	});
    */
	// read as text file
	reader.readAsText(file);
});

//save final glued gpx file
function gpx_final_save(){
	if(gpx_file != ""){
		let str = gpx_file;
		let target1 = "<trkpt "; // searching begin
		let target2 = ">"; //end
		let pos = 0;
		let first_f = 0;
		let c_lat = 0;
		let c_lon = 0;
		let fPos1 = 0;
		let fPos2 = 0;
		let c_speed = 0;
		let c_time_freq = 0;
		let c_course_m = 0;

		while (true) {
  			let foundPos = str.indexOf(target1, pos);
  			if (foundPos == -1) break;
			let foundPos2 = str.indexOf(target2, foundPos + 1);
			
			let cut = str.slice(foundPos + 1,foundPos2);

			if(first_f == 0){
				first_f = 1;
				//find current lat
				fPos1 = cut.indexOf("lat=", 0);
				fPos2 = cut.indexOf("\"", fPos1 + 5);
				c_lat = parseFloat(cut.slice(fPos1 + 5 ,fPos2 - 1));
			
				//find current lon
				fPos1 = cut.indexOf("lon=", 0);
				fPos2 = cut.indexOf("\"", fPos1 + 5);
				c_lon = parseFloat(cut.slice(fPos1 + 5 ,fPos2 - 1));

				//find speed
				fPos1 = str.indexOf("<speed>", 0);
				fPos2 = str.indexOf("</speed>", fPos1 + 7);
				c_speed = parseFloat(str.slice(fPos1 + 7 ,fPos2));

				//find freq
				fPos1 = str.indexOf("<freq>", 0);
				fPos2 = str.indexOf("</freq>", fPos1 + 6);
				c_time_freq = parseFloat(str.slice(fPos1 + 6 ,fPos2));

				//console.log(c_lat,c_lon,c_speed,c_time_freq);
			}
			else{
				//find course
				fPos1 = str.indexOf("<course>", foundPos2 + 1);
				fPos2 = str.indexOf("</course>", fPos1 + 8);
				c_course_m = parseFloat(str.slice(fPos1 + 8 ,fPos2));
				//console.log(c_course_m);

				//destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lat

				//insert new coordinates
				c_lat_wrt = destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lat;
				c_lon_wrt = destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lon;

				str = str.replace(str.slice(foundPos,foundPos2 + 1),"<trkpt lat=\""+ c_lat_wrt + "\" lon=\""+ c_lon_wrt + "\">");
				//str = str.replace(str.slice(foundPos + 1,foundPos2),"<trkpt lat=\"" + destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lat + "\" lon=\"" + destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lon + "\"");

				//update old position with new calculated position
				c_lat = destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lat;
				c_lon = destinationPoint(c_lat, c_lon, c_time_freq * c_speed, c_course_m).lon;
			}
  			pos = foundPos + 1; // continued search from next one position
		}
		//and write file
        var blob = new Blob([str], {type: "application/gpx;charset=utf-8"});
        saveAs(blob, "res.gpx");
		//console.log(str);
	}
}



//console.log(c_lat,c_lon);