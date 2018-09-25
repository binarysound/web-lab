const path = require('path')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  if (!(env && 'target' in env)) {
    throw Error('Please provide proper `--env.target`.')
  }

  const { target } = env
  const isProduction = argv.mode === 'production'

  const baseConfig = {
    mode: isProduction ? 'production' : 'development',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'app'),
      },
      extensions: ['.js', '.ts', '.tsx'],
    },
    entry: path.resolve(__dirname, `app/${target}/index`),
    output: {
      path: path.resolve(__dirname, `build/${target}`),
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?/,
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, `app/${target}/tsconfig.json`),
          },
        },
      ],
    },
  }

  if (target === 'server') {
    return {
      ...baseConfig,
      target: 'node',
      externals: [nodeExternals()],
    }
  } else if (target === 'client') {
    return {
      ...baseConfig,
      devtool: isProduction ? false : 'source-map',
      optimization: {
        splitChunks: {
          chunks: 'all',
        },
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'app/client/index.html'),
        }),
      ],
    }
  } else {
    throw Error(
      `\`${target}\` is not a valid build target.\n` +
      'Please provide `--env.target` as `client` or `server`.',
    )
  }
}
