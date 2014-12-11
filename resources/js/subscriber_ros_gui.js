// Connecting to ROS
// -----------------
var index = 0;
var i = 0;
var newpositionC = 0;
var updateRate = 200;
var initOk = false;
var headingDegrees = 0;
var fixOk = false;
var d = new Date();
var time = d.getTime();
var timeM = time;

//load options from cookies
loadOptions();


var ros = new ROSLIB.Ros({
    url: 'ws://130.192.163.189:9090'
});

var gpsTopicName =document.getElementById("inputGps").value
if(gpsTopicName=='')
    gpsTopicName='/gps_topic' // default topic name
var magnetometerTopicName =document.getElementById("inputMagnetometer").value
if(magnetometerTopicName=='')
    magnetometerTopicName='/magnetometer_topic' // default topic name


// Subscribing to a Topic
// ----------------------
var navSatFixListener = new ROSLIB.Topic({
    ros: ros,
    name: gpsTopicName, //topic name
    messageType: 'sensor_msgs/NavSatFix' //message Type
});

var magneticFieldListener = new ROSLIB.Topic({
    ros: ros,
    name: magnetometerTopicName, //topic name
    messageType: 'sensor_msgs/MagneticField' //message Type
});

navSatFixListener.subscribe(function(message) {

    if (index == 0) { // firts entry

        startVisualization(message.latitude, message.longitude);
        putHome(message.latitude, message.longitude);
        oldCurrentPosition[index] = new google.maps.LatLng(message.latitude, message.longitude);
        initOk = true;

        rotateArrow();

    } else { // new entries

        if (fixOk == false && message.status.status == 3) {
            precisionCircle.setOptions({
                fillColor: '#0000FF'
            }); // BLUE Circle
            fixOk = true;
        }
        if (fixOk == true && message.status.status !== 3) {
            precisionCircle.setOptions({
                fillColor: '#FF0000'
            }); // RED Circle
            fixOk = false;
        }

        newpositionC = new google.maps.LatLng(message.latitude, message.longitude);

        d = new Date();
        time = d.getTime();

        if ((time - timeM) >= updateRate) //marker and path update rate in milliseconds
        {
            //markerCurrentPosition.setPosition(newpositionC);
            precisionCircle.setCenter(newpositionC);
            precisionCircle.setRadius(Math.sqrt(message.position_covariance[0] + message.position_covariance[4]));
            oldCurrentPosition[i] = newpositionC;

            path = flightPath.getPath();
            path.push(oldCurrentPosition[i]);

            timeM = time;
            i++;
        }

    }

    index++; // update index

});

magneticFieldListener.subscribe(function(message) {
    if (initOk == true) {
        headingDegrees = Math.atan2(message.magnetic_field.y, message.magnetic_field.x) * 180 / Math.PI;
    }
});

