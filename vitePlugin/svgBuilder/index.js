const fs = require('fs')
const path = require('path')

const readFileSync = fs.readFileSync
const readdirSync = fs.readdirSync

const svgTitle = /<svg([^>]*?)>/
const clearHeightWidth = /\s*(width|height)="[^"]*"/g
const hasViewBox = /viewBox="[^"]*"/
const clearReturn = /[\r\n]/g

function findSvgFile(dir) {
    const svgRes = []
    const dirents = readdirSync(dir, { withFileTypes: true })
    for (const dirent of dirents) {
        if (dirent.isDirectory()) {
            svgRes.push(...findSvgFile(path.join(dir, dirent.name)))
        } else if (dirent.name.endsWith('.svg')) {
            const svgPath = path.join(dir, dirent.name)
            const svg = readFileSync(svgPath, 'utf-8')
                .replace(clearReturn, '')
                .replace(svgTitle, (_, attrs) => {
                    let width = 0
                    let height = 0
                    let content = attrs.replace(clearHeightWidth, (match, attr, value) => {
                        if (attr === 'width') width = value
                        if (attr === 'height') height = value
                        return ''
                    })
                    if (!hasViewBox.test(attrs)) {
                        content += ` viewBox="0 0 ${width} ${height}"`
                    }
                    return `<symbol id="${dirent.name.replace('.svg', '')}" ${content}>`
                })
                .replace('</svg>', '</symbol>')
            svgRes.push(svg)
        }
    }
    return svgRes
}

module.exports.svgBuilder = (dir) => {
    if (!dir) return
    const res = findSvgFile(dir)
    return {
        name: 'svg-transform',
        transformIndexHtml(html) {
            return html.replace('<body>', `
              <body>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
                  ${res.join('')}
                </svg>
            `)
        }
    }
}
