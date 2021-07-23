// Fake Internet Money has value as money because it's backed by Proof of Art. It has value as art because it literally is money.
// It has value because of its high-tech anti conterfeiting devices, letting you know that it's authentic.
//




// Fake Internet Money is the world's first on-chain fungible NFT currency.
// The monetary value of each bill is backed by a stunning generative work of art.
// Meanwhile, the artistic value of the piece is enhanced by its status as a financial asset.
// This symbiotic relationship guarantees













// Fake Internet Money invites the viewer/holder to critically examine the relationship between money and art. Viewing money _as_ art, and art _as_ money.
// In the context of NFTs, money and art become interchangable. What gives this piece value? How is this related to how art and fiat currencies are given value?
// Also examines the nature of authenticity



















// color palletes: fiat, crypto, bullion, conterfeit, funny money

// other feature words: greenback, credit, guilloche

// serial number: star note, binary, radar




/* TODO

- numbers
  - 1, 2, 5, 0
  - I, V, X, L, C
- side emblem
  - federal reserve-style green star

- watermarks
  - cryptogodking
  - echo star
  - spirograph

- center piece
  - number
  - face? smiley face?
  - cgk
  - star
  empty

- corners
  - square
  - solid background + standard rosette
  https://en.numista.com/catalogue/note213565.html

- border
  - overlapping guilloche patterns (ex 100 bill)


- middle rosette
  - rectangular background
  - little rosettes everywhere
  - little rosettes making up one larger rosette
  - smaller alternating rosette/bg/rosette/bg https://en.numista.com/catalogue/note231376.html

- holograph

- styles
  - floral
  - guilloche
  - numeric
  - digital (grid)
  - hodgepodge
  - echo

- colors
  - red/green/yellow https://en.numista.com/catalogue/note218041.html
  - https://en.numista.com/catalogue/note212473.html
  - black/white/red/green https://en.numista.com/catalogue/note218332.html


*/


let SCALE,
    STROKE_C,
    STROKE_LIGHT_C,
    FILL_C,
    BRIGHT_C,
    BRIGHT_LIGHT_C,
    ACCENT_C,
    HUE,
    DENOMINATION

let W = 600
let H = 400
const W_H_RATIO = W/H
const GRAPHIC_RESOLUTION = 4



let __canvas
let borderGraphic

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


  noLoop()
  colorMode(HSB, 360, 100, 100)



  DENOMINATION = sample(['1', '2', '5', '10', '20', '50', '100', 'I', 'II', 'V', 'X', 'XX', 'L', 'C', '$'])
  HUE = int(rnd(0,360))
  // STROKE_C = color(HUE, 26, 25)
  STROKE_C = color(hfix(HUE), 26, 25)
  STROKE_LIGHT_C = color(hfix(HUE), 36, 30)
  FILL_C = color(hfix(HUE-72), 6, 91)
  STROKE_C2 = color(hfix(HUE-132), 6, 91)

  BRIGHT_C = color(HUE-40, 75, 85)
  BRIGHT_LIGHT_C = color(HUE-40, 25, 75)
  ACCENT_C = color(HUE-40, 77, 64)



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

  randomBgPattern()

  squigTexture()
  pointTexture()

  randomBorder()

  const centerP = genRosetteParams({strokeC: FILL_C})
  dollarRosetteBg(0,0, 150, 0, {
    ...centerP,
    outterC: STROKE_C,
    innerC: BRIGHT_C,
  })
  dollarRosette(0,0,150, 0, centerP)

  dollarRosetteBg(0,0, 67, 0, {
    ...centerP,
    outterC: STROKE_C,
    innerC: BRIGHT_C,
  })
  dollarRosette(0,0,70, 60, centerP)

  drawStr(DENOMINATION, 2,2, 0.4, STROKE_C)
  drawStr(DENOMINATION, 0,0, 0.4, FILL_C)

  corners1()


  //   const p = genBorder5Params()
  //   solidBorder5()
  // })
// sideEmblemDollar()
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



