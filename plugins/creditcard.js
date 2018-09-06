const options = ['4', '51', '52', '53', '54', '55', '36', '38', '6011', '65', '35', '34', '37']
const digits = require('./digits.js')

module.exports = () => {
  const r = Math.floor(Math.random() * options.length)
  const prefix = options[r]
  const n = 16 - prefix.length
  return prefix + digits(n)
}
