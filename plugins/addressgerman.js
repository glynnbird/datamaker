const streetGerman = require('./streetGerman.js')
const cityGerman = require('./cityGerman.js')
const digits = require('./digits.js')

module.exports = function () {
  return `${streetGerman()} ${digits(2)}, ${digits(5)} ${cityGerman()}`
}
