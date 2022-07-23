const fs = require('fs')
const path = require('path')
const parse5 = require('parse5')

// 遍历html
function traverse(root, callback) {
  const visit = (node, parent) => {
    let res;

    if (callback) {
      res = callback(node, parent);
    }

    let { childNodes } = node;

    // in case a <template> tag is in the middle of the HTML: https://github.com/JPeer264/node-rcs-core/issues/58
    if (node.content && Array.isArray(node.content.childNodes)) {
      ({ childNodes } = node.content);
    }

    if (res !== false && Array.isArray(childNodes) && childNodes.length >= 0) {
      childNodes.forEach((child) => {
        visit(child, node);
      });
    }
  };

  visit(root, null);
}


class HtmlPlugin {
  constructor (option) {
    this.templatePath = option.templatePath
  }

  run (compiler) {
    compiler.on('chunks', (chunks) => {
      let code = fs.readFileSync(this.templatePath, 'utf-8')
      let document = parse5.parse(code, {
        sourceCodeLocationInfo: true
      })
      traverse(document, (node, parent) => {
        if (node.tagName === 'head') {
          let start = node.sourceCodeLocation.endTag.startOffset
          code = `${code.slice(0, start)} <script src="${chunks[0].chunkPath}"></script>\n${code.slice(start)}`
        }
      })
      if (!fs.existsSync(compiler.output.path)) {
        fs.mkdirSync(compiler.output.path)
      }
      fs.writeFileSync(path.join(compiler.output.path, 'index.html'), code)
    })
  }
}

module.exports = HtmlPlugin