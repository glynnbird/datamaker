const ip = require('./ip.js')
const firstname = require('./firstname.js')
const http_method = require('./http_method.js')
const http_response = require('./http_response.js')
const http_path = require('./http_path.js')
const integer = require('./integer.js')
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// 127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.1" 200 2326
module.exports = () => {
  const bits = []
  bits.push(ip())
  bits.push('-')
  bits.push(firstname().toLowerCase())
  const ts = new Date()
  const day = ts.getDate().toString().padStart(2, '0')
  const month = months[ts.getMonth()]
  const year = ts.getFullYear().toString()
  const hour = ts.getHours().toString().padStart(2, '0')
  const minute = ts.getMinutes().toString().padStart(2, '0')
  const second = ts.getSeconds().toString().padStart(2, '0')
  const offset = ts.toString().slice(28, 33)
  const dateStr = day + '/' + month + '/' + year + ':' + hour + ':' + minute + ':' + second + ' ' + offset

  bits.push(`[${dateStr}]`)
  const log = `"${http_method()} ${http_path()} HTTP/1.0"`
  bits.push(log)
  bits.push(http_response())
  bits.push(integer(100, 200000))
  return bits.join(' ')
}
