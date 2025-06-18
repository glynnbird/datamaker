import word from './word.js'
import http_query_string from './http_query_string.js'
const options = ['.html', '.php', '.aspx', '']


export default function () {
  const wordCount = Math.floor(Math.random() * 3) + 1
  const words = []
  for (let i = 0; i < wordCount; i++) {
    words.push(word())
  }
  const r = Math.floor(Math.random() * options.length)
  let d = '/' + words.join('/') + options[r]
  if (Math.random() > 0.9) {
    d += http_query_string()
  } else if (Math.random() > 0.9) {
    d += '#' + word()
  }
  return d
}
