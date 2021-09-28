
let __canvas, __borderGraphic, MISPRINT_LATHE_MALFUNCTION, MISPRINT_ROSETTE_PARAMS_EXCEEDED
let ellapsed = 0
let IS_DECO, IS_VINTAGE
GRAPHIC_RESOLUTION = 4
let W, H, W_H_RATIO
let STROKE_MOD = 1
IS_BULLION=false
IS_SILVER=false
IS_CRYPTO=false
COLOR_SCHEME='FIAT'
HIGHLIGHT=false
COUNTERFEIT=false

const SERIAL_NUMBER = tokenData.tokenId

function preload() {
  fontData = loadFont('ShipporiMinchoB1-Regular.ttf');
}

function setup() {
  console.log(tokenData.hash)

  const size = min(window.innerWidth, window.innerHeight);
  __canvas = createCanvas(size, size)

  SCALE = size / 789
  W = size/SCALE
  H = size/SCALE
  W_H_RATIO = W/H

  noLoop()
  __borderGraphic = createGraphics(W,H)
  const currentPixelDensity = __borderGraphic.pixelDensity() || 2
  __borderGraphic.pixelDensity(currentPixelDensity*GRAPHIC_RESOLUTION)
  colorMode(HSB, 360, 100, 100, 100)


  HUE = int(rnd(0,360))
  if (Number(SERIAL_NUMBER) === 0) HUE = 155
  DARK_C = color(HUE, 26, 25)
  LIGHT_C = color(hfix(HUE-72), 6, 91)
  LIGHT_GRADIENT_C = color(hfix(max(HUE-72, 0)), 6, 91)
  LIGHTENED_DARK_C = color(HUE, 16, 55)
  ACCENT_C = color(hfix(HUE-145), 80, 64)
  LIGHT_ACCENT_C = color(hfix(HUE-145), 55, 64, 30)
  BRIGHT_LIGHT_C = color(max(HUE-10, 0), 80, 54)
  BRIGHT_DARK_C = BRIGHT_LIGHT_C

  VIBRANT_GRADIENT = prb(0.05)
  const rosetteStyleSeed = hshrnd(5)
  if (rosetteStyleSeed < 0.0625){
    ROSETTE_STYLE = 'DECO'
    IS_DECO = true
  }
  else if (rosetteStyleSeed < 0.6)
    ROSETTE_STYLE = 'NUMISMATIC'
  else if (rosetteStyleSeed < 0.8) {
    ROSETTE_STYLE = 'VINTAGE'
    IS_VINTAGE = true
  }
  else if (rosetteStyleSeed < 0.86)
    ROSETTE_STYLE = 'ECHO'
  else if (rosetteStyleSeed < 0.96)
    ROSETTE_STYLE = 'DIGITAL'
  else if (rosetteStyleSeed < 0.9825)
    ROSETTE_STYLE = 'LINE'
  else
    ROSETTE_STYLE = 'DENOMINATION'

  const reverseRosetteColors = prb(0.5) || IS_BULLION
  const lightC = IS_SILVER ? BRIGHT_LIGHT_C : LIGHT_GRADIENT_C
  const darkC = HIGHLIGHT && !IS_DECO && !IS_VINTAGE && !IS_BULLION ? BRIGHT_DARK_C : DARK_C
  ROSETTE_FILL_C = IS_VINTAGE || reverseRosetteColors ? lightC : darkC
  ROSETTE_STROKE_C = IS_VINTAGE || reverseRosetteColors ? darkC : lightC

  HIGHLIGHT = !IS_VINTAGE && prb(0.125)
}


function draw() {
  scale(SCALE)
  translate(W/2, H/2)
  background(0)
  drawTexture()

  _randomBorder()

  const infoY = 255
  const iouY = -125

  signature(
    -40,
    infoY,
    30,
  )

  const serialX = 60
  textFont(fontData);
  stroke(DARK_C)
  fill(LIGHT_C)
  rect(serialX, infoY, 60, 20)
  fill(ACCENT_C)
  textSize(13)
  text(SERIAL_NUMBER, serialX+3, infoY+15)

  emblem(250, infoY+5)

  textSize(230)
  textAlign(CENTER)
  strokeWeight(3)
  fill(DARK_C)

  stroke(DARK_C)
  text('I O U', 2, iouY)
  stroke(LIGHT_C)
  text('I O U', 0, iouY+2)



  stroke(DARK_C)
  textSize(18)
  strokeWeight(1)
  const yOffset = -55
  text('This IOU is a bearer instrument. It should in no way be considered a', 0, 0+yOffset)
  text('promissory note. While this token may possibly be exchanged with other', 0, 30+yOffset)
  text('parties for monetary or non-monetary compensation, there should be', 0, 60+yOffset)
  text('no reasonable expectation of profit from holding it. The Issuer of this', 0, 90+yOffset)
  text('IOU makes no claims or guarantees that it will be redeemable for an', 0, 120+yOffset)
  text('asset or service of any kind at a later date. In no event shall the Issuer', 0, 150+yOffset)
  text('be held liable for any damages arising from holding the IOU. The', 0, 180+yOffset)
  text('Issuer reserves the right to revoke this IOU, change its thumbnail,', 0, 210+yOffset)
  text('name, or description, and issue new IOUs at their sole discretion.', 0, 240+yOffset)


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
      VIBRANT_GRADIENT || IS_BULLION || HIGHLIGHT ? BRIGHT_LIGHT_C : DARK_C,
      VIBRANT_GRADIENT || IS_BULLION || (IS_CRYPTO&&HIGHLIGHT) ? i/W : i/(W*5)
    ))
    line(x+diag, -H/2, x, H/2)
  }
  pop()

  if (COLOR_SCHEME === 'FIAT') pointTexture()
  if (IS_CRYPTO && BG_TYPE !== 'STANDARD') stippleTexture()
  if (!IS_CRYPTO) squigTexture()
}



function emblem(x, y) {
  push()
  noFill()
  const c1 = int(rnd(3, 11)) * posOrNeg()
  const p = genRosetteParams({
    strokeC: ACCENT_C,
    strokeW: 1,
    rDiff: 2,
    ignoreShrink: true,
    c1,
    c2: (c1 + 5) * posOrNeg()
  })


  dollarEchoRosette(x,y, 40, 0, p)
  pop()
}


function _randomBorder() {
  const borderSeed = rnd()
  if (borderSeed <= 0.015) return

  const vintageBorderProb = IS_VINTAGE ? 0.5 : 0.25
  drawBorderGraphic(() => {
    if (borderSeed < vintageBorderProb) {
      const vintageBorderSeed = rnd()
      const degAdj = posOrNeg() * (vintageBorderSeed < 0.75 ? 2 : 3)
      const params = vintageBorderParams({ degAdj })
      const padding = 8 + params.radius

      vintageBorder(padding, params)
      prb(0.25) && vintageBorder(padding, vintageBorderParams({ degAdj: degAdj * -1 }))
    }

    else if (borderSeed < 0.55) {
      curveCornerBorders(60)
    }

    else if (borderSeed < 0.8) {
      darkRosetteBorder(-10, prb(0.7))
    }


    else if (borderSeed < 0.85) {
      border1(10, int(rnd(20, 200)))
    }

    else if (borderSeed < 0.9) {
      dottedBorder(20)
    }

    else {
      border7(20, int(rnd(1, 7)), posOrNeg())
    }

  })
}