function corners1() {
  const T = 58-H/2
  const L = 58-W/2
  const B = H/2-58
  const R = W/2-58

  const p = genFloralRosetteParams()
  const p2 = genFloralRosetteParams()
  floralRosette(L, T, 40, 30, {...p, fillC: FILL_C})
  drawStr(DENOMINATION, L, T, 0.3, STROKE_C)

  floralRosette(R, T, 40, 30, {...p, fillC: FILL_C})
  drawStr(DENOMINATION, R, T, 0.3, STROKE_C)

  floralRosette(L, B, 40, 30, {...p, fillC: FILL_C})
  drawStr(DENOMINATION, L, B, 0.3, STROKE_C)

  floralRosette(R, B, 40, 30, {...p, fillC: FILL_C})
  drawStr(DENOMINATION, R, B, 0.3, STROKE_C)

  // const pc = genRosetteParams({strokeC: FILL_C})
  // console.log(pc)

  // dollarRosetteBg(62-W/2,62-H/2,60, 0, {
  //   ...pc,
  //   outterC: STROKE_C,
  //   innerC: BRIGHT_C,
  // })
  // dollarRosette(62-W/2,62-H/2,60, 30, pc)
  // drawStr(DENOMINATION,62-W/2,62-H/2,0.3, FILL_C)

  // dollarRosetteBg(W/2-62,62-H/2,60, 0, {
  //   ...pc,
  //   outterC: STROKE_C,
  //   innerC: BRIGHT_C,
  // })
  // dollarRosette(W/2-62,62-H/2,60, 30, pc)
  // drawStr(DENOMINATION,W/2-62,62-H/2,0.3, FILL_C)



  // dollarRosetteBg(62-W/2,H/2-62,60, 0, {
  //   ...pc,
  //   outterC: STROKE_C,
  //   innerC: BRIGHT_C,
  // })
  // dollarRosette(62-W/2,H/2-62,60, 30, pc)
  // drawStr(DENOMINATION,62-W/2,H/2-62,0.3, FILL_C)

  // dollarRosetteBg(W/2-62,H/2-62,60, 0, {
  //   ...pc,
  //   outterC: STROKE_C,
  //   innerC: BRIGHT_C,
  // })
  // dollarRosette(W/2-62,H/2-62,60, 30, pc)
  // drawStr(DENOMINATION,W/2-62,H/2-62,0.3, FILL_C)



  drawStr(DENOMINATION, 2,2, 0.4, STROKE_C)
  drawStr(DENOMINATION, 0,0, 0.4, FILL_C)
}

function layout1() {

  // bg9()


  const p00 = genRosetteParams({strokeC: FILL_C})
  dollarRosette(110,0,105,75,{...p00, fillC: STROKE_C, strokeW:6})
  dollarRosette(110,0,100, 75, p00)

  dollarRosette(-110,0,105,75,{...p00, fillC: STROKE_C, strokeW:6})
  dollarRosette(-110,0,100, 75, p00)

  const p0 = genRosetteParams({strokeC: FILL_C})
  dollarRosette(60,0,135,75,{...p0, fillC: STROKE_C, strokeW:6})
  dollarRosette(60,0,130, 75, p0)

  dollarRosette(-60,0,135,75,{...p0, fillC: STROKE_C, strokeW:6})
  dollarRosette(-60,0,130, 75, p0)

  const p1 = genRosetteParams({strokeC: FILL_C})
  dollarRosette(0,0,155,75,{...p1, fillC: STROKE_C, strokeW:6})
  dollarRosette(0,0,150, 75, p1)

  const p2 = genRosetteParams({strokeC: FILL_C})
  dollarRosette(0,0,125,30,{...p2, fillC: STROKE_C, strokeW:6})
  dollarRosette(0,0,120, 30, p2)

  const p3 = genRosetteParams({strokeC: FILL_C})
  dollarRosette(0,0,95,30,{...p3, fillC: STROKE_C, strokeW:6})
  dollarRosette(0,0,90, 30, p3)



// textAlign(CENTER)
// push()
//   textSize(16)
//   stroke(color(86, 100, 0))
//   fill(color(86, 100, 70))
//   strokeWeight(1)
//   // text('909090909090', 100,-130)
//   text('909090909090', -180, 130)
// pop()


//   strokeWeight(1)
//   fill(STROKE_C)
//   textSize(80)
//   text('10', W/2 - 50,-H/2 + 65)
//   text('X', -W/2 + 50,H/2 - 65)
// centerSymbol()
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

  const b = rnd()
  if (b < 0.125) {
    border2(10)
    border1(15)
    border1(30)
  }
  else if (b < 0.25) border2()
  else if (b < 0.375) border5()
  else if (b < 0.5) denominationBorder(5)
  else if (b < 0.625) solidBorder3()
  else if (b < 0.95) solidBorder5()

  const noop = () => {}
  let rosetteFn
  let borderFn = rosetteBg
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
    borderFn = rosetteBg
    rosetteFn = floralRosette
    paramFn = genFloralRosetteParams
  } else if (ros < 0.85) {
    rosetteFn = denominationRosette(5)
    borderFn = noop
  } else {
    rosetteFn = rosetteBg
  }
  middleRosette(80, rosetteFn, borderFn, paramFn, 0.4)
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

























