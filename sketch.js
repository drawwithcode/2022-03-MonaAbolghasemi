let deg = 0; //the angle to make the ghost position fluctuate
let ghost;//to store an instance of the class
var myImage;
let mic;
let mySong;

function preload() {
  myImage = loadImage("./assets/halloween_bg.jpg");
  mySong = loadSound("./assets/John_Carpenter.mp3");
}

function setup() {
  createCanvas(650, 650);
  ghost = new Ghost(300, 500);//creating a new instance of the ghost in its position 
  imageMode(CENTER);
  mySong.play();
   //creating the mic settings:
  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
 
}

function draw() {
  image(myImage, 325, 325, 650, 650);//putting the image on the canvas
//Creating the texts:
  fill("#ecd62a");
  noStroke();
  textFont("helvectica");
  textSize(20);
  text("(Say boo to scare the ghost!)", width / 2, 130);
  textSize(60);
  textFont("Creepster");
  textAlign(CENTER);
  textStyle(BOLD);
  fill("#white");
  text("HAPPY HALLOWEEN", width / 2, 100);
  //------------------------------------------------------------+
  //drawing the ghost shape:
  ghost.show();
  //if the mic is used and its level goes beyond a certain level the moveOut method will be called
  //otherwise the move1 method will be callled which causes the bouncing of the ghost
  if (mic) {
    if (mic.getLevel() * 10 > 0.5) {
      ghost.moveOut();
      
    } else {
      ghost.move1();
    }
  }
  //when the ghost is scared and moves up, it then comes back slowly to its starting position using the moveIn method:
  if (ghost.y < 500) {
    ghost.moveIn();
  }
}

//the Ghost class:
class Ghost {
  constructor(x, y) {
    this.size = 0.5;
    this.x = x;
    this.y = y;
    this.rectw = 100 * this.size;
    this.recth = 70 * this.size;
    this.legrecth = this.recth - 2;
    this.leg = 30 * this.size;
    this.legNo = 4;
    this.leghaba = this.rectw / this.legNo;
    //this.shadowWidth = 60;
  }

  show() {
    noStroke();
    ellipseMode(CORNER);
    //drawing the body
    fill("#F1EEE6");
    ellipse(this.x, -this.rectw / 2 + this.y, this.rectw);
    rect(this.x, this.y, this.rectw, this.recth);
    beginShape();
    curveVertex(this.x, this.y + this.legrecth);
    curveVertex(this.x, this.y + this.legrecth);

    curveVertex(this.x + 3, this.y + this.recth + this.leg);
    curveVertex(this.x + this.leghaba - 3, this.y + this.recth);
    curveVertex(
      this.x + this.leghaba + this.leghaba / 2 - 3,
      this.y + this.recth + this.leg
    );
    curveVertex(this.x + this.leghaba * 2, this.y + this.recth);
    curveVertex(
      this.x + this.leghaba * 2 + this.leghaba / 2 + 3,
      this.y + this.recth + this.leg
    );
    curveVertex(this.x + this.leghaba * 3 + 3, this.y + this.recth);
    curveVertex(this.x + this.rectw - 3, this.y + this.recth + this.leg);

    curveVertex(this.x + this.rectw, this.y + this.legrecth);
    curveVertex(this.x + this.rectw, this.y + this.legrecth);
    endShape();

    //drawing the eyes
    fill("#2d1e5f");
    ellipseMode(CENTER);
    let d = 18 * this.size;
    ellipse(this.x + 30 * this.size, this.y - 18 * this.size, d);
    ellipse(this.x + 70 * this.size, this.y - 18 * this.size, d);
  }
  move1() { //this method makes the ghost bounce by changing this.y value using a sine function
    let radian = radians(deg);
    let a = sin(radian) / 2;
    this.y = this.y + a * 5;
    deg += 10; //movement
  }
  moveOut() {//this method moves the ghost up by 10 pixels
    this.y = this.y - 10;
 }
  moveIn() {//this method moves the ghost down by 2 pixels
    this.y = this.y + 2;
  
  }
}
