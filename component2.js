
let __canvas, __bgGraphic, MISPRINT_LATHE_MALFUNCTION, MISPRINT_ROSETTE_PARAMS_EXCEEDED, SHOW_WATERMARK
let ellapsed = 0
let IS_DECO, IS_VINTAGE


let STROKE_MOD = 1
IS_BULLION=false
IS_SILVER=false
IS_CRYPTO=true
COLOR_SCHEME='CRYPTO'
HIGHLIGHT=false
COUNTERFEIT=false
BG_TYPE='EMPTY'
MISPRINT_HETERO_ROSETTES=false


const SERIAL_NUMBER = tokenData.tokenId || '001'

function preload() {
  fontData = loadFont('ShipporiMinchoB1-Regular.ttf');
}


const ASPECT_RATIO = 1
const H = 900
const W = 900
const W_H_RATIO = W/H
const GRAPHIC_RESOLUTION = 4


function setup() {
  __canvas = createCanvas(W, H)
  noLoop()
  colorMode(HSB, 360, 100, 100, 100)


  HUE = int(rnd(0,360))
  const isBlue = HUE < 275 && HUE > 210
  DARK_C = color(HUE, 26, 25)
  LIGHT_C = color(hfix(HUE-72), 6, 91)
  LIGHT_GRADIENT_C = color(hfix(max(HUE-72, 0)), 6, 91)
  LIGHTENED_DARK_C = color(HUE, 16, 25)
  ACCENT_C = color(hfix(HUE-145), 80, 64)
  ACCENT2_C = color(hfix(HUE+145), 80, 64)
  LIGHT_ACCENT_C = color(hfix(HUE-145), 55, 64, 30)
  BRIGHT_LIGHT_C = color(max(HUE-10, 0), 80, 54)
  BRIGHT_DARK_C = BRIGHT_LIGHT_C
  VIBRANT_GRADIENT = prb(0.02)

  const reverseRosetteColors = prb(0.5)
  const lightC = LIGHT_GRADIENT_C
  const darkC = DARK_C
  ROSETTE_FILL_C = lightC
  ROSETTE_STROKE_C = darkC

  // HUE = int(rnd(0,360))
  // const isBlue = HUE < 275 && HUE > 210
  // LIGHT_C = color(hfix(HUE-133), 96, isBlue ? 0 : 15)
  // DARK_C = color(HUE, isBlue ? 80 : 100, isBlue ? 95 : 90)
  // LIGHTENED_DARK_C = color(HUE, 69, 75)
  // ACCENT_C = color(hfix(HUE-254), 100, 100)
  // LIGHT_ACCENT_C = color(hfix(HUE-254), 55, 64, 60)
  // BRIGHT_LIGHT_C = ACCENT_C
  // BRIGHT_DARK_C = BRIGHT_LIGHT_C
  // LIGHT_GRADIENT_C = LIGHT_C
  // VIBRANT_GRADIENT = prb(0.05)

  // MISPRINT_PIGMINTATION_MALFUNCTION = prb(0.1)
  // if (MISPRINT_PIGMINTATION_MALFUNCTION) {
  //   LIGHT_C = color(hfix(HUE-183), 96, 95)
  //   DARK_C = color(HUE, isBlue ? 80 : 100, 95)
  //   LIGHTENED_DARK_C = color(HUE, 69, 95)
  //   // ACCENT_C = DARK_C
  // }

  // const reverseRosetteColors = prb(0.5)
  // const lightC = LIGHT_C
  // const darkC = DARK_C
  // ROSETTE_FILL_C = reverseRosetteColors ? darkC : lightC
  // ROSETTE_STROKE_C = reverseRosetteColors ? lightC : darkC



  noiseSeed(int(rnd(0, 1_000_000_000_000)))

  __bgGraphic = createGraphics(W,H)
  const currentPixelDensity = __bgGraphic.pixelDensity() || 2
  __bgGraphic.pixelDensity(currentPixelDensity*GRAPHIC_RESOLUTION)

  // MISPRINT_LATHE_MALFUNCTION = true


  // __bgGraphic.translate(W/2, H/2)
  // __bgGraphic.noFill()



  // const p = genRosetteParams({
  //   rDiff: 6,
  //   strokeW: 6,
  //   innerC: LIGHTENED_DARK_C,
  //   outterC: ROSETTE_FILL_C,
  // })
  // fuckedEchoRosette(0,0, 830, 0, p, true, __bgGraphic)


}

// const ASPECT_RATIO = 1.333
// const H = 750
// const W = H*ASPECT_RATIO
// const W_H_RATIO = W/H
// const GRAPHIC_RESOLUTION = 4



// function setup() {
//   console.log(tokenData.hash)

//   const windowRatio = window.innerWidth/window.innerHeight

//   if (W_H_RATIO < windowRatio) {
//     __canvas = createCanvas(window.innerHeight * W_H_RATIO, window.innerHeight)
//     SCALE = window.innerHeight/H

