const express = require('express')
const fs = require('fs')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const serverRender = require('./util/server-render')
const path = require('path')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false})) // form表单形式请求
app.use(session({
	maxAge: 10 * 60 * 1000,
	name:'tid',
	resave:false,
	saveUninitialized:false,
	secret:"react cnode class"
}))

app.use(favicon(path.join(__dirname,'../favicon.ico')))

const isDev = process.env.NODE_ENV === 'development'

app.use('/api/user',require('./util/handle-login.js'))
app.use('/api',require('./util/proxy.js'))


if(!isDev){
	const serverEntry = require('../dist/server-entry.js');
	const template = fs.readFileSync(path.join(__dirname,'../dist/server.ejs'),'utf-8') // 默认为buffer对象，指定utf-8字符串
	app.use('/public',express.static(path.join(__dirname,'../dist'))) // 静态资源文件请求目录
	app.get('*',function(req,res,next){
		serverRender(serverEntry,template,req,res).catch(next)
	})
}else{
	const devStatic = require('./util/dev.static.js')
	devStatic(app)
}

app.use(function (error,req,res,next){
	console.log(error);
	res.status(500).send(error);
})

app.listen(8080,function(){
	console.log('Server is listening on port 8080')
})