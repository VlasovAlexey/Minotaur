//watcher function for bitmap jpg file reading
var bitmap_file = [];

document.querySelector("#bitmap_file").addEventListener('change', function() {
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
        ovl_pic = reader.result;
        ovl_image_clear();
        ovl_image_default();
        $("#bitmap_file")[0].value = "";
	});

	// file reading failed
	reader.addEventListener('error', function() {
		notification.alert(plan_lng("ch_alert"), plan_lng("jpg_bad_file"));
        Pbar_Hide();
	});

	// read as text file
	reader.readAsDataURL(file);
});

//add overlay image gui elements
var ovl_image_status = 0;
var ovl_button_status = 0;
const overlay_image = [
    "ovl_image_100",
    "ovl_image_50",
    "ovl_image_20",
    "ovl_image_load",
    "ovl_image_clear",
  ];
  
map_editor.pm.Toolbar.createCustomControl({
    block: "custom",
    name: "overlay_image",
    title: "",
    actions: overlay_image,
    onClick: () => {
        if(ovl_button_status == 0){
            ovl_image_default();
            
        }
        ovl_button_status = ovl_button_status + 1;
    },
    afterClick: () => {
        if(ovl_button_status > 1){
            ovl_button_status = 0;
        }
    },
    doToggle: false,
    toggleStatus: false,
    disableOtherButtons: false,
    className: 'control-icon leaflet-pm-icon-overlay-image',
});



var point1 = [map_editor.getBounds().getNorth(), map_editor.getBounds().getWest()];
var point2 = [map_editor.getBounds().getNorth(), map_editor.getBounds().getEast()];
var point3 = [map_editor.getBounds().getSouth(), map_editor.getBounds().getWest()];
var ovl_marker1, ovl_marker2, ovl_marker3
var overlay;

function repositionImage() {
    overlay.reposition(ovl_marker1.getLatLng(), ovl_marker2.getLatLng(), ovl_marker3.getLatLng());
};
function setOverlayOpacity(opacity) {
    overlay.setOpacity(opacity);
}

//load default image
function ovl_image_default(){
    if(ovl_image_status == 0){
        point1 = [map_editor.getBounds().getNorth(), map_editor.getBounds().getWest()];
        point2 = [map_editor.getBounds().getNorth(), map_editor.getBounds().getEast()];
        point3 = [map_editor.getBounds().getSouth(), map_editor.getBounds().getWest()];

        var	bounds = new L.LatLngBounds(point1, point2).extend(point3);
        map_editor.fitBounds(bounds, {padding: [100,100]});
        ovl_create_layer();
        ovl_image_status = 1;
    }
}

//clear all data
function ovl_image_clear(){
    map_editor.removeLayer(overlay);
    map_editor.removeLayer(ovl_marker1);
    map_editor.removeLayer(ovl_marker2);
    map_editor.removeLayer(ovl_marker3);
    ovl_image_status = 0;
}

//load another image
function ovl_image_load(){
    document.getElementById("bitmap_file").click();
}

//create layer with existing parameters
function ovl_create_layer(){
    overlay = L.imageOverlay.rotated(ovl_pic, point1, point2, point3, {
        opacity: 0.5,
        interactive: true,
    });
    var Icon = L.icon({
        iconUrl: icon_edit_drag,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        iconBase: "true",
    });
    //OvlPic - add picture to save icon options as base64 image
    //rSv - "false" to disable saving to file this object
    ovl_marker1 = L.marker(point1, {draggable: true, rSv: "1", icon: Icon} ).addTo(map_editor);
    ovl_marker2 = L.marker(point2, {draggable: true, rSv: "2", icon: Icon} ).addTo(map_editor);
    ovl_marker3 = L.marker(point3, {draggable: true, rSv: "3", OvlPic: "true", icon: Icon} ).addTo(map_editor);    

    ovl_marker1.on('drag dragend', repositionImage);
    ovl_marker2.on('drag dragend', repositionImage);
    ovl_marker3.on('drag dragend', repositionImage);

    map_editor.addLayer(overlay);
}
  