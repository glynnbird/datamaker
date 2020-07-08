const firstname = require('./firstname.js')
const surname = require('./surname.js')
const cache = require('../cache.js')

module.exports = () => {
  const fn = firstname()
  const sn = surname()
  const retval = fn + ' ' + sn
  cache.set('firstname', fn)
  cache.set('surname', sn)
  return retval
}
