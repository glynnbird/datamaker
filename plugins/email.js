const firstname = require('./firstname.js')
const surname = require('./surname.js')
const options = ['.', '', '_', '-']
const domainname = require('./domainname.js')

module.exports = () => {
  let domain = ''
  if (Math.random() > 0.5) {
    const domains = ['gmail.com', 'hotmail.com', 'yahoo.com']
    const r2 = Math.floor(Math.random() * domains.length)
    domain = domains[r2]
  } else {
    domain = domainname()
  }
  const r = Math.floor(Math.random() * options.length)
  return firstname().toLowerCase() + options[r] + surname().toLowerCase() + '@' + domain
}