//   } else if (W_H_RATIO > windowRatio) {
//     __canvas = createCanvas(window.innerWidth, window.innerWidth /W_H_RATIO)
//     SCALE = window.innerWidth/W

//   } else {
//     __canvas = createCanvas(window.innerWidth, window.innerHeight)
//     SCALE = window.innerWidth/W
//   }

//   noLoop()
//   colorMode(HSB, 360, 100, 100, 100)

//   MISPRINT_ROSETTE_PARAMS_EXCEEDED = prb(0.5)
//   ACCENT_C = color('#7cf803')
// }




function draw() {
  ellapsed++
  translate(width/2, height/2)
  noFill()

  // background(ROSETTE_FILL_C)
  push()
  const direction = posOrNeg()
  const diag = rnd(0, 100)
  if (!IS_BULLION) strokeWeight(2)
  for (let i = -diag; i <= W+diag; i++) {
    const x = direction === 1 ? i-W/2 : W/2-i

    stroke(lerpColor(
      color('red'),
      color('blue'),
      VIBRANT_GRADIENT || IS_BULLION || (IS_CRYPTO&&HIGHLIGHT) ? i/W : i/(W*5)
    ))
    line(x+diag, -H/2, x, H/2)
  }
  pop()


  image(__bgGraphic,-W / 2,-H / 2)



  const rosetteGraphic1 = createGraphics(W,H)
  rosetteGraphic1.pixelDensity(rosetteGraphic1.pixelDensity() || 2*GRAPHIC_RESOLUTION)

  rosetteGraphic1.noFill()
  rosetteGraphic1.translate(width/2, height/2)
  const rosetteGraphic2 = createGraphics(W,H)
  rosetteGraphic2.pixelDensity(rosetteGraphic2.pixelDensity() || 2*GRAPHIC_RESOLUTION)
  rosetteGraphic2.noFill()
  rosetteGraphic2.translate(width/2, height/2)


  const p0 = genRosetteParams({
    strokeC: ROSETTE_STROKE_C,
    strokeW: 1,
    rDiff: 4,
    strokeMod: 0.5
  })

  // fuckedDollarRosette(-W/2,-H/2, 460, 80, p0)
  // fuckedDollarRosette(W/2,-H/2, 460, 80, p0)
  // fuckedDollarRosette(-W/2+200,H/2, 460, 80, p0)
  // fuckedDollarRosette(W/2,H/2, 460, 80, p0)
  _dollarRosette(0,0, 430, 0, p0)

  _dollarRosette(0,0, 430, 0, {...p0, strokeC: ACCENT2_C, strokeW: 1}, rosetteGraphic1)
  _dollarRosette(0,0, 430, 0, {...p0, strokeC: ACCENT_C, strokeW: 1}, rosetteGraphic2)

rosetteGraphic1.erase()
rosetteGraphic1.fill(0)
times(5, i => {

  fuckedEchoRosette(rnd(-W/2, W/2), rnd(-H/2, H/2), 300, 100, genRosetteParams({ points: 200 }), false, rosetteGraphic1)
})
rosetteGraphic1.noErase()

rosetteGraphic2.erase()
rosetteGraphic2.fill(0)
times(5, i => {

  fuckedEchoRosette(rnd(-W/2, W/2), rnd(-H/2, H/2), 300, 100, genRosetteParams({ points: 200 }), false, rosetteGraphic2)
})
rosetteGraphic2.noErase()




  // image(rosetteGraphic1,-W / 2,-H / 2)
  // image(rosetteGraphic2,-W / 2,-H / 2)

  textFont(fontData)

  textSize(50)
  textAlign(CENTER)
  strokeWeight(1)
  fill(ROSETTE_STROKE_C)

  // const denominationY = 20
  // stroke(ROSETTE_STROKE_C)
  // text('1', 1, denominationY)
  // stroke(ROSETTE_FILL_C)
  // text('1', 0, denominationY + 1)
//   fill('red')
// text(int(getFrameRate()), -300, 300)



}


function calcR(progress, exponent, l) {
  const [_x, _y] = getXYRotation(progress, 2, (100), (100))
  const n = noise(_x, _y, l/500)

  // return ellapsed/1000 % 500
  return (1 + map(n, 0, 1, 0, 1.2) ** exponent) / 2 // do i need the `+ 1`
}

const createFuckedRosetteBorder = (x_, y_, c0Points, ignore) => {
  return (rad, p, offset=0) => {
    const angle0 = (p + offset)/c0Points

    // console.log(ellapsed)

    const r0 = calcR(angle0 * TWO_PI, 1, rad*5*ellapsed/3000)


    return getXYRotation(
      angle0 * TWO_PI,
      rad * r0,
      x_, y_
    )


    // const r1 = r1a || 1/rad1Adj
    // const r2 = r2a || 1/rad2Adj
    // const r0 = 1 - r1 - r2

    // const [x0, y0] = getXYRotation(
    //   angle0 * TWO_PI,
    //   rad * r0,
    //   x_, y_
    // )
    // const [x1, y1] = getXYRotation(
    //   angle1 * TWO_PI,
    //   rad * r1,
    //   x0, y0
    // )

    // return getXYRotation(
    //   angle2 * TWO_PI,
    //   rad * r2,
    //   x1, y1
    // )
  }
}

