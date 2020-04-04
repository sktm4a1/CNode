const ReactDomServer = require('react-dom/server')
const asyncBootstrap = require('react-async-bootstrapper').default;
const ejs = require('ejs');
const serialize = require('serialize-javascript');
const Helmet = require('react-helmet').default;

const {SheetsRegistry} = require("react-jss");
const {createMuiTheme,createGenerateClassName} = require("@material-ui/core/styles");
const {lightBlue,deepOrange} = require("@material-ui/core/colors");

const getStoreState = stores => {
    return Object.keys(stores).reduce((result,storeName) => {
       if(stores[storeName].toJson){
           result[storeName] = stores[storeName].toJson();
       }else{
           result[storeName] = stores[storeName]
       }
       return result;
   },{})
}

module.exports = function(bundle,template,req,res) {
    return new Promise((resolve,reject) => {
        const createStoreMap = bundle.createStoreMap;
        const createApp = bundle.default;
        const routerContext = {}
        const stores = createStoreMap();
        const sheetsRegistry = new SheetsRegistry();
        const generateClassName = createGenerateClassName();
        const theme = createMuiTheme({
            palette:{
                primary:lightBlue,
                secondary:deepOrange,
                type:"light"
            }
        })
        const app = createApp(stores,routerContext,sheetsRegistry,generateClassName,theme,req.url)
        const helmet = Helmet.rewind();
        asyncBootstrap(app).then(() => {
            const content = ReactDomServer.renderToString(app)
            if(routerContext.url){
                res.status(302).setHeader('Location',routerContext.url)
                res.end()
                return
            }
            const state = getStoreState(stores);

            // res.send(template.replace('<!-- App -->',content))
            const html = ejs.render(template,{
                appString:content,
                initialState:serialize(state),
                title:helmet.title.toString(), // toString会把标签也渲染好
                meta:helmet.meta.toString(),
                style:helmet.style.toString(),
                link:helmet.link.toString(),
                materialCss:sheetsRegistry.toString()
            })
            res.send(html);
            resolve()
        }).catch(error => {
            reject(error);
        })
    })
}