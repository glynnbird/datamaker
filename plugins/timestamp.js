module.exports = (min, max) => {
  if (min) {
    min = parseInt(min)
  }
  if (max) {
    max = parseInt(max)
  }
  if (!min) {
    min = 0
  }
  if (!max) {
    max = new Date().getTime()
  }
  return (Math.floor(min + Math.random() * (max - min))).toString()
}
