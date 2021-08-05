


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
    SHOW_CORNERS,
    STAR_NOTE,
    MISPRINT_INK_RUN,
    LAYOUT

const W = 700
const H = 400
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

  ROSETTE_ENHANCEMENT = prb(0.0625)

  HIGHLIGHT = !IS_VINTAGE && prb(0.125)

  const colorSeed = rnd()

  COLOR_SCHEME =
    colorSeed < 0.75 ? 'FIAT'
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

    MISPRINT_INK_RUN = prb(0.02)


  } else if (COLOR_SCHEME === 'CRYPTO') {
    HUE = int(rnd(0,360))
    const isBlue = HUE < 275 && HUE > 210
    LIGHT_C = color(hfix(HUE-133), 96, isBlue ? 0 : 15)
    DARK_C = color(HUE, isBlue ? 80 : 99, isBlue ? 95 : 90)
    LIGHTENED_DARK_C = color(HUE, 69, 75)
    ACCENT_C = color(hfix(HUE-254), 100, 100)
    LIGHT_ACCENT_C = ACCENT_C
    // BRIGHT_LIGHT_C = color(hfix(HUE-15), 99, 65)
    BRIGHT_LIGHT_C = ACCENT_C
    BRIGHT_DARK_C = BRIGHT_LIGHT_C
    LIGHT_GRADIENT_C = LIGHT_C

  } else {
    HUE = int(rnd(0,360))
    DARK_C = color(HUE, 26, 25)

    if (prb(0.5)) {
      LIGHT_C = color(203, 5, 48)
      BRIGHT_LIGHT_C = color(167, 5, 95)
      DARK_C = color(40, 26, 20)
      LIGHTENED_DARK_C = color(203, 10, 35)
      BRIGHT_DARK_C = LIGHTENED_DARK_C
      isSliver = true

    } else {
      LIGHT_C = color(40, 60, 67)
      BRIGHT_LIGHT_C = color(60, 30, 100)
      DARK_C = color(35, 45, 30)
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


  const reverseRosetteColors = prb(0.5)
  const lightC = isSliver ? BRIGHT_LIGHT_C : LIGHT_GRADIENT_C
  const darkC = HIGHLIGHT && !IS_DECO && !IS_VINTAGE ? BRIGHT_DARK_C : DARK_C
  // const darkC = HIGHLIGHT && !IS_DECO && !IS_VINTAGE && !reverseRosetteColors ? BRIGHT_DARK_C : DARK_C
  ROSETTE_FILL_C = IS_VINTAGE || reverseRosetteColors ? lightC : darkC
  ROSETTE_STROKE_C = IS_VINTAGE || reverseRosetteColors ? darkC : lightC



  SHOW_NUMERALS = prb(0.2)


  LAYOUT = prb(0.8125) ? 'MAIN' : 'STRIP'

  MAIN_CENTER_PIECE = getMainCenterPiece()


  const isMain = LAYOUT === 'MAIN'
  SHOW_BORDER = isMain && [0, 1, 2, 3, 6, 4].includes(MAIN_CENTER_PIECE) && prb(0.75)
  SHOW_CORNERS = isMain && ((SHOW_BORDER && prb(0.95)) || prb(0.8))

  const bgSeed = rnd()
  if (!isMain || SHOW_BORDER) {
    BG_TYPE = 'STANDARD'
    BG_PATTERN = getBG()
  }
  else if (bgSeed < 0.5625) BG_TYPE = 'WM2'
  else if (bgSeed < 0.8125) BG_TYPE = 'WM1'
  else if (bgSeed < 0.9375 || IS_CRYPTO) BG_TYPE = 'FULL'
  else BG_TYPE = 'EMPTY'


  STAR_NOTE = prb(0.02)
}


function draw() {
  translate(width/2, height/2)
  scale(SCALE)
  noFill()


  stroke(DARK_C)


  drawTexture()


  if (LAYOUT === 'MAIN')
    mainLayout()
  else
    stripLayout()

}

function drawTexture() {
  push()
  const direction = posOrNeg()
  const diag = rnd(0, 100)
  if (!IS_BULLION) strokeWeight(2)
  for (let i = -diag; i <= W+diag; i++) {
    const x = direction === 1 ? i-W/2 : W/2-i

    stroke(lerpColor(
      LIGHT_C,
      MISPRINT_INK_RUN || IS_BULLION || HIGHLIGHT ? BRIGHT_LIGHT_C : DARK_C,
      MISPRINT_INK_RUN || IS_BULLION || (IS_CRYPTO&&HIGHLIGHT) ? i/W : i/(W*5)
    ))
    line(x+diag, -H/2, x, H/2)
  }

  if (COLOR_SCHEME === 'FIAT') pointTexture()
  if (COLOR_SCHEME !== 'CRYPTO') squigTexture()
  pop()
}


function keyPressed() {
  if (keyCode === 83) {
    saveCanvas(__canvas, 'FIM-' + Date.now(), 'jpg');
  }
}
