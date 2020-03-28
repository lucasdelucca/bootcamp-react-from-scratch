const { resolve } = require('path')

module.exports = {
  entry: resolve(__dirname, 'src', 'index.js'),
  output: {
    path: resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          // Inject CSS into the DOM.
          { loader: 'style-loader' },
          // The css-loader interprets @import and url() like import/require() and will resolve them.
          { loader: 'css-loader' },
        ],
      },
    ],
  },
}
