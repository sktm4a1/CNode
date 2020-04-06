const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(webpackBaseConfig,{
	mode:"development",
	entry:{
		app:path.join(__dirname,'../client/app.js')
	},
	output:{
		filename:'[name].js',
		// path:path.join(__dirname,'../dist'),
		// publicPath:'/public/'
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
	plugins:[
		new HTMLPlugin({
			template:path.join(__dirname,'../client/template.html')
		}),
		new HTMLPlugin({
			template: '!!ejs-compiled-loader!' + path.join(__dirname,'../client/server.template.ejs'),
			filename:'server.ejs'
		})
	]
})

if(isDev){
	config.devtool = '#cheap-module-eval-source-map'
	config.entry = {
		app:[
			'react-hot-loader/patch',
			path.join(__dirname,'../client/app.js')
		]
	}
	config.devServer = {
		port:8080,
		inline:true,
		compress:true,
		clientLogLevel: "none",
		stats: 'errors-only',
		// contentBase:path.join(__dirname,'../dist'),
		hot:true,
		overlay:{
			errors:true
		},
		publicPath:'/public/',
		historyApiFallback:{
			index:'/public/index.html'
		},
		proxy:{
			'/api':{
				ws:false,
				target:'http://localhost:8080'
			}
		},
		sockHost: 'http://localhost:8080'
	}
	config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config