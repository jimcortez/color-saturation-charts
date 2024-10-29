const path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/app.js',
  },
  module: {
    rules: [
      // {
      //   test: /\.(ttf|woff|eot)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]?[hash]'
      //   }
      // },
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
      }
    ],
  },
};
