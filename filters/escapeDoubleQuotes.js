module.exports = (str) => {
  // swap double quotes for two double quotes
  return str.replace(/"/g, '""')
}