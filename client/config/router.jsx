import React from 'react'
import {Route,Redirect} from 'react-router-dom'

import TopicList from '../views/topic_list/index'
import TopicDetail from '../views/topic_detail/index'
import ApiTest from '../views/test/api_test'

export default () => [
	<Route key="first" path="/" render={() => <Redirect to="/list" />} exact={true} />,
	<Route key="list" path="/list" component={TopicList} />,
	<Route key="detail" path="/detail" component={TopicDetail} />,
	<Route key="api_test" path="/apitest" component={ApiTest} />
]