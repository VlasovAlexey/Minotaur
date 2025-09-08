//Recording button start here
element_id_hide("rec_blinking");
element_id_hide("rec_blinking_map_rotator");

var GPX_File = "";
var GPX_file_num = 1;
var lat_start = "0.0";
var lon_start = "0.0";
var ele_start = "0.0";

var lat_reg = "0.0";
var lon_reg = "0.0";

var ele_reg = "0.0";
var ele_reg_const = 0;
var speed_reg = document.getElementById("const_spd_opt").value;
speed_reg = (speed_reg.replace(",", "."));

var course_reg = "0.0";
course_reg = wmm_correction(course_reg);

var lat_end = "0.0";
var lon_end = "0.0";
var ele_end = "0.0";

var meas_tick = 0;
var rec_first_start = 0;

var t_time = 0;
var t_time_interval;

var distance_map = 0;
var speed_map = 0;
var speed_map_arr = [];
var g84 = geodesic.Geodesic.WGS84;

var first_start_app = 1;

//track only display time on gui
function start_t_time(){
    t_time_interval = setInterval(()=>{
        t_time = t_time + 1;
    }, (1000));
}
function stop_t_time(){
	clearInterval(t_time_interval);
	t_time = 0;
}



function btn_record() {
	if (record_state == 0) {
		//move map rotator to fullscreen
		meas_state = 0;
		btn_meas_click();
		first_start_app = 0;

		//map rotator clear tracks and try create first point
		if (lat_reg != "0.0" && lon_reg != "0.0"){
			if($("#data_format_opt").val() * 1.0 == 1){
				//gps track and sensors on
				c_lat = lat_reg * 1.0;
				c_lon = lon_reg * 1.0;
				route_map_disp = [[lat_reg * 1.0 , lon_reg * 1.0]];

				//start min\max value for line coloring for map rotator
				ele_line_min = ele_reg - 10;
				ele_line_max = ele_reg + 10;
			} else {
				//constant speed track and sensors on
				c_lat = document.getElementById("default_lat_opt").value;
				c_lat = (c_lat.replace(",", ".")) * 1.0;

				c_lon = document.getElementById("default_lon_opt").value;
				c_lon = (c_lon.replace(",", ".")) * 1.0;
				route_map_disp = [[c_lat, c_lon]];
				ele_reg_const = parseFloat((document.getElementById("default_ele_opt").value).replace(",", "."));
				
				//start min\max value for line coloring for map rotator
				ele_line_min = ele_reg_const - 10;
				ele_line_max = ele_reg_const + 10;
			}
		} else {
			//bad news - sensor data or internet not available and get start value from default for all track modes
			c_lat = document.getElementById("default_lat_opt").value;
			c_lat = (c_lat.replace(",", ".")) * 1.0;

			c_lon = document.getElementById("default_lon_opt").value;
			c_lon = (c_lon.replace(",", ".")) * 1.0;
			route_map_disp = [[c_lat, c_lon]];

			ele_reg_const = parseFloat((document.getElementById("default_ele_opt").value).replace(",", "."));
			
			//start min\max value for line coloring for map rotator
			ele_line_min = ele_reg_const - 10;
			ele_line_max = ele_reg_const + 10;
		}
		

		document.getElementById("btn_rec").style.background = "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjEwMCUiCiAgIGhlaWdodD0iMTAwJSIKICAgdmlld0JveD0iMCAwIDcwMCA3MDAiCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzEwMDIiCiAgIHNvZGlwb2RpOmRvY25hbWU9InJlY19wcmVzcy5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMSAoYzY4ZTIyYzM4NywgMjAyMS0wNS0yMykiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczEwMDYiPgogICAgPHJlY3QKICAgICAgIHg9IjI2My4wNDYxOSIKICAgICAgIHk9IjMwNC4xMTk4NSIKICAgICAgIHdpZHRoPSIxNTYuNDI5NDYiCiAgICAgICBoZWlnaHQ9IjEwMy4xMjExIgogICAgICAgaWQ9InJlY3QyOTI1MSIgLz4KICAgIDxyZWN0CiAgICAgICB4PSIyNDEuMTk4NSIKICAgICAgIHk9IjI2My45MjAxIgogICAgICAgd2lkdGg9IjIyNC41OTQyNiIKICAgICAgIGhlaWdodD0iMTc0Ljc4MTUyIgogICAgICAgaWQ9InJlY3QxOTI1OSIgLz4KICAgIDxyZWN0CiAgICAgICB4PSIyNTMuNDMzMjEiCiAgICAgICB5PSIyOTIuNzU5MDUiCiAgICAgICB3aWR0aD0iMTk0Ljg4MTQiCiAgICAgICBoZWlnaHQ9IjEzOC45NTEzMSIKICAgICAgIGlkPSJyZWN0MzQ1OSIgLz4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXcxMDA0IgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjAuODA5MTMyMTkiCiAgICAgaW5rc2NhcGU6Y3g9IjQzNi44ODc4MiIKICAgICBpbmtzY2FwZTpjeT0iMzQxLjcyNDE0IgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDA5IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIxOTEyIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzEwMDIiIC8+CiAgPGcKICAgICBpZD0icmVjX29mZiIgLz4KICA8ZwogICAgIGlkPSIjMDAwMDAwZmYiCiAgICAgc3R5bGU9ImZpbGw6I2ZmMDAwMCIKICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLjQ1MDYzMTQsMCwwLDEuNDUwNjMxNCwtMTU3LjcyMDQ0LC0xNTcuNzE5OSkiPgogICAgPHBhdGgKICAgICAgIGZpbGw9IiM5Njk2OTYiCiAgICAgICBvcGFjaXR5PSIxIgogICAgICAgZD0ibSAzMzcuMzEsMTY5LjQ0IGMgLTQyLjg2LDIuODggLTg0LjQxLDIxLjcyIC0xMTQuODEsNTIuMDcgLTI3LjIxLDI2Ljg4IC00NS40Nyw2Mi42MyAtNTEuMzIsMTAwLjQzIC02LjIyLDM5LjEgMC45MSw4MC4xOCAyMCwxMTQuODcgMTguOCwzNC42NyA0OS4zNCw2Mi43NiA4NS40NCw3OC42NSAzMS41OSwxNC4wOCA2Ny4yNywxOC43NyAxMDEuNDMsMTMuMzYgMzMuNTgsLTUuMjMgNjUuNjIsLTIwLjE1IDkxLjEzLC00Mi42MiAzNi4zNywtMzEuNDcgNTkuMDgsLTc4LjEgNjEuNTMsLTEyNi4xMyAyLjE2LC0zNi44OSAtNy40NCwtNzQuMzQgLTI3LjAxLC0xMDUuNjcgLTE1Ljk3LC0yNS43NyAtMzguNTUsLTQ3LjM3IC02NSwtNjIuMTcgLTMwLjYsLTE3LjMxIC02Ni4zMywtMjUuMyAtMTAxLjM5LC0yMi43OSB6IgogICAgICAgaWQ9InBhdGg5OTciCiAgICAgICBzdHlsZT0iZmlsbDojZmYwMDAwIgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjY2NjY2NjYyIgLz4KICA8L2c+CiAgPGcKICAgICBhcmlhLWxhYmVsPSJSRUMiCiAgICAgdHJhbnNmb3JtPSJtYXRyaXgoNC4xODM2LDAsMCw0LjE4MzYsLTEwNzguMDQxNiwtMTAwMi41NDEyKSIKICAgICBpZD0idGV4dDI5MjQ5IgogICAgIHN0eWxlPSJmb250LXdlaWdodDo2MDA7Zm9udC1zaXplOjQwcHg7bGluZS1oZWlnaHQ6MS4yNTtmb250LWZhbWlseTphX0Z1dHVyaWNhTHQ7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjonYV9GdXR1cmljYUx0IFNlbWktQm9sZCc7dGV4dC1hbGlnbjpjZW50ZXI7d2hpdGUtc3BhY2U6cHJlO3NoYXBlLWluc2lkZTp1cmwoI3JlY3QyOTI1MSk7ZmlsbDojZmZmZmZmIj4KICAgIDxwYXRoCiAgICAgICBkPSJtIDMyOS45MTQwNiwzMzkuNjg5MzcgaCAtNi45OTIxOSBsIC03Ljg1MTU2LC0xMS43OTY4OCAtMS4xOTE0LC0wLjExNzE5IHYgMTEuOTE0MDcgaCAtNS42NDQ1NCB2IC0zMC4xNTYyNSBoIDguNDc2NTcgcSA1LjAzOTA2LDAgNy44MzIwMywyLjM0Mzc1IDIuODEyNSwyLjMyNDIyIDIuODEyNSw2LjYyMTA5IDAsMy4xMDU0NyAtMS43MzgyOCw1LjM5MDYzIC0xLjg5NDUzLDIuNDgwNDYgLTUuMTc1NzgsMy4wNDY4NyB6IG0gLTguMjQyMTksLTIwLjk1NzAzIHEgMCwtNC42NDg0NCAtNi40ODQzNywtNC42NDg0NCBoIC0xLjMwODU5IHYgOS4zNzUgaCAxLjQ4NDM3IHEgNi4zMDg1OSwwIDYuMzA4NTksLTQuNzI2NTYgeiIKICAgICAgIGlkPSJwYXRoODI4IiAvPgogICAgPHBhdGgKICAgICAgIGQ9Im0gMzQ4Ljc2MTcyLDMxNC40NTQ5OSBoIC0xMS4wMzUxNiB2IDYuODc1IGggMTAuNjA1NDcgdiA0LjkyMTg4IGggLTEwLjYwNTQ3IHYgOC41MTU2MiBoIDEwLjk5NjEgdiA0LjkyMTg4IGggLTE2LjY0MDYzIHYgLTMwLjE1NjI1IGggMTYuNjc5NjkgeiIKICAgICAgIGlkPSJwYXRoODMwIiAvPgogICAgPHBhdGgKICAgICAgIGQ9Im0gMzc0LjkxNDA2LDMzOC42MTUxNSBxIC0zLjgwODU5LDEuNzk2ODcgLTcuMzQzNzUsMS43OTY4NyAtNy4xMjg5LDAgLTExLjYyMTA5LC00LjQxNDA2IC00LjQ3MjY2LC00LjQzMzU5IC00LjQ3MjY2LC0xMS4zODY3MiAwLC02LjgzNTk0IDQuNzQ2MSwtMTEuMzY3MTkgNC42Mjg5LC00LjQzMzU5IDExLjM4NjcxLC00LjQzMzU5IDQuMDQyOTcsMCA3LjI2NTYzLDEuNzk2ODggdiA2LjcxODc1IHEgLTIuOTI5NjksLTMuMTY0MDcgLTcuNDgwNDcsLTMuMTY0MDcgLTQuMzE2NDEsMCAtNy4xNjc5NywyLjg1MTU3IC0yLjk0OTIyLDIuOTQ5MjEgLTIuOTQ5MjIsNy41OTc2NSAwLDQuNzQ2MSAyLjkyOTY5LDcuNjM2NzIgMi44MTI1LDIuNzkyOTcgNy4xODc1LDIuNzkyOTcgNC4zMTY0MSwwIDcuNTE5NTMsLTMuMTQ0NTMgeiIKICAgICAgIGlkPSJwYXRoODMyIiAvPgogIDwvZz4KPC9zdmc+Cg==) no-repeat center center";
		document.getElementById("btn_rec").style.border = "6px solid #fe2b2c";
		element_id_show("rec_blinking");
		element_id_show("rec_blinking_map_rotator");
		element_id_hide("main_parameters");
		element_id_hide("data_format");
		element_id_hide("tn_btn_restore");
		
		record_state = 1;
		
		//start time track display for gui
		start_t_time();

		//reset previous distance and speed if exist
		distance_map = 0;
		speed_map = 0;
		
		//clear once map path on realtime
		route_map_disp = [];
		
		//start path watcher for map rotator
		start_draw_path();

		//start sensor watchers for path writing
		geolocation_pos_watcher();
	} else {
		
		document.getElementById("btn_rec").style.background = "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjEwMCUiCiAgIGhlaWdodD0iMTAwJSIKICAgdmlld0JveD0iMCAwIDcwMCA3MDAiCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzEwMDIiCiAgIHNvZGlwb2RpOmRvY25hbWU9InJlY19tYWluLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMTAwNiI+CiAgICA8cmVjdAogICAgICAgeD0iMjYzLjA0NjE5IgogICAgICAgeT0iMzA0LjExOTg1IgogICAgICAgd2lkdGg9IjE1Ni40Mjk0NiIKICAgICAgIGhlaWdodD0iMTAzLjEyMTEiCiAgICAgICBpZD0icmVjdDI5MjUxIiAvPgogICAgPHJlY3QKICAgICAgIHg9IjI0MS4xOTg1IgogICAgICAgeT0iMjYzLjkyMDEiCiAgICAgICB3aWR0aD0iMjI0LjU5NDI2IgogICAgICAgaGVpZ2h0PSIxNzQuNzgxNTIiCiAgICAgICBpZD0icmVjdDE5MjU5IiAvPgogICAgPHJlY3QKICAgICAgIHg9IjI1My40MzMyMSIKICAgICAgIHk9IjI5Mi43NTkwNSIKICAgICAgIHdpZHRoPSIxOTQuODgxNCIKICAgICAgIGhlaWdodD0iMTM4Ljk1MTMxIgogICAgICAgaWQ9InJlY3QzNDU5IiAvPgogIDwvZGVmcz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9Im5hbWVkdmlldzEwMDQiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMC44MDkxMzIxOSIKICAgICBpbmtzY2FwZTpjeD0iNDM2Ljg4NzgyIgogICAgIGlua3NjYXBlOmN5PSIzNDEuNzI0MTQiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMDkiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjE5MTIiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnMTAwMiIgLz4KICA8ZwogICAgIGlkPSJyZWNfb2ZmIiAvPgogIDxnCiAgICAgaWQ9IiMwMDAwMDBmZiIKICAgICBzdHlsZT0iZmlsbDojZDQwMDAwIgogICAgIHRyYW5zZm9ybT0ibWF0cml4KDEuNDUwNjMxNCwwLDAsMS40NTA2MzE0LC0xNTcuNzIwNDQsLTE1Ny43MTk5KSI+CiAgICA8cGF0aAogICAgICAgZmlsbD0iIzk2OTY5NiIKICAgICAgIG9wYWNpdHk9IjEiCiAgICAgICBkPSJtIDMzNy4zMSwxNjkuNDQgYyAtNDIuODYsMi44OCAtODQuNDEsMjEuNzIgLTExNC44MSw1Mi4wNyAtMjcuMjEsMjYuODggLTQ1LjQ3LDYyLjYzIC01MS4zMiwxMDAuNDMgLTYuMjIsMzkuMSAwLjkxLDgwLjE4IDIwLDExNC44NyAxOC44LDM0LjY3IDQ5LjM0LDYyLjc2IDg1LjQ0LDc4LjY1IDMxLjU5LDE0LjA4IDY3LjI3LDE4Ljc3IDEwMS40MywxMy4zNiAzMy41OCwtNS4yMyA2NS42MiwtMjAuMTUgOTEuMTMsLTQyLjYyIDM2LjM3LC0zMS40NyA1OS4wOCwtNzguMSA2MS41MywtMTI2LjEzIDIuMTYsLTM2Ljg5IC03LjQ0LC03NC4zNCAtMjcuMDEsLTEwNS42NyAtMTUuOTcsLTI1Ljc3IC0zOC41NSwtNDcuMzcgLTY1LC02Mi4xNyAtMzAuNiwtMTcuMzEgLTY2LjMzLC0yNS4zIC0xMDEuMzksLTIyLjc5IHoiCiAgICAgICBpZD0icGF0aDk5NyIKICAgICAgIHN0eWxlPSJmaWxsOiNkNDAwMDAiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjY2NjY2NjIiAvPgogIDwvZz4KICA8ZwogICAgIGFyaWEtbGFiZWw9IlJFQyIKICAgICB0cmFuc2Zvcm09Im1hdHJpeCg0LjE4MzYsMCwwLDQuMTgzNiwtMTA3OC4wNDE2LC0xMDAyLjU0MTIpIgogICAgIGlkPSJ0ZXh0MjkyNDkiCiAgICAgc3R5bGU9ImZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6NDBweDtsaW5lLWhlaWdodDoxLjI1O2ZvbnQtZmFtaWx5OmFfRnV0dXJpY2FMdDstaW5rc2NhcGUtZm9udC1zcGVjaWZpY2F0aW9uOidhX0Z1dHVyaWNhTHQgU2VtaS1Cb2xkJzt0ZXh0LWFsaWduOmNlbnRlcjt3aGl0ZS1zcGFjZTpwcmU7c2hhcGUtaW5zaWRlOnVybCgjcmVjdDI5MjUxKTtmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjAuNTE5OTk5OTgiPgogICAgPHBhdGgKICAgICAgIGQ9Im0gMzI5LjkxNDA2LDMzOS42ODkzNyBoIC02Ljk5MjE5IGwgLTcuODUxNTYsLTExLjc5Njg4IC0xLjE5MTQsLTAuMTE3MTkgdiAxMS45MTQwNyBoIC01LjY0NDU0IHYgLTMwLjE1NjI1IGggOC40NzY1NyBxIDUuMDM5MDYsMCA3LjgzMjAzLDIuMzQzNzUgMi44MTI1LDIuMzI0MjIgMi44MTI1LDYuNjIxMDkgMCwzLjEwNTQ3IC0xLjczODI4LDUuMzkwNjMgLTEuODk0NTMsMi40ODA0NiAtNS4xNzU3OCwzLjA0Njg3IHogbSAtOC4yNDIxOSwtMjAuOTU3MDMgcSAwLC00LjY0ODQ0IC02LjQ4NDM3LC00LjY0ODQ0IGggLTEuMzA4NTkgdiA5LjM3NSBoIDEuNDg0MzcgcSA2LjMwODU5LDAgNi4zMDg1OSwtNC43MjY1NiB6IgogICAgICAgaWQ9InBhdGg4MjgiCiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eTowLjUxOTk5OTk4IiAvPgogICAgPHBhdGgKICAgICAgIGQ9Im0gMzQ4Ljc2MTcyLDMxNC40NTQ5OSBoIC0xMS4wMzUxNiB2IDYuODc1IGggMTAuNjA1NDcgdiA0LjkyMTg4IGggLTEwLjYwNTQ3IHYgOC41MTU2MiBoIDEwLjk5NjEgdiA0LjkyMTg4IGggLTE2LjY0MDYzIHYgLTMwLjE1NjI1IGggMTYuNjc5NjkgeiIKICAgICAgIGlkPSJwYXRoODMwIgogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MC41MTk5OTk5OCIgLz4KICAgIDxwYXRoCiAgICAgICBkPSJtIDM3NC45MTQwNiwzMzguNjE1MTUgcSAtMy44MDg1OSwxLjc5Njg3IC03LjM0Mzc1LDEuNzk2ODcgLTcuMTI4OSwwIC0xMS42MjEwOSwtNC40MTQwNiAtNC40NzI2NiwtNC40MzM1OSAtNC40NzI2NiwtMTEuMzg2NzIgMCwtNi44MzU5NCA0Ljc0NjEsLTExLjM2NzE5IDQuNjI4OSwtNC40MzM1OSAxMS4zODY3MSwtNC40MzM1OSA0LjA0Mjk3LDAgNy4yNjU2MywxLjc5Njg4IHYgNi43MTg3NSBxIC0yLjkyOTY5LC0zLjE2NDA3IC03LjQ4MDQ3LC0zLjE2NDA3IC00LjMxNjQxLDAgLTcuMTY3OTcsMi44NTE1NyAtMi45NDkyMiwyLjk0OTIxIC0yLjk0OTIyLDcuNTk3NjUgMCw0Ljc0NjEgMi45Mjk2OSw3LjYzNjcyIDIuODEyNSwyLjc5Mjk3IDcuMTg3NSwyLjc5Mjk3IDQuMzE2NDEsMCA3LjUxOTUzLC0zLjE0NDUzIHoiCiAgICAgICBpZD0icGF0aDgzMiIKICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjAuNTE5OTk5OTgiIC8+CiAgPC9nPgo8L3N2Zz4K) no-repeat center center";
		document.getElementById("btn_rec").style.border = "6px solid #969696";
		element_id_hide("rec_blinking");
		element_id_hide("rec_blinking_map_rotator");
		element_id_show("main_parameters");
		element_id_show("data_format");
		element_id_show("tn_btn_restore");
		record_state = 0;
		rec_first_start = 0;

		var GPX_File = arr_to_gpx(route_map_disp);

		//and write file
		scr_n_add = "";
		if (GPX_file_num < 10 ) {
			scr_n_add = "0";
		}
		
		var fl_name = scr_n_add + GPX_file_num + "_" + (track_name.value).toString() + "_" + get_date_hr() + ".gpx";
		GPX_file_num = GPX_file_num + 1;
		var blob = new Blob([GPX_File], {
			type: "application/gpx;charset=utf-8"
		});
		saveAs(blob, fl_name);
		
		//Android save from WebView
		generateAndDownload(GPX_File, fl_name, "application/gpx;charset=utf-8");
		
		stop_t_time();
		GPX_File = [];

		//send to 3d view new recorded track
		result = opt3D_Line(route_map_disp , 0.0000001);

		//clear previous data
		x = [];
		y = [];
		z = [];
		c = [];
		for (i = 0; i < result.length; i++) {
			x.push((result[i].y));
			y.push((result[i].x));
			z.push((result[i].z));
			c.push(i);
		}

		//draw new 3d chart with new data
		del_html_elem("trackChart_opt");
		gps_chart();

		//draw middle speed value after all
		speed_map = 0;
		for (i = 1; i < route_map_disp.length-1; i++) {
			lat_1 = route_map_disp[i-1].x;
			lon_1 = route_map_disp[i-1].y;
			lat_2 = route_map_disp[i].x;
			lon_2 = route_map_disp[i].y;
			g84inv = g84.Inverse(lat_1, lon_1, lat_2, lon_2);
			
			var rec_vls = document.getElementById("rec_freq_opt").value;
			if($("#data_format_opt").val() * 1.0 == 1){
        		//regular GPS track
        		rec_vls = 1;
    		}
			speed_map = speed_map + ((1 / rec_vls) * g84inv.s12);
		}
		speed_map = (speed_map/(route_map_disp.length - 1)) * 3600 / 1000;
		
	}
}

