export default function (str) {
  // base64 encode the string
  return Buffer.from(str).toString('base64')
}
