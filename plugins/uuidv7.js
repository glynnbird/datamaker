import * as kuuid from 'kuuid'
import dateiso from './date_iso.js'

export default function(min, max) {
  const d = dateiso(min, max)
  return kuuid.v7(d)
}
