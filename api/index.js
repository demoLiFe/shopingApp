import axios from "../utils/request.js"
import Vue from 'vue'
export default {
	GetBannerList(params){
		return axios.get('/api/banner/list',{
			params
		})
	},
	GetSecKillGoodsList(params){
		return axios.get('/api/seckill/goods/list',{
			params
		})
	},
	GetGroupBuying(params){
		return axios.get('/api/groupbuying/goods/list',{
			params
		})
	},
	GetCateGoodsList(params){
		return axios.get('/api/cate/goods/list',{
			params
		})
	},
	GetNavList(params){
		return axios.get('/api/nav/list',{
			params
		})
	},
	GetLikeGoodsList(params){
		return axios.get('/api/like/goods/list',{
			params
		})
	}
}