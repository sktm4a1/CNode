const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')

module.exports = webpackMerge(webpackBaseConfig,{
	target:"node",
	mode:"development",
	entry:{
		app:path.join(__dirname,'../client/server-entry.js')
	},
	output:{
		filename:'server-entry.js',
		// path:path.join(__dirname,'../dist'),
		// publicPath:'/public/',
		libraryTarget:'commonjs2'
	},
	// module:{
	// 	rules:[
	// 		{
	// 			test:/\.(jsx|js)$/,
	// 			loader:'babel-loader',
	// 			exclude:path.join(__dirname,'../node_modules/')
	// 		}
	// 	]
	// },
	externals:Object.keys(require('../package.json').dependencies),
	plugins:[
		new webpack.DefinePlugin({
			'process.env.API_BASE':'"http://127.0.0.1:8080"'
		})
	]
})