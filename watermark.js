




function interestingPattern3() {

  const speed0 = 360*3
  const speed1 = speed0/22
  // const speed1 = speed0/33
  // const speed1 = speed0/44
  // const speed1 = speed0/66
  // const speed1 = speed0/99
  // const speed1 = speed0/132
  // const speed1 = speed0/32
  // const speed1 = speed0/64
  // const speed1 = speed0/128
  // const speed1 = speed0/34
  // const speed1 = speed0/68
  // const speed1 = speed0/136
  // const speed1 = speed0/70
  drawCircle(speed0, p => {
    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      abs(sin(angle*33) * 50)
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      70,
      x0, y0
    )
    return [x0, y0]
  })
}

function interestingPattern4() {

  const x =32
  const modifier = 35//int(random(12, 120))
  const speed0 = x * modifier
  const speed1 = x

//7
// 29, 35, 36, 44, 58, 59, 60, 62, 97, 88, 92, 120
// 85, 13, 34, 96, 31, 32, 37, 46
  console.log(modifier)

  drawCircle(speed0, p => {

    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      75 + abs(sin(angle*90) * 30)
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      60 ,//+ abs(sin(angle*360) * 10),
      x0, y0
    )
    return [x0, y0]
  })
}


function interestingPattern5() {
  const rotations = 11
  const speed0 = 180
  const speed1 = 45.5//(speed0)/85
  console.log(speed1)
  drawCircle(180 * rotations, p => {

    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      60 //+ abs(sin(angle*90) * 50)
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      45,// + abs(sin(angle*360) * 10),
      x0, y0
    )
    return [x0, y0]
  })
}


// TODO: i think this is the same as drawCircle/drawShape
const drawCircleSpirograph = (points, getXY) => {
  beginShape()
  curveVertex(...getXY(-1))
  for (let p = 0; p <= points + 1; p++) {
    curveVertex(...getXY(p))
  }
  endShape()
}

function spiragraph2(x0, y0, radius) {
  const c1Radius = radius
  const c1DegPerTick = TWO_PI/360

  const c2Radius = radius * 0.4
  const c2DegPerTick = -TWO_PI/5

  const c3Radius = radius * 0.2
  const c3DegPerTick = TWO_PI/5

  drawCircleSpirograph(360, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, c2Radius, x1, y1)
    return getXYRotation(p*c3DegPerTick, c3Radius, x2, y2)
  })

  // fill(0)
  // circle(0,0,20)
  drawCircleSpirograph(360, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius/10, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, -c2Radius/20, x1, y1)
    return getXYRotation(p*c3DegPerTick, c3Radius/20, x2, y2)
  })
}



function spiragraph5(x0, y0, radius) {
  const c1Radius = radius
  const c1DegPerTick = TWO_PI/720

  const c2Radius = radius * 0.4
  const c2DegPerTick = TWO_PI/6

  const c3Radius = radius * 0.15
  const c3DegPerTick = -TWO_PI/3

  drawCircleSpirograph(720, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, c2Radius, x1, y1)
    return getXYRotation(p*c3DegPerTick, c3Radius, x2, y2)
  })
}

function spiragraph7(x0, y0, radius) {
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

  drawCircleSpirograph(1440, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, c2Radius, x1, y1)
    const [x3, y3] = getXYRotation(p*c3DegPerTick, c3Radius, x2, y2)
    const [x4, y4] = getXYRotation(p*c4DegPerTick, c4Radius, x3, y3)
    return getXYRotation(p*c5DegPerTick, c5Radius, x4, y4)
  })
}


function spiragraph8(x0, y0, radius) {
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

  drawCircleSpirograph(2880, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, c2Radius, x1, y1)
    const [x3, y3] = getXYRotation(p*c3DegPerTick, c3Radius, x2, y2)
    const [x4, y4] = getXYRotation(p*c4DegPerTick, c4Radius, x3, y3)
    return getXYRotation(p*c5DegPerTick, c5Radius, x4, y4)
  })
}


function spiragraph9(x0, y0, radius, params={}) {
  const c1Radius = radius * (params.r1 || 1)
  const c1DegPerTick = TWO_PI/(params.c1 || 10)

  const c2Radius = radius * (params.r2 || 0.4)
  const c2DegPerTick = TWO_PI/(params.c2 || 96)

  const c3Radius = radius * (params.r3 || 0.2)
  const c3DegPerTick = TWO_PI/(params.c3 || 2)

  drawCircleSpirograph(720, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, c2Radius, x1, y1)
    return getXYRotation(p*c3DegPerTick, c3Radius, x2, y2)
  })
}





