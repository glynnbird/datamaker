import crypto from 'node:crypto'

export default function(str) {
  // sha256 hash the string
  return crypto.createHash('sha256').update(str).digest('hex')
}