function _dollarRosette(x_, y_, maxRad=200, minRad=100, params={}, graphic=window) {
  graphic.push()
  params.strokeC && graphic.stroke(params.strokeC)
  params.fillC && graphic.fill(params.fillC)
  const strokeMod = params.strokeMod || 1

  const c0Points = params.points

  const border = createRosetteBorder(x_, y_, c0Points, params.c1, params.c2, params.r1, params.r2)

  // border
  // for (let off=0; off<6; off++) {
  //   graphic.strokeWeight(((params.strokeW || 0.7) + maxRad/150 - 1) * strokeMod * STROKE_MOD)
  //   drawShape(c0Points, p => {
  //     const [ox, oy] = border(maxRad, p, off/3)
  //     const [ix, iy] = border(maxRad*0.95, p, off/3)

  //     return p % 2 === 0 ? [ix, iy] : [ox, oy]
  //   }, graphic)
  // }

  let topRad = maxRad
  let bottomRad = maxRad * 0.75
  let i = 0

  while (bottomRad >= minRad && i < 20) {
    graphic.strokeWeight(((params.strokeW || 1) + topRad/150 - 1) * strokeMod)
    // awesome misprint

    const density = 20
    for (let off=0; off<density; off++) {
      drawShape(c0Points, p => {
        const rad = p % 2 === 0 ? bottomRad : topRad
        return border(rad, p, 2*off/density)
      }, graphic)
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

  graphic.pop()
}



function fuckedDollarRosette(x_, y_, maxRad=200, minRad=100, params={}, graphic=window) {
  graphic.push()
  params.strokeC && graphic.stroke(params.strokeC)
  params.fillC && graphic.fill(params.fillC)
  const strokeMod = params.strokeMod || 1


  const c0Points = params.points

  const border = createFuckedRosetteBorder(x_, y_, c0Points)

  // border
  graphic.stroke(ACCENT_C)
  for (let off=0; off<6; off++) {
    graphic.strokeWeight(((params.strokeW || 0.7) + maxRad/150 - 1) * strokeMod * STROKE_MOD)
    _drawShape(c0Points, p => {
      const [ox, oy] = border(maxRad, p, off/3)
      const [ix, iy] = border(maxRad*0.95, p, off/3)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    }, graphic)
  }

  let topRad = maxRad
  let bottomRad = maxRad * 0.75

  let i = 0
  while (bottomRad >= minRad && i < 20) {
    graphic.strokeWeight(((params.strokeW || 1) + topRad/250 - 1) * STROKE_MOD)
    graphic.stroke(
      lerpColor(
        ACCENT_C,
        params.strokeC,
        i/20
      )
      // color(
      //   hue(params.strokeC) + i*5,
      //   saturation(params.strokeC)+i*5,
      //   lightness(params.strokeC)+i*10
      // )
    )

    for (let off=0; off<6; off++) {
      _drawShape(c0Points, p => {
        // interesting variation
        // if (true) return border(topRad, p, off/3)

        const [ox, oy] = border(topRad, p, off/3)
        const [ix, iy] = border(bottomRad, p, off/3)

        return p % 2 === 0 ? [ix, iy] : [ox, oy]
      }, graphic)
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

  graphic.pop()
}


function fuckedEchoRosette(x_=0, y_=0, maxRad=200, minRad=100, params={}, bg=false, graphic=window) {
  graphic.push()
  params.strokeC && graphic.stroke(params.strokeC)
  bg && graphic.strokeWeight(2)
  params.strokeW && graphic.strokeWeight(params.strokeW)
  const c0Points = params.points

  const border = createFuckedRosetteBorder(x_, y_, params.points)

  const r = params.rDiff || (bg ? 1 : 5)
  for (let rad = minRad; rad <= maxRad; rad += r) {
    !bg && !params.ignoreShrink && graphic.strokeWeight(rad*params.strokeW/130)
    params.innerC && params.outterC && graphic.stroke(lerpColor(
      params.innerC,
      params.outterC,
      (rad - minRad)/(maxRad - minRad)
    ))

    _drawCircle(params.points, p => {
      return border(rad, p)
    }, graphic)
  }
  graphic.pop()
}

function _drawCircle (points, getXY, graphic) {
  graphic.beginShape()
  graphic.curveVertex(...getXY(-1))
  for (let p = 0; p <= points + 1; p++) {
    MISPRINT_LATHE_MALFUNCTION && graphic.rotate(0.1)
    graphic.curveVertex(...getXY(p))
  }
  graphic.endShape()
}

const __rot = rnd()
const _drawShape = (points, getXY, graphic=window) => {

  graphic.beginShape()
  graphic.curveVertex(...getXY(-1))
  times(points+2, p => {
    MISPRINT_LATHE_MALFUNCTION && rotate(__rot/1000)
    graphic.curveVertex(...getXY(p))
  })
  graphic.endShape()
}

