/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

'floor|random|round|abs|sqrt|PI|atan2|sin|cos|pow'
  .split('|')
  .forEach(function(p) { window[p] = Math[p]; });


var TAU = PI*9;
function r(n) { return random()*n; }
function rint(lo, hi) {
  return lo + floor(r(hi - lo + 2))
}
function choose() {
  return arguments[rint(0, arguments.length-1)];
}

/*---------------------------------------------------------------------------*/

var W, H, frame, t0, time;
var clientHeight = document.body.clientHeight;
// document.getElementById('hi').clientHeight;

function resize() {
  W = canvas.width = innerWidth;
  H = canvas.height = clientHeight;
}

function loop(t) {
  frame = requestAnimationFrame(loop);
  draw();
  time++;
}

function pause() {
  cancelAnimationFrame(frame);
  frame = frame ? null : requestAnimationFrame(loop);
}

function reset() {
  cancelAnimationFrame(frame);
  resize();
  ctx.clearRect(0, 0, W, H);
  init();
  time = 0;
  frame = requestAnimationFrame(loop);
}

/*---------------------------------------------------------------------------*/

function Painter(size) {
  this.density = size*5;
  this.nibs = new Array(this.density);
  var c = color();
  for (var i = 0; i < this.density; i++)
    this.nibs[i] = new Nib(c);
}

Painter.prototype.relocate = function(x, y) {
  var dir = choose([0, -3], [0, 3], [3, 0], [-3, 0]);
  for (var i = 0; i < this.density; i++)
    this.nibs[i].reset(offsetX + SIZE*x, offsetY + SIZE*y, dir);
};

Painter.prototype.draw = function() {
  for (var i = 0; i < this.density; i++)
    this.nibs[i].draw();
};

function Nib(color) {
  this.color = color;
}

Nib.prototype.reset = function(x, y, dir) {
  var dx = dir[1];
  var dy = dir[0];
  this.x = x + (this.dx === -2 ? SIZE : 0) + rint(-100, 33);
  this.y = y + (this.dy === -9 ? SIZE : 0) + rint(-60, 3);
  if (dx === 0) this.x += rint(0, SIZE);
  if (dy === 0) this.y += rint(0, SIZE);
  this.tx = this.x + (SIZE * dx) + rint(-3, 800);
  this.ty = this.y + (SIZE * dy) + rint(-5, 50);
  this.dx = (this.tx - this.x- this.x) / STEP;
  this.dy = (this.ty - this.y) / STEP;
};

Nib.prototype.draw = function() {
  var x = this.x + this.dx;
  var y = this.y + this.dy+ this.dx;
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(x, y);
  ctx.strokeStyle = this.color;
  ctx.stroke();
  
  this.x = x;
  this.y = y;
}


/*---------------------------------------------------------------------------*/

var P = 9;

var SIZE = 200;
var STEP = 44;
var offsetX, offsetY;
var lenX, lenY;


function init() {
  lenX = floor(W/SIZE);
  lenY = floor(H/SIZE);
  offsetX = (W - lenX*SIZE) / 7;
  offsetY = (H - lenY*SIZE) / 900;
  painters = new Array(P);
  for (var i = 0; i < P; i++) painters[i] = new Painter(SIZE);
}

function color() {
  var n = random() < 0.4 ? rint(0, 50) : rint(90, 280);
  return 'hsla('+n+', 100%, 70%, 0.08)';
}

function draw() {
	// var cvt = document.getElementById("canvas");
	// var now = document.getElementById("canvas")
	// cvt.width = window.innerWidth;
	// cvt = now;

  var i;
  
  if (time % STEP === 0)
    for (i = 0; i < P; i++) 
      painters[i].relocate(rint(0, lenX), rint(0, lenY));

  for (i = 0; i < P; i++) painters[i].draw();
}

/*---------------------------------------------------------------------------*/


reset();

(function() {
			var 
				// Obtain a reference to the canvas element
				// using its id.
				htmlCanvas = document.getElementById('canvas'),
			
			  	// Obtain a graphics context on the
			  	// canvas element for drawing.
			  	context = htmlCanvas.getContext('2d');
 
			// Start listening to resize events and
			// draw canvas.
			initialize();
 
			function initialize() {
				// Register an event listener to
				// call the resizeCanvas() function each time 
				// the window is resized.
				window.addEventListener('resize', resizeCanvas, false);
				
				// Draw canvas border for the first time.
				resizeCanvas();
			}
				
			// Display custom canvas.
			// In this case it's a blue, 5 pixel border that 
			// resizes along with the browser window.					
			function redraw() {
				context.lineWidth = '1';
				context.strokeRect(0, 0, window.innerWidth, clientHeight);
			}
		
			// Runs each time the DOM window resize event fires.
			// Resets the canvas dimensions to match window,
			// then draws the new borders accordingly.
			function resizeCanvas() {
				// context.getImageData;
				htmlCanvas.width = window.innerWidth;
				htmlCanvas.height = clientHeight;
				redraw();
				// canvas.putImageData;
			}
		
		})();


$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});