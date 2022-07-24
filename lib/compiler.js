const { getDependencies, getSource } = require('./parser.js' )

const fs = require('fs')

const path = require('path')

const EventEmitter = require('events').EventEmitter;

class Compiler extends EventEmitter {
  constructor (option) {
    super()
    this.entry = option.entry
    this.output = option.output
    this.plugins = option.plugins
    this.loaders = option.loaders
    this.modules = []
  }

  registerPlugins () {
    this.plugins.forEach(plugin => {
      plugin.run(this)
    })
  }

  run () {
    this.registerPlugins()
    this.modules.push(this.buildModule({
      filename: this.entry,
      filePath: this.entry
    }))
    for (let index = 0; index < this.modules.length; index++) {
      this.modules[index].dependencies.forEach(dep => {
        this.modules.push(this.buildModule(dep))  
      });
    }
    this.emitFiles()
  }


  buildModule (dep) {
    const { filename, filePath } = dep
    let code = getSource(filePath)
    this.loaders.forEach(({test, use}) => {
      if (test.test(filename)) {
        code = use(code)
      }
    })
    
    return {
      filename,
      dependencies: getDependencies(dep),
      code: code, 
    }
  }

  emitFiles () {

    let modules = []
    this.modules.forEach(module => {
      modules.push(`'${module.filename}': function (require, module, exports) {
        ${module.code}
      }`)
    })
    let code = `(
      function(modules) {
        function require (filename) {
          var module = {
            exports: {}
          }
          var fn = modules[filename]
          fn(require, module, module.exports)
          return module.exports
        }
        require('${this.entry}')
      }
    )({${modules.join(',')}})`
    if (!fs.existsSync(this.output.path)) {
      fs.mkdirSync(this.output.path, {
        recursive: true
      })
    }
    fs.writeFileSync(path.join(this.output.path, this.output.filename), code)
    let chunks = []
    chunks.push({
      chunkName: 'index',
      chunkPath: this.output.filename
    })
    this.emit('chunks', chunks)
  }
}

module.exports = Compiler