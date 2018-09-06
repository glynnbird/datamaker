
module.exports = (...args) => {
  if (args.length === 0) {
    return ''
  }
  const r = Math.floor(Math.random() * args.length)
  return args[r]
}
