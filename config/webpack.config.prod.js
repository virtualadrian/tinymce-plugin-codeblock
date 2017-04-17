const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pluginName = 'codeblock'

module.exports = {
  entry: {
    'plugin': './src/index.js',
    'plugin.min': './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist', pluginName),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../LICENSE'),
        to: path.join(__dirname, '../dist', pluginName)
      },
      {
        from: path.join(__dirname, '../static/codeblock.css'),
        to: path.join(__dirname, '../dist', pluginName)
      }
    ])
  ],
  externals: {
    'highlightjs': 'hljs',
    'codemirror/lib/codemirror': 'CodeMirror'
  }
}
