
function squigTexture() {
  push()
  noFill()
  strokeWeight(0.5)
  const squigs = 60

  for (let i=0; i<squigs; i++) {
    const x = rnd(-W/2, W/2)
    const y = rnd(-H/2, H/2)

    const x1 = x + rnd(-25, 25)
    const x2 = x1 + rnd(-25, 25)
    const x3 = x2 + rnd(-25, 25)
    const y1 = y + rnd(-25, 25)
    const y2 = y1 + rnd(-25, 25)
    const y3 = y2 + rnd(-25, 25)

    beginShape()
    curveVertex(
      x + rnd(-20, 20),
      y + rnd(-20, 20),
    )
    curveVertex(x, y)
    curveVertex(
      x1,
      y1,
    )
    curveVertex(
      x2,
      y2,
    )
    curveVertex(
      x3,
      y3,
    )
    endShape()
  }
  pop()
}

function pointTexture() {
  push()
  for (let x = -W/2; x < W/2; x += 5)
  for (let y = -H/2; y < H/2; y += 5) {
    strokeWeight(rnd(1,2))
    stroke(color(HUE, 26, 25, rnd(0,0.4)))
    point(x + rnd(-5, 5), y + rnd(-5, 5))
  }
  pop()
}


function denominationTexture(denomination) {

  push()
  strokeWeight(1)
  for (let x = -W/2; x < W/2; x += 20)
  for (let y = -H/2; y < H/2; y += 20) {
    textSize(rnd(3,6))

    text(denomination, x + rnd(-20, 20), y + rnd(-20, 20))
  }
  pop()
}
function bg1() {
  push()
  stroke(STROKE_C)
  strokeWeight(0.5)
  const size = 10

  for (let x = -W/2; x < W/2; x += size)
  for (let y = -H/2; y < H/2; y += size) {
    if (rnd() < 0.5) {
      line(x, y, x + size, y + size)
    } else {
      line(x+size, y, x + size, y + size)
    }
  }
  pop()
}

function bg2() {
  push()
  stroke(STROKE_C)
  strokeWeight(0.5)
  const size = 10

  for (let x = -W/2; x < W/2; x += size)
  for (let y = -H/2; y < H/2; y += size) {
    if (rnd() < 0.5) {
      line(x, y, x + size, y + size)
    } else {
      line(x+size, y, x, y + size)
    }
  }
  pop()
}

function bg3() {
  push()
  stroke(STROKE_C)
  strokeWeight(0.5)
  const size = 10

  for (let x = -W/2; x < W/2; x += size)
  for (let y = -H/2; y < H/2; y += size) {
    if (rnd() < 0.5) {
      line(x, y, x + size, y + size)
    } else {
      line(x+size*2, y, x, y + size*2)
    }
  }
  pop()
}
// function bg11() {
//   push()
//   stroke(STROKE_C)
//   strokeWeight(0.5)
//   const size = 25
//   noFill()

//   for (let x = -W/2; x < W/2; x += size)
//   for (let y = -H/2; y < H/2; y += size) {

//     if (y % 2 === 0) {

//       if (x % 2 === 0) {
//       line(x + size, y, x, y+ size)
//       line(x, y, x+size, y+ size)
//       }
//     } else {
//       if (x % 2 === 0) {
//         // line(x, y, x+size, y+ size)
//         // line(x + size, y, x, y+ size)
//       } else {
//         circle(x+ size/2, y+size/2, size*3)
//         circle(x+ size/2, y+size/2, size)
//         circle(x+ size/2, y+size/2, size/2)
//         circle(x+ size/2, y+size/2, size/4)
//       }
//     }
//   }
//   pop()
// }
function bg4() {
  push()
  const size = 100
  noFill()
  strokeWeight(0.5)

  for (let x = 0; x < W; x += size)
  for (let y = 0; y < H; y += size) {
    if (
      (y/size % 2 === 0) && (x/size % 2 === 0) ||
      (y/size % 2 === 1) && (x/size % 2 === 1)
    ) {
      for (let y_ = 0; y_ < size; y_+=4) {
        line(
          x - W/2,
          y_ + y + 2 - H/2,
          x + size - W/2,
          y_ + y + 2 - H/2
        )
      }
    } else {
      for (let x_ = 0; x_ < size; x_+=4) {
        line(
          x_ + x + 2 - W/2,
          y - H/2,
          x_ + x + 2 - W/2,
          y + size - H/2
        )
      }
    }
  }
  pop()
}


function bg5() {
  push()
  const size = 100
  noFill()
  strokeWeight(0.5)

  const w = 30
  const h = 15
  const n = 100

  for (let y = -3; y < H+5; y += H/n) {
    const y_ = y - H/2
    beginShape()
    curveVertex(-w-W/2, y_-h/2)
    for (let x = 0; x < W/w + 2; x++) {
      const yAdj = x % 2 === 0 ? h/2 : -h/2
      curveVertex(x*w - W/2, y_ + yAdj)
    }
    endShape()

  }
  pop()
}

// function bg15() {
//   push()
//   noFill()
//   stroke(STROKE_C)
//   strokeWeight(0.5)
//   for (let i = 0; i < 100; i++) {
//     rect(rnd(-W/2, W/2), rnd(-H/2, H/2), W/2, H/2)
//   }
//   pop()
// }

function bg6() {
  push()
  strokeWeight(0.25)
  const size = 10

  for (let x = 0; x < W; x += size)
  for (let y = 0; y < H; y += size) {
    const x_ = x - W/2
    const y_ = y - H/2
    if (rnd() < 0.5) {
      line(x_, y_, x_ + size, y_ + size)
      const c = rnd()
      if (c < 0.15) circle(x_, y_, 2)
      else if (c < 0.3) circle(x_ + size, y_ + size, 2)
    } else {
      line(x_+size*2, y_, x_, y_ + size*2)
      const c = rnd()
      if (c < 0.15) circle(x_+size*2, y_, 2)
      else if (c < 0.3) circle(x_, y_ + size*2, 2)
    }
  }
  pop()
}

function bg7() {
  push()
  strokeWeight(5)
  stroke(color(HUE, 26, 95, 0.5))
  for (
    let x = -W/2 - H/2;
    x < H/2 + W/2;
    x += 15
  ) {
    line(x, -H/2, H/2 + x, 0)
    line(H/2+x, 0, x, H/2)
  }
  pop()
}

function bg8() {
  border1(0, 1, 0.333333)
  border1(15, 1, 0.333333)
  border1(30, 1, 0.333333)
  border1(45, 1, 0.333333)
  border1(60, 1, 0.333333)
  border1(75, 1, 0.333333)
  border1(90, 1, 0.333333)
  border1(105, 1, 0.333333)
  border1(120, 1, 0.333333)
  border1(135, 1, 0.333333)
  border1(150, 1, 0.333333)
  border1(165, 1, 0.333333)
}

function bg9() {
  push()
  strokeWeight(2)
  stroke(STROKE_LIGHT_C)
  const p = genRosetteParams({ strokeC: STROKE_C })
  dollarCheckeredRosette(-W/2, -H/2, W/2, W/4, p)
  dollarCheckeredRosette(W/2, H/2, W/2, W/4, p)
  pop()
}

function bg10() {
  push()
  strokeWeight(2)
  stroke(STROKE_LIGHT_C)
  drawCGK(110, 50, 300)

  pop()
}
