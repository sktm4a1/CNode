import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

const paramsUrl = (url,params) => {
	const str = Object.keys(params).reduce((result,key) => {
		result += `${key}=${params[key]}&`;
		return result;
	},'')
	return `${baseUrl}/api${url}?${str.substr(0,str.length-1)}`
}

export const get = (url,params) => {
	return new Promise((resolve,reject) => {
		axios.get(paramsUrl(url,params))
		.then(resp => {
			var data = resp.data;
			if(data && data.success === true){
				resolve(data)
			}else{
				reject(data)
			}
		}).catch((err) => {
			if(err.response){
				reject(err.response.data)
			}else{
				reject({
					success:false,
					err_msg:err.message
				})	
			}
		})
	})
}

export const post = (url,params,datas) => {
	return new Promise((resolve,reject) => {
		axios.post(paramsUrl(url,params),datas)
		.then(resp => {
			var data = resp.data;
			if(data && data.success === true){
				resolve(data)
			}else{
				reject(data)
			}
		}).catch((err) => {
			if(err.response){
				reject(err.response.data)
			}else{
				reject({
					success:false,
					err_msg:err.message
				})	
			}
		})
	})
}