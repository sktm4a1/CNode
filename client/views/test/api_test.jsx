import React , { Fragment } from 'react'
import axios from 'axios'

export default class ApiTest extends React.Component {
    getTopics = () => {
        axios.get('/api/topics').then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    login = () => {
        axios.post('/api/user/login',{
            accessToken:'f5dba1b2-ddd4-48e4-951f-71956d444d11'
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    markAll = () => {
        axios.post('/api/message/mark_all?needAccessToken=true').then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    render () {
        return (
            <Fragment>
                <button onClick={this.getTopics}>topics</button>
                <button onClick={this.login}>login</button>
                <button onClick={this.markAll}>mark_all</button>
            </Fragment>
        )
    }
}