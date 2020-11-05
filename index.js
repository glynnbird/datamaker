const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')
const tagNames = fs.readdirSync(path.join(__dirname, 'plugins')).map((f) => { return '{{' + f.replace(/\.js$/, '' + '}}') }).join('\n')
const formatterNames = fs.readdirSync(path.join(__dirname, 'formatters')).map((f) => { return '{{' + f.replace(/\.js$/, '' + '}}') }).join('\n')
const cache = require('./cache.js')
const crypto = require('crypto')

// locate occurences of things surrounded in double curly {{brackets}}
const findTags = (str) => {
  // find tags
  let tags = []
  const matches = str.match(/({{[^{}]+}})/gm)

  if (matches) {
    // iterate through each one
    let filter = null
    tags = matches.map((s) => {
      // remove leading {{
      // removing trailing }}
      // split into words
      // remove whitespace
      const arr = s.replace(/^{{/, '')
        .replace(/}}$/, '')
        .split(/(\s+)/)
        .map((e) => { return e.trim() })
        .filter((e) => { return e.length > 0 })

      // if there's an optional filter e.g. {{ name | toUpperCase }}
      if (arr.includes('|')) {
        const i = arr.indexOf('|')
        const filterArr = arr.splice(i)
        filter = filterArr.filter((f) => { return f !== '|' })
      }

      // return original text, the tag name and the parameters
      return {
        original: s,
        tag: arr[0],
        parameters: arr.slice(1),
        filter: filter
      }
    })
  }
  return tags
}

// using the supplied template and list of tag objects found within it
// and a the supplied formatter object, make all the substitions and
// return the new string
const swap = (template, tags, formatter) => {
  let str = template

  // iterate through the tags
  for (const i in tags) {
    // load the plugin
    const tag = tags[i]
    if (tagNames.includes(tag.tag)) {
      const code = require(path.join(__dirname, 'plugins', tag.tag))

      // calculate the replacement
      let replacement = formatter.filter(code.apply(null, tag.parameters))

      // apply filter
      if (tag.filter) {
        for (var j in tag.filter) {
          const filter = tag.filter[j]
          switch (filter) {
            case 'toLowerCase':
              replacement = replacement.toLowerCase()
              break
            case 'toUpperCase':
              replacement = replacement.toUpperCase()
              break
            case 'toArray':
              replacement = JSON.stringify(replacement.split(/\W/))
              break
            case 'md5':
              replacement = crypto.createHash('md5').update(replacement).digest('hex')
              break
            case 'sha1':
              replacement = crypto.createHash('sha1').update(replacement).digest('hex')
              break
            case 'sha256':
              replacement = crypto.createHash('sha256').update(replacement).digest('hex')
              break
            case 'base64':
              replacement = Buffer.from(replacement).toString('base64')
              break
            case 'toString':
              replacement = replacement.toString()
              break
            default:
              break
          }
        }
      }

      // cache the last-generated value for each tag
      cache.set(tag.tag, replacement)

      // switch the tag in the template for the replacement
      str = str.replace(tag.original, replacement)
    }
  }

  // apply any post formatting specified by the formatter
  return formatter.postCommit(str)
}

// generate some data based on the template, the format and the
// numer of iterations
const generate = (str, format, iterations) => {
  const ee = new EventEmitter()

  if (format === 'json') {
    try {
      const loopJSON = JSON.parse(str)
      iterateLoop(loopJSON)
      str = JSON.stringify(loopJSON)
    } catch (error) {
      console.error(error)
    }
  }

  // locate tags in the template
  const tags = findTags(str)

  // load the formatter code
  if (!formatterNames.includes(format)) {
    throw new Error('invalid format')
  }
  const formatter = require(path.join(__dirname, 'formatters', format))

  // make "iterations" loops
  let i = 0
  process.nextTick(() => {
    do {
      const newStr = swap(str, tags, formatter)
      // emit the data to the caller
      ee.emit('data', newStr)
      i++
    } while (i < iterations)
    cache.clear()
    ee.emit('end', { count: i })
  })

  return ee
}

// list possible tag names
const listTags = () => {
  return tagNames
}

const iterateLoop = (obj) => {
  Object.keys(obj).forEach(key => {
    if (key.startsWith('((loop ')) {
      const splitter = key.split(' ')
      const tagname = splitter[1].trim()
      const times = splitter[2].split('))')[0].trim()
      let repeat
      if (times.includes(',')) {
        const min = parseInt(times.split(',')[0])
        const max = parseInt(times.split(',')[1])
        repeat = Math.floor(Math.random() * (max - min)) + min
      } else {
        repeat = parseInt(times)
      }
      const template = obj[key]
      obj[tagname] = []
      for (let index = 0; index < repeat; index++) {
        obj[tagname].push(template)
      }
      delete obj[key]
      // resolve
    }
    if (typeof obj[key] === 'object') {
      iterateLoop(obj[key])
    }
  })
  return obj
}

module.exports = {
  generate: generate,
  listTags: listTags
}
