import * as cache from '../cache.js'

export default function(tag) {
  return cache.get(tag)
}
