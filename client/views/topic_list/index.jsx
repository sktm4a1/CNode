import React from 'react'
import {observer,inject} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from "react-helmet";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress';

import Container from '../layout/container'
import TopicListItem from './list-item'
import queryString from 'query-string'
import {tabs} from '../../util/variable-define'

@inject(stores => {
	return  {
		appState:stores.appState,
		topicStore:stores.topicStore
	}
}) 

@observer
export default class TopicList extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	constructor() {
		super()
		this.changTab = this.changTab.bind(this)
		this.listItemCLick = this.listItemCLick.bind(this)
	}	

	changTab(e,value) {
		this.context.router.history.push({
			pathname:'/index',
			search:`?tab=${value}`
		})
	}
	listItemCLick() {
		console.log('listItemCLick')
	}
	getTab(search){
		const search1 = search || this.props.location.search
		const query = queryString.parse(search1)
		return query.tab || 'all'
	}

	componentDidMount(){
		const tab=this.getTab()
		this.props.topicStore.fetchTopics(tab)  
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.location.search!==this.props.location.search){
			this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search))
		}
	}
	render(){
		const {topicStore} = this.props;
		const topicList = topicStore.topics
		const syncingTopics = topicStore.syncing
		const tab = this.getTab()
		return (
			<Container>
				<Helmet>
					<title>This is topic list page</title>
					<meta name="description" content="This is topic list description" />
					<meta name="keywords" content="topic hello react" />
				</Helmet>
				<Tabs value={tab} onChange={this.changTab}>					
					{
						Object.keys(tabs).map(item => {
							return <Tab key={item} label={tabs[item]} value={item} />
						})
					}
				</Tabs>
				<List>
					{
						topicList.map(topic => <TopicListItem key={topic.id} onClick={this.listItemCLick} topic={topic} />)
					}
				</List>
				{
					syncingTopics ? (
						<div style={{
							display:'flex',
							justifyContent:'space-around',
							padding:'40px 0'
						}} >
							<CircularProgress />
						</div>
					):null
				}
			</Container>
		)
	}
}
TopicList.propTypes = {
	location:PropTypes.object.isRequired
}