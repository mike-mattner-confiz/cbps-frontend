const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const basePath = process.cwd();
const config = require('./config.json');
const { aem } = config;

const pages = glob.sync('**/*.hbs', {
  cwd: `${basePath}/src/hbs/pages`
}).map(page => {
  const filename = page.substring(page.lastIndexOf('/')+1);
  const name = filename.split('.').slice(0, -1).join('.');
  const title = name.charAt(0).toUpperCase() + name.slice(1);

  return new HtmlWebpackPlugin({
    title: `${title}`,
    filename: page.replace('hbs', 'html'),
    template: `./src/hbs/pages/${page}`,
    chunks: [`${name}`]
  })
});

const jsFiles = () => {

  let jsObject = {}

  glob.sync('**/*.js', {
    cwd: `${basePath}/src/hbs/pages`
  }).forEach(page => {

    const filename = page.substring(page.lastIndexOf('/')+1);
    const name = filename.split('.').slice(0, -1).join('.');

    jsObject[name] = `./src/hbs/pages/${page}`;

  });

  return jsObject;

};

module.exports = {
  mode: 'development',
	context: path.resolve(__dirname),
	entry: jsFiles(),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name]/js/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader',
				query: {
          helperDirs: path.resolve(__dirname, 'src', 'hbs', 'helpers'),
					partialDirs: path.resolve(__dirname, 'src', 'hbs', 'partials'),
				}
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
			},
      {
        test: /\.scss$/,
        loader: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.yaml$/,
        use: [{
          loader: 'js-yaml-loader',
          options: {}
        }]
      },
			{
				test: /\.(png|jpg)$/,
				loader: 'file-loader'
			}
		]
	},
  externals: {
    window: 'window',
    jquery: 'jQuery',
  },
	plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name]/css/[name].css',
    }),
		new CleanWebpackPlugin({ verbose: true }),
		new CopyWebpackPlugin([{ from: './src/static' }]),
    ...pages,
	]
};
