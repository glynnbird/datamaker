const options = ['http://', 'https://', 'http://www.', 'https://www.']
const domainname = require('./domainname.js')

module.exports = () => {
  const r = Math.floor(Math.random() * options.length)
  return options[r] + domainname()
}
