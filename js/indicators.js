// Dynamic examples
var attitude = $.flightIndicator('#attitude', 'attitude', {showBox: false, roll:50, pitch:-20, size:200, img_directory : 'jQuery-Flight-Indicators/img/'});
var heading = $.flightIndicator('#heading', 'heading', {showBox: false, heading:150, img_directory : 'jQuery-Flight-Indicators/img/'});
var variometer = $.flightIndicator('#variometer', 'variometer', {showBox: false, vario:-5, img_directory : 'jQuery-Flight-Indicators/img/'});
var airspeed = $.flightIndicator('#airspeed', 'airspeed', {showBox: false, img_directory : 'jQuery-Flight-Indicators/img/'});
var altimeter = $.flightIndicator('#altimeter', 'altimeter', {showBox: false, img_directory : 'jQuery-Flight-Indicators/img/'});

// Update at 20Hz
var increment = 0;
setInterval(function() {
    // Attitude update
    attitude.setRoll(30*Math.sin(increment/10));
    attitude.setPitch(50*Math.sin(increment/20));
    
    // Heading update
    heading.setHeading(increment);
    
    // Vario update
    variometer.setVario(2*Math.sin(increment/10));
    
    // Airspeed update
    airspeed.setAirSpeed(80+80*Math.sin(increment/10));
    
    // Altimeter update
    altimeter.setAltitude(10*increment);
    altimeter.setPressure(1000+3*Math.sin(increment/50));
    increment++;
}, 50);	