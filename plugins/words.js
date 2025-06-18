import word from './word.js'

export default function(count) {
  if (!count) {
    count = 5
  }
  const words = []
  for (let i = 0; i < count; i++) {
    words.push(word())
  }
  return words.join(' ')
}
