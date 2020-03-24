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
  heapsort(og);

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
  p1.html("Se organizează vectorul ca un max-heap; deoarece elementul maxim se află pe prima poziție, se extrage din heap și se interschimbă cu elementul de pe poziția n. Se reorganizează heap-ul, repetând procedeul anterior descris până când nu mai există elemente în heap. Crearea heap-ului este liniară, iar fiecare operație de extragere se realizează în O(log(n)), conducând astfel la o complexitate de ordinul O(n*log(n)) în cazul cel mai defavorabil.");

  p = createDiv();
  p.parent('postDiv');
  p.id('brDiv');
}

function draw() {
  cnv.style("width", $('#cnvWidth').css('width'));
  $('#sketch-holder').height(windowHeight * h / 975);

  if (!done) {
    background(20);
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

function heapsort(arr) {
  for (let i = floor(arr.length / 2) - 1; i >= 0; i--) {
    siftDown(arr, i);
  }

  while (arr.length > 1) {
    animated.push(0, arr.length - 1, "comp");
    animated.push(0, arr.length - 1, "swap");
    swap(arr, 0, arr.length - 1);
    arr.pop();
    siftDown(arr, 0);
  }
}

function siftDown(arr, parent) {
  let largest = parent;
  let leftChild = 2 * parent + 1;
  let rightChild = 2 * parent + 2;

  if (leftChild < arr.length) {
    animated.push(largest, leftChild, "comp");
    if (arr[leftChild] > arr[largest]) {
      largest = leftChild;
    }
  }

  if (rightChild < arr.length) {
    animated.push(largest, rightChild, "comp");
    if (arr[rightChild] > arr[largest]) {
      largest = rightChild;
    }
  }

  if (largest != parent) {
    animated.push(parent, largest, "swap");
    swap(arr, parent, largest);
    siftDown(arr, largest);
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
