import website from './website.js'
import http_path from './http_path.js'

export default function () {
  const d = website() + http_path()
  return d
}
