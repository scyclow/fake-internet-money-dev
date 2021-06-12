
function rosetteSketch(x_, y_, maxRad=200) {
  push()
  fill(FILL_C)

  const c0Points = 90
  const c1Points = c0Points * -1
  const c2Points = c1Points/10

  const c1Offset = c0Points/2
  const rad1Adj = 0.3//1/rnd(12, 20)

  const border = (rad, p, offset=0, r1a=null, r2a=null) => {
    const angle0 = ((p + offset)/c0Points) * TWO_PI
    const angle1 = ((p + c1Offset + offset)/c1Points) * TWO_PI
    const angle2 = ((p + offset)/c2Points) * TWO_PI


    const [x0, y0] = getXYRotation(
      angle0,
      rad,
      x_, y_
    )
    const [x1, y1] = getXYRotation(
      angle1,
      rad * (r1a||rad1Adj),
      x0, y0
    )

    return getXYRotation(
      angle2,
      rad * 0.1,
      x1, y1
    )

  }

  // for (let rad = minRad; rad <= maxRad; rad += 5) {
    drawCircle(c0Points, p => {
      return border(maxRad, p, 90)
    })
  // }
  pop()
}

function rosetteBorder(x_, y_, maxRad=200, minRad=100, seed=null) {
  push()
  fill(FILL_C)
  if (seed) randomSeed(seed)
  // const c1 = int(rnd(1, 160))
  // const c2 = int(rnd(1, 300))
  const c1 = int(rnd(1, 16))
  const c2 = int(rnd(1, 13))
  console.log(c1, c2)

  const c0Points = 70
  const c1Points = c0Points/c1* posOrNeg()
  const c2Points = c0Points/c2* posOrNeg()
  const rad1Adj = 1/rnd(12, 20)
  const rad2Adj = 1/rnd(12, 20)

  const border = (rad, p, offset=0, r1a=null, r2a=null) => {
    const angle0 = ((p + offset)/c0Points) * TWO_PI
    const angle1 = ((p + offset)/c1Points) * TWO_PI
    const angle2 = ((p + offset)/c2Points) * TWO_PI


    const [x0, y0] = getXYRotation(
      angle0,
      rad,
      x_, y_
    )
    const [x1, y1] = getXYRotation(
      angle1,
      rad * (r1a||rad1Adj),
      x0, y0
    )

    return getXYRotation(
      angle2,
      rad * (r2a||rad2Adj),
      x1, y1
    )
  }

  // for (let rad = minRad; rad <= maxRad; rad += 5) {
    drawCircle(c0Points, p => {
      return border(maxRad, p)
    })
  // }
  pop()
}


function dollarRosette(x_, y_, maxBorder=200, seed=null) {
  if (seed) randomSeed(seed)

  // TODO one of these cna go up to 33 with a smaller max for the other one
  const c1 = int(rnd(1, 16))
  const c2 = int(rnd(1, 13))
  console.log(c1, c2)

  const c0Points = 80
  const c1Points = c0Points/c1 * posOrNeg()
  const c2Points = c0Points/c2 * posOrNeg()

  // TODO can probably bring the min down to ~5
  const rad1Adj = 1/rnd(10, 20)
  const rad2Adj = 1/rnd(10, 20)

  const border = createRosetteBorder(x_, y_, c0Points, c1Points, c2Points, rad1Adj, rad2Adj)

  for (let off=0; off<2; off+=0.3333) {
    drawCircle(c0Points, p => {
      const [ox, oy] = border(maxBorder, p, off)
      const [ix, iy] = border(maxBorder*0.95, p, off)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    })
  }

  for (let off=0; off<2; off+=0.3333) {
    drawCircle(c0Points, p => {
      const [ox, oy] = border(maxBorder, p, off)
      const [ix, iy] = border(maxBorder*0.7, p, off)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    })
  }


  for (let off=0; off<2; off+=0.3333) {
    drawCircle(c0Points, p => {
      const [ox, oy] = border(maxBorder*0.75, p, off)
      const [ix, iy] = border(maxBorder*0.45, p, off)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    })
  }


  // good misprint
//   for (let off=0; off<2; off+=0.3333) {
//     drawCircle(c0Points, p => {
//       const [ox, oy] = border(maxBorder*0.55, p, off)
//       const [ix, iy] = border(maxBorder*0.0, p, off)

//       return p % 2 === 0 ? [ix, iy] : [ox, oy]
//     })
//   }


  // stroke(255)
  // drawCircle(c0Points, p => {
  //   return border(maxBorder*0.75, p, 0.25, 0.25)
  // })
}


