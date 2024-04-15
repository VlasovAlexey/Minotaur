//compass code start here
var lastNamedLat = 0;
var lastNamedLong = 0;

var popupShown = false;

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
	// Prevents the default mini-infobar or install dialog from appearing on mobile
	e.preventDefault();
	// Save the event because you'll need to trigger it later.
	deferredPrompt = e;
	// Show your customized install prompt for your PWA
	// Your own UI doesn't have to be a single element, you
	// can have buttons in different locations, or wait to prompt
	// as part of a critical journey.
	showInAppInstallPromotion();

	document.getElementById("installInstructions").style.display = "none";
	document.getElementById("installBtn").style.display = "block";
});

function showPosition(position) {
	var nameLat = position.coords.latitude.toFixed(2);
	var nameLong = position.coords.longitude.toFixed(2);
	if (lastNamedLat != nameLat || lastNamedLong != nameLong) {

		lastNamedLat = nameLat;
		lastNamedLong = nameLong;
	}
	document.getElementById("location-info").innerHTML = convertCoordinates(position.coords.latitude, position.coords.longitude);
	document.getElementById("location-elev").innerHTML = "Elevation <br>" + (Math.round(position.coords.altitude)) + " m";
}


function updatePosition() {
	navigator.geolocation.getCurrentPosition(showPosition);
}

//if app run on Desktop Devices we see nothing warning about permissions
if (getOS() == "Windows" || getOS() == "Linux" || getOS() == "Mac OS"){
	document.getElementById("accessbutton").style.display = "none";
	document.getElementById("accessblur").style.opacity = "0";
	document.getElementById("accessblur").style.display = "none";
}

//permission button for acess geo data on mobile devices
function grantPremission() {

	document.getElementById("accessbutton").style.display = "none";
	document.getElementById("accessblur").style.opacity = "0";
	document.getElementById("accessblur").style.display = "none";
	document.getElementById("btn_nav").style.background = "url(nav_ok.svg) no-repeat left center";
	if (navigator.geolocation) {
		updatePosition();
		setInterval(updatePosition(), 100);
	}
	try {
		DeviceOrientationEvent.requestPermission();
	} catch {
		//display error here
	}
}



const startBtn = document.querySelector(".start-btn");
const isIOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/);

function init() {
	startBtn.addEventListener("click", startCompass);
	//navigator.geolocation.getCurrentPosition(locationHandler);

	if (!isIOS) {
		window.addEventListener("deviceorientationabsolute", handler, true);
	}
}

//deploy
function startCompass() {
	if (isIOS) {
		DeviceOrientationEvent.requestPermission().then((response) => {
				if (response === "granted") {
					window.addEventListener("deviceorientation", handler, true);
					document.getElementById("btn_nav").style.background = "url(nav_ok.svg) no-repeat left center";
				} else {
					//alert("has to be allowed!");
				}
			})
			.catch(() => {
				//document.getElementById("btn_gps").style.background = "url(nav_no.svg) no-repeat left center";
			}
		);
	}
}

//android device orientation watcher
var AHeading = 0;

function handler(e) {
	AHeading = -(e.webkitCompassHeading || Math.abs(e.alpha - 360));
}
init();

//device orientation
var dial = document.getElementById("dial");
var acHeading = 0;

