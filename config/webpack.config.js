const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const packagejson = require('../package.json')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const parts = require('./webpack.parts.config')

const paths = {
  base: path.resolve('src'),
  app: path.resolve('src/com/safary/findmini/FindMiniGame.js'),
  dist: path.resolve('dist'),
  template: path.resolve('index.html'),
}

const commonConfig = merge([
  {
    target: 'web',
    context: paths.base,
    entry: {
      app: paths.app,
    },
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      publicPath: '',
      path: paths.dist,
    },
    resolve: {
      extensions: ['.js'],
      alias: {},
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.template,
        title: packagejson.name,
        version: packagejson.version,
      }),
      new CaseSensitivePathsPlugin(),
      new CopyWebpackPlugin([
        {
          from: '../assets',
          to: 'assets',
        },
      ]),
      new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    ],
  },

  parts.loadJs({
    babelOptions: {
      presets: [
        [
          'babel-preset-env',
          {
            modules: false,
            useBuiltIns: 'entry',
            shippedProposals: true,
          },
        ],
        'stage-2',
      ],
      plugins: [],
    },
  }),

  parts.injectVersion(packagejson.version),
])

const developmentConfig = merge([
  parts.sourceMaps('source-map'),

  parts.devServer({ host: process.env.HOST, port: process.env.PORT }),

  { plugins: [new webpack.NamedModulesPlugin()] },

  parts.envVar('development'),
])

const commonProductionConfig = envVar => {
  return merge([
    parts.cleanup([paths.dist]),

    parts.envVar(envVar),

    parts.attachRevision(),

    {
      performance: {
        // maxEntrypointSize: 1200000,
        // maxAssetSize: 1200000,
      },
      optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          name: true,
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all',
            },
          },
        },
      },
    },
  ])
}

const productionConfig = merge([commonProductionConfig('production')])

const preProductionConfig = merge([
  commonProductionConfig('preproduction'),
  parts.sourceMaps('source-map'),
])

const analyzeConfig = merge([parts.analyze()])

module.exports = env => {
  let envConfig = developmentConfig
  switch (env) {
    case 'production':
      envConfig = productionConfig
      break
    case 'preproduction':
      envConfig = preProductionConfig
      break
  }
  const config = merge(envConfig, commonConfig)
  if (process.env.npm_config_analyze) {
    return merge(analyzeConfig, config)
  }

  return config
}
