<template>
	<view class="no-data" v-else>
		<view class="no-data-content">
			<image src="@/static/emptyData.png" mode=""></image>
			<text>{{tipText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			tipText:{
				type:String,
				default:'暂无数据'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.no-data{
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.no-data-content{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 26upx;
			image{
				height: 400upx;
				width: 400upx;
			}
		}
	}
</style>