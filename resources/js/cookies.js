function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function saveOptions() {

    createCookie("rendezvous_rosMasterURI", document.getElementById("rosMasterURI").value, 30);

    createCookie("rendezvous_inputPose", document.getElementById("inputPose").value, 30);
    createCookie("rendezvous_inputGps", document.getElementById("inputGps").value, 30);
    createCookie("rendezvous_inputMagnetometer", document.getElementById("inputMagnetometer").value, 30);

    createCookie("rendezvous_poseSwitch", $('#poseSwitch').bootstrapSwitch('state'), 30);
    createCookie("rendezvous_gpsSwitch", $('#gpsSwitch').bootstrapSwitch('state'), 30);
    createCookie("rendezvous_magnetometerSwitch", $('#magnetometerSwitch').bootstrapSwitch('state'), 30);

    createCookie("rendezvous_videoUrl", document.getElementById("videoUrl").value, 30);
    createCookie("rendezvous_mapHomeLat", document.getElementById("mapHomeLat").value, 30);
    createCookie("rendezvous_mapHomeLon", document.getElementById("mapHomeLon").value, 30);
    window.location.reload();

}

function loadOptions() {

    if (temp = readCookie("rendezvous_rosMasterURI"))
        document.getElementById("rosMasterURI").value = temp;

    if (temp = readCookie("rendezvous_inputPose"))
        document.getElementById("inputPose").value = temp;
    if (temp = readCookie("rendezvous_inputGps"))
        document.getElementById("inputGps").value = temp;
    if (temp = readCookie("rendezvous_inputMagnetometer"))
        document.getElementById("inputMagnetometer").value = temp;


    if (readCookie("rendezvous_poseSwitch") == "false")
        $('#poseSwitch').bootstrapSwitch('state', false);
    if (readCookie("rendezvous_gpsSwitch") == "false")
        $('#gpsSwitch').bootstrapSwitch('state', false);
    if (readCookie("rendezvous_magnetometerSwitch") == "false")
        $('#magnetometerSwitch').bootstrapSwitch('state', false);

    if (temp = readCookie("rendezvous_videoUrl"))
        document.getElementById("videoUrl").value = temp;

    if (temp = readCookie("rendezvous_mapHomeLat")) {
        document.getElementById("mapHomeLat").value = temp;
        mapHome.lat = parseFloat(temp);
    } else {
        mapHome.lat = DEFAULT_MAP_HOME.lat
    }

    if (temp = readCookie("rendezvous_mapHomeLon")) {
        document.getElementById("mapHomeLon").value = temp;
        mapHome.lon = parseFloat(temp);
    } else {
        mapHome.lon = DEFAULT_MAP_HOME.lon
    }

}

function defaultOptions() {

    eraseCookie("rendezvous_rosMasterURI");

    eraseCookie("rendezvous_inputPose");
    eraseCookie("rendezvous_inputGps");
    eraseCookie("rendezvous_inputMagnetometer");

    eraseCookie("rendezvous_poseSwitch");
    eraseCookie("rendezvous_gpsSwitch");
    eraseCookie("rendezvous_magnetometerSwitch");

    eraseCookie("rendezvous_videoUrl");
    eraseCookie("rendezvous_mapHomeLat");
    eraseCookie("rendezvous_mapHomeLon");
    window.location.reload();
}
