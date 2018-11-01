import React from 'react'
import {observer,inject} from 'mobx-react'
// import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress';

import Container from '../layout/container'
import TopicListItem from './list-item'

@inject(stores => {
	return  {
		appState:stores.appState,
		topicStore:stores.topicStore
	}
}) @observer

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
		this.props.topicStore.fetchTopics()  
	}
	render(){
		const {tabIndex} = this.state;

		const {topicStore} = this.props;
		const topicList = topicStore.topics
		const syncingTopics = topicStore.syncing
		
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
				<List>
					{
						topicList.map(topic => <TopicListItem key={topic.id} onClick={this.listItemCLick} topic={topic} />)
					}
				</List>
				{
					syncingTopics ? (
						<div>
							<CircularProgress />
						</div>
					):null
				}
			</Container>
		)
	}
}