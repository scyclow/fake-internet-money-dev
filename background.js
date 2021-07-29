function randomBgPattern() {
  const r = rnd()
  // if (r < 0.125) bg1()
  if (r < 0.125) bg8() // chainlink
  else if (r < 0.25) bg2() // labrynth
  else if (r < 0.375) bg3() // penny pincher

  else if (r < 0.5) bg4() // fabric
  else if (r < 0.625) bg5()
  else if (r < 0.75) bg6() // mainframe
  else if (r < 0.875) bg7()
  else denominationTexture(DENOMINATION)
}

function randomBorderlessBg() {
  const r = rnd()


  if (r < 0.3333) bg9()
  else if (r < 0.66666) bg10()
  else bg11()

  // TODO
  // large rosette bg that fades into rest of bg
  //
}


function squigTexture() {
  push()
  noFill()
  strokeWeight(rnd(0.1, 0.5))
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
  const size = 100
  noFill()
  strokeWeight(0.5)

  const w = 30
  const h = 15
  const showCircle = rnd() < 0.5

  for (let y = 0, i = 0; y <= H+5; y += h, i++) {
    const y_ = y - H/2
    beginShape()
    curveVertex(-w-W/2, y_-h/2)
    for (let x = 0; x < W/w + 2; x++) {
      const yAdj = i % 2 === 0
        ? (x % 2 === 0 ? h/2 : -h/2)
        : (x % 2 === 0 ? -h/2 : h/2)

      curveVertex(x*w - W/2, y_ + yAdj)
      showCircle && circle(x*w - W/2, y_ + yAdj, 4)
    }
    endShape()

  }
  pop()
}

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

  for (let y = -5; y < H+8; y += H/n) {
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
  push()
  const size = 10
  strokeWeight(0.35)
  stroke(STROKE_LIGHT_C)

  for (let x = -W/2; x < W/2+1; x += size)
  for (let y = -H/2; y < H/2+1; y += size) {
    circle(x, y, size+4)
  }
  pop()
}



function bg9(corners=[2, 4]) {
  const L = -W/2
  const R = W/2
  const T = -H/2
  const B = H/2
  push()
  // TODO mess with different iterations of corners
  // maybe a function of where corners are
  const seed = rnd()
  let layout
  if (seed < 0.125) layout = [[L, T], [R, B]]
  else if (seed < 0.25) layout = [[L, T], [R, T]]
  else if (seed < 0.375) layout = [[L, B], [R, T]]
  else if (seed < 0.5) layout = [[L, B], [R, B]]
  else if (seed < 0.625) layout = [[L, T]]
  else if (seed < 0.75) layout = [[L, B]]
  else if (seed < 0.875) layout = [[R, T]]
  else layout = [[R, B]]

  const p = genParams({ strokeC: STROKE_LIGHT_C, strokeW: 1 })
  const inner = rnd(0, W/4)
  const rFn = ROSETTE_STYLE === 'VINTAGE' ? dollarRosette : getRosetteStyleFn()
  layout.forEach(([x, y]) => rFn(x, y, W/2, inner, p))
  pop()
}

function bg10() {
  const compression = int(rnd(1, 11))
  drawBorderGraphic(() => {
    times(12, (i) => {
      borderGraphic.strokeWeight(1 - i/12)
      border7(i*17 - 5, compression)
      // border7(i*17 - 5, 10-i)
    })
  })
}

function bg11() {
  rosetteWithBackground(0,0, W, 0, {strokeC: rnd() < 0.5 ? STROKE_C : FILL_C})
}


