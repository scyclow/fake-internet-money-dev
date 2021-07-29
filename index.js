


let SCALE,
    STROKE_C,
    STROKE_LIGHT_C,
    FILL_C,
    BRIGHT_C,
    BRIGHT_LIGHT_C,
    ACCENT_C,
    HUE,
    DENOMINATION,
    ROSETTE_STYLE,
    SHOW_NUMERALS

let W = 600
let H = 400
const W_H_RATIO = W/H
const GRAPHIC_RESOLUTION = 4





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
  if (denominationSeed < 0.5) DENOMINATION = '1'
  else if (denominationSeed < 3/4) DENOMINATION = '5'
  else if (denominationSeed < 7/8) DENOMINATION = '10'
  else if (denominationSeed < 15/16) DENOMINATION = '20'
  else if (denominationSeed < 31/32) DENOMINATION = '50'
  else if (denominationSeed < 63/64) DENOMINATION = '100'
  else if (denominationSeed < 127/128) DENOMINATION = '2'



  HUE = int(rnd(0,360))
  STROKE_C = color(HUE, 26, 25)
  STROKE_LIGHT_C = color(HUE, 26, 35)
  FILL_C = color(hfix(HUE-72), 6, 91)
  STROKE_C2 = color(hfix(HUE-132), 6, 91)

  BRIGHT_C = color(hfix(HUE-40), 75, 85)
  BRIGHT_LIGHT_C = color(hfix(HUE-40), 25, 75)
  ACCENT_C = color(hfix(HUE-40), 77, 64)
  GRADIENT_C = color(hfix(HUE-180), 40, 60)

  SHOW_NUMERALS = rnd() < 0.2


  const rosetteStyleSeed = rnd()
  if (rosetteStyleSeed < 0.75) ROSETTE_STYLE = 'NUMISMATIC'
  // } else if (rosetteStyleSeed < 0.7) {
  //   ROSETTE_STYLE = 'VINTAGE'
  else if (rosetteStyleSeed < 0.85) ROSETTE_STYLE = 'ECHO'
  else if (rosetteStyleSeed < 0.95) ROSETTE_STYLE = 'DIGITAL'
  else ROSETTE_STYLE = 'LINE'




  // STROKE_C = '#65aaba'
  // FILL_C = '#cc5b95'
  // STROKE_C2 = '#4145a7'

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
  // STROKE_C = sample(softColors)
  // FILL_C = sample(softColors)
  // STROKE_C2 = sample(softColors)
}


function draw() {
  ellapsed++

  translate(width/2, height/2)
  scale(SCALE)
  noFill()
  // stroke('#344130')
  // background('#e4e7da')
  // background('#d3d6bc')
  // stroke('#273823')



  stroke(STROKE_C)
  background(FILL_C)



  fuckItDoTheLayoutFromScratch()






  if (rnd() < 0.666)
    standardLayout()
  else
  stripLayout()



// sideEmblemDollar()
// randLayout()







// push()
// stroke(STROKE_LIGHT_C)
//   randomWatermark(150, 60)
//   randomWatermark(-150, -60)
// pop()



  // corners1()


  //   const p = genBorder5Params()
  //   solidBorder5()
  // })
  // bg4()
  // drawBorderGraphic(() => {
  //   trancendentalMoneyBg()
  //   // border8()
  // //   border2(10)
  // //   border1(15)
  // //   border1(30)
  // })
  // gradientRosette()

  // strokeWeight(3)
  // interestingPattern4()
  // strokeWeight(2)
  // stroke(FILL_C)
  // interestingPattern4()
  // strokeWeight(1)
  // stroke(STROKE_C)
  // interestingPattern4()


  // sketch()











// rosetteBgFn(-125, 0,radius, radius*radAdj, params1)
  // dollarRosette(0, 0, 150, 40, genRosetteParams())



    // floralRosette(0,0,90)





  // middleRosette(80, floralRosette, () => {}, genFloralRosetteParams, 0.4)




  // standardDollar()
  // pointTexture()
  // denominationTexture(10)
  // bg6()
  // denominationBorder(5, 20)
  // const params = genRosetteParams()
  // denominationRosette(5,0,0,130, params)
  // denominationRosette(5,0,0,110, params)
  // denominationRosette(5,0,0,90, params)
  // denominationRosette(5,0,0,70, params)
  // denominationRosette(5,0,0,50, params)
  // denominationRosette(5,0,0,30, params)

  // border1(10)

  // fuckedBorder1()
  // border1(15)
  // border1(30)
  // border4(15)


  // standardDollar()
  // sideEmblemDollar()
  // middleRosette(70)
  // distortedRosette(0,0,120)
  // distortedMiddleRosette()
  // distortedrosetteBg()
  // frameGenerator()
  // rosetteSketch(0,0, 180, 0)
  // dollarRosette(0, 0, 150, 150*75)





  // running out of ink:
  // for(let x=0; x<W; x++)
  // for(let y=0; y<H; y++) {
  //   stroke(color(0,0,100, rnd(0, 1)))
  //   point(x-W/2, y-H/2)
  // }

}







