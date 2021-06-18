// const getXYBorder = (p, points, padding) => {
//   const progress = ((p + points) % points) / points
//   const adjW = width_ - 2*padding
//   const adjH = height_ - 2*padding
//   const adjPrm = (adjW + adjH) * 2
//   const c1 = adjW/adjPrm
//   const c2 = c1 + adjH/adjPrm
//   const c3 = c2 + adjW/adjPrm
//   const c4 = c3 + adjH/adjPrm

//   const prg1 = progress/c1
//   const prg2 = (progress - c1)/(c2 - c1)
//   const prg3 = (progress - c2)/(c3 - c2)
//   const prg4 = (progress - c3)/(c4 - c3)

//   if (progress < c1) {
//     return [
//       -adjW/2 + prg1*adjW,
//       -adjH/2
//     ]
//   } else if (progress < c2) {
//     return [
//       adjW/2,
//       -adjH/2 + prg2*adjH
//     ]
//   } else if (progress < c3) {
//     return [
//       adjW/2 - prg3*adjW,
//       adjH/2
//     ]
//   } else {
//     return [
//       -adjW/2,
//       adjH/2 - prg4*adjH
//     ]
//   }
// }

const getXYBorder = (p, points, padding) => {
  const wPoints = int( points * W_H_RATIO / (2 * (W_H_RATIO+1)) )
  const hPoints = int(points/2 - wPoints)
  const xSize = (width_ - 2*padding) / wPoints
  const ySize = (height_ - 2*padding) / hPoints

  const top = -height_/2 + padding
  const bottom = height_/2 - padding
  const left = -width_/2 + padding
  const right = width_/2 - padding

  const c1 = wPoints
  const c2 = wPoints + hPoints
  const c3 = wPoints*2 + hPoints
  const c4 = wPoints*2 + hPoints*2

  if (p < c1) {
    return [
      left + p*xSize,
      top
    ]
  } else if (p < c2) {
    return [
      right,
      top + (p - c1)*ySize
    ]
  } else if (p < c3) {
    return [
      right - (p - c2)*xSize,
      bottom
    ]
  } else if (p < c4) {
    return [
      left,
      bottom - (p - c3)*ySize
    ]
  } else {
    console.log
    return [
      left + (p-c4)*xSize,
      top
    ]
  }
}

function border1(padding=20, spacing=2, offset=2) {
  push()
  // strokeWeight(0.5)
  const points = width_/(3*spacing)

  for (let off=0; off<offset; off+=0.3333) {
    drawShape(points+1, p => {
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
  const points = adjPrm/cRad

  times(points, p => {
    const [x,y] = getXYBorder(p, points, padding+cRad)
    circle(x, y, cRad*2)
  })
  drawShape(points, p => getXYBorder(p, points, padding))
  drawShape(points, p => getXYBorder(p, points, padding+(cRad*2)))
  pop()
}

function border3(padding=20) {
  push()
  strokeWeight(0.5)
  const points = width_/6+3

  for (let off=0; off<2; off+=0.3333) {
    drawShape(points+1, p => {
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
    drawShape(points+1, p => {
      const [ox, oy] = getXYBorder(p + off, points, padding)
      const [ix, iy] = getXYBorder(p - off, points, padding+20)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    })
  }
  pop()
}

function genBorder5Params() {
  const radius = random(15, 31)
  const degAdj = int(random(1, 5))  * posOrNeg()
  const offsetAmt = (
    abs(degAdj) === 1 ? random(15, 51) :
    abs(degAdj) === 2 ? random(3, 26) :
                   random(1, 13)
  )
  return {
    radius,
    degAdj,
    offsetAmt,
  }
}

function border5(padding=20, params={}) {
  push()
  const points = width_/7

  const radius = params.radius || 20 // 15-30
  const degAdj = params.degAdj || -3 //1,2,3,4,-1,-2,-3,-4
  const offsetAmt = 1/(params.offsetAmt || 5) //3 - 25
  // degAdj 1; offsetAmt 15 - 50
  // degAdj 2; offsetAmt 3 - 25
  // degAdj 3; offsetAmt 1 - 12

  for (let off=0; off<2; off+=offsetAmt) {
    drawShape(points+1, p => {
      const [ox, oy] = getXYBorder(p +off, points, padding)
      return getXYRotation(
        ((p+off)/degAdj) * TWO_PI,
        radius,
        ox, oy
      )

    })
  }
  pop()
}

function border5Layer() {
  push()
  strokeWeight(4)
  stroke(STROKE_C)
  border5(40)

  strokeWeight(2)
  stroke(FILL_C2)
  border5(40)

  // strokeWeight(1)
  // stroke(STROKE_C)
  // border5(40)
  pop()
}

function borderTest(padding=10, cRad=3) {
  push()
  strokeWeight(1)
  const adjW = width_ - 2*padding
  const adjH = height_ - 2*padding
  const adjPrm = (adjW + adjH) * 2
  const points = adjPrm/cRad-2
  times(points+1, p => {
    const [x,y] = getXYBorder(p, points, padding+cRad)
    circle(x, y, cRad*2)
  })
  // drawShape(points, p => {
  //   return getXYBorder(p, points, padding+(cRad*2))
  // })
  pop()
}

function denominationBorder(denomination, padding=10) {
  push()
  strokeWeight(1)
  const adjW = width_ - 2*padding
  const adjH = height_ - 2*padding
  const adjPrm = (adjW + adjH) * 2
  const points = 80
  times(points, p => {
    const [x,y] = getXYBorder(p, points, padding)
    text(denomination, x, y)
  })
  pop()
}

function fuckedBorder1() {
  for (let p=15; p <600; p+=15) {
    border1(p)
  }
}

function solidBorder1(weight=80) {
  const top = -height_/2
  const bottom = height_/2
  const left = -width_/2
  const right = width_/2
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


function solidBorder2(weight=60) {
  const top = -height_/2
  const bottom = height_/2
  const left = -width_/2
  const right = width_/2
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



function solidBorder3(weight=60) {
  const top = -height_/2
  const bottom = height_/2
  const left = -width_/2
  const right = width_/2
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


function solidBorder4(weight=60) {
  const top = -height_/2
  const bottom = height_/2
  const left = -width_/2
  const right = width_/2
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



function solidBorder5(weight=60) {
  const top = -height_/2
  const bottom = height_/2
  const left = -width_/2
  const right = width_/2
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
