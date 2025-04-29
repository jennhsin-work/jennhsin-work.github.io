let grid = [];
let gridSize = 3;
let cellSize = 100;
let scratchLayer;
let allSymbols = [];
let newTicketButton;
let starPositions = [];

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  textSize(40);

  // Generate static star positions ONCE
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);
    starPositions.push({ x: x, y: y });
  }

  // Create and style "New Ticket" button
  newTicketButton = createButton('New Ticket');
  // newTicketButton.position(width / 2 + 200, height + 80);
  newTicketButton.style('position', 'relative');
  newTicketButton.style('top', '-100px');
  newTicketButton.style('left', '-200px');
  newTicketButton.style('background-color', '#88cc88'); // soft green
  newTicketButton.style('color', 'white');
  newTicketButton.style('font-size', '18px');
  newTicketButton.style('border', 'none');
  newTicketButton.style('padding', '10px 20px');
  newTicketButton.style('border-radius', '8px');
  newTicketButton.style('cursor', 'pointer');
  newTicketButton.mousePressed(resetTicket);

  generateTicket();
}

function draw() {
  drawBackground();
  drawTicket();
  image(scratchLayer, 0, 0);
}

function drawBackground() {
  background(255, 200, 220); // Full pink background

  // Scatter static stars everywhere
  noStroke();
  fill(255);
  for (let pos of starPositions) {
    star(pos.x, pos.y, 5, 10, 5);
  }

  // Draw darker pink outer border for full canvas
  noFill();
  stroke(255, 100, 120); // dark pink
  strokeWeight(10);
  rect(5, 5, width - 10, height - 10);

  // Draw ticket panel background (pink with its own border)
  noStroke();
  fill(255, 150, 170);
  rect(430, 30, 300, 300);

  // Dark pink border around the scratch ticket itself
  // noFill();
  // stroke(255, 100, 120); // dark pink
  // strokeWeight(6);
  // rect(430, 30, 300, 300);
}

function generateTicket() {
  allSymbols = [];

  let totalSpots = gridSize * gridSize;
  let numChocolate = floor(random(3, 8));
  let numReject = totalSpots - numChocolate;

  for (let i = 0; i < numChocolate; i++) {
    allSymbols.push("🍫");
  }
  for (let i = 0; i < numReject; i++) {
    allSymbols.push("✋");
  }

  allSymbols = shuffle(allSymbols);

  let count = 0;
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = allSymbols[count];
      count++;
    }
  }

  // Create scratch cover
  scratchLayer = createGraphics(width, height);
  scratchLayer.noStroke();
  scratchLayer.fill(255, 100, 120); // dark pink cover
  scratchLayer.rect(430, 30, 300, 300);
}

function drawTicket() {
  textSize(35);
  fill(0);
  noStroke();
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = 430 + j * cellSize + 50;
      let y = 30 + i * cellSize + 50;

      // Pink outlines inside
      stroke(255, 100, 120);
      strokeWeight(2);
      noFill();
      rect(430 + j * cellSize, 30 + i * cellSize, cellSize, cellSize);

      // Hidden symbols
      noStroke();
      fill(0);
      text(grid[i][j], x, y);
    }
  }
}

function mouseDragged() {
  if (mouseX > 430 && mouseX < 730 && mouseY > 30 && mouseY < 330) {
    scratchLayer.erase();
    scratchLayer.ellipse(mouseX, mouseY, 40, 40);
    scratchLayer.noErase();
  }
}

function resetTicket() {
  generateTicket();
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}



