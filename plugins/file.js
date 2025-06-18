import fs from 'node:fs'
export default function(filename) {
  const words = fs.readFileSync(filename).toString().trim().split('\n')
  const r = Math.floor(Math.random() * words.length)
  return words[r]
}
