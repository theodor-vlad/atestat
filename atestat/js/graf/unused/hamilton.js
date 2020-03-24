let vertices = [];
let solution = [];
let bestSolution = [];
let distanceMin = -1;
let permCount = 1;
let totalPermutaions;

function setup() {

  createCanvas(1366, 768);

  let vertexCount = 6;
  totalPermutaions = factorial(vertexCount);
  vertices = [];
  for (let i = 0; i < vertexCount; i++) {
    solution[i] = i;
    vertices[i] = new Vertex(random(100, width - 100), random(100, 0.67 * height));
  }
}

function draw() {
  background(0);
  //frameRate(1);
  textSize(32);
  fill(255);
  noStroke();
  text("Permutation number: " + permCount, 10, height - 85);
  text(floor(100 * permCount / totalPermutaions) + "% completed", 10, height - 50);
  text("Best solution: " + bestSolution + " with a minimum distance of " + nf(distanceMin, 0, 3), 10, height - 15);

  stroke(255);
  strokeWeight(4);
  noFill();
  for (let i = 0; i < vertices.length; i++) {
    vertices[i].display();
    fill(255);
    noStroke();
    textSize(50);
    text(i, vertices[i].getX(), vertices[i].getY());
    stroke(255);
    strokeWeight(4);
    noFill();
  }

  displaySolution(solution);
  let distance = calc(solution);
  if (distance < distanceMin || distanceMin === -1) {
    distanceMin = distance;
    bestSolution = solution.slice();
    console.log(bestSolution, distanceMin);
  }

  stroke(255, 204, 100);
  strokeWeight(4);
  noFill();
  for (let i = 0; i < vertices.length; i++) {
    vertices[i].display();
    fill(255);
    noStroke();
    textSize(50);
    text(i, vertices[i].getX(), vertices[i].getY());
    stroke(255, 204, 100);
    strokeWeight(4);
    noFill();
  }
  displaySolution(bestSolution);

  if (!nextPerm(solution)) {
    /*background(0);
    textSize(32);
    fill(255);
    noStroke();
    text("Permutation number: " + permCount, 10, height - 50);
    text(floor(100 * permCount / totalPermutaions) + "% completed", 10, height - 15);
    stroke(255, 204, 100);
    strokeWeight(4);
    noFill();
    for (let i = 0; i < vertices.length; i++) {
      vertices[i].display();
    }
    displaySolution(bestSolution);*/
    noLoop();
  }
}

function nextPerm(arr) {
  permCount++;

  var i = arr.length - 1;
  while (i > 0 && arr[i - 1] >= arr[i]) i--;

  if (i <= 0) {
    permCount--;
    return false;
  }

  var j = arr.length - 1;
  while (arr[j] <= arr[i - 1]) j--;

  var temp = arr[i - 1];
  arr[i - 1] = arr[j];
  arr[j] = temp;

  j = arr.length - 1;
  while (i < j) {
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    i++; j--;
  }

  return true;
}

function calc(arr) {
  totalDist = 0.0;
  for (let i = 1; i < arr.length; i++) {
    let x1 = vertices[arr[i - 1]].x;
    let y1 = vertices[arr[i - 1]].y;
    let x2 = vertices[arr[i]].x;
    let y2 = vertices[arr[i]].y;
    totalDist += dist(x1, y1, x2, y2);
  }
  return totalDist;
}

function displaySolution(arr) {
  for (let i = 1; i < arr.length; i++) {
    let x1 = vertices[arr[i - 1]].x;
    let y1 = vertices[arr[i - 1]].y;
    let x2 = vertices[arr[i]].x;
    let y2 = vertices[arr[i]].y;
    line(x1, y1, x2, y2);
  }
}

function factorial(n) {
  if (n == 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