//update compass visual and position
function compass_upd(compass_data){
	if (popupShown) {
		popupShown = false;
		document.getElementById("accessblur").style.opacity = "0";
		updatePosition();
	}

	var levelDisp = document.getElementById("level-disp");
	var levelX = 0;
	var levelY = 0;
	var levelG = Math.min(Math.max((compass_data.gamma / 9), -5), 5);
	var levelB = Math.min(Math.max((compass_data.beta / 9), -5), 5);

	var heading = 0;
	var screenAngle = window.orientation;

	var rot_sensor = 0;
	var rot_android_cor = 0;

	//check os and select data from different watchers sensors
	if (getOS() == "Android") {
		//android
		rot_sensor = AHeading;
		if (rot_sensor < 0) {
			rot_sensor = 360 + rot_sensor;
		}
		rot_android_cor = 180;
		rot_dif = 360;
	} else {
		//ios
		rot_sensor = compass_data.webkitCompassHeading;
		rot_sensor = Math.abs(rot_sensor);
		rot_android_cor = 0;
		rot_dif = 0;
	}

	if (screenAngle == 0 || screenAngle == 360) { // rightside up
		heading = (360 - rot_sensor);
		levelY = levelB;
		levelX = levelG;
	} else if (screenAngle == 90) { //landscape left
		if (getOS() == "Android") {
			//android
			heading = (270 - rot_sensor - rot_android_cor);
			if (heading < 0) {
				heading = 360 + heading
			}
		} else {
			//ios
			heading = (270 - rot_sensor);
		}
		levelY = levelG * -1;
		levelX = levelB;
	} else if (screenAngle == 180) { //upside down
		heading = (180 - rot_sensor);
		levelY = levelB * -1;
		levelX = levelG * -1;
	} else if (screenAngle == 270 || screenAngle == -90) { //landscape right

		if (getOS() == "Android") {
			//android
			heading = (90 - rot_sensor + rot_android_cor);
			if (heading < 0) {
				heading = 360 + heading
			}
		} else {
			//ios
			heading = (90 - rot_sensor);
		}

		levelY = levelG;
		levelX = levelB * -1;
	} else {
		console.log("The browser doesn`t support window.orientation");
	}
	levelDisp.style.top = (levelY + 50) + "%";
	levelDisp.style.left = (levelX + 50) + "%";

	var labelAngle = 0;
	acHeading = 0;
	var cross_01 = document.getElementById("level-disp");
	var cross_02 = document.getElementById("level-cross");

	if (getOS() == "Android") {
		//android
		labelAngle = rot_dif - (360 - heading);
		dial.style.transform = "rotate(" + (rot_dif - heading) + "deg)"
		acHeading = rot_dif - (360 - Math.round(heading));

		//android fix
		if (acHeading < 0) {
			acHeading = 360 + acHeading
		}

		cross_01.style.transform = "translate(-50%, -50%) rotate(" + (heading - rot_dif) + "deg)"
		cross_02.style.transform = "translate(-50%, -50%) rotate(" + (heading - rot_dif) + "deg)"
	} else {
		//ios
		labelAngle = (Math.abs(360 - heading));
		dial.style.transform = "rotate(" + (heading - 360) + "deg)"
		acHeading = (Math.abs(360 - Math.round(heading)));
		cross_01.style.transform = "translate(-50%, -50%) rotate(-" + (heading + 360) + "deg)"
		cross_02.style.transform = "translate(-50%, -50%) rotate(-" + (heading + 360) + "deg)"

	}

	const labels = document.querySelectorAll(".label");
	for (let i = 0; i < labels.length; i++) {
		labels[i].style.transform = "translate(-50%, -50%) rotate(" + labelAngle + "deg";
	}

	if (acHeading >= 360) {
		acHeading -= 360;
	}

	//document.getElementById("heading-value").innerHTML = acHeading + "&deg";
	var directionName = "";
	if (acHeading > 337 || acHeading < 22) {
		directionName = "N"
	} else if (acHeading < 67) {
		directionName = "NE"
	} else if (acHeading < 112) {
		directionName = "E"
	} else if (acHeading < 157) {
		directionName = "SE"
	} else if (acHeading < 202) {
		directionName = "S"
	} else if (acHeading < 247) {
		directionName = "SW"
	} else if (acHeading < 292) {
		directionName = "W"
	} else {
		directionName = "NW"
	}
	directionName = directionName + " " + acHeading + "&deg"
	document.getElementById("heading-name").innerHTML = directionName;
}

//main function for compass update data

if (getOS() == "Android") {
	//Android
	window.addEventListener('deviceorientationabsolute', function(e) {
		compass_upd(e);
	}, false);	
} else {
	//IOS
	window.addEventListener('deviceorientation', function(e) {
		compass_upd(e);
	}, false);	
}

function convertCoordinates(latitude, longitude) {
	const latDegrees = Math.floor(latitude);
	const latMinutes = Math.floor((latitude - latDegrees) * 60);
	const latSeconds = Math.round((latitude - latDegrees - latMinutes / 60) * 3600);

	let lonDegrees = Math.floor(Math.abs(longitude));
	let lonMinutes = Math.floor((Math.abs(longitude) - lonDegrees) * 60);
	let lonSeconds = Math.round((Math.abs(longitude) - lonDegrees - lonMinutes / 60) * 3600);

	let direction = longitude >= 0 ? 'E' : 'W';
	if (longitude < 0) {
		direction = 'W';
	}

	const latString = `${latDegrees}Р’В°${latMinutes}'${latSeconds}" ${latitude >= 0 ? 'N' : 'S'}`;
	const lonString = `${lonDegrees}Р’В°${lonMinutes}'${lonSeconds}" ${direction}`;

	return (latString + " <br>" + lonString);
}