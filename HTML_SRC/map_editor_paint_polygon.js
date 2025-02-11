//paint polygon settings
var paintpolygonControl = L.control.paintPolygon(
    {
        layerOptions: {
            color: '#2c8aff',
            fillColor: '#2c8aff',
            fillOpacity: 0.25,
            weight: 3,
        },
         drawOptions: {
            color: '#2c8aff',
            weight: 4
        },
        eraseOptions: {
            color: 'red',
            weight: 2
        },
        menu: {                   // Customize menu, set to false to prevent adding control UI on map, you need to build your own UI (on map or not)
          drawErase: true,
            size: true,
            eraseAll: true
        }
    }).addTo(map_editor);