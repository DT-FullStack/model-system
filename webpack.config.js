const path = require('path');
const nodePolyfill = require('node-polyfill-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
import { EnvironmentPlugin } from 'webpack';

// For inclusion in any Node.js webpack config
const nodeOptions = {
  target: 'node',
  plugins: [new nodePolyfill(), new EnvironmentPlugin(['PORT', 'NODE_ENV'])],
  externals: [nodeExternals()],
};

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
  ...nodeOptions,
  entry: "./src/server/server.ts",
  output: {
    filename: 'server.js',
    path: __dirname
  },
  mode: "development",
  // plugins: [new nodePolyfill()],
  // externals: [nodeExternals()],
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
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
