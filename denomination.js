const NUMERALS = {
  '1': 'I',
  '2': 'II',
  '5': 'V',
  '10': 'X',
  '20': 'XX',
  '50': 'L',
  '100': 'C',
}


function getDenominationDisplay() {
  const seed = rnd()

  if (!DENOMINATION || __denominationDisplayed && seed < 0.1) {
    return '$'
  } else if (SHOW_NUMERALS && (!__numeralDisplayed || seed < 0.5)) {
    __numeralDisplayed = true
    return NUMERALS[DENOMINATION]
  } else {
    __denominationDisplayed = true
    return DENOMINATION
  }
}


// for this to work, you need to delete the last point of each contour
function drawChar(char, x, y, s, stroke_, fill_) {
  push()
  translate(x-25*s, y+40*s)
  scale(s)
  stroke(stroke_)
  fill(fill_||stroke_)

  let contourOpen = false

  beginShape()
  typePoints[char].forEach((p, i) => {
    if (p[0] === 'M') {
      if (contourOpen) endContour()
      if (i !== 0) {
        beginContour()
        contourOpen = true
      }
      // if (i !== 0) endShape()
      // beginShape()
      vertex(p[1], p[2])
    } else if (p.length > 2) {
      quadraticVertex(p[2], p[3], p[0], p[1])
    } else {
      vertex(p[0], p[1])
    }
  })
  if (contourOpen) endContour()
  endShape()
  pop()
}

const offsets = {
  'V': -14,
  'C': -14,
  'X': -12,
  'XX': -11.5,
  'L': -5.5,
  'I': 5.5,
  'II': 3.5,
  '$': -3,
  '4': -3,
  '6': -3,
}
function drawStr(str, x, y, s, stroke_, fill_) {
  if (!str) return
  const center = floor(str.length/2)
  for (let c=0; c<str.length; c++) {
    const offCenter = c - center
    const xOffset = 50*s * (
      str === 'XX' ? 1.4 :
      1
    )
    const letterOffset = (offsets[str]||0)*s


    const midOffset = xOffset*offCenter + (str.length%2==0?xOffset/2:0)
    drawChar(str[c], x+midOffset+letterOffset, y-3*s, s, stroke_, fill_)
  }
}

function drawStrAdj(...args) {
  if (['10', '20', '50', 'II'].includes(args[0])) args[3] = args[3] * 0.75
  if (args[0] === 'XX') args[3] = args[3] * 0.65
  if (args[0] === '100') args[3] = args[3] * 0.65
  drawStr(...args)
}

const drawAdjDenomination = (...args) => drawStrAdj(getDenominationDisplay(), ...args)

function drawDenominationWithBorder(x, y, scale_, borderC, centerC) {
  const d = getDenominationDisplay()
  drawStr(d, x+1, y+1, scale_, borderC)
  drawStr(d, x-1, y-1, scale_, borderC)
  drawStr(d, x-1, y+1, scale_, borderC)
  drawStr(d, x+1, y-1, scale_, borderC)
  drawStr(d, x, y, scale_, centerC)
}

function drawSnazzyDenomination(x, y, scale_) {
  const d = getDenominationDisplay()
  drawStrAdj(d, x+2, y+2, scale_, DARK_C)
  drawStrAdj(d, x, y, scale_,
    IS_BULLION ? DARK_C : LIGHT_C,
    IS_BULLION ? LIGHT_C : HIGHLIGHT ? BRIGHT_DARK_C : DARK_C
  )
}