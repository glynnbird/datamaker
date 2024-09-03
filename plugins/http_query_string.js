const querystring = require('node:querystring')
const words = require('./words.js')
const uuid = require('./uuid.js')
const integer = require('./integer.js')

module.exports = () => {
  const paramCount = 1 + Math.floor(Math.random()*5)
  const obj = {}
  for (let p = 0 ; p < paramCount; p++) {
    const key = words('1')
    let val
    const r = Math.random()
    if (r < 0.25) {
      val = uuid()
    } else if (r < 0.50) {
      val = words('1')
    } else if (r < 0.75) {
      val = words('4')
    } else {
      val = integer('0', '1000')
    }
    obj[key] = val
  }
  return '?' + querystring.stringify(obj)
}