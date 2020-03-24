let container = [], h;
let cnv, w, he = 800;

function setup() {
  w = parseInt($('#cnvWidth').css('width'), 10);
  cnv = createCanvas(w, he);
  cnv.id('sketch-holder');

  h = new Heap();
  let val = Number(window.prompt("Ce valoare doriți să introduceți în heap?"));
  if (isNaN(val)) {
    window.alert("Date incorecte.");
  } else {
    h.hpush(val);
    container.push(new HeapNode(width / 2, 100, 0));
  }

  let p = createDiv();
  p.id('spanDiv');

  let pushBtn = createButton("Push");
  pushBtn.mouseClicked(pushEvent);
  pushBtn.parent('spanDiv');

  let popBtn = createButton("Pop");
  popBtn.mouseClicked(popEvent);
  popBtn.parent('spanDiv');

  let topBtn = createButton("Top");
  topBtn.mouseClicked(topEvent);
  topBtn.parent('spanDiv');

  p = createDiv();
  p.id('postDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("Inserare (push)");

  let p1 = createP();
  p1.parent('postDiv');
  p1.html("Se adaugă un nou nod pe ultima poziție. Deoarece nu este neapărat respectată condiția de max-heap, nodul proaspăt introdus este comparat cu nodul părinte, interschimbând valorile dacă este mai mare decât părintele sau. Procedeul se repetă până când valoarea nou-introdusă este mai mic sau egală cu cea a părintelui ei, sau s-a ajuns în rădăcina max-heapului.");

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("Eliminarea valorii maxime (pop)");

  p1 = createP();
  p1.parent('postDiv');
  p1.html("Se interschimbă valorile primului și ultimului nod, eliminându-se ultimul nod. Condiția de max-heap nu este respectată, deci se va propaga valoarea aflată în rădăcină în rândurile fiilor. Pentru aceasta, se compară valoarea rădăcinii cu valorile fiilor (dacă există), interschimbându-se cu maximul dintre cele două valori. Acest procedeu se repetă până când valoarea nodului este mai mare sau egală cu maximul valorilor celor doi fii (dacă aceștia există).");

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("Afișarea valorii maxime (top)");

  p1 = createP();
  p1.parent('postDiv');
  p1.html("Se returnează valoarea nodului aflat pe prima poziție în max-heap.");

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');
}


function draw() {
  cnv.style("width", $('#cnvWidth').css('width'));
  $('#sketch-holder').height(windowHeight * he / 975);
  background(230);

  if (container.length > 0) {
    stroke(0);
    strokeWeight(2);
    for (let i = 0; i < container.length; i++) {
      let leftChild  = 2 * i + 1;
      let rightChild = 2 * i + 2;
      if (leftChild < container.length) {
        line(container[i].x, container[i].y, container[leftChild].x, container[leftChild].y);
      }
      if (rightChild < container.length) {
        line(container[i].x, container[i].y, container[rightChild].x, container[rightChild].y);
      }
    }

    for (let i = 0; i < container.length; i++) {
      container[i].display();
      textAlign(CENTER, CENTER);
      textSize(25);
      fill(0);
      strokeWeight(2);
      text(h.at(i), container[i].x, container[i].y);
    }
  }
}

function topEvent() {
  if (container.length > 0) {
    window.alert("Elementul cu valoarea maximă este " + h.htop() +'.');
  } else {
    window.alert("Heap gol.");
  }
}

function popEvent() {
  if (container.length > 0) {
    h.hpop();
    container.pop();
  } else {
    window.alert("Heap gol.");
  }
}

function pushEvent() {
  let parentIdx = floor((container.length - 1) / 2);
  let val = Number(window.prompt("Ce valoare doriți să introduceți în heap?"));
  if (isNaN(val)) {
    window.alert("Date incorecte.");
    return;
  }
  h.hpush(val);
  if (container.length == 0) {
    container.push(new HeapNode(width / 2, 100, 0));
  } else {
    if (container.length % 2 == 1) { //left
      container.push(new HeapNode(container[parentIdx].x - width / Math.pow(2, container[parentIdx].level + 2), container[parentIdx].y + 130, container[parentIdx].level + 1));
    } else { //right
      container.push(new HeapNode(container[parentIdx].x + width / Math.pow(2, container[parentIdx].level + 2), container[parentIdx].y + 130, container[parentIdx].level + 1));
    }
  }
}
