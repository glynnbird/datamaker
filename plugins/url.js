const website = require('./website.js')
const word = require('./word.js')
const options = ['.html', '.php', '.aspx', '']
const uuid = require('./uuid.js')

module.exports = function () {
  const r = Math.floor(Math.random() * options.length)
  let d = website() + '/' + word() + options[r]
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
