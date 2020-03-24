class ANode {
  constructor(x, y, level, val, parent) {
    this.val = val;
    this.x = x;
    this.y = y;
    this.r = 50;
    this.level = level;
    this.left = null;
    this.right = null;
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

  insertNode() {
    let choice = window.prompt("La stânga lui " + this.val + " sau la dreapta? (s/d)");
    console.log(this.x, this.y, this.r);
    if (choice == "s") {
      if (this.left != null) {
        this.left.insertNode();
      } else {
        let n = Number(window.prompt("Ce valoare să aibă noul nod?"));
        if (isNaN(n)) {
          window.alert("Date incorecte.");
        } else {
          if (this.y + nodeDistance + this.r > height) {
            window.alert("Noul nod nu încape în planșă.");
            return;
          }
          this.left = new ANode(this.x - width / Math.pow(2, this.level + 2), this.y + nodeDistance, this.level + 1, n, this);
        }
      }
    } else if (choice == "d") {
      if (this.right != null) {
        this.right.insertNode();
      } else {
        let n = Number(window.prompt("Ce valoare să aibă noul nod?"));
        if (isNaN(n)) {
          window.alert("Date incorecte.");
        } else {
          if (this.y + nodeDistance + this.r > height) {
            window.alert("Noul nod nu încape în planșă.");
            return;
          }
          this.right = new ANode(this.x + width / Math.pow(2, this.level + 2), this.y + nodeDistance, this.level + 1, n, this);
        }
      }
    } else {
      window.alert("Date incorecte.");
    }
  }

  display() {

    if (this.parent) {
      line(this.x, this.y, this.parent.x, this.parent.y);
      fill(255);
      stroke(0);
      strokeWeight(4);
      ellipse(this.parent.x, this.parent.y, this.parent.r, this.parent.r);
      textAlign(CENTER, CENTER);
      textSize(25);
      fill(0);
      strokeWeight(2);
      text(this.parent.val, this.parent.x, this.parent.y);

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
