const options = [
  'Brother',
  'Cantor',
  'Capitaine',
  'Captain',
  'Cardinal',
  'Chaplain',
  'Councillor',
  'Dean',
  'Dr',
  'Elder',
  'Fr',
  'Frère',
  'Hon',
  'Imam',
  'M',
  'Madam',
  'Major',
  'Me',
  'Mère',
  'Miss',
  'Mlle',
  'Mme',
  'Mx',
  'Officer',
  'Officier',
  'Pandit',
  'Pasteur',
  'Pastor',
  'Père',
  'Pr',
  'Prof',
  'Rabbi',
  'Rev',
  'Rev Dr',
  'Révérend',
  'Sergeant',
  'Sergent',
  'Sergent d\'état major',
  'Sir',
  'Sister',
  'Sœur',
  'Staff Sergeant'
]
const commonOptions = ['Mr', 'Mr', 'Mrs', 'Ms']

module.exports = () => {
  if (Math.random() > 0.95) {
    const r = Math.floor(Math.random() * options.length)
    return options[r]
  } else {
    const r = Math.floor(Math.random() * commonOptions.length)
    return commonOptions[r]
  }
}
