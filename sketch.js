var imgs = [];

let openWindow = true;
let openImage;
let closedImage;
let city = [];

let snow = [];
let gravity;

let zOff = 0;

let spriteshee;
let bg;
let textures = [];

var im;

function preload() {
  spritsheet = loadImage('f32.png');
  openImage = loadImage('open10.png');
  closedImage = loadImage('close10.jpg');
  for (var i = 0; i < 15; i++) {
    //if ( 1<i<8)
    imgs[i] = loadImage("img_" + i + ".jpg");
  }
  im = random(imgs);

  for (var j = 0; j < 8; j++) {
    if (!imgs[j]) {
      console.log("There is somthing wrong with image number '" + j + "'.");
    }
  }

  console.log(imgs.length);
}

function mousePressed() {
  openWindow = !openWindow;
}


function setup() {
  createCanvas(1100, 687);
  gravity = createVector(0, 0.3);
  for (let x = 0; x < spritsheet.width; x += 32) {
    for (let y = 0; y < spritsheet.height; y += 32) {
      let img = spritsheet.get(x, y, 32, 32);
      image(img, x, y);
      textures.push(img);
    }
  }
  console.log(textures.length);

  for (let i = 0; i < 400; i++) {
    let x = random(width);
    let y = random(height);
    let design = random(textures);
    snow.push(new Snowflake(x, y, design));
  }
  console.log(snow.length);

}

function draw() {
  background(200);

  if (openWindow) {
    image(closedImage, 900, 700);
    background(closedImage);
    im = random(imgs);
  } else {
    image(im, 130, 60, 490, 470);

    zOff += 0.01;


    for (var flake of snow) {
      let xOff = flake.pos.x / width;
      let yOff = flake.pos.y / height;
      let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
      let wind = p5.Vector.fromAngle(wAngle);
      wind.mult(0.1);



      flake.applyForce(gravity);
      flake.applyForce(wind);
      flake.update();
      flake.render();
    }

    for (let i = snow.length - 1; i >= 0; i--) {
      if (snow[i].offScreen) {
        snow.splice(i, 1);
      }
    }
    background(openImage, 700, 500);
  }
}