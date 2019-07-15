const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const MODULE = {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env','@babel/preset-react']
        }
      }
    },
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
        presets: ['@babel/preset-react']
      }
    },
    {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
          options: {
            minimize: true,
            interpolation: true,
            removeAttributeQuotes: false
          }
        }
      ]
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.scss$/,
      use: [
          'style-loader',
          'css-loader',
          'sass-loader'
      ]
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
          loader: 'file-loader',
          options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
          }
      }]
    }
  ]
};

function createPlugins(template) {
  return [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['!css/', '!img/' , '!cordova_plugin.js', '!cordova.js' , '!template/', 'dist/']
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: template,
    }),
    new Dotenv()
  ];
}

module.exports = [
  {
    name: 'BROWSER',
    cache: false,
    node: {
      fs: 'empty'
    },
    mode: 'development',
    stats: 'errors-only',
    devtool: 'inline-source-map',
    entry: {
      app: path.join(__dirname, '../samples/reactJS/src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, '../samples/reactJS/dist/')
    },

    module: MODULE,
    plugins: createPlugins(path.join(__dirname, '../samples/reactJS/src/index.html'))
  },
  {
    name: 'MOBILE',
    cache: false,
    node: {
      fs: 'empty'
    },
    mode: 'development',
    stats: 'errors-only',
    devtool: 'inline-source-map',
    entry: {
      app: path.join(__dirname, '../samples/cordova/src/js/index.js'),
    },
    output: {
      path: path.resolve(__dirname, '../samples/cordova/www')
    },
    module: MODULE,
    plugins: createPlugins(
      path.join(__dirname, '../samples/cordova/www/template/index.html')
    ),
  }
];