const path = require('path');

module.exports = {
    mode: 'production',
  entry: './src/index.ts',
  module: {
      rules: [{
          test: /\.ts$/,
          use: 'ts-loader',
          include: [path.resolve(__dirname, 'src')]
      }]
  },
  output: {
    filename: 'main.js',
    //filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};