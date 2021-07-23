



function dollarRosette(x_, y_, maxRad=200, minRad=100, params={}) {
  push()
  params.strokeC && stroke(params.strokeC)


  const r1 = 1/params.r1
  const r2 = 1/params.r2

  const c0Points = params.points
  const c1Points = c0Points/params.c1
  const c2Points = c0Points/params.c2

  const border = createRosetteBorder(x_, y_, c0Points, c1Points, c2Points, r1, r2)

  const midRad = (maxRad + minRad)/2

  // border
  for (let off=0; off<6; off++) {
    strokeWeight((params.strokeW || 1) + maxRad/150 - 1)
    drawShape(c0Points, p => {
      const [ox, oy] = border(maxRad, p, off/3)
      const [ix, iy] = border(maxRad*0.95, p, off/3)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    })
  }

  let topRad = maxRad
  let bottomRad = maxRad * 0.75
  let i = 0

  while (bottomRad >= minRad && i < 20) {
    strokeWeight((params.strokeW || 1) + topRad/150 - 1)

    for (let off=0; off<6; off++) {
      drawShape(c0Points, p => {
        const [ox, oy] = border(topRad, p, off/3)
        const [ix, iy] = border(bottomRad, p, off/3)

        return p % 2 === 0 ? [ix, iy] : [ox, oy]
      })
    }

    topRad = bottomRad * 1.045
    if (topRad < 10) {
      bottomRad = 0
    }
    else if (bottomRad - bottomRad*0.75 < 10) {
      bottomRad = topRad - 10
    } else {
      bottomRad = bottomRad*0.75

    }


    i++
  }



  // for (let off=0; off<6; off++) {
  //   strokeWeight((params.strokeW||1)*0.75)
  //   drawShape(c0Points, p => {
  //     const [ox, oy] = border(midRad, p, off/3)
  //     const [ix, iy] = border(minRad, p, off/3)

  //     return p % 2 === 0 ? [ix, iy] : [ox, oy]
  //   })
  // }

  pop()
}



function dollarRosetteBg(...args) {
  dollarEchoRosette(...args, true)
}


function dollarEchoRosette(x_=0, y_=0, maxRad=200, minRad=100, params={}, bg=false) {
  push()
  params.strokeC && stroke(params.strokeC)
  bg && strokeWeight(2)

  const r1 = 1/(params.r1)
  const r2 = 1/(params.r2)

  const c0Points = params.points
  const c1Points = c0Points/params.c1
  const c2Points = c0Points/params.c2

  const border = createRosetteBorder(x_, y_, c0Points, c1Points, c2Points, r1, r2)

  const r = bg ? 1 : 5
  const m = bg ? 5 : 0
  for (let rad = minRad; rad <= maxRad + m; rad += r) {
    params.innerC && params.outterC && stroke(lerpColor(
      params.innerC,
      params.outterC,
      (rad - minRad)/(maxRad - minRad)
    ))

    drawCircle(c0Points, p => {
      return border(rad, p)
    })
  }
  pop()
}



function dollarLineRosette(x_=0, y_=0, maxRad=200, minRad=100, params={}) {
  push()
  params.strokeC && stroke(params.strokeC)
  params.strokeW && strokeWeight(params.strokeW)

  const r1 = 1/(params.r1)
  const r2 = 1/(params.r2)

  const c0Points = params.points
  const c1Points = c0Points/params.c1
  const c2Points = c0Points/params.c2

  const border = createRosetteBorder(x_, y_, c0Points, c1Points, c2Points, r1, r2)

  for (let l=0; l < c0Points; l += 0.2) {
    const [ox, oy] = border(maxRad, l)
    const [ix, iy] = border(minRad, l)
    line(ix, iy, ox, oy)
  }
  pop()
}

function dollarCheckeredRosette(x_=0, y_=0,maxRad=200, minRad=100, params={}) {
  dollarLineRosette(x_, y_, maxRad, minRad, params)
  dollarEchoRosette(x_, y_, maxRad, minRad, params)
}

//?
function dollarDottedRosette(x_=0, y_=0,maxRad=200, minRad=100, params={}) {
  dollarEchoRosette(x_, y_, maxRad, minRad, { ...params, strokeC: STROKE_C, strokeW: 1.5})
  dollarLineRosette(x_, y_, maxRad, minRad, params)
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





function floralRosette(x_=0, y_=0, radius0=90, _=0, params={}) {
  push()
  params.strokeC && stroke(params.strokeC)
  params.fillC && fill(params.fillC)
  params.strokeW && strokeWeight(params.strokeW)

  const radius1 = radius0 / (params.r1 || 9)
  const radius2 = radius0 / (params.r2 || 5)

  //// for more of a pattern:
  // const r2 = radius / 3

  //// for more of a border:
  // const r3 = radius / 15

  //// dynamic
  // randomSeed(seed)
  // const _x = map(mouseX, 0, W, 1, 20)
  // const _y = map(mouseY, 0, H, 1, 20)
  // const r2 = radius / _x
  // const r3 = radius / _y

  const c0Points = params.points || 360
  const c1Points = c0Points/(params.c1 || int(rnd(1, 13)) * posOrNeg())
  const c2Points = c0Points/(params.c2 || int(rnd(170, 192)) * posOrNeg())

  drawShape(c0Points, p => {
    const angle0 = (p/c0Points) * TWO_PI
    const angle1 = (p/c1Points) * TWO_PI
    const angle2 = (p/c2Points) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle0,
      radius0,
      x_, y_
    )
    const [x1, y1] = getXYRotation(
      angle1,
      radius1,
      x0, y0
    )

    return getXYRotation(
      angle2,
      radius2,
      x1, y1
    )

    //// asymetric:
    // return getXYRotation(
    //   angle2/90,
    //   r3,
    //   x2, y2
    // )
    // return [x0, y0]
  })
  pop()
}


const genFloralRosetteParams = (o) => ({
  c1: int(rnd(1, 13)) * posOrNeg(),
  c2: int(rnd(170, 192)) * posOrNeg(),
  r1: 9,
  r2: 5,
  points: 360,
  ...o
})

const genRosetteParams = (o) => ({
  // TODO one of these can go up to 33 with a smaller max for the other one
  c1: int(rnd(1, 16)) * posOrNeg(),
  c2: int(rnd(1, 13)) * posOrNeg(),
  // TODO can probably bring the min down to ~5
  r1: rnd(10, 20),
  r2: rnd(10, 20),
  points: 70,
  ...o
})

const genDistortedRosetteParams = (o) => ({
  c1: int(rnd(1, 16)) * posOrNeg(),
  c2: int(rnd(1, 13)) * posOrNeg(),
  // TODO can probably bring the min down to ~5
  r1: rnd(4, 10),
  r2: rnd(4, 10),
  ...o
})


const createRosetteBorder = (x_, y_, c0Points, c1Points, c2Points, rad1Adj, rad2Adj) => {
  return (rad, p, offset=0, r1a=null, r2a=null) => {
    const angle0 = (p + offset)/c0Points
    const angle1 = (p + offset)/c1Points
    const angle2 = (p + offset)/c2Points

    const r1 = r1a || rad1Adj
    const r2 = r2a || rad2Adj
    const r0 = 1 - r1 - r2

    const [x0, y0] = getXYRotation(
      angle0 * TWO_PI,
      rad * r0,
      x_, y_
    )
    const [x1, y1] = getXYRotation(
      angle1 * TWO_PI,
      rad * r1,
      x0, y0
    )

    return getXYRotation(
      angle2 * TWO_PI,
      rad * r2,
      x1, y1
    )
  }
}
