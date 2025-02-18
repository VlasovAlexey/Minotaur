//save geojson with styles button to geoman
let gjson_save = new L.Control.PMButton({
    block: "custom",
    title: "Save Styled GeoJSON",
    actions: [],
    onClick: () => {
      
      //save current map
      function toGeoJSON() {
        var allLayers = new L.featureGroup();
        map_editor.eachLayer(function (layer) {
          if (layer instanceof L.Path) {
            allLayers.addLayer(layer);
          } else {
            if (layer instanceof L.Marker) {
              allLayers.addLayer(layer);
            }
          }
        });
        //and write file
            scr_n_add = "";
            if (GPX_file_num < 10 ) {
                scr_n_add = "0";
            }
            var fl_name = scr_n_add + editor_file_num + "_" + (track_name.value).toString() + "_" + get_date_hr() + ".geojson";
        var blob = new Blob([drawnItemsToJSON(allLayers)], {type: "application/geojson;charset=utf-8"});
        saveAs(blob, fl_name);
        editor_file_num = editor_file_num + 1;
      }
      toGeoJSON();
    },
    afterClick: () => {},
    doToggle: false,
    toggleStatus: false,
    disableOtherButtons: true,
    className: 'control-icon leaflet-pm-icon-save',
  });
  map_editor.addControl(gjson_save);

