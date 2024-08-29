const word = require('./word.js')
const options = ['.html', '.php', '.aspx', '']
const uuid = require('./uuid.js')

module.exports = function () {
  const wordCount = Math.floor(Math.random() *3) + 1
  const words = []
  for (let i = 0; i < wordCount; i++) {
    words.push(word())
  }
  const r = Math.floor(Math.random() * options.length)
  let d = '/' + words.join('/') + options[r]
  if (Math.random() > 0.9) {
    d += '?' + word() + '=' + uuid()
    if (Math.random() > 0.5) {
      d += '&' + word() + '=' + uuid()
    }
  } else if (Math.random() > 0.9) {
    d += '#' + word()
  }
  return d
}
