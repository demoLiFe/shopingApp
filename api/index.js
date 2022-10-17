import axios from "../utils/request.js"
import Vue from 'vue'
export default {
	GetBannerList(params){
		return axios.get('/api/banner/list',{
			params
		})
	}
	
}