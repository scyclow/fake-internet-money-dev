function randomBgPattern() {
  const r = rnd()
  if (r < 0.125) bg1()
  else if (r < 0.25) bg2()

  else if (r < 0.5) bg4()
  else if (r < 0.625) bg5()
  else if (r < 0.75) bg6()
  else if (r < 0.875) bg7()
  else denominationTexture(DENOMINATION)
}

function randomBorderlessBg() {
  const r = rnd()

  if (r < 0.25) bg8()
  else if (r < 0.5) bg9()
  else if (r < 0.75) bg10()
}


function squigTexture() {
  push()
  noFill()
  strokeWeight(random(0.1, 0.5))
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
    const s = rnd(0.01, 0.15)

    const straight = rnd() < 0.3
    const xOffset = straight ? 0 : rnd(-10, 10)
    const yOffset = straight ? 0 : rnd(-10, 10)

    drawStr(denomination, x + xOffset, y + yOffset, s, STROKE_C)
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
  strokeWeight(1)
  stroke(BRIGHT_LIGHT_C)
  for (
    let x = -W/2 - H/2;
    x < H/2 + W/2;
    x += 5
  ) {
    line(x, -H/2, H/2 + x, 0)
    line(H/2+x, 0, x, H/2)
  }
  pop()
}

function bg8() {
  drawBorderGraphic(() => {
    for (let i=-15; i<=165; i +=15) {
      border1(i, 20, rnd(20,50))
    }
  })
}

function bg9() {
  push()
  // TODO mess with different iterations of corners
  // maybe a function of where corners are
  const p = genRosetteParams({ strokeC: STROKE_LIGHT_C, strokeW: 2 })
  dollarRosette(-W/2, H/2, W/2, W/4, p)
  dollarRosette(W/2, -H/2, W/2, W/4, p)
  pop()
}

function bg10() {
  const compression = int(rnd(1, 11))
  drawBorderGraphic(() => {
    times(10, (i) => {
      borderGraphic.strokeWeight(1 - i/13)
      border7(i*17 - 5, compression)
      // border7(i*17 - 5, 10-i)
    })
  })
}


