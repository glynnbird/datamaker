import tld from './tld.js'
import word from './word.js'

export default function() {
  let t = ''
  if (Math.random() > 0.2) {
    t = 'com'
  } else {
    t = tld().toLowerCase()
  }
  return word().toLowerCase() + '.' + t
}
