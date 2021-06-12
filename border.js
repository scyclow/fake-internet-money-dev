
const getXYBorder = (p, points, padding) => {
  const progress = ((p + points) % points) / points
  const adjW = width_ - 2*padding
  const adjH = height_ - 2*padding
  const adjPrm = (adjW + adjH) * 2
  const c1 = adjW/adjPrm
  const c2 = c1 + adjH/adjPrm
  const c3 = c2 + adjW/adjPrm
  const c4 = c3 + adjH/adjPrm

  const prg1 = progress/c1
  const prg2 = (progress - c1)/(c2 - c1)
  const prg3 = (progress - c2)/(c3 - c2)
  const prg4 = (progress - c3)/(c4 - c3)

  if (progress < c1) {
    return [
      -adjW/2 + prg1*adjW,
      -adjH/2
    ]
  } else if (progress < c2) {
    return [
      adjW/2,
      -adjH/2 + prg2*adjH
    ]
  } else if (progress < c3) {
    return [
      adjW/2 - prg3*adjW,
      adjH/2
    ]
  } else {
    return [
      -adjW/2,
      adjH/2 - prg4*adjH
    ]
  }
}


function border1(padding=20) {
  push()
  strokeWeight(0.5)
  const points = width_/6

  for (let off=0; off<2; off+=0.3333) {
    drawShape(points, p => {
      const [ox, oy] = getXYBorder(p + off, points, padding)
      const [ix, iy] = getXYBorder(p + off, points, padding+20)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    })
  }
  pop()
}


function border2(padding=10, cRad=3) {
  push()
  strokeWeight(1)
  const adjW = width_ - 2*padding
  const adjH = height_ - 2*padding
  const adjPrm = (adjW + adjH) * 2
  const points = adjPrm/cRad-2
  drawShape(points, p => {
    const [x,y] = getXYBorder(p, points, padding+cRad)
    circle(x, y, cRad*2)
    return getXYBorder(p, points, padding)
  })
  // drawShape(points, p => {
  //   return getXYBorder(p, points, padding+(cRad*2))
  // })
  pop()
}

function border3(padding=20) {
  push()
  strokeWeight(0.5)
  const points = width_/6

  for (let off=0; off<2; off+=0.3333) {
    drawShape(points, p => {
      const [ox, oy] = getXYBorder(p + off, points, padding)
      const [ix, iy] = getXYBorder(p + off, points, padding+20)

      return p % 4 === 0 ? [ix, iy] : [ox, oy]
    })
  }
  pop()
}

function border4(padding=20) {
  push()
  strokeWeight(0.5)
  const points = width_/6

  for (let off=0; off<2; off+=0.3333) {
    drawShape(points, p => {
      const [ox, oy] = getXYBorder(p + off, points, padding)
      const [ix, iy] = getXYBorder(p - off, points, padding+20)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    })
  }
  pop()
}

function border5(padding=20) {
  push()
  strokeWeight(0.5)
  const points = width_/6

  for (let off=0; off<2; off+=0.3333) {
    drawShape(points, p => {
      const [ox, oy] = getXYBorder(p + off, points, padding)
      return getXYRotation(
        ((p + off)/60) * TWO_PI,
        20,
        ox, oy
      )

    })
  }
  pop()
}

function fuckedBorder1() {
  for (let p=15; p <600; p+=15) {
    border1(p)
  }
}

function solidBorder1(weight=80) {
  const h = height_
  const w = width_
  const top = -h/2
  const bottom = h/2
  const left = -w/2
  const right = w/2
  const rad = weight/2

  push()
  strokeWeight(weight)
  stroke(STROKE_C)
  line(left, top, right, top)
  line(right, top, right, bottom)
  line(right, bottom, left, bottom)
  line(left, bottom, left, top)

  circle(left+rad, top+rad, rad)
  circle(left+rad, bottom-rad, rad)
  circle(right-rad, top+rad, rad)
  circle(right-rad, bottom-rad, rad)
  pop()
}


