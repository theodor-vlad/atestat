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
  insertionSort(og);

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
  p1.html("Se parcurge vectorul element cu element, căutându-se poziția corectă a elementului curent i în lista deja sortată; se inserează apoi valoarea elementului i în poziția determinată. Acest procedeu se repetă pentru fiecare din cele n elementele ale vectorului, conducând la o complexitate de ordinul O(n^2).");

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

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let val = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > val) {
      animated.push(j + 1, j, "comp");
      animated.push(j + 1, arr[j], "swap");
      arr[j + 1] = arr[j];
      j--;
    }
    animated.push(j + 1, val, "swap");
    arr[j + 1] = val;
  }
}
