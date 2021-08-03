function mainLayout() {
  const showBorder = [0, 1, 2, 3, 6, 4].includes(MAIN_CENTER_PIECE) && rnd() < 0.75
  const cornerComponentLocations = showBorder || rnd() < 0.8 ? cornerLocations() : []
  let sideSpace = [0,1,3,5].includes(MAIN_CENTER_PIECE)

  const bgSeed = rnd()
  let wmCorners = []
  let invertSig = false

  if (showBorder) {
    randomBgPattern()
  } else if (bgSeed < 0.5625) {
    wmCorners = getDoubleWMCorners(cornerComponentLocations)
    rosetteCornerBg(wmCorners)
    sideSpace = false
  } else if (bgSeed < 0.8125) {
    const wmCorner = getSingleWMCorner(cornerComponentLocations)
    wmCorners = [wmCorner]
    randomWatermark(
      150 * cornerXDirection(wmCorner),
      60 * cornerYDirection(wmCorner, cornerComponentLocations.length === 4),
      120,
      HIGHLIGHT ? LIGHT_ACCENT_C : LIGHTENED_DARK_C
    )
  } else if (bgSeed < 0.9375) {
    IS_VINTAGE || rnd() < 0.5 && !IS_DECO ? bg10() : bg11()
    invertSig = true
  } else {/*no bg*/}


  showBorder && randomBorder()
  displayCorners(cornerComponentLocations)

  switch (MAIN_CENTER_PIECE) {
    case 0: break
    case 1: singleCenterPiece(); break
    case 2: bouquet(); break
    case 3: portrait(); break
    case 4: rosetteSandwich(); break
  }


  if (sideSpace && rnd() < 0.0625) {
    const ancillarySide = posOrNeg()
    const secondarySide = rnd()
    rnd() < 0.5 ? emblem(ancillarySide) : sideNumber(ancillarySide)
    secondarySide < 0.25
      ? emblem(ancillarySide*-1)
      : secondarySide < 0.5 ? sideNumber(ancillarySide*-1) : null
  }

  displayBillData(
    wmCorners.length || cornerComponentLocations.length === 4
      ? wmCorners
      : cornerComponentLocations,
    showBorder,
    invertSig
  )

}



function cornerLocations() {
  const cornerPatternSeed = rnd()

  if (cornerPatternSeed < 0.25) {
    return [1,2, 3, 4]
  } else if (cornerPatternSeed < 0.5) {
    return [1, 4]
  } else if (cornerPatternSeed < 0.75) {
    return [2, 3]
  } else if (cornerPatternSeed < 0.825) {
    return [1, 2]
  } else if (cornerPatternSeed < 0.9) {
    return [3, 4]
  } else if (cornerPatternSeed < 0.92) {
    return [1]
  } else if (cornerPatternSeed < 0.94) {
    return [2]
  } else if (cornerPatternSeed < 0.96) {
    return [3]
  }  else if (cornerPatternSeed < 0.98) {
    return [4]
  } else {
    return []
  }
}



function displayCorners(locations=[]) {
  const padding = 57
  const radius = 55

  const allHoles = rnd() < 0.125
  const selectHoles = locations.length === 4 && rnd() < 0.5 ? [sample([1,3]), sample([2,4])] : []

  const params = genParams(getHighlightPColors())

  locations.forEach(location => {
    const [_x, _y] = CORNERS[location]
    const x = _x + (location%2===1 ? padding : -padding)
    const y = _y + (location<3 ? padding : -padding)
    const holeR = allHoles || selectHoles.includes(location) ? radius*0.75 : 0
    console.log(params)

    rosetteWithBackground(x, y, radius, 0, {...params, holeR})
    drawDenominationWithBorder(x, y, 0.35, ROSETTE_FILL_C, ROSETTE_STROKE_C)
  })
}


const emptyCorners = c => [1,2,3,4].filter(i => !c.includes(i))
const opposingCorner = c => ({
  1: 4,
  2: 3,
  3: 2,
  4: 1
}[c])
const cornerXDirection = c => c % 2 !== 0 ? -1 : 1
const cornerYDirection = (c, zero) => zero ? 0 : c < 3 ? -1 : 1
const deepEq = (a1, a2) => a1.every((x, i) => x === a2[i]) && a1.length === a2.length


