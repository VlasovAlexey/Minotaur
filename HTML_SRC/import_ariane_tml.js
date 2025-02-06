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
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("tml_no_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
		Pbar_Hide();
		return;
	}

	// Max 30 MB allowed
	var max_size_allowed = 30*1024*1024
	if(fileInput.files[0].size > max_size_allowed) {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("tml_big_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
		Pbar_Hide();
		return;
	}

	allowed_name = fileInput.files[0].name.slice((Math.max(0, fileInput.files[0].name.lastIndexOf(".")) || Infinity) + 1);
	if(allowed_name != "tml") {
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("tml_bad_ext_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
		Pbar_Hide();
		return;
	}

	var reader = new FileReader();
	reader.onload = function(ev) {
		JSZip.loadAsync(ev.target.result).then(function(zip) {
			zip.file("Data.xml").async("string").then(function(data) {
				
				// data is a string
				console.log(data);
			})
		}).catch(function(err) {
			//bad file or file structure
			del_html_elem("tn_overlay_text");
			create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("bad_file_format"));
			document.getElementById("AlertOverlay").style.height = "100%";
			document.getElementById("AlertOverlay").style.opacity = "1";
        	Pbar_Hide();
			return;
		})
	};
	reader.onerror = function(err) {
		//bad file format
		del_html_elem("tn_overlay_text");
		create_html_text("tn_overlay_text", "opt_overlay_text", plan_lng("tml_bad_file"));
		document.getElementById("AlertOverlay").style.height = "100%";
		document.getElementById("AlertOverlay").style.opacity = "1";
        Pbar_Hide();
	}
	reader.readAsArrayBuffer(fileInput.files[0]);
}
