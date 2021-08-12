function mainLayout() {
  let wmCorners = []
  let invertSig = false

  if (BG_TYPE === 'STANDARD') {
    drawBgPattern()
  } else if (BG_TYPE === 'WM2') { // =~ 76
    wmCorners = getDoubleWMCorners(CORNER_COMPONENT_LOCATIONS)
    rosetteCornerBg(wmCorners)
  } else if (BG_TYPE === 'WM1') { // =~ 63
    const wmCorner = getSingleWMCorner(CORNER_COMPONENT_LOCATIONS)
    wmCorners = [wmCorner]
    const x = 175 * cornerXDirection(wmCorner)
    const y = 80 * cornerYDirection(wmCorner, CORNER_COMPONENT_LOCATIONS.length === 4)
    const strokeC = HIGHLIGHT ? LIGHT_ACCENT_C : LIGHTENED_DARK_C
    prb(0.8)
      ? randomWatermark(x, y, strokeC)
      : drawCGK(x+15, y, 245, strokeC)
  } else if (BG_TYPE === 'FULL') {
    bg11()
    invertSig = true
  } else {/*no bg*/}


  SHOW_BORDER && randomBorder()
  displayCorners(CORNER_COMPONENT_LOCATIONS)

  switch (MAIN_CENTER_PIECE) {
    case 0: break
    case 1: singleCenterPiece(); break
    case 2: bouquet(); break
    case 3: portrait(); break
    case 4: rosetteSandwich(); break
  }


  const ancillarySide = posOrNeg()
  if (EMBLEM1) {
    EMBLEM_NUMBER1 ? sideNumber(ancillarySide) :
    EMBLEM_HOLO1 ? drawHolo(ancillarySide*205) :
    emblem(ancillarySide)
  }
  if (EMBLEM2) {
    EMBLEM_NUMBER2 ? sideNumber(ancillarySide*-1) :
    EMBLEM_HOLO2 ? drawHolo(ancillarySide*-205) :
    emblem(ancillarySide*-1)
  }

  if (MISPRINT_ROSETTE_FLURRY) rosetteFlurry()

  displayBillData(
    wmCorners.length || CORNER_COMPONENT_LOCATIONS.length === 4
      ? wmCorners
      : CORNER_COMPONENT_LOCATIONS,
    invertSig
  )
}


function getMainCenterPiece(seed) {
  if (IS_MAIN) {
    if (MISPRINT_MISSING_CENTER)
      return 0 // no center piece
    else if (seed < 0.6875)
      return 1 // single
    else if (seed < 0.8125)
      return 2 // bouquet
    else if (seed < 0.9375)
      return 3 // portrait
    else
      return 4 // rosette sandwich
  }
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
  } else if (cornerPatternSeed < 0.9375) {
    return [3, 4]
  } else {
    return [int(rnd(1,5))]
  }
}