const getSingleWMCorner = (existingCorners) =>
  (existingCorners.length === 4 || !existingCorners.length) ? sample([1,2,3,4])
  : existingCorners.length === 1 ? opposingCorner(existingCorners[0])
  : sample(emptyCorners(existingCorners))

function getDoubleWMCorners(existingCorners) {
  if (existingCorners.length === 4 || !existingCorners.length) {
    return sample([[1, 4], [2,3], [1,2], [3,4]])
  } else if (deepEq(existingCorners, [1,4]) || deepEq(existingCorners, [2,3])) {
    return sample([[1, 4], [2,3]])
  } else if (existingCorners.length === 1) {
    return emptyCorners([existingCorners[0], opposingCorner(existingCorners[0])])
  } else {
    return [opposingCorner(existingCorners[0]), opposingCorner(existingCorners[1])]
  }
}


function displayBillData(wmCorners=[], showBorder=true, invertSig=false) {
  const infoComponentsY = 125 + (showBorder ? 0 : 20)
  const sigCorner = wmCorners.length === 1 ? opposingCorner(wmCorners[0]) : sample(emptyCorners(wmCorners))

  const serialCorner = sample(emptyCorners([sigCorner, ...wmCorners]))

  const sigX = 100 * cornerXDirection(sigCorner)
  const serialX = 110 * cornerXDirection(serialCorner)

  signature(sigX > 0 ? sigX + 85 : sigX, infoComponentsY * cornerYDirection(sigCorner), 10, invertSig)
  serialNumber(serialX < 0 ? serialX-65 : serialX, infoComponentsY * cornerYDirection(serialCorner))
}

function displayBillDataSide(wmCorners=[]) {
  const sigXMod = (wmCorners.includes(1) || wmCorners.includes(3) ? 1 : -1)
  const sigX = 160 * sigXMod
  const serialX = 170 * (sigXMod * -1)
  signature(sigX > 0 ? sigX + 80 : sigX, 0, 10, invertSig)
  serialNumber(serialX < 0 ? serialX-65 : serialX, 0)
}


function portrait() {
  const params = IS_VINTAGE ? {
    c1: -1,
    c2: 185,
  } : {
    holeR: 135,
    c1: 1,
    c2: -1,
    r1: 15,
    r2: 14,
    ...getHighlightPColors()
  }
  rosetteWithBackground(0,0, IS_VINTAGE ? 170 : 155, 0, params)

  const pSeed = rnd()

  if (pSeed < 0.75) {
    push()
    stroke(ROSETTE_STROKE_C)
    randomWatermark(0,0, IS_VINTAGE ? 30 : 50)
    pop()
  } else if (pSeed < 0.85) {
    drawStrAdj('$', 0, 0, 3, ROSETTE_STROKE_C)
  } else if (pSeed < 0.95) {
    drawCGK(0, 0, 200)
  } else {
    smilyFace(0,0, 250)
  }
}

function emblem(side) {
  const c1 = int(rnd(3, 11)) * posOrNeg()
  const p = genRosetteParams({
    strokeC: ACCENT_C,
    strokeW: 1,
    rDiff: 2,
    ignoreShrink: true,
    c1,
    c2: (c1 + 5) * posOrNeg()
  })


  dollarEchoRosette(200*side,20, 40, 0, p)
}

function sideNumber(side) {
  drawDenominationWithBorder(190*side, 20, 0.65, LIGHT_ACCENT_C, LIGHT_ACCENT_C)
}


const getHighlightPColors = () => !IS_VINTAGE ? ({
  strokeC: ROSETTE_STROKE_C,
  innerC: HIGHLIGHT ? ROSETTE_STROKE_C : LIGHTENED_DARK_C,
  outterC: HIGHLIGHT ? ROSETTE_FILL_C : ROSETTE_FILL_C,
}) : {}

