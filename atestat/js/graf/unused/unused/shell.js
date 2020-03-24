let values = [];
let animated = [];
let rw = 2;
let idx = 0;

function setup() {
  createCanvas(1201, 800);
  for (let i = 0; i < floor(width / rw); i++) {
    values[i] = random(height);
  }
  let og = values.slice();
  shellsort(og);
  let p = createP("Shellsort: O(n^2)");
  p.html();
}

function draw() {
  background(51);
  for (let i = 0; i < values.length; i++) {
    rect(i * rw, height - values[i] - 1, rw, values[i]);
  }

  for (let n = 0; n < 5; n++) {
    if (idx < animated.length) {
      let t1 = animated[idx++];
      let t2 = animated[idx++];
      let op = animated[idx++];
      if (op == 0) {
        values[t1] = values[t2];
      } else if (op == 1) {
        values[t1] = t2;
      }
    } else {
      background(51);
      for (let i = 0; i < values.length; i++) {
        rect(i * rw, height - values[i] - 1, rw, values[i]);
      }
      noLoop();
    }
  }
}


function shellsort(arr) {
  for (let gap = floor(arr.length / 2); gap > 0; gap = floor(gap / 2)) {
    for (let i = gap; i < arr.length; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        animated.push(j, j - gap, 0);
        arr[j] = arr[j - gap];
      }

      animated.push(j, temp, 1);
      arr[j] = temp;
    }
  }
}
