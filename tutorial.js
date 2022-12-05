var canvas;
var context;
var squareX;
var squareY;
var squareS = 50;
var squareXS = 5;
var playerX;
var playerY;
var fps;
var mouseX;
var mouseY;
var score = 0;
var playerS = 20;
var moveX = 0;
var moveY = 0;
var gameover = false;
window.onload = function() {
	canvas = document.getElementById('canvas')
	document.addEventListener('mousedown', buttonPress, false);
	context = canvas.getContext('2d')
	squareX = canvas.width/2 - squareS/2;
	squareY = 200 - squareS/2;
	playerX = canvas.width/2 - playerS/2;
	playerY = 400 - playerS/2;
	document.onkeydown = checkKeys;
	document.onkeyup = function() {moveY = 0; moveX = 0;}
	fps = 60;
	setInterval(function() {
		update();
		draw();
	}, 1000/fps);
}
function draw() {
	rect(0, 0, canvas.width, canvas.height, 'green');
	rect(0, 150, canvas.width, 100, 'gray');
	rect(squareX, squareY, squareS * 2, squareS, 'white');
	rect(playerX, playerY, playerS, playerS, 'red');
	text('Score: ' + Math.floor(score), '30px Exo', 10, 30, 'white');
	if (gameover) {
		rect(0, 0, canvas.width, canvas.height, 'green');
		text('GAME OVER', '75px Exo', 200, 300, 'white');
		rect(250, 350, 100, 50, 'darkgreen');
	}
}
function buttonPress(e) {
	pos = getMousePos(canvas, e);
	mouseX = pos.x;
	mouseY = pos.y;
	if (mouseX > 250 && mouseX < 350 && mouseY > 350 && mouseY < 400) {
		gameover = false
		playerX = canvas.width/2 - playerS/2;
		playerY = 400 - playerS/2;
		score = 0;
	}
}
function update() {
	playerCol = {x: playerX, y: playerY, w: playerS, h: playerS}
	rectCol = {x: squareX, y: squareY, w: squareS * 2, h: squareS}
	var col = doCollison(playerCol, rectCol);
	if (col) {
		gameover = true;
	}
	squareX += squareXS;
	playerX += moveX;
	playerY += moveY;
	score += 1/fps;
	if (squareX > canvas.width) {
		squareX = -squareS * 2;
	}
	if (playerX + playerS > canvas.width || playerX < 0 || playerY + playerS > canvas.height || playerY < 0) {
		gameover = true;
	}
}

function rect(x, y, w, h, c) {
	context.fillStyle = c;
	context.fillRect(x, y, w, h);
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
function checkKeys(e) {
	//console.log(e.keyCode);
	if (e.keyCode === 37) {
		moveX = -5;
		moveY = 0;
	} else if (e.keyCode === 38) {
		moveY = -5;
		moveX = 0;
	} else if (e.keyCode === 39) {
		moveX = 5;
		moveY = 0;
	} else if (e.keyCode === 40) {
		moveY = 5;
		moveX = 0;
	}
}
function doCollison(a, b) {
	if (a.x < b.x + b.w &&
   	a.x + a.w > b.x &&
   	a.y < b.y + b.h &&
   	a.h + a.y > b.y) {
    	return true;
	} else {
		return false;
	}
}
function text(txt, fnt, x, y, c) {
	context.fillStyle = c;
	context.font = fnt;
	context.fillText(txt, x, y);
}