//framerate
let fr = 25; //starting FPS
//excoplasm vectors
let v1 = new p5.Vector(40, 50, 0);
let v2 = new p5.Vector(40, 50, 0);
let v3 = new p5.Vector(100, 100, -1);
//perlin noise stuff for the future
let noiseScale=0.02;
let xoff = 0.0;
let yoff = 0.0;
let zoff = 0.0;
//images some not used
let hands;
let ghost;
//class vibes
let hand;
let ghosts = [];
let howManyGhosts = 10;
//music
let tune;
let loopStart = 0.5;
let loopDuration = 0.2;

function preload(){
  	tune = loadSound('assets/y.mp3');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
  	frameRate(fr); // Attempt to refresh at starting FPS

  	ghost = loadImage('assets/spook.png');
	hand = loadImage('assets/hand.png');
	ouija = loadImage('assets/ouija.png');
	
	hands = new SpookyGhosts();
	for (let i = 0; i < howManyGhosts	; i++){
		ghosts[i] = new SpookyGhosts
	();
	}
	//makes the whole screen clickable to play the audio loop
	let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(canvasPressed);
}

function draw(){
	background(ouija, windowWidth, windowHeight);
	noCursor();
	//summon the class my dudes
	hands.display();
	hands.move();
	for (let i = 0; i < howManyGhosts	; i++){
		ghosts[i].move();
		ghosts[i].display();
	}
	//ectoplasm
	beginShape();
	noStroke();
	fill(0, 255, 0, 30);
	let xoff = 0; 
	for (let x = 0; x <= width; x += 10) {
	   	let y = map(noise(xoff, yoff), 0, 1, 20, 500);
	    vertex(x, y);
	    xoff += 0.05;
	  }
	    yoff += 0.1;
	vertex(width, height);
	vertex(0, height);
	endShape(CLOSE);
	//the player
	image(hand, mouseX, mouseY, 300, 300);

}

class SpookyGhosts {
	constructor(){
		//give ball a location
		this.x = random(width);
		this.y = random(height);
		this.xspeed = random(0,1);
		this.yspeed = random(0,1);
	}
	display(){
		image(ghost, this.x, this.y, 100, 100);
	}
	move(){
		this.x = this.x + this.xspeed;
		this.y = this.y + this.yspeed;

		if ((this.x > width) || (this.x < 0)) {
		this.xspeed = this.xspeed * -1;
	}

		if ((this.y > height) || (this.y < 0)) {
			this.yspeed = this.yspeed * -1;
		}
	}

}
//start music
function canvasPressed() {
	tune.loop();
	background(0, 200, 50);
}