function solidBorder2(weight) {
  const h = height_
  const w = width_
  const top = -h/2
  const bottom = h/2
  const left = -w/2
  const right = w/2
  const rad = weight/2

  push()
  strokeWeight(weight)
  stroke(STROKE_C)
  line(left, top, right, top)
  line(right, top, right, bottom)
  line(right, bottom, left, bottom)
  line(left, bottom, left, top)
  stroke(FILL_C)
  circle(left+rad, top+rad, rad)
  circle(left+rad, bottom-rad, rad)
  circle(right-rad, top+rad, rad)
  circle(right-rad, bottom-rad, rad)
  pop()
}



function solidBorder3(weight) {
  const h = height_
  const w = width_
  const top = -h/2
  const bottom = h/2
  const left = -w/2
  const right = w/2
  const rad = weight/2

  push()
  strokeWeight(weight)
  stroke(STROKE_C)
  line(left, top, right, top)
  line(right, top, right, bottom)
  line(right, bottom, left, bottom)
  line(left, bottom, left, top)

  circle(left+rad, top+rad, rad)
  circle(left+rad, bottom-rad, rad)
  circle(right-rad, top+rad, rad)
  circle(right-rad, bottom-rad, rad)

  // cool ->

  strokeWeight(weight/5)
  stroke(FILL_C)
  line(
    left + weight + rad, top+weight/4,
    right - weight - rad, top+weight/4
  )

  line(
    left + weight + rad, bottom-weight/4,
    right - weight - rad, bottom-weight/4
  )

  line(
    left + weight/4, bottom - weight - rad,
    left + weight/4, top + weight + rad
  )

  line(
    right - weight/4, bottom - weight - rad,
    right - weight/4, top + weight + rad
  )

  noFill()
  circle(left+rad, top+rad, rad)
  circle(left+rad, bottom-rad, rad)
  circle(right-rad, top+rad, rad)
  circle(right-rad, bottom-rad, rad)

  pop()
}


function solidBorder4(weight) {
  const h = height_
  const w = width_
  const top = -h/2
  const bottom = h/2
  const left = -w/2
  const right = w/2
  const rad = weight/2

  push()
  strokeWeight(weight)
  stroke(STROKE_C)
  line(left, top, right, top)
  line(right, top, right, bottom)
  line(right, bottom, left, bottom)
  line(left, bottom, left, top)

  circle(left+rad, top+rad, rad)
  circle(left+rad, bottom-rad, rad)
  circle(right-rad, top+rad, rad)
  circle(right-rad, bottom-rad, rad)

  // cool ->
  strokeWeight(weight/2)
  // strokeWeight(weight/5)
  stroke(FILL_C)
  line(
    left + weight + rad, top+weight/4,
    right - weight - rad, top+weight/4
  )

  line(
    left + weight + rad, bottom-weight/4,
    right - weight - rad, bottom-weight/4
  )

  line(
    left + weight/4, bottom - weight - rad,
    left + weight/4, top + weight + rad
  )

  line(
    right - weight/4, bottom - weight - rad,
    right - weight/4, top + weight + rad
  )

  noFill()
  circle(left+rad, top+rad, rad)
  circle(left+rad, bottom-rad, rad)
  circle(right-rad, top+rad, rad)
  circle(right-rad, bottom-rad, rad)

  pop()
}



function solidBorder5(weight) {
  const h = height_
  const w = width_
  const top = -h/2
  const bottom = h/2
  const left = -w/2
  const right = w/2
  const rad = weight/2

  const weightAdj = rnd(1,6)
  const lines = int(rnd(4, 16))

  push()
  for (let i = 0; i < lines; i++) {

    stroke(i % 2 === 0 ? STROKE_C : FILL_C)
    strokeWeight(weight -(i* weightAdj))
    line(left, top, right, top)
    line(right, top, right, bottom)
    line(right, bottom, left, bottom)
    line(left, bottom, left, top)

    circle(left+rad, top+rad, rad)
    circle(left+rad, bottom-rad, rad)
    circle(right-rad, top+rad, rad)
    circle(right-rad, bottom-rad, rad)
  }

  pop()
}
