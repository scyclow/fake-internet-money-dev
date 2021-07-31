


function animating_spirograph(x0, y0, c1Radius=100) {

  const x = posOrNeg()
  const params =
  sample([
    // [10, 96, 2],
    // [14, 96, 2],
    // [720, -5, 5],
    // [720, 6, -3],
    // [720, -4, 2],
    // [720, -6, 2],
    [720, -3, 3],
    // [720, -15, 5], // cool, but doesn't really fit here
  ])

  const c1DegPerTick = TWO_PI/params[0]

  const c2Radius = c1Radius * 0.4
  const c2DegPerTick = TWO_PI/params[1]

  const c3Radius = c1Radius * 0.2
  const c3DegPerTick = TWO_PI/params[2]

  drawCircle(720, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius + sin(ellapsed/50)*4, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, c2Radius + sin(((ellapsed-20))/50)*4, x1, y1)
    return getXYRotation(p*c3DegPerTick, c3Radius + sin(((ellapsed-20)-30)/50)*4, x2, y2)
  })
}

// TODO spin this off into own project?
function watermark2_ () {
  push()
  stroke(color(0, 75, 100))
  strokeWeight(4)
  watermark2(88, 10)

  stroke(color(90, 70, 90))
  strokeWeight(1)
  watermark2(88, 10)

  stroke(color(250, 72, 31))
  strokeWeight(3)
  watermark2(59, 10)

  stroke(color(200, 55, 100))
  strokeWeight(1)
  watermark2(59, 10)
  pop()
}
function watermark2(m, wiggle=1) {
  const x = 32
  const modifier = m||sample([7, 13, 29, 31, 32, 34, 35, 36, 37, 44, 46, 58, 59, 60, 62, 85, 88, 92, 96])
  const speed0 = x * modifier
  const speed1 = x


  drawCircle(speed0, p => {
    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      75 + abs(sin(angle*90) * 30)
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      60 + abs(sin(angle*360) * wiggle),
      x0, y0
    )
    return [x0, y0]
  })
}

// SPIN OFF ?
function watermark5(x0, y0, radius) {
  const c1Radius = radius
  const c1DegPerTick = TWO_PI/1440

  const c2Radius = radius * 0.4
  const c2DegPerTick = TWO_PI/20

  const c3Radius = radius * 0.2
  const c3DegPerTick = -TWO_PI/20

  const c4Radius = radius * 0.1
  const c4DegPerTick = -TWO_PI/4

  const c5Radius = radius * 0.05
  const c5DegPerTick = TWO_PI/10

  drawCircle(1440, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, c2Radius, x1, y1)
    const [x3, y3] = getXYRotation(p*c3DegPerTick, c3Radius, x2, y2)
    const [x4, y4] = getXYRotation(p*c4DegPerTick, c4Radius, x3, y3)
    return getXYRotation(p*c5DegPerTick, c5Radius, x4, y4)
  })
}

// SPIN OFF?
function watermark6(x0, y0, radius) {
  const c1Radius = radius *0.5
  const c1DegPerTick = TWO_PI/2880

  const c2Radius = radius
  const c2DegPerTick = TWO_PI/80

  const c3Radius = radius
  const c3DegPerTick = -TWO_PI/40

  const c4Radius = radius * 0.125
  const c4DegPerTick = -TWO_PI/40

  const c5Radius = radius * 0.0675
  const c5DegPerTick = TWO_PI/8

  drawCircle(2880, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, c2Radius, x1, y1)
    const [x3, y3] = getXYRotation(p*c3DegPerTick, c3Radius, x2, y2)
    const [x4, y4] = getXYRotation(p*c4DegPerTick, c4Radius, x3, y3)
    return getXYRotation(p*c5DegPerTick, c5Radius, x4, y4)
  })
}






function border_outtake_1(padding=20) {
  borderGraphic.strokeWeight(0.5)
  const points = W/6+3

  for (let off=0; off<2; off+=0.3333) {
    drawShape(points+1, p => {
      const [ox, oy] = getXYBorder(p + off, points, padding)
      const [ix, iy] = getXYBorder(p + off, points, padding+20)

      return p % 4 === 0 ? [ix, iy] : [ox, oy]
    }, borderGraphic)
  }
}

function border_outtake_2(padding=20) {
  borderGraphic.strokeWeight(0.5)
  const points = W/6

  for (let off=0; off<2; off+=0.3333) {
    drawShape(points+1, p => {
      const [ox, oy] = getXYBorder(p + off, points, padding)
      const [ix, iy] = getXYBorder(p - off, points, padding+20)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    }, borderGraphic)
  }
}

