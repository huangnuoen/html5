var ourCoords = {
	latitude: 47.624851,
	longitude: -122.52099
}
window.onload = getMyLocation;
function getMyLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	} else {
		alert("no geolocation support");
	}
}
function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var div = document.getElementById("location");
	div.innerHTML = "you are at latitude:" + latitude + ",longitude:" + longitude;
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
	var km = computeDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "you are " + km + " km from the wickedlysmart hq";
}