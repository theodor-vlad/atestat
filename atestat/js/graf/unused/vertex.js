class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 32;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  display() {
    point(this.x, this.y);
    ellipse(this.x, this.y, this.r, this.r);
  }
}
