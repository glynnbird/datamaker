const integer = require('./integer.js')

const isPrime = (num) => {
  if (num <= 1) {
    return true
  } else if (num <= 3) {
    return true
  } else if (num % 2 === 0 || num % 3 === 0) {
    return false
  }
  let i = 5
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false
    }
    i += 6
  }
  return true
}

module.exports = (min, max) => {
  let i
  let attempts = 0
  do {
    i = integer(min, max)
    attempts++
  } while (attempts < 1000 & !isPrime(i))
  return (attempts === 1000) ? 1 : i
}