function singleCenterPiece() {
  const allowHole = !IS_VINTAGE && rnd() < 0.5 // TODO lower maybe?
  const extraPieces = rnd() < 0.25 ? sample([1, 2]) : 0
  const p = getHighlightPColors()

  rosetteWithBackground(0,0,150, 0, p)
  if (allowHole) rosetteWithBackground(0,0,70, 0, {...p, holeR: 60})
  else if (extraPieces) {
    rosetteWithBackground(0,0,110, 0, 0, p)
    extraPieces > 1 && rosetteWithBackground(0,0,70, 0, 0, p)
  }

  if (allowHole || extraPieces < 2) {
    drawAdjDenomination(2,2, 1, DARK_C)
    drawAdjDenomination(0,0, 1, DARK_C, LIGHT_C)
  }
}


function bouquet() {
  const level = sample([1,2,3])
  const p = getHighlightPColors()

  if (level === 3) {
    const p0 = genParams(p)
    rosetteWithBackground(150,0,80, 0, p0)
    rosetteWithBackground(-150,0,80, 0, p0)
  }

  const p1 = genParams(p)
  rosetteWithBackground(110,0,100, 0, p1)
  rosetteWithBackground(-110,0,100, 0, p1)

  if (level > 1) {
    const p2 = genParams(p)
    rosetteWithBackground(60,0,130, 0, p2)
    rosetteWithBackground(-60,0,130, 0, p2)
  }

  const p3 = genParams(p)
  rosetteWithBackground(0,0,150, 0, p3)

  const p4 = genParams(p)
  rosetteWithBackground(0,0,70, 0, {...p4, holeR: DENOMINATION ? 60 : 0})

  drawStr(DENOMINATION, 2,2, 0.65, DARK_C)
  drawStr(DENOMINATION, 0,0, 0.65, DARK_C, HIGHLIGHT && DARK_C !== ACCENT_C ? ACCENT_C : LIGHT_C)

}

function rosetteSandwich() {
  const extraSeed = rnd()
  const p = getHighlightPColors()
  if (extraSeed < 0.125) {
    const p3 = genParams(p)
    rosetteWithBackground(25,-120,25, 0, p3)
    rosetteWithBackground(25,120,25, 0, p3)
    rosetteWithBackground(-25,-120,25, 0, p3)
    rosetteWithBackground(-25,120,25, 0, p3)
  }

  if (extraSeed < 0.25) {
    const p2 = genParams(p)
    rosetteWithBackground(50,-90,45, 0, p2)
    rosetteWithBackground(50,90,45, 0, p2)
    rosetteWithBackground(-50,-90,45, 0, p2)
    rosetteWithBackground(-50,90,45, 0, p2)
  }

  if (extraSeed < 0.5) {
    const p1 = genParams(p)
    rosetteWithBackground(90,-50,70, 0, p1)
    rosetteWithBackground(90,50,70, 0, p1)
    rosetteWithBackground(-90,-50,70, 0, p1)
    rosetteWithBackground(-90,50,70, 0, p1)
  }

  const p00 = genParams(p)
  rosetteWithBackground(130,0,90, 0, p00)
  rosetteWithBackground(-130,0,90, 0, p00)


  // drawStrAdj(getDenominationDisplay(), 2,2, 0.65, DARK_C)
  // drawStrAdj(getDenominationDisplay(), 0,0, 0.65, DARK_C)
  drawStrAdj(DENOMINATION, 2,2, 0.65, DARK_C)
  drawStrAdj(DENOMINATION, 0,0, 0.65, DARK_C, LIGHT_C)
}

function numberSandwich() {
  const p = getHighlightPColors()
  const p00 = genParams(p)
  rosetteWithBackground(0,0,120, 0, p00)

  const p1 = genParams(p)
  rosetteWithBackground(0,0,90, 0, p1)

  const p2 = genParams(p)
  rosetteWithBackground(0,0,60, 0, p2)


  // drawStrAdj(getDenominationDisplay(), 2,2, 0.65, DARK_C)
  // drawStrAdj(getDenominationDisplay(), 0,0, 0.65, DARK_C)
  drawStrAdj(DENOMINATION, -142,2, 0.65, DARK_C)
  drawStrAdj(DENOMINATION, 142,2, 0.65, DARK_C)
  drawStrAdj(DENOMINATION, -140,0, 0.65, DARK_C, LIGHT_C)
  drawStrAdj(DENOMINATION, 140,0, 0.65, DARK_C, LIGHT_C)
}



