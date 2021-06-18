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
    FILL_C,
    FILL_C2,
    HUE

const W_H_RATIO = 600/350


let __canvas, width_, height_
function setup() {
  const windowRatio = window.innerWidth/window.innerHeight

  if (W_H_RATIO < windowRatio) {
    __canvas = createCanvas(window.innerHeight * W_H_RATIO, window.innerHeight)
    SCALE = window.innerHeight/350

  } else if (W_H_RATIO > windowRatio) {
    __canvas = createCanvas(window.innerWidth, window.innerWidth /W_H_RATIO)
    SCALE = window.innerWidth/600

  } else {
    __canvas = createCanvas(window.innerWidth, window.innerHeight)
    SCALE = 1
  }

  width_ = width / SCALE
  height_ = height / SCALE

  // console.log(adjH, adjW)
  // __canvas = createCanvas(window.innerWidth * s, window.innerHeight * s);

  noLoop()
  colorMode(HSB, 360, 100, 100)


  HUE = int(rnd(0,360))
  STROKE_C = color(HUE, 26, 25)
  FILL_C = color(HUE-32, 6, 91)
  FILL_C2 = color(HUE-92, 6, 91)

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
  // FILL_C2 = sample(softColors)
}


function draw() {
  translate(width/2, height/2)
  scale(SCALE)
  noFill()
  // stroke('#344130')
  // background('#e4e7da')
  // background('#d3d6bc')
  // stroke('#273823')



  stroke(STROKE_C)
  background(FILL_C)

  // solidBorder2(80) // + border2
  // solidBorder5(80)
  // borderTest(10, 10)
  squigTexture()
  // pointTexture()
  // translate(50, 50)

  const r = rnd()
  if (r < 0.125) bg1()
  else if (r < 0.25) bg2()
  else if (r < 0.375) bg3()
  else if (r < 0.5) bg4()
  else if (r < 0.625) bg5()
  else if (r < 0.75) bg6()
  else if (r < 0.875) bg7()
  else bg8()

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
  // else if (b < 0.5) solidBorder1()
  // border1()
  // border2()
  // // border3()
  // // border4()
  // border5()
  // solidBorder1()
  // solidBorder3()
  // solidBorder5()



  // border5Layer(40)
  // border5(30, genBorder5Params())

  const noop = () => {}
  let rosetteFn
  let borderFn = rosetteBorder
  let paramFn = random() < 0.5
    ? genRosetteParams
    : (console.log('dist'), genDistortedRosetteParams)

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
    borderFn = rosetteBorder
    rosetteFn = floralRosette
    paramFn = genFloralRosetteParams
  } else if (ros < 0.85) {
    rosetteFn = denominationRosette(5)
    borderFn = noop
  } else {
    rosetteFn = rosetteBorder
  }
  middleRosette(80, rosetteFn, borderFn, paramFn, 0.4)
  // dollarRosette(0, 0, 100, 40, genRosetteParams())
    // floralRosette(0,0,90)



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

  // middleRosette(80, floralRosette, () => {}, genFloralRosetteParams, 0.4)

  // drawCGK(100)
  // strokeWeight(1)
  // stroke(STROKE_C)
  // border5(40)
  // interestingPattern5()
  // strokeWeight(1)
  // stroke(STROKE_C)


  // strokeWeight(1)
  // stroke(STROKE_C)
  // border5(40)
  // border2(10)
  // border1(15)
  // border1(0, 1, 0.333333)
  // border1(15, 1, 0.333333)
  // border1(30, 1, 0.333333)
  // border1(45, 1, 0.333333)
  // border1(60, 1, 0.333333)
  // border1(75, 1, 0.333333)
  // border1(90, 1, 0.333333)
  // border1(105, 1, 0.333333)
  // border1(120, 1, 0.333333)
  // border1(135, 1, 0.333333)
  // border1(150, 1, 0.333333)
  // border1(165, 1, 0.333333)
  // border2(50)


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
  // distortedRosetteBorder()
  // frameGenerator()
  // rosetteSketch(0,0, 180, 0)
  // dollarRosette(0, 0, 150, 150*75)

  // running out of ink:
  // for(let x=0; x<width_; x++)
  // for(let y=0; y<height_; y++) {
  //   stroke(color(0,0,100, rnd(0, 1)))
  //   point(x-width_/2, y-height_/2)
  // }

}

function keyPressed() {
  if (keyCode === 83) {
    saveCanvas(__canvas, 'FIM-' + Date.now(), 'jpg');
  }
}

// function mouseWheel(event) {
//   SCALE -= (SCALE*event.delta/500)
// }


































