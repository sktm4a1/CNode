const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
	mode:"development",
	entry:{
		app:path.join(__dirname,'../client/app.js')
	},
	output:{
		filename:'[name].js',
		path:path.join(__dirname,'../dist'),
		publicPath:'/public/'
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
	plugins:[
		new HTMLPlugin({
			template:path.join(__dirname,'../client/template.html')
		})
	],
	resolve:{
		extensions:['.js','.jsx']
	}
}

if(isDev){
	config.devtool = '#cheap-module-eval-source-map'
	config.entry = {
		app:[
			'react-hot-loader/patch',
			path.join(__dirname,'../client/app.js')
		]
	}
	config.devServer = {
		host:'0.0.0.0',
		port:8080,
		inline:true,
		compress:true,
		clientLogLevel: "none",
		stats: 'errors-only',
		contentBase:path.join(__dirname,'../dist'),
		hot:true,
		overlay:{
			errors:true
		},
		publicPath:'/public/',
		historyApiFallback:{
			index:'/public/index.html'
		}
	}
	config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config