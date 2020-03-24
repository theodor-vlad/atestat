let count = 0, a;
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
  let val = Number(window.prompt("Ce valoare să aibă nodul rădăcină?"));
  if (isNaN(val)) {
    window.alert("Date incorecte.");
  } else {
    a = new ABCNode(width / 2, 100, val, 0, null);
  }

  let p = createDiv();
  p.id('spanDiv');

  var newNode = createButton("Nod nou");
  newNode.mouseClicked(createEvent);
  newNode.parent('spanDiv');

  var findBtn = createButton("Căutare");
  findBtn.mouseClicked(findEvent);
  findBtn.parent('spanDiv');

  var delNode = createButton("Ștergere nod");
  delNode.mouseClicked(deleteEvent);
  delNode.parent('spanDiv');

  var inord = createButton("Inordine");
  inord.mouseClicked(inordEvent);
  inord.parent('spanDiv');

  var preord = createButton("Preordine");
  preord.mouseClicked(preordEvent);
  preord.parent('spanDiv');

  var postord = createButton("Postordine");
  postord.mouseClicked(postordEvent);
  postord.parent('spanDiv');

  var peniv = createButton("Pe nivele");
  peniv.mouseClicked(penivEvent);
  peniv.parent('spanDiv');

  p = createDiv();
  p.id('postDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p2 = createP();
  p2.parent('postDiv');
  p2.style('text-align', 'left');

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("Inserare");

  let p1 = createP();
  p1.parent('postDiv');
  p1.html("Se compară valoarea noului nod cu rădăcina arborelui binar de căutare. Dacă este mai mică, valoarea va fi propagată în subarborele stâng, iar dacă este mai mare, în subarborele drept. Dacă subarborele în care este propagată valoarea este nul, se va insera un nou nod cu valoarea dorită, altfel se aplică în mod recursiv procedeul anterior descris.");

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("Căutare");

  p1 = createP();
  p1.parent('postDiv');
  p1.html("Se compară valoarea noului căutat cu rădăcina arborelui binar de căutare. Dacă este egală, căutarea se încheie cu succes. Dacă nodul căutat are valoare mai mică decât rădăcina, atunci se caută (în același mod) în subarborele stâng; dacă este mai mare, se caută în subarborele drept.");

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("Ștergere");

  p1 = createP();
  p1.parent('postDiv');
  p1.html("Se caută în arbore nodul cu valoarea dorită (dacă există), notat p. Dacă p nu are fii, se înlocuiește referința spre p cu valoarea nulă. Dacă p are un singur fiu, se înlocuiește referința spre p cu unicul fiu al acestuia. Dacă p are ambii fii, se determină nodul cu valoare minimă din subarborele drept al lui p. Se înlocuiește valoarea lui p cu valoarea minimă găsită, ștergându-se nodul cu valoare minimă. Arborele astfel obținut este arbore binar de căutare (valoarea minimă din subarborele drept este mai mare decât toate valorile subarborelui stâng).");

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

function findEvent() {
  if (a == null) {
    window.alert("Arborele este gol.")
    return;
  }

  let val = Number(window.prompt("Ce valoare are nodul căutat?"));
  if (isNaN(val)) {
    window.alert("Date incorecte.");
    return;
  }

  if (a.findNode(val)) {
    window.alert("Nodul cu valoarea " + val + " există în arbore.");
  } else {
    window.alert("Nodul cu valoarea " + val + " nu există în arbore.");
  }
}

function inordEvent() {
  if (!a) {
    window.alert("Arborele este gol.");
    return;
  }
  let vec = [];
  a.inordine(vec);
  p2.html("Parcurgere inordine(stânga->rădăcină->dreapta): " + vec);
}

function preordEvent() {
  if (!a) {
    window.alert("Arborele este gol.");
    return;
  }
  let vec = [];
  a.preordine(vec);
  p2.html("Parcurgere preordine(rădăcină->stânga->dreapta): " + vec);
}

function postordEvent() {
  if (!a) {
    window.alert("Arborele este gol.");
    return;
  }
  let vec = [];
  a.postordine(vec);
  p2.html("Parcurgere postordine(stânga->dreapta->rădăcină): " + vec);
}

function deleteEvent() {
  if (!a) {
    window.alert("Arborele este gol.");
    return;
  }

  let val = Number(window.prompt("Nodul cu ce valoare să fie șters?"));
  if (isNaN(val)) {
    window.alert("Date incorecte.");
    return;
  }

  let p = a.findNode(val);
  if (p == null) {
    window.alert("Nodul cu valoarea " + val + " nu există în arbore.");
  } else {
    window.alert("Nodul cu valoarea " + val + " există în arbore.");
    let t = p.parent;
    if (p.left && p.right) {
      let pmin = p.right;
      while (pmin.left) {
        pmin = pmin.left;
      }
      p.val = pmin.val;
      p = pmin; t = pmin.parent;
    }

    let f;
    if (p.left) {
      f = p.left;
    } else {
      f = p.right;
    }

    if (!t) {
      a = f;
    } else if (t.left == p) {
      t.left = f;
    } else {
      t.right = f;
    }
    delete p;
    a.x = width / 2;
    a.y = 100;
    a.level = 0;
    a.parent = null;
    a.calibrate();
  }
}

function createEvent() {
  let val;
  if (a == null) {
    val = Number(window.prompt("Ce valoare să aibă nodul rădăcină?"));
  } else {
    val = Number(window.prompt("Ce valoare să aibă noul nod?"));
  }

  if (isNaN(val)) {
    window.alert("Date incorecte.");
    return;
  }

  if (a == null) {
    a = new ABCNode(width / 2, 100, val, 0, null);
  } else {
    a.insertNode(val);
  }
}

function penivEvent() {
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
