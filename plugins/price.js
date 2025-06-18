
import integer from './integer.js'

export default function(min, max) {
  if (min) {
    min = parseFloat(min)
  }
  if (max) {
    max = parseFloat(max)
  }
  if (!min || !max || min > max) {
    min = 1
    max = 100
  }
  const istr = integer((min * 100).toString(), (max * 100).toString())
  return (parseInt(istr) / 100).toString()
}
