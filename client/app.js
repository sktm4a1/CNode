import React from 'react'  // 使用了jsx语法，必须引入react
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import {BrowserRouter} from 'react-router-dom'
import {AppContainer} from 'react-hot-loader'
import App from './views/App'
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core/styles'
import {lightBlue,deepOrange} from '@material-ui/core/colors'
import appstate from './store/app-state'


const theme = createMuiTheme({
	typography: {
	    useNextVariants: true
	  },
	palette:{
		primary:lightBlue,
		secondary:deepOrange,
		type:'light'
	}
})

// ReactDOM.render(<App />,document.getElementById('root'))  
// 服务端渲染使用hydrate -- 生成环境下     

const iroot = document.getElementById('root')

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Provider appstate={appstate}>
				<BrowserRouter>
					<MuiThemeProvider theme={theme}>
						<Component />
					</MuiThemeProvider>
				</BrowserRouter>
			</Provider>			
		</AppContainer>,
		iroot
		)
}
render(App)

if(module.hot){
	module.hot.accept('./views/App.jsx',() => {
		const NextApp = require('./views/App.jsx').default
		//ReactDOM.hydrate(<NextApp />,iroot)
		render(NextApp)
	})
}