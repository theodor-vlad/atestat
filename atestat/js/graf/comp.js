let arr, nodes = [], copied = [];
let canDeleteNode = false, canCreateNewNode = false;
let count = 0, r = 50, tS = 25;
let dfsEdges = [], bfsEdges = [], viz = [];
let x0;
let cnv, w, h = 800;
let p2, p3;

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

  let p = createDiv();
  p.id('spanDiv');

  let nodeBtn = createButton("Nod nou");
  nodeBtn.mouseClicked(createNode);
  nodeBtn.parent('spanDiv');

  let edgeBtn = createButton("Muchie nouă");
  edgeBtn.mouseClicked(makeEdge);
  edgeBtn.parent('spanDiv');

  let deleteNodeBtn = createButton("Ștergere nod");
  deleteNodeBtn.mouseClicked(deleteNode);
  deleteNodeBtn.parent('spanDiv');

  let deleteEdgeBtn = createButton("Ștergere muchie");
  deleteEdgeBtn.mouseClicked(deleteEdge);
  deleteEdgeBtn.parent('spanDiv');

  let resetPerm = createButton("Resetare permisiuni");
  resetPerm.mouseClicked(rp);
  resetPerm.parent('spanDiv');

  let compBtn = createButton("Comparare");
  compBtn.mouseClicked(comp);
  compBtn.parent('spanDiv');

  p = createDiv();
  p.id('postDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p2 = createP();
  p2.parent('postDiv');
  p3 = createP();
  p3.parent('postDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("DFS (Depth-First-Search)");

  let p1 = createP();
  p1.parent('postDiv');
  p1.html("Se vizitează vârful de start. Apoi, se vizitează primul vecin nevizitat al vârfului de start. Se vizitează în continuare primul vecin nevizitat al primului vecin al vârfului de start, parcurgând graful în adâncime până la găsirea unui vârf fără vecini nevizitati. În cazul unui astfel de vârf, se revine la vârful său părinte, căutăndu-se în același mod eventualii vecini nevizitati, până când toate vârfurile accesibile din vârful de start au fost vizitate.");

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("BFS (Breadth-First-Search)");

  p1 = createP();
  p1.parent('postDiv');
  p1.html("Se vizitează vârful de start. Apoi, se vizitează în ordine toți vecinii nevizitați ai vârfului de start. Se continuă prin a se vizita vecinii nevizitați ai vecinilor vârfului de start, până când toate vârfurile accesibile din vârful inițial au fost vizitate.");

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
  line(0, height / 2, width, height / 2);
  line(width / 2, height / 2, width / 2, height);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < i; j++) {
      if (nodes[i].deleted == false && nodes[j].deleted == false && arr[i][j]) {
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      }
    }
  }

  let xoff = 40, yoff = 30;
  push();
  translate(0, height / 2);
  textAlign(CENTER, LEFT);
  textSize(30);
  fill(0);
  strokeWeight(0.1);
  text("DFS", xoff, yoff);
  for (let i = 0; i < dfsEdges.length; ) {
    let a = dfsEdges[i++];
    let b = dfsEdges[i++];
    strokeWeight(2);
    stroke(0);
    line(copied[a].x, copied[a].y, copied[b].x, copied[b].y);
  }

  translate(width / 2, 0);
  textAlign(CENTER, LEFT);
  textSize(30);
  fill(0);
  strokeWeight(0.1);
  text("BFS", xoff, yoff);
  for (let i = 0; i < bfsEdges.length; ) {
    let a = bfsEdges[i++];
    let b = bfsEdges[i++];
    strokeWeight(2);
    stroke(0);
    line(copied[a].x, copied[a].y, copied[b].x, copied[b].y);
  }
  pop();

  for (let i = 0; i < nodes.length; i++) {
    nodes[i].display();
    push();
    translate(0, height / 2);
    copied[i].display();
    translate(width / 2, 0);
    copied[i].display();
    pop();
  }
}

function comp() {
  rp();

  if (!count) return;
  x0 = floor(Number(window.prompt("Nodul de start este: ")));

  if (isNaN(x0) || x0 < 0 || x0 > count || nodes[x0].deleted) {
    window.alert("Date incorecte.");
    return;
  }

  beginComp(x0);
}

function beginComp(x0) {
  dfsEdges = [];
  viz = [];
  if (x0 >= 0) dfs(x0);
  bfsEdges = [];
  viz = [];
  if (x0 >= 0) bfs(x0);
  if (x0 >= 0) {
    let sirvalori = [];
    viz = [];
    for (let i = 0; i < dfsEdges.length; i++) {
      if (!viz[dfsEdges[i]]) {
        viz[dfsEdges[i]] = true;
        sirvalori.push(dfsEdges[i]);
      }
    }
    p2.html("Parcurgere DFS: " + sirvalori);

    sirvalori = [];
    viz = [];
    for (let i = 0; i < bfsEdges.length; i++) {
      if (!viz[bfsEdges[i]]) {
        viz[bfsEdges[i]] = true;
        sirvalori.push(bfsEdges[i]);
      }
    }
    p3.html("Parcurgere BFS: " + sirvalori);
  } else {
    p2.html("Parcurgere DFS: notul anterior de start a fost șters.");
    p3.html("Parcurgere BFS: notul anterior de start a fost șters.");
  }
}

function bfs(v) {
  viz[v] = true;
  let q = [];
  q.push(v);
  while (q.length > 0) {
    let x = q.shift();
    for (let i = 0; i < count; i++) {
      if (i != x && nodes[i].deleted == false && arr[x][i] && !viz[i]) {
        bfsEdges.push(x, i);
        viz[i] = true;
        q.push(i);
      }
    }
  }
}

function dfs(v) {
  viz[v] = true;
  for (let i = 0; i < count; i++) {
    if (v != i && nodes[i].deleted == false && arr[v][i] && !viz[i]) {
      dfsEdges.push(v, i);
      dfs(i);
    }
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
    window.alert("Capetele muchiei coincid.");
    return;
  } else if (!arr[firstNode][secondNode]) {
    window.alert("Nu există nicio muchie între nodul " + firstNode + " și nodul " + secondNode + '.');
    return;
  }

  arr[firstNode][secondNode] = 0;
  arr[secondNode][firstNode] = 0;
  if (!isNaN(x0)) beginComp(x0);
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
    window.alert("Capetele muchiei coincid.");
    return;
  } else if (arr[firstNode][secondNode]) {
    window.alert("Există deja o muchie între nodul " + firstNode + " și nodul " + secondNode + '.');
    return;
  }

  arr[firstNode][secondNode] = 1;
  arr[secondNode][firstNode] = 1;
  if (!isNaN(x0)) beginComp(x0);
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
  if (r / 2 <= x && x <= width - r / 2 && r / 2 <= y && y <= height / 2 - r / 2) {
    return true;
  }
  return false;
}

function mouseClicked() {
  if (canCreateNewNode == true && isInsideCanvas(mouseX, mouseY)) {
    nodes.push(new Node(mouseX, mouseY, count));
    copied.push(new Node(mouseX / 2, mouseY, count++));
  }

  if (canDeleteNode == true && isInsideCanvas(mouseX, mouseY)) {
    for (let i = 0; i < count; i++) {
      if (!nodes[i].deleted) {
        if (dist(nodes[i].x, nodes[i].y, mouseX, mouseY) < nodes[i].r) {
          nodes[i].deleted = true;
          copied[i].deleted = true;
          if (!isNaN(x0)) {
            if (x0 == i) {
              x0 = -1;
            }
            beginComp(x0);
          }
        }
      }
    }
  }
}
