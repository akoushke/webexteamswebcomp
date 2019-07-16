const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const MODULE = {
  rules: [
    {
      test: /\.ts$/,
        use: [{
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: './tsconfig.json'
            }
          } , 'angular2-template-loader',
        ]
    },
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
      use: ['to-string-loader','style-loader', 'css-loader'],
    },
    {
      test: /\.scss$/,
      use: [
         'to-string-loader',
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
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(__dirname, '../samples/angular/src'), // location of your src
      {} // a map of your routes
    ),
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
    name: 'React',
    cache: true,
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
    name: 'Cordova',
    cache: true,
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
  },
  {
    name: 'Angular',
    stats: 'errors-only',
    devtool: 'inline-source-map',
    cache: true,
    node: {
      fs: 'empty'
    },
    entry: {
      polyfills: path.join(__dirname, '../samples/angular/src/polyfills.ts'),
      vendor: path.join(__dirname, '../samples/angular/src/vendor.ts'),
      app : path.join(__dirname, '../samples/angular/src/main.ts'),
    },
    output : {
      filename: '[name].js',
      path: path.resolve(__dirname, '../samples/angular/dist')
    },
    module: MODULE,
    plugins: createPlugins(path.join(__dirname, '../samples/angular/src/index.html')),
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
  }
];