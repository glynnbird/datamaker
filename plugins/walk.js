const old = { }

export default function(start, inc, places, ref) {
  let last
  if (!start) {
    start = '0'
  }
  if (!ref) {
    ref = 'ref'
  }
  if (!inc) {
    inc = '1'
  }
  if (typeof places === 'undefined') {
    places = 4
  } else {
    places = parseInt(places)
  }
  inc = Math.abs(parseFloat(inc))
  if (typeof old[ref] !== 'undefined') {
    last = old[ref]
  } else {
    last = parseFloat(start)
  }
  const diff = (Math.random() * 2 * inc) - inc
  old[ref] = last + diff
  return old[ref].toFixed(places)
}
