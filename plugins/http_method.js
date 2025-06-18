export default function() {
  const r = Math.random()
  let m
  if (r < 0.90) {
    m = 'GET'
  } else if (r < 0.95) {
    m = 'POST'
  } else if (r < 0.97) {
    m = 'PUT'
  } else if (r < 0.98) {
    m = 'DELETE'
  } else if (r < 0.99) {
    m = 'HEAD'
  } else {
    m = 'COPY'
  }
  return m
}