const meas_main_svg = `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiID8+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgNzAwIDcwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgaWQ9IiNmZmZmZmZmZiI+DQo8L2c+DQo8ZyBpZD0iIzAwMDAwMGZmIj4NCjxwYXRoIGZpbGw9IiM5Njk2OTYiIG9wYWNpdHk9IjEuMDAiIGQ9IiBNIDQ0OS40OSAxMDkuNjggQyA0NjUuNjQgMTA4LjAzIDQ4Mi45MCAxMDYuOTMgNDk4LjI1IDExMi44NiBDIDUxOS4xNyAxMTkuNTQgNTM2LjkwIDEzNC41OCA1NDkuMTYgMTUyLjgyIEMgNTY1LjY5IDE3OC4yOSA1NjcuODQgMjEzLjAyIDU1Ni4zNiAyNDAuMzcgQyA1NDYuMDkgMjY2LjI5IDUyOS4xOSAyODkuMzMgNTEwLjk2IDMxMC45NyBDIDUwMy44MiAzMTkuMTIgNDk3LjU0IDMyOC40MSA0ODcuOTYgMzMzLjk2IEMgNDcxLjM1IDM0Mi40OCA0NDkuMzYgMzM5LjQ5IDQzNy41MSAzMjQuNDkgQyA0MTIuNTkgMjk2Ljc3IDM4Ny4zOSAyNjUuNjQgMzc2LjYzIDIzMC40NSBDIDM3MS4yOCAyMDcuMjkgMzcxLjU0IDE4Mi4zMiAzODIuNTcgMTYxLjYzIEMgMzk1LjA5IDEzNS4wMiA0MjAuOTAgMTE1LjYzIDQ0OS40OSAxMDkuNjggTSA0NjIuMzMgMTcyLjI3IEMgNDQ3LjgwIDE3NC44MyA0MzUuNDEgMTg4Ljk3IDQzNi41NiAyMDQuMDAgQyA0MzUuODQgMjE2LjgwIDQ0NS4zNSAyMjguMTIgNDU2LjUzIDIzMy40OCBDIDQ2NC41NiAyMzQuOTYgNDczLjE3IDIzNS40MSA0ODEuMDUgMjMyLjk1IEMgNDk4LjIxIDIyNS44MiA1MDQuNDEgMjA0LjA1IDQ5Ni41MSAxODguNDcgQyA0OTAuMDcgMTc2LjU3IDQ3NS43OSAxNjkuMTAgNDYyLjMzIDE3Mi4yNyBaIiAvPg0KPHBhdGggZmlsbD0iIzk2OTY5NiIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMTY0LjQ0IDI5Mi41MiBDIDE3NC45MCAyOTAuMDUgMTg3LjYzIDI5MS4zNiAxOTUuMDQgMjk5Ljk4IEMgMjA3LjM0IDMxMC4xOSAyMDguNjIgMzI5LjQ2IDE5OC45OSAzNDEuOTkgQyAxOTEuMzMgMzUyLjg1IDE3Ni45MSAzNTYuNjkgMTY0LjI4IDM1My41MCBDIDE1Mi4xMCAzNDkuMjEgMTQxLjE0IDMzNi42NiAxNDIuNTMgMzIzLjAwIEMgMTQxLjQ1IDMwOS4zNCAxNTEuNTMgMjk2LjQxIDE2NC40NCAyOTIuNTIgWiIgLz4NCjxwYXRoIGZpbGw9IiM5Njk2OTYiIG9wYWNpdHk9IjEuMDAiIGQ9IiBNIDMwMC40MCAyOTIuNDIgQyAzMTkuNjIgMjg2LjI5IDM0Mi4wMCAzMDIuNjkgMzQwLjQ1IDMyMi45OSBDIDM0MS40MSAzNDEuMTQgMzI0LjY0IDM1Ni4zMCAzMDcuMDEgMzU0LjM4IEMgMjkwLjQwIDM1NC4zMyAyNzUuNTYgMzM3LjcxIDI3Ny42MCAzMjAuOTkgQyAyNzcuNTUgMzA3LjkyIDI4Ny45NCAyOTUuOTYgMzAwLjQwIDI5Mi40MiBaIiAvPg0KPHBhdGggZmlsbD0iIzk2OTY5NiIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMTI2LjM5IDQyNy4zNyBDIDE0NC4zOSA0MjIuMjMgMTYzLjgyIDQzNi43NCAxNjUuMzcgNDU0Ljk5IEMgMTY1LjQ5IDQ3NS42MCAxNjUuMzggNDk2LjIyIDE2NS40MyA1MTYuODQgQyAxNjcuMDQgNTE4LjE5IDE2OC4zOSA1MTkuODYgMTY5LjkwIDUyMS4zNSBDIDE5NS4wNSA1MjEuNjggMjIwLjIxIDUyMS4zNyAyNDUuMzcgNTIxLjUwIEMgMjQ1Ljk2IDUwMC4wMiAyNDUuMzcgNDc4LjUxIDI0NS42NiA0NTcuMDEgQyAyNDUuMjcgNDQ0LjMzIDI1NS4zMSA0MzEuOTUgMjY2LjI2IDQyOC4zOCBDIDI4My43OCA0MjEuMDYgMzA0Ljg3IDQzNC43NiAzMDguMzEgNDUxLjk4IEMgMzA4LjU3IDQ3NS4yMiAzMDguNTQgNDk4LjQ3IDMwOC4zMyA1MjEuNzEgQyAzMzUuMTQgNTIyLjIzIDM2MS45OCA1MjIuMDggMzg4Ljc4IDUyMS43NSBDIDM4OS4wMiA0OTguODMgMzg4LjMxIDQ3NS44NSAzODkuMTYgNDUyLjk1IEMgMzkxLjE0IDQzMS41NSA0MTkuNDIgNDE5LjU0IDQzNS40OSA0MzAuNDAgQyA0NDQuNzggNDM1LjU5IDQ1Mi4wNyA0NDYuMDcgNDUxLjUyIDQ1Ny4wMSBDIDQ1MS4zNyA0NzguNTUgNDUxLjcwIDUwMC4xMCA0NTEuMzUgNTIxLjY0IEMgNDc2LjY1IDUyMS4zMyA1MDEuOTcgNTIxLjUwIDUyNy4yOCA1MjEuNTUgQyA1MjkuMjAgNTE5LjU0IDUzMi40NiA1MTguMTggNTMxLjkxIDUxNC45MCBDIDUzMi43MSA0OTMuOTkgNTMxLjc2IDQ3My4wMiA1MzIuNDAgNDUyLjEwIEMgNTM1LjA4IDQ0MC4wMiA1NDUuNjQgNDI5LjE4IDU1OC4xMSA0MjcuMDIgQyA1NzQuMDAgNDIzLjY2IDU5MC43NCA0MzQuMjAgNTk0LjMyIDQ0OS45NyBDIDU5NC42OSA0NzguMDAgNTk0LjY0IDUwNi4wNCA1OTQuMzIgNTM0LjA3IEMgNTg5LjIyIDU2NC4zMyA1NTkuNjIgNTg3LjUyIDUyOS4wMCA1ODUuNDAgQyA0MDcuMzMgNTg1LjM1IDI4NS42NiA1ODUuNDIgMTY0LjAwIDU4NS4zNyBDIDEzMi44MiA1ODUuNDkgMTA0LjI3IDU1OC4xNSAxMDIuNjQgNTI3Ljk5IEMgMTAyLjQ4IDUwMy4wMCAxMDIuNDggNDc4LjAwIDEwMi42NCA0NTMuMDEgQyAxMDQuMjQgNDQwLjkxIDExNC41OCA0MjkuNjUgMTI2LjM5IDQyNy4zNyBaIiAvPg0KPC9nPg0KPC9zdmc+DQo=) no-repeat center center`;
//Measure button start here
document.getElementById("btn_meas").style.background = meas_main_svg;
document.getElementById("btn_meas").style.border = "6px solid #969696";

