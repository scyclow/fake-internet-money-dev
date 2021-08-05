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