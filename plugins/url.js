const website = require('./website.js')
const http_path = require('./http_path.js')

module.exports = function () {
  let d = website() + http_path()
  return d
}
