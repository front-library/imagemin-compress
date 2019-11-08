const fs = require('fs')
const path = require('path')

const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')

const glob = require('glob')
const chalk = require('chalk')

// Output message information
const status = ({ fileName, originSize, simpleSize }) => {
  console.log(' ')
  console.log(chalk.rgb(6, 196, 41)(`${fileName}:  `), chalk.yellow([
    `${(originSize / 1024).toFixed(2)}KB`,
    `${(simpleSize / 1024).toFixed(2)}KB`
  ].join(' =====> ')))
  console.log(' ')
}

class Main {
  constructor(options = {}) {
    this.dir = options.files
    this.out = options.dest || options.files
    this.quality = options.quality || [0.6, 0.8]
    this.verbose = options.verbose !== false
  }

  // Compress image core fn.
  async compress(filePath) {
    let originSize = fs.statSync(path.resolve(filePath)).size
    let simpleSize
    let fileNameRgx = /(\/|\\)([^/\\]*)$/
    let fileName = (filePath.match(fileNameRgx) || [])[2] || ''

    let files = await imagemin([filePath], {
      destination: (this.dir === this.out) ? filePath.replace(fileNameRgx, '') : this.out,
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: this.quality,
          verbose: this.verbose
        })
      ]
    })

    simpleSize = fs.statSync(path.resolve(files[0].destinationPath)).size
    return { originSize, fileName, file: files[0], simpleSize }
  }

  // Queue complie
  async queue() {
    let files = await new Promise((resolve, reject) => glob(
      `${this.dir}/**/*.{jpeg,jpg,png,svg,gif}`, (error, files) => {
        error ? reject(error) : resolve(files)
      }
    ))
    let clone = files.slice()

    if (!clone.length) {
      return null
    }

    return await new Promise(resolve => {
      let result = []
      let inner = async filePath => {
        let file = await this.compress(filePath)

        if (this.verbose) {
          status(file)
        }

        result.push(file)
        clone.splice(0, 1)
        clone.length ? inner(clone[0]) : resolve(result)
      }
      inner(clone[0])
    })
  }
}

module.exports = {
  generator: async(options = {}) => await new Main(options).queue(),
  status
}
