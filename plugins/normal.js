const sample = (mu, sigma) => {
  const u1 = Math.random()
  const u2 = Math.random()
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  return z0 * sigma + mu
}

module.exports = function (mean, stddev, decimalPlaces) {
  mean = mean ? parseFloat(mean) : 50
  stddev = stddev ? parseFloat(stddev) : 1
  decimalPlaces = decimalPlaces ? parseInt(decimalPlaces) : 4
  return sample(mean, stddev).toFixed(decimalPlaces)
}
