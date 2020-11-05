#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const datagen = require('../index.js')
let template = ''
const piped = (!process.stdin.isTTY)
let rs = null

// get command-line arguements
var argv = require('yargs')
  .option('format', { alias: ['f', 'type'], describe: 'Format of output data: json,csv,none', demandOption: false, default: 'none' })
  .option('pretty', { alias: 'p', boolean: true, describe: 'Pretty-Print JSON-Files', demandOption: false, default: false })
  .option('iterations', { alias: 'i', describe: 'Number of records to generate', demandOption: false, default: 1 })
  .option('template', { alias: 't', describe: 'The path of the template file', demandOption: false })
  .option('list', { alias: 'l', boolean: true, describe: 'List available tags', demandOption: false, default: false })
  .option('save', { alias: 's', boolean: true, describe: 'Save Files to Disk', demandOption: false, default: false })
  .option('directory', { alias: 'd', describe: 'Directory to Save Files to', demandOption: false, default: '' })
  .option('name', { alias: 'n', describe: 'Name of Files to Save', demandOption: false, default: 'output-{i}' })
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
  let i = 0
  datagen.generate(template, argv.format, argv.iterations)
    .on('data', (d) => {
      if (argv.format === 'json' && argv.pretty) {
        console.log(JSON.stringify(JSON.parse(d), null, 2))
      } else {
        console.log(d)
      }
      if (argv.save && (argv.format === 'json' || argv.format === 'xml')) {
        let filename = ''
        filename = argv.name.replace(/{i}/g, i)
        if (argv.format === 'json' && argv.name.includes('{json:')) {
          const field = argv.name.split('{json:')[1].split('}')[0].trim()
          const value = JSON.parse(d)[field]
          filename = filename.replace(/{json:.*}/g, value)
        }
        filename += '.' + argv.format
        filename = path.join(argv.directory, filename)
        let data = d
        if (argv.format === 'json') {
          data = JSON.stringify(JSON.parse(d), null, 2)
        }
        fs.writeFileSync(filename, data)
        console.log(filename + ' written')
      }
      i++
    })
    .on('end', (d) => { })
}).on('error', (e) => {
  die(e, 2)
})