function stripLayout() {

  randomBgPattern()
  const stripSide = posOrNeg()


  if (rnd() < 0.1) {
    stripDenominationThirds(stripSide, true)
    stripDenominationThirds(0, true)
    stripDenominationThirds(stripSide*-1, true)
    serialNumber(-W/6-25, H/3)
    return
  }

  rnd() < 0.5 && stripBorder(stripSide)
  stripDenominationThirds(stripSide)

  const mainSeed = rnd()
  const mainX = W/-6*stripSide

  if (mainSeed < 0.5) {
    const p = getHighlightPColors()

    rosetteWithBackground(W/-6*stripSide,0, 180, 0, p)
    if (IS_VINTAGE || rnd() < 0.3125) {
      rosetteWithBackground(W/-6*stripSide,0, 135, 0, p)
      rosetteWithBackground(W/-6*stripSide,0, 90, 0, p)
      IS_VINTAGE && rosetteWithBackground(W/-6*stripSide,0, 70)
    }
    if (rnd() < 0.1)
      drawCGK(mainX, 0, 250)
  } else if (mainSeed < 0.8) {
    randomWatermark(mainX, 0, 100)
    if (rnd() < 0.1) drawCGK(mainX, 0, 250)
  } else if (mainSeed < 0.95) {
    drawCGK(mainX, 0, 250)
  } else {
    drawStrAdj(getDenominationDisplay(), mainX, 0, 3, DARK_C)
  }
  // smilyFace(W/-6*stripSide,0, 250)


  rnd() < 0.5 && cornerThing(-1*stripSide, 1)
  rnd() < 0.5 && cornerThing(-1*stripSide, -1)

  // stripDenominationThirds(0)
  // strip
    // left/right
    // border
    // top
      // denomination
      // denomination rotated
    // bottom
  // bottom strip
    // pattern
    // denomination
    // serial number
  // rest
    // lower strip
    // watermark
    //
}


function stripBorder(lOrR=-1) {
  line(W*lOrR/6-1, 20-H/2, W*lOrR/6-1, H/2-20)
  line(W*lOrR/6+1, 20-H/2, W*lOrR/6+1, H/2-20)
}


function sidewaysDenomination(x, y, direction=-1) {
  push()
  translate(x, y)
  rotate(direction*PI/2)
  drawStrAdj(getDenominationDisplay(), 0,0, 1.1, DARK_C)
  pop()
}

function stripDenominationThirds(lOrR=-1, full=false) {

  if (rnd() < 0.333 && !full) {
    drawStripThird(-H/3, lOrR)
    serialNumber(W/3*lOrR-30, H/3)
    // serialNumber(H/3 + 50, W/3*lOrR)
  } else if (rnd() < 0.666 && !full) {
    drawStripThird(H/3, lOrR)
    // serialNumber(110, 120)
    // serialNumber(50 - H/3, W/3*lOrR)

  } else {
    const num = sample([1,2,3])
    drawStripThird(-H/3, lOrR, num != 1)
    drawStripThird(0, lOrR, num != 2)
    drawStripThird(H/3, lOrR, num != 3)
  }
}

function drawStripThird(y, lOrR, canBeRosette=false) {
  const seed = rnd()
  const x = W/3*lOrR
  if (seed < 0.85 || !canBeRosette) {
    const d = getDenominationDisplay()
    drawStrAdj(d, x+2, y+2, 1.1, DARK_C)
    drawStrAdj(d, x, y, 1.1, LIGHT_C, HIGHLIGHT ? BRIGHT_DARK_C : DARK_C)

  }
  else {
    const p = getHighlightPColors()
    rosetteWithBackground(x, y, 55, 0, p)
  }
}

function cornerThing(lOrR=1, tOrB=1) {
  push()
  strokeCap(SQUARE)
  const x = W/2*lOrR
  const y = -H/2*tOrB
  line(x-35*lOrR, y+20*tOrB, x-10*lOrR, y+20*tOrB)
  line(x-10*lOrR, y+20*tOrB, x-10*lOrR, y+45*tOrB)

  line(x-35*lOrR, y+25*tOrB, x-15*lOrR, y+25*tOrB)
  line(x-15*lOrR, y+25*tOrB, x-15*lOrR, y+45*tOrB)
  pop()
}




























