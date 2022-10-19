import axios from '../utils/request.js';

export default {
	GetNavList(params){
		return axios.get('/category/api/nav/list',{
			params
		})
	},
	GetNavGoodsList(params){
		return axios.get('/category/api/navGoods/list',{
			params
		})
	},
	GetGoodsList(params){
		return axios.get('/category/api/goods/list',{
			params
		})
	},
	GetClassifyList(params){
		return axios.get('/category/api/classify/list')
	},
}