const float = require('./float.js')
const cities = require('./includes/cities.js')

module.exports = (cityName) => {
  const city = cityName && cities[cityName] ? cities[cityName] : cities['DEFAULT']
  return float(city.bottomLeft.lat, city.topRight.lat, 4)
}
