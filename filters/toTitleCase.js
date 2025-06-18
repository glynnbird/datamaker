export default function (str) {
  // title case the string
  str = str.toLowerCase()
  if (str.length > 0) {
    const uc = str[0].toUpperCase()
    str = str.replace(new RegExp('^' + str[0]), uc)
  }
  return str
}
