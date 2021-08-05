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

const posOrNeg = () => prb(0.5) ? 1 : -1

const sample = (a) => a[int(rnd(a.length))]
const hfix = h => (h + 360) % 360
const noop = () => {}

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



