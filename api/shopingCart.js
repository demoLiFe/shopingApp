import axios from '../utils/request.js';

export default {
	GetShopingCartList(params){
		return axios.get('/shopingCart/api/list',{
			params
		})
	}
}