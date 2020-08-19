const PRODUCTION = process.env.NODE_ENV === 'production' ? true : false;

var path = require('path')
var webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin')

module.exports = {
  mode: PRODUCTION ? 'production' : 'development',
  entry: {
    'js/index.js': PRODUCTION ? [path.resolve(__dirname, './src/assets/js/index.ts')] : [path.resolve(__dirname, './src/assets/js/index.ts'), 'webpack-hot-middleware/client?reload=true&timeout=1000']
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: PRODUCTION ? [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            },
          },
          'css-loader',
          'sass-loader',
        ] : [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: false,
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: "ts-loader",
        options: {
            configFile: "tsconfig.frontend.json"
        }
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[folder]/[name].[ext]'
        }
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
    new CssUrlRelativePlugin()
  ]
}

