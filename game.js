arr = [];

maxdist = 30;

function dist(x1, x2, y1, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

class point {
  susedi = [];
  move = false;
  constructor(x, y, susedi) {
    this.x = x;
    this.y = y;
    this.susedi = susedi;
  }
  draw() {
    if (this.move == true) {
      context.fillStyle = "red";
    } else {
      context.fillStyle = "blue";
    }
    context.fillRect(this.x - 5, this.y - 5, 10, 10);
    this.susedi.forEach((sused) => {
      drawLine(this.x, this.y, arr[sused].x, arr[sused].y);
    });
  }
  get(sused) {
    if (dist(this.x, sused.x, this.y, sused.y) > maxdist + 1) {
      let a = Math.atan2(this.y - sused.y, this.x - sused.x, 2);
      do {
        sused.x += Math.cos(a);
        sused.y += Math.sin(a);
      } while (dist(this.x, sused.x, this.y, sused.y) > maxdist);
    } else if (dist(this.x, sused.x, this.y, sused.y) < maxdist - 1) {
      let a = Math.atan2(this.y - sused.y, this.x - sused.x, 2);
      do {
        sused.x -= Math.cos(a);
        sused.y -= Math.sin(a);
      } while (dist(this.x, sused.x, this.y, sused.y) < maxdist);
    }
  }
  getsusedi() {
    // console.log(this.susedi)
    this.susedi.map((sused) => {
      if (!arr[sused].move) {
        this.get(arr[sused]);
        arr[sused].move = true;
        arr[sused].getsusedi();
      }
    });
  }
}

// arr.push(new point(100,100,[1]))
// arr.push(new point(150,150,[0,2]))
// arr.push(new point(200,200,[1,3]))
// arr.push(new point(300,300,[2,4]))
// arr.push(new point(400,400,[3]))

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    arr.push(new point(50 * j, 50 * i, [j + 1 + 11 * i]));
  }
  arr.push(new point(50 * 11, 50 * i, []));
}

// arr.push(new point(100,100,[1,3]))    //0           0 1 2
// arr.push(new point(150,100,[0,4,2]))  //1           3 4 5
// arr.push(new point(200,100,[1,5]))    //2           6 7 8

// arr.push(new point(100,150,[0,4,6]))  //3
// arr.push(new point(150,150,[1,3,5,7]))  //4
// arr.push(new point(200,150,[2,4,8]))  //5

// arr.push(new point(100,200,[3,7]))  //6
// arr.push(new point(150,200,[6,4,8]))  //7
// arr.push(new point(200,200,[7,5]))  //8

function draw() {
  arr.forEach((p) => {
    p.draw();
  });
}

arr[0].getsusedi();

function update() {
  // arr.forEach(p => {
  //     p.getsusedi()
  // });
  arr.forEach((p) => {
    p.move = false;
  });
  if (isKeyPressed[32]) {
    arr.forEach((p) => {
      if (dist(mouseX, p.x, mouseY, p.y) < 20) {
        p.x = mouseX;
        p.y = mouseY;
        p.getsusedi();
      }
    });
  }
}
