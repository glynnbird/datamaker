let cache = {}

const get = (key) => {
  return cache[key] || ''
}

const set = (key, value) => {
  cache[key] = value
}

const clear = () => {
  cache = {}
}

module.exports = {
  get: get,
  set: set,
  clear: clear
}
