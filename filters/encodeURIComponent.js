module.exports = (str) => {
  // encode string for inclusion in a query string
  return encodeURIComponent(str)
}
