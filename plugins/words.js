const word = require('./word.js')

module.exports = (count) => {
  if (!count) {
    count = 5
  }
  const words = []
  for (let i = 0; i < count; i++) {
    words.push(word())
  }
  return words.join(' ')
}
