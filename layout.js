function sideEmblemDollar() {

  textSize(60)
  textAlign(CENTER, CENTER)
  strokeWeight(0.5)
  bg7()
  // oversaturaedRosette()
  // middleRosette(80)
  drawBorderGraphic(() => {
  //   trancendentalMoneyBg()
    border8()
  // //   border2(10)
  // //   border1(15)
  // //   border1(30)

  })

  rosetteCorners()

  // dollarRosette(0, 0, 100, 75)

  translate(100,0)
  interestingPattern4()
  translate(-100,0)
  // const params = genRosetteParams()
  // dollarLineRosette(0,0,200, 80, params)
  // strokeWeight(2)




  strokeWeight(1)
  fill(0)
  text(10, -80,0)



  textSize(16)
  // stroke(color(H, 100, 0))
  // fill(color(H, 100, 70))
  strokeWeight(1)
  text('909090909090', 100,110)
  text('909090909090', -100,-110)
}

function standardDollar() {
  push()
  const h = 86

  textSize(60)
  textAlign(CENTER, CENTER)
  // border2(10)

  // border1(15)
  // border1(30)

  rosetteCorners()

  const params = genRosetteParams()
  rosetteBorder(0, 0, 100, 75, params)
  dollarRosette(0, 0, 100, 75, params)


  textSize(16)
  stroke(color(h, 100, 0))
  fill(color(h, 100, 70))
  strokeWeight(1)
  text('909090909090', 100,110)
  text('909090909090', -100,-110)
  signature(-75,100, 10)
  pop()
}

function rosetteCorners() {
  strokeWeight(0.25)
  const params = genRosetteParams()
  const cornerPadding = 70
  rosetteBorder(-W/2+cornerPadding, -H/2+cornerPadding, cornerPadding, cornerPadding/2, params)
  dollarRosette(-W/2+cornerPadding, -H/2+cornerPadding, cornerPadding, cornerPadding/2, params)

  rosetteBorder(W/2-cornerPadding, -H/2+cornerPadding, cornerPadding, cornerPadding/2, params)
  dollarRosette(W/2-cornerPadding, -H/2+cornerPadding, cornerPadding, cornerPadding/2, params)

  rosetteBorder(-W/2+cornerPadding, H/2-cornerPadding, cornerPadding, cornerPadding/2, params)
  dollarRosette(-W/2+cornerPadding, H/2-cornerPadding, cornerPadding, cornerPadding/2, params)

  rosetteBorder(W/2-cornerPadding, H/2-cornerPadding, cornerPadding, cornerPadding/2, params)
  dollarRosette(W/2-cornerPadding, H/2-cornerPadding, cornerPadding, cornerPadding/2, params)
}


const withStyle = (cb) => {
  // stroke(STROKE_C)
  // strokeWeight(2)
  // cb()
  // stroke(STROKE_C2)
  // strokeWeight(1)
  // cb()
}


function middleRosette(radius=100, rosetteFn, rosetteBorderFn, paramsFn, radAdj) {
  // strokeWeight(0.25)
  const params1 = paramsFn()
  const params2 = paramsFn()


  // strokeWeight(0.5)
  withStyle(() => rosetteBorderFn(-125, 0,radius, radius*radAdj, params1))
  withStyle(() => rosetteFn(-125, 0, radius, radius*radAdj, params1))
  // rosetteBorderFn(-125, 0,smallRadius, smallRadius*0.7, params1)
  // rosetteFn(-125, 0, smallRadius, smallRadius*0.7, params1)

  withStyle(() => rosetteBorderFn(125, 0,radius, radius*radAdj, params1))
  withStyle(() => rosetteFn(125, 0, radius, radius*radAdj, params1))

  // rosetteBorderFn(125, 0,smallRadius, smallRadius*0.7, params1)
  // rosetteFn(125, 0, smallRadius, smallRadius*0.7, params1)

  withStyle(() => rosetteBorderFn(0, 0, radius*1.2, radius*1.2*radAdj, params2))
  withStyle(() => rosetteFn(0, 0, radius*1.2, radius*1.2*radAdj, params2))


  // strokeWeight(3)
  // const denomination = shuffle([1, 2, 5, 10, 20, 50, 100]).pop()
  // text(denomination, 0,0)
}


