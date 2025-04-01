//add overlay image
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



var point1 = [map_editor.getBounds().getSouth(), map_editor.getBounds().getWest()];
var point2 = [map_editor.getBounds().getSouth(), map_editor.getBounds().getEast()];
var point3 = [map_editor.getBounds().getNorth(), map_editor.getBounds().getWest()];
var ovl_marker1, ovl_marker2, ovl_marker3
var overlay;

function repositionImage() {
    overlay.reposition(ovl_marker1.getLatLng(), ovl_marker2.getLatLng(), ovl_marker3.getLatLng());
};
function setOverlayOpacity(opacity) {
    overlay.setOpacity(opacity);
}

//load another image
function ovl_image_default(){
    if(ovl_image_status == 0){
        point1 = [map_editor.getBounds().getSouth(), map_editor.getBounds().getWest()];
        point2 = [map_editor.getBounds().getSouth(), map_editor.getBounds().getEast()];
        point3 = [map_editor.getBounds().getNorth(), map_editor.getBounds().getWest()];

        var	bounds = new L.LatLngBounds(point1, point2).extend(point3);
        map_editor.fitBounds(bounds, {padding: [10,10]});

        overlay = L.imageOverlay.rotated(ovl_pic, point1, point2, point3, {
            opacity: 0.4,
            interactive: true,
        });
        var Icon = L.icon({
            iconUrl: icon_edit_drag,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            iconBase: "true",
        });
        ovl_marker1 = L.marker(point1, {draggable: true, icon: Icon} ).addTo(map_editor);
        ovl_marker2 = L.marker(point2, {draggable: true, icon: Icon} ).addTo(map_editor);
	    ovl_marker3 = L.marker(point3, {draggable: true, icon: Icon} ).addTo(map_editor);    
    
        ovl_marker1.on('drag dragend', repositionImage);
	    ovl_marker2.on('drag dragend', repositionImage);
	    ovl_marker3.on('drag dragend', repositionImage);

        map_editor.addLayer(overlay);

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
    console.log("pushed");
}
  
  