import axios from '../utils/request.js';

export default {
	GetOrderList(params){
		return axios.get('/order/api/list',{
			params
		})
	}
}