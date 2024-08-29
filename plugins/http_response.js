module.exports = (min, max) => {
  const r = Math.random()
  if (r < 0.95) {
    return 200
  } else if (r < 0.96) {
    return 400
  } else if (r < 0.97) {
    return 401
  } else if (r < 0.98) {
    return 403
  } else if (r < 0.99) {
    return 302
  } else {
    return 500
  }
}
