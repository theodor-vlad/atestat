let count = 0, x0 = -1;
let nodes = [], arr;
let tSBox = 20, tS = 25;
let rw = 40, r = 50, offset = 50, aw = 80;
let canDeleteNode = false, canCreateNewNode = false;
let tata = [], arr2, dmin = [], visited = [];
let cnv, w, h = 800;

function make2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function setup() {
  w = parseInt($('#cnvWidth').css('width'), 10);
  cnv = createCanvas(w, h);
  cnv.id('sketch-holder');

  arr = make2DArray(100, 100);
  arr2 = make2DArray(100, 100);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr2[i][j] = arr[i][j] = 0;
    }
  }

  let p = createDiv();
  p.id('spanDiv');

  let nodeBtn = createButton("Nod nou");
  nodeBtn.mouseClicked(createNode);
  nodeBtn.parent('spanDiv');

  let edgeBtn = createButton("Arc nou");
  edgeBtn.mouseClicked(makeEdge);
  edgeBtn.parent('spanDiv');

  let deleteNodeBtn = createButton("Ștergere nod");
  deleteNodeBtn.mouseClicked(deleteNode);
  deleteNodeBtn.parent('spanDiv');

  let deleteEdgeBtn = createButton("Ștergere arc");
  deleteEdgeBtn.mouseClicked(deleteEdge);
  deleteEdgeBtn.parent('spanDiv');

  let resetPerm = createButton("Resetare permisiuni");
  resetPerm.mouseClicked(rp);
  resetPerm.parent('spanDiv');

  let start = createButton("Setare punct de start");
  start.mouseClicked(setStart);
  start.parent('spanDiv');

  p = createDiv();
  p.id('postDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("Algoritmul lui Dijkstra");

  let p1 = createP();
  p1.parent('postDiv');
  p1.html("Se alege un vârf de start, x0. Se inițializează un vector de distanțe cu valoarea muchiei de la x0 la i (i = vârf din graf) dacă aceasta există, sau infinit, altfel. Se determină câte un vârf neselectat din graf cu proprietatea că distanța de la x0 la vârful ales este minimă, apoi se actualizează distanțele către celelalte vârfuri neselectate ale grafului. După n-1 determinări, pe poziția i în vectorul de distanțe se va găsi costul drumului de cost minim de la x0 la vârful i, sau infinit, dacă nu se poate ajunge la vârful i din x0. Complexitatea acestei implementări este O(n^2).");

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');
}

function draw() {
  cnv.style("width", $('#cnvWidth').css('width'));
  $('#sketch-holder').height(windowHeight * h / 975);
  background(230);

  strokeWeight(2);
  stroke(0);
  line(width / 2, 0, width / 2, height);

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      if (nodes[i].deleted == false && nodes[j].deleted == false && arr[i][j]) {
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      }
      if (nodes[i].deleted == false && nodes[j].deleted == false && arr2[i][j]) {
        push();
        translate(width / 2, 0);
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
        pop();
      }
    }
  }

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      if (nodes[i].deleted == false && nodes[j].deleted == false && arr[i][j]) {
        arrow(i, j);
      }
      if (nodes[i].deleted == false && nodes[j].deleted == false && arr2[i][j]) {
        push();
        translate(width / 2, 0);
        arrow(i, j);
        pop();
      }
    }
  }


  for (let i = 0; i < nodes.length; i++) {
    nodes[i].display();
    push();
    translate(width / 2, 0);
    nodes[i].display();
    pop();
  }
}

function arrow(i, j) {
  let angle = atan2(nodes[i].y - nodes[j].y, nodes[i].x - nodes[j].x); //gets the angle of the line
  let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y) - r;

  push(); //start new drawing state
  translate(nodes[j].x, nodes[j].y); //translates to the destination vertex
  rotate(angle-PI/2); //rotates the arrow point
  strokeWeight(3);
  triangle(-offset*0.20, offset*0.75, offset*0.20, offset*0.75, 0, 0.51*offset); //draws the arrow point as a triangle
  pop();

  push();
  translate(nodes[i].x, nodes[i].y);
  rotate(angle-PI/2);
  translate(0, -d*9/10);
  rotate(PI/2-angle);
  strokeWeight(3);
  fill(255);
  rect(-rw/2, -rw/2, rw, rw);
  textSize(tSBox);
  fill(0);
  textAlign(CENTER, CENTER);
  strokeWeight(2);
  text(arr[i][j], 0, 0);
  pop();
}

function initializare(x0) {
  tata = [];
  dmin = [];
  visited = [];
  if (x0 == -1) return;
  for (let i = 0; i < count; i++) {
    tata[i] = x0;
    dmin[i] = (arr[x0][i] > 0 && nodes[i].deleted == false) ? arr[x0][i] : Infinity;
    visited[i] = nodes[i].deleted;
    for (let j = 0; j < count; j++) {
      arr2[i][j] = 0;
    }
  }

  tata[x0] = -1;
  dmin[x0] = Infinity;
  visited[x0] = true;
}

