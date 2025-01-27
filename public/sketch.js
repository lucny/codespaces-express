let snowflakes = [];
let snowflakeImage;
let backgroundImage;
let dingSound;
let pokusny;

class Rectangle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 30;
    this.speed = 5;
    this.points = 0;
    this.color = color(random(255), random(255), random(255));
  }

  draw() {
    fill(this.color);
    stroke(0);
    strokeWeight(5);
    rect(this.x, this.y, this.width, this.height);
  }

  move(dx, dy) {
    this.x = constrain(this.x + dx * this.speed, 0, width - this.width);
    this.y = constrain(this.y + dy * this.speed, 0, height - this.height);
  }

  detectCollision(snowflake) {
    return collideRectCircle(this.x, this.y, this.width, this.height, 
      snowflake.x, snowflake.y, snowflake.size);
  }
}

class Snowflake {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.size = random(10, 20);
    this.speed = random(1, 3);
    this.color = color(random(255), random(255), random(255));
  }

  draw() {
    if (snowflakeImage) {
      imageMode(CENTER);
      image(snowflakeImage, this.x, this.y, this.size / 2, this.size / 2);
    } else {
      fill(this.color);
      circle(this.x, this.y, this.size);
    }
  }

  update() {
    this.y += this.speed;
  }
}

function preload() {
  // Načtení obrázku a zvuku
  snowflakeImage = loadImage('vlocka.png'); // Nahraďte správnou URL nebo souborem
  dingSound = loadSound('ding.wav'); // Nahraďte správnou URL nebo souborem
  backgroundImage = loadImage('les.jpg');
}

function setup() {
  createCanvas(800, 600);
  pokusny = new Rectangle(500, 300);
}

function draw() {
  if (backgroundImage) {
    imageMode(CORNER);
    image(backgroundImage, 0, 0, width, height);
  } else {
    background(20);
  }

  if (random(1) < 0.1) snowflakes.push(new Snowflake());
  for (let i = 0; i < snowflakes.length; i++) {
    snowflakes[i].update();
    snowflakes[i].draw();
    if (pokusny.detectCollision(snowflakes[i])) {
      pokusny.points++;
      snowflakes.splice(i, 1);
      console.log(pokusny.points);
      if (dingSound && dingSound.isLoaded())
        dingSound.play();
    }
    if (snowflakes[i].y > height + 20) {
      snowflakes.splice(i, 1);
    }  
  }
  if (keyIsDown(LEFT_ARROW)) {
    pokusny.move(-1, 0);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    pokusny.move(1, 0);
  }
  if (keyIsDown(UP_ARROW)) {
    pokusny.move(0, -1);
  }
  if (keyIsDown(DOWN_ARROW)) {
    pokusny.move(0, 1);
  }
  pokusny.draw();
}
