class Heap {
  constructor() {
    this.arr = [];
  }

  at(pos) {
    if (pos < this.arr.length) {
      return this.arr[pos];
    }
  }

  hpush(val) {
    this.arr.push(val);
    let newNode = this.arr.length - 1;
    let parentNode = floor((newNode - 1) / 2);
    while (newNode > 0 && this.arr[newNode] > this.arr[parentNode]) {
      //SWAP VALUE
      let aux = this.arr[newNode];
      this.arr[newNode] = this.arr[parentNode];
      this.arr[parentNode] = aux;

      //SWAP POS
      newNode = parentNode;
      parentNode = floor((parentNode - 1) / 2);
    }
    return this.arr.length;
  }

  hpop() {
    if (this.arr.length == 0) {
      return;
    }
    if (this.arr.length == 1) {
      return this.arr.pop();
    }
    let res = this.arr[0];
    this.arr[0] = this.arr.pop();
    let currNode = 0;
    while (currNode * 2 + 1 < this.arr.length) {
      //CHILDREN
      let leftChild = currNode * 2 + 1;
      let rightChild = leftChild + 1;
      let largerChild = leftChild;
      if (rightChild < this.arr.length) {
        if (this.arr[rightChild] > this.arr[leftChild]) {
          largerChild = rightChild;
        }
      }

      //SWAPPING
      if (this.arr[currNode] < this.arr[largerChild]) {
        let aux = this.arr[currNode];
        this.arr[currNode] = this.arr[largerChild];
        this.arr[largerChild] = aux;
        currNode = largerChild;
      } else {
        break;
      }
    }
    return res;
  }

  htop() {
    if (this.arr.length == 0) {
      return;
    }
    return this.arr[0];
  }
}
