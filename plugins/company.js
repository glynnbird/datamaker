const middle = ['', '', '', '', 'Industries', 'Software', 'Energy', 'Holdings', 'International', 'Stores', 'Mutual']
const suffix = ['', '', '', '', 'Company', 'Corporation', 'Corp', 'Inc', 'LLC', 'Ltd', 'S.A', 'A.G', 'B.V', 'GmbH', 'SIA', 'Pte. Ltd']
const word = require('./word.js')

module.exports = () => {
  const r1 = Math.floor(Math.random() * middle.length)
  const r2 = Math.floor(Math.random() * suffix.length)
  let w = word()
  w = w.slice(0, 1).toUpperCase() + w.slice(1)
  return (w + ' ' + middle[r1] + ' ' + suffix[r2]).replace(/ {2}/g, ' ')
}
