const options = 'ABCDEFGHIJKLMNOPQRSTUVQXYZ0123456789'

module.exports = (length) => {
  let id = ''
  if (!length || length < 0) {
    length = 16
  }
  for (let i = 0; i < length; i++) {
    const r = Math.floor(Math.random() * options.length)
    id += options[r]
  }
  return id
}
