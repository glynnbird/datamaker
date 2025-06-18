const options = [
  's',
  'm',
  'kg',
  'A',
  'K',
  'mol',
  'cd',
  'rad',
  'sr',
  'Hz',
  'N',
  'Pa',
  'J',
  'W',
  'C',
  'V',
  'F',
  'Ω',
  'S',
  'Wb',
  'T',
  'H',
  '°C',
  'lm',
  'lx',
  'Bq',
  'Gy',
  'Sv',
  'kat'
]

export default function() {
  const r = Math.floor(Math.random() * options.length)
  return options[r]
}
