import street from './street.js'
import town from './town.js'
import county from './county.js'
import postcode from './postcode.js'

export default function() {
  return `${street()}, ${town()}, ${county()}, ${postcode()}`
}
