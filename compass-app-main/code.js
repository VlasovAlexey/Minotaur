//os detector
function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

var lastNamedLat = 0;
var lastNamedLong = 0;

var popupShown = false;

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
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
  if(lastNamedLat != nameLat || lastNamedLong != nameLong) {

    lastNamedLat = nameLat;
    lastNamedLong = nameLong;
  }
  document.getElementById("location-info").innerHTML = convertCoordinates(position.coords.latitude, position.coords.longitude);
  document.getElementById("location-elev").innerHTML = Math.round(position.coords.altitude * 3.280839895) + " ft Elevation";
}


function updatePosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function grantPremission() {
  
  document.getElementById("accessbutton").style.display = "none";
  if (navigator.geolocation) {
    updatePosition();
    setInterval(updatePosition(), 100);
  }
  try {
    DeviceOrientationEvent.requestPermission();
  } catch {
    
    //display error here!
    //document.getElementById("accesserror").style.display = "block";
  }
}

//document.getElementById("location-elev").style.display = "none";

//disable menu request if our device is not IOS
if(getOS() != "iOS"){ 
  grantPremission();
}

//android device orientation watcher
var AHeading = 0;
if ( 'AbsoluteOrientationSensor' in window ) {
  let sensor = new AbsoluteOrientationSensor();
  sensor.addEventListener('reading', function(e) {
    let q = e.target.quaternion;
    AHeading = Math.atan2(2*q[0]*q[1] + 2*q[2]*q[3], 1 - 2*q[1]*q[1] - 2*q[2]*q[2])*(180/Math.PI);
    
  });
  sensor.start();
}
else status.innerHTML = 'AbsoluteOrientationSensor not supported';

var rot_sensor = 0;
var rot_android_cor = 0;

//device orientation
var dial = document.getElementById("dial");
window.addEventListener('deviceorientation', function(e) {
    if(popupShown){
      popupShown = false;
      document.getElementById("accessblur").style.opacity = "0";
      updatePosition();
    }
  
    var levelDisp = document.getElementById("level-disp");
    var levelX = 0; var levelY = 0;
    var levelG = Math.min(Math.max((e.gamma / 9), -5), 5);
    var levelB = Math.min(Math.max((e.beta / 9), -5), 5);
  
    var heading = 0;
    var screenAngle = window.orientation;
    
    //check os and select data from different watchers sensors
    if(getOS() == "Android"){  
      //android
      rot_sensor = AHeading;
      if(rot_sensor < 0){
        rot_sensor = 360 + rot_sensor;
      }
      rot_android_cor = 180;
      rot_dif = 360;
    }
    else
    {
      //ios
      rot_sensor = e.webkitCompassHeading;
      rot_sensor = rot_sensor + 360;
      rot_android_cor = 0;
      rot_dif = 0;
    }

    if(screenAngle == 0 || screenAngle == 360) { // rightside up
      heading = (360 - rot_sensor);
      levelY = levelB;
      levelX = levelG;
    } else if(screenAngle == 90) { //landscape left
      heading = (270 - rot_sensor - rot_android_cor);
      levelY = levelG * -1;
      levelX = levelB;
    } else if(screenAngle == 180) { //upside down
      heading = (180 - rot_sensor);
      levelY = levelB * -1;
      levelX = levelG * -1;
    } else if(screenAngle == 270 || screenAngle == -90) { //landscape right
      heading = (90 - rot_sensor - rot_android_cor);
      levelY = levelG;
      levelX = levelB * -1;
    } else {
      console.log("The browser dosnt support window.orientation");
    }
    levelDisp.style.top = (levelY + 50) + "%";
    levelDisp.style.left = (levelX + 50) + "%";
    var labelAngle = rot_dif - (360-heading);
    
    const labels = document.querySelectorAll(".label");
    for (let i = 0; i < labels.length; i++) {
      labels[i].style.transform = "translate(-50%, -50%) rotate(" + labelAngle + "deg";
    }

    //check
    dial.style.transform = "rotate(" + (rot_dif - heading) + "deg)"
    var acHeading = rot_dif - (360 - Math.round(heading));
    if(acHeading >= 360){
      acHeading -= 360;
    }
    document.getElementById("heading-value").innerHTML = acHeading + "&deg";
    var directionName = "";
    if(acHeading > 337 || acHeading < 22){
      directionName = "N"
    } else if(acHeading < 67){
      directionName = "NE"
    } else if(acHeading < 112){
      directionName = "E"
    } else if(acHeading < 157){
      directionName = "SE"
    } else if(acHeading < 202){
      directionName = "S"
    } else if(acHeading < 247){
      directionName = "SW"
    } else if(acHeading < 292){
      directionName = "W"
    } else {
      directionName = "NW"
    } 
    document.getElementById("heading-name").innerHTML = directionName;
    
    
}, false);


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

const latString = `${latDegrees}В°${latMinutes}'${latSeconds}" ${latitude >= 0 ? 'N' : 'S'}`;
const lonString = `${lonDegrees}В°${lonMinutes}'${lonSeconds}" ${direction}`;

return `${latString} ${lonString}`;
}
