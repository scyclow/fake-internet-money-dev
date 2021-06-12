

function bg1() {
  push()
  stroke(STROKE_C)
  strokeWeight(0.5)
  const size = 10

  for (let x = -width_/2; x < width_/2; x += size)
  for (let y = -height_/2; y < height_/2; y += size) {
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

  for (let x = -width_/2; x < width_/2; x += size)
  for (let y = -height_/2; y < height_/2; y += size) {
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

  for (let x = -width_/2; x < width_/2; x += size)
  for (let y = -height_/2; y < height_/2; y += size) {
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

//   for (let x = -width_/2; x < width_/2; x += size)
//   for (let y = -height_/2; y < height_/2; y += size) {

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
function bg13() {
  push()
  const size = 100
  noFill()
  strokeWeight(0.5)

  for (let x = 0; x < width_; x += size)
  for (let y = 0; y < height_; y += size) {
    if (
      (y/size % 2 === 0) && (x/size % 2 === 0) ||
      (y/size % 2 === 1) && (x/size % 2 === 1)
    ) {
      for (let y_ = 0; y_ < size; y_+=4) {
        line(
          x - width_/2,
          y_ + y + 2 - height_/2,
          x + size - width_/2,
          y_ + y + 2 - height_/2
        )
      }
    } else {
      for (let x_ = 0; x_ < size; x_+=4) {
        line(
          x_ + x + 2 - width_/2,
          y - height_/2,
          x_ + x + 2 - width_/2,
          y + size - height_/2
        )
      }
    }
  }
  pop()
}


function bg14() {
  push()
  const size = 100
  noFill()
  strokeWeight(0.5)

  const w = 30
  const h = 15
  const n = 100

  for (let y = -3; y < height_+5; y += height_/n) {
    const y_ = y - height_/2
    beginShape()
    curveVertex(-w-width_/2, y_-h/2)
    for (let x = 0; x < width_/w + 2; x++) {
      const yAdj = x % 2 === 0 ? h/2 : -h/2
      curveVertex(x*w - width_/2, y_ + yAdj)
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
//     rect(rnd(-width_/2, width_/2), rnd(-height_/2, height_/2), width_/2, height_/2)
//   }
//   pop()
// }

function bg16() {
  push()
  noFill()
  strokeWeight(0.25)
  const squigs = 60
  const squigCoords = []
  for (let i=0; i<squigs; i++) {
    squigCoords.push([
      rnd(-width_/2, width_/2),
      rnd(-height_/2, height_/2)
    ])
    console.log()
  }

  squigCoords.forEach(([x, y]) => {

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
  })

  for (let x = -width_/2; x < width_/2; x += 5)
  for (let y = -height_/2; y < height_/2; y += 5) {
    strokeWeight(noise(x,y))
    point(x + rnd(-5, 5), y + rnd(-5, 5))
  }
  pop()
}
function bg17() {
  strokeWeight(0.25)
  const size = 10

  for (let x = 0; x < width_; x += size)
  for (let y = 0; y < height_; y += size) {
    const x_ = x - width_/2
    const y_ = y - height_/2
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
}

function bg18() {
  push()
  strokeWeight(5)
  stroke(color(HUE, 26, 95, 0.5))
  for (
    let x = -width_/2 - height_/2;
    x < height_/2 + width_/2;
    x += 15
  ) {
    line(x, -height_/2, height_/2 + x, 0)
    line(height_/2+x, 0, x, height_/2)
  }
  pop()
}
