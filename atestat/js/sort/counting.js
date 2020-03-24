var values = [], animated = [], resetVal = [], viz = [];
var rw = 2, n = 0, w, h, cnv;
let done = 0, maxim = -1;

function setup() {
  w = parseInt($('#cnvWidth').css('width'), 10);
  h = 601;
  cnv = createCanvas(w, h);
  cnv.id('sketch-holder');

  let l = floor(width / rw);
  for (var i = 0; i <= l; i++) {
    values[i] = floor(i * height / l);
    if (values[i] > maxim) {
      maxim = values[i];
    }
  }
  for (let i = 0; i <= maxim; i++) {
    viz[i] = 0;
  }

  shuffle(values, true);
  let og = values.slice();
  countingSort(og);

  let pd = createDiv();
  pd.id('spanDiv');

  resetVal = values.slice();
  let resetBtn = createButton("Resetare");
  resetBtn.mouseClicked(resetEvent);
  resetBtn.parent('spanDiv');

  let playPauseBtn = createButton("Play/Pause");
  playPauseBtn.mouseClicked(playPause);
  playPauseBtn.parent('spanDiv');

  let p = createDiv();
  p.id('postDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');

  p = createDiv();
  p.parent('postDiv');
  p.id('titleDiv');
  p.html("Algoritm");

  let p1 = createP();
  p1.parent('postDiv');
  p1.html("Acest algoritm este folositor în cazul în care elementele vectorului sunt numere naturale de dimensiune redusă (se poate declara un vector cu dimensiunea reprezentând valoarea maximă regăsită în elementele vectorului), sau au valori care pot fi asociate unor numere naturale. Astfel, printr-o parcurgere a vectorului, se numără într-un vector de frecvență de câte ori apare fiecare număr. La final, se iterează prin vectorul de frecvență și se înlocuiesc valorile vectorului inițial. Complexitatea algoritmului de sortare prin numărarea aparițiilor este liniară.");

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');
}

function draw() {
  cnv.style("width", $('#cnvWidth').css('width'));
  $('#sketch-holder').height(windowHeight * h / 975);

  if (!done) {
    background(20);
    fill(255);
    for (var i = 0; i < values.length; i++) {
      rect(i * rw, height - values[i] - 1, rw, values[i]);
    }

    for (let x = 0; x < 3; x++) {
      if (n < animated.length) {
        let pos = animated[n++];
        let val = animated[n++];
        let tip = animated[n++];
        if (tip === "comp") {
          push();
          fill(0, 0, 255);
          rect(pos * rw, height - values[pos] - 1, rw, values[pos]);
          rect(val * rw, height - values[val] - 1, rw, values[val]);
          pop();
        } else if (tip === "swap") {
          values[pos] = val;
        }
      } else {
        background(20);
        fill(255);
        for (var i = 0; i < values.length; i++) {
          rect(i * rw, height - values[i] - 1, rw, values[i]);
        }
        done = 1;
      }
    }
  }
}

function playPause() {
  done = 1 - done;
}

function resetEvent() {
  values = resetVal.slice();
  n = 0;
  done = false;
}

function countingSort(arr) {
  console.log("i was here");
  for (let i = 0; i < arr.length; i++) {
    animated.push(i, i, "comp");
    viz[arr[i]]++;
  }

  let count = 0;
  for (let i = 0; i <= maxim; i++) {
    for (let j = 0; j < viz[i]; j++) {
      arr[count] = i;
      animated.push(count, i, "swap");
      animated.push(count, count, "comp");
      count++;
    }
  }
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
