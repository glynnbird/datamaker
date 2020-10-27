const fs = require('fs')
module.exports = (filename) => {
  var words = fs.readFileSync(filename).toString().split('\n')
  const r = Math.floor(Math.random() * words.length)
  return words[r]
}
