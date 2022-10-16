<template>
	<view class="chat" >
		<scroll-view class="scroll-view" scroll-y="true" scroll-top="120" @click="showActionModel = false">
			<view class="chat-content">
				<block v-for="(item,index) in msgList" :key="index">
					<view class="date-time">{{item.dateTime}}</view>
					<block v-for="(citem,cindex) in item.list" :key="citem.msg">
						<view class="chat-item chat-left" v-if="citem.uid != 888888"  >
							<u-avatar class="avartar-left" :src="citem.avatar" @click="jumpToUserDetail(citem)"></u-avatar>
							<view class="msg-content">
								<text>{{citem.msg}}</text>
								<view class="jiantou-left"></view>
							</view>
						</view>
						<view class="chat-item chat-right" v-if="citem.uid == 888888">
							<view class="msg-content msg-content-right">
								<text>{{citem.msg}}</text>
								<view class="jiantou-right"></view>
							</view>
							<u-avatar class="avartar-right" :src="citem.avatar" @click="jumpToUserDetail(citem)"></u-avatar>
						</view>
					</block>
				</block>
			</view>
		</scroll-view>
		<!-- 底部 -->
		<view class="bottom-box" :style="{bottom:`${keyboardHeight}px` }">
			<!-- 输入框 -->
			<view class="msg-input-box">
				<view class="left-box">
					<u-icon name="map" size="30"></u-icon>
				</view>
				<view class="center-box">
					<u--input
					    class="input"
					    placeholder="请输入内容"
					    border="none"
						confirmType="send"
						:adjustPosition="false"
					    v-model="msgContent"
						@focus="focus"
					  ></u--input>
				</view>
				<view class="right-box" >
					<u-icon name="plus-circle" size="30" @click="showActionModel = !showActionModel"></u-icon>
				</view>
			</view>
			<!-- 功能模块弹出 -->
			<view class="action-model" v-show="showActionModel">
				<view class="action-item">
					<u--image  src="https://img2.baidu.com/it/u=4262165586,826758146&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" width="40px" height="40px" ></u--image>
					<text class="action-txt">照片</text>
				</view>
				<view class="action-item">
					<u--image  src="https://img1.baidu.com/it/u=4231743903,3429022810&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" width="40px" height="40px" ></u--image>
					<text class="action-txt">拍摄</text>
				</view>
				<view class="action-item">
					<u--image  src="/static/temp/c1.png" width="40px" height="40px" ></u--image>
					<text class="action-txt">视频通话</text>
				</view>
				<view class="action-item">
					<u--image  src="/static/temp/c1.png" width="40px" height="40px" ></u--image>
					<text class="action-txt">位置</text>
				</view>
				<view class="action-item">
					<u--image  src="/static/temp/c1.png" width="40px" height="40px" ></u--image>
					<text class="action-txt">红包</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				showActionModel:false,//显示功能模块
				keyboardHeight:0,//键盘弹出高度
				msgContent:'',
				msgList:[
					{
						dateTime:'2022-10-15 22:00',
						list:[
							{
								uid:'888888',
								avatar:'https://img1.baidu.com/it/u=3353873514,1997887075&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
								nickName:'',
								msg:'今天天气真好',
								pic:'',
								voice:''
							},
							{
								uid:'000000',
								avatar:'https://img0.baidu.com/it/u=3375911127,635571288&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1665939600&t=7029e8b7be0870a89869b76310752358',
								nickName:'',
								msg:'是啊 真不错',
								pic:'',
								voice:''
							},
							{
								uid:'000000',
								avatar:'https://img0.baidu.com/it/u=3375911127,635571288&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1665939600&t=7029e8b7be0870a89869b76310752358',
								nickName:'',
								msg:'帅哥在干嘛呢',
								pic:'',
								voice:''
							},
							{
								uid:'888888',
								avatar:'https://img1.baidu.com/it/u=3353873514,1997887075&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
								nickName:'',
								msg:'你猜啊',
								pic:'',
								voice:''
							},
							{
								uid:'000000',
								avatar:'https://img0.baidu.com/it/u=3375911127,635571288&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1665939600&t=7029e8b7be0870a89869b76310752358',
								nickName:'',
								msg:'直男 喝岩浆去吧 抽鞭炮 抽鞭炮 抽鞭炮 抽鞭炮',
								pic:'',
								voice:''
							},
							{
								uid:'888888',
								avatar:'https://img1.baidu.com/it/u=3353873514,1997887075&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
								nickName:'',
								msg:'我抽你大爷 你个二怂',
								pic:'',
								voice:''
							},
							{
								uid:'000000',
								avatar:'https://img0.baidu.com/it/u=3375911127,635571288&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1665939600&t=7029e8b7be0870a89869b76310752358',
								nickName:'',
								msg:'拉黑 再见 狗东西！',
								pic:'',
								voice:''
							},
							{
								uid:'888888',
								avatar:'https://img1.baidu.com/it/u=3353873514,1997887075&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
								nickName:'',
								msg:'滚蛋',
								pic:'',
								voice:''
							},
							{
								uid:'888888',
								avatar:'https://img1.baidu.com/it/u=3353873514,1997887075&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
								nickName:'',
								msg:'什么玩意儿 我是你鸡哥',
								pic:'',
								voice:''
							},
						]
					}
				]
			}
		},
		onLoad() {
			uni.onKeyboardHeightChange(res => {
				this.keyboardHeight = res.height;
			});
		},
		methods:{
			//跳转到用户详情页
			jumpToUserDetail(citem){
				uni.previewImage({
					urls:[citem.avatar]
				})
			},
			//输入框聚焦
			focus(){
				this.showActionModel = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #f5f5f5;
		height: 100%;
		width: 100%;
	}
	.chat{
		height: 100%;
		width: 100%;
		padding-bottom: 120upx;
		.scroll-view{
			height: 100%;
			width: 100%;
			.chat-content{
				// background: #007AFF;
				.date-time{
					padding: 10upx 0;
					font-size: 26upx;
					text-align: center;
				}
				.chat-left{
					justify-content: flex-start;
				}
				.chat-right{
					justify-content: flex-end;
				}
				.chat-item{
					margin-bottom: 30upx;
					min-height: 100upx;
					display: flex;
					align-items: center;
					padding: 0 20upx;
					.avartar-left{
						margin-right: 30upx;
					}
					.avartar-right{
						margin-left: 30upx;
					}
				
					.msg-content{
						max-width: 500upx;
						background: #fff;
						min-height: 80upx;
						border-radius: 10upx;
						padding:10upx 16upx;
						position: relative;
						word-break: break-all;
						.jiantou-left{
							margin: 0;
							position: absolute;
						    left: -32upx;
							top: 50%;
							transform: translateY(-50%);
							border-right:  16upx solid #fff;
							border-bottom: 16upx solid transparent;
							border-left: 16upx solid transparent;
							border-top: 16upx solid transparent;
						}
						.jiantou-right{
							margin: 0;
							position: absolute;
						    right: -32upx;
							top: 50%;
							transform: translateY(-50%);
							border-left:  16upx solid #fa436a;
							border-bottom: 16upx solid transparent;
							border-right: 16upx solid transparent;
							border-top: 16upx solid transparent;
						}
					}
					.msg-content-right{
						color: #fff;
						background: #fa436a;
					}
				}
			}
		}
		.bottom-box{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			//输入框
			.msg-input-box{
				min-height: 120upx;
				background: #e5e5e5;
				display: flex;
				align-items: center;
				.left-box,.right-box{
					padding: 0 20upx;
				}
				.center-box{
					flex: 1;
					.input{
						height: 80upx;
						line-height: 80upx;
						padding: 0 16upx !important;
						background: #fff;
					}
				}
			}
			//功能模块
			.action-model{
				background: #e8f0ef;
				display: flex;
				flex-wrap: wrap;
				.action-item{
					flex-shrink: 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					flex:  0 0 25%;
					padding: 26upx 0;
					.action-txt{
					     padding-top: 10upx;
					}
				}
			}
		}
	}

</style>
