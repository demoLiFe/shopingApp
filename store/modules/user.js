const user = {
	state:{
		userInfo:{}
	},
	mutations:{
		setUserInfo(state,data){
			state.userInfo = data;
			uni.setStorageSync('userInfo',state.userInfo)
		}
	},
	actions:{
		test({commit,state},payload){
			
		}
	},
	getters:{
		
	}
}

export default user