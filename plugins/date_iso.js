export default function(min, max) {
  if (min === 'now') {
    return new Date().toISOString()
  } else {
    if (min) {
      min = new Date(min).getTime()
    } else {
      min = 0
    }
    if (max) {
      max = new Date(max).getTime()
    } else {
      max = new Date()
    }
    const ts = Math.floor(min + Math.random() * (max - min))
    return new Date(ts).toISOString()
  }
}
