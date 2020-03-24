let a;
let btn, inord, preord, postord;
let cnv, w, h = 800;
let p1, p2;
let levelMatrix;
let nodeDistance = 150;

function make2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}


function setup() {
  levelMatrix = make2DArray(100, 100);

  w = parseInt($('#cnvWidth').css('width'), 10);
  cnv = createCanvas(w, h);
  cnv.id('sketch-holder');
  let n = Number(window.prompt("Ce valoare să aibă nodul rădăcină?"));
  if (isNaN(n)) {
    window.alert("Date incorecte.");
  } else {
    a = new ANode(width / 2, 100, 0, n, null);
  }
  let p = createDiv();
  p.id('spanDiv');

  btn = createButton('Nod nou');
  btn.mouseClicked(btnEvent);
  btn.parent('spanDiv');

  inord = createButton('Inordine');
  inord.mouseClicked(event1);
  inord.parent('spanDiv');

  preord = createButton('Preordine');
  preord.mouseClicked(event2);
  preord.parent('spanDiv');

  postord = createButton('Postordine');
  postord.mouseClicked(event3);
  postord.parent('spanDiv');

  peniv = createButton('Pe nivele');
  peniv.mouseClicked(event4);
  peniv.parent('spanDiv');

  p = createDiv();
  p.id('postDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p2 = createP();
  p2.parent('postDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("Inserare");

  let p1 = createP();
  p1.parent('postDiv');
  p1.html("Pentru inserarea unui nou nod în arborele binar, se stabilește sub-arborele din care va face parte respectivul nod. Dacă sub-arborele ales este nul, se va crea un nou nod cu valoarea dorită, iar în caz contrar, este aplicat în mod recursiv algoritmul anterior descris. Dacă arborele inițial este nul, va fi inserat un nou nod cu valoarea dorită, reprezentând rădăcina arborelui.");

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("Parcurgeri");

  p1 = createP();
  p1.parent('postDiv');
  p1.html("Parcurgerea inordine: se parcurge mai întâi în inordine subarborele stâng, se vizitează rădăcina, apoi se parcurge în inordine subarborele drept.");

  p1 = createP();
  p1.parent('postDiv');
  p1.html("Parcurgerea preordine: se vizitează mai întâi rădăcina, se parcurge în preordine subarborele stâng, apoi se parcurge în preordine subarborele drept.");

  p1 = createP();
  p1.parent('postDiv');
  p1.html("Parcurgerea postordine: se parcurge mai întâi în postordine subarborele stâng, se parcurge în postordine subarborele drept, apoi se vizitează rădăcina.");

  p1 = createP();
  p1.parent('postDiv');
  p1.html("Parcurgerea pe niveluri: se vizitează mai întâi rădăcina, apoi fiii rădăcinii de la stânga spre dreapta, apoi fiii fiilor rădăcinii de la stânga spre dreapta, continuându-se procedeul până la epuizarea nodurilor arborelui binar (procedeul este asemănător parcurgerii BFS).");

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');
}

function draw() {
  cnv.style("width", $('#cnvWidth').css('width'));
  $('#sketch-holder').height(windowHeight * h / 975);
  background(230);
  if (a) a.display();
}

function btnEvent() {
  if (!a) {
    let n = Number(window.prompt("Ce valoare să aibă nodul rădăcină?"));
    if (isNaN(n)) {
      window.alert("Date incorecte.");
    } else {
      a = new ANode(width / 2, 100, 0, n, null);
    }
  } else {
    a.insertNode();
  }
}

function event1() {
  if (!a) {
    window.alert("Arborele este gol.");
    return;
  }
  let vec = [];
  a.inordine(vec);
  p2.html("Parcurgere inordine(stânga->rădăcină->dreapta): " + vec);
}

function event2() {
  if (!a) {
    window.alert("Arborele este gol.");
    return;
  }
  let vec = [];
  a.preordine(vec);
  p2.html("Parcurgere preordine(rădăcină->stânga->dreapta): " + vec);
}

function event3() {
  if (!a) {
    window.alert("Arborele este gol.");
    return;
  }
  let vec = [];
  a.postordine(vec);
  p2.html("Parcurgere postordine(stânga->dreapta->rădăcină): " + vec);
}

function event4() {
  if (!a) {
    window.alert("Arborele este gol.");
    return;
  }

  for (let i = 0; i < 100; i++) levelMatrix[i][0] = 0;
  a.penivele();

  let sir = "Parcurgere pe nivele: " + levelMatrix[0][1];
  for (let i = 1; levelMatrix[i][0]; i++) {
    for (let j = 1; j <= levelMatrix[i][0]; j++) {
      sir += ("," + levelMatrix[i][j]);
    }
  }
  p2.html(sir);
}
