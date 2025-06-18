import crypto from 'node:crypto'

export default function() {
  return crypto.randomUUID()
}
