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
  return (Math.floor(min + Math.random() * (max - min))).toString()
}
