import firstname from './firstname.js'
import surname from './surname.js'
import * as cache from '../cache.js'


export default function() {
  const fn = firstname()
  const sn = surname()
  const retval = fn + ' ' + sn
  cache.set('firstname', fn)
  cache.set('surname', sn)
  return retval
}
