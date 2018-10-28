const express = require('express')
const fs = require('fs')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const ReactSSR = require('react-dom/server')
const path = require('path')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
	maxAge:10*60*1000,
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
	const serverEntry = require('../dist/server-entry.js').default

	const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf-8')
	app.use('/public',express.static(path.join(__dirname,'../dist')))
	app.get('*',function(req,res){
		const appString = ReactSSR.renderToString(serverEntry);	
		res.send(template.replace('<!-- App -->',appString))
	})
}else{
	const devStatic = require('./util/dev.static.js')
	devStatic(app)
}

app.listen(8080,function(){
	console.log('http://localhost:8080已启动！')
})