function dijkstra(x0) {
  initializare(x0);
  if (x0 == -1) return;
  while (1) {
    let distmin = Infinity;
    let vfmin = -1;
    for (let i = 0; i < count; i++) {
      if (nodes[i].deleted == false && visited[i] == false && dmin[i] > 0 && dmin[i] < distmin) {
        distmin = dmin[i];
        vfmin = i;
      }
    }

    if (vfmin == -1) {
      break;
    }

    visited[vfmin] = true;
    for (let i = 0; i < count; i++) {
      if (nodes[i].deleted == false && visited[i] == false && arr[vfmin][i] > 0 && distmin + arr[vfmin][i] < dmin[i]) {
        dmin[i] = distmin + arr[vfmin][i];
        tata[i] = vfmin;
      }
    }
  }

  for (let i = 0; i < count; i++) {
    if (nodes[i].deleted == false && dmin[i] < Infinity) {
      let dad = tata[i];
      let son = i;
      while (dad != -1) {
        if (arr2[dad][son]) {
          break;
        }
        arr2[dad][son] = arr[dad][son];
        son = dad;
        dad = tata[son];
      }
    }
  }
}

function setStart() {
  x0 = floor(Number(window.prompt("Nodul de start este: ")));
  if (isNaN(x0) || x0 < 0) {
    window.alert("Date incorecte.");
  } else {
    dijkstra(x0);
  }
}

function rp() {
  canDeleteNode = false;
  canCreateNewNode = false;
}

function deleteEdge() {
  rp();

  let firstNode = window.prompt("Indexul primului nod:");
  firstNode = floor(Number(firstNode));
  if (isNaN(firstNode) || firstNode < 0 || firstNode >= count || nodes[firstNode].deleted) {
    window.alert("Date incorecte.");
    return;
  }

  let secondNode = window.prompt("Indexul celui de-al doilea nod:");
  secondNode = floor(Number(secondNode));
  if (isNaN(secondNode) || secondNode < 0 || secondNode >= count || nodes[secondNode].deleted) {
    window.alert("Date incorecte.");
    return;
  }

  if (firstNode === secondNode) {
    window.alert("Capetele arcului coincid.");
    return;
  } else if (arr[firstNode][secondNode] === 0) {
    window.alert("Nu există niciun arc de la nodul " + firstNode + " la nodul " + secondNode + '.');
    return;
  }

  arr[firstNode][secondNode] = 0;
  dijkstra(x0);
}

function makeEdge() {
  rp();

  let firstNode = window.prompt("Indexul primului nod:");
  firstNode = floor(Number(firstNode));
  if (isNaN(firstNode) || firstNode < 0 || firstNode >= count || nodes[firstNode].deleted) {
    window.alert("Date incorecte.");
    return;
  }

  let secondNode = window.prompt("Indexul celui de-al doilea nod:");
  secondNode = floor(Number(secondNode));
  if (isNaN(secondNode) || secondNode < 0 || secondNode >= count || nodes[secondNode].deleted) {
    window.alert("Date incorecte.");
    return;
  }

  if (firstNode === secondNode) {
    window.alert("Capetele arcului coincid.");
    return;
  } else if (arr[firstNode][secondNode] !== 0) {
    window.alert("Există deja un arc de la nodul " + firstNode + " la nodul " + secondNode + '.');
    return;
  }

  let val = window.prompt("Valoarea arcului:");
  val = Number(val);
  if (isNaN(val) || val < 0) {
    window.alert("Date incorecte.");
    return;
  }

  arr[firstNode][secondNode] = val;
  dijkstra(x0);
}

function deleteNode() {
  canDeleteNode = true;
  canCreateNewNode = false;
}

function createNode() {
  canDeleteNode = false;
  canCreateNewNode = true;
}

function isInsideCanvas(x, y) {
  if (r / 2 <= x && x <= width / 2 - r / 2 && r / 2 <= y && y <= height - r / 2) {
    return true;
  }
  return false;
}

function mouseClicked() {
  if (canCreateNewNode == true && isInsideCanvas(mouseX, mouseY)) {
    nodes.push(new Node(mouseX, mouseY, count++));
  }

  if (canDeleteNode == true && isInsideCanvas(mouseX, mouseY)) {
    for (let i = 0; i < count; i++) {
      if (!nodes[i].deleted) {
        if (dist(nodes[i].x, nodes[i].y, mouseX, mouseY) < nodes[i].r) {
          nodes[i].deleted = true;
          if (x0 == i) {
            for (let x = 0; x < 100; x++) {
              for (let y = 0; y < 100; y++) {
                arr[x][y] = arr2[x][y] = 0;
              }
            }
            dijkstra(-1);
          } else {
            dijkstra(x0);
          }
        }
      }
    }
  }

  for (let i = 0; i < count; i++) {
    if (!nodes[i].deleted) {
      if (!nodes[x0].deleted && x0 != -1 && dist(nodes[i].x + width / 2, nodes[i].y, mouseX, mouseY) < nodes[i].r) {
        if (dmin[i] === Infinity) {
          if (i == x0) {
            window.alert("Distanța de la nodul " + x0 + " la nodul " + i + " este 0.");
          } else {
            window.alert("Distanța de la nodul " + x0 + " la nodul " + i + " este infinit.");
          }
        } else {
          window.alert("Distanța de la nodul " + x0 + " la nodul " + i + " este " + dmin[i] + '.');
        }
      }
    }
  }
}
