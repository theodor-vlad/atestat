class Edge {
  constructor(val, i, j) {
    this.val = val;
    this.first = i;
    this.second = j;
  }

  getVal() {
    return this.val;
  }

  getFirst() {
    return this.first;
  }

  getSecond() {
    return this.second;
  }
}
