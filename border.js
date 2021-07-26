// TODO
// - combine border 1+ 2
// - 3 + 4 should be different outcomes of same border
// - split border 5 into different types depending on degAdj.
//    - 1/-1
//    - 2/-2
//    - 3/4/-3/-4
//    - overlays of 2 borders with different degAdj
// - get rid of border 6
// - border 7 points = 50 * (1-8)
// - fuckedBorder1 as bg
// - kill solidBorder1, 2 (maybe 3, 4)




function randomBorder() {
  drawBorderGraphic(() => {

    const borderSeed = rnd()
    if (borderSeed < 0.25 ) solidBorder5()
    else if (borderSeed < 0.45) border8(-10, rnd() < 0.5)
    else if (borderSeed < 0.5) border9()
    else if (borderSeed < 0.65) {
      const floralBorderSeed = rnd()

      const params = floralBorderSeed < 0.3 ? genBorder5Params({ degAdj: 1 })
        : floralBorderSeed < 0.6 ? genBorder5Params({ degAdj: 2 * posOrNeg() })
        : genBorder5Params({ degAdj: 3 * posOrNeg() })
      const padding = 35 - (30 - params.radius)

      border5(padding, params)
    }
    else if (borderSeed < 0.75) border1(10, int(rnd(20, 200)), rnd(20,50))
    else if (borderSeed < 0.9) border2(30)

    else if (borderSeed < 0.95) border7(20, int(rnd(1, 7)))

    else denominationBorder(5)

  })
}



const getXYBorder = (p, points, padding) => {
  const wPoints = int( points * W_H_RATIO / (2 * (W_H_RATIO+1)) )
  const hPoints = int(points/2 - wPoints)
  const xSize = (W - 2*padding) / wPoints
  const ySize = (H - 2*padding) / hPoints

  const top = -H/2 + padding
  const bottom = H/2 - padding
  const left = -W/2 + padding
  const right = W/2 - padding

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
    return [
      left + (p-c4)*xSize,
      top
    ]
  }
}

function drawBorderGraphic(borderFn) {
  push()
  scale(1/GRAPHIC_RESOLUTION)
  borderGraphic.scale(GRAPHIC_RESOLUTION)

  borderGraphic.translate(W/2, H/2)
  borderGraphic.noFill()
  borderGraphic.stroke(STROKE_C)
  borderFn()
  image(borderGraphic,-W * GRAPHIC_RESOLUTION / 2,-H * GRAPHIC_RESOLUTION / 2)
  pop()
}

function border1(padding=10, points=100, depth=20) {
  for (let off=0; off<2; off+=0.5) {
    drawShape(points, p => {
      const [ox, oy] = getXYBorder(p + off, points, padding)
      const [ix, iy] = getXYBorder(p + off, points, padding+depth)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    }, borderGraphic)
  }
}


function border2(padding=10, cRad=3) {
  borderGraphic.strokeWeight(1)
  const adjW = W - 2*padding
  const adjH = H - 2*padding
  const adjPrm = (adjW + adjH) * 2
  const points = adjPrm/cRad

  times(points, p => {
    const [x,y] = getXYBorder(p, points, padding+cRad)
    borderGraphic.circle(x, y, cRad*2)
  })
  drawShape(points, p => getXYBorder(p, points, padding), borderGraphic)
  drawShape(points, p => getXYBorder(p, points, padding+(cRad*2)), borderGraphic)
}


function genBorder5Params(o) {
  const radius = random(15, 31)
  const degAdj = (o.degAdj || int(random(1, 5)))
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
  // TODO MISPRINT: change this number
  const points = 60

  const radius = params.radius || 20 // 15-30
  const degAdj = params.degAdj || -3 //1,2,3,4,-1,-2,-3,-4
  const offsetAmt = 1/(params.offsetAmt || 5) //3 - 25

  for (let off=0; off<2; off+=offsetAmt) {
    drawShape(points+1, p => {
      const [ox, oy] = getXYBorder(p +off, points, padding)
      return getXYRotation(
        ((p+off)/degAdj) * TWO_PI,
        radius,
        ox, oy
      )
    }, borderGraphic)
  }
}



// direction 0.5/-0.5 looks cool
function getCurvedXYBorder(p, points, padding, direction=1) {
  // const points = W/5
  // 2 - 10 * posOrNeg() == normal looking
  // 20 strange
  // 50 whacky
  const radius = 5
  // 10,15 == realistic
  //


  const [ox, oy] = getXYBorder(p, points, padding)
  return getXYRotation(
    (p/radius*direction) * TWO_PI,
    radius,
    ox, oy
  )
}

function border7(padding=20, compression=4) {
  const points = compression*50

  for (let off=0; off<2; off+=0.3333) {
    drawShape(points, p => {
      const [ox, oy] = getCurvedXYBorder(p + off, points, padding)
      const [ix, iy] = getCurvedXYBorder(p + off, points, padding+22)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    }, borderGraphic)
  }
}


