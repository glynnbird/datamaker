const filter = function (str) {
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const postCommit = function (str) {
  return str.replace(/\n/g, '').replace(/\r/g, '')
}

module.exports = {
  filter: filter,
  postCommit: postCommit
}
