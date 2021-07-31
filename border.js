// TODO
// - make vintage border more likely to come up with vintage rosette style
// - vintage borders can intermingle




function randomBorder() {
  const borderSeed = rnd()
  if (borderSeed < 0.01) return denominationBorder()

  const vintageBorderProb = ROSETTE_STYLE === 'VINTAGE' ? 0.5 : 0.25
  drawBorderGraphic(() => {
    if (borderSeed < vintageBorderProb) {
      const vintageBorderSeed = rnd()
      const degAdj = vintageBorderSeed < 0.6 ? 2 * posOrNeg()
        : vintageBorderSeed < 0.8 ? 1
        : 3 * posOrNeg()

      const params = genBorder5Params({ degAdj })

      const padding = 8 + params.radius

      border5(padding, params)
      rnd() < 0.25 && border5(padding, genBorder5Params({ degAdj: degAdj * -1 }))
    }

    else if (borderSeed < 0.55)
      solidBorder5()

    else if (borderSeed < 0.8)
      border8(-10, rnd() < 0.7)


    else if (borderSeed < 0.85)
      border1(10, int(rnd(20, 200)))

    else if (borderSeed < 0.9)
      border2(20)

    else
      border7(20, int(rnd(1, 7)), posOrNeg())

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

function border1(padding=10, points=100) {
  for (let off=0; off<2; off+=0.5) {
    drawShape(points, p => {
      const [ox, oy] = getXYBorder(p + off, points, padding)
      const [ix, iy] = getXYBorder(p + off, points, padding+20)

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
  const radius = rnd(15, 31)
  const degAdj = (o.degAdj || int(rnd(1, 5)))
  const offsetAmt = (
    abs(degAdj) === 1 ? rnd(15, 51) :
    abs(degAdj) === 2 ? rnd(3, 26) :
                        rnd(1, 13)
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

function border7(padding=20, compression=4, d=1) {
  const points = compression*50

  if (ROSETTE_STYLE === 'DECO') borderGraphic.fill(STROKE_C)

  if (['NUMISMATIC', 'VINTAGE', 'DECO'].includes(ROSETTE_STYLE))
  for (let off=0; off<2; off+=0.3333) {
    drawShape(points, p => {
      const [ox, oy] = getCurvedXYBorder(p + off, points, padding, d)
      const [ix, iy] = getCurvedXYBorder(p + off, points, padding+22, d)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    }, borderGraphic)
  }

  if (['ECHO', 'DIGITAL'].includes(ROSETTE_STYLE))
  for (let off=0; off<25; off+=5) {
    drawShape(points, p => getCurvedXYBorder(p, points, padding+off), borderGraphic, d)
  }

  if (['LINE', 'DIGITAL'].includes(ROSETTE_STYLE))
  for (let p=0; p < points; p += 0.2) {
    const [ox, oy] = getCurvedXYBorder(p, points, padding, d)
    const [ix, iy] = getCurvedXYBorder(p, points, padding+22, d)
    borderGraphic.line(ox, oy, ix, iy)
  }
}


function border8(padding=-10, sides=true) {
  const compression = int(rnd(1, 7))

  borderGraphic.background(STROKE_C)
  borderGraphic.stroke(FILL_C)
  borderGraphic.strokeWeight(1.1 - compression/12)
  const direction = posOrNeg()

  const extraPadding = ['ECHO', 'DIGITAL'].includes(ROSETTE_STYLE) ? 6 : 0
  border7(padding+2, compression, direction)
  border7(padding+19+extraPadding, compression, direction)
  border7(padding+36+extraPadding*2, compression, direction)

  const p = padding+(sides ? 35 : 55)

  borderGraphic.stroke(STROKE_C)
  borderGraphic.erase()
  borderGraphic.fill(0)
  sides
    ? borderGraphic.rect(p-W/2, p-H/2, W-2*p, H-2*p)
    : borderGraphic.rect(-W/2, p-H/2, W, H-2*p)


  borderGraphic.noErase()
  borderGraphic.noFill()

  if (sides) {
    borderGraphic.rect(p-W/2, p-H/2, W-2*p, H-2*p)
    border2(p + 5)
  } else {
    borderGraphic.rect(-W/2, p-H/2, W, H-2*p)
  }
}




function denominationBorder(padding=10) {

  const adjW = W - 2*padding
  const adjH = H - 2*padding
  const adjPrm = (adjW + adjH) * 2
  const points = 80
  const denomination = getDenominationDisplay()
  times(points, p => {
    const [x,y] = getXYBorder(p, points, padding)
    drawStrAdj(denomination, x, y, 0.1, STROKE_C)
  })

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







