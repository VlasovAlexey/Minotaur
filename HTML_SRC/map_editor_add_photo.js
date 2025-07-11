//watcher function for bitmap jpg file reading
var photo_jpg_file = [];

document.querySelector("#photo_jpg_file").addEventListener('change', function() {
	// files that user has chosen
	var all_files = this.files;
	if(all_files.length == 0) {
		notification.alert(plan_lng("ch_alert"), plan_lng("jpg_no_file"));
		Pbar_Hide();
		return;
	}

	// first file selected by user
	var file = all_files[0];

	// files types allowed
	var allowed_name = "";
  
  allowed_name = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);
	if(allowed_name != "jpg") {
		notification.alert(plan_lng("ch_alert"), plan_lng("jpg_bad_ext_file"));
		Pbar_Hide();
		return;
	}

	// Max 30 MB allowed
	var max_size_allowed = 30*1024*1024
	if(file.size > max_size_allowed) {
		notification.alert(plan_lng("ch_alert"), plan_lng("jpg_big_file"));
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
        photo_image_jpg_res = reader.result;
        create_custom_image_marker(photo_image_jpg_res, map_editor.getCenter());
		$("#photo_jpg_file")[0].value = "";
	});

	// file reading failed
	reader.addEventListener('error', function() {
		notification.alert(plan_lng("ch_alert"), plan_lng("jpg_bad_file"));
        Pbar_Hide();
	});

	// read as text file
	reader.readAsDataURL(file);
});

//gif file loader
var photo_gif_file = [];
document.querySelector("#photo_gif_file").addEventListener('change', function() {
	// files that user has chosen
	var all_files = this.files;
	if(all_files.length == 0) {
		notification.alert(plan_lng("ch_alert"), plan_lng("gif_no_file"));
		Pbar_Hide();
		return;
	}

	// first file selected by user
	var file = all_files[0];

	// files types allowed
	var allowed_name = "";
  
  allowed_name = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);
	if(allowed_name != "gif") {
		notification.alert(plan_lng("ch_alert"), plan_lng("gif_bad_ext_file"));
		Pbar_Hide();
		return;
	}

	// Max 30 MB allowed
	var max_size_allowed = 30*1024*1024
	if(file.size > max_size_allowed) {
		notification.alert(plan_lng("ch_alert"), plan_lng("gif_big_file"));
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
        photo_image_gif_res = reader.result;
        create_custom_image_marker(photo_image_gif_res, map_editor.getCenter());
		$("#photo_gif_file")[0].value = "";
	});

	// file reading failed
	reader.addEventListener('error', function() {
		notification.alert(plan_lng("ch_alert"), plan_lng("gif_bad_file"));
        Pbar_Hide();
	});

	// read as text file
	reader.readAsDataURL(file);
});

//add overlay image gui elements
var photo_button_status = 0;
const photo_image_block = [
    "photo_jpg_file",
    "photo_gif_file",
    "cancel"
  ];
  
map_editor.pm.Toolbar.createCustomControl({
    block: "custom",
    name: "photo_image_blk",
    title: "",
    actions: photo_image_block,
    onClick: () => {
        if(photo_button_status == 0){
            //create later
        }
        photo_button_status = photo_button_status + 1;
    },
    afterClick: () => {
        if(photo_button_status > 1){
            photo_button_status = 0;
        }
    },
    doToggle: false,
    toggleStatus: false,
    disableOtherButtons: false,
    className: 'control-icon leaflet-pm-icon-add-photo',
});

function photo_jpg_load(){
    document.getElementById("photo_jpg_file").click();
};
function photo_gif_load(){
    document.getElementById("photo_gif_file").click();
};

function onClick(e) {
	var tooltip = 'marker_photo_img';
	//console.log(document.getElementsByClassName(tooltip)[1].style.width)
	for (var i = 0; i < document.getElementsByClassName(tooltip).length; i++) {
		if(document.getElementsByClassName(tooltip)[i] != undefined){
			if(document.getElementsByClassName(tooltip)[i].style.width == `250px`){
				document.getElementsByClassName(tooltip)[i].style.width = '100px';
				document.getElementsByClassName(tooltip)[i].style.height = 'auto';
				
			} else {
				document.getElementsByClassName(tooltip)[i].style.width = '250px';
				document.getElementsByClassName(tooltip)[i].style.height = 'auto';
		
			}
		}
	}
    map_editor.fitBounds(map_editor.getBounds(), {padding: [1.1,1.1]});
}

function create_custom_image_marker(photo_image_jpg_res, LatLon_rs){
    var Icon = L.icon({
        iconUrl: icon_photo_marker,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      var marker_photo =  L.marker(LatLon_rs, {
            icon: Icon,
            draggable: true,
			iconPhoto: photo_image_jpg_res,
        })
      
        marker_photo.bindTooltip(`<img src="` + photo_image_jpg_res + `" class="marker_photo_img">` , {
        //permanent: true,
        direction: "top",
        className: "photo-tooltip"
    }).addTo(map_editor).on('click', onClick).openTooltip();
    //marker_photo.bindPopup(`<img src="` + photo_image_jpg_res + `" class="marker_photo_img">`).openPopup();
};
