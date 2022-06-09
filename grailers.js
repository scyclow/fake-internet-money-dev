
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

let ROSETTE_POINT_OFF_FREQ
let ROSETTE_POINT_OFF_MAG


const SERIAL_NUMBER = tokenData.tokenId || '001'

function preload() {
  // fontData = loadFont('ShipporiMinchoB1-Regular.ttf');
  fontData = loadFont('CutiveMono-Regular.ttf');
}


const ASPECT_RATIO = 1.333
const H = 600
const W = 800
const W_H_RATIO = W/H
const GRAPHIC_RESOLUTION = 4

function setup() {
  console.log(tokenData.hash)

  const windowRatio = window.innerWidth/window.innerHeight

  if (W_H_RATIO < windowRatio) {
    __canvas = createCanvas(window.innerHeight * W_H_RATIO, window.innerHeight)
    SCALE = window.innerHeight/H

  } else if (W_H_RATIO > windowRatio) {
    __canvas = createCanvas(window.innerWidth, window.innerWidth /W_H_RATIO)
    SCALE = window.innerWidth/W

  } else {
    __canvas = createCanvas(window.innerWidth, window.innerHeight)
    SCALE = window.innerWidth/W
  }

  noLoop()
  colorMode(HSB, 360, 100, 100, 100)


  ROSETTE_POINT_OFF_FREQ = 2//prb(0.333) ? 2 : prb(0.333) ? 5 : prb(0.333) ? 10 : 1
  ROSETTE_POINT_OFF_MAG = 1.5//rnd(1, 1.5)

  HUE = int(rnd(0,360))
  const isBlue = HUE < 275 && HUE > 210
  LIGHT_C = color(hfix(HUE-133), 96, isBlue ? 0 : 15)
  DARK_C = color(HUE, isBlue ? 80 : 100, isBlue ? 95 : 90)
  LIGHTENED_DARK_C = color(HUE, 69, 75)
  ACCENT_C = color(hfix(HUE-254), 100, 100)
  LIGHT_ACCENT_C = color(hfix(HUE-254), 55, 64, 60)
  BRIGHT_LIGHT_C = ACCENT_C
  BRIGHT_DARK_C = BRIGHT_LIGHT_C
  LIGHT_GRADIENT_C = LIGHT_C
  VIBRANT_GRADIENT = prb(0.05)

  MISPRINT_PIGMINTATION_MALFUNCTION = prb(0.1)
  if (MISPRINT_PIGMINTATION_MALFUNCTION) {
    LIGHT_C = color(hfix(HUE-183), 96, 95)
    DARK_C = color(HUE, isBlue ? 80 : 100, 95)
    LIGHTENED_DARK_C = color(HUE, 69, 95)
    // ACCENT_C = DARK_C
  }

  const reverseRosetteColors = prb(0.5)
  const lightC = LIGHT_C
  const darkC = DARK_C
  ROSETTE_FILL_C = reverseRosetteColors ? darkC : lightC
  ROSETTE_STROKE_C = reverseRosetteColors ? lightC : darkC



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

  background(ROSETTE_FILL_C)

  image(__bgGraphic,-W / 2,-H / 2)



  const p0 = genRosetteParams({
    strokeC: ROSETTE_STROKE_C,
    // strokeW: 1,
    // rDiff: 4,
  })


  _dollarLineRosette(0,0, 150, 0, {...p0, strokeC: ACCENT_C})
  _dollarEchoRosette(0,0, 880, 150, p0)


  _dollarEchoRosette(0,0, 155, 150, {
    ...p0,
    strokeC: ACCENT_C,
    strokeW: 2
  })








  textFont(fontData)

  textSize(200)
  textAlign(CENTER)
  strokeWeight(2)
  // fill('#fff')
  fill(ACCENT_C)
  stroke(ROSETTE_STROKE_C)

  const header1Y = -200
  const header2Y = 300
  const offset = 3


  text('GRAILERS', offset*0, header1Y + offset*0)
  text('GRAILERS', offset*1, header1Y + offset*1)
  text('GRAILERS', offset*2, header1Y + offset*2)
  // stroke(ROSETTE_STROKE_C)

  // stroke(ROSETTE_STROKE_C)
  text('DAO', offset*0, header2Y + offset*0)
  text('DAO', offset*1, header2Y + offset*1)
  text('DAO', offset*2, header2Y + offset*2)

  // textSize(80)
  // text('999', offset*0, 30 + offset*0)
  // text('666', offset*1, 50 + offset*1)
  // text('666', offset*2, 50 + offset*2)



  strokeWeight(0)

  rectMode(CENTER)
  // blendMode(SUBTRACT)
  // times(2, i => {
  //   fill(
  //     hfix(hue(ACCENT_C) + rnd(360)),
  //     saturation(ACCENT_C),
  //     lightness(ACCENT_C),
  //     30
  //   )
  //   rect(rnd(-width/2, width/2), rnd(-height/2, height/2), rnd(200, width), rnd(200, height))
  // })



}






