let values = [];
let animated = [];
let rw = 2;
let idx = 0;
let x = 0, y;
let begun = false;

function setup() {
  createCanvas(1201, 800);
  for (let i = 0; i < floor(width / rw); i++) {
    values[i] = floor(random(height));
  }
  let og = values.slice();
  radixsort(og);
  let p = createP("Radix sort: O(wn)");
  p.html();
}

function draw() {
  background(51);
  for (let i = 0; i < values.length; i++) {
    rect(i * rw, height - values[i] - 1, rw, values[i]);
  }

  for (let n = 0; n < 5; n++) {
    if (idx < animated.length) {
      let pos = animated[idx++];
      let val = animated[idx++];
      values[pos] = val;
    } else {
      background(51);
      for (let i = 0; i < values.length; i++) {
        rect(i * rw, height - values[i] - 1, rw, values[i]);
      }
      for (let i = 1; i < values.length; i++) {
        if (values[i] < values[i - 1]) {
          console.log("not good");
          break;
        }
      }
      noLoop();
    }
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function getMax(arr)
{
  let mx = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > mx) {
      mx = arr[i];
    }
  }
  return mx;
}

// A function to do counting sort of arr[] according to
// the digit represented by exp.
function countSort(arr, exp) {
  let output = []; // output array
  let count = [];
  let i;
  for (i = 0; i < 10; i++) {
    count[i] = 0;
  }


  // Store count of occurrences in count[]
  for (i = 0; i < arr.length; i++) {
    count[floor(arr[i] / exp) % 10]++;
  }

  // Change count[i] so that count[i] now contains actual
  //  position of this digit in output[]
  for (i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array
  for (i = arr.length - 1; i >= 0; i--) {
    output[count[floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[floor(arr[i] / exp) % 10]--;
  }

  // Copy the output array to arr[], so that arr[] now
  // contains sorted numbers according to current digit
  for (i = 0; i < arr.length; i++) {
    animated.push(i, output[i]);
    arr[i] = output[i];
  }
}

// The main function to that sorts arr[] of size n using
// Radix Sort
function radixsort(arr) {
  // Find the maximum number to know number of digits
  let m = getMax(arr);

  // Do counting sort for every digit. Note that instead
  // of passing digit number, exp is passed. exp is 10^i
  // where i is current digit number
  for (let exp = 1; floor(m / exp) > 0; exp *= 10) {
    countSort(arr, exp);
  }
}
