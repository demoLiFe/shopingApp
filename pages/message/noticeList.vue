/**
  * @createTime: 2022-10-16 9:14:06 ?F10: PM?
  * @Description: 
  * @author syh
*/
<template>
	<view class="notice-list">
		<view class="date-time">
			<text>2022-10-16 20:00</text>
		</view>
		<view class="notice-list-item">
			<view class="header">
				<text class="title">系统通知</text>
			</view>
			<view class="content">
				<u--image src="/static/temp/ad2.jpg" width="100%" height="260upx" @click="click"></u--image>
			</view>
			<view class="bottom-box" @click="jumToNoticeDetail()">
				<text>查看详情</text>
				<text class="font-icon icon-you"></text>
			</view>
		</view>
		<view class="notice-list-item">
			<view class="header">
				<text class="title">系统通知</text>
			</view>
			<view class="content">
				<u--image src="/static/temp/ad2.jpg" width="100%" height="260upx" @click="click"></u--image>
			</view>
			<view class="bottom-box" @click="jumToNoticeDetail()">
				<text>查看详情</text>
				<text class="font-icon icon-you"></text>
			</view>
		</view>
		<view class="notice-list-item">
			<view class="header">
				<text class="title">系统通知</text>
			</view>
			<view class="content">
				<u--image src="/static/temp/ad2.jpg" width="100%" height="260upx" @click="click"></u--image>
			</view>
			<view class="bottom-box" @click="jumToNoticeDetail()">
				<text>查看详情</text>
				<text class="font-icon icon-you"></text>
			</view>
		</view>
		<view class="notice-list-item">
			<view class="header">
				<text class="title">系统通知</text>
			</view>
			<view class="content">
				<u--image src="/static/temp/ad2.jpg" width="100%" height="260upx" @click="click"></u--image>
			</view>
			<view class="bottom-box" @click="jumToNoticeDetail()">
				<text>查看详情</text>
				<text class="font-icon icon-you"></text>
			</view>
		</view>
		<view class="notice-list-item">
			<view class="header">
				<text class="title">系统通知</text>
			</view>
			<view class="content">
				<u--image src="/static/temp/ad2.jpg" width="100%" height="260upx" @click="click"></u--image>
			</view>
			<view class="bottom-box" @click="jumToNoticeDetail()">
				<text>查看详情</text>
				<text class="font-icon icon-you"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import Utils from '@/utils/utils.js'
	export default {
		data(){
			return {
				
			}
		},
		onLoad() {
			const utils = new Utils()
			console.log(utils.dateformat('yyyy-MM-dd'));
		},
		methods:{
			//通知详情
			jumToNoticeDetail(){
				uni.navigateTo({
					url:''
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #F5F5F5;
		
	}
	.notice-list{
		padding: 20upx 30upx;
		.date-time{
			font-size: 28upx;
			text-align: center;
			padding: 20upx 0;
		}
	    .notice-list-item{
			margin-bottom: 30upx;
			background: #FFFFFF;
			border-radius: 10upx;
			.header{
				padding: 20upx 30upx;
				display: flex;
				align-items: center;
				font-size: 28upx;
			}
			.content{
				height: 260upx;
				width: 100%;
				border-bottom: 1px solid #E4E7ED;
			}
			.bottom-box{
				color: #8a8a8a;
				padding: 20upx 30upx;
				font-size: 26upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}	
	}
</style>
