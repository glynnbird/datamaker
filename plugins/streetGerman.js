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

export default function() {
  const r = Math.floor(Math.random() * options.length)
  return options[r]
}
