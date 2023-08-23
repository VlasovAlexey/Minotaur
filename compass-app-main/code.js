  var lastNamedLat = 0;
  var lastNamedLong = 0;
  
  var popupShown = true;

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
    //document.getElementById("installBtn").style.display = "block";
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

  function grantPermission() {
    if (navigator.geolocation) {
      updatePosition();
      setInterval(updatePosition(), 1000);
    }
    try {
      DeviceOrientationEvent.requestPermission();
    } catch {
      document.getElementById("accessbutton").style.display = "none";
      document.getElementById("accesserror").style.display = "block";
    }
  }
  
  var dial = document.getElementById("dial");

  //IOS compass sensor reading
  window.addEventListener('deviceorientation', function(e) {
    if(e.webkitCompassHeading != NaN){
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
      if(screenAngle == 0 || screenAngle == 360) { // rightside up
        heading = (360 - e.webkitCompassHeading);
        levelY = levelB;
        levelX = levelG;
      } else if(screenAngle == 90) { //landscape left
        heading = (270 - e.webkitCompassHeading);
        levelY = levelG * -1;
        levelX = levelB;
      } else if(screenAngle == 180) { //upside down
        heading = (180 - e.webkitCompassHeading);
        levelY = levelB * -1;
        levelX = levelG * -1;
      } else if(screenAngle == 270 || screenAngle == -90) { //landscape right
        heading = (90 - e.webkitCompassHeading);
        levelY = levelG;
        levelX = levelB * -1;
      } else {
        console.error("The browser dosnt support window.orientation");
      }
      levelDisp.style.top = (levelY + 50) + "%";
      levelDisp.style.left = (levelX + 50) + "%";
      var labelAngle = 360-heading;
      
      const labels = document.querySelectorAll(".label");
      for (let i = 0; i < labels.length; i++) {
        labels[i].style.transform = "translate(-50%, -50%) rotate(" + labelAngle + "deg";
      }
      dial.style.transform = "rotate(" + heading + "deg)"
      var acHeading = 360 - Math.round(heading);
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
    }
      
  }, false);

  //Android compass sensor reading
  let Vstatus  = document.getElementById('status');
  if ( 'AbsoluteOrientationSensor' in window ) {
    //compass.hidden = false;     
    let sensor = new AbsoluteOrientationSensor();
    sensor.addEventListener('reading', function(el) {
      let q = el.target.quaternion;
      if(q != NaN){
        Aheading = Math.atan2(2*q[0]*q[1] + 2*q[2]*q[3], 1 - 2*q[1]*q[1] - 2*q[2]*q[2])*(180/Math.PI);
        if(popupShown){
          popupShown = false;
          document.getElementById("accessblur").style.opacity = "0";
          updatePosition();
        }
      
        var levelDisp = document.getElementById("level-disp");
        var levelX = 0; var levelY = 0;
        var levelG = Math.min(Math.max((el.gamma / 9), -5), 5);
        var levelB = Math.min(Math.max((el.beta / 9), -5), 5);
      
        var heading = 0;
  
        var screenAngle = window.orientation;
        if(screenAngle == 0 || screenAngle == 360) { // rightside up
          heading = (360 - Aheading);
          levelY = levelB;
          levelX = levelG;
        } else if(screenAngle == 90) { //landscape left
          heading = (270 - Aheading);
          levelY = levelG * -1;
          levelX = levelB;
        } else if(screenAngle == 180) { //upside down
          heading = (180 - Aheading);
          levelY = levelB * -1;
          levelX = levelG * -1;
        } else if(screenAngle == 270 || screenAngle == -90) { //landscape right
          heading = (90 - Aheading);
          levelY = levelG;
          levelX = levelB * -1;
        } else {
          console.error("The browser don`t support window.orientation");
        }
        levelDisp.style.top = (levelY + 50) + "%";
        levelDisp.style.left = (levelX + 50) + "%";
        var AlabelAngle = 360-heading;
        
        const labels = document.querySelectorAll(".label");
        for (let i = 0; i < labels.length; i++) {
          labels[i].style.transform = "translate(-50%, -50%) rotate(" + AlabelAngle + "deg";
        }
        dial.style.transform = "rotate(" + heading + "deg)"
        var AacHeading = 360 - Math.round(heading);
        if(AacHeading >= 360){
          AacHeading -= 360;
        }
        document.getElementById("heading-value").innerHTML = AacHeading + "&deg";
        var AdirectionName = "";
        if(AacHeading > 337 || AacHeading < 22){
          AdirectionName = "N"
        } else if(AacHeading < 67){
          AdirectionName = "NE"
        } else if(AacHeading < 112){
          AdirectionName = "E"
        } else if(AacHeading < 157){
          AdirectionName = "SE"
        } else if(AacHeading < 202){
          AdirectionName = "S"
        } else if(AacHeading < 247){
          AdirectionName = "SW"
        } else if(AacHeading < 292){
          AdirectionName = "W"
        } else {
          AdirectionName = "NW"
        } 
        document.getElementById("heading-name").innerHTML = AdirectionName;
      }
    });
    sensor.start();
  }
  else{
    Vstatus.innerHTML = 'AbsoluteOrientationSensor not supported';
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
  
  const latString = `${latDegrees}°${latMinutes}'${latSeconds}" ${latitude >= 0 ? 'N' : 'S'}`;
  const lonString = `${lonDegrees}°${lonMinutes}'${lonSeconds}" ${direction}`;

  return `${latString} ${lonString}`;
}
