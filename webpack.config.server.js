const path = require('path')
const nodeExternals = require('webpack-node-externals')

const baseConfig = require('./webpack.config')

module.exports = () => {
  const config = baseConfig()

  return {
    ...config,
    target: 'node',
    externals: [nodeExternals()],
    entry: path.resolve(__dirname, 'app/server/index.ts'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'server.bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?/,
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'app/server/tsconfig.json'),
          },
        },
      ],
    },
  }
}
