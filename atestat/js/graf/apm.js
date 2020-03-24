let count = 0;
let nodes = [], copied = [], arr;
let rw = 50, r = 50, tSBox = 25, tS = 25;
let canDeleteNode = false, canCreateNewNode = false;
let edgeList = [];
let frecv, viz, comp;
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
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }

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

  p = createDiv();
  p.id('postDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("Algoritmul lui Kruskal");

  let p1 = createP();
  p1.parent('postDiv');
  p1.html("Se consideră inițial că niciuna din muchiile grafului nu este selectată. Se va selecta câte o muchie de cost minim care nu a mai fost selectată și care nu formează cicluri cu celelalte muchii deja selectate (oricare două vârfuri adiacente trebuie să aparțină unor componente conexe diferite; inițial, fiecare vârf reprezintă propria sa componentă conexă). Algoritmul ia sfârșit când au fost selectate n-1 muchii, unde n = numărul varfurilor grafului. Această implementare a algoritmului Kruskal actualizează arborele parțial de cost minim pe măsură ce se adaugă/șterg muchii și/sau noduri din graf.");

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');
}

function draw() {
  cnv.style("width", $('#cnvWidth').css('width'));
  $('#sketch-holder').height(windowHeight * h / 975);
  background(230);

  stroke(0);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < i; j++) {
      if (nodes[i].deleted == false && nodes[j].deleted == false && arr[i][j]) {
        stroke(0);
        strokeWeight(2);
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
        let mx = (nodes[i].x + nodes[j].x) / 2;
        let my = (nodes[i].y + nodes[j].y) / 2;

        strokeWeight(3);
        fill(255);
        rect(mx - rw / 2, my - rw / 2, rw, rw);

        textSize(tSBox);
        fill(0);
        strokeWeight(2);
        textAlign(CENTER, CENTER);
        text(arr[i][j], mx, my);
      }
    }
  }


  for (let i = 0; i < nodes.length; i++) {
    nodes[i].display();
  }

  let cost_apm = 0;
  for (let i = 0; i < edgeList.length; i++) {
    cost_apm += edgeList[i].val;
    let e = edgeList[i];
    stroke(0);
    strokeWeight(2);
    line(copied[e.first].x, copied[e.first].y, copied[e.second].x, nodes[e.second].y);
    let mx = (copied[e.first].x + copied[e.second].x) / 2;
    let my = (copied[e.first].y + copied[e.second].y) / 2;

    strokeWeight(3);
    fill(255);
    rect(mx - rw / 2, my - rw / 2, rw, rw);

    textSize(tSBox);
    fill(0);
    textAlign(CENTER, CENTER);
    strokeWeight(2);
    text(arr[e.first][e.second], mx, my);

    copied[e.first].display();
    copied[e.second].display();
  }

  fill(0);
  stroke(0);
  strokeWeight(0.1);
  textSize(30);
  textAlign(LEFT, TOP);
  text("Cost apm: " + cost_apm, width / 2 + 30, 30);
}

function reinit() {
  comp = [];
  frecv = [];
  viz = [];
  for (let i = 0; i < count; i++) {
    viz[i] = frecv[i] = 0;
    comp[i] = i;
  }
}

function dfs(x) {
  let ans = 1;
  viz[x] = 1;
  for (let i = 0; i < count; i++) {
    if (x != i && nodes[i].deleted == false && viz[i] == 0 && arr[x][i]) {
      ans += dfs(i);
    }
  }
  return ans;
}

function det_apm() {
  reinit();
  edgeList = [];
  let sorted = [];
  let nod;
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < i; j++) {
      if (nodes[i].deleted == false && nodes[j].deleted == false && arr[i][j]) {
        sorted.push(new Edge(arr[i][j], i, j));
        frecv[i] = frecv[j] = 1;
        nod = i;
      }
    }
  } //TOATE MUCHIILE ADAUGATE

  let m = sorted.length;
  for (let i = 0; i < m - 1; i++) {
    for (let j = 0; j < m - i - 1; j++) {
      if (sorted[j].val > sorted[j + 1].val) {
        let aux = sorted[j];
        sorted[j] = sorted[j + 1];
        sorted[j + 1] = aux;
      }
    }
  } //SUNT SORTATE

  let total = 0;
  for (let i = 0; i < count; i++) {
    total += (!nodes[i].deleted);
  }

  let howmany = dfs(nod);
  if (howmany < total) {
    window.alert("Graf neconex.");
    return;
  }


  while (edgeList.length < total - 1) {
    let e = sorted.shift();
    if (comp[e.first] != comp[e.second]) {
      //good
      edgeList.push(e);
      let what = comp[e.second];
      for (let i = 0; i < count; i++) {
        if (comp[i] == what) {
          comp[i] = comp[e.first];
        }
      }
    }
  }
}

function rp() {
  canDeleteNode = false;
  canCreateNewNode = false;
}

function deleteEdge() {
  rp();

  let firstNode = floor(Number(window.prompt("Indexul primului nod:")));
  if (isNaN(firstNode) || firstNode < 0 || firstNode >= count || nodes[firstNode].deleted === true) {
    window.alert("Date incorecte.");
    return;
  }

  let secondNode = floor(Number(window.prompt("Indexul celui de-al doilea nod:")));
  if (isNaN(secondNode) || secondNode < 0 || secondNode >= count || nodes[secondNode].deleted === true) {
    window.alert("Date incorecte");
    return;
  }

  if (firstNode === secondNode) {
    window.alert("Capetele muchiei coincid.");
    return;
  } else if (arr[firstNode][secondNode] === 0) {
    window.alert("Nu există nicio muchie între nodul " + firstNode + " și nodul " + secondNode +'.');
    return;
  }

  arr[firstNode][secondNode] = 0;
  arr[secondNode][firstNode] = 0;
  det_apm();
}

function makeEdge() {
  rp();

  let firstNode = floor(Number(window.prompt("Indexul primului nod:")));
  if (isNaN(firstNode) || firstNode < 0 || firstNode >= count || nodes[firstNode].deleted) {
    window.alert("Date incorecte.");
    return;
  }

  let secondNode = floor(Number(window.prompt("Indexul celui de-al doilea nod:")));
  if (isNaN(secondNode) || secondNode < 0 || secondNode >= count || nodes[secondNode].deleted) {
    window.alert("Date incorecte.");
    return;
  }

  if (firstNode === secondNode) {
    window.alert("Capetele muchiei coincid.");
    return;
  } else if (arr[firstNode][secondNode] !== 0) {
    window.alert("Există deja o muchie între nodul " + firstNode + " și nodul " + secondNode +'.');
    return;
  }

  let val = Number(window.prompt("Valoarea muchiei:"));
  if (isNaN(val)) {
    window.alert("Date incorecte.");
    return;
  }
  arr[firstNode][secondNode] = val;
  arr[secondNode][firstNode] = val;
  det_apm();
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
  if (rw / 2 <= x && x <= width / 2 - rw / 2 && 0 <= y && y <= height) {
    return true;
  }
  return false;
}

function mouseClicked() {
  if (canCreateNewNode == true && isInsideCanvas(mouseX, mouseY)) {
    nodes.push(new Node(mouseX, mouseY, count));
    copied.push(new Node(mouseX + width / 2, mouseY, count++));
  }

  if (canDeleteNode == true && isInsideCanvas(mouseX, mouseY)) {
    for (let i = 0; i < count; i++) {
      if (!nodes[i].deleted) {
        if (dist(nodes[i].x, nodes[i].y, mouseX, mouseY) < nodes[i].r) {
          nodes[i].deleted = true;
          det_apm();
        }
      }
    }
  }
}
