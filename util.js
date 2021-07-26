let __randomSeed = parseInt(tokenData.hash.slice(0, 16), 16)
function rnd(mn, mx) {
  __randomSeed ^= __randomSeed << 13
  __randomSeed ^= __randomSeed >> 17
  __randomSeed ^= __randomSeed << 5
  const out = (((__randomSeed < 0) ? ~__randomSeed + 1 : __randomSeed) % 1000) / 1000
  if (mx != null) return mn + out * (mx - mn)
  else if (mn != null) return out * mn
  else return out
}

const prb = x => rnd() < x

// const sample = a => a[floor(rnd(a.length))]

const posOrNeg = () => prb(0.5) ? 1 : -1

const sample = (a) => a[int(rnd(a.length))]
const hfix = h => (h + 360) % 360

function drawCircle (points, getXY) {
  beginShape()
  curveVertex(...getXY(-1))
  for (let p = 0; p <= points + 1; p++) {
    curveVertex(...getXY(p))
  }
  endShape()
}


const getXYRotation = (deg, radius, cx=0, cy=0) => [
  sin(deg) * radius + cx,
  cos(deg) * radius + cy,
]


const drawShape = (points, getXY, graphic=window) => {
  graphic.beginShape()
  graphic.curveVertex(...getXY(-1))
  times(points+2, p => graphic.curveVertex(...getXY(p)))
  graphic.endShape()
}

function times(t, fn) {
  for (let i = 0; i < t; i++) fn(i)
}


function getXYCurveLine(startX, startY, endX, endY, idealCurveWidth=50) {
  const xWidth = endX - startX
  // const yWidth = endY - startY
  // const lineWidth = sqrt(
  //   sq(xWidth) + sq(yWidth)
  // )

  // const idealCurves = lineWidth/idealCurveWidth
  // const curves = idealCurves % 1 < 0.5 ?


  // console.log(lineWidth)


  // const steps = lineWidth/idealCurveWidth
  const steps = xWidth/idealCurveWidth

  for (let s = 0; s < steps; s++) {
    circle(
      startX + (xWidth*s/steps),
      // startY + (yWidth*s/steps),
      startY,
      5
    )

    // circle(
    //   startX + (xWidth*s/steps),
    //   // startY + (yWidth*s/steps),
    //   startY,
    //   100
    // )
  }

  let cx = startX
  const deg = PI *2.5/ (idealCurveWidth * 3)
  const startDeg = PI + PI/6
  const endDeg = PI - PI/6

  beginShape()
  let curve = -1
  let d = 0
  for (let p = 0; p < 200; p++) {
    if (d < endDeg) {
      d = startDeg
      curve++
    } else {
      d -= deg
    }

    const [x, y] = getXYRotation(d,idealCurveWidth-5,startX+ curve*idealCurveWidth, startY)
    vertex(x, y)
  }
  endShape()
}




// function getXYSin()