function border8(padding=-10, sides=true) {
  const compression = int(rnd(1, 7))

  borderGraphic.background(STROKE_C)
  borderGraphic.stroke(FILL_C)
  borderGraphic.strokeWeight(1.1 - compression/12)



  border7(padding+2, compression)
  border7(padding+19, compression)
  border7(padding+36, compression)

  const p = padding+(sides ? 35 : 55)
  console.log(p, compression)

  borderGraphic.stroke(STROKE_C)
  borderGraphic.erase()
  borderGraphic.fill(0)
  sides
    ? borderGraphic.rect(p-W/2, p-H/2, W-2*p, H-2*p)
    : borderGraphic.rect(-W/2, p-H/2, W, H-2*p)


  borderGraphic.noErase()
  borderGraphic.noFill()
  if (sides){
    borderGraphic.rect(p-W/2, p-H/2, W-2*p, H-2*p)
    border2(p + 5)
  } else {
    borderGraphic.rect(-W/2, p-H/2, W, H-2*p)
  }
}

function border9() {
  borderGraphic.fill(STROKE_C)
  border8()
}





function border7Multiple() {
  times(5, (i) => {
    borderGraphic.strokeWeight(1 - i/13)
    border7(i*17 - 5)
  })
}


function trancendentalMoneyBg() {
  times(12, (i) => {
    borderGraphic.strokeWeight(1 - i/13)
    border7(i*17 - 3)
  })
}


function border5Layer() {
  push()
  strokeWeight(4)
  stroke(STROKE_C)
  border5(40, genBorder5Params())

  strokeWeight(2)
  stroke(STROKE_C2)
  border5(40, genBorder5Params())

  // strokeWeight(1)
  // stroke(STROKE_C)
  // border5(40)
  pop()
}

function borderTest(padding=10, cRad=3) {
  push()
  strokeWeight(1)
  const adjW = W - 2*padding
  const adjH = H - 2*padding
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
  const adjW = W - 2*padding
  const adjH = H - 2*padding
  const adjPrm = (adjW + adjH) * 2
  const points = 80
  times(points, p => {
    const [x,y] = getXYBorder(p, points, padding)
    text(denomination, x, y)
  })
  pop()
}

function solidBorder1(weight=80) {
  const top = -H/2
  const bottom = H/2
  const left = -W/2
  const right = W/2
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
  const top = -H/2
  const bottom = H/2
  const left = -W/2
  const right = W/2
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
  const top = -H/2
  const bottom = H/2
  const left = -W/2
  const right = W/2
  const rad = weight/2

  push()
  borderGraphic.strokeWeight(weight)
  borderGraphic.stroke(STROKE_C)
  borderGraphic.line(left, top, right, top)
  borderGraphic.line(right, top, right, bottom)
  borderGraphic.line(right, bottom, left, bottom)
  borderGraphic.line(left, bottom, left, top)

  borderGraphic.circle(left+rad, top+rad, rad)
  borderGraphic.circle(left+rad, bottom-rad, rad)
  borderGraphic.circle(right-rad, top+rad, rad)
  borderGraphic.circle(right-rad, bottom-rad, rad)

  // cool ->


  borderGraphic.erase()
  borderGraphic.strokeWeight(weight/5)
  borderGraphic.line(
    left + weight + rad, top+weight/4,
    right - weight - rad, top+weight/4
  )

  borderGraphic.line(
    left + weight + rad, bottom-weight/4,
    right - weight - rad, bottom-weight/4
  )

  borderGraphic.line(
    left + weight/4, bottom - weight - rad,
    left + weight/4, top + weight + rad
  )

  borderGraphic.line(
    right - weight/4, bottom - weight - rad,
    right - weight/4, top + weight + rad
  )

  borderGraphic.noFill()
  borderGraphic.circle(left+rad, top+rad, rad)
  borderGraphic.circle(left+rad, bottom-rad, rad)
  borderGraphic.circle(right-rad, top+rad, rad)
  borderGraphic.circle(right-rad, bottom-rad, rad)
  borderGraphic.noErase()

  pop()
}


function solidBorder4(weight=60) {
  const top = -H/2
  const bottom = H/2
  const left = -W/2
  const right = W/2
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
  const top = -H/2
  const bottom = H/2
  const left = -W/2
  const right = W/2
  const rad = weight/1.5

  const weightAdj = rnd(1,5)
  const lines = int(rnd(4, 11))


  borderGraphic.stroke(STROKE_C)
  for (let i = 0; i < lines; i++) {
    if (i % 2 !== 0 || i === lines-1) borderGraphic.erase()
    borderGraphic.fill(STROKE_C)
    borderGraphic.strokeWeight(weight -(i* weightAdj))
    borderGraphic.line(left, top, right, top)
    borderGraphic.line(right, top, right, bottom)
    borderGraphic.line(right, bottom, left, bottom)
    borderGraphic.line(left, bottom, left, top)

    borderGraphic.circle(left+rad, top+rad, rad)
    borderGraphic.circle(left+rad, bottom-rad, rad)
    borderGraphic.circle(right-rad, top+rad, rad)
    borderGraphic.circle(right-rad, bottom-rad, rad)
    if (i % 2 !== 0 || i === lines-1) borderGraphic.noErase()
  }

}