function displayCorners(locations=[]) {
  push()
  strokeWeight(0.6*STROKE_MOD)
  const padding = 52
  const radius = 50

  const allHoles = prb(0.125)
  const selectHoles = locations.length === 4 && prb(0.5) ? [sample([1,3]), sample([2,4])] : []

  const params = genParams(getHighlightPColors())

  locations.forEach(location => {
    const [_x, _y] = CORNERS[location]
    const x = _x + (location%2===1 ? padding : -padding)
    const y = _y + (location<3 ? padding : -padding)
    const holeR = allHoles || selectHoles.includes(location) ? radius*0.75 : 0

    rosetteWithBackground(x, y, radius, 0, {...params, holeR})
    drawDenominationWithBorder(x, y, 0.3, ROSETTE_FILL_C, ROSETTE_STROKE_C)
  })
  pop()
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


function displayBillData(wmCorners=[], invertSig=false) {
  const infoComponentsY = 115 + (SHOW_BORDER ? 0 : 30)
  const sigCorner = wmCorners.length === 1 ? opposingCorner(wmCorners[0]) : sample(emptyCorners(wmCorners))

  const serialCorner = sample(emptyCorners([sigCorner, ...wmCorners]))

  const sigX = (SHOW_BORDER ? 150 : 120) * cornerXDirection(sigCorner)
  const serialX = 150 * cornerXDirection(serialCorner)

  signature(
    sigX > 0 ? sigX + 85 : sigX,
    infoComponentsY * cornerYDirection(sigCorner),
    10,
    invertSig
  )
  serialNumber(
    serialX < 0 ? serialX-65 : serialX,
    infoComponentsY * cornerYDirection(serialCorner)
  )
}

function displayBillDataStrip(stripSide, forceSide=false) {
  push()
  if (forceSide || prb(0.25)) {
    rotate(TWO_PI*0.75* stripSide)
    serialNumber(
      (-W/6-25),
      (-W/3) - 80
    )
    signature(
      (W/6+35),
      (-W/3) - 80,
      10,
    )
  } else {
    const l = stripSide > 0
    serialNumber(
      (W*5/12+(l ? 30 : -35))*-stripSide,
      H/3 + 15
    )
    signature(
      l ? 70 : -5,
      H/3 + 20,
      10,
    )
  }
  pop()
}

// function displayBillDataSide(wmCorners=[]) {
//   const sigXMod = (wmCorners.includes(1) || wmCorners.includes(3) ? 1 : -1)
//   const sigX = 160 * sigXMod
//   const serialX = 170 * (sigXMod * -1)
//   signature(sigX > 0 ? sigX + 80 : sigX, 0, 10, invertSig)
//   serialNumber(serialX < 0 ? serialX-65 : serialX, 0)
// }


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
  if (NO_NATURAL_DENOMINATION || pSeed < 0.1) {
    drawSnazzyDenomination(0,0,2.3)

  } else if (pSeed < 0.80) {
    randomWatermark(0,0, ROSETTE_STROKE_C, IS_VINTAGE ? 0.5 : 0.7)
  } else if (pSeed < 0.92) {
    drawCGK(0, 0, 200) // 0.8125 * .125 * 0.1 *0.825 =~ 8
  } else if (pSeed < 0.98){
    smilyFace(0,0, 250) // 0.8125 * .125 * 0.05 *0.825 =~ 4
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


  dollarEchoRosette(210*side,20, 40, 0, p)
}

function sideNumber(side) {
  drawDenominationWithBorder(205*side, 20, 0.65, LIGHT_ACCENT_C, LIGHT_ACCENT_C)
}


const getHighlightPColors = () => !IS_VINTAGE ? ({
  strokeC: ROSETTE_STROKE_C,
  innerC: HIGHLIGHT ? ROSETTE_STROKE_C : LIGHTENED_DARK_C,
  outterC: HIGHLIGHT ? ROSETTE_FILL_C : ROSETTE_FILL_C,
}) : {}

function singleCenterPiece() {
  const allowHole = !IS_VINTAGE && prb(0.5)
  const extraPieces = prb(0.25) ? sample([1, 2]) : 0
  const p = getHighlightPColors()

  rosetteWithBackground(0,0,150, 0, p)
  if (allowHole) rosetteWithBackground(0,0,70, 0, {...p, holeR: 60})
  else if (extraPieces) {
    rosetteWithBackground(0,0,110, 0, 0, p)
    extraPieces > 1 && rosetteWithBackground(0,0,70, 0, 0, p)
  }

  if (NO_NATURAL_DENOMINATION || allowHole || extraPieces < 2 || prb(0.9375)) {
    drawSnazzyDenomination(0,0,1)
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

  drawSnazzyDenomination(0,0,0.65)
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



  drawSnazzyDenomination(0,0,0.65)
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


function gridLayout() {
  drawBgPattern()
  stripDenominationThirds(1, true)
  stripDenominationThirds(0, true)
  stripDenominationThirds(-1, true)
  displayBillDataStrip(posOrNeg(), true)
}

function stripLayout() {
  drawBgPattern()
  const stripSide = posOrNeg()

  prb(0.5) && stripBorder(stripSide)
  stripDenominationThirds(stripSide)

  const mainSeed = rnd()
  const mainX = W/-6*stripSide

  if (mainSeed < 0.65 || FORCE_SHOW_ROSETTE) {
    const p = getHighlightPColors()

    rosetteWithBackground(W/-6*stripSide,0, 180, 0, p)
    if (IS_VINTAGE || prb(0.3125)) {
      rosetteWithBackground(W/-6*stripSide,0, 135, 0, p)
      rosetteWithBackground(W/-6*stripSide,0, 90, 0, p)
      IS_VINTAGE && rosetteWithBackground(W/-6*stripSide,0, 70)
    }
    if (prb(0.1))
      drawCGK(mainX, 0, 245) // .1875 * .9 * .65 *.1 =~ 11
  } else if (mainSeed < 0.90) {
    randomWatermark(mainX, 0)
    if (prb(0.1) || BG_PATTERN === 0)
      drawCGK(mainX, 0, 245) // .1875 * .9 * .17 *.1 =~ 3
  } else if (mainSeed < 0.97) {
    drawCGK(mainX, 0, 245) // .1875 * .9 * .15 =~ 25
  } else if (mainSeed < 0.99) {
    drawSnazzyDenomination(mainX, 0, 3)

  } else {
    smilyFace(W/-6*stripSide,0, 300) // .1875 * .9 * .01 =~ 1 or 2
  }


  prb(0.5) && cornerThing(-1*stripSide, 1)
  prb(0.5) && cornerThing(-1*stripSide, -1)

  displayBillDataStrip(stripSide)
}


function stripBorder(lOrR=-1) {
  push();
  HIGHLIGHT && stroke(BRIGHT_DARK_C)
  line(W*lOrR/6-1, 20-H/2, W*lOrR/6-1, H/2-20)
  line(W*lOrR/6+1, 20-H/2, W*lOrR/6+1, H/2-20)
  pop()
}

function stripDenominationThirds(lOrR=-1, full=false) {
  if (prb(0.5) && !full) {
    drawStripThird(
      H/3 * (prb(0.5) ? 1 : -1),
      lOrR,
    )

  } else {
    const num = sample([1,2,3])
    drawStripThird(-H/3, lOrR, num != 1)
    drawStripThird(0, lOrR, num != 2)
    drawStripThird(H/3, lOrR, num != 3)
  }
}

function drawStripThird(y, lOrR, canBeRosette=false) {
  const x = W/3*lOrR
  const forceRosette = FORCE_SHOW_ROSETTE && !y && !lOrR

  if (forceRosette || prb(0.15) && canBeRosette) {
    const p = getHighlightPColors()
    rosetteWithBackground(x, y, 55, 0, p)
  } else {
    drawSnazzyDenomination(x, y, 1.1)

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



function rosetteFlurry() {
  times(25, i => {
    let b = rnd(25, 200)
    const x = rnd(L, R)
    const y = rnd(T, B)
    rosetteWithBackground(x, y, b, prb(0.5) ? 0 : rnd(b/5, b), {skipBg: prb(0.9)})
    prb(0.5) && drawSnazzyDenomination(x, y,b/120)
  })

}