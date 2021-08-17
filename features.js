
// function genTokenData(projectNum) {

//   const tokenId = String(projectNum * 1000000 + Math.floor(Math.random() * 1000))
//   let hash = '0x'

//   for (let i = 0; i < 64; i++) {
//     hash += Math.floor(Math.random() * 16).toString(16)
//   }

//   return {
//     hash,
//     // hash: '0xfeff8806ffe0ff004900b6104392c062d40f238839029c82ed000ffff3cb2003',
//     tokenId
//   }
// }




function getFeatures(tokenData, features=[], featuresReduced=[]) {
  let __randomSeed_ = parseInt(tokenData.hash.slice(50, 58), 16)

  function rnd(mn, mx) {
    __randomSeed_ ^= __randomSeed_ << 13
    __randomSeed_ ^= __randomSeed_ >> 17
    __randomSeed_ ^= __randomSeed_ << 5
    const out = (((__randomSeed_ < 0) ? ~__randomSeed_ + 1 : __randomSeed_) % 1000) / 1000
    if (mx != null) return mn + out * (mx - mn)
    else if (mn != null) return out * mn
    else return out
  }

  // call it once because it's called once in the global namespace (misc.js)
  rnd()

  function hshrnd(h) {
    const str = tokenData.hash.slice(2 + h*2, 4 + h*2)
    return parseInt(str, 16) / 255
  }

  const int = Math.floor
  const max = Math.max
  const color = (...args) => args.join(',')
  const prb = x => rnd() < x

  const posOrNeg = () => prb(0.5) ? 1 : -1

  const sample = (a) => a[int(rnd(a.length))]
  const hfix = h => (h + 360) % 360
  const noop = () => {}

  function getMainCenterPiece(seed) {
    if (IS_MAIN) {
      if (MISPRINT_MISSING_CENTER)
        return 0 // no center piece
      else if (seed < 0.6875)
        return 1 // single
      else if (seed < 0.8125)
        return 2 // bouquet
      else if (seed < 0.9375)
        return 3 // portrait
      else
        return 4 // rosette sandwich
    }
  }
  function getBG() {
    const r = rnd()

    if (prb(IS_CRYPTO ? 0.125 : 0.01)) return 0
    else if (r < 0.125) return 1
    else if (r < 0.25) return 2
    else if (r < 0.375) return 3
    else if (r < 0.5) return 4
    else if (r < 0.625) return 5
    else if (r < 0.75) return 6
    else if (r < 0.875) return 7
    else return 8
  }

  function cornerLocations() {
    const cornerPatternSeed = rnd()

    if (cornerPatternSeed < 0.25) {
      return [1,2, 3, 4]
    } else if (cornerPatternSeed < 0.5) {
      return [1, 4]
    } else if (cornerPatternSeed < 0.75) {
      return [2, 3]
    } else if (cornerPatternSeed < 0.825) {
      return [1, 2]
    } else if (cornerPatternSeed < 0.9375) {
      return [3, 4]
    } else {
      return [int(rnd(1,5))]
    }
  }
  let SCALE, DARK_C, LIGHTENED_DARK_C, LIGHT_C, LIGHT_GRADIENT_C, BRIGHT_LIGHT_C, BRIGHT_DARK_C, ACCENT_C, LIGHTENED_ACCENT_C, STIPLE_C, HUE, DENOMINATION, ROSETTE_STYLE, IS_VINTAGE, IS_DECO, IS_BULLION, IS_MAIN, HIGHLIGHT, SHOW_NUMERALS, BG_TYPE, BG_PATTERN, SHOW_BORDER, SHOW_CORNERS, CORNER_COMPONENT_LOCATIONS, STAR_NOTE, EMBLEM1, EMBLEM_NUMBER1, EMBLEM_HOLO1, EMBLEM2, EMBLEM_NUMBER2, EMBLEM_HOLO2, NO_NATURAL_DENOMINATION, VIBRANT_GRADIENT, MISPRINT_ROSETTE_PARAMS_EXCEEDED, MISPRINT_LATHE_MALFUNCTION, MISPRINT_HETERO_ROSETTES, MISPRINT_OFF_CENTER, MISPRINT_LOW_INK, MISPRINT_PRINTING_OBSTRUCTED, MISPRINT_REVERSED, MISPRINT_ROSETTE_FLURRY, MISPRINT_MISSING_CENTER, MISPRINT_PIGMINTATION_MALFUNCTION1, MISPRINT_PIGMINTATION_MALFUNCTION2, MISPRINT_PIGMINTATION_MISSING, MISPRINT_SKEWED, IS_PIGMINT_MISPRINT, FORCE_SHOW_ROSETTE, COOL_SERIAL_NUM, COUNTERFEIT, IS_SILVER, LAYOUT
  let STROKE_MOD = 1
  const W = 700
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





  // DENOMINATION
  const denominationSeed = hshrnd(0)
  if (denominationSeed < 1/2) DENOMINATION = '1'
  else if (denominationSeed < 3/4) DENOMINATION = '5'
  else if (denominationSeed < 7/8) DENOMINATION = '10'
  else if (denominationSeed < 15/16) DENOMINATION = '20'
  else if (denominationSeed < 31/32) DENOMINATION = '50'
  else if (denominationSeed < 63/64) DENOMINATION = '100'
  else if (denominationSeed < 127/128) DENOMINATION = '2'


  SHOW_NUMERALS = prb(0.2)

  // COLORS
  const colorSeed = hshrnd(1)

  COLOR_SCHEME =
    colorSeed < 0.65 ? 'FIAT'
    : colorSeed < 0.9 ? 'CRYPTO'
    : 'BULLION'
  IS_BULLION = COLOR_SCHEME === 'BULLION'
  IS_CRYPTO = COLOR_SCHEME === 'CRYPTO'

  HUE = int(rnd(0,360))
  const isBlue = HUE < 275 && HUE > 210

  if (COLOR_SCHEME === 'FIAT') {
    DARK_C = color(HUE, 26, 25)
    LIGHT_C = color(hfix(HUE-72), 6, 91)
    LIGHT_GRADIENT_C = color(hfix(max(HUE-72, 0)), 6, 91)
    LIGHTENED_DARK_C = color(HUE, 16, 55)
    ACCENT_C = color(hfix(HUE-145), 80, 64)
    LIGHT_ACCENT_C = color(hfix(HUE-145), 55, 64, 30)
    BRIGHT_LIGHT_C = color(max(HUE-10, 0), 80, 54)
    BRIGHT_DARK_C = BRIGHT_LIGHT_C

    VIBRANT_GRADIENT = prb(0.02)


  } else if (IS_CRYPTO) {
    LIGHT_C = color(hfix(HUE-133), 96, isBlue ? 0 : 15)
    DARK_C = color(HUE, isBlue ? 80 : 100, isBlue ? 95 : 90)
    LIGHTENED_DARK_C = color(HUE, 69, 75)
    ACCENT_C = color(hfix(HUE-254), 100, 100)
    LIGHT_ACCENT_C = ACCENT_C
    BRIGHT_LIGHT_C = ACCENT_C
    BRIGHT_DARK_C = BRIGHT_LIGHT_C
    LIGHT_GRADIENT_C = LIGHT_C
    STIPLE_C = color(HUE, 99, 90, 50)

  } else {
    DARK_C = color(HUE, 26, 25)

    if (colorSeed < 0.96875) {
      LIGHT_C = color(203, 5, 48)
      BRIGHT_LIGHT_C = color(167, 5, 95)
      DARK_C = color(40, 26, 20)
      LIGHTENED_DARK_C = color(203, 10, 35)
      BRIGHT_DARK_C = LIGHTENED_DARK_C
      IS_SILVER = true

    } else {
      LIGHT_C = color(40, 60, 67)
      BRIGHT_LIGHT_C = color(60, 30, 100)
      DARK_C = color(35, 45, 30)
      LIGHTENED_DARK_C = color(35, 45, 35)
      BRIGHT_DARK_C = color(203, 10, 25)
    }
    ACCENT_C = DARK_C
    LIGHT_ACCENT_C = LIGHTENED_DARK_C
    LIGHT_GRADIENT_C = LIGHT_C

    HIGHLIGHT = true
  }


  MISPRINT_PIGMINTATION_MALFUNCTION1 = prb(0.01)
  MISPRINT_PIGMINTATION_MALFUNCTION2 = prb(0.01)
  MISPRINT_PIGMINTATION_MISSING = prb(0.015)
  IS_PIGMINT_MISPRINT = MISPRINT_PIGMINTATION_MALFUNCTION1 || MISPRINT_PIGMINTATION_MALFUNCTION2 || MISPRINT_PIGMINTATION_MISSING

  if (MISPRINT_PIGMINTATION_MALFUNCTION1) {
      LIGHT_C = color(hfix(HUE+30), 96, 95)
      DARK_C = color(HUE, isBlue ? 80 : 100, 80)
      LIGHTENED_DARK_C = color(HUE, 69, 75)
      ACCENT_C = color(hfix(HUE+40), 100, 75)
  }

  if (MISPRINT_PIGMINTATION_MALFUNCTION2) {
      LIGHT_C = color(hfix(HUE-183), 96, 95)
      DARK_C = color(HUE, isBlue ? 80 : 100, 95)
      LIGHTENED_DARK_C = color(HUE, 69, 95)
      ACCENT_C = DARK_C
  }

  if (MISPRINT_PIGMINTATION_MISSING) {
      LIGHT_C = color('#fff')
      DARK_C = color('#000')
      LIGHTENED_DARK_C = DARK_C
      ACCENT_C = DARK_C
  }

  if (IS_PIGMINT_MISPRINT) {
    LIGHT_ACCENT_C = ACCENT_C
    BRIGHT_LIGHT_C = ACCENT_C
    BRIGHT_DARK_C = BRIGHT_LIGHT_C
    LIGHT_GRADIENT_C = LIGHT_C
    LIGHT_ACCENT_C = LIGHTENED_DARK_C
    STIPLE_C = DARK_C


  }


  // LAYOUT
  LAYOUT =
    hshrnd(2) < 0.8125 ? 'MAIN' :
    hshrnd(2) < 0.95 ? 'STRIP' :
    'GRID'

  IS_MAIN = LAYOUT === 'MAIN'

  MISPRINT_MISSING_CENTER = prb(0.01) && IS_MAIN && !NO_NATURAL_DENOMINATION
  MAIN_CENTER_PIECE = getMainCenterPiece(hshrnd(3))
  SHOW_BORDER = IS_MAIN && hshrnd(4) < 0.75
  SHOW_CORNERS = IS_MAIN && prb(SHOW_BORDER ? 0.9 : 0.6)

  // ROSETTE
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


  EMBLEM1 = [0,1,3].includes(MAIN_CENTER_PIECE) && BG_TYPE !== 'WM2' && hshrnd(7) < 0.25
  EMBLEM_NUMBER1 = EMBLEM1 && prb(0.4)
  EMBLEM_HOLO1 = EMBLEM1 && !EMBLEM_NUMBER1 && prb(0.2)

  EMBLEM2 = EMBLEM1 && hshrnd(7) < 0.0625
  EMBLEM_NUMBER2 = EMBLEM2 && prb(0.4)
  EMBLEM_HOLO2 = EMBLEM2 && !EMBLEM_NUMBER2 && prb(0.2)




  const reverseRosetteColors = prb(0.5) || IS_BULLION
  const lightC = IS_SILVER ? BRIGHT_LIGHT_C : LIGHT_GRADIENT_C
  const darkC = HIGHLIGHT && !IS_DECO && !IS_VINTAGE && !IS_BULLION ? BRIGHT_DARK_C : DARK_C
  ROSETTE_FILL_C = IS_VINTAGE || reverseRosetteColors ? lightC : darkC
  ROSETTE_STROKE_C = IS_VINTAGE || reverseRosetteColors ? darkC : lightC

  HIGHLIGHT = !IS_VINTAGE && prb(0.125)




  // BACKGROUND

  const bgSeed = hshrnd(6)
  if (!IS_MAIN || SHOW_BORDER || bgSeed < 0.1875) { // (0.8125 * 0.75) + (0.03125) =~ 640
    BG_TYPE = 'STANDARD'
    BG_PATTERN = getBG()
  }
  else if (bgSeed < 0.5) BG_TYPE = 'WM2' // 0.8125 * 0.25 * 0.375 =~ 76
  else if (bgSeed < 0.8125) BG_TYPE = 'WM1' // 0.8125 * 0.25 * 0.3125 =~ 63
  else if (IS_VINTAGE || IS_DECO) BG_TYPE = prb(0.5) ? 'WM1' : 'WM2'
  else if (bgSeed < 0.9375 || IS_CRYPTO) {
    BG_TYPE = 'FULL' // 0.8125 * 0.25 * (0.175) * 0.75 =~ 27
  }
  else BG_TYPE = 'EMPTY'



  NO_NATURAL_DENOMINATION = !SHOW_CORNERS && (BG_PATTERN !== 8) && !EMBLEM_NUMBER1 && !EMBLEM_NUMBER2

  // MISPRINTS/RARITIES
  serialSeed = rnd()
  COOL_SERIAL_NUM =
    serialSeed < 0.005 ? 0 :
    serialSeed < 0.01 ? 1 :
    serialSeed < 0.015 ? 2 :
    serialSeed < 0.02 ? 3 :
    serialSeed < 0.025 ? 4 :
    serialSeed < 0.03 ? 5 :
    serialSeed < 0.035 ? 6 : ''
  STAR_NOTE = hshrnd(8) < 0.015

  MISPRINT_ROSETTE_PARAMS_EXCEEDED = prb(0.025)
  MISPRINT_LATHE_MALFUNCTION = prb(0.02)
  MISPRINT_MISSING_CENTER = MISPRINT_MISSING_CENTER && !NO_NATURAL_DENOMINATION
  MISPRINT_OFF_CENTER = prb(0.015)
  MISPRINT_REVERSED = prb(0.015)
  MISPRINT_HETERO_ROSETTES = prb(0.015)
  MISPRINT_SKEWED = prb(0.01)
  MISPRINT_PRINTING_OBSTRUCTED = prb(0.01)
  MISPRINT_ROSETTE_FLURRY = prb(0.005)
  MISPRINT_HEAVY_INK = prb(0.005)
  MISPRINT_LOW_INK = prb(0.005)
  IS_MISPRINT = MISPRINT_ROSETTE_PARAMS_EXCEEDED || MISPRINT_LATHE_MALFUNCTION || MISPRINT_MISSING_CENTER || MISPRINT_OFF_CENTER || MISPRINT_REVERSED || MISPRINT_HETERO_ROSETTES || MISPRINT_PRINTING_OBSTRUCTED || MISPRINT_ROSETTE_FLURRY || MISPRINT_HEAVY_INK || MISPRINT_LOW_INK || IS_PIGMINT_MISPRINT || MISPRINT_SKEWED
  COUNTERFEIT = !COOL_SERIAL_NUM && !STAR_NOTE && prb(0.05)
  if (MISPRINT_HEAVY_INK) STROKE_MOD = 8


  FORCE_SHOW_ROSETTE = MISPRINT_LATHE_MALFUNCTION || MISPRINT_HETERO_ROSETTES || MISPRINT_ROSETTE_PARAMS_EXCEEDED

  CORNER_COMPONENT_LOCATIONS = SHOW_CORNERS || FORCE_SHOW_ROSETTE ? cornerLocations() : []






  const estimatedMktValue = (DENOMINATION||0)
    * (COUNTERFEIT?-1:1)
    * (IS_MISPRINT?0:1)
    * (IS_CRYPTO?(prb(0.5)?rnd(0,150):rnd(0,0.1)):1)
    * (IS_SILVER?50:1)
    * (IS_BULLION&&!IS_SILVER?100:1)
    * (STAR_NOTE?3:1)
    * (COOL_SERIAL_NUM?5:1)
    * (IS_VINTAGE||IS_DECO?1.5:1)







  features.push(`Denomination: ${DENOMINATION}`)
  if (IS_BULLION) {
    features.push('Theme: Bullion')
    if (IS_SILVER) features.push('Metal: Silver')
    else features.push('Metal: Gold')
  }
  else if (IS_CRYPTO) features.push('Theme: Crypto')
  else features.push('Theme: Fiat')

  const isHighlight = !!VIBRANT_GRADIENT || (
    !IS_BULLION && HIGHLIGHT
  )
  features.push(`Highlight: ${isHighlight}`)
  // features.push(`Highlights: ${HIGHLIGHT}`)
  features.push(`Numerals: ${SHOW_NUMERALS}`)


  // TODO come up with better names for layouts
  if (IS_MAIN) {
    features.push('Layout: Classic')

    switch (MAIN_CENTER_PIECE) {
      case(0): features.push('Centerpiece: Missing'); break
      case(1): features.push('Centerpiece: Rosette'); break
      case(2): features.push('Centerpiece: Bouquet'); break
      case(3): features.push('Centerpiece: Portrait'); break
      case(4): features.push('Centerpiece: Debit + Credit'); break // TODO better name?
    }
  }
  else if (LAYOUT === 'STRIP') features.push('Layout: Modern')
  else  features.push('Layout: Jackpot')

  switch (ROSETTE_STYLE) {
    case('DECO'): features.push('Rosette Style: Deco'); break;
    case('NUMISMATIC') :features.push('Rosette Style: Numismatic'); break;
    case('VINTAGE'): features.push('Rosette Style: Vintage'); break;
    case('ECHO'): features.push('Rosette Style: Ribbed'); break;
    case('DIGITAL'): features.push('Rosette Style: Checkered'); break;
    case('LINE'): features.push('Rosette Style: Line'); break;
    case('DENOMINATION'): features.push('Rosette Style: Denomination'); break;
  }

  if (IS_MAIN) {
    features.push(`Border: ${SHOW_BORDER}`)
    features.push(`Corners: ${CORNER_COMPONENT_LOCATIONS.length}`)
  }

  if (EMBLEM1) {
    if (EMBLEM_NUMBER1) features.push('Emblem 1: Denomination')
    else if (EMBLEM_HOLO1) features.push('Emblem 1: Holographic')
    else features.push('Emblem 1: Stamp')
  }
  if (EMBLEM2) {
    if (EMBLEM_NUMBER2) features.push('Emblem 2: Denomination')
    else if (EMBLEM_HOLO2) features.push('Emblem 2: Holographic')
    else features.push('Emblem 2: Stamp')
  }



  if (BG_TYPE === 'STANDARD') {
    switch (BG_PATTERN) {
      case(0): features.push('Background: Bytes'); break
      case(1): features.push('Background: Chainlink'); break
      case(2): features.push('Background: Labrynth'); break
      case(3): features.push('Background: Penny Pincher'); break
      case(4): features.push('Background: Fabric'); break
      case(5): features.push('Background: Cycles'); break
      case(6): features.push('Background: Mainframe'); break
      case(7): features.push('Background: Progress'); break // TODO better name for arrow bg
      case(8): features.push('Background: Denomination'); break
    }

  } else if (BG_TYPE === 'WM1') {
    features.push('Background: Watermark')
  } else if (BG_TYPE === 'WM2') {
    features.push('Background: Ribbon')
  } else if (BG_TYPE === 'FULL') {
    features.push('Background: Full') // TODO better name
  } else {
    features.push('Background: Empty')
  }


  if (COUNTERFEIT) features.push(`Authenticity: Counterfeit`)
  else features.push(`Authenticity: Official`) // TODO better name


  switch (COOL_SERIAL_NUM) {
    case(0): features.push(`Serial Number: Repeater`); break;
    case(1): features.push(`Serial Number: Radar`); break;
    case(2): features.push(`Serial Number: Increasing`); break;
    case(3): features.push(`Serial Number: Decreasing`); break;
    case(4): features.push(`Serial Number: Low`); break;
    case(5): features.push(`Serial Number: High`); break;
    case(6): features.push(`Serial Number: Binary`); break;
    default: features.push(`Serial Number: Normal`)
  }

  features.push(`Star Note: ${STAR_NOTE}`)


  if (!DENOMINATION) features.push(`Misprint: Denomination Missing`)
  if (MISPRINT_PIGMINTATION_MALFUNCTION1 || MISPRINT_PIGMINTATION_MALFUNCTION2) features.push(`Misprint: Pigmintation Misconfiguration`)
  if (MISPRINT_PIGMINTATION_MISSING) features.push(`Misprint: Pigmintation Missing`)
  if (MISPRINT_ROSETTE_PARAMS_EXCEEDED) features.push(`Misprint: Rosette Parameters Exceeded`)
  if (MISPRINT_LATHE_MALFUNCTION) features.push(`Misprint: Lathe Malfunction`)
  if (MISPRINT_MISSING_CENTER) features.push(`Misprint: Center Missing`)
  if (MISPRINT_OFF_CENTER) features.push(`Misprint: Misaligned`)
  if (MISPRINT_REVERSED) features.push(`Misprint: Inverted`)
  if (MISPRINT_HETERO_ROSETTES) features.push(`Misprint: Heterogeneous Rosette Selection`)
  if (MISPRINT_SKEWED) features.push(`Misprint: Printing Skew`)
  if (MISPRINT_PRINTING_OBSTRUCTED) features.push(`Misprint: Printing Obstruction`)
  if (MISPRINT_ROSETTE_FLURRY) features.push(`Misprint: Excessive Printing Activity`)
  if (MISPRINT_HEAVY_INK) features.push(`Misprint: Extra Inking`)
  if (MISPRINT_LOW_INK) features.push(`Misprint: Low Inking`)


  for (let f of features) featuresReduced.push(f)

  return { features }

}

console.log(JSON.stringify(getFeatures(tokenData, [], []).features, null, 3))
// console.log(getFeatures(genTokenData(140), [], []))
