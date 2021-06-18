




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

  const speed0 = 2160
  const speed1 = 36
  console.log(speed0, speed1)
  drawCircle(speed0, p => {

    const angle = (p/speed0) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle,
      75 + abs(sin(angle*90) * 25)
    )
    return getXYRotation(
      (p/speed1) * TWO_PI,
      70 ,//+ abs(sin(angle*360) * 10),
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








/// CGK
function drawCGK(tBase) {
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
  if (PYRAMID_1) drawPyramid(tBase, STROKE_C, strokeW*9, pyParams)
  if (PYRAMID_2) drawPyramid(tBase, !flipColor ? FILL_C : STROKE_C, strokeW*7, pyParams)
  if (PYRAMID_3) drawPyramid(tBase, STROKE_C, strokeW*5, pyParams)
  if (PYRAMID_4) drawPyramid(tBase, !flipColor ? FILL_C : STROKE_C, strokeW*3, pyParams)
  if (PYRAMID_5) drawPyramid(tBase, STROKE_C, strokeW, pyParams)
  pop()
}



function drawPyramid(tBase, strokeC, strokeW = 45, {
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

  if (triangle) drawTriangle(tBase, 1)
  if (invertedTriangle) drawTriangle(tBase, -1)
  if (eye) drawEye(tBase, 130)
  if (inverseEye) drawEye(tBase, 230)
  if (pupil) point(0, 0)
  if (topCircle) drawEyeCircle(tBase, 1)
  if (bottomCircle) drawEyeCircle(tBase, 0)
}

function drawEyeCircle(tBase, position = 1) {
  const { centerW } = triStats(tBase)
  const size = centerW / sin(radians(65))
  const yOffset = cos(radians((position === 1 ? 235 : 124)/ 2)) * (centerW / 2)
  circle(0, yOffset, size)
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


function drawEye(tBase, deg, scale = 1) {
  const { centerW } = triStats(tBase)

  const size = (centerW * scale) / sin(radians(deg / 2))
  const yOffset = cos(radians(deg / 2)) * (size / 2)

  arc(
    0,
    yOffset,
    size,
    size,
    radians(270 - deg / 2),
    radians(270 + deg / 2),
    OPEN
  )

  arc(
    0,
    -yOffset,
    size,
    size,
    radians(90 - deg / 2),
    radians(90 + deg / 2),
    OPEN
  )
}


function drawTriangle(tBase, dir=1) {
  const { tHeight, heightOfCenter } = triStats(tBase)

  triangle(
    -tBase / 2,
    heightOfCenter * dir,
    tBase / 2,
    heightOfCenter * dir,
    0,
    (tHeight - heightOfCenter) * -dir
  )
}
