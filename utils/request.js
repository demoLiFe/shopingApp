import axios from "axios"
import config from '../config/config.js'
const {serverBaseURL} = config;
const services = axios.create({
	baseURL:serverBaseURL,
	crossDomain: true,
});

services.interceptors.request.use(
   config=>{
	   config.validateStatus = function(status) {
	   	 return status === 200 || status === 401
	   }
	   config.headers = {
		   // token:'ab_adw2sd22e2'
	   }
	   return config
   },
   err=>{
	   console.log(err);
   }
)

services.interceptors.response.use(
   response =>{
	   if(response.status === 200){
		   return response.data
	   }
   },
   err => {
	   console.log(err);
	  return Promise.reject(err)
   }
)
axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		const settle = require("axios/lib/core/settle");
		const buildURL = require("axios/lib/helpers/buildURL");
		uni.request({
			url: serverBaseURL + buildURL(config.url, config.params, config.paramsSerializer),
			method: config.method.toUpperCase(),
			data: config.data,
			header: {
			
			},
			timeout: 30 * 1000,
			dataType: config.dataType,
			validateStatus: config.validateStatus,
			success: function(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.data.msg,
					header: response.header,
					config: config
				}
				settle(resolve, reject, response, config.validateStatus)
			},
			fail: function(err) {
				if (err) {
					console.log(11,err);
					// settle(resolve, reject, {
					// 	errMsg: '网络不给力'
					// }, null)
				}
			}
		})
	})
}
export default services