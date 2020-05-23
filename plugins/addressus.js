const street = require('./street.js')
const city = require('./city.js')
const state = require('./state.js')
const zip = require('./zip.js')

module.exports = function () {
  return `${street()}, ${city()}, ${state()}, ${zip()}`
}
