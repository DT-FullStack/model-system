const path = require('path');
const nodePolyfill = require('node-polyfill-webpack-plugin');

const clientConfig = {
  entry: "./src/client/index.ts",
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: "development",
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  }
}

const serverConfig = {
  entry: "./src/server/server.ts",
  target: 'node',
  output: {
    filename: 'server.js',
    path: __dirname
  },
  mode: "development",
  plugins: [new nodePolyfill()],
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  }
}

module.exports = [clientConfig, serverConfig];

// module.exports = {
//   entry: "./src/client/index.ts",
//   output: {
//     filename: 'index.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   mode: "development",
//   module: {
//     rules: [
//       { test: /\.css$/, use: 'css-loader' },
//       { test: /\.ts$/, use: 'ts-loader' }
//     ]
//   },
//   resolve: {
//     extensions: ['.js', '.ts']
//   }
// }
