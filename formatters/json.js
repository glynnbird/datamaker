const filter = function (str) {
  return JSON.stringify(str).replace(/^"/, '').replace(/"$/, '')
}

const postCommit = function (str) {
  return JSON.stringify(JSON.parse(str))
}

module.exports = {
  filter: filter,
  postCommit: postCommit
}
