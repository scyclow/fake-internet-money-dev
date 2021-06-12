let SCALE,
    STROKE_C,
    FILL_C,
    HUE

let __canvas, width_, height_
function setup() {
  const standardRatio = 600/350
  const windowRatio = window.innerWidth/window.innerHeight

  console.log(standardRatio, windowRatio)
  if (standardRatio < windowRatio) {
    __canvas = createCanvas(window.innerHeight * standardRatio, window.innerHeight)
    console.log('wide')
    SCALE = window.innerHeight/350

  } else if (standardRatio > windowRatio) {
    __canvas = createCanvas(window.innerWidth, window.innerWidth /standardRatio)
    console.log('tall')
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
  border1()
  bg16()

  // border1(10)

  // fuckedBorder1()
  // border1(15)
  // border1(30)
  // border5(15)


  // standardDollar()
  // sideEmblemDollar()
  // middleRosette()
  // distortedRosette(0,0,120)
  // distortedMiddleRosette()
  // distortedRosetteBorder()
  // frameGenerator()
  // rosetteSketch(0,0, 180, 0)
  dollarRosette(0, 0, 150)

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








const seed = Date.now()
function frameGenerator(radius=90, x_=0, y_=0) {
  const r1 = radius
  const r2 = radius / 9
  const r3 = radius / 5

  //// for more of a pattern:
  // const r2 = radius / 3

  //// for more of a border:
  // const r3 = radius / 15

  //// dynamic
  // randomSeed(seed)
  // const _x = map(mouseX, 0, width_, 1, 20)
  // const _y = map(mouseY, 0, height_, 1, 20)
  // const r2 = radius / _x
  // const r3 = radius / _y

  const c0Points = 360
  const c1Points = c0Points/int(rnd(1, 13)) * posOrNeg()
  const c2Points = c0Points/int(rnd(170, 192)) * posOrNeg()

  drawCircle(c0Points, p => {
    const angle0 = (p/c0Points) * TWO_PI
    const angle1 = (p/c1Points) * TWO_PI
    const angle2 = (p/c2Points) * TWO_PI

    const [x0, y0] = getXYRotation(
      angle0,
      r1,
      x_, y_
    )
    const [x1, y1] = getXYRotation(
      angle1,
      r2,
      x0, y0
    )

    return getXYRotation(
      angle2,
      r3,
      x1, y1
    )

    //// asymetric:
    // return getXYRotation(
    //   angle2/90,
    //   r3,
    //   x2, y2
    // )
    // return [x0, y0]
  })
}

























