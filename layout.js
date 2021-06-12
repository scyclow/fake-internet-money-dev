function sideEmblemDollar() {

  textSize(60)
  textAlign(CENTER, CENTER)
  strokeWeight(0.5)
  bg17()
  // oversaturaedRosette()
  // middleRosette(80)
  border2(10)

  border1(15)
  border1(30)

  rosetteCorners()

  // dollarRosette(0, 0, 100)

  translate(100,0)
  interestingPattern4()
  translate(-100,0)
  // const seed = Math.random() *1000
  // dollarLineRosette(200, 80, seed)
  // strokeWeight(2)


  strokeWeight(1)
  frameGenerator(90, -80, 0)
  strokeWeight(1)
  fill(0)
  text(10, -80,0)



  textSize(16)
  stroke(color(H, 100, 0))
  fill(color(H, 100, 70))
  strokeWeight(1)
  text('909090909090', 100,110)
  text('909090909090', -100,-110)
}

function standardDollar() {

  const h = 86

  textSize(60)
  textAlign(CENTER, CENTER)
  bg16()
  border2(10)

  border1(15)
  border1(30)

  rosetteCorners()

  dollarRosette(0, 0, 100)


  textSize(16)
  stroke(color(h, 100, 0))
  fill(color(h, 100, 70))
  strokeWeight(1)
  text('909090909090', 100,110)
  text('909090909090', -100,-110)
  signature(-75,100, 10)
}

function rosetteCorners() {
  strokeWeight(0.25)
  const seed = rnd(0,1000)
  const cornerPadding = 70
  rosetteBorder(-width_/2+cornerPadding, -height_/2+cornerPadding, 60, 0, seed)
  dollarRosette(-width_/2+cornerPadding, -height_/2+cornerPadding, 60, seed)

  rosetteBorder(width_/2-cornerPadding, -height_/2+cornerPadding, 60, 0, seed)
  dollarRosette(width_/2-cornerPadding, -height_/2+cornerPadding, 60, seed)

  rosetteBorder(-width_/2+cornerPadding, height_/2-cornerPadding, 60, 0, seed)
  dollarRosette(-width_/2+cornerPadding, height_/2-cornerPadding, 60, seed)

  rosetteBorder(width_/2-cornerPadding, height_/2-cornerPadding, 60, 0, seed)
  dollarRosette(width_/2-cornerPadding, height_/2-cornerPadding, 60, seed)
}



function middleRosette(radius=100) {
  strokeWeight(0.25)
  const seed0 = rnd(0,10000)
  const seed1 = rnd(0,10000)
  const seed2 = rnd(0,10000)

//   const padding = 0
//   for (let i=padding; i<width_-(2*padding); i+=40) {
//     rosetteBorder(i-width_/2+padding, -height_/2, 20, 0, seed0)
//     dollarRosette(i-width_/2+padding, -height_/2, 20, seed0)
//   }

//   for (let i=padding; i<width_-(2*padding); i+=40) {
//     rosetteBorder(i-width_/2+padding, height_/2, 20, 0, seed0)
//     dollarRosette(i-width_/2+padding, height_/2, 20, seed0)
//   }

//   for (let i=padding; i<height_-(2*padding); i+=30) {
//     rosetteBorder(-width_/2, i-height_/2+padding/2, 20, 0, seed0)
//     dollarRosette(-width_/2, i-height_/2+padding/2, 20, seed0)
//   }

//   for (let i=padding; i<height_-(2*padding); i+=30) {
//     rosetteBorder(width_/2, i-height_/2+padding/2, 20, 0, seed0)
//     dollarRosette(width_/2, i-height_/2+padding/2, 20, seed0)
//   }


  strokeWeight(0.5)
  rosetteBorder(-125, 0,radius, 0, seed1)
  dollarRosette(-125, 0, radius, seed1)
  rosetteBorder(-125, 0,radius*0.45, 0, seed1)
  dollarRosette(-125, 0, radius*0.45, seed1)

  rosetteBorder(125, 0,radius, 0, seed1)
  dollarRosette(125, 0, radius, seed1)

  rosetteBorder(125, 0,radius*0.45, 0, seed1)
  dollarRosette(125, 0, radius*0.45, seed1)

  rosetteBorder(0,0, radius*1.2, 0, seed2)
  dollarRosette(0, 0, radius*1.2, seed2)

  // strokeWeight(3)
  // const denomination = shuffle([1, 2, 5, 10, 20, 50, 100]).pop()
  // text(denomination, 0,0)

}


function distortedRosette(x_, y_, maxBorder=200, seed=null) {
  if (seed) randomSeed(seed)

  // TODO one of these cna go up to 33 with a smaller max for the other one
  const c1 = int(rnd(1, 16))
  const c2 = int(rnd(1, 13))

  const c0Points = 90
  const c1Points = c0Points/c1 * posOrNeg()
  const c2Points = c0Points/c2 * posOrNeg()

  // TODO can probably bring the min down to ~5
  const rad1Adj = 1/rnd(3,10)
  const rad2Adj = 1/rnd(3,10)

  console.log(`c1: ${c1}, c2: ${c2}, rad1Adj: ${rad1Adj}, rad2Adj: ${rad2Adj}`)

  const border = (rad, p, offset=0, r1a=null, r2a=null) => {
    const c1Offset = c0Points/2

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
      rad * (r2a||rad2Adj),
      x1, y1
    )

  }


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
}



function distortedRosetteBorder(x_, y_, maxRad=200, minRad=100, seed=null) {
  push()
  fill(FILL_C)
  if (seed) randomSeed(seed)

  // TODO one of these cna go up to 33 with a smaller max for the other one
  const c1 = int(rnd(1, 16))
  const c2 = int(rnd(1, 13))

  const c0Points = 90
  const c1Points = c0Points/c1 * posOrNeg()
  const c2Points = c0Points/c2 * posOrNeg()

  // TODO can probably bring the min down to ~5
  const rad1Adj = 1/rnd(3,10)
  const rad2Adj = 1/rnd(3,10)

  console.log(`c1: ${c1}, c2: ${c2}, rad1Adj: ${rad1Adj}, rad2Adj: ${rad2Adj}`)

  const border = (rad, p, offset=0, r1a=null, r2a=null) => {
    const c1Offset = c0Points/2

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


function distortedMiddleRosette(radius=100) {
  strokeWeight(0.25)
  const seed0 = rnd(0,10000)
  const seed1 = rnd(0,10000)
  const seed2 = rnd(0,10000)


  strokeWeight(0.5)
  distortedRosetteBorder(-125, 0,radius, 0, seed1)
  distortedRosette(-125, 0, radius, seed1)
  distortedRosetteBorder(-125, 0,radius*0.45, 0, seed1)
  distortedRosette(-125, 0, radius*0.45, seed1)

  distortedRosetteBorder(125, 0,radius, 0, seed1)
  distortedRosette(125, 0, radius, seed1)

  distortedRosetteBorder(125, 0,radius*0.45, 0, seed1)
  distortedRosette(125, 0, radius*0.45, seed1)

  distortedRosetteBorder(0,0, radius*1.2, 0, seed2)
  distortedRosette(0, 0, radius*1.2, seed2)

  // strokeWeight(3)
  // const denomination = shuffle([1, 2, 5, 10, 20, 50, 100]).pop()
  // text(denomination, 0,0)

}
