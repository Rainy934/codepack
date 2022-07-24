const babylon = require('babylon')
const { transformFromAstSync } = require('@babel/core')

module.exports = function (source) {
  let ast = babylon.parse(source, {
    sourceType: 'module'
  })
  let {code} = transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env']
  })
  return code
}