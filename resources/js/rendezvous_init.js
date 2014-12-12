var DEFAULT_MAP_HOME = {
    lat: 47.413157,
    lon: 8.548645
};

var DEFAULT_GPS_TOPIC ='/gps_topic';
var DEFAULT_MAG_TOPIC ='/magnetometer_topic';
var DEFAULT_POSE_TOPIC ='/pose_topic'; // to be implemented

var mapHome = {
    lat: 47.413157,
    lon: 8.548645
};
var inputPose;
var inputGps;
var inputMagnetometer;
var poseSwitch;
var gpsSwitch;
var magnetometerSwitch;
var videoUrl;

function rv_init() {
    initFlightIndicators();
	initRosSubscriber();
	loadOptions();
    initMap(mapHome.lat,mapHome.lon);
    startRosSubscriber();
}
