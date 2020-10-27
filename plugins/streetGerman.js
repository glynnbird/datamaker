const options = [
  'Hauptstrasse',
  'Schulstrasse',
  'Dorfstrasse',
  'Gartenstrasse',
  'Bahnhofstrasse',
  'Feldweg',
  'Heuweg',
  'Hubertusstrasse',
  'Blumenweg'
]

module.exports = () => {
  const r = Math.floor(Math.random() * options.length)
  return options[r]
}
