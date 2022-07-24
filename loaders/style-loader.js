module.exports = function (source) {
  return `
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(\`${source}\`))
    document.head.appendChild(style)
  `
}