
import digits from './digits.js'
const options = [
  '353',
  '44',
  '33',
  '43',
  '32',
  '357',
  '42',
  '45',
  '358',
  '33',
  '37',
  '49',
  '350',
  '30',
  '36',
  '354',
  '39',
  '41',
  '352',
  '33',
  '31',
  '47',
  '48',
  '351',
  '40',
  '39',
  '34',
  '46',
  '41',
  '90',
  '39',
  '38',
  '501',
  '506',
  '503',
  '502',
  '504',
  '505',
  '507',
  '213',
  '237',
  '20',
  '251',
  '241',
  '225',
  '254',
  '266',
  '231',
  '218',
  '265',
  '212',
  '264',
  '234',
  '221',
  '27',
  '268',
  '255',
  '216',
  '256',
  '260',
  '263',
  '684',
  '61',
  '673',
  '679',
  '689',
  '671',
  '852',
  '62',
  '81',
  '82',
  '60',
  '687',
  '64',
  '675',
  '63',
  '670',
  '65',
  '886',
  '66',
  '92',
  '94',
  '54',
  '591',
  '55',
  '56',
  '57',
  '593',
  '592',
  '595',
  '51',
  '597',
  '598',
  '58',
  '973',
  '98',
  '964',
  '972',
  '962',
  '965',
  '968',
  '974',
  '966',
  '971',
  '967',
  '596',
  '53',
  '509',
  '599',
  '508',
  '91'
]

export default function() {
  const r = Math.floor(Math.random() * options.length)
  return '+' + options[r] + '-' + digits(4) + '-' + digits(3) + '-' + digits(3)
}
