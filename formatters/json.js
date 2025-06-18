export function filter(str) {
  return JSON.stringify(str).replace(/^"/, '').replace(/"$/, '')
}

export function postCommit(str) {
  return JSON.stringify(JSON.parse(str))
}

