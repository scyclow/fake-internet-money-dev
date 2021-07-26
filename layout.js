function standardLayout() {
  squigTexture()
  pointTexture()

  if (rnd() < 0.25) {
    randomBorderlessBg()
  } else {
    randomBgPattern()
    randomBorder()
  }

  corners1()
  centerPiece()

  serialNumber(110, 120, '99999999')
  signature(-100, 120, 10)
}


function stripLayout() {
  squigTexture()
  pointTexture()
  const x = 0
  const y = 0

  // stripBorder(1)
  // stripDenominationThirds(1)



  rnd() < 0.5 && stripBorder(-1)

  stripDenominationThirds(-1)

  randomWatermark(W/6, 0, 100)

  rnd() < 0.5 && cornerThing(1, 1)
  rnd() < 0.5 && cornerThing(1, -1)

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
  drawStrAdj(getDenominationDisplay(), 0,0, 1.1, STROKE_C)
  pop()
}

function stripDenominationThirds(lOrR=-1) {
  drawStripThird(-H/3, lOrR)
  drawStripThird(0, lOrR, true)
  drawStripThird(H/3, lOrR, true)
}

function drawStripThird(y, lOrR, canBeBlank=false) {
  const seed = rnd()
  const x = W/3*lOrR
  if (seed < 0.1 && canBeBlank) {}
  else if (seed < 0.85) drawStrAdj(getDenominationDisplay(), x, y, 1.1, STROKE_C)
  else {
    const params = genRosetteParams({strokeC: FILL_C})
    dollarRosetteBg(x,y, 55, 0, {
      ...params,
      strokeC: STROKE_C,
    })
    dollarRosette(x,y,55, 0, params)
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



function centerPiece() {
  const seed = rnd()
  if (seed < 0.25) singleCenterWithHole()
  else if (seed < 0.5) singleCenterNoHole()
  else if (seed < 0.75) singleCenterGradient()
  else doubleCenter()
  // single with center hole
  // single without center hole
  // double
}

function singleCenterWithHole() {
  const centerP = genRosetteParams({strokeC: FILL_C})

  dollarRosetteBg(0,0, 150, 0, {
    ...centerP,
    strokeC: STROKE_C,
  })
  dollarRosette(0,0,150, 0, centerP)

  dollarRosetteBg(0,0, 67, 0, {
    ...centerP,
    strokeC: STROKE_C,
    // outterC: STROKE_C,
    // innerC: BRIGHT_C,
  })
  dollarRosette(0,0,70, 60, centerP)

  drawStr(DENOMINATION, 2,2, 0.7, STROKE_C)
  drawStr(DENOMINATION, 0,0, 0.7, STROKE_C, FILL_C)
}

function singleCenterNoHole() {
  const centerP = genRosetteParams({strokeC: FILL_C})

  dollarRosetteBg(0,0, 150, 0, {
    ...centerP,
    strokeC: STROKE_C,
  })
  dollarRosette(0,0,150, 0, centerP)

  drawStr(DENOMINATION, 2,2, 1, STROKE_C)
  drawStr(DENOMINATION, 0,0, 1, STROKE_C, FILL_C)
}

function singleCenterGradient() {
  const centerP = genRosetteParams({strokeC: FILL_C})

  dollarRosetteBg(0,0, 150, 0, {
    ...centerP,
    strokeC: STROKE_C,
    innerC: ACCENT_C,
    outterC: STROKE_C,
  })
  dollarRosette(0,0,150, 0, centerP)

  dollarRosetteBg(0,0, 67, 0, {
    ...centerP,
    outterC: STROKE_C,
    innerC: ACCENT_C,
    strokeC: STROKE_C,
  })
  dollarRosette(0,0,70, 60, centerP)

  drawStr(DENOMINATION, 2,2, 0.7, STROKE_C)
  drawStr(DENOMINATION, 0,0, 0.7, STROKE_C, FILL_C)
}


function doubleCenter() {
  const centerP = genRosetteParams({strokeC: FILL_C})
  const secondP = genRosetteParams({strokeC: FILL_C})

  dollarRosetteBg(0,0, 150, 0, {
    ...centerP,
    strokeC: STROKE_C,
  })
  dollarRosette(0,0,150, 0, centerP)

  dollarRosetteBg(0,0, 110, 0, {
    ...secondP,
    strokeC: STROKE_C,
    // outterC: STROKE_C,
    // innerC: BRIGHT_C,
  })
  dollarRosette(0,0,110, 60, secondP)

  drawStr(DENOMINATION, 2,2, 0.7, STROKE_C)
  drawStr(DENOMINATION, 0,0, 0.7, STROKE_C, FILL_C)
}





function corners1() {
  const colors = rnd() < 0.5 ? [STROKE_C, FILL_C] : [FILL_C, STROKE_C]
  const floral = false//rnd() < 0.5
  const padding = floral ? 58 : 62
  const radius = floral ? 40 : 60
  const frameFn = floral ? floralRosette : dollarRosette
  const bgFn = floral ? () => {} : dollarRosetteBg
  const denominationC = floral ? colors[1] : colors[0]
  const denominationOutlineC = floral ? colors[0] : colors[1]
  const params = floral ? genFloralRosetteParams({fillC: colors[0]}) : genRosetteParams({strokeC: colors[0]})

  const T = padding-H/2
  const L = padding-W/2
  const B = H/2-padding
  const R = W/2-padding

  let show = []
  const cornerPatternSeed = rnd()

  if (cornerPatternSeed < 0.25) {
    show = [[L, T],[R, T], [L, B], [R, B]]
  } else if (cornerPatternSeed < 0.45) {
    show = [[L, T], [R, B]]
  } else if (cornerPatternSeed < 0.65) {
    show = [[R, T], [L, B]]
  } else if (cornerPatternSeed < 0.7) {
    show = [[L, T]]
  } else if (cornerPatternSeed < 0.75) {
    show = [[R, T]]
  } else if (cornerPatternSeed < 0.8) {
    show = [[L, B]]
  } else if (cornerPatternSeed < 0.85) {
    show = [[R, B]]
  } else if (cornerPatternSeed < 0.9) {
    show = [[L, T], [R, T]]
  } else if (cornerPatternSeed < 0.95) {
    show = [[L, B], [R, B]]
  }

  show.forEach(([x, y]) => {
    bgFn(x, y, radius, 0, {...params, strokeC: colors[1]})
    frameFn(x, y, radius, 0, params)
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
  drawBorderGraphic(() => {
  //   trancendentalMoneyBg()
    border8()
  // //   border2(10)
  // //   border1(15)
  // //   border1(30)

  })

  rosetteCorners()

  // dollarRosette(0, 0, 100, 75)

  translate(100,0)
  interestingPattern4()
  translate(-100,0)
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
  rosetteBg(0, 0, 100, 75, params)
  dollarRosette(0, 0, 100, 75, params)


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
  rosetteBg(-W/2+cornerPadding, -H/2+cornerPadding, cornerPadding, cornerPadding/2, params)
  dollarRosette(-W/2+cornerPadding, -H/2+cornerPadding, cornerPadding, cornerPadding/2, params)

  rosetteBg(W/2-cornerPadding, -H/2+cornerPadding, cornerPadding, cornerPadding/2, params)
  dollarRosette(W/2-cornerPadding, -H/2+cornerPadding, cornerPadding, cornerPadding/2, params)

  rosetteBg(-W/2+cornerPadding, H/2-cornerPadding, cornerPadding, cornerPadding/2, params)
  dollarRosette(-W/2+cornerPadding, H/2-cornerPadding, cornerPadding, cornerPadding/2, params)

  rosetteBg(W/2-cornerPadding, H/2-cornerPadding, cornerPadding, cornerPadding/2, params)
  dollarRosette(W/2-cornerPadding, H/2-cornerPadding, cornerPadding, cornerPadding/2, params)
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


  // strokeWeight(0.5)
  withStyle(() => rosetteBgFn(-125, 0,radius, radius*radAdj, params1))
  withStyle(() => rosetteFn(-125, 0, radius, radius*radAdj, params1))
  // rosetteBgFn(-125, 0,smallRadius, smallRadius*0.7, params1)
  // rosetteFn(-125, 0, smallRadius, smallRadius*0.7, params1)

  withStyle(() => rosetteBgFn(125, 0,radius, radius*radAdj, params1))
  withStyle(() => rosetteFn(125, 0, radius, radius*radAdj, params1))

  // rosetteBgFn(125, 0,smallRadius, smallRadius*0.7, params1)
  // rosetteFn(125, 0, smallRadius, smallRadius*0.7, params1)

  withStyle(() => rosetteBgFn(0, 0, radius*1.2, radius*1.2*radAdj, params2))
  withStyle(() => rosetteFn(0, 0, radius*1.2, radius*1.2*radAdj, params2))


  // strokeWeight(3)
  // const denomination = shuffle([1, 2, 5, 10, 20, 50, 100]).pop()
  // text(denomination, 0,0)
}


