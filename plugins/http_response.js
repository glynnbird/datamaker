export default function() {
  const r = Math.random()
  let code
  if (r < 0.95) {
    code = 200
  } else if (r < 0.96) {
    code = 400
  } else if (r < 0.97) {
    code = 401
  } else if (r < 0.98) {
    code = 403
  } else if (r < 0.99) {
    code = 302
  } else {
    code = 500
  }
  return code
}
