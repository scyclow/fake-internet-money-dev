function fuckItDoTheLayoutFromScratch() {
  squigTexture()
  pointTexture()


  const centerPieceSeed = rnd()
  // if (centerPieceSeed < 0.1)
    // CENTER_PIECE = 0 // no center piece
  // else if (centerPieceSeed < 0.2)
    // CENTER_PIECE = 1 // single
  // else if (centerPieceSeed < 0.3)
    // CENTER_PIECE = 2 // bouquet
  // else if (centerPieceSeed < 0.4)
    // CENTER_PIECE = 3 // portrait
  // else if (centerPieceSeed < 0.5)
    // CENTER_PIECE = 4 // single center piece offset 1/2
  // else if (centerPieceSeed < 0.6)
    // CENTER_PIECE = 5 // single center piece offset 2/3
  // else if (centerPieceSeed < 0.7)
    // CENTER_PIECE = 6 // number sandwich
  // else if (centerPieceSeed < 0.8)
    // CENTER_PIECE = 7 // rosette sandwich
  // else if (centerPieceSeed < 0.9)
    // CENTER_PIECE = 8 // rosette sandwich clusterfuck borders
  // else if (centerPieceSeed < 1)
    // CENTER_PIECE = 9 // total chaos
  CENTER_PIECE = 7//sample([1,2,3, 6, 7])


  const showBorder = [0, 1, 2, 3, 6, 7, 8].includes(CENTER_PIECE) && rnd() < 0.75
  const cornerComponentLocations = showBorder || rnd() < 0.8 ? cornerLocations() : []
  const sideSpace = [0,1,3,9].includes(CENTER_PIECE)

  // portrait()




  const bgSeed = rnd()
  let wmCorners = []

  if (showBorder) {
    randomBgPattern()
  } else if (bgSeed < 0.5625) {
    wmCorners = getDoubleWMCorners(cornerComponentLocations)
    bg9(wmCorners)
  } else if (bgSeed < 0.8125) {
    const wmCorner = getSingleWMCorner(cornerComponentLocations)
    wmCorners = [wmCorner]
    randomWatermark(
      150 * cornerXDirection(wmCorner),
      60 * cornerYDirection(wmCorner, cornerComponentLocations.length === 4),
      120
    )
  } else if (bgSeed < 0.9375) {
    rnd() < 0.5 ? bg10() : bg11()
  } else {/*no bg*/}


  showBorder && randomBorder()
  displayCorners(cornerComponentLocations)

  switch (CENTER_PIECE) {
    case 0: break
    case 1: singleCenterPiece(); break
    case 2: bouquet(DENOMINATION, sample([1,2,3])); break
    case 3: portrait(); break
    case 6: numberSandwich(); break
    case 7: rosetteSandwich(); break
  }


  if (sideSpace && rnd() < 0.0625) emblem(posOrNeg())

  // if (CENTER_PIECE === 3) displayBillDataSide(wmCorners)
  // else
    displayBillData(
    wmCorners.length || cornerComponentLocations.length === 4
      ? wmCorners
      : cornerComponentLocations,
    showBorder,
  )



  // large single rosette
    // double
    // hole/no hole
    // denomination/no denomination
  // bouquet
  // portrait
    // object
    // smiley
    // cgk
    // dollar sign
    // empty
  // something takes up half of bill
    // single rosette
    // watermark
  // rosette takes up 2/3 of bill
  // rosette sandwich
  // number sandwich
  // no center piece
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
  const colors = rnd() < 0.5 ? [STROKE_C, FILL_C] : [FILL_C, STROKE_C]
  // TODO can probably refactor this
  const vintage = ROSETTE_STYLE === 'VINTAGE'
  const padding = 57
  const radius = 55

  const denominationC = vintage ? colors[1] : colors[0]
  const denominationOutlineC = vintage ? colors[0] : colors[1]
  const params = vintage ? genVintageRosetteParams({strokeC: STROKE_C}) : genRosetteParams({strokeC: colors[0]})

  locations.forEach(location => {
    const [_x, _y] = CORNERS[location]
    const x = _x + (location%2===1 ? padding : -padding)
    const y = _y + (location<3 ? padding : -padding)

    rosetteWithBackground(x, y, radius, 0, params)
    drawStr(DENOMINATION, x+1, y+1, 0.35, denominationOutlineC)
    drawStr(DENOMINATION, x-1, y-1, 0.35, denominationOutlineC)
    drawStr(DENOMINATION, x-1, y+1, 0.35, denominationOutlineC)
    drawStr(DENOMINATION, x+1, y-1, 0.35, denominationOutlineC)
    drawStr(DENOMINATION, x, y, 0.35, denominationC)
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


function displayBillData(wmCorners=[], showBorder=true) {
  const infoComponentsY = 120 + (showBorder ? 0 : 20)
  const sigCorner = wmCorners.length === 1 ? opposingCorner(wmCorners[0]) : sample(emptyCorners(wmCorners))

  const serialCorner = sample(emptyCorners([sigCorner, ...wmCorners]))


  const sigX = 100 * cornerXDirection(sigCorner)
  const serialX = 110 * cornerXDirection(serialCorner)

  signature(sigX > 0 ? sigX + 85 : sigX, infoComponentsY * cornerYDirection(sigCorner), 10)
  serialNumber(serialX < 0 ? serialX-65 : serialX, infoComponentsY * cornerYDirection(serialCorner), '99999999')
}

function displayBillDataSide(wmCorners=[]) {
  const sigXMod = (wmCorners.includes(1) || wmCorners.includes(3) ? 1 : -1)
  const sigX = 160 * sigXMod
  const serialX = 170 * (sigXMod * -1)
  signature(sigX > 0 ? sigX + 80 : sigX, 0, 10)
  serialNumber(serialX < 0 ? serialX-65 : serialX, 0, '99999999')
}


function portrait() {
  rosetteWithBackground(0,0,155, 0, {
    holeR: 135,
    c1: 1,
    c2: -1,
    r1: 15,
    r2: 14,
    innerC: STROKE_LIGHT_C,
    outterC: STROKE_C
  })

  const pSeed = rnd()

  if (pSeed < 0.75) {
    push()
    stroke(FILL_C)
    randomWatermark(0,0, 50)
    pop()
  } else if (pSeed < 0.85) {
    drawStrAdj('$', 0, 0, 3, STROKE_C)
  } else if (pSeed < 0.95) {
    drawCGK(0, 0, 200)
  } else {
    smilyFace(0,0, 250)
  }
}

function emblem(side) {
  const c1 = int(rnd(3, 11)) * posOrNeg()
  const p = genRosetteParams({
    innerC: ACCENT_C,
    outterC: STROKE_C,
    strokeMod: 6,
    c1,
    c2: (c1 + 5) * posOrNeg()
  })

  dollarRosetteBg(200*side,20, 45, 0, p)
  dollarEchoRosette(200*side,20, 40, 10, p)

  if (rnd() < 0.2) {
    dollarRosetteBg(200*side*-1,20, 45, 0, p)
    dollarEchoRosette(200*side*-1,20, 40, 10, p)
  }
}

function singleCenterPiece() {
  const seed = rnd()
  if (seed < 0.25) singleCenterWithHole()
  else if (seed < 0.5) singleCenterNoHole()
  else if (seed < 0.75) singleCenterGradient()
  else doubleCenter()
}

function bouquet(d, level) {
  if (level === 3) {
    const p0 = genParams()
    rosetteWithBackground(150,0,80, 0, p0)
    rosetteWithBackground(-150,0,80, 0, p0)
  }

  const p1 = genParams()
  rosetteWithBackground(110,0,100, 0, p1)
  rosetteWithBackground(-110,0,100, 0, p1)

  if (level > 1) {
    const p2 = genParams()
    rosetteWithBackground(60,0,130, 0, p2)
    rosetteWithBackground(-60,0,130, 0, p2)
  }

  const p3 = genParams()
  rosetteWithBackground(0,0,150, 0, p3)

  const p4 = genParams()
  rosetteWithBackground(0,0,70, 0, {...p4, holeR: d ? 60 : 0})

  if (d) {
    drawStr(DENOMINATION, 2,2, 0.65, STROKE_C)
    drawStr(DENOMINATION, 0,0, 0.65, STROKE_C, FILL_C)
  }
}


function singleCenterWithHole() {
  const centerP = genRosetteParams({
    strokeC: FILL_C,
    innerC: STROKE_LIGHT_C,
    outterC: STROKE_C,
  })
  rosetteWithBackground(0,0,150, 0, centerP)
  rosetteWithBackground(0,0,70, 0, {...centerP, holeR: 60})

  drawStr(DENOMINATION, 2,2, 0.65, STROKE_C)
  drawStr(DENOMINATION, 0,0, 0.65, STROKE_C, FILL_C)
}

function singleCenterNoHole() {
  rosetteWithBackground(0,0,150)

  drawStr(DENOMINATION, 2,2, 1, STROKE_C)
  drawStr(DENOMINATION, 0,0, 1, STROKE_C, FILL_C)
}

function singleCenterGradient() {
  const centerP = genRosetteParams({
    strokeC: FILL_C,
    innerC: GRADIENT_C,
    outterC: STROKE_C,
  })
  rosetteWithBackground(0,0,150, 0, centerP)
  rosetteWithBackground(0,0,70, 0, {...centerP, holeR: 60})

  drawStr(DENOMINATION, 2,2, 0.65, STROKE_C)
  drawStr(DENOMINATION, 0,0, 0.65, STROKE_C, FILL_C)
}


function doubleCenter() {
  rosetteWithBackground(0,0,150)
  rosetteWithBackground(0,0,110, 60)


  drawStr(DENOMINATION, 2,2, 0.65, STROKE_C)
  drawStr(DENOMINATION, 0,0, 0.65, STROKE_C, FILL_C)
}












































function standardLayout() {
  squigTexture()
  pointTexture()

  if (rnd() < 0.25) {
    randomBorderlessBg()
  } else {
    randomBgPattern()
    randomBorder()
  }


  // single center piece
    // emblem on one side, watermark on other side

  // portrait
    // empty
    // denomination
    // watermark
    // cgk
    // smiley face


  const centerSeed = rnd()
  if (centerSeed < 0.5) {
    singleCenterPiece()
    if (rnd() < 0.2) emblem(posOrNeg())
  }
  else if (centerSeed < 0.65)
    rosetteSandwich()
  else if (centerSeed < 0.8) numberSandwich()
  else bouquet(DENOMINATION, sample([1,2,3]))


  // MISPRINT
  //rosetteFlurry()

  // TODO have some corners not show number, some numbers without rosettes
  // TODO have bg9 match up or contrast with corners

  if (rnd() < 0.95) corners()




  serialNumber(110, 120, '99999999')
  signature(-100, 120, 10)
}


function stripLayout() {
  squigTexture()
  pointTexture()

  randomBgPattern()
  const stripSide = posOrNeg()


  if (rnd() < 0.1) {
    stripDenominationThirds(stripSide, true)
    stripDenominationThirds(0, true)
    stripDenominationThirds(stripSide*-1, true)
    serialNumber(-W/6-25, H/3, '99999999')

    return
  }

  rnd() < 0.5 && stripBorder(stripSide)
  stripDenominationThirds(stripSide)

  const mainSeed = rnd()
  const mainX = W/-6*stripSide

  if (mainSeed < 0.5) {
    rosetteWithBackground(W/-6*stripSide,0, 180)
    if (rnd() < 0.1) drawCGK(mainX, 0, 250)
  } else if (mainSeed < 0.8) {
    randomWatermark(mainX, 0, 100)
    if (rnd() < 0.1) drawCGK(mainX, 0, 250)
  } else if (mainSeed < 0.95) {
    drawCGK(mainX, 0, 250)
  } else {
    drawStrAdj(getDenominationDisplay(), mainX, 0, 3, STROKE_C)
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

const sidewaysDenomination = (x, y, direction=-1) =>

function sidewaysDenomination(x, y, direction=-1) {
  push()
  translate(x, y)
  rotate(direction*PI/2)
  drawStrAdj(getDenominationDisplay(), 0,0, 1.1, STROKE_C)
  pop()
}

function stripDenominationThirds(lOrR=-1, full=false) {

  if (rnd() < 0.333 && !full) {
    drawStripThird(-H/3, lOrR)
    serialNumber(W/3*lOrR-30, H/3, '99999999')
    // serialNumber(H/3 + 50, W/3*lOrR, '99999999')
  } else if (rnd() < 0.666 && !full) {
    drawStripThird(H/3, lOrR)
    // serialNumber(110, 120, '99999999')
    // serialNumber(50 - H/3, W/3*lOrR, '99999999')

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
  if (seed < 0.85 || !canBeRosette) drawStrAdj(getDenominationDisplay(), x, y, 1.1, STROKE_C)
  else {
    rosetteWithBackground(x, y, 55)
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


// function horizontalStripe(x) {
//   push()
//   scale(1/GRAPHIC_RESOLUTION)
//   // stripeGraphic.scale(GRAPHIC_RESOLUTION)

//   stripeGraphic.translate(W/2, H/2)
//   const centerP = genRosetteParams({strokeC: FILL_C})

//   stripeGraphic.background(STROKE_C)
//   stripeGraphic.noFill()
//   dollarRosette(50,500,1200, 0, centerP, stripeGraphic)


//   image(stripeGraphic, -W*GRAPHIC_RESOLUTION/2, -H*GRAPHIC_RESOLUTION/2)
//   pop()
// }





function rosetteFlurry() {
  times(10, i => {
    rosetteWithBackground(rnd(-W/2, W/2),rnd(-H/2, H/2), 180 - i*15)
  })
}


function rosetteSandwich() {


  const p2 = genParams()
  rosetteWithBackground(70,-100,45, 0, p2)
  rosetteWithBackground(70,100,45, 0, p2)
  rosetteWithBackground(-70,-100,45, 0, p2)
  rosetteWithBackground(-70,100,45, 0, p2)

  const p1 = genParams()
  rosetteWithBackground(100,-50,70, 0, p1)
  rosetteWithBackground(100,50,70, 0, p1)
  rosetteWithBackground(-100,-50,70, 0, p1)
  rosetteWithBackground(-100,50,70, 0, p1)

  const p00 = genParams()
  rosetteWithBackground(130,0,90, 0, p00)
  rosetteWithBackground(-130,0,90, 0, p00)



  // drawStrAdj(getDenominationDisplay(), 2,2, 0.65, STROKE_C)
  // drawStrAdj(getDenominationDisplay(), 0,0, 0.65, STROKE_C)
  drawStrAdj(DENOMINATION, 2,2, 0.65, STROKE_C)
  drawStrAdj(DENOMINATION, 0,0, 0.65, STROKE_C, FILL_C)
}

function numberSandwich() {
  const p00 = genParams()
  rosetteWithBackground(0,0,90, 0, p00)

  const p1 = genParams()
  rosetteWithBackground(0,0,70, 0, p1)

  const p2 = genParams()
  rosetteWithBackground(0,0,45, 0, p2)


  // drawStrAdj(getDenominationDisplay(), 2,2, 0.65, STROKE_C)
  // drawStrAdj(getDenominationDisplay(), 0,0, 0.65, STROKE_C)
  drawStrAdj(DENOMINATION, -132,2, 0.65, STROKE_C)
  drawStrAdj(DENOMINATION, 132,2, 0.65, STROKE_C)
  drawStrAdj(DENOMINATION, -130,0, 0.65, STROKE_C, FILL_C)
  drawStrAdj(DENOMINATION, 130,0, 0.65, STROKE_C, FILL_C)
}




function corners() {
  const colors = rnd() < 0.5 ? [STROKE_C, FILL_C] : [FILL_C, STROKE_C]
  // TODO can probably refactor this
  const vintage = ROSETTE_STYLE === 'VINTAGE'
  const padding = 57
  const radius = 55


  const denominationC = vintage ? colors[1] : colors[0]
  const denominationOutlineC = vintage ? colors[0] : colors[1]
  const params = vintage ? genVintageRosetteParams({strokeC: colors[0]}) : genRosetteParams({strokeC: colors[0]})

  const T = padding-H/2
  const L = padding-W/2
  const B = H/2-padding
  const R = W/2-padding

  let show = []
  const cornerPatternSeed = rnd()

  if (cornerPatternSeed < 0.25) {
    show = [[L, T],[R, T], [L, B], [R, B]]
  } else if (cornerPatternSeed < 0.5) {
    show = [[L, T], [R, B]]
  } else if (cornerPatternSeed < 0.75) {
    show = [[R, T], [L, B]]
  } else if (cornerPatternSeed < 0.86) {
    show = [[L, T], [R, T]]
  } else if (cornerPatternSeed < 0.94) {
    show = [[L, B], [R, B]]

  } else if (cornerPatternSeed < 0.96) {
    show = [[L, T]]
  } else if (cornerPatternSeed < 0.98) {
    show = [[R, T]]
  } else if (cornerPatternSeed < 0.99) {
    show = [[L, B]]
  } else {
    show = [[R, B]]
  }

  show.forEach(([x, y]) => {
    rosetteWithBackground(x, y, radius, 0, params)
    // bgFn(x, y, radius, 0, {...params, strokeC: colors[1]})
    // frameFn(x, y, radius, 0, params)
    drawStr(DENOMINATION, x+1, y+1, 0.35, denominationOutlineC)
    drawStr(DENOMINATION, x-1, y-1, 0.35, denominationOutlineC)
    drawStr(DENOMINATION, x-1, y+1, 0.35, denominationOutlineC)
    drawStr(DENOMINATION, x+1, y-1, 0.35, denominationOutlineC)
    drawStr(DENOMINATION, x, y, 0.35, denominationC)
  })
}




function sideEmblemDollar() {

  textSize(60)
  textAlign(CENTER, CENTER)
  strokeWeight(0.5)
  bg7()
  // oversaturaedRosette()
  // middleRosette(80)
  // drawBorderGraphic(() => {
  // //   trancendentalMoneyBg()
  //   border8()
  // // //   border2(10)
  // // //   border1(15)
  // // //   border1(30)

  // })

  // rosetteCorners()

  // // dollarRosette(0, 0, 100, 75)

  // translate(100,0)
  // interestingPattern4()
  // translate(-100,0)
  // const params = genRosetteParams()
  // dollarLineRosette(0,0,200, 80, params)
  // strokeWeight(2)




  strokeWeight(1)
  fill(0)
  text(10, -80,0)



  textSize(16)
  // stroke(color(H, 100, 0))
  // fill(color(H, 100, 70))
  strokeWeight(1)
  text('909090909090', 100,110)
  text('909090909090', -100,-110)
}

function standardDollar() {
  push()
  const h = 86

  textSize(60)
  textAlign(CENTER, CENTER)
  // border2(10)

  // border1(15)
  // border1(30)

  rosetteCorners()

  const params = genRosetteParams()
  // rosetteBg(0, 0, 100, 75, params)
  rosetteWithBackground(0, 0, 100, 75, params)


  textSize(16)
  stroke(color(h, 100, 0))
  fill(color(h, 100, 70))
  strokeWeight(1)
  text('909090909090', 100,110)
  text('909090909090', -100,-110)
  signature(-75,100, 10)
  pop()
}

function rosetteCorners() {
  strokeWeight(0.25)
  const params = genRosetteParams()
  const cornerPadding = 70
  rosetteWithBackground(-W/2+cornerPadding, -H/2+cornerPadding, cornerPadding, cornerPadding/2, params)

  rosetteWithBackground(W/2-cornerPadding, -H/2+cornerPadding, cornerPadding, cornerPadding/2, params)

  rosetteWithBackground(-W/2+cornerPadding, H/2-cornerPadding, cornerPadding, cornerPadding/2, params)

  rosetteWithBackground(W/2-cornerPadding, H/2-cornerPadding, cornerPadding, cornerPadding/2, params)
}


const withStyle = (cb) => {
  // stroke(STROKE_C)
  // strokeWeight(2)
  // cb()
  // stroke(STROKE_C2)
  // strokeWeight(1)
  // cb()
}


function middleRosette(radius=100, rosetteFn, rosetteBgFn, paramsFn, radAdj) {
  // strokeWeight(0.25)
  const params1 = paramsFn()
  const params2 = paramsFn()
  const smallRadius = 50


  // strokeWeight(0.5)
  // withStyle(() => rosetteBgFn(-125, 0,radius, radius*radAdj, params1))
  withStyle(() => rosetteWithBackground(-125, 0, radius, radius*radAdj, params1))
  // rosetteBgFn(-125, 0,smallRadius, smallRadius*0.7, params1)
  rosetteWithBackground(-125, 0, smallRadius, smallRadius*0.7, params1)

  // withStyle(() => rosetteBgFn(125, 0,radius, radius*radAdj, params1))
  withStyle(() => rosetteWithBackground(125, 0, radius, radius*radAdj, params1))

  // rosetteBgFn(125, 0,smallRadius, smallRadius*0.7, params1)
  rosetteWithBackground(125, 0, smallRadius, smallRadius*0.7, params1)

  // withStyle(() => rosetteBgFn(0, 0, radius*1.2, radius*1.2*radAdj, params2))
  withStyle(() => rosetteWithBackground(0, 0, radius*1.2, radius*1.2*radAdj, params2))


  // strokeWeight(3)
  // const denomination = shuffle([1, 2, 5, 10, 20, 50, 100]).pop()
  // text(denomination, 0,0)
}


