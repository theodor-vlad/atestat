let values = [], animated = [], resetVal = [];
let rw = 2, n = 0, w, h, cnv;
let done = 0;

function setup() {
  w = parseInt($('#cnvWidth').css('width'), 10);
  h = 601;
  cnv = createCanvas(w, h);
  cnv.id('sketch-holder');

  let l = floor(width / rw)
  for (var i = 0; i <= l; i++) {
    values[i] = (i+1) * height / l - 1;
  }

  shuffle(values, true);
  let og = values.slice();
  quicksort(og, 0, og.length - 1);

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
  p1.html("Se alege ultimul element al vectorului (numit pivot). Se reorganizează vectorul, astfel încât elementele mai mici sau egale cu pivotul se află înaintea să, iar elementele mai mari decât acesta, după el (după acest pas, pivotul se află pe poziția sa corectă în vector). Problema revine, astfel, la sortarea celor doi sub-vectori formați în urma partiționării, pe care se aplică în mod recursiv algoritmul anterior descris. Quicksort este un algoritm eficient de sortare, în medie având complexitatea O(n*log(n)).");

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
    for (let i = 0; i < values.length; i++) {
      rect(i * rw, height - values[i] - 1, rw, values[i]);
    }

    for (let x = 0; x < 8; x++) {
      if (n < animated.length) {
        let i = animated[n++];
        let j = animated[n++];
        let tip = animated[n++];
        if (tip === "comp") {
          push();
          fill(0, 0, 255);
          rect(i * rw, height - values[i] - 1, rw, values[i]);
          rect(j * rw, height - values[j] - 1, rw, values[j]);
          pop();
        } else if (tip === "swap") {
          swap(values, i, j);
        }
      } else {
        background(20);
        fill(255);
        for (let i = 0; i < values.length; i++) {
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
  done = 0;
}

function quicksort(arr, l, r) {
  if (l < r) {
    let pos = partition(arr, l, r);
    quicksort(arr, l, pos - 1);
    quicksort(arr, pos + 1, r);
  }
}

function partition(arr, l, r) {
  pivot = arr[r];
  i = l - 1;
  for (j = l; j < r; j++)
  {
    animated.push(i + 1, j, "comp");
    if (arr[j] <= pivot)
    {
      i++;
      swap(arr, i, j);
      animated.push(i, j, "swap");
    }
  }
  swap(arr, i + 1, r);
  animated.push(i + 1, r, "swap");
  return (i + 1);
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
