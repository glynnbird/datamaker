export function filter(str) {
  str = str.replace(/"/g, '""')
  if (str.match(/,/g)) {
    str = `"${str}"`
  }
  return str
}

export function postCommit(str) {
  return str
}
