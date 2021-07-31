
function signature(x, y, size) {
  push()
  noFill()
  strokeWeight(2)
  const pointsN = int(15)
  const w = size * pointsN
  const startX = x - w/2
  const startY = y - size/2

  const points = [[startX - rnd(size), startY - rnd(size)]]
  for (let p = 0; p < pointsN; p++) {
    const xadj = (p*size + rnd(-size, size))/2
    const yadj = 2*rnd(size)
    points.push([
      startX + xadj,
      startY + yadj
    ])
  }
  points.push([
    x + w/2,
    y + size/2
  ])

  stroke(FILL_C)
  beginShape()
  points.forEach(([x, y]) => curveVertex(x+1, y+1))
  endShape()

  stroke(STROKE_C)
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
  fill(FILL_C)
  stroke(STROKE_C)
  rect(x, y, 60, 20)
  // drawStr('99999999', 141,131, 0.125, STROKE_C)
  drawStr(sNumber, x+30,y+10, 0.125, STROKE_C, ACCENT_C)
  pop()
}

