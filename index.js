// Fake Internet Money has value as money because it's backed by Proof of Art. It has value as art because it literally is money.
// It has value because of its high-tech anti conterfeiting devices, letting you know that it's authentic.
//




// Fake Internet Money is the world's first on-chain fungible NFT currency.
// The monetary value of each bill is backed by a stunning generative work of art.
// Meanwhile, the artistic value of the piece is enhanced by its status as a financial asset.
// This symbiotic relationship guarantees



// Think of how many $1 USD bills there are floating around out there. Each one is worth exactly $1. Printing more just creates more dollars
// minting as an act of wealth creation











// Fake Internet Money invites the viewer/holder to critically examine the relationship between money and art. Viewing money _as_ art, and art _as_ money.
// In the context of NFTs, money and art become interchangable. What gives this piece value? How is this related to how art and fiat currencies are given value?
// Also examines the nature of authenticity



















// feature words: greenback, credit, guilloche




/*
Denominations
1: 50%
5: 25%
10: 12.5%
20: 6.25%
50: 3.125%
100: 1.5625%
2: 0.78125%
missing: 0.390625%
mismatcg: 0.390625%

roman numeral present: 5%
  - main: number, secondary: numeral
  - main: numeral, secondary: number
  - main: numeral, secondary: numeral
  -
*/


/*
Misprints 10%
- lathe malfunctions
- low ink
- missing pigmentation
- mirrored
- off center
- too much ink
- missing denomination
- obstructed printing
- transparent print on top of another print
- all rosettes have a fill color set (semi common)
- numotic and prickly borders/rosettes mixed together
- counterfeit (missing signature)
- rosette graphic.rotate(0.2)
*/


/*
Serial numbers 10%
- star note
- standard
- radar note
- binary note
- solid (every number the same)
- ladder (every digit higher than same)
- repeated (first half same as second half)
- low serial number
- high serial number
- missing serial number

http://www.coolserialnumbers.com/FancySerialNumbers.aspx
*/

/*
Color scheme
- Fiat (desaturated) 70%
- Bullion (gradient) 20%
- Crypto (saturated) 10%
- Funny Money -- all over the place

https://en.numista.com/catalogue/note203275.html
*/

/*
Rare Backgrounds
- denomination pattern
- infinity pattern
- lots of random rosettes all over the place

*/

/*
Other rarities
- holographic
- cgk
- counterfeit (missing signature)
*/



/*
Center piece
- portrait
  - empty
  - denomination
  - watermark
- rosette
- double rosette
- florrette
- large florette
*/

/*
Layouts:
- Vintage
- Modern
- misprint: random shit everywhere
*/












/* TODO
- write generic function for displaying a rosette w/ background
  - light/dark bg
  - choose the right rosette style
  - hole or no hole
  - single/double
- generic centerpiece fn
  - large rosette
  - portrait
    - empty
    - denomination
    - shape
    - smily face
    - CGK
  - florrette
  - double florette

- sides of centerpiece
  - double denomination ex [20 ( ) 20]
  - double centerpiece ex [( ) 20 ( )]

-






- line up corner instances with location of watermark
- make corners smaller
- certain border types have special corer possabilities
  - ex. missing border + curved corner borders can have plain numbers
  - bars can have light number text
- swap in different rosette types
- fix rosette bg -- for use dollarRosette for dollar rosette with higher stroke weight AND FILL
- only use floral borders with floral rosettes/numismatic
- move signature around depending on BL corner
- fix number lines
- parameterize rosettes better (type, bg color, hole, number/numeral/empty/$)
- reassess bg; maybe swap one out for something chain-y. maybe something that looks like a financial chart
- add some sort of numisotic stripe









- middle rosette
  - rectangular background
  - little rosettes everywhere
  - little rosettes making up one larger rosette
  - smaller alternating rosette/bg/rosette/bg https://en.numista.com/catalogue/note231376.html



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
    DENOMINATION,
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
  // STROKE_C = color(HUE, 26, 25)
  STROKE_C = color(hfix(HUE), 26, 25)
  STROKE_LIGHT_C = color(HUE, 26, 50)
  FILL_C = color(hfix(HUE-72), 6, 91)
  STROKE_C2 = color(hfix(HUE-132), 6, 91)

  BRIGHT_C = color(HUE-40, 75, 85)
  BRIGHT_LIGHT_C = color(HUE-40, 25, 75)
  ACCENT_C = color(HUE-40, 77, 64)

  SHOW_NUMERALS = rnd() < 0.2



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

  if (rnd() < 0.666) standardLayout()
  else stripLayout()




// push()
// stroke(STROKE_LIGHT_C)
//   randomWatermark(150, 60)
//   randomWatermark(-150, -60)
// pop()



  // corners1()


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


function serialNumber(x, y, sNumber) {
  push()
  fill(FILL_C)
  stroke(STROKE_C)
  rect(x, y, 60, 20)
  // drawStr('99999999', 141,131, 0.125, STROKE_C)
  drawStr(sNumber, x+30,y+10, 0.125, STROKE_C, ACCENT_C)
  pop()
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

























