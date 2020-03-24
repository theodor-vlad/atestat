let numbers = [];
let stk = [];
let rw = 2;
let k;

function setup() {
  createCanvas(1201, 800);
  for (let i = 0; i < floor(width / rw); i++) {
    numbers[i] = random(height);
  }

  stk.push(0);
  stk.push(numbers.length - 1);

  k = floor(random(numbers.length));

  let p = createP("Quick select: O(n)");
  p.html();
}

function draw() {
  background(51);
  for (let i = 0; i < numbers.length; i++) {
    rect(i * rw, height - numbers[i] - 1, rw, numbers[i]);
  }

  if (stk.length > 1) {
    let r = stk.pop();
    let l = stk.pop();

    let index = partition(numbers, l, r);
    if (index == k - 1) {
      if (k % 100 >= 11 && k % 100 <= 13) {
        console.log(k + "th number is " + numbers[k - 1]);
      } else {
        if (k % 10 == 1) {
          console.log(k + "st number is " + numbers[k - 1]);
        } else if (k % 10 == 2) {
          console.log(k + "nd number is " + numbers[k - 1]);
        } else if (k % 10 == 3) {
          console.log(k + "rd number is " + numbers[k - 1]);
        } else {
          console.log(k + "th number is " + numbers[k - 1]);
        }  
      }
      background(51);
      for (let i = 0; i < numbers.length; i++) {
        if (i == index) {
          fill(255, 0, 0);
          rect(i * rw, height - numbers[i] - 1, rw, numbers[i]);
        } else {
          fill(255);
          rect(i * rw, height - numbers[i] - 1, rw, numbers[i]);
        }
      }
      noLoop();
    } else if (index < k - 1) {
      stk.push(index + 1);
      stk.push(r);
    } else if (index > k - 1) {
      stk.push(l);
      stk.push(index - 1);
    }
  }


}

function partition(arr, l, r) {
  let idx = floor(random(l, r));
  swap(arr, r, idx);
  let pivot = arr[r];
  let i = l - 1;
  for (let j = l; j < r; j++) {
    if (arr[j] <= pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, r);
  return (i + 1);
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
