export default function(str) {
  // swap single quotes for two single quotes
  return str.replace(/'/g, "''")
}
