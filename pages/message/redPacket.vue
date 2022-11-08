<template>
	<view class="red-packet">
		<view class="total-item">
			<text class="title">金额</text>
			<input type="number" v-model="total" placeholder-style="color:#cccccc" placeholder="￥0.00" class="total-input"  maxlength="6"/>
		</view>
		<view class="remarks-item">
			<textarea placeholder="恭喜发财,大吉大利" class="textarea" maxlength="30" />
			<u-icon name="red-packet"  size="26">></u-icon>
		</view>
		<view class="cover-item" @click="chooseCover">
			<text class="title">红包封面</text>
			<text class="font-icon icon-you"></text>
		</view>
		<!-- 金额显示 -->
		<view class="total-view">
			<text >{{!!total ? `￥${total}` : '￥0.00'}}</text>
		</view>
		<u-button class="btn" type="primary" @click="pushMoney" text="塞钱进红包"></u-button>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				total:''
			}
		},
		methods:{
			chooseCover(){
				uni.showToast({
					icon:'none',
					title:'暂无封面可换'
				})
			},
			//塞钱
			pushMoney(){
				
			}
		}
	}
</script>

<style>
	page{
		background: #f5f5ff;
	}
</style>
<style lang="scss" scoped>
	.red-packet{
		padding: 30upx;
		.total-item,.remarks-item,.cover-item{
			display: flex;
			align-items: center;
			padding: 30upx;
			background: #fff;
			border-radius: 16upx;
			.title{
				flex: 1;
			}
			.total-input{
				text-align: right;
				width: 120rpx;
			}
		}
		.remarks-item{
			margin-top: 30upx;
			.textarea{
				flex: 1;
				height: 60upx;
			}
			
		}
		.cover-item{
			margin-top: 30upx;
			.font-icon{
				color: #a5a5a5;
			}
		}
		.total-view{
			text-align: center;
			font-size: 50upx;
			margin: 100upx 0 50upx 0;
		}
		.btn{
			border: none;
			width: 350upx;
			background: var(--base-color);
		}
	}
	
</style>