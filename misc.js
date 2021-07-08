
function signature(x, y, size) {
  push()
  noFill()
  const points = int(rnd(10, 20))
  const w = size * points
  const startX = x - w/2
  const startY = y - size/2
  beginShape()
  curveVertex(startX - rnd(size), startY - rnd(size))

  for (let p = 0; p < points; p++) {
    const xadj = (p*size + rnd(-size, size))/2
    const yadj = 2*rnd(size)
    // circle(startX + xadj, startY+ yadj, 5)
    curveVertex(
      startX + xadj,
      startY + yadj
    )
  }

  curveVertex(
    x + w/2,
    y + size/2
  )

  endShape()
  pop()
}




function standardRosette() {
  const denomination = shuffle([1, 2, 5, 10, 20, 50, 100]).pop()


  strokeWeight(1)

  const seed1 = rnd(0,10000)
  const seed2 = rnd(0,10000)
  rosetteBorder(-125, 0,100, seed1)
  dollarRosette(-125, 0, 100, seed1)

  rosetteBorder(-125, 0,45, seed1)
  dollarRosette(-125, 0, 45, seed1)

  rosetteBorder(125, 0,100, seed1)
  dollarRosette(125, 0, 100, seed1)
  rosetteBorder(125, 0,45, seed1)
  dollarRosette(125, 0, 45, seed1)

  rosetteBorder(0,0, 120, seed2)
  dollarRosette(0, 0, 120, seed2)

  // const seed3 = rnd(0,10000)
  // rosetteBorder(0,0, 80, seed3)
  // dollarRosette(0, 0, 80, seed3)

  text(denomination, 0,0)

}

function oversaturaedRosette() {
  const denomination = shuffle([1, 2, 5, 10, 20, 50, 100]).pop()

  const hue = int(rnd(0,360))
  const altHue = (180 + hue) % 360
  background(color(hue, 1, 1))

  const seed = rnd(0,10000)
  strokeWeight(15)
  stroke(color(altHue, 1, 0.4))
  dollarRosette(0, 0, 250, seed)
  text(denomination, 0,0)

  translate(3, 3)
  strokeWeight(6)
  stroke(color(altHue, 1, 1))
  dollarRosette(0, 0, 250, seed)
  text(denomination, 0,0)
}



function doubleSpiral() {
  drawCircle(180*2, p =>
    getXYRotation(p/TWO_PI, squareRad(360, p))
  )
}

function interestingPattern() {
  drawCircle(360*3, p => {
    const speed0 = 360*3
    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      75 + abs(sin(angle*45) * 50)
    )
    return getXYRotation(
      -(p/360) * TWO_PI,
      70 + abs(sin(angle*90) * 10),
      x0, y0
    )
    return [x0, y0]
  })
}

function interestingPattern2() {

  const speed0 = 1440
  const speed1 = 480
  console.log(speed0, speed1)
  drawCircle(speed0, p => {

    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      75 + abs(sin(angle*45) * 50)
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      70 + abs(sin(angle*360) * 10),
      x0, y0
    )
    return [x0, y0]
  })
}

function interestingPattern2_1() {
  const speed0 = 1440
  const speed1 = 480
  console.log(speed0, speed1)
  drawCircle(speed0, p => {

    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      75 + abs(sin(angle*45) * 50)
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      70 + abs(sin(angle*360) * 10),
      x0, y0
    )
    return [x0, y0]
  })
}

function interestingPattern3_1() {

  const speed0 = 1620
  const speed1 = 1620/22
  console.log(speed0, speed1)
  drawCircle(speed0, p => {

    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      75 + abs(sin(angle*45) * 50)
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      70 + abs(sin(angle*45) * 10),
      x0, y0
    )
    return [x0, y0]
  })
}








const squareRad = (dist, x) => {
  x < dist/4 ? x :
  x < dist/2 ? dist/4 - (x - (dist/4)) :
  x < dist*0.75 ? x - dist/2 :
  dist - x
}
