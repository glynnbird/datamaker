const uuidv4 = require('./uuidv4')

module.exports = (length) => {
  return uuidv4().replace(/-/g, '')
}
