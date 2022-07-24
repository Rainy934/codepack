const Compiler = require('./lib/compiler.js')
const path = require('path')
const HtmlPlugin = require('./plugins/html-plugin.js')
const StyleLoader = require('./loaders/style-loader.js')
const JsLoader = require('./loaders/js-loader.js')
const compiler = new Compiler({
  entry: path.join(__dirname, './src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  }, 
  plugins: [
    new HtmlPlugin({
      templatePath: path.join(__dirname, 'index.html')
    })
  ],
  loaders: [
    {
      test: /\.js$/,
      use: JsLoader
    },
    {
      test: /\.css$/,
      use: StyleLoader
    }
  ]
})

compiler.run()