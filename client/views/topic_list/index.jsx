import React from 'react'
import {observer,inject} from 'mobx-react'
import Button from '@material-ui/core/Button'

import Container from '../layout/container'
@inject('appstate') @observer

export default class TopicList extends React.Component {
	constructor() {
		super()
		this.changeName = this.changeName.bind(this)
	}
	changeName(event) {
		this.props.appstate.changeName(event.target.value) 
	}

	componentDidMount(){
		// do some things  
	}
	render(){
		return (
			<Container>
				<Button variant="contained" color="primary">点击这里</Button>
				<input type="text" onChange={this.changeName} />
				<span>{this.props.appstate.msg}</span>
			</Container>
		)
	}
}