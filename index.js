


let SCALE,
    DARK_C,
    STROKE_LIGHT_C,
    LIGHT_C,
    BRIGHT_C,
    BRIGHT_LIGHT_C,
    ACCENT_C,
    HUE,
    DENOMINATION,
    ROSETTE_STYLE,
    IS_VINTAGE,
    IS_DECO,
    SHOW_NUMERALS

const W = 600
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

let ellapsed=0
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
  colorMode(HSB, 360, 100, 100)



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



  HUE = int(rnd(0,360))
  DARK_C = color(HUE, 26, 25)
  LIGHT_C = color(hfix(HUE-72), 6, 91)

  // TODO swap these for non vintage occasionally
  ROSETTE_FILL_C = IS_VINTAGE ? LIGHT_C : DARK_C
  ROSETTE_STROKE_C = IS_VINTAGE ? DARK_C : LIGHT_C



  STROKE_LIGHT_C = color(HUE, 26, 35)
  DARK_C2 = color(hfix(HUE-132), 6, 91)

  BRIGHT_C = color(hfix(HUE-40), 75, 85)
  BRIGHT_LIGHT_C = color(hfix(HUE-40), 25, 75)
  ACCENT_C = color(hfix(HUE-40), 77, 64)
  GRADIENT_C = color(hfix(HUE-180), 40, 60)

  SHOW_NUMERALS = rnd() < 0.2








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
  ellapsed++

  translate(width/2, height/2)
  scale(SCALE)
  noFill()



  stroke(DARK_C)
  background(LIGHT_C)


  if (rnd() < 0.8125)
    mainLayout()
  else
  stripLayout()

}


function keyPressed() {
  if (keyCode === 83) {
    saveCanvas(__canvas, 'FIM-' + Date.now(), 'jpg');
  }
}
