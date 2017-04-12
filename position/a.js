var map = null;
var watchId = null;
var ourCoords = {
	latitude: 47.624851,
	longitude: -122.52099
}
window.onload = getMyLocation;
function getMyLocation() {
	if(navigator.geolocation) {
		var watchButton = document.getElementById("watch");
		watchButton.onclick = watchLocation;
		var clearWatchButton = document.getElementById("clearWatch");
		clearWatchButton.onclick = clearWatch;
	} else {
		alert("no geolocation support");
	}
}
function displayError(error) {
	var errorTypes = {
		0: "unknown error",
		1: "permission denied by user",
		2: "position is not available",
		3: "request timed out"
	};
	var errorMessage = errorTypes[error.code];
	if(error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
}
function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);
	var Radius = 6371;
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius;
	return distance;
}
function degreesToRadians(degrees) {
	var radians = (degrees * Math.PI)/180;
	return radians;
}
function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var div = document.getElementById("location");
	div.innerHTML = "you are at latitude:" + latitude + ", longitude: " + longitude;
	div.innerHTML += "(with " + position.coords.accuracy + "meters accuracy)";

	var km = computeDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "you are " + km + " km from the wickedlysmart hq";
	if(map == null) {showMap(position.coords);}
}

function showMap(coords){
	//构建latlng对象
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
	//地图选项
	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
	var title = "your location";
	var content = "you are here:" + coords.latitude + ", " + coords.longitude;
	addMarker(map, googleLatAndLong, title, content);
}
function addMarker(map, latlong, title, content) {
	var markerOptions = {
		position: latlong,//当前位置信息
		map: map,
		title: title,
		clickable: true
	};
	//构建标记，传入创建的markeroptions的信息
	var marker = new google.maps.Marker(markerOptions);
	//定义新窗口
	var infoWindowOptions = {
		content: content,
		position: latlong
	};
	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	google.maps.event.addListener(marker, "click", function() {
		infoWindow.open(map);
	});
}
function watchLocation() {
	watchId = navigator.geolocation.watchPosition(displayLocation, displayError, {enableHighAccuracy: true, timeout: 100, maximumAge: 0});
}
function clearWatch() {
	if(watchId) {
		navigator.geolocation.clearWatch(watchId);
		watchId = null;
	}
}