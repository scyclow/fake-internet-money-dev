


let SCALE,
    DARK_C,
    LIGHTENED_DARK_C,
    LIGHT_C,
    LIGHT_GRADIENT_C,
    BRIGHT_LIGHT_C,
    BRIGHT_DARK_C,
    ACCENT_C,
    LIGHTENED_ACCENT_C,
    HUE,
    DENOMINATION,
    ROSETTE_STYLE,
    IS_VINTAGE,
    IS_DECO,
    IS_BULLION,
    HIGHLIGHT,
    SHOW_NUMERALS,
    BG_TYPE,
    BG_PATTERN,
    SHOW_BORDER,
    LAYOUT

const W = 610
const H = 377
const W_H_RATIO = W/H
const GRAPHIC_RESOLUTION = 4


const L = -W/2
const R = W/2
const T = -H/2
const B = H/2
const CORNERS = {
  1: [L, T],
  2: [R, T],
  3: [L, B],
  4: [R, B],
}




let __canvas
let borderGraphic
let stripeGraphic

function setup() {
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

  borderGraphic = createGraphics(W*GRAPHIC_RESOLUTION,H*GRAPHIC_RESOLUTION)
  stripeGraphic = createGraphics(W/4,H*GRAPHIC_RESOLUTION)


  noLoop()
  colorMode(HSB, 360, 100, 100, 100)



  const denominationSeed = rnd()
  if (denominationSeed < 1/2) DENOMINATION = '1'
  else if (denominationSeed < 3/4) DENOMINATION = '5'
  else if (denominationSeed < 7/8) DENOMINATION = '10'
  else if (denominationSeed < 15/16) DENOMINATION = '20'
  else if (denominationSeed < 31/32) DENOMINATION = '50'
  else if (denominationSeed < 63/64) DENOMINATION = '100'
  else if (denominationSeed < 127/128) DENOMINATION = '2'

  const rosetteStyleSeed = rnd()
  if (rosetteStyleSeed < 0.0625){
    ROSETTE_STYLE = 'DECO'
    IS_DECO = true
  }
  else if (rosetteStyleSeed < 0.625)
    ROSETTE_STYLE = 'NUMISMATIC'
  else if (rosetteStyleSeed < 0.8125) {
    ROSETTE_STYLE = 'VINTAGE'
    IS_VINTAGE = true
  }
  else if (rosetteStyleSeed < 0.875)
    ROSETTE_STYLE = 'ECHO'
  else if (rosetteStyleSeed < 0.9375)
    ROSETTE_STYLE = 'DIGITAL'
  else
    ROSETTE_STYLE = 'LINE'

  ROSETTE_ENHANCEMENT = rnd() < 0.0625

  HIGHLIGHT = !IS_VINTAGE && rnd() < 0.125

  const colorSeed = rnd()
  COLOR_SCHEME =
    colorSeed < 0.8125 ? 'FIAT'
    : colorSeed < 0.9375 ? 'CRYPTO'
    : 'BULLION'
  IS_BULLION = COLOR_SCHEME === 'BULLION'
  IS_CRYPTO = COLOR_SCHEME === 'CRYPTO'

  let isSliver
  if (COLOR_SCHEME === 'FIAT') {
    HUE = int(rnd(0,360))
    DARK_C = color(HUE, 26, 25)
    LIGHT_C = color(hfix(HUE-72), 6, 91)
    LIGHT_GRADIENT_C = color(hfix(max(HUE-72, 0)), 6, 91)
    LIGHTENED_DARK_C = color(HUE, 16, 55)
    ACCENT_C = color(hfix(HUE-145), 80, 64)
    LIGHT_ACCENT_C = color(hfix(HUE-145), 55, 64, 30)
    BRIGHT_LIGHT_C = color(max(HUE-10, 0), 80, 54)
    BRIGHT_DARK_C = BRIGHT_LIGHT_C


  } else if (COLOR_SCHEME === 'CRYPTO') {
    HUE = int(rnd(0,360))
    const isBlue = HUE < 275 && HUE > 210
    LIGHT_C = color(hfix(HUE-153), 96, isBlue ? 0 : 20)
    DARK_C = color(HUE, isBlue ? 80 : 99, isBlue ? 95 : 90)
    LIGHTENED_DARK_C = color(HUE, 69, 75)
    ACCENT_C = color(hfix(HUE-254), 100, 100)
    LIGHT_ACCENT_C = ACCENT_C
    BRIGHT_LIGHT_C = color(hfix(HUE-15), 99, 65)
    BRIGHT_DARK_C = BRIGHT_LIGHT_C
    LIGHT_GRADIENT_C = LIGHT_C

  } else {
    HUE = int(rnd(0,360))
    DARK_C = color(HUE, 26, 25)

    if (rnd() < 0.5) {
      LIGHT_C = color(203, 5, 48)
      BRIGHT_LIGHT_C = color(167, 5, 95)
      DARK_C = color(40, 26, 20)
      LIGHTENED_DARK_C = color(203, 10, 35)
      BRIGHT_DARK_C = LIGHTENED_DARK_C
      isSliver = true

    } else {
      LIGHT_C = color(40, 60, 67)
      BRIGHT_LIGHT_C = color(60, 30, 100)
      DARK_C = color(35, 45, 25, 80)
      LIGHTENED_DARK_C = color(35, 45, 35)
      BRIGHT_DARK_C = color(203, 10, 25)

      // LIGHT_C = color(40, 60, 67)
      // BRIGHT_LIGHT_C = color(60, 30, 100)
      // DARK_C = color(203, 10, 25)
      // LIGHTENED_DARK_C = color(203, 10, 40)
    }
    ACCENT_C = DARK_C
    LIGHT_ACCENT_C = LIGHTENED_DARK_C
    LIGHT_GRADIENT_C = LIGHT_C

    HIGHLIGHT = true
  }


  const reverseRosetteColors = rnd() < 0.5
  const lightC = isSliver ? BRIGHT_LIGHT_C : LIGHT_GRADIENT_C
  const darkC = HIGHLIGHT && !IS_DECO && !IS_VINTAGE ? BRIGHT_DARK_C : DARK_C
  // const darkC = HIGHLIGHT && !IS_DECO && !IS_VINTAGE && !reverseRosetteColors ? BRIGHT_DARK_C : DARK_C
  ROSETTE_FILL_C = IS_VINTAGE || reverseRosetteColors ? lightC : darkC
  ROSETTE_STROKE_C = IS_VINTAGE || reverseRosetteColors ? darkC : lightC



  SHOW_NUMERALS = rnd() < 0.2


  LAYOUT = rnd() < 0.8125 ? 'MAIN' : 'STRIP'

  if (LAYOUT === 'MAIN') {
    const centerPieceSeed = rnd()
    // if (centerPieceSeed < 0.01)
    //   MAIN_CENTER_PIECE = 0 // no center piece
    if (centerPieceSeed < 0.6875)
      MAIN_CENTER_PIECE = 1 // single
    else if (centerPieceSeed < 0.8125)
      MAIN_CENTER_PIECE = 2 // bouquet
    else if (centerPieceSeed < 0.875)
      MAIN_CENTER_PIECE = 3 // portrait
    else
      MAIN_CENTER_PIECE = 4 // rosette sandwich

    // else if (centerPieceSeed < 1)
    //   MAIN_CENTER_PIECE = 5 // total chaos
  }


  const isMain = LAYOUT === 'MAIN'
  SHOW_BORDER = isMain && [0, 1, 2, 3, 6, 4].includes(MAIN_CENTER_PIECE) && rnd() < 0.75

  const bgSeed = rnd()
  if (!isMain || SHOW_BORDER) {
    BG_TYPE = 'STANDARD'
    BG_PATTERN = getBG()
  }
  else if (bgSeed < 0.5625) BG_TYPE = 'WM2'
  else if (bgSeed < 0.8125) BG_TYPE = 'WM1'
  else if (bgSeed < 0.9375) BG_TYPE = 'FULL'
  else BG_TYPE = 'EMPTY'






  // if (r < 0.125) chainLinkBg() // chainlink
  // else if (r < 0.25) labrynthBg() // labrynth
  // else if (r < 0.375) pennyPincherBg() // penny pincher

  // else if (r < 0.5) fabricBg() // fabric
  // else if (r < 0.625) cyclesBg()
  // else if (r < 0.75) mainframeBg() // mainframe
  // else if (r < 0.875) arrowBg()
  // else denominationTexture(DENOMINATION)



  // DARK_C = '#65aaba'
  // LIGHT_C = '#cc5b95'
  // DARK_C2 = '#4145a7'

  // const sample = a => a[int(rnd(0, a.length))]

  // const softColors = [
  //   color(23, 95, 95),
  //   color(150, 57, 95),
  //   color(270, 65, 35),
  //   color(250, 65, 35),
  //   color(210, 75, 100),
  //   color(0, 75, 100),
  //   color(31, 48, 34),
  // ]
  // if (rnd() < 0.8) {
  //   DARK_C = sample(softColors)
  //   LIGHT_C = sample(softColors)
  //   DARK_C2 = sample(softColors)
  // }
}


function draw() {
  translate(width/2, height/2)
  scale(SCALE)
  noFill()


  stroke(DARK_C)

  if (IS_BULLION) {
    const direction = posOrNeg()
    const diag = rnd(0, 100)
    for (let i = -diag; i <= W+diag; i++) {
      const x = direction === 1 ? i-W/2 : W/2-i

      stroke(lerpColor(
        LIGHT_C,
        BRIGHT_LIGHT_C,
        i/W
      ))
      line(x+diag, -H/2, x, H/2)
    }
  }
  else background(LIGHT_C)

  if (COLOR_SCHEME === 'FIAT') pointTexture()
  if (COLOR_SCHEME !== 'CRYPTO') squigTexture()


  if (LAYOUT === 'MAIN')
    mainLayout()
  else
    stripLayout()

}


function keyPressed() {
  if (keyCode === 83) {
    saveCanvas(__canvas, 'FIM-' + Date.now(), 'jpg');
  }
}