//converting Javascript Leaflet objects to styled geoJSON layers as text
function drawnItemsToJSON(ilayer) {
    var dOut = '';
    var dOut1 = '';
    var dOut2 = '';
    var ditems = ilayer.getLayers();
    dOut = '{"type":"FeatureCollection","features":[';
    for (iIndex = 0; iIndex < ditems.length; ++iIndex) {
        if (ditems[iIndex] instanceof L.Marker) {
            dOut1 = dOut1 + ',{"type":"Feature","properties":{';
            dOut2 = '';
            if ('text' in ditems[iIndex].options) { if (!ditems[iIndex].options.text !== null) { dOut2 = dOut2 + ',"name":"' + ditems[iIndex].options.text + '"'} };
            if ('depth' in ditems[iIndex].options) { if (!ditems[iIndex].options.depth !== null) { dOut2 = dOut2 + ',"depth":"' + ditems[iIndex].options.depth + '"'} };
            if (dOut2.length > 1) {
                dOut1 = dOut1 + dOut2.substring(1) + ',';
            };
            if ('icon' in ditems[iIndex].options) {
                if ('options' in ditems[iIndex].options.icon) {
                    dOut1 = dOut1 + '"markerOptions":{';
                    dOut2 = '';
                    //here
                    
                    if ('iconSize' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconSize":[' + ditems[iIndex].options.icon.options.iconSize[0] + ',' + ditems[iIndex].options.icon.options.iconSize[0] + ']' };
                    if ('iconUrl' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconUrl":"' + ditems[iIndex].options.icon.options.iconUrl + '"' };
                    if ('iconBase' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconBase":"' + ditems[iIndex].options.icon.options.iconBase + '"' };

                    dOut1 = dOut1 + dOut2.substring(1) + '}';
                };
            };
            if (dOut2.length > 1) {
              //dOut1 = dOut1 + dOut2.substring(1);
          };
            dOut1 = dOut1 + '},"geometry":{"type":"Point","coordinates":['
                + ditems[iIndex]._latlng.lng
                + ',' + ditems[iIndex]._latlng.lat
                + ']},"style":{';
            dOut2 = '';
            if ('stroke' in ditems[iIndex].options) { if (!ditems[iIndex].options.stroke !== null) { dOut2 = dOut2 + ',"stroke":' + ditems[iIndex].options.stroke } };
            if ('color' in ditems[iIndex].options) { if (ditems[iIndex].options.color !== null) { dOut2 = dOut2 + ',"color":"' + ditems[iIndex].options.color + '"' } };
            if ('weight' in ditems[iIndex].options) { if (!ditems[iIndex].options.weight !== null) { dOut2 = dOut2 + ',"weight":' + ditems[iIndex].options.weight } };
            if ('opacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.opacity !== null) { dOut2 = dOut2 + ',"opacity":' + ditems[iIndex].options.opacity } };
            if ('fill' in ditems[iIndex].options) { if (!ditems[iIndex].options.fill !== null) { dOut2 = dOut2 + ',"fill":' + ditems[iIndex].options.fill } };
            if ('fillColor' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillColor !== null) { dOut2 = dOut2 + ',"fillColor":"' + ditems[iIndex].options.fillColor + '"' } };
            if ('fillOpacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillOpacity !== null) { dOut2 = dOut2 + ',"fillOpacity":' + ditems[iIndex].options.fillOpacity } };
            if ('fillRule' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillRule !== null) { dOut2 = dOut2 + ',"fillRule":"' + ditems[iIndex].options.fillRule + '"' } };
            if ('dashArray' in ditems[iIndex].options) { if (!ditems[iIndex].options.dashArray !== null) { dOut2 = dOut2 + ',"dashArray":"' + ditems[iIndex].options.dashArray + '"' } };
            if ('lineCap' in ditems[iIndex].options) { if (!ditems[iIndex].options.lineCap !== null) { dOut2 = dOut2 + ',"lineCap":"' + ditems[iIndex].options.lineCap + '"' } };
            if ('lineJoin' in ditems[iIndex].options) { if (!ditems[iIndex].options.lineJoin !== null) { dOut2 = dOut2 + ',"lineJoin":"' + ditems[iIndex].options.lineJoin + '"' } };
            if ('clickable' in ditems[iIndex].options) { if (!ditems[iIndex].options.clickable !== null) { dOut2 = dOut2 + ',"clickable":' + ditems[iIndex].options.clickable } };
            if ('pointerEvents' in ditems[iIndex].options) { if (!ditems[iIndex].options.pointerEvents !== null) { dOut2 = dOut2 + ',"pointerEvents":"' + ditems[iIndex].options.pointerEvents + '"' } };
            if ('className' in ditems[iIndex].options) { if (!ditems[iIndex].options.className !== null) { dOut2 = dOut2 + ',"className":"' + ditems[iIndex].options.className + '"' } };
  
            if (dOut2.length > 1) {
                dOut1 = dOut1 + dOut2.substring(1) + '}';
            };
            dOut2 = '';
            dOut1 = dOut1 + '}';
        } else if (ditems[iIndex] instanceof L.Point) {
          dOut1 = dOut1 + ',{"type":"Feature","properties":{';
          
          if ('icon' in ditems[iIndex].options) {
              if ('options' in ditems[iIndex].options.icon) {
                  dOut1 = dOut1 + '"markerOptions":{';
                  dOut2 = '';
                  if ('iconSize' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconSize":[' + ditems[iIndex].options.icon.options.iconSize[0] + ',' + ditems[iIndex].options.icon.options.iconSize[0] + ']' };
                  if ('iconUrl' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconUrl":"' + ditems[iIndex].options.icon.options.iconUrl + '"' };
                  dOut1 = dOut1 + dOut2.substring(1) + '}';
              };
          };
          dOut1 = dOut1 + '},"geometry":{"type":"Point","coordinates":['
              + ditems[iIndex]._latlng.lng
              + ',' + ditems[iIndex]._latlng.lat
              + ']},"style":{';
          dOut2 = '';
          if ('stroke' in ditems[iIndex].options) { if (!ditems[iIndex].options.stroke !== null) { dOut2 = dOut2 + ',"stroke":' + ditems[iIndex].options.stroke } };
          if ('color' in ditems[iIndex].options) { if (ditems[iIndex].options.color !== null) { dOut2 = dOut2 + ',"color":"' + ditems[iIndex].options.color + '"' } };
          if ('weight' in ditems[iIndex].options) { if (!ditems[iIndex].options.weight !== null) { dOut2 = dOut2 + ',"weight":' + ditems[iIndex].options.weight } };
          if ('opacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.opacity !== null) { dOut2 = dOut2 + ',"opacity":' + ditems[iIndex].options.opacity } };
          if ('fill' in ditems[iIndex].options) { if (!ditems[iIndex].options.fill !== null) { dOut2 = dOut2 + ',"fill":' + ditems[iIndex].options.fill } };
          if ('fillColor' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillColor !== null) { dOut2 = dOut2 + ',"fillColor":"' + ditems[iIndex].options.fillColor + '"' } };
          if ('fillOpacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillOpacity !== null) { dOut2 = dOut2 + ',"fillOpacity":' + ditems[iIndex].options.fillOpacity } };
          if ('fillRule' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillRule !== null) { dOut2 = dOut2 + ',"fillRule":"' + ditems[iIndex].options.fillRule + '"' } };
          if ('dashArray' in ditems[iIndex].options) { if (!ditems[iIndex].options.dashArray !== null) { dOut2 = dOut2 + ',"dashArray":"' + ditems[iIndex].options.dashArray + '"' } };
          if ('lineCap' in ditems[iIndex].options) { if (!ditems[iIndex].options.lineCap !== null) { dOut2 = dOut2 + ',"lineCap":"' + ditems[iIndex].options.lineCap + '"' } };
          if ('lineJoin' in ditems[iIndex].options) { if (!ditems[iIndex].options.lineJoin !== null) { dOut2 = dOut2 + ',"lineJoin":"' + ditems[iIndex].options.lineJoin + '"' } };
          if ('clickable' in ditems[iIndex].options) { if (!ditems[iIndex].options.clickable !== null) { dOut2 = dOut2 + ',"clickable":' + ditems[iIndex].options.clickable } };
          if ('pointerEvents' in ditems[iIndex].options) { if (!ditems[iIndex].options.pointerEvents !== null) { dOut2 = dOut2 + ',"pointerEvents":"' + ditems[iIndex].options.pointerEvents + '"' } };
          if ('className' in ditems[iIndex].options) { if (!ditems[iIndex].options.className !== null) { dOut2 = dOut2 + ',"className":"' + ditems[iIndex].options.className + '"' } };
  
          if (dOut2.length > 1) {
              dOut1 = dOut1 + dOut2.substring(1) + '}';
          };
          dOut2 = '';
          dOut1 = dOut1 + '}';
  
        } else if (ditems[iIndex] instanceof L.Polygon) {
          dOut1 = dOut1 + ',{"type":"Feature","properties":{'
          dOut2 = '';
          if ('stroke' in ditems[iIndex].options) { if (!ditems[iIndex].options.stroke !== null) { dOut2 = dOut2 + ',"stroke":' + ditems[iIndex].options.stroke } };
          if ('color' in ditems[iIndex].options) { if (ditems[iIndex].options.color !== null) { dOut2 = dOut2 + ',"color":"' + ditems[iIndex].options.color + '"' } };
          if ('weight' in ditems[iIndex].options) { if (!ditems[iIndex].options.weight !== null) { dOut2 = dOut2 + ',"weight":' + ditems[iIndex].options.weight } };
          if ('opacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.opacity !== null) { dOut2 = dOut2 + ',"opacity":' + ditems[iIndex].options.opacity } };
          if ('fill' in ditems[iIndex].options) { if (!ditems[iIndex].options.fill !== null) { dOut2 = dOut2 + ',"fill":' + ditems[iIndex].options.fill } };
          if ('fillColor' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillColor !== null) { dOut2 = dOut2 + ',"fillColor":"' + ditems[iIndex].options.fillColor + '"' } };
          if ('fillOpacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillOpacity !== null) { dOut2 = dOut2 + ',"fillOpacity":' + ditems[iIndex].options.fillOpacity } };
          if ('fillRule' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillRule !== null) { dOut2 = dOut2 + ',"fillRule":"' + ditems[iIndex].options.fillRule + '"' } };
          if ('dashArray' in ditems[iIndex].options) { if (!ditems[iIndex].options.dashArray !== null) { dOut2 = dOut2 + ',"dashArray":"' + ditems[iIndex].options.dashArray + '"' } };
          if ('lineCap' in ditems[iIndex].options) { if (!ditems[iIndex].options.lineCap !== null) { dOut2 = dOut2 + ',"lineCap":"' + ditems[iIndex].options.lineCap + '"' } };
          if ('lineJoin' in ditems[iIndex].options) { if (!ditems[iIndex].options.lineJoin !== null) { dOut2 = dOut2 + ',"lineJoin":"' + ditems[iIndex].options.lineJoin + '"' } };          if ('clickable' in ditems[iIndex].options) { if (!ditems[iIndex].options.clickable !== null) { dOut2 = dOut2 + ',"clickable":' + ditems[iIndex].options.clickable } };
          if ('pointerEvents' in ditems[iIndex].options) { if (!ditems[iIndex].options.pointerEvents !== null) { dOut2 = dOut2 + ',"pointerEvents":"' + ditems[iIndex].options.pointerEvents + '"' } };
          if ('className' in ditems[iIndex].options) { if (!ditems[iIndex].options.className !== null) { dOut2 = dOut2 + ',"className":"' + ditems[iIndex].options.className + '"' } };
          if ('icon' in ditems[iIndex].options) {
              if ('options' in ditems[iIndex].options.icon) {
                  if ('iconSize' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconSize":[' + ditems[iIndex].options.icon.options.iconSize[0] + ',' + ditems[iIndex].options.icon.options.iconSize[0] + ']"' };
                  if ('iconurl' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconUrl":"' + ditems[iIndex].options.icon.options.iconUrl + '"' };
              };
          };
          dOut1 = dOut1 + dOut2.substring(1);
          
          dOut1 = dOut1 + '},"geometry":{"type":"Polygon","coordinates":[['
            dOut2 = '';
            for (ll = 0; ll < ditems[iIndex]._latlngs[0].length; ll++) {
                dOut2 = dOut2 + ',[' + ditems[iIndex]._latlngs[0][ll].lng + ',' + ditems[iIndex]._latlngs[0][ll].lat + ']';
            };
            dOut2 = dOut2 + ',[' + ditems[iIndex]._latlngs[0][0].lng + ',' + ditems[iIndex]._latlngs[0][0].lat + ']';
            dOut1 = dOut1 + dOut2.substring(1) + ']]},"style":{';
            dOut2 = '';
            if ('stroke' in ditems[iIndex].options) { if (!ditems[iIndex].options.stroke !== null) { dOut2 = dOut2 + ',"stroke":' + ditems[iIndex].options.stroke } };
            if ('color' in ditems[iIndex].options) { if (ditems[iIndex].options.color !== null) { dOut2 = dOut2 + ',"color":"' + ditems[iIndex].options.color + '"' } };
            if ('weight' in ditems[iIndex].options) { if (!ditems[iIndex].options.weight !== null) { dOut2 = dOut2 + ',"weight":' + ditems[iIndex].options.weight } };
            if ('opacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.opacity !== null) { dOut2 = dOut2 + ',"opacity":' + ditems[iIndex].options.opacity } };
            if ('fill' in ditems[iIndex].options) { if (!ditems[iIndex].options.fill !== null) { dOut2 = dOut2 + ',"fill":' + ditems[iIndex].options.fill } };
            if ('fillColor' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillColor !== null) { dOut2 = dOut2 + ',"fillColor":"' + ditems[iIndex].options.fillColor + '"' } };
            if ('fillOpacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillOpacity !== null) { dOut2 = dOut2 + ',"fillOpacity":' + ditems[iIndex].options.fillOpacity } };
            if ('fillRule' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillRule !== null) { dOut2 = dOut2 + ',"fillRule":"' + ditems[iIndex].options.fillRule + '"' } };
            if ('dashArray' in ditems[iIndex].options) { if (!ditems[iIndex].options.dashArray !== null) { dOut2 = dOut2 + ',"dashArray":"' + ditems[iIndex].options.dashArray + '"' } };
            if ('lineCap' in ditems[iIndex].options) { if (!ditems[iIndex].options.lineCap !== null) { dOut2 = dOut2 + ',"lineCap":"' + ditems[iIndex].options.lineCap + '"' } };
            if ('lineJoin' in ditems[iIndex].options) { if (!ditems[iIndex].options.lineJoin !== null) { dOut2 = dOut2 + ',"lineJoin":"' + ditems[iIndex].options.lineJoin + '"' } };
            if ('clickable' in ditems[iIndex].options) { if (!ditems[iIndex].options.clickable !== null) { dOut2 = dOut2 + ',"clickable":' + ditems[iIndex].options.clickable } };
            if ('pointerEvents' in ditems[iIndex].options) { if (!ditems[iIndex].options.pointerEvents !== null) { dOut2 = dOut2 + ',"pointerEvents":"' + ditems[iIndex].options.pointerEvents + '"' } };
            if ('className' in ditems[iIndex].options) { if (!ditems[iIndex].options.className !== null) { dOut2 = dOut2 + ',"className":"' + ditems[iIndex].options.className + '"' } };
            if ('icon' in ditems[iIndex].options) {
                if ('options' in ditems[iIndex].options.icon) {
                    if ('iconSize' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconSize":[' + ditems[iIndex].options.icon.options.iconSize[0] + ',' + ditems[iIndex].options.icon.options.iconSize[0] + ']"' };
                    if ('iconurl' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconUrl":"' + ditems[iIndex].options.icon.options.iconUrl + '"' };
                };
            };
            
            dOut1 = dOut1 + dOut2.substring(1) + '}';
          
            dOut2 = '';
            dOut1 = dOut1 + '}';
        } else if (ditems[iIndex] instanceof L.Polyline) {
            dOut2 = '';
            dOut1 = dOut1 + ',{"type":"Feature","properties":{'
            //if ('color' in ditems[iIndex].options) { if (ditems[iIndex].options.color !== null) { dOut2 = dOut2 + ',"stroke":"' + ditems[iIndex].options.color + '"' } };
            //if ('weight' in ditems[iIndex].options) { if (!ditems[iIndex].options.weight !== null) { dOut2 = dOut2 + ',"stroke-width":' + ditems[iIndex].options.weight } };
            //if ('opacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.opacity !== null) { dOut2 = dOut2 + ',"stroke-opacity":' + ditems[iIndex].options.opacity } };
            //if ('fillColor' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillColor !== null) { dOut2 = dOut2 + ',"fill":"' + ditems[iIndex].options.fillColor + '"' } };
            //if ('fillOpacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillOpacity !== null) { dOut2 = dOut2 + ',"fill-opacity":' + ditems[iIndex].options.fillOpacity } };
            if ('stroke' in ditems[iIndex].options) { if (!ditems[iIndex].options.stroke !== null) { dOut2 = dOut2 + ',"stroke":' + ditems[iIndex].options.stroke } };
            if ('color' in ditems[iIndex].options) { if (ditems[iIndex].options.color !== null) { dOut2 = dOut2 + ',"color":"' + ditems[iIndex].options.color + '"' } };
            if ('weight' in ditems[iIndex].options) { if (!ditems[iIndex].options.weight !== null) { dOut2 = dOut2 + ',"weight":' + ditems[iIndex].options.weight } };
            if ('opacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.opacity !== null) { dOut2 = dOut2 + ',"opacity":' + ditems[iIndex].options.opacity } };
            if ('fill' in ditems[iIndex].options) { if (!ditems[iIndex].options.fill !== null) { dOut2 = dOut2 + ',"fill":' + ditems[iIndex].options.fill } };
            if ('fillColor' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillColor !== null) { dOut2 = dOut2 + ',"fillColor":"' + ditems[iIndex].options.fillColor + '"' } };
            if ('fillOpacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillOpacity !== null) { dOut2 = dOut2 + ',"fillOpacity":' + ditems[iIndex].options.fillOpacity } };
            if ('fillRule' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillRule !== null) { dOut2 = dOut2 + ',"fillRule":"' + ditems[iIndex].options.fillRule + '"' } };
            if ('dashArray' in ditems[iIndex].options) { if (!ditems[iIndex].options.dashArray !== null) { dOut2 = dOut2 + ',"dashArray":"' + ditems[iIndex].options.dashArray + '"' } };
            if ('lineCap' in ditems[iIndex].options) { if (!ditems[iIndex].options.lineCap !== null) { dOut2 = dOut2 + ',"lineCap":"' + ditems[iIndex].options.lineCap + '"' } };
            if ('lineJoin' in ditems[iIndex].options) { if (!ditems[iIndex].options.lineJoin !== null) { dOut2 = dOut2 + ',"lineJoin":"' + ditems[iIndex].options.lineJoin + '"' } };
            if ('clickable' in ditems[iIndex].options) { if (!ditems[iIndex].options.clickable !== null) { dOut2 = dOut2 + ',"clickable":' + ditems[iIndex].options.clickable } };
            if ('pointerEvents' in ditems[iIndex].options) { if (!ditems[iIndex].options.pointerEvents !== null) { dOut2 = dOut2 + ',"pointerEvents":"' + ditems[iIndex].options.pointerEvents + '"' } };
            if ('className' in ditems[iIndex].options) { if (!ditems[iIndex].options.className !== null) { dOut2 = dOut2 + ',"className":"' + ditems[iIndex].options.className + '"' } };
            if ('icon' in ditems[iIndex].options) {
                if ('options' in ditems[iIndex].options.icon) {
                    if ('iconSize' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconSize":[' + ditems[iIndex].options.icon.options.iconSize[0] + ',' + ditems[iIndex].options.icon.options.iconSize[0] + ']"' };
                    if ('iconurl' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconUrl":"' + ditems[iIndex].options.icon.options.iconUrl + '"' };
                };
            };
            dOut1 = dOut1 + dOut2.substring(1);
            dOut1 = dOut1 + '},"geometry":{"type":"LineString","coordinates":['
            dOut2 = '';
            for (ll = 0; ll < ditems[iIndex]._latlngs.length; ll++) {
                dOut2 = dOut2 + ',[' + ditems[iIndex]._latlngs[ll].lng + ',' + ditems[iIndex]._latlngs[ll].lat + ']';
            };
            dOut1 = dOut1 + dOut2.substring(1) + ']},"style":{';
            dOut2 = '';
            if ('stroke' in ditems[iIndex].options) { if (!ditems[iIndex].options.stroke !== null) { dOut2 = dOut2 + ',"stroke":' + ditems[iIndex].options.stroke } };
            if ('color' in ditems[iIndex].options) { if (ditems[iIndex].options.color !== null) { dOut2 = dOut2 + ',"color":"' + ditems[iIndex].options.color + '"' } };
            if ('weight' in ditems[iIndex].options) { if (!ditems[iIndex].options.weight !== null) { dOut2 = dOut2 + ',"weight":' + ditems[iIndex].options.weight } };
            if ('opacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.opacity !== null) { dOut2 = dOut2 + ',"opacity":' + ditems[iIndex].options.opacity } };
            if ('fill' in ditems[iIndex].options) { if (!ditems[iIndex].options.fill !== null) { dOut2 = dOut2 + ',"fill":' + ditems[iIndex].options.fill } };
            if ('fillColor' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillColor !== null) { dOut2 = dOut2 + ',"fillColor":"' + ditems[iIndex].options.fillColor + '"' } };
            if ('fillOpacity' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillOpacity !== null) { dOut2 = dOut2 + ',"fillOpacity":' + ditems[iIndex].options.fillOpacity } };
            if ('fillRule' in ditems[iIndex].options) { if (!ditems[iIndex].options.fillRule !== null) { dOut2 = dOut2 + ',"fillRule":"' + ditems[iIndex].options.fillRule + '"' } };
            if ('dashArray' in ditems[iIndex].options) { if (!ditems[iIndex].options.dashArray !== null) { dOut2 = dOut2 + ',"dashArray":"' + ditems[iIndex].options.dashArray + '"' } };
            if ('lineCap' in ditems[iIndex].options) { if (!ditems[iIndex].options.lineCap !== null) { dOut2 = dOut2 + ',"lineCap":"' + ditems[iIndex].options.lineCap + '"' } };
            if ('lineJoin' in ditems[iIndex].options) { if (!ditems[iIndex].options.lineJoin !== null) { dOut2 = dOut2 + ',"lineJoin":"' + ditems[iIndex].options.lineJoin + '"' } };
            if ('clickable' in ditems[iIndex].options) { if (!ditems[iIndex].options.clickable !== null) { dOut2 = dOut2 + ',"clickable":' + ditems[iIndex].options.clickable } };
            if ('pointerEvents' in ditems[iIndex].options) { if (!ditems[iIndex].options.pointerEvents !== null) { dOut2 = dOut2 + ',"pointerEvents":"' + ditems[iIndex].options.pointerEvents + '"' } };
            if ('className' in ditems[iIndex].options) { if (!ditems[iIndex].options.className !== null) { dOut2 = dOut2 + ',"className":"' + ditems[iIndex].options.className + '"' } };
            if ('icon' in ditems[iIndex].options) {
                if ('options' in ditems[iIndex].options.icon) {
                    if ('iconSize' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconSize":[' + ditems[iIndex].options.icon.options.iconSize[0] + ',' + ditems[iIndex].options.icon.options.iconSize[0] + ']"' };
                    if ('iconurl' in ditems[iIndex].options.icon.options) { dOut2 = dOut2 + ',"iconUrl":"' + ditems[iIndex].options.icon.options.iconUrl + '"' };
                };
            };
            if (dOut2.length > 1) {
                dOut1 = dOut1 + dOut2.substring(1) + '}';
            };
            dOut2 = '';
            dOut1 = dOut1 + '}';
        };
    };
    return dOut + dOut1.substring(1) + ']}';
  };
  