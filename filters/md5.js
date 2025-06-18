import crypto from 'node:crypto'

export default function(str) {
  // md5 hash the string
  return crypto.createHash('md5').update(str).digest('hex')
}
