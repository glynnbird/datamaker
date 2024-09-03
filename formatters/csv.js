const filter = (str) => {
  str = str.replace(/"/g, '""')
  if (str.match(/,/g)) {
    str = `"${str}"`
  }
  return str
}

const postCommit = (str) => {
  return str
}

module.exports = {
  filter,
  postCommit
}
