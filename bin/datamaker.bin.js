#!/usr/bin/env node

const fs = require('fs')
const datagen = require('../index.js')
let template = ''
const piped = (!process.stdin.isTTY)
let rs = null

// get command-line arguements
var argv = require('yargs')
  .option('format', { alias: ['f', 'type'], describe: 'Format of output data: json,csv,none', demandOption: false, default: 'none' })
  .option('iterations', { alias: 'i', describe: 'Number of records to generater', demandOption: false, default: 1 })
  .option('template', { alias: 't', describe: 'The path of the template file', demandOption: false })
  .option('list', { alias: 'l', boolean: true, describe: 'List available tags', demandOption: false, default: false })
  .help('help')
  .argv

if (argv.list) {
  console.log(datagen.listTags())
  process.exit()
}

// die with error code
var die = function (msg, errCode) {
  console.error('ERROR:' + msg)
  process.exit(errCode)
}

// detect if the format is being piped in
if (piped) {
  rs = process.stdin
} else {
  if (!argv.template) {
    die('A template must be supplied')
  }
  rs = fs.createReadStream(argv.template)
}

// make sure valid format has been supplied
if (argv.format !== 'csv' && argv.format !== 'json' && argv.format !== 'none' && argv.format !== 'xml') {
  die('format must be either none, xml, json or csv', 1)
}

// load the template (from piped stdin or from named file)
rs.on('readable', () => {
  let chunk
  while ((chunk = rs.read()) !== null) {
    template += chunk
  }
  template = template.trim()
}).on('end', () => {
  // when the template has loaded, generate the data
  datagen.generate(template, argv.format, argv.iterations)
    .on('data', (d) => { console.log(d) })
    .on('end', (d) => { })
}).on('error', (e) => {
  die(e, 2)
})
