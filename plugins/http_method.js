module.exports = (min, max) => {
  const r = Math.random()
  if (r < 0.90) {
    return 'GET'
  } else if (r < 0.95) {
    return 'POST'
  } else if (r < 0.97) {
    return 'PUT'
  } else if (r < 0.98) {
    return 'DELETE'
  } else if (r < 0.99) {
    return 'HEAD'
  } else {
    return 'COPY'
  }
}