function border_outtake_3(padding=20, params={}) {
  const points = 60

  const radius = params.radius || 20 // 15-30
  const degAdj = params.degAdj || -3 //1,2,3,4,-1,-2,-3,-4
  const offsetAmt = 1/(params.offsetAmt || 5) //3 - 25


  for (let off=0; off<2; off+=offsetAmt) {
    drawShape(points+1, p => {
      const [ox, oy] = getXYBorder(p +off, points, padding)
      return getXYRotation(
        (p/degAdj) * TWO_PI,
        radius,
        ox, oy
      )
    }, borderGraphic)
  }
}



function bg3() {
  push()
  stroke(STROKE_C)
  strokeWeight(0.5)
  const size = 10

  for (let x = -W/2; x < W/2; x += size)
  for (let y = -H/2; y < H/2; y += size) {
    if (rnd() < 0.5) {
      line(x, y, x + size, y + size)
    } else {
      line(x+size*2, y, x, y + size*2)
    }
  }
  pop()
}
// function bg11() {
//   push()
//   stroke(STROKE_C)
//   strokeWeight(0.5)
//   const size = 25
//   noFill()

//   for (let x = -W/2; x < W/2; x += size)
//   for (let y = -H/2; y < H/2; y += size) {

//     if (y % 2 === 0) {

//       if (x % 2 === 0) {
//       line(x + size, y, x, y+ size)
//       line(x, y, x+size, y+ size)
//       }
//     } else {
//       if (x % 2 === 0) {
//         // line(x, y, x+size, y+ size)
//         // line(x + size, y, x, y+ size)
//       } else {
//         circle(x+ size/2, y+size/2, size*3)
//         circle(x+ size/2, y+size/2, size)
//         circle(x+ size/2, y+size/2, size/2)
//         circle(x+ size/2, y+size/2, size/4)
//       }
//     }
//   }
//   pop()
// }






















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

  translate(100,0)
  interestingPattern()
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



function centerSymbol() {
  push()
  noFill()
  stroke(STROKE_C)
  strokeWeight(14)
  multiCurve(0, 0, 30, radians(125), radians(235), 0.7, 3)
  stroke(FILL_C)
  strokeWeight(10)
  multiCurve(0, 0, 30, radians(125), radians(235), 0.7, 3)
  stroke(STROKE_C)
  strokeWeight(8)
  multiCurve(0, 0, 30, radians(125), radians(235), 0.7, 3)
  stroke(FILL_C)
  strokeWeight(4)
  multiCurve(0, 0, 30, radians(125), radians(235), 0.7, 3)
  stroke(STROKE_C)
  strokeWeight(2)
  multiCurve(0, 0, 30, radians(125), radians(235), 0.7, 3)
  pop()
}


function sketch() {
  // circle(0,0, 100)

  getXYCurveLine(-201, -20, 200, 20)

  // shrinkingCorners()
}




function shrinkingCorners() {
  // const p0 = genRosetteParams()
  // const p1 = genRosetteParams({ strokeW: 0.75})
  // const p2 = genRosetteParams({ strokeW: 0.5})

  // console.log('p0', p0)
  // console.log('p1', p1)


  // dollarRosette(105-width/2,105-height/2,85, 50,{...p0, strokeC: FILL_C})
  // dollarRosette(120,0,75,30,{...p1, strokeC: FILL_C})
  // dollarRosette(200,0,45,15,{...p2, strokeC: FILL_C})

  // dollarRosette(105-width/2,105-height/2,80, 30,p0)
  // dollarRosette(240-width/2,85-height/2,50,10,p1)

  // dollarRosette(200,0,40,15,p2)

  times(50, () => {
    const radius = rnd(20, 150)
    const x = rnd(-W/2, W/2)
    const y = rnd(-H/2, H/2)
    const p = genRosetteParams({ strokeW: radius/160 })
    // dollarRosette(x, y, radius+5, 0, {...p, strokeC: FILL_C})
    dollarRosette(x, y, radius, radius/2, {...p, strokeC: rnd() < 0.5 ? FILL_C : STROKE_C})
  })
}