function randLayout() {

  // const r = rnd()
  // if (r < 0.125) bg1()
  // else if (r < 0.25) bg2()
  // else if (r < 0.375) bg3()
  // else if (r < 0.5) bg4()
  // else if (r < 0.625) bg5()
  // else if (r < 0.75) bg6()
  // else if (r < 0.875) bg7()
  // else bg8()
  // bg10()



  const noop = () => {}
  let rosetteFn
  let borderFn = () => {}
  let paramFn = random() < 0.5
    ? genRosetteParams
    : genDistortedRosetteParams

  const ros = rnd()
  if (ros < 0.25) {
    rosetteFn = dollarRosette
  } else if (ros < 0.45) {
    rosetteFn = dollarEchoRosette
  } else if (ros < 0.55) {
    rosetteFn = dollarLineRosette
  } else if (ros < 0.65) {
    rosetteFn = dollarCheckeredRosette
  } else if (ros < 0.75) {
    rosetteFn = floralRosette
    paramFn = genFloralRosetteParams
  } else if (ros < 0.85) {
    rosetteFn = denominationRosette(5)
    borderFn = noop
  } else {
    rosetteFn = rosetteBg
  }
  middleRosette(80, dollarRosette, borderFn, paramFn, 0.4)
  standardDollar()
  centerSymbol()
  // pointTexture()

}






function keyPressed() {
  if (keyCode === 83) {
    saveCanvas(__canvas, 'FIM-' + Date.now(), 'jpg');
  }
}

// function mouseWheel(event) {
//   SCALE -= (SCALE*event.delta/500)
// }



function centerSymbol() {
  push()
  noFill()
  stroke(STROKE_C)
  strokeWeight(14)
  multiCurve(0, 0, 30, radians(125), radians(235), 0.7, 3)
  stroke(FILL_C)
  strokeWeight(10)
  multiCurve(0, 0, 30, radians(125), radians(235), 0.7, 3)
  stroke(STROKE_C)
  strokeWeight(8)
  multiCurve(0, 0, 30, radians(125), radians(235), 0.7, 3)
  stroke(FILL_C)
  strokeWeight(4)
  multiCurve(0, 0, 30, radians(125), radians(235), 0.7, 3)
  stroke(STROKE_C)
  strokeWeight(2)
  multiCurve(0, 0, 30, radians(125), radians(235), 0.7, 3)
  pop()
}


function sketch() {
  // circle(0,0, 100)

  getXYCurveLine(-201, -20, 200, 20)

  // shrinkingCorners()
}




function shrinkingCorners() {
  // const p0 = genRosetteParams()
  // const p1 = genRosetteParams({ strokeW: 0.75})
  // const p2 = genRosetteParams({ strokeW: 0.5})

  // console.log('p0', p0)
  // console.log('p1', p1)


  // dollarRosette(105-width/2,105-height/2,85, 50,{...p0, strokeC: FILL_C})
  // dollarRosette(120,0,75,30,{...p1, strokeC: FILL_C})
  // dollarRosette(200,0,45,15,{...p2, strokeC: FILL_C})

  // dollarRosette(105-width/2,105-height/2,80, 30,p0)
  // dollarRosette(240-width/2,85-height/2,50,10,p1)

  // dollarRosette(200,0,40,15,p2)

  times(50, () => {
    const radius = random(20, 150)
    const x = random(-W/2, W/2)
    const y = random(-H/2, H/2)
    const p = genRosetteParams({ strokeW: radius/160 })
    // dollarRosette(x, y, radius+5, 0, {...p, strokeC: FILL_C})
    dollarRosette(x, y, radius, radius/2, {...p, strokeC: random() < 0.5 ? FILL_C : STROKE_C})
  })
}

























