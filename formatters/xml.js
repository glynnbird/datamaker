export function filter(str) {
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function postCommit(str) {
  return str.replace(/\n/g, '').replace(/\r/g, '')
}
