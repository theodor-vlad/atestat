let values = [], animated = [], resetVal = [];
let rw = 2, n = 0, w, h, cnv;
let done = 0;

function setup() {
  w = parseInt($('#cnvWidth').css('width'), 10);
  h = 601;
  cnv = createCanvas(w, h);
  cnv.id('sketch-holder');
  let l = floor(width / rw);
  for (var i = 0; i <= l; i++) {
    values[i] = (i+1) * height / l - 1;
  }

  shuffle(values, true);
  let og = values.slice();
  mergesort(og, 0, og.length - 1);

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
  p1.html("Se împarte vectorul în doi sub-vectori de dimensiuni aproximativ egale (dimensiunile diferă doar în cazul în care n este impar). Se sortează în mod recursiv (utilizând Mergesort) sub-vectorii obținuți (până se ajunge la sub-vectori conțînând un singur element), la final interclasându-se subșirurile rezultate. Indiferent de ordinea inițială a elementelor, acest algoritm are complexitatea O(n*log(n)).");

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
  done = false;
}

function mergesort(arr, l, r) {
  if (l < r) {
    let m = floor((l + r) / 2);
    mergesort(arr, l, m);
    mergesort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}

function merge(arr, l, m, r) {
  let i = l;
  let j = m + 1;
  let newArr = [];
  while (i <= m && j <= r) {
    animated.push(i, j, "comp");
    if (arr[i] < arr[j]) {
      newArr.push(arr[i++]);
    } else {
      newArr.push(arr[j++]);
    }
  }
  while (i <= m) {
    newArr.push(arr[i++]);
  }
  while (j <= r) {
    newArr.push(arr[j++]);
  }
  j = 0;
  for (i = l; i <= r; i++) {
    arr[i] = newArr[j];
    animated.push(i, newArr[j++], "swap");
    animated.push(i, i, "comp");
  }
}
