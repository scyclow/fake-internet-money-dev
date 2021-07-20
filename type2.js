let fontData, fontString, letterData;
let currentLetterIndex = 0;

// add stuff here to get more geometry in the json output
let letters = "1250$346789IVXLC";

// change the size to be more/less accurate
// coordinates will be rounded to the nearest int
let boundingBoxSize = 500;

// change or add fonts here
function preload() {
  // fontData = loadBytes('RobotoMono.ttf');
  // fontData = loadBytes('Benne.ttf');


  // yay

  fontData = loadBytes('ShipporiMinchoB1-Regular.ttf');
  // fontData = loadBytes('EBGaramond-Regular.ttf');
  // fontData = loadBytes('OldStandardTT-Regular.ttf');
  // fontData = loadBytes('STIXTwoMath-Regular.ttf');
  // fontData = loadBytes('Uchen-Regular.ttf');


  // may
  // fontData = loadBytes('PlayfairDisplay-Regular.ttf');
  // fontData = loadBytes('NanumMyeongjo-Regular.ttf');
  // fontData = loadBytes('LibreBaskerville-Regular.ttf');



  // nay
  // fontData = loadBytes('Tinos-Regular.ttf');
  // fontData = loadBytes('IBMPlexSerif-Regular.ttf');
}


let font
let points = {}

const mthRnd = n => Math.round(n)
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // parse the font data with opentype
  font = opentype.parse(fontData.bytes.buffer);


  const count = {}
  for (let letter of letters) {
    const path = font.getPath(letter, 0,0, 100);

    points[letter] = path.commands.map(cmd => {
      count[cmd.type] ? count[cmd.type]++ : count[cmd.type] = 1
      if (cmd.type === 'M') return [mthRnd(cmd.x), mthRnd(cmd.y)]
      if (cmd.type === 'Z') return [mthRnd(path.commands[0].x), mthRnd(path.commands[0].y)]
      if (cmd.type === 'Q') return [mthRnd(cmd.x), mthRnd(cmd.y), mthRnd(cmd.x1), mthRnd(cmd.y1)]
      return [mthRnd(cmd.x), mthRnd(cmd.y)]
    })
  }

  console.log(JSON.stringify(points))


}

function draw() {
  translate(width/2, height/2)
  background(255)
  fill(0, 0, 0);
  const letter = letters[currentLetterIndex]
  const letterPoints = points[letter]



  // curveVertex(letterPoints[letterPoints.length-1][0], letterPoints[letterPoints.length-1][1]);
  // letterPoints.forEach(p => {
  //   curveVertex(p[0], p[1]);
  // })

  scale(10)

  beginShape()
  letterPoints.forEach(p => {
    p.length > 2
      ? quadraticVertex(p[2], p[3], p[0], p[1])
      : vertex(p[0], p[1])
  })
  endShape()

}



function keyPressed() {
  if (keyCode == 39) { // right arrow
    currentLetterIndex = (currentLetterIndex + 1) % letters.length;
  } else if (keyCode == 37) { // left arrow
    currentLetterIndex = (currentLetterIndex + letters.length - 1) % letters.length;
  }
}