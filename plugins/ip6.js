const pool = []
const poolSize = 1000
const int = () => {
  return Math.floor(Math.random() * 65535)
}
export default function(local) {
  let ip6
  if (local === 'true') {
    ip6 = ['fc00', int(), int(), int(), int(), int(), int(), int()].map(x => x.toString(16)).join(':')
  } else {
    // create a pool of 1000 ips to pick from
    if (pool.length === 0) {
      for (let i = 0; i < poolSize; i++) {
        ip6 = [int(), int(), int(), int(), int(), int(), int(), int()].map(x => x.toString(16)).join(':')
        pool.push(ip6)
      }
    }
    ip6 = pool[Math.floor(Math.random() * poolSize)]
  }
  return ip6
}
