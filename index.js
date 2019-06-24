const EventEmitter = require('events')
const a = require('async')
const fs = require('fs')
const path = require('path')
const tagNames = fs.readdirSync(path.join(__dirname, 'plugins')).map((f) => { return '{{' + f.replace(/\.js$/, '' + '}}') }).join('\n')
const formatterNames = fs.readdirSync(path.join(__dirname, 'formatters')).map((f) => { return '{{' + f.replace(/\.js$/, '' + '}}') }).join('\n')
const cache = require('./cache.js')

// locate occurences of things surrounded in double curly {{brackets}}
const findTags = (str) => {
  // find tags
  let tags = []
  const matches = str.match(/({{[^{}]+}})/gm)

  if (matches) {
    // iterate through each one
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

      // return original text, the tag name and the parameters
      return {
        original: s,
        tag: arr[0],
        parameters: arr.slice(1)
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
  for (let i in tags) {
    // load the plugin
    const tag = tags[i]
    if (tagNames.includes(tag.tag)) {
      const code = require(path.join(__dirname, 'plugins', tag.tag))

      // calculate the replacement
      const replacement = formatter.filter(code.apply(null, tag.parameters))

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
    a.doWhilst(async (done) => {
      return new Promise((resolve, reject) => {
        // swap out placeholders for random values
        const newStr = swap(str, tags, formatter)

        // emit the data to the caller
        ee.emit('data', newStr)

        // take a breath
        process.nextTick(resolve)
      })
    }, async () => {
      i++
      // don't stop til you get enough
      return (i < iterations)
    }, () => {
      process.nextTick(() => {
        cache.clear()
        ee.emit('end', { count: i })
      })
    })
  })

  return ee
}

// list possible tag names
const listTags = () => {
  return tagNames
}

module.exports = {
  generate: generate,
  listTags: listTags
}
