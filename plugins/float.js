export default function(min, max, decimalPlaces) {
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
  if (!decimalPlaces || decimalPlaces < 0) {
    decimalPlaces = 4
  }
  return (min + Math.random() * (max - min)).toFixed(decimalPlaces)
}
