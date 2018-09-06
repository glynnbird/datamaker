const tld = require('./tld.js')
const word = require('./word.js')

module.exports = () => {
  let t = ''
  if (Math.random() > 0.2) {
    t = 'com'
  } else {
    t = tld().toLowerCase()
  }
  return word().toLowerCase() + '.' + t
}
