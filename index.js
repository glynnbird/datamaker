const EventEmitter = require('events')
const a = require('async')
const fs = require('fs')

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
    const code = require('./plugins/' + tag.tag)

    // calculate the replacement
    const replacement = formatter.filter(code.apply(null, tag.parameters))

    // switch the tag in the template for the replacement
    str = str.replace(tag.original, replacement)
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
  const formatter = require('./formatters/' + format)

  // make "iterations" loops
  let i = 0
  process.nextTick(() => {
    a.doWhilst((done) => {
      // swap out placeholders for random values
      const newStr = swap(str, tags, formatter)

      // emit the data to the caller
      ee.emit('data', newStr)

      // take a breath
      process.nextTick(done)
    }, () => {
      i++
      // don't stop til you get enough
      return (i < iterations)
    }, () => {
      process.nextTick(() => {
        ee.emit('end', { count: i })
      })
    })
  })

  return ee
}

const listTags = () => {
  return fs.readdirSync('./plugins/').map((f) => { return '{{' + f.replace(/\.js$/, '' + '}}') }).join('\n')
}

module.exports = {
  generate: generate,
  listTags: listTags
}
