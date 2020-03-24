class Node {
  constructor(x, y, idx) {
    this.x = x;
    this.y = y;
    this.idx = idx;
    this.r = r;
    this.deleted = false;
  }

  display() {
    if (!this.deleted) {
      fill(255);
      stroke(0);
      strokeWeight(4);
      ellipse(this.x, this.y, this.r, this.r);
      textAlign(CENTER, CENTER);
      textSize(tS);
      fill(0);
      strokeWeight(2);
      text(this.idx, this.x, this.y);
    }
  }
}
