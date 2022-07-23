const babylon = require('babylon')
const fs = require('fs')
const traverse = require('@babel/traverse').default
const { transformFromAstSync } = require('@babel/core')
const path = require('path')

module.exports = {
  getAst: (filePath) => {
    let source = fs.readFileSync(filePath, 'utf-8')
    let ast = babylon.parse(source, {
      sourceType: 'module'
    })
    return ast
  },

  getDependencies: (ast, filePath) => {
    let dirname = path.dirname(filePath)
    let dependencies = []
    traverse(ast, {
      ImportDeclaration:  (vnode) => {
        dependencies.push({
          filename: vnode.node.source.value, 
          filePath: path.join(dirname, vnode.node.source.value)
        })
      }
    })
    return dependencies
  }, 

  getTransformCode: (ast) => {
    let {code} = transformFromAstSync(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  }
}