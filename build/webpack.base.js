const path = require('path')

module.exports = {
    output:{
        path:path.join(__dirname,'../dist'),
		publicPath:'/public/',
    },
    module:{
		rules:[
			{
				test:/\.(jsx|js)$/,
				loader:'babel-loader',
				exclude:path.join(__dirname,'../node_modules/')
			}
		]
	},
	resolve:{
		extensions:['.js','.jsx']
	}
}