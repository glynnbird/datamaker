export default function(str) {
  // turn string into JSON array
  return JSON.stringify(str.split(/\W/))
}
