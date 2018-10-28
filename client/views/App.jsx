import React from 'react'
// import {Link} from 'react-router-dom'
import Routes from '../config/router'

import AppBar from './layout/app-bar'

export default class App extends React.Component {
	render(){
		return [
			<AppBar key="appbar" />,
			<Routes key="routes" />
		]					
	}
}