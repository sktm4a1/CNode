const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const memoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')
const proxy  = require('http-proxy-middleware')

const serverConfig = require('../../build/webpack.config.server.js')

const getTemplate = () => {
	return new Promise((resolve,reject) => {
		axios.get('http://localhost:8080/public/index.html')
		.then(res => {
			resolve(res.data)
		})
		.catch(err => {
			reject(err)
		})
	})
}

let severBundle,createStoreMap;
const NativeModule = require('module') 
const vm = require('vm')

const getModuleFromString = (bundle,filename) => {
	const m = {exports:{}}
	const wrapper = NativeModule.wrap(bundle)
	const script = new vm.Script(wrapper,{
		filename:filename,
		displayErrors:true
	})
	const result = script.runInThisContext()
	result.call(m.exports,m.exports,require,m)
	return m;
}

const mfs = new memoryFs
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs

serverCompiler.watch({},(err,stats) => {
	if(err)
		throw err;
	stats = stats.toJson()
	stats.errors.forEach(err => console.error(err))
	stats.warnings.forEach(warn => console.warn(warn))

	const bundlePath = path.join(serverConfig.output.path,serverConfig.output.filename)
	const bundle = mfs.readFileSync(bundlePath,'utf-8')
	const m = getModuleFromString(bundle,'server-entry.js')
	severBundle = m.exports.default
	createStoreMap = m.exports.createStoreMap
})

module.exports = function(app){
	app.use('/public',proxy({
		target:'http://localhost:8080'
	}))

	app.get('*',function(req,res){
		getTemplate().then(template => {

			const routerContext = {}
			const app = severBundle(createStoreMap(),routerContext,req.url)

			const content = ReactDomServer.renderToString(app)
			if(routerContext.url){
				res.status(302).setHeader('Location',routerContext.url)
				res.end()
				return
			}
			res.send(template.replace('<!-- App -->',content))
		}).catch(err => {
			reject(err)
		})
	})
}