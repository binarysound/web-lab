const path = require('path')

const chalk = require('chalk')
const nodemon = require('nodemon')
const webpack = require('webpack')

const configMaker = require('./webpack.config')

function getConfig(target) {
  return configMaker(
    {
      target,
    },
    {
      mode: 'development',
    },
  )
}

let isNodemonOn = false
function runServer() {
  if (!isNodemonOn) {
    isNodemonOn = true

    nodemon({
      script: path.resolve(__dirname, 'build/server/main.bundle.js'),
      ext: 'js json',
      watch: ['build/server/'],
      ignore: [
        path.resolve(__dirname, 'devRun.js'),
        path.resolve(__dirname, 'build/client/*'),
      ],
    })
    nodemon.on('start', function () {
      console.log(`${chalk.green('Server has started.')}`)
    }).on('quit', function () {
      console.log(`${chalk.green('Server has quit.')}`)
      process.exit()
    })
  }
}

const targets = ['client', 'server']
const compiler = webpack(targets.map(getConfig))
compiler.watch({}, (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }

  console.log(stats.toString({
    chunks: false,
    colors: true,
  }))

  runServer()
})
