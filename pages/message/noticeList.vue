/**
  * @createTime: 2022-10-16 9:14:06 
  * @Description: 
  * @author syh
*/
<template>
	<view class="notice-list">
		<view v-if="noticeList.length > 0">
			<view v-for="(item,index) in noticeList" :key="index">
				<view class="date-time">
					<text>{{item.dateTime | filterDateTime}}</text>
				</view>
				<view class="notice-list-item" v-for="(citem,cindex) in item.list" :key="citem.id">
					<view class="header">
						<text class="title">{{citem.noticeType}}</text>
					</view>
					<view class="content">
						<u--image  class="image" :src="citem.img" width="160rpx" height="160rpx" @click="click"></u--image>
						<view class="right">
							<view class="title">{{citem.title}}</view>
							<view class="desc">
								<text>{{citem.content}}</text>
							</view>
						</view>
					</view>
					<view class="bottom-box" @click="jumToNoticeDetail()">
						<text>查看详情</text>
						<text class="font-icon icon-you"></text>
					</view>
				</view>
			</view>
		</view>
		<no-data v-else></no-data>
	</view>
</template>

<script>
	import Utils from '@/utils/utils.js'
	import config from '@/config/config.js'
	const utils = new Utils()
	
	export default {
		data(){
			return {
				noticeList:[],
				websocket:null,//实例
			}
		},
	
		filters:{
			filterDateTime(val){
			    return	utils.dateformat('yyyy-MM-dd hh:mm:ss',val)
			}
		},
		onLoad() {
			// console.log(utils.dateformat('yyyy-MM-dd',));
			this.connectWs();
		},
		methods:{
			//连接websocket
			connectWs(){
				this.websocket = uni.connectSocket({
					url:config.wsBaseURL + '/api/notice/list',
					success() {
						console.log('websocket连接成功');
					}
				});
				this.websocket.onOpen(() => {
					this.websocket.onMessage((msg) => {
						// console.log('收到服务端msg',msg);
						if (msg.data) {
							this.noticeList = JSON.parse(msg.data)
						}
					});
				});
				this.websocket.onClose(() => {
					this.websocketOpened = false
				    //断线重连
					this.connectWs();
				});
				this.websocket.onError(() => {
				    this.websocketOpened = false
				})
			},
			//通知详情
			jumToNoticeDetail(){
				uni.navigateTo({
					url:''
				})
			}
		}
	}
</script>

<style>
	page{
		background: #F5F5F5;
		height: 100%;
		width: 100%;
	}
</style>
<style lang="scss" scoped>

	.notice-list{
		height: 100%;
		width: 100%;
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
				font-size: 30upx;
			}
			.content{
				padding:20upx 30upx;
				width: 100%;
				border-bottom: 1px solid #E4E7ED;
				display: flex;
				.right {
					padding-left: 20upx;
					overflow: hidden;
				    .title{
						font-size: 30upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.desc{
						padding-top: 10upx;
                        word-break: break-all;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						font-size: 28upx;
						color: #8a8a8a;
						display: box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}
				}
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
