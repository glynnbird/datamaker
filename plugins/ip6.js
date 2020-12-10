const cache = require('../cache.js')
const int = () => {
  return Math.floor(Math.random() * 65535)
}
module.exports = (local) => {
  let ip6
  if (local === 'true') {
    ip6 = ['fc00', int(), int(), int(), int(), int(), int(), int()].map(x => x.toString(16)).join(':')
  } else {
    ip6 = [int(), int(), int(), int(), int(), int(), int(), int()].map(x => x.toString(16)).join(':')
  }
  cache.set('ip6', ip6)
  return ip6
}