const createRosetteBorder = (x_, y_, c0Points, c1Points, c2Points, rad1Adj, rad2Adj) => {
  return (rad, p, offset=0, r1a=null, r2a=null) => {
    const angle0 = ((p + offset)/c0Points) * TWO_PI
    const angle1 = ((p + offset)/c1Points) * TWO_PI
    const angle2 = ((p + offset)/c2Points) * TWO_PI


    const [x0, y0] = getXYRotation(
      angle0,
      rad,
      x_, y_
    )
    const [x1, y1] = getXYRotation(
      angle1,
      rad * (r1a||rad1Adj),
      x0, y0
    )

    return getXYRotation(
      angle2,
      rad * (r2a||rad2Adj),
      x1, y1
    )
  }
}

function dollarEchoRosette(maxRad=200, minRad=100, seed=null) {
  if (seed) randomSeed(seed)
  const c1 = int(rnd(1, 16))
  const c2 = int(rnd(1, 13))
  console.log(c1, c2)

  const c0Points = 70
  const c1Points = c0Points/c1 * posOrNeg()
  const c2Points = c0Points/c2 * posOrNeg()
  const rad1Adj = 1/rnd(12, 20)
  const rad2Adj = 1/rnd(12, 20)

  const border = (rad, p, offset=0, r1a=null, r2a=null) => {
    const angle0 = ((p + offset)/c0Points) * TWO_PI
    const angle1 = ((p + offset)/c1Points) * TWO_PI
    const angle2 = ((p + offset)/c2Points) * TWO_PI


    const [x0, y0] = getXYRotation(
      angle0,
      rad
    )
    const [x1, y1] = getXYRotation(
      angle1,
      rad * (r1a||rad1Adj),
      x0, y0
    )

    return getXYRotation(
      angle2,
      rad * (r2a||rad2Adj),
      x1, y1
    )
  }

  for (let rad = minRad; rad <= maxRad; rad += 5) {
    drawCircle(c0Points, p => {
      return border(rad, p)
    })
  }
}

function dollarLineRosette(maxRad=200, minRad=100, seed=null) {
  if (seed) randomSeed(seed)
  const c1 = int(rnd(1, 16))
  const c2 = int(rnd(1, 13))


  const c0Points = 70
  const c1Points = c0Points/c1 * posOrNeg()
  const c2Points = c0Points/c2 * posOrNeg()
  const rad1Adj = 1/rnd(12, 20)
  const rad2Adj = 1/rnd(12, 20)

  const border = (rad, p, offset=0, r1a=null, r2a=null) => {
    const angle0 = ((p + offset)/c0Points) * TWO_PI
    const angle1 = ((p + offset)/c1Points) * TWO_PI
    const angle2 = ((p + offset)/c2Points) * TWO_PI


    const [x0, y0] = getXYRotation(
      angle0,
      rad
    )
    const [x1, y1] = getXYRotation(
      angle1,
      rad * (r1a||rad1Adj),
      x0, y0
    )

    return getXYRotation(
      angle2,
      rad * (r2a||rad2Adj),
      x1, y1
    )
  }


  for (let l=0; l < c0Points; l += 0.2) {
    const [ox, oy] = border(maxRad, l)
    const [ix, iy] = border(minRad, l)
    line(ix, iy, ox, oy)
  }
}

function dollarCheckeredRosette(maxRad=200, minRad=100, seed=null) {
  dollarLineRosette(maxRad, minRad, seed)
  dollarEchoRosette(maxRad, minRad, seed)
}

