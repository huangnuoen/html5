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