import axios from '../utils/request.js';

export default {
	Login(data){
		return axios.post('/users/api/login',data)
	},
	Logout(data){
		return axios.post('/users/api/logout',data)
	},
	GetHistoryRecordList(params){
		return axios.get('/users/api/history/record/list',{
			params
		})
	},
	GetAddressList(params){
		return axios.get('/users/api/address/list/get',{
			params
		})
	},
	EditAddressList(data){
		return axios.post('/users/api/address/list/edit',data)
	},
	CreateAddressList(data){
		return axios.post('/users/api/address/list/create',data)
	},
	GetCollectionList(params){
		return axios.get('/users/api/collection/list',{
			params
		})
	},
	GetAppraiseList(params){
		return axios.get('/users/api/appraise/list',{
			params
		})
	}
}