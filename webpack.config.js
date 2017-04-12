const path = require('path')

module.exports = {
  entry: './src',

  externals: {
    react: {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'prop-types': {
      root: 'PropTypes',
      amd: 'prop-types',
      commonjs: 'prop-types',
      commonjs2: 'prop-types'
    }
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'TypeWriter',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread', 'add-module-exports']
      }
    }]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
}
