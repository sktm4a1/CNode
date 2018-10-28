import React from 'react'
import {Route,Redirect} from 'react-router-dom'

import TopicList from '../views/topic_list/index'
import TopicDetail from '../views/topic_detail/index'

export default () => [
	<Route key="1" path="/" render={() => <Redirect to="/list" />} exact={true} />,
	<Route key="2" path="/list" component={TopicList} />,
	<Route key="3" path="/detail" component={TopicDetail} />
]