import streetGerman from './streetGerman.js'
import cityGerman from './cityGerman.js'
import digits from './digits.js'

export default function() {
  return `${streetGerman()} ${digits(2)}, ${digits(5)} ${cityGerman()}`
}
