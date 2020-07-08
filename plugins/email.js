const firstname = require('./firstname.js')
const surname = require('./surname.js')
const options = ['.', '', '_', '-']
const domainname = require('./domainname.js')
const last = require('./last.js')
const digits = require('./digits.js')

module.exports = (useLastName) => {
  let domain = ''
  if (Math.random() > 0.5) {
    const domains = ['gmail.com', 'hotmail.com', 'yahoo.com']
    const r2 = Math.floor(Math.random() * domains.length)
    domain = domains[r2]
  } else {
    domain = domainname()
  }
  const r = Math.floor(Math.random() * options.length)

  let fn, sn
  if (useLastName) {
    fn = last('firstname').toLowerCase()
    sn = last('surname').toLowerCase()
  } else {
    fn = firstname().toLowerCase()
    sn = surname().toLowerCase()
  }
  const r2 = Math.random()
  if (r2 < 0.3) {
    return fn + options[r] + sn + '@' + domain
  } else if (r2 < 0.7) {
    return fn + options[r] + sn + digits(Math.floor(Math.random() * 5 + 1)) + '@' + domain
  } else {
    return fn + digits(Math.floor(Math.random() * 5 + 1)) + '@' + domain
  }
}
