let fr = 25; //starting FPS

let v1 = new p5.Vector(40, 50, 0);
let v2 = new p5.Vector(40, 50, 0);
let v3 = new p5.Vector(100, 100, -1);


let hands;
let ghost;

let hand;
let searchers = [];
let howManyHands = 10;

let noiseScale=0.02;
let xoff = 0.0;
let yoff = 0.0; // 2nd dimension of perlin noise
let zoff = 0.0;

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
	
	hands = new HandSearch();
	for (let i = 0; i < howManyHands	; i++){
		searchers[i] = new HandSearch();
	}

	//tune.loop();
	let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(canvasPressed);
}

function draw(){
	background(ouija, windowWidth, windowHeight);
	noCursor();

	//tune.loop();

	hands.display();
	hands.move();
	for (let i = 0; i < howManyHands	; i++){
		searchers[i].move();
		searchers[i].display();
	}


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

	image(hand, mouseX, mouseY, 300, 300);

}

class HandSearch {
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

function canvasPressed() {
  tune.loop();
  background(0, 200, 50);
}