element_id_hide("map_hide");

function btn_meas_click() {
	//move all GUI to up every time if used full screen map rotator
	//this keep record button position on one place
	document.getElementById("8-header").click();
	document.getElementById("4-header").click();

	meas_tick = meas_tick + 1;
	if (meas_state == 0) {
		document.getElementById("btn_rec_fullscreen").className = "map_button_rec_fullscreen";
		
		document.getElementById("btn_meas").style.background = "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiID8+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgNzAwIDcwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgaWQ9IiNmZmZmZmZmZiI+DQo8L2c+DQo8ZyBpZD0iIzAwMDAwMGZmIj4NCjxwYXRoIGZpbGw9IiMxODg5NTgiIG9wYWNpdHk9IjEuMDAiIGQ9IiBNIDQ0OS40OSAxMDkuNjggQyA0NjUuNjQgMTA4LjAzIDQ4Mi45MCAxMDYuOTMgNDk4LjI1IDExMi44NiBDIDUxOS4xNyAxMTkuNTQgNTM2LjkwIDEzNC41OCA1NDkuMTYgMTUyLjgyIEMgNTY1LjY5IDE3OC4yOSA1NjcuODQgMjEzLjAyIDU1Ni4zNiAyNDAuMzcgQyA1NDYuMDkgMjY2LjI5IDUyOS4xOSAyODkuMzMgNTEwLjk2IDMxMC45NyBDIDUwMy44MiAzMTkuMTIgNDk3LjU0IDMyOC40MSA0ODcuOTYgMzMzLjk2IEMgNDcxLjM1IDM0Mi40OCA0NDkuMzYgMzM5LjQ5IDQzNy41MSAzMjQuNDkgQyA0MTIuNTkgMjk2Ljc3IDM4Ny4zOSAyNjUuNjQgMzc2LjYzIDIzMC40NSBDIDM3MS4yOCAyMDcuMjkgMzcxLjU0IDE4Mi4zMiAzODIuNTcgMTYxLjYzIEMgMzk1LjA5IDEzNS4wMiA0MjAuOTAgMTE1LjYzIDQ0OS40OSAxMDkuNjggTSA0NjIuMzMgMTcyLjI3IEMgNDQ3LjgwIDE3NC44MyA0MzUuNDEgMTg4Ljk3IDQzNi41NiAyMDQuMDAgQyA0MzUuODQgMjE2LjgwIDQ0NS4zNSAyMjguMTIgNDU2LjUzIDIzMy40OCBDIDQ2NC41NiAyMzQuOTYgNDczLjE3IDIzNS40MSA0ODEuMDUgMjMyLjk1IEMgNDk4LjIxIDIyNS44MiA1MDQuNDEgMjA0LjA1IDQ5Ni41MSAxODguNDcgQyA0OTAuMDcgMTc2LjU3IDQ3NS43OSAxNjkuMTAgNDYyLjMzIDE3Mi4yNyBaIiAvPg0KPHBhdGggZmlsbD0iIzE4ODk1OCIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMTY0LjQ0IDI5Mi41MiBDIDE3NC45MCAyOTAuMDUgMTg3LjYzIDI5MS4zNiAxOTUuMDQgMjk5Ljk4IEMgMjA3LjM0IDMxMC4xOSAyMDguNjIgMzI5LjQ2IDE5OC45OSAzNDEuOTkgQyAxOTEuMzMgMzUyLjg1IDE3Ni45MSAzNTYuNjkgMTY0LjI4IDM1My41MCBDIDE1Mi4xMCAzNDkuMjEgMTQxLjE0IDMzNi42NiAxNDIuNTMgMzIzLjAwIEMgMTQxLjQ1IDMwOS4zNCAxNTEuNTMgMjk2LjQxIDE2NC40NCAyOTIuNTIgWiIgLz4NCjxwYXRoIGZpbGw9IiMxODg5NTgiIG9wYWNpdHk9IjEuMDAiIGQ9IiBNIDMwMC40MCAyOTIuNDIgQyAzMTkuNjIgMjg2LjI5IDM0Mi4wMCAzMDIuNjkgMzQwLjQ1IDMyMi45OSBDIDM0MS40MSAzNDEuMTQgMzI0LjY0IDM1Ni4zMCAzMDcuMDEgMzU0LjM4IEMgMjkwLjQwIDM1NC4zMyAyNzUuNTYgMzM3LjcxIDI3Ny42MCAzMjAuOTkgQyAyNzcuNTUgMzA3LjkyIDI4Ny45NCAyOTUuOTYgMzAwLjQwIDI5Mi40MiBaIiAvPg0KPHBhdGggZmlsbD0iIzE4ODk1OCIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMTI2LjM5IDQyNy4zNyBDIDE0NC4zOSA0MjIuMjMgMTYzLjgyIDQzNi43NCAxNjUuMzcgNDU0Ljk5IEMgMTY1LjQ5IDQ3NS42MCAxNjUuMzggNDk2LjIyIDE2NS40MyA1MTYuODQgQyAxNjcuMDQgNTE4LjE5IDE2OC4zOSA1MTkuODYgMTY5LjkwIDUyMS4zNSBDIDE5NS4wNSA1MjEuNjggMjIwLjIxIDUyMS4zNyAyNDUuMzcgNTIxLjUwIEMgMjQ1Ljk2IDUwMC4wMiAyNDUuMzcgNDc4LjUxIDI0NS42NiA0NTcuMDEgQyAyNDUuMjcgNDQ0LjMzIDI1NS4zMSA0MzEuOTUgMjY2LjI2IDQyOC4zOCBDIDI4My43OCA0MjEuMDYgMzA0Ljg3IDQzNC43NiAzMDguMzEgNDUxLjk4IEMgMzA4LjU3IDQ3NS4yMiAzMDguNTQgNDk4LjQ3IDMwOC4zMyA1MjEuNzEgQyAzMzUuMTQgNTIyLjIzIDM2MS45OCA1MjIuMDggMzg4Ljc4IDUyMS43NSBDIDM4OS4wMiA0OTguODMgMzg4LjMxIDQ3NS44NSAzODkuMTYgNDUyLjk1IEMgMzkxLjE0IDQzMS41NSA0MTkuNDIgNDE5LjU0IDQzNS40OSA0MzAuNDAgQyA0NDQuNzggNDM1LjU5IDQ1Mi4wNyA0NDYuMDcgNDUxLjUyIDQ1Ny4wMSBDIDQ1MS4zNyA0NzguNTUgNDUxLjcwIDUwMC4xMCA0NTEuMzUgNTIxLjY0IEMgNDc2LjY1IDUyMS4zMyA1MDEuOTcgNTIxLjUwIDUyNy4yOCA1MjEuNTUgQyA1MjkuMjAgNTE5LjU0IDUzMi40NiA1MTguMTggNTMxLjkxIDUxNC45MCBDIDUzMi43MSA0OTMuOTkgNTMxLjc2IDQ3My4wMiA1MzIuNDAgNDUyLjEwIEMgNTM1LjA4IDQ0MC4wMiA1NDUuNjQgNDI5LjE4IDU1OC4xMSA0MjcuMDIgQyA1NzQuMDAgNDIzLjY2IDU5MC43NCA0MzQuMjAgNTk0LjMyIDQ0OS45NyBDIDU5NC42OSA0NzguMDAgNTk0LjY0IDUwNi4wNCA1OTQuMzIgNTM0LjA3IEMgNTg5LjIyIDU2NC4zMyA1NTkuNjIgNTg3LjUyIDUyOS4wMCA1ODUuNDAgQyA0MDcuMzMgNTg1LjM1IDI4NS42NiA1ODUuNDIgMTY0LjAwIDU4NS4zNyBDIDEzMi44MiA1ODUuNDkgMTA0LjI3IDU1OC4xNSAxMDIuNjQgNTI3Ljk5IEMgMTAyLjQ4IDUwMy4wMCAxMDIuNDggNDc4LjAwIDEwMi42NCA0NTMuMDEgQyAxMDQuMjQgNDQwLjkxIDExNC41OCA0MjkuNjUgMTI2LjM5IDQyNy4zNyBaIiAvPg0KPC9nPg0KPC9zdmc+DQo=) no-repeat center center";
		document.getElementById("btn_meas").style.border = "6px solid #188958";
		meas_state = 1;

		element_id_show("map_hide");
		element_id_hide("gps_base");
		element_id_hide("dialContainer");
		element_id_hide("info_glob");
		element_id_hide("compas_head_box");
		element_id_hide("map_editor");

	} else {
		document.getElementById("btn_rec_fullscreen").className = "map_button_rec_hided";

		document.getElementById("btn_meas").style.background = meas_main_svg;
		document.getElementById("btn_meas").style.border = "6px solid #969696";
		meas_state = 0;
		
		element_id_hide("map_hide");
		element_id_show("gps_base");
		element_id_show("dialContainer");
		element_id_show("info_glob");
		element_id_show("compas_head_box");
		element_id_show("map_editor");
	}
}

// The date of the last geolocation update.
var lastUpdate = new Date();
var orient_a = 0;
var orient_b = 0;
var orient_bt = 0;
var orient_g = 0;

function geolocation_pos_watcher() {	
	//display geolocation warning usage
	window.addEventListener("load", () => {
		if (!navigator.geolocation) {
			updateError({
				code: NONAVIGATION
			});
			return;
		}

		window.addEventListener("deviceorientation", event => {
			orient_a = Math.round(event.alpha);
			orient_b = Math.round(event.beta);
			orient_g = Math.round(event.gamma);
		});

		//acceleration 
		window.addEventListener("devicemotion", event => {
			accel_x = parseFloat(event.acceleration.x).toFixed(3);
			accel_y = parseFloat(event.acceleration.y).toFixed(3);
			accel_z = parseFloat(event.acceleration.z).toFixed(3);
			rot_rate_a = parseFloat(event.rotationRate.alpha).toFixed(3);
			rot_rate_b = parseFloat(event.rotationRate.beta).toFixed(3);
			rot_rate_g = parseFloat(event.rotationRate.gamma).toFixed(3);
		});
		navigator.geolocation.watchPosition(g => {
			//document.getElementById("btn_nav").style.background = nav_ok_svg;
			lastUpdate = new Date();
			errorHidden();
			updateTime();
			updateGeo(g.coords);
		}, updateError, {
			enableHighAccuracy: true,
		});
		window.setInterval(updateTime, 1);
	}, {
		//once: true,
	});
}

//important request for interface geolocation here!
if(url_arr.indexOf("?:mtr") != -1){
} else {
	geolocation_pos_watcher();
}

//acceleration watch sensor write info to arr
var accel_arr = [];

var accel_x = 0;
var accel_y = 0;
var accel_z = 0;

var rot_rate_a = 0;
var rot_rate_b = 0;
var rot_rate_g = 0;

function AccelWatch(){
	if (record_state == 1) {
		//errors handler
		if (accel_x == null || accel_x == undefined || isNaN(accel_x) == true) {
			accel_x = "0.0";
		}
		if (accel_y == null || accel_y == undefined || isNaN(accel_y) == true) {
			accel_y = "0.0";
		}
		if (accel_z == null || accel_z == undefined || isNaN(accel_z) == true) {
			accel_z = "0.0";
		}
		if (rot_rate_a == null || rot_rate_a == undefined || isNaN(rot_rate_a) == true) {
			rot_rate_a = "0.0";
		}
		if (rot_rate_b == null || rot_rate_b == undefined || isNaN(rot_rate_b) == true) {
			rot_rate_b = "0.0";
		}
		if (rot_rate_g == null || rot_rate_g == undefined|| isNaN(rot_rate_g) == true) {
			rot_rate_g = "0.0";
		}
	
		accel_arr = accel_arr + "      <a_x>" + accel_x + "</a_x>\n";
		accel_arr = accel_arr + "      <a_y>" + accel_y + "</a_y>\n";
		accel_arr = accel_arr + "      <a_z>" + accel_z + "</a_z>\n";

		accel_arr = accel_arr + "      <rr_a>" + rot_rate_a + "</rr_a>\n";
		accel_arr = accel_arr + "      <rr_b>" + rot_rate_b + "</rr_b>\n";
		accel_arr = accel_arr + "      <rr_g>" + rot_rate_g + "</rr_g>\n";

	}
	else{
		accel_arr = [];
	}
}

