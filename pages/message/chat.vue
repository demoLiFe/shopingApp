<template>
	<view class="chat" v-debounce >
		<scroll-view  class="scroll-view" scroll-y="true" :scroll-top="scrollHeight" @click="showActionModel = false">
			<view class="chat-content" id="chat-content">
				<view v-for="(item,index) in msgList" :key="index">
					<view class="date-time">{{item.dateTime}}</view>
					<view v-for="(citem,cindex) in item.list" :key="citem.id">
						<view class="chat-item chat-left" v-if="citem.uid != userInfo.userName">
							<view class="avartar-left">
								<u-avatar  :src="citem.avatar" @click="jumpToUserDetail(citem)">
								</u-avatar>
							</view>
							<view class="msg-content">
								<text>{{citem.msg}}</text>
								<view class="jiantou-left"></view>
							</view>
						</view>
						<view class="chat-item chat-right" v-else>
							<view class="msg-content msg-content-right">
								<text>{{citem.msg}}</text>
								<view class="jiantou-right"></view>
							</view>
							<view class="avartar-right">
								<u-avatar  :src="citem.avatar" @click="jumpToUserDetail(citem)">
								</u-avatar>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部 -->
		<view class="bottom-box" :style="{bottom:`${keyboardHeight}px` }">
			<!-- 输入框 -->
			<view class="msg-input-box">
				<view class="left-box">
					<image src="/static//voice.png" mode=""></image>
				</view>
				<view class="center-box">
					<u--input class="input" placeholder="请输入内容" border="none" confirmType="send" :adjustPosition="false"
						v-model="msgContent" @focus="focus" @confirm="sendMsg"></u--input>
				</view>
				<view class="right-box">
					<image class="emoji" src="/static/emoji.png" mode=""></image>
					<image src="/static/add.png" mode="" @click="showActionModel = !showActionModel"></image>
				</view>
			</view>
			<!-- 功能模块弹出 -->
			<view class="action-model" v-if="showActionModel">
				<view class="action-item">
					<u--image src="/static/picture.png" width="40px" height="40px"></u--image>
					<text class="action-txt">照片</text>
				</view>
				<view class="action-item">
					<u--image src="/static/camera.png" width="40px" height="40px"></u--image>
					<text class="action-txt">拍摄</text>
				</view>
				<view class="action-item">
					<u--image src="/static/video.png" width="40px" height="40px"></u--image>
					<text class="action-txt">视频通话</text>
				</view>
				<view class="action-item">
					<u--image src="/static/location.png" width="40px" height="40px"></u--image>
					<text class="action-txt">位置</text>
				</view>
				<view class="action-item">
					<u--image src="/static/redbag.png" width="40px" height="40px"></u--image>
					<text class="action-txt">红包</text>
				</view>
				<view class="action-item">
					<u--image src="/static/transfer -accounts.png" width="40px" height="40px"></u--image>
					<text class="action-txt">转账</text>
				</view>
				<view class="action-item">
					<u--image src="/static/collection.png" width="40px" height="40px"></u--image>
					<text class="action-txt">收藏</text>
				</view>
			</view>
		</view>
		 <u-toast ref="uToast"></u-toast>  
	</view>
</template>

