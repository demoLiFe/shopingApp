<template>
	<view class="setting">
		<view class="list-wrap">
			<list-cell title="个人资料" url="/pages/user/userInfo"></list-cell>
			<list-cell title="收货地址" url="/pages/user/address"></list-cell>
			<list-cell title="实名认证"></list-cell>
			<view class="mg-t-16">
				<list-cell title="消息推送" :canJump="false">
					<template v-slot:right>
						<switch checked color="#e07472" style="transform: scale(0.8);" />
					</template>
				</list-cell>
			</view>
			<view class="mg-t-16">
				<list-cell title="清除缓存" :canJump="false"></list-cell>
				<list-cell title="关于我们"></list-cell>
				<list-cell title="检查更新" desc="当前版本1.0.0beta" :canJump="false"></list-cell>
			</view>
		</view>
		<view class="log-out-btn" @click="logOut">
			<text>退出登录</text>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import ListCell from '@/components/list-cell.vue'
	export default {
		components: {
			ListCell
		},
		data() {
			return {

			}
		},
		methods:{
			logOut(){
				uni.showModal({
					title:'是否退出登陆？',
					success:(res)=>{
						if(res.confirm){
							uni.showLoading({
								title:'退出中..'
							});
							this.$api.user.Logout({}).then(res=>{
								if(res.status === 200){
									this.$store.commit('setUserInfo',{});
									uni.reLaunch({
										url:'/pages/login/login'
									});
								};
								uni.hideLoading();
							}).catch(err=>{
								this.$refs.uToast.show({
									message: err
								});
								uni.hideLoading();
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f5f5f5;
	}

	.list-wrap {
		// padding-left: 30upx;
		.mg-t-16 {
			margin-top: 16upx;
		}
	}
	.log-out-btn{
		margin-top: 40upx;
		line-height: 100upx;
		text-align: center;
		height: 100upx;
		background: #fff;
		color: #fa436a;
	}
</style>
