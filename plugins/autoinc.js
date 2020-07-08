let i = null

module.exports = function (start) {
  if (i === null) {
    i = start || 1
  }
  return (i++).toString()
}
