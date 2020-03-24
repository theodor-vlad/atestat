class ABCNode {
  constructor(x, y, val, level, parent) {
    this.x = x;
    this.y = y;
    this.r = 50;
    this.val = val;
    this.left = null;
    this.right = null;
    this.level = level;
    this.parent = parent;
  }

  penivele() {
    levelMatrix[this.level][++levelMatrix[this.level][0]] = this.val;
    if (this.left) {
      this.left.penivele();
    }
    if (this.right) {
      this.right.penivele();
    }
  }

  inordine(vec) {
    if (this.left) {
      this.left.inordine(vec);
    }
    vec.push(this.val);
    if (this.right) {
      this.right.inordine(vec);
    }
  }

  preordine(vec) {
    vec.push(this.val);
    if (this.left) {
      this.left.preordine(vec);
    }
    if (this.right) {
      this.right.preordine(vec);
    }
  }

  postordine(vec) {
    if (this.left) {
      this.left.postordine(vec);
    }
    if (this.right) {
      this.right.postordine(vec);
    }
    vec.push(this.val);
  }

  calibrate() {
    if (this.left != null) {
      this.left.x = this.x - width / Math.pow(2, this.level + 2);
      this.left.y = this.y + nodeDistance;
      this.left.level = this.level + 1;
      this.left.parent = this;
      this.left.calibrate();
    }
    if (this.right != null) {
      this.right.x = this.x + width / Math.pow(2, this.level + 2);
      this.right.y = this.y + nodeDistance;
      this.right.level = this.level + 1;
      this.right.parent = this;
      this.right.calibrate();
    }
  }

  findNode(v) {
    if (this.val == v) {
      return this;
    }
    if (v < this.val) {
      if (this.left != null) {
        return this.left.findNode(v);
      } else {
        return null;
      }
    } else if (v > this.val) {
      if (this.right != null) {
        return this.right.findNode(v);
      } else {
        return null;
      }
    }
  }

  insertNode(v) {
    if (v < this.val) {
      //il pun pe stanga

      //daca exista stanga deja
      if (this.left != null) {
        //il inserez in subarborele stang
        this.left.insertNode(v);
      } else if (this.left == null) {
        //altfel, fac alt nod
        if (this.y + nodeDistance + this.r > height) {
          window.alert("Noul nod nu încape în planșă.");
          return;
        }
        this.left = new ABCNode(this.x - width / Math.pow(2, this.level + 2), this.y + nodeDistance, v, this.level + 1, this);
      }
    }

    if (v > this.val) {
      //il pun pe dreapta

      //daca exista deja dreapta
      if (this.right != null) {
        //il inserez in subarborele drept
        this.right.insertNode(v);
      } else if (this.right == null) {
        //altfel, fac alt nod
        if (this.y + nodeDistance + this.r > height) {
          window.alert("Noul nod nu încape în planșă.");
          return;
        }
        this.right = new ABCNode(this.x + width / Math.pow(2, this.level + 2), this.y + nodeDistance, v, this.level + 1, this);
      }
    }
  }

  display() {
    stroke(0);
    if (this.left != null) {
      line(this.x, this.y, this.left.x, this.left.y);
    }
    if (this.right != null) {
      line(this.x, this.y, this.right.x, this.right.y);
    }

    fill(255);
    stroke(0);
    strokeWeight(4);
    ellipse(this.x, this.y, this.r, this.r);
    textAlign(CENTER, CENTER);
    textSize(25);
    fill(0);
    strokeWeight(2);
    text(this.val, this.x, this.y);

    if (this.left != null) {
      this.left.display();
    }
    if (this.right != null) {
      this.right.display();
    }
  }
}
