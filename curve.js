const multiCurve = (x_, y_, rad, start, end) => {
  curve4(x_ + rad*0.9, y_, rad, start, end, 0.7, 3, 1)
  curve4(x_ + rad*0.9, y_, rad, start, end, 1.1, 3, 1)
  curve4(x_ + rad*0.9, y_, rad, start, end, 1.2, 3, -1)
  curve4(x_ + rad*0.9, y_, rad, start, end, 0.8, 3, -1)
  curve4(x_ + rad*0.9, y_, rad, start, start+HALF_PI, 0.75, 3, 1)
  curve4(x_ + rad*0.9, y_, rad, start, start+(HALF_PI*0.8), 0.8, 3, 1)

  curve4(x_ - rad*0.9, y_, rad, start+PI, end+PI, 0.7, 3, -1)
  curve4(x_ - rad*0.9, y_, rad, start+PI, end+PI, 1.1, 3, -1)
  curve4(x_ - rad*0.9, y_, rad, start+PI, end+PI, 1.2, 3, 1)
  curve4(x_ - rad*0.9, y_, rad, start+PI, end+PI, 0.8, 3, 1)

  curve4(x_ - rad*0.9, y_, rad, end+PI-HALF_PI, end+PI, 0.75, 3, -1)
  curve4(x_ - rad*0.9, y_, rad, end+PI-(HALF_PI*0.8), end+PI, 0.8, 3, -1)
}


function curve4(
  x_,
  y_,
  radius,
  startAngle,
  endAngle,
  curvePortion,
  curves,
  direction = 1
) {
    const beyond = curvePortion > 1

    arc(x_, y_, radius*2, radius*2, startAngle, endAngle)
    const c = direction === 1 ? endAngle : startAngle
    const endX = cos(c) * radius + x_
    const endY = sin(c) * radius + y_

    const newX = cos(c) * (radius * curvePortion) + x_
    const newY = sin(c) * (radius * curvePortion) + y_


    const x__ = cos(endAngle) * radius
    const y__ = sin(endAngle) * radius
    beginShape()
    curveVertex(endX, endY)

    let deg = beyond ? c - PI : c
    let r = radius * abs(1 - curvePortion)
    for (let i = 0; i < 360 * curves; i++) {
      const x = cos(deg) * r + newX
      const y = sin(deg) * r + newY
      curveVertex(x, y)
      deg+=radians(1) * direction * (beyond ? -1 : 1)
      r = max(r - (curvePortion * 0.025), 0)
    }



    // let r = radius * (1 - curvePortion)
    // for (let i = 0; i < 360 * curves; i++) {
    //   const x = cos(deg) * r + newX
    //   const y = sin(deg) * r + newY
    //   curveVertex(x, y)
    //   deg+=radians(1) * direction
    //   r = max(r - (curvePortion * 0.025), 0)
    // }
    endShape()
}
