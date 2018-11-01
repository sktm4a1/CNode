const path = require('path')
const webpack = require('webpack')

module.exports = {
	target:"node",
	mode:"development",
	entry:{
		app:path.join(__dirname,'../client/server-entry.js')
	},
	output:{
		filename:'server-entry.js',
		path:path.join(__dirname,'../dist'),
		publicPath:'/public/',
		libraryTarget:'commonjs2'
	},
	module:{
		rules:[
			{
				test:/.(jsx|js)$/,
				loader:'babel-loader',
				exclude:path.join(__dirname,'../node_modules/')
			}
		]
	},
	externals:Object.keys(require('../package.json').dependencies),
	resolve:{
		extensions:['.js','.jsx']
	},
	plugins:[
		new webpack.DefinePlugin({
			'process.env.API_BASE':'"http://127.0.0.1:8080"'
		})
	]
}