let symbols = ['✦', '❊', '○', '·'];
let particles = [];

function setup() {
  const holder = select('#about-canvas-holder');
  const canvas = createCanvas(holder.width, holder.height);
  canvas.parent('about-canvas-holder');
  textAlign(CENTER, CENTER);
  textSize(20);
  noStroke();
  background(255, 0);
}

function windowResized() {
  const holder = document.getElementById('about-canvas-holder');
  resizeCanvas(holder.offsetWidth, holder.offsetHeight);
}

function draw() {
  clear();
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].alpha <= 0) particles.splice(i, 1);
  }

  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    if (frameCount % 5 === 0) {
      particles.push(new SymbolParticle(mouseX + random(-20, 20), mouseY + random(-20, 20)));
    }
  }
}

class SymbolParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.char = random(symbols);
    this.size = random(10, 24);
    this.alpha = 200;
    this.fadeSpeed = random(2, 5);
    this.col = color(120, 100, 255, this.alpha);
  }

  update() {
    this.alpha -= this.fadeSpeed;
    this.alpha = max(this.alpha, 0);
    this.col.setAlpha(this.alpha);
  }

  display() {
    fill(this.col);
    textSize(this.size);
    text(this.char, this.x, this.y);
  }


}

