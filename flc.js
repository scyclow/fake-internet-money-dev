
let __canvas, __borderGraphic, MISPRINT_LATHE_MALFUNCTION, MISPRINT_ROSETTE_PARAMS_EXCEEDED
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


const SERIAL_NUMBER = tokenData.tokenId || '001'

function preload() {
  fontData = loadFont('ShipporiMinchoB1-Regular.ttf');
}


const ASPECT_RATIO = 1.5
const H = 600
const W = H*ASPECT_RATIO
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

  __borderGraphic = createGraphics(W,H)
  const currentPixelDensity = __borderGraphic.pixelDensity() || 2
  __borderGraphic.pixelDensity(currentPixelDensity*GRAPHIC_RESOLUTION)




  noLoop()
  colorMode(HSB, 360, 100, 100, 100)


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
  STIPLE_C = color(HUE, 99, 90, 50)

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

  MISPRINT_ROSETTE_PARAMS_EXCEEDED = prb(0.5)
  MISPRINT_LATHE_MALFUNCTION = false//prb(0.2)
  MISPRINT_SKEWED = false//prb(0.2)
  MULTIPLE_DRAWS = false//prb(0.2) ? int(rnd(2, 8)) : 0

  MISPRINT_PIGMINTATION_MALFUNCTION = prb(0.025)
  MISPRINT_PIGMINTATION_MISSING = prb(0.05)




  if (MISPRINT_PIGMINTATION_MALFUNCTION) {
    LIGHT_C = color(hfix(HUE-183), 96, 95)
    DARK_C = color(HUE, isBlue ? 80 : 100, 95)
    LIGHTENED_DARK_C = color(HUE, 69, 95)
    ACCENT_C = DARK_C
  }

  if (MISPRINT_PIGMINTATION_MISSING) {
    const inverse = prb(0.5)
    LIGHT_C = inverse ? color('#fff') : color('#000')
    DARK_C = inverse ? color('#000') : color('#fff')
    LIGHTENED_DARK_C = DARK_C
    ACCENT_C = DARK_C
  }

  if (prb(0.5) && MISPRINT_PIGMINTATION_MISSING || MISPRINT_PIGMINTATION_MALFUNCTION) {
    LIGHT_ACCENT_C = ACCENT_C
    BRIGHT_LIGHT_C = ACCENT_C
    BRIGHT_DARK_C = BRIGHT_LIGHT_C
    LIGHT_GRADIENT_C = LIGHT_C
    LIGHT_ACCENT_C = LIGHTENED_DARK_C
    STIPLE_C = DARK_C
  }

  SHADOW_C = prb(0.2) ? ACCENT_C : DARK_C
}


function draw() {
  scale(SCALE)
  translate(W/2, H/2)
  background(0)
  drawTexture()

  MISPRINT_SKEWED && skewed()

  drawContent()

  for (let i = 1; i < MULTIPLE_DRAWS; i++) {
    push()
    translate(random(-W, W), random(-H, H))
    drawContent()

    pop()
  }

  // 0x7c23c1b7e544e3e805ba675c811e287fc9d71949

}

const getHighlightPColors = () => !IS_VINTAGE ? ({
  strokeC: ROSETTE_STROKE_C,
  innerC: HIGHLIGHT ? ROSETTE_STROKE_C : LIGHTENED_DARK_C,
  outterC: HIGHLIGHT ? ROSETTE_FILL_C : ROSETTE_FILL_C,
}) : {}

function drawContent() {
  _randomBorder()

  const infoY = 185
  const titleY = -152

  signature(
    120,
    infoY,
    28,
  )

  const serialX = -300
  textFont(fontData);
  stroke(DARK_C)
  fill(LIGHT_C)
  rect(serialX-3, infoY-3, 76, 31)
  fill(ACCENT_C)
  textSize(18)
  text(`${SERIAL_NUMBER}/256`, serialX+3, infoY+18)

  emblem(250, infoY)

  textSize(70)
  textAlign(CENTER)
  strokeWeight(3)
  fill(DARK_C)

  stroke(SHADOW_C)
  text('FRACTIONAL LOSS', 1, titleY)
  stroke(LIGHT_C)
  text('FRACTIONAL LOSS', 0, titleY+1)

  stroke(SHADOW_C)
  text('CERTIFICATE', 2, titleY+85)
  stroke(LIGHT_C)
  text('CERTIFICATE', 0, titleY+2+85)


  stroke(SHADOW_C)
  textSize(15)
  strokeWeight(1)
  const yOffset = 0
  const xOffset = 0
  const lineHeight = 30

  const lines = [
    'This certificate represents a one two hundred fifty-sixth fraction of the 25.6178 ETH',
    'loss sustained by Ethereum address: 0x7c23c1b7e544e3e805ba675c811e287fc9d71949',
    'following the public exposure of its private key on October 15, 2021 at 02:44:49 AM (UTC).',
    'The -0.1000695313 ETH par value of this certificate represents a proportionate share of',
    'the loss, which is payable upon issuance.'
  ]

  lines.forEach((line, i) => text(line, xOffset, i*lineHeight+yOffset))




  // text('The holder of this certificate is entitled to experience a proportionate share of the loss, equaling', xOffset, 90+yOffset)
  // text('par value of -0.1000695313 ETH, redeemable upon payment.', xOffset, 120+yOffset)

  // text('This certificate represents a 1/256 fraction of the 25.6178 ETH loss sustained by', xOffset, 0+yOffset)
  // text('Ethereum address: 0x7c23c1b7e544e3e805ba675c811e287fc9d71949 following the', xOffset, 30+yOffset)
  // text('public exposure of its private key on October 14, 2021 at 10:45PM (EDT). The holder', xOffset, 60+yOffset)
  // text('of this certificate is entitled to a proportionate share of this loss, totaling ', xOffset, 90+yOffset)
  // text('0.1000695313 ETH', xOffset, 120+yOffset)




  // text('of the total loss value of 25.60equal to one two hundred fifty sixth the total lossof -0.1 ETH, ', 0, 120+yOffset)


    // All holders of this note are entiteld to one two hundred fiftieth of the monetary loss of this event, estimated to be approximately.
  // Holders are in no way entiteld to any tax write off or any other form of
  // monetary or non-monetary compensation from holding this note.
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


  dollarEchoRosette(x,y, 50, 0, p)
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

function skewed() {
  const shearFn = prb(0.5) ? shearY : shearX
  shearFn(PI *posOrNeg()/ rnd(4, 10))
}