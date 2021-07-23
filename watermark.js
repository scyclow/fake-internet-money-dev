
function cgkWatermark(x=150, y=75) {
  push()
  strokeWeight(2)
  stroke(STROKE_LIGHT_C)
  drawCGK(x, y, 300)

  pop()
}

function randomWatermark(x, y, radius) {
  const r = rnd()
  if (r < 0.3333) watermark1(x, y, radius)
  else if (r < 0.85) watermark2(x, y, radius)
  else watermark3(x, y, radius)
}



function watermark1(x=0, y=0, c2Radius=100) {
  const speed0 = 360*3
  const speed1 = speed0/sample([22, 32, 32.5, 33, 34, 64, 65, 66, 66.4])
  drawCircle(speed0, p => {
    const angle = (p/speed0) * TWO_PI
    const [x0, y0] = getXYRotation(
      angle,
      c2Radius/100 + abs(sin(angle*33) * 75),
      x, y
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      c2Radius,
      x0, y0
    )

  })
}



function watermark2(x=0, y=0, c1Radius=100) {
  const modifier = sample([7, 13, 29, 31, 32, 34, 35, 36, 37, 44, 46, 58, 59, 60, 62, 85, 88, 92, 96])
  const speed1 = 32
  const speed0 = speed1 * modifier


  drawCircle(speed0, p => {
    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      c1Radius + abs(sin(angle*90) * 30),
      x, y
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      c1Radius*0.8 + abs(sin(angle*360)),
      x0, y0
    )
    return [x0, y0]
  })
}


function watermark3(x0, y0, c1Radius=100) {

  const x = posOrNeg()
  const params = sample([
    [10, 96, 2],
    [10, 96, -4],
    [14, 96, 2],
    [15, 29, -5],
    [720, -5, 5],
    [720, 6, -3],
    [720, -4, 2],
    [720, -6, 2],
    [720, -3, 3],
    // [720, -15, 5], // cool, but doesn't really fit here
    // [50, -9, 10]
  ])

  const c1DegPerTick = TWO_PI/params[0]

  const c2Radius = c1Radius * 0.4
  const c2DegPerTick = TWO_PI/params[1]

  const c3Radius = c1Radius * 0.2
  const c3DegPerTick = TWO_PI/params[2]

  drawCircle(720, (p) => {
    const [x1, y1] = getXYRotation(p*c1DegPerTick, c1Radius, x0, y0)
    const [x2, y2] = getXYRotation(p*c2DegPerTick, c2Radius, x1, y1)
    return getXYRotation(p*c3DegPerTick, c3Radius, x2, y2)
  })
}



/// CGK
function drawCGK(x=0, y=0, tBase) {
  push()
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