function randLayout() {

  // const r = rnd()
  // if (r < 0.125) bg1()
  // else if (r < 0.25) bg2()
  // else if (r < 0.375) bg3()
  // else if (r < 0.5) bg4()
  // else if (r < 0.625) bg5()
  // else if (r < 0.75) bg6()
  // else if (r < 0.875) bg7()
  // else bg8()
  // bg10()




  let rosetteFn
  let borderFn = noop
  let paramFn = rnd() < 0.5
    ? genRosetteParams
    : genDistortedRosetteParams

  const ros = rnd()
  if (ros < 0.25) {
    rosetteFn = dollarRosette
  } else if (ros < 0.45) {
    rosetteFn = dollarEchoRosette
  } else if (ros < 0.55) {
    rosetteFn = dollarLineRosette
  } else if (ros < 0.65) {
    rosetteFn = dollarCheckeredRosette
  } else if (ros < 0.75) {
    rosetteFn = vintageRosette
    paramFn = genVintageRosetteParams
  } else if (ros < 0.85) {
    rosetteFn = denominationRosette(5)
    borderFn = noop
  } else {
    rosetteFn = rosetteBg
  }
  middleRosette(80, dollarRosette, borderFn, paramFn, 0.4)
  standardDollar()
  centerSymbol()
  // pointTexture()

}




function standardRosette() {
  const denomination = shuffle([1, 2, 5, 10, 20, 50, 100]).pop()


  strokeWeight(1)

  const seed1 = rnd(0,10000)
  const seed2 = rnd(0,10000)
  rosetteBg(-125, 0,100, seed1)
  dollarRosette(-125, 0, 100, seed1)

  rosetteBg(-125, 0,45, seed1)
  dollarRosette(-125, 0, 45, seed1)

  rosetteBg(125, 0,100, seed1)
  dollarRosette(125, 0, 100, seed1)
  rosetteBg(125, 0,45, seed1)
  dollarRosette(125, 0, 45, seed1)

  rosetteBg(0,0, 120, seed2)
  dollarRosette(0, 0, 120, seed2)

  // const seed3 = rnd(0,10000)
  // rosetteBg(0,0, 80, seed3)
  // dollarRosette(0, 0, 80, seed3)

  text(denomination, 0,0)

}

function oversaturaedRosette() {
  const denomination = shuffle([1, 2, 5, 10, 20, 50, 100]).pop()

  const hue = int(rnd(0,360))
  const altHue = (180 + hue) % 360
  background(color(hue, 1, 1))

  const seed = rnd(0,10000)
  strokeWeight(15)
  stroke(color(altHue, 1, 0.4))
  dollarRosette(0, 0, 250, seed)
  text(denomination, 0,0)

  translate(3, 3)
  strokeWeight(6)
  stroke(color(altHue, 1, 1))
  dollarRosette(0, 0, 250, seed)
  text(denomination, 0,0)
}



function doubleSpiral() {
  drawCircle(180*2, p =>
    getXYRotation(p/TWO_PI, squareRad(360, p))
  )
}

function interestingPattern() {
  drawCircle(360*3, p => {
    const speed0 = 360*3
    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      75 + abs(sin(angle*45) * 50)
    )
    return getXYRotation(
      -(p/360) * TWO_PI,
      70 + abs(sin(angle*90) * 10),
      x0, y0
    )
    return [x0, y0]
  })
}

function interestingPattern2() {

  const speed0 = 1440
  const speed1 = 480
  console.log(speed0, speed1)
  drawCircle(speed0, p => {

    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      75 + abs(sin(angle*45) * 50)
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      70 + abs(sin(angle*360) * 10),
      x0, y0
    )
    return [x0, y0]
  })
}

function interestingPattern3() {
  const speed0 = 1440
  const speed1 = 480
  console.log(speed0, speed1)
  drawCircle(speed0, p => {

    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      75 + abs(sin(angle*45) * 50)
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      70 + abs(sin(angle*360) * 10),
      x0, y0
    )
    return [x0, y0]
  })
}

function interestingPattern4() {

  const speed0 = 1620
  const speed1 = 1620/22
  console.log(speed0, speed1)
  drawCircle(speed0, p => {

    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      75 + abs(sin(angle*45) * 50)
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      70 + abs(sin(angle*45) * 10),
      x0, y0
    )
    return [x0, y0]
  })
}








const squareRad = (dist, x) => {
  x < dist/4 ? x :
  x < dist/2 ? dist/4 - (x - (dist/4)) :
  x < dist*0.75 ? x - dist/2 :
  dist - x
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


const denominationRosette = denomination => (x_=0, y_=0, maxRad=200, minRad=0, params={}) => {
  push()
  params.strokeC && stroke(params.strokeC)
  params.strokeW && strokeWeight(params.strokeW)

  strokeWeight(1)
  const r1 = 1/(params.r1)
  const r2 = 1/(params.r2)

  const c0Points = params.points
  const c1Points = c0Points/params.c1
  const c2Points = c0Points/params.c2

  const border = createRosetteBorder(x_, y_, c0Points, c1Points, c2Points, r1, r2)

  textSize(10)
  for (let l=0; l < c0Points; l += 0.5) {
    const [x, y] = border(maxRad, l)
    text(denomination, x, y)
  }
  pop()
}