<template>
	<view class="pay-success">
		<view class="success-icon">
			<text class=" font-icon icon-xuanzhong2"></text>
		</view>
		<view class="tip">
			<text>支付成功</text>
		</view>
		<view class="btn-box">
			<button type="primary" class="btn" @click="jumpToOrder">查看订单</button>
			<button :plain="true" class="btn back" @click="jumpToIndexPage">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			//查看订单
			jumpToOrder(){
				uni.redirectTo({
					url:'/pages/user/order'
				})
			},
			//返回首页
			jumpToIndexPage(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.success-icon{
		padding-top: 100upx;
		text-align: center;
		.font-icon{
			color: #fa436a;
			font-size: 160upx;
		}
	}
	.tip{
		text-align: center;
		font-size: 38upx;
		color: #303133;
	}
	.btn-box{
		padding-top: 118upx;
		.btn{
			width: 600upx;
			background: #fa436a;
			font-size: 32upx;
			height: 80upx;
			display: flex;
			margin-top: 30upx;
			border-radius: 10upx;
			align-items: center;
			justify-content: center;
		}
		.back{
			background: transparent;
			border: 1px solid #ccc;
		}
	}
</style>
