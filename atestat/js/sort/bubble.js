var values = [], animated = [], resetVal = [];
var rw = 5, n = 0, w, h, cnv;
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
  bubbleSort(og);

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
  p1.html("Printr-o parcurgere a vectorului, se compară fiecare pereche de elemente adiacente și se interschimbă (după caz). Se repetă procedeul până când vectorul devine sortat, conducând astfel la o complexitate de ordinul O(n^2), unde n reprezintă numărul elementelor vectorului.");

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

    for (let x = 0; x < 10; x++) {
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

function bubbleSort(arr) {
  let gata = false;
  let lc = 0;
  while (gata === false) {
    gata = true;
    for (let i = 0; i < arr.length - 1 - lc; i++) {
      animated.push(i, i + 1, "comp");
      if (arr[i] > arr[i + 1]) {
        gata = false;
        animated.push(i, i + 1, "swap");
        swap(arr, i, i + 1);
      }
    }

    if (gata === true) {
      break;
    }
    lc++;
  }
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
