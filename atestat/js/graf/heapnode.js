class HeapNode {
  constructor(x, y, level) {
    this.x = x;
    this.y = y;
    this.level = level;
    this.r = 50;
  }

  display() {
    stroke(0);
    strokeWeight(4);
    fill(255);
    ellipse(this.x, this.y, this.r, this.r);
  }
}