//global watch function for all global values in one place
function GlobalWatch() {
	//recording and we need add every interval data to file
	if (record_state == 1) {

		//errors handler
		if (lat_reg == null || lat_reg == undefined || isNaN(lat_reg) == true) {
			lat_reg = "0.0";
		}
		if (lon_reg == null || lon_reg == undefined || isNaN(lon_reg) == true) {
			lon_reg = "0.0";
		}
		if (ele_reg == null || ele_reg == undefined  || isNaN(ele_reg) == true) {
			ele_reg = "0.0";
		}

		if (acHeading == null || acHeading == undefined  || isNaN(acHeading) == true) {
			acHeading = "0.0";
		} else {
			course_reg = acHeading;
		}

		//write to file
		if($("#data_format_opt").val() * 1.0 == 1){
            //Regular GPS Tracking
			if(document.getElementById("accel_use_opt").value == 1){
				route_map_disp.push({
					x: lat_reg,
					y: lon_reg,
					z: ele_reg,
					course: course_reg,
					a: orient_a,
					b: orient_b,
					g: orient_g,
					meas: meas_tick,
					accel: accel_arr
				});
			} else {
				route_map_disp.push({
					x: lat_reg,
					y: lon_reg,
					z: ele_reg,
					course: course_reg,
					a: orient_a,
					b: orient_b,
					g: orient_g,
					meas: meas_tick,
					accel: ""
				});
			}
        } else {
            //all others modes with Constant Speed e.g.
            c_time_freq = document.getElementById("rec_freq_opt").value;
            c_speed = document.getElementById("const_spd_opt").value;
            c_speed = (c_speed.replace(",", ".")) * 1.0;
            
			//check device orientation about beta angle
			if (orient_b >= 0) {
				orient_bt = orient_b;
				if (orient_b > 89){orient_bt = 89;}
			} else {
				orient_bt = orient_b;
				if (orient_b < -89){orient_bt = -89;}
			}

			//make new altitude calculation
			if (orient_bt >= 0) {
				ele_reg_const = ele_reg_const + (Math.sin((Math.PI * Math.abs(orient_bt)) / 180) * (c_time_freq * c_speed));
			} else {
				ele_reg_const = ele_reg_const - (Math.sin((Math.PI * Math.abs(orient_bt)) / 180) * (c_time_freq * c_speed));
			}
            c_lat_new = destinationPoint(c_lat, c_lon, (Math.cos((Math.PI * Math.abs(orient_bt)) / 180) * (c_time_freq * c_speed)) , acHeading * 1.0).lat;
			c_lon_new = destinationPoint(c_lat, c_lon, (Math.cos((Math.PI * Math.abs(orient_bt)) / 180) * (c_time_freq * c_speed)) , acHeading * 1.0).lon;
			c_lat = c_lat_new;
            c_lon = c_lon_new;

			if(document.getElementById("accel_use_opt").value == 1){
				//route_map_disp.push([c_lat,c_lon,ele_reg_const,course_reg,orient_a,orient_b,orient_g,meas_tick,accel_arr]);
				route_map_disp.push({
					x: c_lat,
					y: c_lon,
					z: ele_reg_const,
					course: course_reg,
					a: orient_a,
					b: orient_b,
					g: orient_g,
					meas: meas_tick,
					accel: accel_arr
				});
			} else {
				//route_map_disp.push([c_lat,c_lon,ele_reg_const,course_reg,orient_a,orient_b,orient_g,meas_tick,""]);
				route_map_disp.push({
					x: c_lat,
					y: c_lon,
					z: ele_reg_const,
					course: course_reg,
					a: orient_a,
					b: orient_b,
					g: orient_g,
					meas: meas_tick,
					accel: ""
				});
			}
        }
		accel_arr = [];
		meas_tick = 0;
		if (rec_first_start == 0) {
			if($("#data_format_opt").val() * 1.0 == 1){
				//regular GPS
				lat_start = lat_reg;
				lon_start = lon_reg;
				ele_start = ele_reg;
			} else {
				//constant speed DPV
				lat_start = c_lat;
				lon_start = c_lon;
				ele_start = ele_reg_const;
			}

			rec_first_start = 1;
		} else {
			if($("#data_format_opt").val() * 1.0 == 1){
				//regular GPS
				lat_end = lat_reg;
				lon_end = lon_reg;
				ele_end = ele_reg;
			} else {
				//constant speed DPV
				lat_end = c_lat;
				lon_end = c_lon;
				ele_end = ele_reg_const;
			}
		}
		
		//if($("#data_format_opt").val() * 1.0 == 1){
            //Regular GPS Tracking need get bigger distances between points
			if(route_map_disp.length > 20){
				var arr_size = route_map_disp.length - 1;
				var lat_1 = route_map_disp[arr_size - 1].x;
				var lon_1 = route_map_disp[arr_size - 1].y;
				var lat_2 = route_map_disp[arr_size].x;
				var lon_2 = route_map_disp[arr_size].y;
				// Do the classic `geodesic inversion` computation
				g84inv = g84.Inverse(lat_1, lon_1, lat_2, lon_2);
				distance_map = distance_map + g84inv.s12;
				
				//compute highly approximated speed
				speed_map = 0;
				for (i = route_map_disp.length - 20; i < route_map_disp.length - 1; i++) {
					lat_1 = route_map_disp[i-1].x;
					lon_1 = route_map_disp[i-1].y;
					lat_2 = route_map_disp[i].x;
					lon_2 = route_map_disp[i].y;
					g84inv = g84.Inverse(lat_1, lon_1, lat_2, lon_2);
					var rec_vls = document.getElementById("rec_freq_opt").value;
					if($("#data_format_opt").val() * 1.0 == 1){
        				//regular GPS track
        				rec_vls = 1;
    				}
					speed_map = (speed_map + ((1 / rec_vls) * g84inv.s12));
					//speed_map = speed_map.toFixed(6) * 1.0;
				}
				//display in kilometers per hour
				speed_map = (speed_map/19) * 3600 / 1000;
			}
		
		//error handler
		if (lat_start == null || lat_start == undefined) {
			lat_start = "0.0"
		};
		if (lat_end == null || lat_end == undefined) {
			lat_end = "0.0"
		};

		if (lon_start == null || lon_start == undefined) {
			lon_start = "0.0"
		};
		if (lon_end == null || lon_end == undefined) {
			lon_end = "0.0"
		};

		if (ele_start == null || ele_start == undefined) {
			ele_start = "0.0"
		};
		if (ele_end == null || ele_end == undefined) {
			ele_end = "0.0"
		};
	}
}

// Update all the element in DOM with the new geolocation information in a GeolocationCoordinates object 
function updateGeo(c) {
	[
		"accuracy",
		"altitude",
		"altitudeAccuracy",
		"latitude",
		"longitude",
		"speed",
	].forEach(p => {
		
	});

	lat_reg = c.latitude;
	lon_reg = c.longitude;
	ele_reg = c.altitude;
}

const Second = 1000;
const Minute = 60 * Second;
const NONAVIGATION = -1; // a non-standard error code
const PERMISSION_DENIED = 1;
const POSITION_UNAVAILABLE = 2;
const TIMEOUT = 3;

// Hidden all error paragraph.
function errorHidden() {
	[
		"error-NONAVIGATION",
		"error-PERMISSION_DENIED",
		"error-POSITION_UNAVAILABLE",
		"error-TIMEOUT",
		"error-OTHER",
	].forEach(e => document.getElementById(e).hidden = true);

}

// Take a GeolocationPositionError object and display the error with the
// good paragraph.
const gps_no_svg = `url(url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnDQogICB2aWV3Qm94PSIwIDAgOTYwIDk2MCINCiAgIHZlcnNpb249IjEuMSINCiAgIGlkPSJzdmc0MjEwNyINCiAgIHNvZGlwb2RpOmRvY25hbWU9Imdwc19vay5zdmciDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjEgKGM2OGUyMmMzODcsIDIwMjEtMDUtMjMpIg0KICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPGRlZnMNCiAgICAgaWQ9ImRlZnM0MjExMSIgLz4NCiAgPHNvZGlwb2RpOm5hbWVkdmlldw0KICAgICBpZD0ibmFtZWR2aWV3NDIxMDkiDQogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiINCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiDQogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCINCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiINCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCINCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCINCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB0Ig0KICAgICBzaG93Z3JpZD0iZmFsc2UiDQogICAgIGlua3NjYXBlOnpvb209IjAuNjQzNzUiDQogICAgIGlua3NjYXBlOmN4PSI2MzkuMjIzMyINCiAgICAgaW5rc2NhcGU6Y3k9IjY0MC43NzY3Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiDQogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMDkiDQogICAgIGlua3NjYXBlOndpbmRvdy14PSIxOTEyIg0KICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTgiDQogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiDQogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzQyMTA3IiAvPg0KICA8Zw0KICAgICBpZD0iI2ZmZmZmZmZmIiAvPg0KICA8Zw0KICAgICBpZD0iIzAwMDAwMGZmIg0KICAgICBzdHlsZT0iZmlsbDojOTY5Njk2O2ZpbGwtb3BhY2l0eToxIj4NCiAgICA8cGF0aA0KICAgICAgIGZpbGw9IiMwMDAwMDAiDQogICAgICAgb3BhY2l0eT0iMS4wMCINCiAgICAgICBkPSIgTSAxNDguMTMgMTYxLjE1IEMgMTYzLjYzIDE1NS4wNyAxODAuNjQgMTU0LjIxIDE5Ny4wNyAxNTUuNjEgQyAyMDYuNjMgMTU2LjU2IDIxNi4yNSAxNTguMTcgMjI1LjIyIDE2MS43MCBDIDIyNS4wNyAxNzIuMTAgMjI1LjIwIDE4Mi41MSAyMjUuMTYgMTkyLjkxIEMgMjExLjIyIDE4NC45NiAxOTQuODAgMTgyLjQwIDE3OC45MyAxODMuMTEgQyAxNjcuODkgMTgzLjczIDE1Ni45OSAxODguMjggMTQ5LjMxIDE5Ni4zMiBDIDE0MS40NiAyMDQuMTUgMTM3LjIxIDIxNS4wMSAxMzYuMjQgMjI1Ljk0IEMgMTM1LjQ3IDIzNi4wNiAxMzYuMTAgMjQ2LjUzIDEzOS45MCAyNTYuMDQgQyAxNDIuOTIgMjYzLjY3IDE0OC4zMyAyNzAuMzcgMTU1LjMxIDI3NC43MiBDIDE2Mi4zNCAyNzkuMTQgMTcwLjc0IDI4MS4wMyAxNzguOTkgMjgxLjAwIEMgMTg1LjY2IDI4MS4xMSAxOTIuNDggMjgwLjM2IDE5OC42NSAyNzcuNjYgQyAxOTguNjkgMjY3Ljk1IDE5OC42NSAyNTguMjQgMTk4LjY3IDI0OC41MiBDIDE4OC43NCAyNDguNTEgMTc4LjgyIDI0OC41MiAxNjguODkgMjQ4LjUyIEMgMTY4LjgzIDIzOS41MiAxNjguODggMjMwLjUxIDE2OC44NyAyMjEuNTEgQyAxODkuOTQgMjIxLjUwIDIxMS4wMSAyMjEuNTAgMjMyLjA4IDIyMS41MSBDIDIzMi4xNCAyNDMuMzQgMjMyLjA5IDI2NS4xNyAyMzIuMTAgMjg3LjAwIEMgMjMyLjA0IDI5MC4yMiAyMzIuMzAgMjkzLjQ1IDIzMS44OCAyOTYuNjUgQyAyMTcuODYgMzA0LjM0IDIwMS45NiAzMDguMDUgMTg2LjA2IDMwOC43NCBDIDE3MC44MSAzMDkuNjAgMTU1LjA4IDMwOC4xOCAxNDAuOTUgMzAyLjA2IEMgMTI3LjIyIDI5Ni4xNiAxMTUuNTEgMjg1LjQ5IDEwOC44MiAyNzIuMDkgQyAxMDIuODQgMjYwLjM4IDEwMC42NyAyNDcuMDYgMTAwLjc2IDIzNC4wMSBDIDEwMC43MSAyMjIuNTAgMTAyLjY5IDIxMC44OCAxMDcuMjggMjAwLjI5IEMgMTE0Ljk3IDE4Mi41MCAxMzAuMDYgMTY4LjExIDE0OC4xMyAxNjEuMTUgWiINCiAgICAgICBpZD0icGF0aDQyMDkyIg0KICAgICAgIHN0eWxlPSJmaWxsOiM5Njk2OTY7ZmlsbC1vcGFjaXR5OjEiIC8+DQogICAgPHBhdGgNCiAgICAgICBmaWxsPSIjMDAwMDAwIg0KICAgICAgIG9wYWNpdHk9IjEuMDAiDQogICAgICAgZD0iIE0gNDA0Ljc3IDE2My43NSBDIDQxNS43MSAxNTcuNDYgNDI4LjUyIDE1NS40MCA0NDAuOTggMTU1LjAzIEMgNDU0LjE4IDE1NC45MyA0NjcuNjQgMTU1Ljk5IDQ4MC4wNyAxNjAuNzYgQyA0ODAuMTAgMTcxLjE0IDQ4MC4wNyAxODEuNTIgNDgwLjA5IDE5MS45MSBDIDQ2OC40MSAxODQuMTEgNDU0LjAyIDE4MC43MSA0NDAuMDcgMTgxLjY3IEMgNDMzLjg0IDE4Mi4zMSA0MjcuMDkgMTgzLjkyIDQyMi43MyAxODguNzcgQyA0MTguOTUgMTkyLjc4IDQxOC44NSAxOTkuNDUgNDIyLjIwIDIwMy43NiBDIDQyNS44NyAyMDguNjEgNDMxLjQxIDIxMS41MiA0MzYuNzMgMjE0LjIwIEMgNDQ5LjU4IDIyMC4zMSA0NjMuNjUgMjI0Ljg0IDQ3NC4yNCAyMzQuNzcgQyA0ODEuMDUgMjQwLjkyIDQ4NS40NSAyNDkuNjIgNDg2LjMxIDI1OC43NyBDIDQ4Ny4yNCAyNjguNjAgNDg2LjE0IDI3OS4xNSA0ODAuNjIgMjg3LjU4IEMgNDc0LjcyIDI5Ny4wOCA0NjQuNDUgMzAyLjk5IDQ1My44NiAzMDUuODAgQyA0NDAuOTEgMzA5LjE1IDQyNy4zNSAzMDkuNjEgNDE0LjA4IDMwOC4zMCBDIDQwNC4xNyAzMDcuMjYgMzk0LjIxIDMwNS4yMCAzODUuMjQgMzAwLjczIEMgMzg1LjIzIDI4OS42OCAzODUuMjQgMjc4LjYzIDM4NS4yMyAyNjcuNTkgQyAzOTguNjAgMjc4LjgzIDQxNi43MSAyODQuMzIgNDM0LjA2IDI4MS45OSBDIDQzOS4yOCAyODEuMTUgNDQ0Ljc3IDI3OS41MCA0NDguNDMgMjc1LjQ3IEMgNDUyLjA3IDI3MS40NiA0NTIuMzAgMjY1LjA5IDQ0OS40NCAyNjAuNTkgQyA0NDYuNTcgMjU2LjA5IDQ0MS45NiAyNTMuMTEgNDM3LjM5IDI1MC41OCBDIDQyMy4zNCAyNDMuMTMgNDA2LjkyIDIzOS4yNiAzOTUuNjMgMjI3LjM2IEMgMzg0LjkzIDIxNi44OSAzODIuMzMgMjAwLjM1IDM4Ni4zMSAxODYuMzIgQyAzODkuMDggMTc2LjcwIDM5Ni4xMyAxNjguNjUgNDA0Ljc3IDE2My43NSBaIg0KICAgICAgIGlkPSJwYXRoNDIwOTQiDQogICAgICAgc3R5bGU9ImZpbGw6Izk2OTY5NjtmaWxsLW9wYWNpdHk6MSIgLz4NCiAgICA8cGF0aA0KICAgICAgIGZpbGw9IiMwMDAwMDAiDQogICAgICAgb3BhY2l0eT0iMS4wMCINCiAgICAgICBkPSIgTSAyNjEuNTEgMTU3LjUxIEMgMjc4LjY3IDE1Ny40OSAyOTUuODQgMTU3LjUxIDMxMy4wMSAxNTcuNTAgQyAzMjMuMTQgMTU3LjU2IDMzMy40NSAxNTguNDEgMzQzLjAzIDE2MS45MyBDIDM1MC43NSAxNjQuNzQgMzU3Ljk0IDE2OS41NyAzNjIuNTkgMTc2LjQ0IEMgMzY4LjMyIDE4NC43NCAzNzAuMjcgMTk1LjA2IDM3MC4xOSAyMDUuMDAgQyAzNzAuMjkgMjE1LjA2IDM2Ny40NiAyMjUuMzAgMzYxLjM1IDIzMy4zOSBDIDM1My44MCAyNDMuNTQgMzQyLjIzIDI1MC4yNCAzMjkuOTcgMjUyLjk0IEMgMzE4LjUzIDI1NS42OSAzMDYuNjggMjU0Ljg4IDI5NS4wMiAyNTUuMDIgQyAyOTUuMDIgMjcyLjE4IDI5NS4wNCAyODkuMzUgMjk1LjAxIDMwNi41MSBDIDI4My44NCAzMDYuNTIgMjcyLjY3IDMwNi41MiAyNjEuNTAgMzA2LjUxIEMgMjYxLjUwIDI1Ni44NCAyNjEuNTAgMjA3LjE3IDI2MS41MSAxNTcuNTEgTSAyOTUuMDIgMTgzLjAyIEMgMjk1LjAyIDE5OC41MSAyOTUuMDMgMjE0LjAwIDI5NS4wMiAyMjkuNDkgQyAzMDQuNzkgMjI5LjE2IDMxNS4yNCAyMzAuODggMzI0LjMyIDIyNi4zMyBDIDMzMC4wMiAyMjMuNjEgMzMzLjY4IDIxNy43OCAzMzQuNTcgMjExLjY0IEMgMzM1LjU1IDIwNC43NSAzMzUuMTEgMTk3LjAzIDMzMC43MyAxOTEuMzAgQyAzMjYuOTUgMTg2LjM1IDMyMC43MSAxODQuMDggMzE0LjcxIDE4My4zNSBDIDMwOC4xNyAxODIuNjkgMzAxLjU4IDE4My4xNCAyOTUuMDIgMTgzLjAyIFoiDQogICAgICAgaWQ9InBhdGg0MjA5NiINCiAgICAgICBzdHlsZT0iZmlsbDojOTY5Njk2O2ZpbGwtb3BhY2l0eToxIiAvPg0KICAgIDxwYXRoDQogICAgICAgZmlsbD0iIzAwMDAwMCINCiAgICAgICBvcGFjaXR5PSIxLjAwIg0KICAgICAgIGQ9IiBNIDY5Mi4yNCAyMjYuMjggQyA3MzQuNTggMjI2LjI5IDc3Ni45MSAyMjYuMzMgODE5LjI1IDIyNi4yNiBDIDgxOS40NSAzOTcuNjcgODE5LjE2IDU2OS4wOCA4MTkuMjQgNzQwLjQ5IEMgNzc2Ljg4IDc0MC41MSA3MzQuNTMgNzQwLjUwIDY5Mi4xOCA3NDAuNDkgQyA2OTIuMTUgNTY5LjA5IDY5Mi4yNiAzOTcuNjggNjkyLjI0IDIyNi4yOCBaIg0KICAgICAgIGlkPSJwYXRoNDIwOTgiDQogICAgICAgc3R5bGU9ImZpbGw6Izk2OTY5NjtmaWxsLW9wYWNpdHk6MSIgLz4NCiAgICA8cGF0aA0KICAgICAgIGZpbGw9IiMwMDAwMDAiDQogICAgICAgb3BhY2l0eT0iMS4wMCINCiAgICAgICBkPSIgTSA0OTUuNjUgMzEzLjM1IEMgNTM4LjAxIDMxMy4zNSA1ODAuMzYgMzEzLjM1IDYyMi43MiAzMTMuMzUgQyA2MjIuNzMgNDU1Ljc0IDYyMi43MyA1OTguMTIgNjIyLjcxIDc0MC41MCBDIDU4MC4zNiA3NDAuNjIgNTM4LjAxIDc0MC41MSA0OTUuNjYgNzQwLjU3IEMgNDk1LjY1IDU5OC4xNiA0OTUuNjYgNDU1Ljc2IDQ5NS42NSAzMTMuMzUgWiINCiAgICAgICBpZD0icGF0aDQyMTAwIg0KICAgICAgIHN0eWxlPSJmaWxsOiM5Njk2OTY7ZmlsbC1vcGFjaXR5OjEiIC8+DQogICAgPHBhdGgNCiAgICAgICBmaWxsPSIjMDAwMDAwIg0KICAgICAgIG9wYWNpdHk9IjEuMDAiDQogICAgICAgZD0iIE0gMjk5LjE0IDQwMC4zNSBDIDM0MS41NCA0MDAuNDAgMzgzLjk0IDQwMC4yNSA0MjYuMzQgNDAwLjQyIEMgNDI2LjI0IDUxMy43NiA0MjYuMzMgNjI3LjEwIDQyNi4zMCA3NDAuNDQgQyAzODMuOTAgNzQwLjQ2IDM0MS41MSA3NDAuNDUgMjk5LjExIDc0MC40NCBDIDI5OS4xNSA2MjcuMDggMjk5LjExIDUxMy43MSAyOTkuMTQgNDAwLjM1IFoiDQogICAgICAgaWQ9InBhdGg0MjEwMiINCiAgICAgICBzdHlsZT0iZmlsbDojOTY5Njk2O2ZpbGwtb3BhY2l0eToxIiAvPg0KICAgIDxwYXRoDQogICAgICAgZmlsbD0iIzAwMDAwMCINCiAgICAgICBvcGFjaXR5PSIxLjAwIg0KICAgICAgIGQ9IiBNIDEwMi42MyA0ODcuNDEgQyAxNDQuOTkgNDg3LjQ1IDE4Ny4zNSA0ODcuNDMgMjI5LjcyIDQ4Ny40MyBDIDIyOS43NCA1NjguMjggMjI5LjcyIDY0OS4xNCAyMjkuNzMgNzMwLjAwIEMgMjI5LjcwIDczMy41MCAyMjkuODEgNzM3LjAxIDIyOS42MiA3NDAuNTEgQyAxODcuMjkgNzQwLjM1IDE0NC45NSA3NDAuNTIgMTAyLjYxIDc0MC40MyBDIDEwMi42MyA2NTYuMDkgMTAyLjYwIDU3MS43NSAxMDIuNjMgNDg3LjQxIFoiDQogICAgICAgaWQ9InBhdGg0MjEwNCINCiAgICAgICBzdHlsZT0iZmlsbDojOTY5Njk2O2ZpbGwtb3BhY2l0eToxIiAvPg0KICA8L2c+DQo8L3N2Zz4NCg==) no-repeat left center) no-repeat left center`;
function updateError(err) {
	errorHidden();
	let t;
	switch (err.code) {
		case NONAVIGATION:
			t = "NONAVIGATION";
			document.getElementById("btn_gps").style.background = gps_no_svg;
			break;
		case PERMISSION_DENIED:
			t = "PERMISSION_DENIED";
			document.getElementById("btn_gps").style.background = gps_no_svg;
			break;
		case POSITION_UNAVAILABLE:
			t = "POSITION_UNAVAILABLE";
			document.getElementById("btn_gps").style.background = gps_no_svg;
			break;
		case TIMEOUT:
			t = "TIMEOUT";
			document.getElementById("btn_gps").style.background = gps_no_svg;
			break;
		default:
			t = "OTHER";
			document.getElementById("btn_gps").style.background = gps_no_svg;
			console.error(err);
	}
	//document.getElementById(`error-${t}`).hidden = false;
}

