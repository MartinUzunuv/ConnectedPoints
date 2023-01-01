arr = [];

maxdist = 30;

distForAll = 15

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
      let a = Math.atan2(this.y - sused.y, this.x - sused.x);
      do {
        sused.x -= Math.cos(a);
        sused.y -= Math.sin(a);
      } while (dist(this.x, sused.x, this.y, sused.y) < maxdist);
    }
  }
  // defaultGet(sused) {
  //   if (dist(this.x, sused.x, this.y, sused.y) > maxdist + 1) {
  //       let a = Math.atan2(this.y - sused.y, this.x - sused.x, 2);
  //       sused.x += Math.cos(a);
  //       sused.y += Math.sin(a);
  //     } else if (dist(this.x, sused.x, this.y, sused.y) < maxdist - 1) {
  //       let a = Math.atan2(this.y - sused.y, this.x - sused.x);
  //       sused.x -= Math.cos(a);
  //       sused.y -= Math.sin(a);
  //     }
  // }
  update(){
    arr.forEach(p => {
      if(dist(this.x, p.x, this.y, p.y) < distForAll){
        let a = Math.atan2(this.y - p.y, this.x - p.x)
        this.x += Math.cos(a);
        this.y += Math.sin(a);
      }
    })
    // this.susedi.forEach(p => {
    //   this.defaultGet(arr[p]);
    // });
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


let linelen = 20
for(let j =0; j < linelen; j++){
for(let i = 0; i < 20; i++){
  if(i == 0){
    arr.push(new point(20 + i * 30, 20 + j* 30,[1 + (linelen) *j]))
  }else if(i == linelen - 1){
    arr.push(new point(20 + i * 30, 20 + j* 30,[linelen - 2 + (linelen) *j]))
  }else{
    arr.push(new point(20 + i * 30, 20 + j* 30,[i+1 + (linelen) *j, i -1 + (linelen) *j]))
  }
}
// if(j != linelen - 1){
//   arr[arr.length - 1].susedi.push(linelen*(j+1))
// }
}

// arr.push(new point(100,100,[1,2]))
// arr.push(new point(100,100,[0,2]))
// arr.push(new point(100,100,[1,0]))

// for (let i = 0; i < 10; i++) {
//   for (let j = 0; j < 10; j++) {
//     arr.push(new point(50 * j, 50 * i, [j + 1 + 11 * i]));
//   }
//   arr.push(new point(50 * 11, 50 * i, []));
// }

// arr.push(new point(100,100,[1,3]))    //0           0 1 2
// arr.push(new point(150,100,[0,4,2]))  //1           3 4 5
// arr.push(new point(200,100,[1,5]))    //2           6 7 8

// arr.push(new point(100,150,[0,4,6]))  //3
// arr.push(new point(150,150,[1,3,5,7]))  //4
// arr.push(new point(200,150,[2,4,8]))  //5

// arr.push(new point(100,200,[3,7]))  //6
// arr.push(new point(150,200,[6,4,8]))  //7
// arr.push(new point(200,200,[7,5]))  //8

// arr.push(new point(300, 300, [1]))
// arr.push(new point(300, 350, [0,2,5,6]))
// arr.push(new point(300, 400, [1,3,4]))
// arr.push(new point(350, 400, [2]))
// arr.push(new point(250, 400, [2]))
// arr.push(new point(350, 350, [1]))
// arr.push(new point(250, 350, [1]))

function draw() {
  arr.forEach((p) => {
    p.draw();
  });
}

arr[0].getsusedi();

function update() {
  arr.forEach(p => {
      p.update()
      p.x--
  });
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
