<template>
	<view class="message">
		<scroll-view class="scroll-view" scroll-y="true" >
			<view class="list">
				<view class="list-item" v-for="(item,index) in sessionList" :key="index" @click="jumpToPage(item)">
					<view class="avatar">
						<u-avatar  size="50" shape="square" :src="item.avatar"></u-avatar>
					</view>
					<view class="right-content">
						<view class="top-box">
							<text class="uname" v-if="item.msgType === 0">{{item.uName}}</text>
							<text class="title" v-if="item.msgType === 1">{{item.title}}</text>
							<view class="no-read" v-show="item.noRead > 0">
								<text>{{item.noRead}}</text>
							</view>
						</view>
						<view class="bottom-box">
							<text class="msg">{{item.msg}}</text>
							<text class="date-time">{{item.dateTime}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				sessionList:[
					{
						avatar:'/static/missing-face.png',
						uName:'刘德华',
						msgType:0,
						msg:'哈哈哈',
						noRead:2,
						dateTime:'2022-10-12'
					},
					{
						avatar:'/static/missing-face.png',
						uName:'张的帅',
						msg:'在干嘛',
						msgType:0,
						noRead:1,
						dateTime:'2022-10-12'
					},
					{
						avatar:'/static/missing-face.png',
						uName:'申的帅',
						msg:'今天天气不错',
						msgType:0,
						noRead:8,
						dateTime:'2022-10-12'
					},
					{
						avatar:'/static/missing-face.png',
						msg:'系统临时维护通知',
						title:'系统通知',
						msgType:1,
						noRead:8,
						dateTime:'2022-10-12'
					}
				]
			}
		},
		methods:{
			//跳转对应页面
			jumpToPage(item){
				//聊天界面
				if(item.msgType === 0){
					uni.navigateTo({
						url:'/pages/message/chat'
					})
				}else{//通知界面
					uni.navigateTo({
						url:'/pages/message/noticeList'
					})
				};
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
		background: #F5F5F5;
		width: 100%;
	}
	.message{
		height: 100%;
		width: 100%;
		.scroll-view{
			height: 100%;
			width: 100%;
			.list{
				.list-item{
					background: #fff;
					// height: 120upx;
					padding: 20upx;
					border-bottom: 1px solid #E4E7ED;
					display: flex;
					align-items: center;
					.avatar{
						display: flex;
						align-items: center;
						justify-content: center;
						width: 100upx;
						height: 100%;
						margin-right: 20upx;
					}
					.right-content{
						flex: 1;
						.top-box{
							display: flex;
							align-items: center;
							.uname,.title{
								flex: 1;
								font-size: 32upx;
							}
							.no-read{
								height: 45upx;
								width: 45upx;
								border-radius: 50%;
								background: #f50000;
								color: #fff;
								line-height: 45upx;
								text-align: center;
								font-size: 24upx;
							}
						}
						.bottom-box{
							display: flex;
							align-items: center;
							padding-top: 20upx;
							.msg{
								flex: 1;
								font-size: 26upx;
								color: #666;
							}
							.date-time{
								font-size: 26upx;
								color: #666;
							}
						}
					}
				}
			}
		}
	}
</style>
