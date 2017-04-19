window.onload = function() {
	var button = document.getElementById("previewButton");
	button.onclick = previewHandler;
	makeImage();
}
function previewHandler() {
	var canvas = document.getElementById("tshirtCanvas");
	var context = canvas.getContext("2d");
	fillBackgroundColor(canvas, context);
	var selectObj = document.getElementById("shape");
	var index = selectObj.selectedIndex;
	var shape = selectObj[index].value;

	if(shape == "squares") {
		for(var squares = 0; squares < 20; squares++) {
			drawSquare(canvas, context);
		}
	} else if(shape == "circles") {
		for(var circles = 0; circles < 20; circles++) {
			drawCircle(canvas, context);
		}
	}
	drawText(canvas, context);
	drawBird(canvas, context);
}

function drawSquare(canvas, context) {
	var w = Math.floor(Math.random() * 40);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	context.fillStyle = "lightblue";
	context.fillRect(x, y, w, w);
}

function fillBackgroundColor(canvas, context) {
	var selectObj = document.getElementById("backgroundColor");
	var index = selectObj.selectedIndex;
	var bgColor = selectObj.options[index].value;
	context.fillStyle = bgColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(canvas, context) {
	var radius = Math.floor(Math.random() * 40);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, true);
	context.fillStyle = "lightblue";
	context.fill();
}

function updateTweets(tweets) {
	var tweetsSelection = document.getElementById("tweets");
	for(var i = 0; i < tweets.length; i++) {
		var option = document.createElement("option");
		option.text = tweet[i].text;
		option.value = tweet[i].text.replace("\"", "'");
		tweetsSelection.options.add(option);
	}
	tweetsSelection.selectedIndex = 0;
}
//绘制文本
function drawText(canvas, context) {
	var selectObj = document.getElementById("foregroundColor");
	var index = selectObj.selectedIndex;
	var fgColor = selectObj[index].value;
	context.fillStyle = fgColor;
	context.font = "bold 1em sans-serif";
	context.textAlign = "left";
	context.fillText("I saw this tweet", 20, 40);

	selectObj = document.getElementById("foregroundColor");
	var index = selectObj.selectedIndex;
	var tweet = selectObj[index].value;
	context.font = "italic 1.2em serif";
	context.fillText(tweet, 30, 100);

	context.font = "bold 1em sans-serif";
	context.textAlign = "right";
	context.fillText("and all Igot was this lousy t-shirt!", canvas.width - 20, canvas.height - 40);
}
//放置图像
function drawBird(canvas, context) {
	var twitterBird = new Image();
	twitterBird.src = "twitterBird.png";
	twitterBird.onload = function() {
		context.drawImage(twitterBird, 20, 120, 70, 70);
	};
}
//保存画布
function makeImage() {
	var canvas = document.getElementById("tshirtCanvas");
	canvas.onclick = function() {
		window.location = canvas.toDataURL("image/png");
	};
}