const integer = require('./integer.js')
const pool = []
const poolSize = 1000

module.exports = (local) => {
  let ip
  if (local === 'true') {
    ip = [192, 168, 1, integer(1, 253)].join('.')
  } else {
    // create a pool of 1000 ips to pick from
    if (pool.length === 0) {
      for(let i = 0 ; i < poolSize; i++) {
        ip = [integer(1, 253), integer(1, 253), integer(1, 253), integer(1, 253)].join('.')
        pool.push(ip)
      }
    }
    ip =  pool[Math.floor(Math.random() * poolSize)]
  }
  return ip
}
