import React from 'react'
import {observer,inject} from 'mobx-react'
// import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Container from '../layout/container'
import TopicListItem from './list-item'

@inject('appstate') @observer

export default class TopicList extends React.Component {
	constructor() {
		super()
		this.state = {
			tabIndex:0
		}
		this.changTab = this.changTab.bind(this)
		this.listItemCLick = this.listItemCLick.bind(this)
	}	

	changTab(e,index) {
		this.setState({
			tabIndex:index
		})
	}
	listItemCLick() {
		console.log('listItemCLick')
	}

	componentDidMount(){
		// do some things  
	}
	render(){
		const {tabIndex} = this.state;
		const topic={
			title:'伊泽瑞尔是个帅哥',
			username:'faker',
			reply_count:23,
			visit_count:323,
			create_at:'2018-11-1 14:16:59',
			tab:'置顶'
		}
		return (
			<Container>
				<Tabs value={tabIndex} onChange={this.changTab}>
					<Tab label="全部" />
					<Tab label="分享" />
					<Tab label="问答" />
					<Tab label="工作" />
					<Tab label="精品" />
					<Tab label="测试" />
				</Tabs>
				<TopicListItem onClick={this.listItemCLick} topic={topic} />
			</Container>
		)
	}
}