// Update the duration since the last geolocation element
let gps_bad_count = 0;
let sec_old = 0;
function updateTime() {
	let d = new Date() - lastUpdate;
	let min = Math.floor(d / Minute);
	let sec = Math.floor(d % Minute / Second);
	tot_time = min + "m " + sec + "s"
	if(sec_old != sec){
		gps_bad_count = gps_bad_count - 1;
	}
	if(sec > 3) {
		if(document.getElementById("tn_color").value == 1){
			document.getElementById("btn_gps").style.background = "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnDQogICB2aWV3Qm94PSIwIDAgOTYwIDk2MCINCiAgIHZlcnNpb249IjEuMSINCiAgIGlkPSJzdmc0MTc3NyINCiAgIHNvZGlwb2RpOmRvY25hbWU9Imdwc19iYWQuc3ZnIg0KICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKSINCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIg0KICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIg0KICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogIDxkZWZzDQogICAgIGlkPSJkZWZzNDE3ODEiIC8+DQogIDxzb2RpcG9kaTpuYW1lZHZpZXcNCiAgICAgaWQ9Im5hbWVkdmlldzQxNzc5Ig0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxLjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiDQogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiDQogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJwdCINCiAgICAgc2hvd2dyaWQ9ImZhbHNlIg0KICAgICBpbmtzY2FwZTp6b29tPSIwLjY0Mzc1Ig0KICAgICBpbmtzY2FwZTpjeD0iNjM5LjIyMzMiDQogICAgIGlua3NjYXBlOmN5PSI2NDAuNzc2NyINCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIg0KICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDA5Ig0KICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMTkxMiINCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIg0KICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmc0MTc3NyIgLz4NCiAgPGcNCiAgICAgaWQ9IiNmZmZmZmZmZiIgLz4NCiAgPGcNCiAgICAgaWQ9IiMwMDAwMDBmZiINCiAgICAgc3R5bGU9ImZpbGw6Izk2OTY5NjtmaWxsLW9wYWNpdHk6MSI+DQogICAgPHBhdGgNCiAgICAgICBmaWxsPSIjMDAwMDAwIg0KICAgICAgIG9wYWNpdHk9IjEuMDAiDQogICAgICAgZD0iIE0gMTM5LjMwIDE2NS4yNyBDIDE1Mi4yOSAxNTguMDggMTY3LjI1IDE1NS4yNSAxODEuOTcgMTU1LjAyIEMgMTk2LjU4IDE1NC45NSAyMTEuMzggMTU2LjU3IDIyNS4xNyAxNjEuNTggQyAyMjUuMTQgMTcyLjAzIDIyNS4xNiAxODIuNDcgMjI1LjE3IDE5Mi45MiBDIDIxNC40OSAxODYuODIgMjAyLjI3IDE4My44NyAxOTAuMDYgMTgzLjE3IEMgMTgzLjQ2IDE4Mi44NSAxNzYuNzYgMTgyLjc5IDE3MC4zMSAxODQuNDIgQyAxNTcuODkgMTg3LjI3IDE0Ny4wNiAxOTUuOTkgMTQxLjM5IDIwNy4zNyBDIDEzNy41NiAyMTQuOTcgMTM1Ljk3IDIyMy41NSAxMzUuOTcgMjMyLjAyIEMgMTM1LjgzIDI0MC42NiAxMzYuOTggMjQ5LjQ3IDE0MC40OSAyNTcuNDMgQyAxNDMuNzggMjY0Ljk0IDE0OS40NSAyNzEuNDIgMTU2LjU5IDI3NS40OSBDIDE2My4zNiAyNzkuMzcgMTcxLjIzIDI4MS4wMiAxNzguOTkgMjgxLjAwIEMgMTg1LjY3IDI4MS4xMiAxOTIuNDcgMjgwLjM1IDE5OC42NSAyNzcuNjcgQyAxOTguNjcgMjY3Ljk1IDE5OC42NyAyNTguMjMgMTk4LjY1IDI0OC41MSBDIDE4OC43MiAyNDguNTIgMTc4LjgwIDI0OC41MSAxNjguODcgMjQ4LjUyIEMgMTY4Ljg2IDIzOS41MSAxNjguODYgMjMwLjUxIDE2OC44NyAyMjEuNTEgQyAxODkuOTQgMjIxLjUwIDIxMS4wMSAyMjEuNTAgMjMyLjA4IDIyMS41MSBDIDIzMi4xNiAyNDUuMzQgMjMyLjA2IDI2OS4xOCAyMzIuMTMgMjkzLjAxIEMgMjMxLjkwIDI5NC4zMSAyMzIuNzAgMjk2LjM2IDIzMS4wNiAyOTYuOTkgQyAyMTcuNjQgMzA0LjQ0IDIwMi4zMCAzMDcuODQgMTg3LjA3IDMwOC42OSBDIDE3MS43NCAzMDkuNjMgMTU1LjkzIDMwOC4zNiAxNDEuNjYgMzAyLjM2IEMgMTI3LjYzIDI5Ni41MiAxMTUuNjIgMjg1LjcyIDEwOC44MiAyNzIuMDkgQyAxMDIuODMgMjYwLjM3IDEwMC42NyAyNDcuMDUgMTAwLjc2IDIzNC4wMCBDIDEwMC43MiAyMjIuOTkgMTAyLjUyIDIxMS44OSAxMDYuNzAgMjAxLjY3IEMgMTEyLjk3IDE4Ni4yOCAxMjQuNzYgMTczLjI4IDEzOS4zMCAxNjUuMjcgWiINCiAgICAgICBpZD0icGF0aDQxNzYxIg0KICAgICAgIHN0eWxlPSJmaWxsOiM5Njk2OTY7ZmlsbC1vcGFjaXR5OjEiIC8+DQogICAgPHBhdGgNCiAgICAgICBmaWxsPSIjMDAwMDAwIg0KICAgICAgIG9wYWNpdHk9IjEuMDAiDQogICAgICAgZD0iIE0gNDA0LjE1IDE2NC4xMiBDIDQxNS4yMSAxNTcuNTQgNDI4LjI5IDE1NS40MCA0NDAuOTggMTU1LjAzIEMgNDU0LjE4IDE1NC45MyA0NjcuNjQgMTU2LjAwIDQ4MC4wNyAxNjAuNzUgQyA0ODAuMTAgMTcxLjEzIDQ4MC4wNyAxODEuNTEgNDgwLjA5IDE5MS45MCBDIDQ2OC42NyAxODQuMjkgNDU0LjY3IDE4MC44NyA0NDEuMDMgMTgxLjYxIEMgNDM0LjQ4IDE4Mi4xMyA0MjcuMzMgMTgzLjcwIDQyMi43MyAxODguNzYgQyA0MTguOTYgMTkyLjc4IDQxOC44NSAxOTkuNDUgNDIyLjIwIDIwMy43NSBDIDQyNi4xOSAyMDkuMDAgNDMyLjI4IDIxMi4wMSA0MzguMDcgMjE0Ljg1IEMgNDUwLjU0IDIyMC42MCA0NjQuMDEgMjI1LjIwIDQ3NC4yMyAyMzQuNzYgQyA0ODEuMDUgMjQwLjkyIDQ4NS40NiAyNDkuNjIgNDg2LjMwIDI1OC43NyBDIDQ4Ny4yNCAyNjguNjAgNDg2LjEzIDI3OS4xNiA0ODAuNjIgMjg3LjU5IEMgNDc0LjcxIDI5Ny4wOCA0NjQuNDYgMzAyLjk5IDQ1My44NyAzMDUuODAgQyA0NDEuOTAgMzA4LjkwIDQyOS4zOSAzMDkuNTIgNDE3LjA5IDMwOC41NyBDIDQwNi4xNiAzMDcuNjYgMzk1LjEzIDMwNS42NCAzODUuMjQgMzAwLjc0IEMgMzg1LjIyIDI4OS42OSAzODUuMjUgMjc4LjY0IDM4NS4yMiAyNjcuNTkgQyAzOTguNjAgMjc4LjgyIDQxNi43MCAyODQuMzMgNDM0LjA1IDI4MS45OSBDIDQzOS4yOCAyODEuMTYgNDQ0Ljc3IDI3OS41MCA0NDguNDQgMjc1LjQ3IEMgNDUxLjg5IDI3MS42NSA0NTIuMjkgMjY1LjY3IDQ0OS44MSAyNjEuMjMgQyA0NDcuODEgMjU3LjY3IDQ0NC41NiAyNTUuMDEgNDQxLjE3IDI1Mi44MiBDIDQyOS45OSAyNDUuNjcgNDE2Ljc1IDI0Mi42MCA0MDUuNjEgMjM1LjM2IEMgMzk4LjM4IDIzMC43NyAzOTEuODMgMjI0LjYyIDM4OC4yMiAyMTYuNzQgQyAzODQuMjAgMjA4LjA0IDM4My43NSAxOTguMDAgMzg1LjY5IDE4OC43MiBDIDM4Ny45MCAxNzguMzQgMzk1LjA3IDE2OS40MyA0MDQuMTUgMTY0LjEyIFoiDQogICAgICAgaWQ9InBhdGg0MTc2MyINCiAgICAgICBzdHlsZT0iZmlsbDojOTY5Njk2O2ZpbGwtb3BhY2l0eToxIiAvPg0KICAgIDxwYXRoDQogICAgICAgZmlsbD0iIzAwMDAwMCINCiAgICAgICBvcGFjaXR5PSIxLjAwIg0KICAgICAgIGQ9IiBNIDI2MS41MCAxNTcuNTAgQyAyNzguNjcgMTU3LjUwIDI5NS44NCAxNTcuNTEgMzEzLjAwIDE1Ny41MCBDIDMyMy4zOCAxNTcuNTYgMzMzLjk2IDE1OC40NSAzNDMuNzMgMTYyLjIwIEMgMzUxLjE4IDE2NS4wMyAzNTguMDggMTY5Ljc4IDM2Mi41OSAxNzYuNDQgQyAzNjguNTEgMTg1LjAxIDM3MC4zOCAxOTUuNzMgMzcwLjE4IDIwNS45OCBDIDM3MC4xMiAyMTUuOTYgMzY3LjExIDIyNi4wNCAzNjAuOTMgMjMzLjk1IEMgMzUzLjE2IDI0NC4wNyAzNDEuMzkgMjUwLjYxIDMyOC45OSAyNTMuMTYgQyAzMTcuODQgMjU1LjY1IDMwNi4zNSAyNTQuODggMjk1LjAyIDI1NS4wMiBDIDI5NS4wMiAyNzIuMTggMjk1LjAzIDI4OS4zNSAyOTUuMDIgMzA2LjUxIEMgMjgzLjg0IDMwNi41MiAyNzIuNjcgMzA2LjUyIDI2MS41MCAzMDYuNTEgQyAyNjEuNTAgMjU2Ljg0IDI2MS41MCAyMDcuMTcgMjYxLjUwIDE1Ny41MCBNIDI5NS4wMiAxODMuMDIgQyAyOTUuMDMgMTk4LjUxIDI5NS4wMiAyMTQuMDAgMjk1LjAzIDIyOS41MCBDIDMwMC42NyAyMjkuNDYgMzA2LjMyIDIyOS42MSAzMTEuOTYgMjI5LjQwIEMgMzE4LjcyIDIyOC45OSAzMjYuMDAgMjI2Ljk0IDMzMC40MSAyMjEuNDUgQyAzMzUuMDQgMjE1LjU3IDMzNS42MCAyMDcuNTMgMzM0LjU1IDIwMC4zNyBDIDMzMy42NSAxOTQuMjMgMzI5Ljc1IDE4OC41NSAzMjQuMDQgMTg1Ljk2IEMgMzE0Ljk4IDE4MS42NSAzMDQuNzAgMTgzLjM2IDI5NS4wMiAxODMuMDIgWiINCiAgICAgICBpZD0icGF0aDQxNzY1Ig0KICAgICAgIHN0eWxlPSJmaWxsOiM5Njk2OTY7ZmlsbC1vcGFjaXR5OjEiIC8+DQogICAgPHBhdGgNCiAgICAgICBmaWxsPSIjMDAwMDAwIg0KICAgICAgIG9wYWNpdHk9IjEuMDAiDQogICAgICAgZD0iIE0gMjk5LjEzIDQwMC4zNSBDIDM0MS41MyA0MDAuMzYgMzgzLjkyIDQwMC4zMyA0MjYuMzEgNDAwLjM2IEMgNDI2LjI5IDUxMy43MiA0MjYuMzEgNjI3LjA4IDQyNi4zMCA3NDAuNDQgQyAzODMuOTEgNzQwLjQ3IDM0MS41MSA3NDAuNDQgMjk5LjEyIDc0MC40NSBDIDI5OS4xNCA2MjcuMDkgMjk5LjEyIDUxMy43MiAyOTkuMTMgNDAwLjM1IFoiDQogICAgICAgaWQ9InBhdGg0MTc2NyINCiAgICAgICBzdHlsZT0iZmlsbDojOTY5Njk2O2ZpbGwtb3BhY2l0eToxIiAvPg0KICAgIDxwYXRoDQogICAgICAgZmlsbD0iIzAwMDAwMCINCiAgICAgICBvcGFjaXR5PSIxLjAwIg0KICAgICAgIGQ9IiBNIDEwMi42MiA0ODcuNDMgQyAxNDQuOTggNDg3LjQzIDE4Ny4zNSA0ODcuNDQgMjI5LjcyIDQ4Ny40MyBDIDIyOS43MiA1NzEuNzcgMjI5Ljc1IDY1Ni4xMSAyMjkuNzEgNzQwLjQ2IEMgMTg3LjM0IDc0MC40MyAxNDQuOTggNzQwLjQ4IDEwMi42MSA3NDAuNDMgQyAxMDIuNjIgNjU2LjEwIDEwMi42MSA1NzEuNzcgMTAyLjYyIDQ4Ny40MyBaIg0KICAgICAgIGlkPSJwYXRoNDE3NjkiDQogICAgICAgc3R5bGU9ImZpbGw6Izk2OTY5NjtmaWxsLW9wYWNpdHk6MSIgLz4NCiAgPC9nPg0KICA8Zw0KICAgICBpZD0iIzk1OTU5NWZmIg0KICAgICBzdHlsZT0iZmlsbDojMzIzMjMyO2ZpbGwtb3BhY2l0eToxIj4NCiAgICA8cGF0aA0KICAgICAgIGZpbGw9IiM5NTk1OTUiDQogICAgICAgb3BhY2l0eT0iMS4wMCINCiAgICAgICBkPSIgTSA2OTIuMjIgMjI2LjI4IEMgNzM0LjU3IDIyNi4yOCA3NzYuOTIgMjI2LjI5IDgxOS4yOCAyMjYuMjggQyA4MTkuNDQgMzg4LjUyIDgxOS4xOCA1NTAuNzYgODE5LjI1IDcxMy4wMCBDIDgxOS4yMSA3MjIuMTUgODE5LjMyIDczMS4zMSA4MTkuMTggNzQwLjQ3IEMgNzc2Ljg0IDc0MC41MyA3MzQuNTAgNzQwLjUyIDY5Mi4xNiA3NDAuNDcgQyA2OTIuMTMgNTY5LjA3IDY5Mi4yNiAzOTcuNjggNjkyLjIyIDIyNi4yOCBaIg0KICAgICAgIGlkPSJwYXRoNDE3NzIiDQogICAgICAgc3R5bGU9ImZpbGw6IzMyMzIzMjtmaWxsLW9wYWNpdHk6MSIgLz4NCiAgICA8cGF0aA0KICAgICAgIGZpbGw9IiM5NTk1OTUiDQogICAgICAgb3BhY2l0eT0iMS4wMCINCiAgICAgICBkPSIgTSA0OTUuNjIgMzEzLjQ0IEMgNTM3Ljk4IDMxMy4yMCA1ODAuMzQgMzEzLjQxIDYyMi43MCAzMTMuMzQgQyA2MjIuNzYgNDU1LjczIDYyMi43MiA1OTguMTEgNjIyLjcyIDc0MC41MCBDIDU4MC4zNiA3NDAuNjAgNTM4LjAxIDc0MC41NyA0OTUuNjYgNzQwLjUyIEMgNDk1LjYyIDU5OC4xNiA0OTUuNzAgNDU1LjgwIDQ5NS42MiAzMTMuNDQgWiINCiAgICAgICBpZD0icGF0aDQxNzc0Ig0KICAgICAgIHN0eWxlPSJmaWxsOiMzMjMyMzI7ZmlsbC1vcGFjaXR5OjEiIC8+DQogIDwvZz4NCjwvc3ZnPg0K) no-repeat left center";
			gps_bad_count = 4;
		}
		else{
			document.getElementById("btn_gps").style.background = "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgdmlld0JveD0iMCAwIDk2MCA5NjAiCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzQxNzc3IgogICBzb2RpcG9kaTpkb2NuYW1lPSJncHNfYmFkX2xpZ2h0LnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzNDE3ODEiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXc0MTc3OSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIwIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJwdCIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMC42NDM3NSIKICAgICBpbmtzY2FwZTpjeD0iNjM5LjIyMzMiCiAgICAgaW5rc2NhcGU6Y3k9IjY0MC43NzY3IgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDA5IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIxOTEyIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzQxNzc3IiAvPgogIDxnCiAgICAgaWQ9IiNmZmZmZmZmZiIgLz4KICA8ZwogICAgIGlkPSIjMDAwMDAwZmYiCiAgICAgc3R5bGU9ImZpbGw6Izk2OTY5NjtmaWxsLW9wYWNpdHk6MSI+CiAgICA8cGF0aAogICAgICAgZmlsbD0iIzAwMDAwMCIKICAgICAgIG9wYWNpdHk9IjEuMDAiCiAgICAgICBkPSIgTSAxMzkuMzAgMTY1LjI3IEMgMTUyLjI5IDE1OC4wOCAxNjcuMjUgMTU1LjI1IDE4MS45NyAxNTUuMDIgQyAxOTYuNTggMTU0Ljk1IDIxMS4zOCAxNTYuNTcgMjI1LjE3IDE2MS41OCBDIDIyNS4xNCAxNzIuMDMgMjI1LjE2IDE4Mi40NyAyMjUuMTcgMTkyLjkyIEMgMjE0LjQ5IDE4Ni44MiAyMDIuMjcgMTgzLjg3IDE5MC4wNiAxODMuMTcgQyAxODMuNDYgMTgyLjg1IDE3Ni43NiAxODIuNzkgMTcwLjMxIDE4NC40MiBDIDE1Ny44OSAxODcuMjcgMTQ3LjA2IDE5NS45OSAxNDEuMzkgMjA3LjM3IEMgMTM3LjU2IDIxNC45NyAxMzUuOTcgMjIzLjU1IDEzNS45NyAyMzIuMDIgQyAxMzUuODMgMjQwLjY2IDEzNi45OCAyNDkuNDcgMTQwLjQ5IDI1Ny40MyBDIDE0My43OCAyNjQuOTQgMTQ5LjQ1IDI3MS40MiAxNTYuNTkgMjc1LjQ5IEMgMTYzLjM2IDI3OS4zNyAxNzEuMjMgMjgxLjAyIDE3OC45OSAyODEuMDAgQyAxODUuNjcgMjgxLjEyIDE5Mi40NyAyODAuMzUgMTk4LjY1IDI3Ny42NyBDIDE5OC42NyAyNjcuOTUgMTk4LjY3IDI1OC4yMyAxOTguNjUgMjQ4LjUxIEMgMTg4LjcyIDI0OC41MiAxNzguODAgMjQ4LjUxIDE2OC44NyAyNDguNTIgQyAxNjguODYgMjM5LjUxIDE2OC44NiAyMzAuNTEgMTY4Ljg3IDIyMS41MSBDIDE4OS45NCAyMjEuNTAgMjExLjAxIDIyMS41MCAyMzIuMDggMjIxLjUxIEMgMjMyLjE2IDI0NS4zNCAyMzIuMDYgMjY5LjE4IDIzMi4xMyAyOTMuMDEgQyAyMzEuOTAgMjk0LjMxIDIzMi43MCAyOTYuMzYgMjMxLjA2IDI5Ni45OSBDIDIxNy42NCAzMDQuNDQgMjAyLjMwIDMwNy44NCAxODcuMDcgMzA4LjY5IEMgMTcxLjc0IDMwOS42MyAxNTUuOTMgMzA4LjM2IDE0MS42NiAzMDIuMzYgQyAxMjcuNjMgMjk2LjUyIDExNS42MiAyODUuNzIgMTA4LjgyIDI3Mi4wOSBDIDEwMi44MyAyNjAuMzcgMTAwLjY3IDI0Ny4wNSAxMDAuNzYgMjM0LjAwIEMgMTAwLjcyIDIyMi45OSAxMDIuNTIgMjExLjg5IDEwNi43MCAyMDEuNjcgQyAxMTIuOTcgMTg2LjI4IDEyNC43NiAxNzMuMjggMTM5LjMwIDE2NS4yNyBaIgogICAgICAgaWQ9InBhdGg0MTc2MSIKICAgICAgIHN0eWxlPSJmaWxsOiM5Njk2OTY7ZmlsbC1vcGFjaXR5OjEiIC8+CiAgICA8cGF0aAogICAgICAgZmlsbD0iIzAwMDAwMCIKICAgICAgIG9wYWNpdHk9IjEuMDAiCiAgICAgICBkPSIgTSA0MDQuMTUgMTY0LjEyIEMgNDE1LjIxIDE1Ny41NCA0MjguMjkgMTU1LjQwIDQ0MC45OCAxNTUuMDMgQyA0NTQuMTggMTU0LjkzIDQ2Ny42NCAxNTYuMDAgNDgwLjA3IDE2MC43NSBDIDQ4MC4xMCAxNzEuMTMgNDgwLjA3IDE4MS41MSA0ODAuMDkgMTkxLjkwIEMgNDY4LjY3IDE4NC4yOSA0NTQuNjcgMTgwLjg3IDQ0MS4wMyAxODEuNjEgQyA0MzQuNDggMTgyLjEzIDQyNy4zMyAxODMuNzAgNDIyLjczIDE4OC43NiBDIDQxOC45NiAxOTIuNzggNDE4Ljg1IDE5OS40NSA0MjIuMjAgMjAzLjc1IEMgNDI2LjE5IDIwOS4wMCA0MzIuMjggMjEyLjAxIDQzOC4wNyAyMTQuODUgQyA0NTAuNTQgMjIwLjYwIDQ2NC4wMSAyMjUuMjAgNDc0LjIzIDIzNC43NiBDIDQ4MS4wNSAyNDAuOTIgNDg1LjQ2IDI0OS42MiA0ODYuMzAgMjU4Ljc3IEMgNDg3LjI0IDI2OC42MCA0ODYuMTMgMjc5LjE2IDQ4MC42MiAyODcuNTkgQyA0NzQuNzEgMjk3LjA4IDQ2NC40NiAzMDIuOTkgNDUzLjg3IDMwNS44MCBDIDQ0MS45MCAzMDguOTAgNDI5LjM5IDMwOS41MiA0MTcuMDkgMzA4LjU3IEMgNDA2LjE2IDMwNy42NiAzOTUuMTMgMzA1LjY0IDM4NS4yNCAzMDAuNzQgQyAzODUuMjIgMjg5LjY5IDM4NS4yNSAyNzguNjQgMzg1LjIyIDI2Ny41OSBDIDM5OC42MCAyNzguODIgNDE2LjcwIDI4NC4zMyA0MzQuMDUgMjgxLjk5IEMgNDM5LjI4IDI4MS4xNiA0NDQuNzcgMjc5LjUwIDQ0OC40NCAyNzUuNDcgQyA0NTEuODkgMjcxLjY1IDQ1Mi4yOSAyNjUuNjcgNDQ5LjgxIDI2MS4yMyBDIDQ0Ny44MSAyNTcuNjcgNDQ0LjU2IDI1NS4wMSA0NDEuMTcgMjUyLjgyIEMgNDI5Ljk5IDI0NS42NyA0MTYuNzUgMjQyLjYwIDQwNS42MSAyMzUuMzYgQyAzOTguMzggMjMwLjc3IDM5MS44MyAyMjQuNjIgMzg4LjIyIDIxNi43NCBDIDM4NC4yMCAyMDguMDQgMzgzLjc1IDE5OC4wMCAzODUuNjkgMTg4LjcyIEMgMzg3LjkwIDE3OC4zNCAzOTUuMDcgMTY5LjQzIDQwNC4xNSAxNjQuMTIgWiIKICAgICAgIGlkPSJwYXRoNDE3NjMiCiAgICAgICBzdHlsZT0iZmlsbDojOTY5Njk2O2ZpbGwtb3BhY2l0eToxIiAvPgogICAgPHBhdGgKICAgICAgIGZpbGw9IiMwMDAwMDAiCiAgICAgICBvcGFjaXR5PSIxLjAwIgogICAgICAgZD0iIE0gMjYxLjUwIDE1Ny41MCBDIDI3OC42NyAxNTcuNTAgMjk1Ljg0IDE1Ny41MSAzMTMuMDAgMTU3LjUwIEMgMzIzLjM4IDE1Ny41NiAzMzMuOTYgMTU4LjQ1IDM0My43MyAxNjIuMjAgQyAzNTEuMTggMTY1LjAzIDM1OC4wOCAxNjkuNzggMzYyLjU5IDE3Ni40NCBDIDM2OC41MSAxODUuMDEgMzcwLjM4IDE5NS43MyAzNzAuMTggMjA1Ljk4IEMgMzcwLjEyIDIxNS45NiAzNjcuMTEgMjI2LjA0IDM2MC45MyAyMzMuOTUgQyAzNTMuMTYgMjQ0LjA3IDM0MS4zOSAyNTAuNjEgMzI4Ljk5IDI1My4xNiBDIDMxNy44NCAyNTUuNjUgMzA2LjM1IDI1NC44OCAyOTUuMDIgMjU1LjAyIEMgMjk1LjAyIDI3Mi4xOCAyOTUuMDMgMjg5LjM1IDI5NS4wMiAzMDYuNTEgQyAyODMuODQgMzA2LjUyIDI3Mi42NyAzMDYuNTIgMjYxLjUwIDMwNi41MSBDIDI2MS41MCAyNTYuODQgMjYxLjUwIDIwNy4xNyAyNjEuNTAgMTU3LjUwIE0gMjk1LjAyIDE4My4wMiBDIDI5NS4wMyAxOTguNTEgMjk1LjAyIDIxNC4wMCAyOTUuMDMgMjI5LjUwIEMgMzAwLjY3IDIyOS40NiAzMDYuMzIgMjI5LjYxIDMxMS45NiAyMjkuNDAgQyAzMTguNzIgMjI4Ljk5IDMyNi4wMCAyMjYuOTQgMzMwLjQxIDIyMS40NSBDIDMzNS4wNCAyMTUuNTcgMzM1LjYwIDIwNy41MyAzMzQuNTUgMjAwLjM3IEMgMzMzLjY1IDE5NC4yMyAzMjkuNzUgMTg4LjU1IDMyNC4wNCAxODUuOTYgQyAzMTQuOTggMTgxLjY1IDMwNC43MCAxODMuMzYgMjk1LjAyIDE4My4wMiBaIgogICAgICAgaWQ9InBhdGg0MTc2NSIKICAgICAgIHN0eWxlPSJmaWxsOiM5Njk2OTY7ZmlsbC1vcGFjaXR5OjEiIC8+CiAgICA8cGF0aAogICAgICAgZmlsbD0iIzAwMDAwMCIKICAgICAgIG9wYWNpdHk9IjEuMDAiCiAgICAgICBkPSIgTSAyOTkuMTMgNDAwLjM1IEMgMzQxLjUzIDQwMC4zNiAzODMuOTIgNDAwLjMzIDQyNi4zMSA0MDAuMzYgQyA0MjYuMjkgNTEzLjcyIDQyNi4zMSA2MjcuMDggNDI2LjMwIDc0MC40NCBDIDM4My45MSA3NDAuNDcgMzQxLjUxIDc0MC40NCAyOTkuMTIgNzQwLjQ1IEMgMjk5LjE0IDYyNy4wOSAyOTkuMTIgNTEzLjcyIDI5OS4xMyA0MDAuMzUgWiIKICAgICAgIGlkPSJwYXRoNDE3NjciCiAgICAgICBzdHlsZT0iZmlsbDojOTY5Njk2O2ZpbGwtb3BhY2l0eToxIiAvPgogICAgPHBhdGgKICAgICAgIGZpbGw9IiMwMDAwMDAiCiAgICAgICBvcGFjaXR5PSIxLjAwIgogICAgICAgZD0iIE0gMTAyLjYyIDQ4Ny40MyBDIDE0NC45OCA0ODcuNDMgMTg3LjM1IDQ4Ny40NCAyMjkuNzIgNDg3LjQzIEMgMjI5LjcyIDU3MS43NyAyMjkuNzUgNjU2LjExIDIyOS43MSA3NDAuNDYgQyAxODcuMzQgNzQwLjQzIDE0NC45OCA3NDAuNDggMTAyLjYxIDc0MC40MyBDIDEwMi42MiA2NTYuMTAgMTAyLjYxIDU3MS43NyAxMDIuNjIgNDg3LjQzIFoiCiAgICAgICBpZD0icGF0aDQxNzY5IgogICAgICAgc3R5bGU9ImZpbGw6Izk2OTY5NjtmaWxsLW9wYWNpdHk6MSIgLz4KICA8L2c+CiAgPGcKICAgICBpZD0iIzk1OTU5NWZmIgogICAgIHN0eWxlPSJmaWxsOiNlNmU2ZTY7ZmlsbC1vcGFjaXR5OjEiPgogICAgPHBhdGgKICAgICAgIGZpbGw9IiM5NTk1OTUiCiAgICAgICBvcGFjaXR5PSIxLjAwIgogICAgICAgZD0iIE0gNjkyLjIyIDIyNi4yOCBDIDczNC41NyAyMjYuMjggNzc2LjkyIDIyNi4yOSA4MTkuMjggMjI2LjI4IEMgODE5LjQ0IDM4OC41MiA4MTkuMTggNTUwLjc2IDgxOS4yNSA3MTMuMDAgQyA4MTkuMjEgNzIyLjE1IDgxOS4zMiA3MzEuMzEgODE5LjE4IDc0MC40NyBDIDc3Ni44NCA3NDAuNTMgNzM0LjUwIDc0MC41MiA2OTIuMTYgNzQwLjQ3IEMgNjkyLjEzIDU2OS4wNyA2OTIuMjYgMzk3LjY4IDY5Mi4yMiAyMjYuMjggWiIKICAgICAgIGlkPSJwYXRoNDE3NzIiCiAgICAgICBzdHlsZT0iZmlsbDojZTZlNmU2O2ZpbGwtb3BhY2l0eToxIiAvPgogICAgPHBhdGgKICAgICAgIGZpbGw9IiM5NTk1OTUiCiAgICAgICBvcGFjaXR5PSIxLjAwIgogICAgICAgZD0iIE0gNDk1LjYyIDMxMy40NCBDIDUzNy45OCAzMTMuMjAgNTgwLjM0IDMxMy40MSA2MjIuNzAgMzEzLjM0IEMgNjIyLjc2IDQ1NS43MyA2MjIuNzIgNTk4LjExIDYyMi43MiA3NDAuNTAgQyA1ODAuMzYgNzQwLjYwIDUzOC4wMSA3NDAuNTcgNDk1LjY2IDc0MC41MiBDIDQ5NS42MiA1OTguMTYgNDk1LjcwIDQ1NS44MCA0OTUuNjIgMzEzLjQ0IFoiCiAgICAgICBpZD0icGF0aDQxNzc0IgogICAgICAgc3R5bGU9ImZpbGw6I2U2ZTZlNjtmaWxsLW9wYWNpdHk6MSIgLz4KICA8L2c+Cjwvc3ZnPgo=) no-repeat left center";
			gps_bad_count = 4;
		}
		
		if(sec > 10){
			document.getElementById("btn_gps").style.background = "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnDQogICB2aWV3Qm94PSIwIDAgOTYwIDk2MCINCiAgIHZlcnNpb249IjEuMSINCiAgIGlkPSJzdmc0MTQ2NSINCiAgIHNvZGlwb2RpOmRvY25hbWU9Imdwc19uby5zdmciDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjEgKGM2OGUyMmMzODcsIDIwMjEtMDUtMjMpIg0KICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPGRlZnMNCiAgICAgaWQ9ImRlZnM0MTQ2OSIgLz4NCiAgPHNvZGlwb2RpOm5hbWVkdmlldw0KICAgICBpZD0ibmFtZWR2aWV3NDE0NjciDQogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiINCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiDQogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCINCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiINCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCINCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCINCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB0Ig0KICAgICBzaG93Z3JpZD0iZmFsc2UiDQogICAgIGlua3NjYXBlOnpvb209IjAuNjQzNzUiDQogICAgIGlua3NjYXBlOmN4PSI2MzkuMjIzMyINCiAgICAgaW5rc2NhcGU6Y3k9IjY0MC43NzY3Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiDQogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMDkiDQogICAgIGlua3NjYXBlOndpbmRvdy14PSIxOTEyIg0KICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTgiDQogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiDQogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzQxNDY1IiAvPg0KICA8Zw0KICAgICBpZD0iI2ZmZmZmZmZmIiAvPg0KICA8Zw0KICAgICBpZD0iIzAwMDAwMGZmIg0KICAgICBzdHlsZT0iZmlsbDojZmYwMDAwIj4NCiAgICA8cGF0aA0KICAgICAgIGZpbGw9IiMwMDAwMDAiDQogICAgICAgb3BhY2l0eT0iMS4wMCINCiAgICAgICBkPSIgTSAxNDMuMjcgMTYzLjI1IEMgMTU2LjU0IDE1Ni45MSAxNzEuNDMgMTU0LjgzIDE4Ni4wMiAxNTUuMDIgQyAxOTkuMjggMTU1LjQyIDIxMi44MSAxNTYuODMgMjI1LjIzIDE2MS43NiBDIDIyNS4wNiAxNzIuMTQgMjI1LjIwIDE4Mi41MyAyMjUuMTYgMTkyLjkyIEMgMjExLjIzIDE4NC45NSAxOTQuODEgMTgyLjQxIDE3OC45NCAxODMuMTEgQyAxNjcuOTAgMTgzLjczIDE1Ny4wMCAxODguMjcgMTQ5LjMyIDE5Ni4zMSBDIDE0MS40NyAyMDQuMTMgMTM3LjIyIDIxNC45OSAxMzYuMjUgMjI1LjkxIEMgMTM1LjQ3IDIzNi4wNCAxMzYuMDkgMjQ2LjUyIDEzOS45MCAyNTYuMDQgQyAxNDIuOTIgMjYzLjY4IDE0OC4zNCAyNzAuMzggMTU1LjMyIDI3NC43MyBDIDE2Mi4zNSAyNzkuMTQgMTcwLjc1IDI4MS4wMyAxNzguOTkgMjgxLjAwIEMgMTg1LjY3IDI4MS4xMSAxOTIuNDggMjgwLjM3IDE5OC42NCAyNzcuNjYgQyAxOTguNjYgMjY3Ljk0IDE5OC43MSAyNTguMjIgMTk4LjYxIDI0OC41MCBDIDE4OC43NCAyNDguNTcgMTc4Ljg3IDI0OC40NSAxNjkuMDAgMjQ4LjU2IEMgMTY4LjY5IDIzOS41NSAxNjguOTUgMjMwLjUzIDE2OC44NyAyMjEuNTEgQyAxODkuOTQgMjIxLjQ5IDIxMS4wMSAyMjEuNDkgMjMyLjA3IDIyMS41MSBDIDIzMi4xMCAyNDYuMzUgMjMyLjE3IDI3MS4yMCAyMzIuMDQgMjk2LjA0IEwgMjMxLjY5IDI5Ni42MiBDIDIxOC40MyAzMDQuMjAgMjAzLjE4IDMwNy42NiAxODguMDUgMzA4LjY0IEMgMTcyLjY1IDMwOS42NSAxNTYuNzUgMzA4LjU0IDE0Mi4zNCAzMDIuNjUgQyAxMjguMjUgMjk2Ljk1IDExNi4xMiAyODYuMzAgMTA5LjE1IDI3Mi43NSBDIDEwMi45MiAyNjAuODggMTAwLjY2IDI0Ny4zMCAxMDAuNzYgMjM0LjAwIEMgMTAwLjcyIDIyMy4yNCAxMDIuNDQgMjEyLjQwIDEwNi40MiAyMDIuMzcgQyAxMTMuMTcgMTg1LjMwIDEyNi42OCAxNzEuMDcgMTQzLjI3IDE2My4yNSBaIg0KICAgICAgIGlkPSJwYXRoNDE0NDgiDQogICAgICAgc3R5bGU9ImZpbGw6I2ZmMDAwMCIgLz4NCiAgICA8cGF0aA0KICAgICAgIGZpbGw9IiMwMDAwMDAiDQogICAgICAgb3BhY2l0eT0iMS4wMCINCiAgICAgICBkPSIgTSA0MDQuMTQgMTY0LjEyIEMgNDE1LjIwIDE1Ny41NCA0MjguMjggMTU1LjQxIDQ0MC45OCAxNTUuMDMgQyA0NTQuMTcgMTU0Ljk1IDQ2Ny42NyAxNTUuOTUgNDgwLjA4IDE2MC43OSBDIDQ4MC4wOCAxNzEuMTYgNDgwLjA4IDE4MS41MyA0ODAuMDggMTkxLjkwIEMgNDY4LjQwIDE4NC4xMSA0NTQuMDIgMTgwLjcxIDQ0MC4wOCAxODEuNjcgQyA0MzMuODUgMTgyLjMxIDQyNy4xMCAxODMuOTIgNDIyLjc0IDE4OC43NiBDIDQxOS4zMSAxOTIuNDIgNDE4Ljg1IDE5OC4zMiA0MjEuNDMgMjAyLjU4IEMgNDIzLjgwIDIwNi41MiA0MjcuNzEgMjA5LjE3IDQzMS41OCAyMTEuNDggQyA0NDAuNjkgMjE2Ljc0IDQ1MC44MiAyMTkuODggNDYwLjAyIDIyNC45NCBDIDQ2OC4yMiAyMjkuMjkgNDc2LjEwIDIzNC45NyA0ODEuMDQgMjQyLjk4IEMgNDg2Ljc2IDI1Mi4xOCA0ODcuNTUgMjYzLjYxIDQ4NS44MCAyNzQuMDggQyA0ODQuMjkgMjgzLjU5IDQ3OC43MCAyOTIuMjcgNDcwLjkyIDI5Ny44OSBDIDQ2NC45MiAzMDIuMjMgNDU3LjkwIDMwNS4wMCA0NTAuNzAgMzA2LjU4IEMgNDM5Ljk3IDMwOC45MCA0MjguODkgMzA5LjQ0IDQxNy45NiAzMDguNjMgQyA0MDYuNzQgMzA3Ljc4IDM5NS40MCAzMDUuNzcgMzg1LjI0IDMwMC43MyBDIDM4NS4yMiAyODkuNjkgMzg1LjI1IDI3OC42NCAzODUuMjIgMjY3LjU5IEMgMzk4LjYwIDI3OC44MiA0MTYuNzAgMjg0LjMzIDQzNC4wNSAyODEuOTkgQyA0MzkuMjcgMjgxLjE2IDQ0NC43NiAyNzkuNTAgNDQ4LjQ0IDI3NS40NyBDIDQ1MS44OSAyNzEuNjUgNDUyLjI5IDI2NS42NyA0NDkuODEgMjYxLjIzIEMgNDQ3LjU2IDI1Ny4yNiA0NDMuODEgMjU0LjQxIDQzOS45OCAyNTIuMDggQyA0MzEuNzggMjQ3LjEyIDQyMi42MyAyNDQuMDkgNDE0LjAwIDI0MC4wMSBDIDQwNC43NyAyMzUuNTQgMzk1Ljg3IDIyOS40NiAzOTAuMzIgMjIwLjY0IEMgMzg0LjQzIDIxMS4yNCAzODMuNDMgMTk5LjQ2IDM4NS42NyAxODguNzggQyAzODcuODggMTc4LjM3IDM5NS4wNSAxNjkuNDQgNDA0LjE0IDE2NC4xMiBaIg0KICAgICAgIGlkPSJwYXRoNDE0NTAiDQogICAgICAgc3R5bGU9ImZpbGw6I2ZmMDAwMCIgLz4NCiAgICA8cGF0aA0KICAgICAgIGZpbGw9IiMwMDAwMDAiDQogICAgICAgb3BhY2l0eT0iMS4wMCINCiAgICAgICBkPSIgTSAyNjEuNTEgMTU3LjUxIEMgMjc5LjAwIDE1Ny40OSAyOTYuNTAgMTU3LjUxIDMxNC4wMCAxNTcuNTAgQyAzMjQuMDUgMTU3LjYzIDMzNC4yOCAxNTguNTcgMzQzLjc0IDE2Mi4yMCBDIDM1MS4xOCAxNjUuMDMgMzU4LjA3IDE2OS43NyAzNjIuNTggMTc2LjQzIEMgMzY4LjMyIDE4NC43MiAzNzAuMjcgMTk1LjA2IDM3MC4xOCAyMDUuMDAgQyAzNzAuMzAgMjE1LjI5IDM2Ny4zMiAyMjUuNzggMzYwLjkzIDIzMy45NSBDIDM1My4xNiAyNDQuMDggMzQxLjM3IDI1MC42MiAzMjguOTYgMjUzLjE3IEMgMzE3LjgyIDI1NS42NSAzMDYuMzQgMjU0Ljg4IDI5NS4wMiAyNTUuMDIgQyAyOTUuMDEgMjcyLjE4IDI5NS4wNCAyODkuMzQgMjk1LjAxIDMwNi41MSBDIDI4My44NCAzMDYuNTIgMjcyLjY3IDMwNi41MiAyNjEuNTAgMzA2LjUxIEMgMjYxLjUwIDI1Ni44NCAyNjEuNTAgMjA3LjE3IDI2MS41MSAxNTcuNTEgTSAyOTUuMDIgMTgzLjAyIEMgMjk1LjAyIDE5OC41MSAyOTUuMDIgMjE0LjAwIDI5NS4wMyAyMjkuNDkgQyAzMDAuNjcgMjI5LjQ3IDMwNi4zMiAyMjkuNTkgMzExLjk2IDIyOS40MCBDIDMxOC43MiAyMjguOTkgMzI2LjAwIDIyNi45NCAzMzAuNDAgMjIxLjQ1IEMgMzM1LjA0IDIxNS41NyAzMzUuNjAgMjA3LjUyIDMzNC41NSAyMDAuMzYgQyAzMzMuNjQgMTk0LjIxIDMyOS43MyAxODguNTQgMzI0LjAyIDE4NS45NSBDIDMxNC45NiAxODEuNjUgMzA0LjY5IDE4My4zNiAyOTUuMDIgMTgzLjAyIFoiDQogICAgICAgaWQ9InBhdGg0MTQ1MiINCiAgICAgICBzdHlsZT0iZmlsbDojZmYwMDAwIiAvPg0KICAgIDxwYXRoDQogICAgICAgZmlsbD0iIzAwMDAwMCINCiAgICAgICBvcGFjaXR5PSIxLjAwIg0KICAgICAgIGQ9IiBNIDY5Mi4yNCAyMjYuMjggQyA3MzQuNTUgMjI2LjI2IDc3Ni44NiAyMjYuMzggODE5LjE2IDIyNi4yMiBDIDgxOS4zOCAyMjguNDcgODE5LjMyIDIzMC43NCA4MTkuMzEgMjMzLjAwIEMgODE5LjMxIDMzOC42MSA4MTkuMzIgNDQ0LjIxIDgxOS4zMSA1NDkuODIgQyA3OTkuNDUgNTM5LjU0IDc3Ny4zNCA1MzMuNzIgNzU0Ljk5IDUzMi45OSBDIDczMy41NSA1MzIuMzQgNzEyLjAwIDUzNi41MCA2OTIuMjQgNTQ0Ljg1IEMgNjkyLjIzIDQzOC42NiA2OTIuMjIgMzMyLjQ3IDY5Mi4yNCAyMjYuMjggWiINCiAgICAgICBpZD0icGF0aDQxNDU0Ig0KICAgICAgIHN0eWxlPSJmaWxsOiNmZjAwMDAiIC8+DQogICAgPHBhdGgNCiAgICAgICBmaWxsPSIjMDAwMDAwIg0KICAgICAgIG9wYWNpdHk9IjEuMDAiDQogICAgICAgZD0iIE0gNDk1LjYyIDMxMy40MiBDIDUzNy45OSAzMTMuMjYgNTgwLjM1IDMxMy40MCA2MjIuNzIgMzEzLjM1IEMgNjIyLjc1IDQxMC4yNiA2MjIuNzAgNTA3LjE2IDYyMi43NCA2MDQuMDYgQyA2MjMuMDMgNjA1LjkzIDYyMS44MyA2MDcuNDUgNjIxLjAxIDYwOS4wMCBDIDYxMC44NyA2MjYuNzkgNjA0LjQ5IDY0Ni43MSA2MDIuNDMgNjY3LjA4IEMgNTk5LjgzIDY5MS45OSA2MDQuMDEgNzE3LjQ1IDYxMy43NSA3NDAuNDcgQyA1NzQuMzkgNzQwLjQxIDUzNS4wMiA3NDAuNDggNDk1LjY2IDc0MC40NCBDIDQ5NS42MyA1OTguMTAgNDk1LjcwIDQ1NS43NiA0OTUuNjIgMzEzLjQyIFoiDQogICAgICAgaWQ9InBhdGg0MTQ1NiINCiAgICAgICBzdHlsZT0iZmlsbDojZmYwMDAwIiAvPg0KICAgIDxwYXRoDQogICAgICAgZmlsbD0iIzAwMDAwMCINCiAgICAgICBvcGFjaXR5PSIxLjAwIg0KICAgICAgIGQ9IiBNIDI5OS4xNCA0MDAuMzUgQyAzNDEuNTUgNDAwLjQ0IDM4My45NyA0MDAuMTcgNDI2LjM3IDQwMC40OCBDIDQyNi4yMSA1MTMuODAgNDI2LjM1IDYyNy4xMiA0MjYuMzAgNzQwLjQ0IEMgMzgzLjkwIDc0MC40NyAzNDEuNTEgNzQwLjQ0IDI5OS4xMiA3NDAuNDUgQyAyOTkuMTUgNjI3LjA4IDI5OS4xMSA1MTMuNzEgMjk5LjE0IDQwMC4zNSBaIg0KICAgICAgIGlkPSJwYXRoNDE0NTgiDQogICAgICAgc3R5bGU9ImZpbGw6I2ZmMDAwMCIgLz4NCiAgICA8cGF0aA0KICAgICAgIGZpbGw9IiMwMDAwMDAiDQogICAgICAgb3BhY2l0eT0iMS4wMCINCiAgICAgICBkPSIgTSAxMDIuNjAgNDg3LjQ2IEMgMTQ0Ljk4IDQ4Ny4zOSAxODcuMzUgNDg3LjQ1IDIyOS43MiA0ODcuNDMgQyAyMjkuNzMgNTY4LjYyIDIyOS43MiA2NDkuODEgMjI5LjcyIDczMS4wMCBDIDIyOS42OSA3MzQuMTcgMjI5Ljg1IDczNy4zNSAyMjkuNTggNzQwLjUzIEMgMTg3LjI2IDc0MC4zMyAxNDQuOTQgNzQwLjUzIDEwMi42MSA3NDAuNDMgQyAxMDIuNjEgNjU2LjExIDEwMi42MyA1NzEuNzggMTAyLjYwIDQ4Ny40NiBaIg0KICAgICAgIGlkPSJwYXRoNDE0NjAiDQogICAgICAgc3R5bGU9ImZpbGw6I2ZmMDAwMCIgLz4NCiAgICA8cGF0aA0KICAgICAgIGZpbGw9IiMwMDAwMDAiDQogICAgICAgb3BhY2l0eT0iMS4wMCINCiAgICAgICBkPSIgTSA3NDIuMzAgNTc1LjQzIEMgNzYzLjU1IDU3My43OCA3ODUuMzEgNTc4LjUzIDgwMy44MSA1ODkuMTYgQyA4MjYuODEgNjAyLjIwIDg0NC41OSA2MjQuMTQgODUyLjQ1IDY0OS40MCBDIDg2Mi4yMiA2NzkuOTUgODU3LjQyIDcxNC44NCA4MzkuMzggNzQxLjQyIEMgODI4Ljk4IDc1Ni44OCA4MTQuNTEgNzY5LjYyIDc5Ny43MyA3NzcuNzUgQyA3NjguNDkgNzkyLjI0IDczMi41MyA3OTIuMjIgNzAzLjMxIDc3Ny43MCBDIDY4Ni4xMiA3NjkuMjkgNjcxLjM0IDc1Ni4wOCA2NjAuOTcgNzQwLjAxIEMgNjQ2LjkwIDcxOC4zNSA2NDEuMTggNjkxLjQ3IDY0NS4wNyA2NjUuOTUgQyA2NDcuOTQgNjQ2LjA0IDY1Ni42MSA2MjcuMDEgNjY5LjgzIDYxMS44NCBDIDY4Ny44OSA1OTAuNzIgNzE0LjU5IDU3Ny4zOCA3NDIuMzAgNTc1LjQzIE0gNzEwLjAxIDYzMS44OSBDIDcwMy45NiA2MzMuNTIgNjk5LjUzIDYzOS43NyA3MDAuMjEgNjQ2LjA0IEMgNzAwLjMzIDY1MC4xMiA3MDIuNzkgNjUzLjY0IDcwNS43MCA2NTYuMzEgQyA3MTQuMTggNjY0Ljg0IDcyMi44MSA2NzMuMjUgNzMxLjE4IDY4MS45MCBDIDcyMi4xMyA2OTAuOTQgNzEzLjA4IDY5OS45OCA3MDQuMDQgNzA5LjAzIEMgNjk5LjU0IDcxMy4zNCA2OTguNTAgNzIwLjc2IDcwMS44OSA3MjYuMDQgQyA3MDUuMTEgNzMxLjY5IDcxMi43MyA3MzQuMjEgNzE4LjcwIDczMS42MiBDIDcyMS44OCA3MzAuNDMgNzI0LjA4IDcyNy43NCA3MjYuNDMgNzI1LjQzIEMgNzM0LjUxIDcxNy4zNyA3NDIuNTYgNzA5LjI2IDc1MC42NyA3MDEuMjMgQyA3NTkuOTkgNzEwLjYxIDc2OS4zMiA3MTkuOTkgNzc4Ljc5IDcyOS4yMSBDIDc4My45MSA3MzQuMDMgNzkyLjc0IDczMy42NSA3OTcuNTEgNzI4LjUyIEMgODAyLjUwIDcyMy43MSA4MDIuODQgNzE1LjAzIDc5OC4wNiA3MDkuOTYgQyA3ODguNzcgNzAwLjU0IDc3OS4zNCA2OTEuMjUgNzcwLjAyIDY4MS44NSBDIDc3OC45OSA2NzIuODcgNzg3Ljk1IDY2My44OSA3OTYuOTUgNjU0Ljk0IEMgODAwLjMzIDY1MS42NyA4MDIuMDEgNjQ2LjYzIDgwMC44OCA2NDIuMDIgQyA3OTkuNzEgNjM2LjM5IDc5NC42MCA2MzEuOTAgNzg4Ljg5IDYzMS4zNyBDIDc4NC40NyA2MzAuODUgNzgwLjAxIDYzMi44MSA3NzcuMDIgNjM2LjAzIEMgNzY4LjMyIDY0NC44NCA3NTkuNDMgNjUzLjQ3IDc1MC44MiA2NjIuMzcgQyA3NDEuMTAgNjUzLjM5IDczMi4wOSA2NDMuNjMgNzIyLjU0IDYzNC40NyBDIDcxOS4xNCA2MzEuNjAgNzE0LjI2IDYzMC41MiA3MTAuMDEgNjMxLjg5IFoiDQogICAgICAgaWQ9InBhdGg0MTQ2MiINCiAgICAgICBzdHlsZT0iZmlsbDojZmYwMDAwIiAvPg0KICA8L2c+DQo8L3N2Zz4NCg==) no-repeat left center";
		}	
	}
	else{
		if(gps_bad_count < 1){
			document.getElementById("btn_gps").style.background = gps_no_svg;
		}
		
	}
	document.getElementById("lastUpdate").innerHTML = tot_time;
	sec_old = sec;
}