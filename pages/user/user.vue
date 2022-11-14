<template>
	<view class="user">
		<view class="bg-img">
			<!-- 用户信息 -->
			<view class="user-info-box">
				<image :src="hasLogin ? userInfo.avatar : '/static/missing-face.png'" mode=""></image>
				<text class="name" @click="jumpToLogin">{{hasLogin ? userInfo.userName : '未登录'}}</text>
			</view>
			<!-- 会员卡 -->
			<view class="vip-card-box">
				<text class="level">{{(!hasLogin || userInfo.vipLevel === 0) ? '你还未开通会员' : `会员${userInfo.vipLevel}级` }}</text>
				<!-- <text class="btn"></text> -->
			</view>
		</view>
		<!-- 底部覆盖 -->
		<view class="cover-box" :style="{transform:`translateY(${coverMove}rpx)`}" @touchstart="coverTouchStart" @touchmove="coverTouchMove" @touchend="coverTouchEnd">
			<view class="arc-bg"></view>
			<!-- 钱包 -->
			<view class="moneybag-section bg-f" >
				<view class="item">
					<text class="num">{{ hasLogin ? userInfo.moneyBag.money : 0}}</text>
					<text>余额</text>
				</view>
				<view class="item">
					<text class="num">{{ hasLogin ? userInfo.moneyBag.coupon : 0 }}</text>
					<text>优惠券</text>
				</view>
				<view class="item">
					<text class="num">{{ hasLogin ? userInfo.moneyBag.integral : 0}}</text>
					<text>积分</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section bg-f">
				<view class="order-item" @click="jumpToOrderList(0)"  hover-class="order-hover"  hover-stay-time="60">
					<text class="font-icon icon-shouye"></text>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="jumpToOrderList(1)" hover-class="order-hover"  hover-stay-time="60">
					<text class="font-icon icon-daifukuan"></text>
					<text>待付款</text>
				</view>
				<view class="order-item" @click="jumpToOrderList(2)" hover-class="order-hover" hover-stay-time="60">
					<text class="font-icon icon-yishouhuo"></text>
					<text>待收货</text>
				</view>
				<view class="order-item" @click="jumpToOrderList(4)" hover-class="order-hover" hover-stay-time="60">
					<text class="font-icon icon-shouhoutuikuan"></text>
					<text>退款/售后</text>
				</view>
			</view>
			
			<!-- 浏览历史 -->
			<view class="history-section bg-f" v-if="hasLogin">
				<view class="header">
					<text class="font-icon icon-lishijilu"></text>
					<text class="title">历史记录</text>
				</view>
				<scroll-view class="scroll-wraper" scroll-x="true"  >
					<view class="history-list">
						<image v-for="(item,index) in historyList" :key="item.id"  @click="jumpToGoodsDetail(item)" :src="item.img"></image>
					</view>
				</scroll-view>
			</view>
			<!-- 功能列表 -->
			<view class="action-list bg-f">
				<view class="list-cell" hover-class="cell-hover" hover-stay-time="60" @click="jumpToMoneyBag">
					<text class="font-icon icon-iconfontweixin" style="color: #e07472;font-size: 38upx;"></text>
					<view class="right">
						<text class="cell-title">我的钱包</text>
						<text class="cell-des" v-if="hasLogin && userInfo.vipLevel !== 0">你的会员还有{{userInfo.vipTimeLimit}}天到期</text>
						<text class="font-icon icon-you"></text>
					</view>
				</view>
				<view class="list-cell" hover-class="cell-hover" hover-stay-time="60" @click="jumpToAddress">
					<text class="font-icon icon-dizhi" style="color: #5fcda2;font-size: 38upx;"></text>
					<view class="right">
						<text class="cell-title">地址管理</text>
						<text class="font-icon icon-you"></text>
					</view>
				</view>
				<view class="list-cell" hover-class="cell-hover" hover-stay-time="60" @click="handleShare" >
					<text class="font-icon icon-share" style="color: #9789f7;font-size: 38upx;"></text>
					<view class="right">
						<text class="cell-title">分享</text>
						<text class="cell-des">邀请好友</text>
						<text class="font-icon icon-you"></text>
					</view>
				</view>
				<view class="list-cell" hover-class="cell-hover" hover-stay-time="60" @click="jumpToAppraise">
					<text class="font-icon icon-pinglun-copy" style="color: #ee883b;font-size: 38upx;"></text>
					<view class="right">
						<text class="cell-title">我的评价</text>
						<text class="font-icon icon-you"></text>
					</view>
				</view>
				<view class="list-cell" hover-class="cell-hover" hover-stay-time="60" @click="jumpToCollection">
					<text class="font-icon icon-shoucang_xuanzhongzhuangtai" style="color: #54b4ef;font-size: 38upx;"></text>
					<view class="right">
						<text class="cell-title">我的收藏</text>
						<text class="font-icon icon-you"></text>
					</view>
				</view>
				<view class="list-cell" hover-class="cell-hover" hover-stay-time="60" @click="jumpToSetting">
					<text class="font-icon icon-shezhi1" style="color: #e07472;font-size: 38upx;"></text>
					<view class="right">
						<text class="cell-title">设置</text>
						<text class="font-icon icon-you"></text>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>  
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data(){
			return {
				historyList:[],
				startY:0,//记录手势y方向初始位置
				coverMove:0,
			}
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
			}),
			hasLogin(){
				return !!this.userInfo && Object.keys(this.userInfo).length > 0 
			},
		},
		onNavigationBarButtonTap(e){
			if(e.index === 0){//设置
				uni.navigateTo({
					url:'/pages/user/setting'
				})
			}else if(e.index === 1){//消息
				uni.navigateTo({
					url:'/pages/message/message'
				});
			};
		},
		onShow() {
			if(this.hasLogin){
				this.loadHistoryRecordList();
			}
		},
		methods:{
			//获取历史记录
			loadHistoryRecordList(){
				this.$api.user.GetHistoryRecordList({}).then(res=>{
					if(res.status === 200){
						this.historyList = res.data
					};
				}).catch(err=>{
					this.$refs.uToast.show({
						message: err
					});
				})
			},
			//去登陆
			jumpToLogin(){
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pages/login/login'
					})
				};
			},
			coverTouchStart(e){
				this.startY = e.touches[0].pageY; 
				return;
			},
			coverTouchMove(e){
				if(e.touches[0].pageY - this.startY <= 160 &&  this.startY < e.touches[0].pageY){
					this.coverMove = e.touches[0].pageY - this.startY;
					return;
				};
			},
			coverTouchEnd(e){
				//回弹
				this.coverMove = 0
				return;
			},
			//跳转商品详情页
			jumpToGoodsDetail(item) {
				uni.navigateTo({
					url: '/pages/index/goodsDetail'
				})
			},
			//跳转到订单
			jumpToOrderList(type){
				if(this.hasLogin){
					uni.navigateTo({
						url:`/pages/user/order?type=${type}`
					})
				}else{
					this.whetherJumpToLogin()
				};
			},
			//我的钱包
			jumpToMoneyBag(){
				if(this.hasLogin){
					uni.navigateTo({
						url:'/pages/user/moneyBag',
					})
				}else{
					this.whetherJumpToLogin()
				};
			},
			//跳转到地址管理
			jumpToAddress(){
				if(this.hasLogin){
					uni.navigateTo({
						url:'/pages/user/address'
					})
				}else{
					this.whetherJumpToLogin();
				};
			},
			//跳转到设置
			jumpToSetting(){
				uni.navigateTo({
					url:'/pages/user/setting'
				})
			},
			//跳转到收藏
			jumpToCollection(){
				uni.navigateTo({
					url:'/pages/user/collection'
				})
			},
			//跳转到我的评价
			jumpToAppraise(){
				uni.navigateTo({
					url:'/pages/user/appraise'
				})
			},
			//分享
			handleShare(){
				uni.navigateTo({
					url:'/pages/message/chat'
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.bg-img{
		height: 520upx;
		background-image: linear-gradient(0deg, #f34167,#be1d86 50%,#fe436c );
		background-size: 100% 100%;
		padding: 100upx 30upx 0;
		z-index: 88;
		.user-info-box{
			display: flex;
			align-items: center;
			height: 180upx;
			image{
				border: 2upx solid #fff;
				border-radius: 50%;
				height: 130upx;
				width: 130upx;
			}
			.name{
				font-size: 38upx;
				color: #fff;
				margin-left: 20upx;
			}
		}
		.vip-card-box{
			position: relative;
			z-index: 88;
			height: 240upx;
			padding: 20upx 24upx;
			border-radius: 16uxp 16upx 0 0;
			background: url(../../static/vip-card-bg.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			.level{
				position: absolute;
				left: 20upx;
				top: 20upx;
				color: #ffff00;
			}
			.btn{
				position: absolute;
				right: 20upx;
				top: 20upx;
				// color: #abb62d;
			}
		}
	}
	
	//底部覆盖
	.cover-box{
		// transform: translateY(160upx);
		z-index: 99;
		position: relative;
		margin-top: -140upx;
		background: #f5f5f5;
		background-repeat: no-repeat;
		padding:0 30upx;
		transition: transform 0.3s cubic-bezier(0.21, 1.93, 0.53, 0.64) 0s;
		.arc-bg{
			width: 100%;
			position: absolute;
			left: 0;
			top:-36upx;
			height: 36upx;
			background: url(../../static/arc.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
		.moneybag-section{
			border-radius: 10upx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.item{
				height: 140upx;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				font-size: 24upx;
				color: #75787d;
				.num{
					margin-bottom: 8upx;
					font-size: 32upx;
					color: #303133;
				}
			}
		}
		.order-section{
			display: flex;
			justify-content: space-between;
			margin-top: 20upx;
			border-radius: 10upx;
			padding: 28upx;
			.order-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 120upx;
				width: 120upx;
				border-radius: 10upx;
				color: #303133;
				font-size: 24upx;
				.font-icon{
					margin-bottom: 18upx;
					font-size: 48upx;
					color: #fa436a;
				}
			}
			.order-hover{
				background: #F5F5F5;
			}
		}
		.bg-f{
			background: #fff;
		}
		//浏览历史
		.history-section{
			margin-top: 20upx;
			padding: 30upx;
			padding-bottom: 0;
			.header{
				font-size: 28upx;
				color: #303133;
				display: flex;
				align-items: center;
				.font-icon{
					color: #5eba8f;
					font-size: 46upx;
				}
				.title{
					margin-left: 16upx;
				}
			}
			.scroll-wraper{
				padding-top: 30upx;
				.history-list{
					display: flex;
					flex-wrap: nowrap;
					image{
						flex-shrink: 0;
						width: 160upx;
						height: 160upx;
						border-radius: 10upx;
						margin-right: 10upx;
					}
				}
			}
		}
		//功能列表
		.action-list{
			.list-cell{
				display: flex;
				align-items: center;
				padding-left: 30upx;
				.font-icon{
					width: 56upx;
					display: flex;
					align-items: center;
				}
				.right{
					padding:20upx 0;
					flex: 1;
					// width: 100%;
					padding-right: 30upx;
					line-height: 60upx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #E4E7ED;
					.cell-title{
						flex: 1;
						margin-right: 10upx;
						color: #303133;
						font-size: 28upx;
					}
					.cell-des{
						color: #909399;
						font-size: 26upx;
					}
					.icon-you{
						margin-right: 30upx;
						width: 0;
						margin-left: 20upx;
						color: #606266;
						font-size: 30upx;
					}
				}
				
			}
			.cell-hover{
				background: #F5F5F5;
			}
		}
	}
</style>
