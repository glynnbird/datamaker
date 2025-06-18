const options = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function(numLetters) {
  if (!numLetters || numLetters < 0) {
    numLetters = 5
  }
  let str = ''
  for (let i = 0; i < numLetters; i++) {
    const r = Math.floor(Math.random() * options.length)
    str += options[r]
  }

  return str
}
