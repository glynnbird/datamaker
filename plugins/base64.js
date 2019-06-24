const letters = require('./letters.js')

module.exports = (count) => {
  if (!count) {
    count = 5
  }
  const str = letters(count)
  return Buffer.from(str).toString('base64')
}
