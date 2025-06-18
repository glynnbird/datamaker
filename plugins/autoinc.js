let i = null

export default function (start) {
  if (i === null) {
    i = start || 1
  }
  return (i++).toString()
}
