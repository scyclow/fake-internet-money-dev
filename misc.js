
function signature(x, y, charSize, invert) {
  push()
  noFill()
  strokeWeight(1.5)
  const chars = 8
  const xVar = 0.1
  const yVar = 0.75
  const xstart = x - charSize*chars
  const ystart = y + charSize/2
  let x0 = xstart
  let y0 = ystart

  const points = [
    [x0 - rnd(charSize), y0 - rnd(charSize)],
    [x0, y0]
  ]


  times(chars, letter => {
    const up = prb(0.75)
    const x1 = x0 + charSize*(1+xVar*(up ? -7 : 7))/2
    const y1 = y0 + (up
      ? prb(0.85) ? charSize*rnd(0, 0.3) : charSize*rnd(1, 1.5)
      : -1*(prb(0.5) ? charSize*rnd(0, 0.3) : charSize*rnd(1, 1.5))
    )

    const x2 = x0 + charSize*rnd(1-xVar, 1+xVar)
    const y2 = y0 + charSize*rnd(-0.1, 0.1)
    points.push([x1, y1])
    points.push([x2, y2])
    x0 = x2
    y0 = y2
  })

  points.push([x0 + rnd(charSize), y0 + rnd(charSize)])

  invert ? stroke(DARK_C) : stroke(LIGHT_C)
  beginShape()
  points.forEach(([x, y]) => curveVertex(x+1, y+1))
  endShape()


  invert ? stroke(ACCENT_C) : stroke(DARK_C)
  beginShape()
  points.forEach(([x, y]) => curveVertex(x, y))
  endShape()

  pop()
}

function genSerialNumber() {
  let num = ""
  times(4, _ => num += rnd().toFixed(2).slice(2,4))
  return num
}

function serialNumber(x, y) {
  push()
  const sNumber = genSerialNumber()
  fill(LIGHT_C)
  stroke(DARK_C)
  rect(x, y, STAR_NOTE ? 72 : 60, 20)
  drawStr(sNumber, x+30,y+10, 0.125, DARK_C, ACCENT_C)
  if (STAR_NOTE) {
    fill(ACCENT_C)
    stroke(ACCENT_C)
    drawShape(10, i =>  getXYRotation(i*TWO_PI/10, i % 2 === 0 ? 2.5 : 6, x+63, y+ 10))
  }
  pop()
}

