const babylon = require('babylon')
const fs = require('fs')
const traverse = require('@babel/traverse').default

const path = require('path')

const getAst = (filePath) => {
  let source = fs.readFileSync(filePath, 'utf-8')
  let ast = babylon.parse(source, {
    sourceType: 'module'
  })
  return ast
}

const getSource = (filePath) => {
  return fs.readFileSync(filePath, 'utf-8')
}

const getDependencies = ({filename, filePath}) => {
  if (!/\.js$/.test(filename)) return []
  let dirname = path.dirname(filePath)
  let ast = getAst(filePath)
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
}

module.exports = {
  getAst,
  getSource,
  getDependencies
}