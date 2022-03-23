const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')
const formatterNames = fs.readdirSync(path.join(__dirname, 'formatters')).map((f) => { return '{{' + f.replace(/\.js$/, '' + '}}') }).join('\n')
const cache = require('./cache.js')
const crypto = require('crypto')

const scanForPlugins = (dirPath, arrayOfPlugins = [], namespace) => {
  // checks if the directory exists before trying to scan it
  if (fs.existsSync(dirPath)) {
    // lists and then iterates over all the files / directories
    fs.readdirSync(dirPath).forEach((file) => {
      // if a directory has been detected it is a custom plugin namespace
      if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
        // step into the directory to pick up the custom plugins using "file" as the namespace
        arrayOfPlugins = scanForPlugins(`${dirPath}/${file}`, arrayOfPlugins, file)
      } else {
        const plugin = file.replace(/\.js$/, '')
        // if it is a custom namespace it will have a namespace which forms part of the tag name
        const tagName = namespace ? `${namespace}:${plugin}` : plugin

        arrayOfPlugins.push(`{{${tagName}}}`)
      }
    })
  }

  return arrayOfPlugins
}

const getPlugins = () => {
  // pick up all the core bundled plugins
  const bundledPlugins = scanForPlugins(path.join(__dirname, 'plugins'))

  // check for custom plugins that may exist in the root of users applications
  const customPlugins = scanForPlugins(path.join(process.cwd(), 'datamaker', 'plugins'))

  // combine the bundled and custom plugins together with the custom plugins added last
  return [...bundledPlugins.sort(), ...customPlugins.sort()]
}

const tagNames = getPlugins().join('\n')

// locate occurences of things surrounded in double curly {{brackets}}
const findTags = (str) => {
  // find tags
  let tags = []
  const matches = str.match(/({{[^{}]+}})/gm)

  if (matches) {
    // iterate through each one
    tags = matches.map((s) => {
      let filter = null
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
      // check if it is a custom tag contains and require the plugins from 
      // the applications custom plugin directory otherwise it is a bundled
      // plugin and require it as normal
      const code = tag.tag.includes(':')
        ? require(path.join(process.cwd(), 'datamaker', 'plugins', tag.tag.split(':')[0], tag.tag.split(':')[1]))
        : require(path.join(__dirname, 'plugins', tag.tag))

      // calculate the replacement
      let replacement = formatter.filter(code.apply(null, tag.parameters))

      // apply filter
      if (tag.filter) {
        for (const j in tag.filter) {
          const filter = tag.filter[j]
          switch (filter) {
            case 'toLowerCase':
              replacement = replacement.toLowerCase()
              break
            case 'toUpperCase':
              replacement = replacement.toUpperCase()
              break
            case 'toTitleCase':
              replacement = replacement.toLowerCase()
              if (replacement.length > 0) {
                const uc = replacement[0].toUpperCase()
                replacement = replacement.replace(new RegExp('^' + replacement[0]), uc)
              }
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
      // TODO: here will be the saving to a file
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
