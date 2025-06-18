import crypto from 'node:crypto'

export default function (str) {
  // sha1 hash the string
  return crypto.createHash('sha1').update(str).digest('hex')
}
