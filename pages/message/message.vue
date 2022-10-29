<template>
	<view class="message">
		<scroll-view class="scroll-view" scroll-y="true">
			<view class="list" v-if="sessionList.length > 0">
				<view class="list-item" v-for="(item,index) in sessionList" :key="index" @click="jumpToPage(item)">
					<view class="avatar">
						<u-avatar size="50" shape="square" :src="item.avatar"></u-avatar>
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
			<u-empty class="empty" v-else mode="message" icon="http://cdn.uviewui.com/uview/empty/message.png">
			</u-empty>
		</scroll-view>
	</view>
</template>

<script>
	import config from '../../config/config.js'
	export default {
		data() {
			return {
				socketOpened: false,
				sessionList: []
			}
		},
		onLoad() {
			this.connectWs()
		},
		methods: {
			//跳转对应页面
			jumpToPage(item) {
				//聊天界面
				if (item.msgType === 0) {
					uni.navigateTo({
						url: `/pages/message/chat?chatid=${item.chatid}`
					})
				} else { //通知界面
					uni.navigateTo({
						url: '/pages/message/noticeList'
					})
				};
			},
			//连接websockt
			connectWs(){
				const ws = uni.connectSocket({
					url: config.wsBaseURL + '/api/session/list',
					success(data) {
						console.log("websocket连接成功");
					},
				});
				console.log(ws);
				
				ws.onOpen(()=>{
					console.log('eee');
					this.socketOpened = true;
					ws.onMessage((msg)=>{
						console.log('收到服务端msg', JSON.parse(msg.data));
						if(msg.data){
							this.sessionList = JSON.parse(msg.data)
						};
					})
					ws.send({
						data:111,
						async success(){
							console.log('发送成功');
						}
					})
					
				})
				ws.onClose(()=>{
					
				})
				ws.onError(()=>{
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background: #F5F5F5;
		width: 100%;
	}

	.message {
		height: 100%;
		width: 100%;

		.scroll-view {
			height: 100%;
			width: 100%;
			position: relative;

			.list {
				.list-item {
					background: #fff;
					// height: 120upx;
					padding: 20upx;
					border-bottom: 1px solid #E4E7ED;
					display: flex;
					align-items: center;

					.avatar {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 100upx;
						height: 100%;
						margin-right: 20upx;
					}

					.right-content {
						flex: 1;

						.top-box {
							display: flex;
							align-items: center;

							.uname,
							.title {
								flex: 1;
								font-size: 32upx;
							}

							.no-read {
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

						.bottom-box {
							display: flex;
							align-items: center;
							padding-top: 20upx;

							.msg {
								flex: 1;
								font-size: 26upx;
								color: #666;
							}

							.date-time {
								font-size: 26upx;
								color: #666;
							}
						}
					}
				}
			}

			.empty {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
</style>
