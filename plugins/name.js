const firstname = require('./firstname.js')
const surname = require('./surname.js')

module.exports = () => {
  return firstname() + ' ' + surname()
}
