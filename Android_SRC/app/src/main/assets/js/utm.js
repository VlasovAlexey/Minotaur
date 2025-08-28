
var destinationPoint = function(latIn, lonIn, distanceIn, initialBearingIn)
{
    const wrap90 = function(degrees)
    {
        if (-90<=degrees && degrees<=90) 
            return degrees; // avoid rounding due to arithmetic ops if within range

        // latitude wrapping requires a triangle wave function; a general triangle wave is
        //     f(x) = 4a/p ⋅ | (x-p/4)%p - p/2 | - a
        // where a = amplitude, p = period, % = modulo; however, JavaScript '%' is a remainder operator
        // not a modulo operator - for modulo, replace 'x%n' with '((x%n)+n)%n'
        const x = degrees, a = 90, p = 360;
        return 4*a/p * Math.abs((((x-p/4)%p)+p)%p - p/2) - a;
    }
    
    const wrap180 = function(degrees)
    {
        if (-180<=degrees && degrees<=180) 
            return degrees; // avoid rounding due to arithmetic ops if within range

        // longitude wrapping requires a sawtooth wave function; a general sawtooth wave is
        //     f(x) = (2ax/p - p/2) % p - a
        // where a = amplitude, p = period, % = modulo; however, JavaScript '%' is a remainder operator
        // not a modulo operator - for modulo, replace 'x%n' with '((x%n)+n)%n'
        const x = degrees, a = 180, p = 360;
        return (((2*a*x/p - p/2)%p)+p)%p - a;
    }
    
    const toRadians = function(degrees)
    {
        return degrees * Math.PI / 180;
    }
    
    const toDegrees = function(radians)
    {
        return radians * 180 / Math.PI;
    }
    
    if (isNaN(latIn) || latIn == null) 
        throw new TypeError(`invalid lat ‘${latIn}’`);
    if (isNaN(lonIn) || lonIn == null) 
        throw new TypeError(`invalid lon ‘${lonIn}’`);

    var lat = wrap90(Number(latIn));
    var lon = wrap180(Number(lonIn));
    
    var distance = Number(distanceIn);
    var initialBearing = Number(initialBearingIn);
    
    if (isNaN(distance)) 
        throw new TypeError(`invalid distance ${distance}`);
    if (distance == 0) 
        return { point: this, finalBearing: NaN, iterations: 0 };
    if (isNaN(initialBearing)) 
        throw new TypeError(`invalid bearing ${initialBearing}`);
        
    const φ1 = toRadians(lat), λ1 = toRadians(lon);
    const α1 = toRadians(Number(initialBearing));
    const s = Number(distance);

    // allow alternative ellipsoid to be specified
    const WGS84 = { a: 6378137, b: 6356752.314245, f: 1/298.257223563 };
    const ellipsoid = WGS84; // this.datum ? this.datum.ellipsoid : LatLonEllipsoidal.ellipsoids.WGS84;
    const { a, b, f } = ellipsoid;

    const sinα1 = Math.sin(α1);
    const cosα1 = Math.cos(α1);

    const tanU1 = (1-f) * Math.tan(φ1), cosU1 = 1 / Math.sqrt((1 + tanU1*tanU1)), sinU1 = tanU1 * cosU1;
    const σ1 = Math.atan2(tanU1, cosα1); // σ1 = angular distance on the sphere from the equator to P1
    const sinα = cosU1 * sinα1;          // α = azimuth of the geodesic at the equator
    const cosSqα = 1 - sinα*sinα;
    const uSq = cosSqα * (a*a - b*b) / (b*b);
    const A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));
    const B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));

    let σ = s / (b*A), sinσ = null, cosσ = null; // σ = angular distance P₁ P₂ on the sphere
    let cos2σₘ = null; // σₘ = angular distance on the sphere from the equator to the midpoint of the line

    let σʹ = null, iterations = 0;
    do {
        cos2σₘ = Math.cos(2*σ1 + σ);
        sinσ = Math.sin(σ);
        cosσ = Math.cos(σ);
        const Δσ = B*sinσ*(cos2σₘ+B/4*(cosσ*(-1+2*cos2σₘ*cos2σₘ)-B/6*cos2σₘ*(-3+4*sinσ*sinσ)*(-3+4*cos2σₘ*cos2σₘ)));
        σʹ = σ;
        σ = s / (b*A) + Δσ;
    } while (Math.abs(σ-σʹ) > 1e-12 && ++iterations<100); // TV: 'iterate until negligible change in λ' (≈0.006mm)
    if (iterations >= 100) throw new EvalError('Vincenty formula failed to converge'); // not possible?

    const x = sinU1*sinσ - cosU1*cosσ*cosα1;
    const φ2 = Math.atan2(sinU1*cosσ + cosU1*sinσ*cosα1, (1-f)*Math.sqrt(sinα*sinα + x*x));
    const λ = Math.atan2(sinσ*sinα1, cosU1*cosσ - sinU1*sinσ*cosα1);
    const C = f/16*cosSqα*(4+f*(4-3*cosSqα));
    const L = λ - (1-C) * f * sinα * (σ + C*sinσ*(cos2σₘ+C*cosσ*(-1+2*cos2σₘ*cos2σₘ)));
    const λ2 = λ1 + L;
    
    return { lat : wrap90(Number(toDegrees(φ2))), lon : wrap180(Number(toDegrees(λ2))) };
}

//let new_coord = destinationPoint(-37.95103, 144.42487, 54972.271, 306.86816);
//new_coord = new_coord.lat;
//console.log(destinationPoint(-37.95103, 144.42487, 54972.271, 306.86816).lat);
