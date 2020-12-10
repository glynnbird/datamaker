const fs = require('fs')
module.exports = (filename) => {
  const words = fs.readFileSync(filename).toString().trim().split('\n')
  const r = Math.floor(Math.random() * words.length)
  return words[r]
}