function _dollarRosette(x_, y_, maxRad=200, minRad=100, params={}, graphic=window) {
  graphic.push()
  params.strokeC && graphic.stroke(params.strokeC)
  params.fillC && graphic.fill(params.fillC)
  const strokeMod = params.strokeMod || 1

  const c0Points = params.points

  const border = _createRosetteBorder(x_, y_, c0Points, params.c1, params.c2, params.r1, params.r2)

  // border
  for (let off=0; off<6; off++) {
    graphic.strokeWeight(((params.strokeW || 0.7) + maxRad/150 - 1) * strokeMod * STROKE_MOD)
    drawShape(c0Points, p => {
      const [ox, oy] = border(maxRad, p, off/3)
      const [ix, iy] = border(maxRad*0.95, p, off/3)

      return p % 2 === 0 ? [ix, iy] : [ox, oy]
    }, graphic)
  }

  let topRad = maxRad
  let bottomRad = maxRad * 0.75
  let i = 0

  while (bottomRad >= minRad && i < 20) {
    graphic.strokeWeight(((params.strokeW || 1) + topRad/150 - 1) * STROKE_MOD)
    // awesome misprint
    for (let off=0; off<6; off++) {
      drawShape(c0Points, p => {
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



function _dollarEchoRosette(x_=0, y_=0, maxRad=200, minRad=100, params={}, bg=false) {
  push()
  params.strokeC && stroke(params.strokeC)
  bg && strokeWeight(2)
  params.strokeW && strokeWeight(params.strokeW)

  const border = _createRosetteBorder(x_, y_, params.points, params.c1, params.c2, params.r1, params.r2)
  const r = params.rDiff || (bg ? 1 : 5)
  for (let rad = minRad; rad <= maxRad; rad += r) {
    !bg && !params.ignoreShrink && strokeWeight(rad*params.strokeW/130)
    params.innerC && params.outterC && stroke(lerpColor(
      params.innerC,
      params.outterC,
      (rad - minRad)/(maxRad - minRad)
    ))

    drawCircle(params.points, p => {
      return border(rad, p)
    })
  }
  pop()
}

function _dollarLineRosette(x_=0, y_=0, maxRad=200, minRad=100, params={}) {
  push()
  params.strokeC && stroke(params.strokeC)
  params.strokeW && strokeWeight(params.strokeW)

  const c0Points = params.points/2

  const border = _createRosetteBorder(x_, y_, c0Points, params.c1, params.c2, params.r1, params.r2)

  for (let l=0; l < c0Points; l += 0.2) {

    const rAdj = Math.floor(l*5) % 2 ? 1 : 1
    const [ox, oy] = handleMalfunction(border(maxRad * rAdj, l))
    const [ix, iy] = handleMalfunction(border(minRad * rAdj, l))
    line(ix, iy, ox, oy)
  }
  pop()
}

function _dollarCheckeredRosette(x_=0, y_=0,maxRad=200, minRad=100, params={}) {
  _dollarLineRosette(x_, y_, maxRad, minRad, params)
  _dollarEchoRosette(x_, y_, maxRad, minRad, params)
}



const _createRosetteBorder = (x_, y_, c0Points, c1, c2, rad1Adj, rad2Adj) => {
  const c1Points = c0Points/c1
  const c2Points = c0Points/c2
  return (rad, p, offset=0, r1a=null, r2a=null) => {
    const angle0 = (p + offset)/c0Points
    const angle1 = (p + offset)/c1Points
    const angle2 = (p + offset)/c2Points

    const r1 = r1a || 1/rad1Adj
    const r2 = r2a || 1/rad2Adj
    const r0 = 1 - r1 - r2

    const rAdj = p % 2 ? 1.05 : 1



    const [x0, y0] = getXYRotation(
      angle0 * TWO_PI,
      rad * r0 * rAdj,
      x_, y_
    )
    const [x1, y1] = getXYRotation(
      angle1 * TWO_PI,
      rad * r1,
      x0, y0
    )

    return getXYRotation(
      angle2 * TWO_PI,
      rad * r2 ,
      x1, y1
    )
  }
}
