import dateiso from './date_iso.js'

export default function(min, max) {
  const d = dateiso(min, max)
  const parts = d.split('T')
  return parts[0]
}
