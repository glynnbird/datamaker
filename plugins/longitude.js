import float from './float.js'
import cities from './includes/cities.js'

export default function(cityName) {
  if (cityName) {
    cityName = cityName.trim().toUpperCase()
  }
  const city = cityName && cities[cityName] ? cities[cityName] : cities.DEFAULT
  return float(city.bottomLeft.long, city.topRight.long, 4)
}
