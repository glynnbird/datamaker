import crypto from 'node:crypto'

export default function(str) {
  // sha512 hash the string
  return crypto.createHash('sha512').update(str).digest('hex')
}
