let lookup = []
let lookupLength = 0
let i
module.exports = (...args) => {
  // GIGO
  if (args.length === 0) {
    return ''
  }
  // if we don't have a lookup table to cover this operation
  if (args.length > lookupLength) {
    lookup = []
    lookupLength = args.length
    for (i = 0; i < args.length; i++) {
      lookup.push(Math.log10(i + 1))
    }
  }
  // create a random number within range of our lookup table
  const r = Math.random() * Math.log10(args.length + 1)

  // find the element of the lookup table that relates to our random number
  for (i = 0; i < args.length; i++) {
    if (i < args.length - 1) {
      if (lookup[i] < r && r < lookup[i + 1]) {
        return args[i]
      }
    } else {
      return args[i]
    }
  }
}
