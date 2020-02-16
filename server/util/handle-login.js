const router = require('express').Router()
const axios = require('axios')
const querystring = require('query-string')

const baseUrl = 'https://cnodejs.org/api/v1' // http永久重定向到https，post会变成get，坑爹

router.post('/login',function(req,res,next){
	axios(`${baseUrl}/accesstoken`,{
		method:req.method,
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		},
		data:querystring.stringify({accesstoken:req.body.accessToken})
	})
	.then(resp => {
		if(resp.status === 200 && resp.data.success ){
			req.session.user =  {
				accessToken:req.body.accessToken,
				loginName : resp.data.loginname,
				id:resp.data.id,
				avatarUrl:resp.data.avatar_url
			}
			res.json({
				success:true,
				data:resp.data
			})
		}else{
			res.json({
				success:false,
				data:resp.data
			})
		}
	})
	.catch(err => {
		if(err.response) {
			res.json({
				status:err.response.status,
				statusText:err.response.statusText,
				data:err.response.data
			})
		}else{
			next(err)
		}
	})
})

module.exports = router