/// CGK
function drawCGK(x=0, y=0, tBase) {
  push()
  // PY_EYE = hshprb(1, 0.4275)
  // const tCProb = hshprb(1, 0.5)
  // const bCProb = hshprb(1, 0.5)
  // const eIProb = hshprb(1, 0.5)
  // const pt = hshrnd(2)

  // PY_TOP_CIRCLE = !PY_EYE && tCProb // 30%
  // PY_BOTTOM_CIRCLE = !PY_EYE && bCProb // 30%
  // PY_EYE_INVERSE = !PY_EYE && !PY_TOP_CIRCLE && !PY_BOTTOM_CIRCLE && eIProb // 16%
  // PY_TRIANGLE = pt < 0.85
  // PY_TRIANGLE_INVERSE = pt > 0.85 && pt < 0.95
  // PY_PUPIL = hshprb(1, 0.9)

  // if (hshprb(1, 0.65)) PYRAMID_1 = true
  // if (hshprb(1, 0.65)) PYRAMID_2 = true
  // if (hshprb(1, 0.65)) PYRAMID_3 = true
  // if (hshprb(1, 0.65)) PYRAMID_4 = true
  // if (
  //   hshprb(1, 0.65)
  //   || !(PYRAMID_1 || PYRAMID_2 || PYRAMID_3 || PYRAMID_4)
  // ) PYRAMID_5 = true

  const PY_EYE = rnd() < 0.4275
  const tCProb = rnd() < 0.5
  const bCProb = rnd() < 0.5
  const eIProb = rnd() < 0.5
  const pt = rnd()

  const PY_TOP_CIRCLE = !PY_EYE && tCProb // 30%
  const PY_BOTTOM_CIRCLE = !PY_EYE && bCProb // 30%
  const PY_EYE_INVERSE = !PY_EYE && !PY_TOP_CIRCLE && !PY_BOTTOM_CIRCLE && eIProb // 16%
  const PY_TRIANGLE = pt < 0.85
  const PY_TRIANGLE_INVERSE = pt > 0.85 && pt < 0.95
  const PY_PUPIL = rnd() < 0.9

  const PYRAMID_1 = rnd() < 0.65
  const PYRAMID_2 = rnd() < 0.65
  const PYRAMID_3 = rnd() < 0.65
  const PYRAMID_4 = rnd() < 0.65
  const PYRAMID_5 = rnd() < 0.65 || !(PYRAMID_1 || PYRAMID_2 || PYRAMID_3 || PYRAMID_4)


  const flipColor = (
    !PYRAMID_1 // flipPrimary colors if only pys are bg color
    && !PYRAMID_3
    && !PYRAMID_5
  )

  const strokeW = 5*tBase/250
  const pyParams = {
    topCircle: PY_TOP_CIRCLE,
    bottomCircle: PY_BOTTOM_CIRCLE,
    eye: PY_EYE,
    inverseEye: PY_EYE_INVERSE,
    triangle: PY_TRIANGLE,
    invertedTriangle: PY_TRIANGLE_INVERSE,
    pupil: PY_PUPIL
  }
  if (PYRAMID_1) drawPyramid(x, y, tBase, STROKE_LIGHT_C, strokeW*9, pyParams)
  if (PYRAMID_2) drawPyramid(x, y, tBase, !flipColor ? FILL_C : STROKE_LIGHT_C, strokeW*7, pyParams)
  if (PYRAMID_3) drawPyramid(x, y, tBase, STROKE_LIGHT_C, strokeW*5, pyParams)
  if (PYRAMID_4) drawPyramid(x, y, tBase, !flipColor ? FILL_C : STROKE_LIGHT_C, strokeW*3, pyParams)
  if (PYRAMID_5) drawPyramid(x, y, tBase, STROKE_LIGHT_C, strokeW, pyParams)
  pop()
}



function drawPyramid(x, y, tBase, strokeC, strokeW = 45, {
  topCircle = false,
  bottomCircle = false,
  eye = false,
  inverseEye = false,
  triangle = false,
  invertedTriangle = false,
  pupil = false
} = {}) {
  noFill()
  strokeWeight(strokeW)
  stroke(strokeC)

  if (triangle) drawTriangle(x, y, tBase, 1)
  if (invertedTriangle) drawTriangle(x, y, tBase, -1)
  if (eye) drawEye(x, y, tBase, 130)
  if (inverseEye) drawEye(x, y, tBase, 230)
  if (pupil) point(x, y, 0)
  if (topCircle) drawEyeCircle(x, y, tBase, 1)
  if (bottomCircle) drawEyeCircle(x, y, tBase, 0)
}

function drawEyeCircle(x, y, tBase, position = 1) {
  const { centerW } = triStats(tBase)
  const size = centerW / sin(radians(65))
  const yOffset = cos(radians((position === 1 ? 235 : 124)/ 2)) * (centerW / 2)
  circle(x, y + yOffset, size)
}


function triStats(tBase) {
  const tHeight = sin(radians(60)) * tBase
  const heightOfCenter = (tan(radians(30)) * tBase) / 2
  const centerW = tan(radians(30)) * (tHeight - heightOfCenter) * 2

  return {
    tHeight,
    heightOfCenter,
    centerW,
  }
}


function drawEye(x, y, tBase, deg, scale = 1) {
  const { centerW } = triStats(tBase)

  const size = (centerW * scale) / sin(radians(deg / 2))
  const yOffset = cos(radians(deg / 2)) * (size / 2)

  arc(
    x,
    y + yOffset,
    size,
    size,
    radians(270 - deg / 2),
    radians(270 + deg / 2),
    OPEN
  )

  arc(
    x,
    y-yOffset,
    size,
    size,
    radians(90 - deg / 2),
    radians(90 + deg / 2),
    OPEN
  )
}


function drawTriangle(x, y, tBase, dir=1) {
  const { tHeight, heightOfCenter } = triStats(tBase)

  triangle(
    x - tBase / 2,
    y + heightOfCenter * dir,
    x + tBase / 2,
    y + heightOfCenter * dir,
    x,
    y + (tHeight - heightOfCenter) * -dir
  )
}
