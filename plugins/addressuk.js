const street = require('./street.js')
const town = require('./town.js')
const county = require('./county.js')
const postcode = require('./postcode.js')

module.exports = function () {
  return `${street()} , ${town()}, ${county()}, ${postcode()}`
}
