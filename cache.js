let cache = {}

export function get(key) {
  return cache[key] || ''
}

export function set(key, value) {
  cache[key] = value
}

export function clear() {
  cache = {}
}

