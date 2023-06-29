// Copyright 2020, GUILLEUS Hugues <ghugues@netc.fr>
// BSD 3-Clause License

// The date of the last geolocation update.
var lastUpdate = new Date();

window.addEventListener("load", () => {
	if (!navigator.geolocation) {
		updateError({
			code: NONAVIGATION
		});
		return;
	}

	window.addEventListener("deviceorientation", event => {
		let a = Math.round(event.alpha)
		document.getElementById("data-angle").textContent = a;
		document.getElementById("compass").style.transform = `rotate(${a}deg)`;
	});

	navigator.geolocation.watchPosition(g => {
		lastUpdate = new Date();
		errorHidden();
		updateTime();
		updateGeo(g.coords);
	}, updateError, {
		enableHighAccuracy: true,
	});

	window.setInterval(updateTime, 1000);
}, {
	once: true,
});

// Update all the element in DOM with the new geolocation information in a
// GeolocationCoordinates object
function updateGeo(c) {
	[
		"accuracy",
		"altitude",
		"altitudeAccuracy",
		"latitude",
		"longitude",
		"speed",
	].forEach(p => {
		document.getElementById(`data-${p}`).textContent = String(c[p]);
	});

	if (typeof c.accuracy === "number") {
		document.getElementById("data-accuracy").textContent = Math.round(c.accuracy);
	}
}

/* TIME */

const Second = 1000;
const Minute = 60 * Second;

// Update the durattion since the last geolocalisation element.
function updateTime() {
	let d = new Date() - lastUpdate;
	let min = Math.floor(d / Minute);
	let sec = Math.floor(d % Minute / Second);
	document.getElementById("lastUpdate").textContent = `${min}m ${sec}s`;
}

/* ERROR */

const NONAVIGATION = -1; // a non-standart error code
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
function updateError(err) {
	errorHidden();

	let t;
	switch (err.code) {
	case NONAVIGATION:
		t = "NONAVIGATION";
		break;
	case PERMISSION_DENIED:
		t = "PERMISSION_DENIED";
		break;
	case POSITION_UNAVAILABLE:
		t = "POSITION_UNAVAILABLE";
		break;
	case TIMEOUT:
		t = "TIMEOUT";
		break;
	default:
		t = "OTHER";
		console.error(err);
	}

	document.getElementById(`error-${t}`).hidden = false;
}
