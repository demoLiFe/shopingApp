<template>
	<view class="search">
		<view class="left">
			<slot name="left"></slot>
		</view>
		<view class="input-box">
			<text class="place-holder">1111</text>
		</view>
		<slot name="right-icon"></slot>
		<view class="btn-box">
			<view class="btn">
				<text>{{btnText}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			btnText:{
				type:String,
				default:'搜索'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search{
		height: 68upx;
		border: 4upx solid #E46135;
		border-radius: 36upx;
		width: 100%;
		display: flex;
		align-items: center;
		.left{
			padding:10upx;
			position: relative;
		}
		.input-box{
			display: flex;
			align-items: center;
			font-size: 26upx;
			color: #888888;
			flex: 1;
			padding: 0 20upx;
			height: 100%;
		}
		.btn-box{
			padding: 2upx;
			margin-left: 10upx;
			height: 100%;
			.btn{
				padding: 0 30upx;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				font-size: 24upx;
				border-radius: 36upx;
				background: #F7842B;
				color: #fff;
			}
		}
	}
</style>