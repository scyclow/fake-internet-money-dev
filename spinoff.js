


function animating_spirograph(x0, y0, c1Radius=100) {

  const x = posOrNeg()
  const params =
  sample([
    // [10, 96, 2],
    // [14, 96, 2],
    // [720, -5, 5],
    // [720, 6, -3],
    // [720, -4, 2],
    // [720, -6, 2],
    [720, -3, 3],
    // [720, -15, 5], // cool, but doesn't really fit here
  ])

  const c1DegPerTick = TWO_PI/params[0]

  const c2Radius = c1Radius * 0.4
  const c2DegPerTick = TWO_PI/params[1]

  const c3Radius = c1Radius * 0.2
  const c3DegPerTick = TWO_PI/params[2]

  drawCircle(720, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius + sin(ellapsed/50)*4, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, c2Radius + sin(((ellapsed-20))/50)*4, x1, y1)
    return getXYRotation(p*c3DegPerTick, c3Radius + sin(((ellapsed-20)-30)/50)*4, x2, y2)
  })
}

// TODO spin this off into own project?
function watermark2_ () {
  push()
  stroke(color(0, 75, 100))
  strokeWeight(4)
  watermark2(88, 10)

  stroke(color(90, 70, 90))
  strokeWeight(1)
  watermark2(88, 10)

  stroke(color(250, 72, 31))
  strokeWeight(3)
  watermark2(59, 10)

  stroke(color(200, 55, 100))
  strokeWeight(1)
  watermark2(59, 10)
  pop()
}
function watermark2(m, wiggle=1) {
  const x = 32
  const modifier = m||sample([7, 13, 29, 31, 32, 34, 35, 36, 37, 44, 46, 58, 59, 60, 62, 85, 88, 92, 96])
  const speed0 = x * modifier
  const speed1 = x


  drawCircle(speed0, p => {
    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      75 + abs(sin(angle*90) * 30)
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      60 + abs(sin(angle*360) * wiggle),
      x0, y0
    )
    return [x0, y0]
  })
}

// SPIN OFF ?
function watermark5(x0, y0, radius) {
  const c1Radius = radius
  const c1DegPerTick = TWO_PI/1440

  const c2Radius = radius * 0.4
  const c2DegPerTick = TWO_PI/20

  const c3Radius = radius * 0.2
  const c3DegPerTick = -TWO_PI/20

  const c4Radius = radius * 0.1
  const c4DegPerTick = -TWO_PI/4

  const c5Radius = radius * 0.05
  const c5DegPerTick = TWO_PI/10

  drawCircle(1440, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, c2Radius, x1, y1)
    const [x3, y3] = getXYRotation(p*c3DegPerTick, c3Radius, x2, y2)
    const [x4, y4] = getXYRotation(p*c4DegPerTick, c4Radius, x3, y3)
    return getXYRotation(p*c5DegPerTick, c5Radius, x4, y4)
  })
}

// SPIN OFF?
function watermark6(x0, y0, radius) {
  const c1Radius = radius *0.5
  const c1DegPerTick = TWO_PI/2880

  const c2Radius = radius
  const c2DegPerTick = TWO_PI/80

  const c3Radius = radius
  const c3DegPerTick = -TWO_PI/40

  const c4Radius = radius * 0.125
  const c4DegPerTick = -TWO_PI/40

  const c5Radius = radius * 0.0675
  const c5DegPerTick = TWO_PI/8

  drawCircle(2880, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, c2Radius, x1, y1)
    const [x3, y3] = getXYRotation(p*c3DegPerTick, c3Radius, x2, y2)
    const [x4, y4] = getXYRotation(p*c4DegPerTick, c4Radius, x3, y3)
    return getXYRotation(p*c5DegPerTick, c5Radius, x4, y4)
  })
}






function border_outtake_1(padding=20) {
  borderGraphic.strokeWeight(0.5)
  const points = W/6+3

  for (let off=0; off<2; off+=0.3333) {
    drawShape(points+1, p => {
      const [ox, oy] = getXYBorder(p + off, points, padding)
      const [ix, iy] = getXYBorder(p + off, points, padding+20)

      return p % 4 === 0 ? [ix, iy] : [ox, oy]
    }, borderGraphic)
  }
}

function border_outtake_2(padding=20) {
  borderGraphic.strokeWeight(0.5)
  const points = W/6

  for (let off=0; off<2; off+=0.3333) {
    drawShape(points+1, p => {
      const [ox, oy] = getXYBorder(p + off, points, padding)
      const [ix, iy] = getXYBorder(p - off, points, padding+20)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    }, borderGraphic)
  }
}

function border_outtake_3(padding=20, params={}) {
  const points = 60

  const radius = params.radius || 20 // 15-30
  const degAdj = params.degAdj || -3 //1,2,3,4,-1,-2,-3,-4
  const offsetAmt = 1/(params.offsetAmt || 5) //3 - 25


  for (let off=0; off<2; off+=offsetAmt) {
    drawShape(points+1, p => {
      const [ox, oy] = getXYBorder(p +off, points, padding)
      return getXYRotation(
        (p/degAdj) * TWO_PI,
        radius,
        ox, oy
      )
    }, borderGraphic)
  }
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