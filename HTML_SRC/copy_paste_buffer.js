//current page location constants creation
const {
    host, hostname, href, origin, pathname, port, protocol, search
  } = window.location

var host_name = "https://vlasovalexey.github.io/Minotaur/HTML_SRC/";
var link_buffer = "";

//put to clipboard plan
function btn_link() {
    navigator.clipboard.writeText(share_plan_link_gen());
    openLnkWrn();
}

//Open overlay window with copy link warning
function openLnkWrn() {
    del_html_elem("tn_overlay_text");
    create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("ch_lnkClipboard"));
    document.getElementById("AlertOverlay").style.height = "100%";
    document.getElementById("AlertOverlay").style.opacity = "1";
}

function share_plan_link_gen(){
    //add to var for plan sharing link
    link_buffer = host_name + "?:mtr=3:"

    //get styled geojson from map editor
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
    
    link_buffer += btoa(drawnItemsToJSON(allLayers));
    return link_buffer;
}

//paste and open to full screen if link containing info
function paste_link(){
    var url_arr = search;
    
    //assign values from url if present and recognized
	if(search == "" ){
		//do nothing but in future :)
	}
	else
	{
	//data present
        //url_arr = `https://vlasovalexey.github.io/Minotaur/HTML_SRC/?:mtr=3:eyJ0eXBlIjoiRmVhdHVyZUNvbGxlY3Rpb24iLCJmZWF0dXJlcyI6W3sidHlwZSI6IkZlYXR1cmUiLCJwcm9wZXJ0aWVzIjp7InN0cm9rZSI6dHJ1ZSwiY29sb3IiOiJibGFjayIsIndlaWdodCI6Mywib3BhY2l0eSI6MSwiZmlsbCI6ZmFsc2UsImZpbGxDb2xvciI6IiMyYzhhZmYiLCJmaWxsT3BhY2l0eSI6MC43LCJmaWxsUnVsZSI6ImV2ZW5vZGQiLCJkYXNoQXJyYXkiOiJudWxsIiwibGluZUNhcCI6InJvdW5kIiwibGluZUpvaW4iOiJyb3VuZCJ9LCJnZW9tZXRyeSI6eyJ0eXBlIjoiTGluZVN0cmluZyIsImNvb3JkaW5hdGVzIjpbWzE5LjAyMzk3OTc4NjI1MzgxLDQ3LjQ5NTAyMzkyMTkyNjMwNF0sWzE5LjAyNTkyMjEyNTM5NDU0LDQ3LjQ5NDE3NTk4NDc0NzE3XSxbMTkuMDI3MDU5NjI3ODc0NzEsNDcuNDk0MDk2MjYzNDUzNTJdLFsxOS4wMjgzMjU5MDQyMjA2MSw0Ny40OTQ5ODc2ODU1NzQ3Nl0sWzE5LjAyODUyOTc5NjE3NDYxLDQ3LjQ5NTUwMjIzOTQyMjg5XV19LCJzdHlsZSI6eyJzdHJva2UiOnRydWUsImNvbG9yIjoiYmxhY2siLCJ3ZWlnaHQiOjMsIm9wYWNpdHkiOjEsImZpbGwiOmZhbHNlLCJmaWxsQ29sb3IiOiIjMmM4YWZmIiwiZmlsbE9wYWNpdHkiOjAuNywiZmlsbFJ1bGUiOiJldmVub2RkIiwiZGFzaEFycmF5IjoibnVsbCIsImxpbmVDYXAiOiJyb3VuZCIsImxpbmVKb2luIjoicm91bmQifX0seyJ0eXBlIjoiRmVhdHVyZSIsInByb3BlcnRpZXMiOnsic3Ryb2tlIjp0cnVlLCJjb2xvciI6IiMyYzhhZmYiLCJ3ZWlnaHQiOjMsIm9wYWNpdHkiOjEsImZpbGwiOnRydWUsImZpbGxDb2xvciI6IiMyYzhhZmYiLCJmaWxsT3BhY2l0eSI6MC4yNSwiZmlsbFJ1bGUiOiJldmVub2RkIiwiZGFzaEFycmF5IjoibnVsbCIsImxpbmVDYXAiOiJyb3VuZCIsImxpbmVKb2luIjoicm91bmQifSwiZ2VvbWV0cnkiOnsidHlwZSI6IlBvbHlnb24iLCJjb29yZGluYXRlcyI6W1tbMTkuMDI2MTE1Mjg2MTkzMDU4LDQ3LjQ5NTgyMTExNTMzMzQxXSxbMTkuMDI2MDcyMzYxNTcxMTYsNDcuNDk0OTY1OTQzNzUxODhdLFsxOS4wMjUwOTU4MjY0MjMwNTUsNDcuNDk1MTI1MzgzNTc3NTVdLFsxOS4wMjQ4NzA0NzIxNTgxMjgsNDcuNDk1NDM3MDE0NTY2MjddLFsxOS4wMjYxMTUyODYxOTMwNTgsNDcuNDk1ODIxMTE1MzMzNDFdXV19LCJzdHlsZSI6eyJzdHJva2UiOnRydWUsImNvbG9yIjoiIzJjOGFmZiIsIndlaWdodCI6Mywib3BhY2l0eSI6MSwiZmlsbCI6dHJ1ZSwiZmlsbENvbG9yIjoiIzJjOGFmZiIsImZpbGxPcGFjaXR5IjowLjI1LCJmaWxsUnVsZSI6ImV2ZW5vZGQiLCJkYXNoQXJyYXkiOiJudWxsIiwibGluZUNhcCI6InJvdW5kIiwibGluZUpvaW4iOiJyb3VuZCJ9fV19`;
		if(url_arr.indexOf("%") != -1){
			url_arr = decodeURIComponent(url_arr);
		}

		if(url_arr.length > 10){
			url_arr = url_arr.split(":");
		}
        if(url_arr[1] == "mtr=3"){
            console.log(url_arr);
            //setTimeout(function(){
                geojson_styled_import(atob(url_arr[3]), 1);
            //},500);
            
        }
	}
}
paste_link();