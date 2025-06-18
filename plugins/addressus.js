import street from './street.js'
import city from './city.js'
import state from './state.js'
import zip from './zip.js'

export default function() {
  return `${street()}, ${city()}, ${state()}, ${zip()}`
}
