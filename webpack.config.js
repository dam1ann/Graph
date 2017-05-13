const ExtractTextPlugin = require('extract-text-webpack-plugin'),
	path = require('path'),
	webpack = require('webpack');

module.exports = {
	entry: [
		'./src/js/index.js',
		'./src/scss/index.scss',
		'./index.html'
	],
	output: {
		filename: "dist/bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: 'es2015'
				},
				exclude: /node_modules/
			}, {
				test: /\.(scss)$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader']
				})
			}, {
				test: /\.html$/,
				loader: 'html-loader'
			}, {
				test: /\.(jpg|png|svg)/,
				loader: 'url-loader'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: './dist/bundle.css'

		}),

		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery',
			d3:'d3'
		})
	],
	devServer: {
		port: 3000
	}
};