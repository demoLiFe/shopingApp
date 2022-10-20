import axios from '../utils/request.js';

export default {
	Login(data){
		return axios.post('/users/api/login',data)
	},
	Logout(data){
		return axios.post('/users/api/logout',data)
	},
}