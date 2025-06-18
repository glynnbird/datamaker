#!/usr/bin/env node

import { parseArgs } from 'node:util'
import fs from 'node:fs'
import path from 'node:path'
import * as datamaker from '../index.js'

const syntax =
`Syntax:
--format/--type/-f       Format of output data: json,csv,none   [default: "none"]
--iterations/-i          Number of records to generater              [default: 1]
--template/-t            The path of the template file
--list/-l                List available tags           [boolean] [default: false]
--version/-v             Show app version                        [default: false]
--help/-h                Show app help                           [default: false]
`

const app = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, '..', 'package.json'), { encoding: 'utf8' }))

const argv = process.argv.slice(2)
const options = {
  format: {
    type: 'string',
    short: 'f',
    default: 'none'
  },
  type: {
    type: 'string'
  },
  iterations: {
    type: 'string',
    short: 'i',
    default: '1'
  },
  template: {
    type: 'string',
    short: 't'
  },
  list: {
    type: 'boolean',
    short: 'l',
    default: false
  },
  version: {
    type: 'boolean',
    short: 'v',
    default: false
  },
  help: {
    type: 'boolean',
    short: 'h',
    default: false
  }
}
const { values } = parseArgs({ argv, options })

// version mode
if (values.version) {
  console.log(`${app.name} ${app.version}`)
  process.exit(0)
}

// help mode
if (values.help) {
  console.log(syntax)
  process.exit(0)
}

// type is an alias of format
if (values.type) {
  values.format = values.type
  delete values.type
}

// parse the iterations parameter as an integer
try {
  values.iterations = parseInt(values.iterations)
  if (isNaN(values.iterations)) {
    values.iterations = 1
  }
} catch {
  console.error('iterations must be a number')
  process.exit(5)
}


let template = ''
const piped = (!process.stdin.isTTY)
let rs = null

if (values.list) {
  console.log(datamaker.listTags())
  process.exit(0)
}

// die with error code
const die = function (msg, errCode) {
  console.error('ERROR:' + msg)
  process.exit(errCode)
}

// detect if the format is being piped in
if (piped) {
  rs = process.stdin
} else {
  if (!values.template) {
    die('A template must be supplied')
  }
  rs = fs.createReadStream(values.template)
}

// make sure valid format has been supplied
if (values.format !== 'csv' && values.format !== 'json' && values.format !== 'none' && values.format !== 'xml') {
  die('format must be either none, xml, json or csv', 1)
}

// load the template (from piped stdin or from named file)
rs.on('readable', () => {
  let chunk
  while ((chunk = rs.read()) !== null) {
    template += chunk
  }
  template = template.trim()
}).on('end', async () => {
  // when the template has loaded, generate the data
  datamaker.generate(template, values.format, values.iterations)
    .on('data', (d) => { console.log(d) })
}).on('error', (e) => {
  die(e, 2)
})
