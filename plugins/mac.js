const pad = (n) => {
  if (n.length === 1) {
    return '0' + n
  }
  return n
}
const int = () => {
  return Math.floor(Math.random() * 255)
}
export default function() {
  const mac = [int(), int(), int(), int(), int(), int()].map(x => pad(x.toString(16))).join('-')
  return mac
}