<script>
	import config from '../../config/config.js'
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				showActionModel: false, //显示功能模块
				keyboardHeight: 0, //键盘弹出高度
				scrollHeight:0,//页面滚动高度
				msgContent: '',
				websocketOpened: false, //sockt是否打开
				websockt: null, //websockt实例
				msgList: []
			}
		},
		directives:{
			drag:{
				bing:(e,binding)=>{
					console.log(1111);
				}
			}
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo
			})
		},
		onLoad(opt) {
			uni.onKeyboardHeightChange(res => {
				this.keyboardHeight = res.height;
			});
			this.connectWs();
		},
		destroyed() {
			this.closeSockt()
		},
		watch:{
			msgList(){
				this.$nextTick(()=>{
					const query = uni.createSelectorQuery().in(this);
					query.select('#chat-content').boundingClientRect().exec((el)=>{
						if(el.length > 0){
							this.scrollHeight  = el[0].height
						}
					});
				})
			}
		},
		methods: {
			//连接websockt
			connectWs() {
				uni.showLoading({
					title:'连接中..'
				});
				this.websockt = uni.connectSocket({
					url: config.wsBaseURL + '/api/message/list',
					success(data) {
						console.log("websocket连接成功");
					},
				});
				this.websockt.onOpen(() => {
					uni.hideLoading()
					this.websocketOpened = true;
					this.websockt.onMessage((msg) => {
						// console.log('收到服务端msg',msg);
						if (msg.data) {
							// console.log( JSON.parse(msg.data));
							this.msgList = JSON.parse(msg.data)
						}
					});
				});
				this.websockt.onClose(() => {
					this.websocketOpened = false
                    //断线重连
					// this.connectWs();
				});
				this.websockt.onError(() => {
                    this.websocketOpened = false
				})
			},
			closeSockt() {
				this.websockt.close({
					success:(res)=>{
						this.websocketOpened = false
						console.log("关闭成功------", res)
					},
					fail:(err)=>{
						console.log("关闭失败", err)
					}
				})
			},
			//发送消息
			sendMsg() {
				if(this.websocketOpened){
					this.websockt.send({
						data: JSON.stringify({msg:this.msgContent,user:this.userInfo.userName}),
						success:async ()=> {
							console.log('发送成功');
							this.msgContent = ''
						}
					})
				}else{
					this.$refs.uToast.show({
						message: 'websockt连接失败'
					});
				}
			},
			//跳转到用户详情页
			jumpToUserDetail(citem) {
				uni.previewImage({
					urls: [citem.avatar]
				})
			},
			//输入框聚焦
			focus() {
				this.showActionModel = false
			}
		}
	}
</script>
<style>
	page {
		background: #f5f5f5;
		height: 100%;
		width: 100%;
	}
</style>

<style lang="scss" scoped>
	

	.chat {
		height: 100%;
		width: 100%;
		padding-bottom: 120upx;

		.scroll-view {
			height: 100%;
			width: 100%;

			.chat-content {
                height: auto;  
				// background: #007AFF;
				.date-time {
					padding: 10upx 0;
					font-size: 26upx;
					text-align: center;
				}

				.chat-left {
					justify-content: flex-start;
				}

				.chat-right {
					justify-content: flex-end;
				}

				.chat-item {
					margin-bottom: 30upx;
					min-height: 100upx;
					display: flex;
					align-items: center;
					padding: 0 20upx;

					.avartar-left {
						margin-right: 30upx;
					}

					.avartar-right {
						margin-left: 30upx;
					}

					.msg-content {
						max-width: 500upx;
						background: #fff;
						min-height: 80upx;
						border-radius: 10upx;
						padding: 10upx 16upx;
						position: relative;
						word-break: break-all;

						.jiantou-left {
							margin: 0;
							position: absolute;
							left: -28upx;
							top: 50%;
							transform: translateY(-50%);
							border-right: 16upx solid #fff;
							border-bottom: 16upx solid transparent;
							border-left: 16upx solid transparent;
							border-top: 16upx solid transparent;
						}

						.jiantou-right {
							margin: 0;
							position: absolute;
							right: -28upx;
							top: 50%;
							transform: translateY(-50%);
							border-left: 16upx solid #fa436a;
							border-bottom: 16upx solid transparent;
							border-right: 16upx solid transparent;
							border-top: 16upx solid transparent;
						}
					}

					.msg-content-right {
						color: #fff;
						background: #fa436a;
					}
				}
			}
		}

		.bottom-box {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
            height: auto; 
			//输入框
			.msg-input-box {
				min-height: 120upx;
				background: #e5e5e5;
				display: flex;
				align-items: center;

				.left-box,
				.right-box {
					padding: 0 20upx;

					image {
						height: 50upx;
						width: 50upx;
					}

					.emoji {
						margin-right: 10upx;
					}
				}

				.center-box {
					flex: 1;

					.input {
						height: 80upx;
						line-height: 80upx;
						padding: 0 16upx !important;
						background: #fff;
					}
				}
			}

			//功能模块
			.action-model {
				background: #e8f0ef;
				display: flex;
				flex-wrap: wrap;

				.action-item {
					flex-shrink: 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					flex: 0 0 25%;
					padding: 26upx 0;

					.action-txt {
						padding-top: 10upx;
					}
				}
			}
		}
	}
</style>
