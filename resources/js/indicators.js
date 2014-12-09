// Dynamic examples
var attitude = $.flightIndicator('#attitude', 'attitude', {showBox: false, roll:50, pitch:-20, size:200, img_directory : 'vendors/flightindicators/img/'});
var heading = $.flightIndicator('#heading', 'heading', {showBox: false, heading:150, img_directory : 'vendors/flightindicators/img/'});
var variometer = $.flightIndicator('#variometer', 'variometer', {showBox: false, vario:-5, img_directory : 'vendors/flightindicators/img/'});
var airspeed = $.flightIndicator('#airspeed', 'airspeed', {showBox: false, img_directory : 'vendors/flightindicators/img/'});
var altimeter = $.flightIndicator('#altimeter', 'altimeter', {showBox: false, img_directory : 'vendors/flightindicators/img/'});

// Update at 20Hz
var increment = 0;
setInterval(function() {
    // Attitude update
    attitude.setRoll(30*Math.sin(increment/10));
    attitude.setPitch(50*Math.sin(increment/20));

    // Heading update
    if (initOk == true) {
        heading.setHeading(headingDegrees);
    }

    // Vario update
    variometer.setVario(2*Math.sin(increment/10));

    // Airspeed update
    airspeed.setAirSpeed(80+80*Math.sin(increment/10));

    // Altimeter update
    altimeter.setAltitude(10*increment);
    altimeter.setPressure(1000+3*Math.sin(increment/50));
    increment++;
}, 50);


// convert quaterion to roll,pitch,yaw. Return RPY as an array
function GetEulerAngles(x,y,z,w)
{
    var yaw, pitch, roll;
    var rpy = new Array();

    var w2 = q.w*q.w;
    var x2 = q.x*q.x;
    var y2 = q.y*q.y;
    var z2 = q.z*q.z;
    var unitLength = w2 + x2 + y2 + z2;
    var abcd = q.w*q.x + q.y*q.z;
    var eps = 1e-7;
    var pi = 3.14159265358979323846;
    if (abcd > (0.5-eps)*unitLength)
    {
        yaw = 2 * atan2(q.y, q.w);
        pitch = pi;
        roll = 0;
    }
    else if (abcd < (-0.5+eps)*unitLength)
    {
        yaw = -2 * atan2(q.y, q.w);
        pitch = -pi;
        roll = 0;
    }
    else
    {
        var adbc = q.w*q.z - q.x*q.y;
        var acbd = q.w*q.y - q.x*q.z;
        yaw = atan2(2*adbc, 1 - 2*(z2+x2));
        pitch = asin(2*abcd/unitLength);
        roll = atan2(2*acbd, 1 - 2*(y2+x2));
    }
    rpy[0]=roll; rpy[1]=pitch; rpy[2]=yaw;
    return rpy;
}