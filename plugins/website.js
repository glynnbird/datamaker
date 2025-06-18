import domainname from './domainname.js'
const options = ['http://', 'https://', 'http://www.', 'https://www.']

export default function() {
  const r = Math.floor(Math.random() * options.length)
  return options[r] + domainname()
}
