const options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function(numDigits) {
  if (!numDigits || numDigits < 0) {
    numDigits = 5
  }

  let str = ''
  for (let i = 0; i < numDigits; i++) {
    const r = Math.floor(Math.random() * options.length)
    str += options[r]
  }

  return str
}
