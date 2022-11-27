<template>
	<view class="goods-detail">
		<view class="goods-image-wraper">
			<swiper class="swiper" circular indicator-dots="true">
				<swiper-item class="swiper-item">
					<image
						src="https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"
						mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 商品信息 -->
		<view class="goods-info bg-fff">
			<view class="title">恒源祥2019春季长袖白色t恤 新款春装</view>
			<view class="price-box">
				<text class="price">￥888</text>
				<text class="price2">￥888</text>
				<view class="tip">7折</view>
			</view>
			<view class="sales-info">
				<view class="flex1">
					<text>销量：</text>
					<text>108</text>
				</view>
				<view class="flex1">
					<text>库存：</text>
					<text>108</text>
				</view>
				<view class="flex1">
					<text>浏览量：</text>
					<text>108</text>
				</view>
			</view>
		</view>
		<!-- 商品分享 -->
		<view class="goods-share-box" @click="shareShow  = true">
			 <view class="share-icon">
			 	 <text class="font-icon icon-xingxing"></text>
				 <text class="font-text">返</text>
			 </view>
			 <view class="share-tip">
			 	<text>该商品分享可领49减10红包</text>
			 </view>
			 <view class="share-button">
				 <text class="share-button-txt">立即分享</text>
				 <text class="font-icon icon-you"></text>
			 </view>
		</view>
		<!-- 列表 -->
		<view class="list bg-fff">
			<view class="list-item " @click="specShow = true">
			    <view class="title">
			    	<text>购买类型</text>
			    </view>
				<view class="content">
					<text>{{specSelectData.baseInfo.selectInfo}}</text>
				</view>
				<text class="font-icon icon-you"></text>
			</view>
			<view class="list-item ">
			    <view class="title">
			    	<text>优惠券</text>
			    </view>
				<view class="content">
					<text style="color: #fa436a;">领取优惠券</text>
				</view>
				<text class="font-icon icon-you"></text>
			</view>
			<view class="list-item ">
			    <view class="title">
			    	<text>促销活动</text>
			    </view>
				<view class="content">
					<view class="sales-promotion-list">
						<view class="sales-promotion-list-item">新人首单送20元无门槛代金券</view>
						<view class="sales-promotion-list-item">订单满50减10</view>
						<view class="sales-promotion-list-item">订单满100减30</view>
						<view class="sales-promotion-list-item">单笔购买满两件免邮费</view>
					</view>
				</view>
			</view>
			<view class="list-item ">
			    <view class="title">
			    	<text>服务</text>
			    </view>
				<view class="content">
					<text class="mg-r-32">7天无理由退换货 ·</text>
					<text>假一赔十 ·</text>
				</view>
			</view>
		</view>
		<!-- 评价 -->
		<view class="evaluation-section bg-fff">
			<view class="evaluation-header">
				<view class="left">
					<view class="title">
						<text >评价</text>
					</view>
					<text>(20)</text>
				</view>
				<view class="center">
					<text>好评率</text>
					<text>99%</text>
				</view>
		        <text class="font-icon icon-you"></text>
			</view>
			<view class="evaluation-list">
				<view class="evaluation-list-item">
					<image class="head-img" src="/static/missing-face.png" mode=""></image>
					<view class="right">
						<text class="name">YH</text>
						<view class="eva-content">
							<text>商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
						</view>
						<view class="eva-bottom">
							<text>购买类型:XL 红色</text>
							<text>2022-09-12 12:00:24</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 图文详情 -->
		<view class="pic-detail bg-fff">
			<view class="pic-detail-header">
				<view class="line"></view>
				<view class="title">图文详情</view>
				<view class="line"></view>
			</view>
			<view class="pic-content">
				<image src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg" ></image>
			</view>
		</view>
		
		<!-- 底部加入购物车 -->
		<view class="bottom-btn-box">
			<view class="left">
				<view class="btn" @click="jumpToIndexPage">
					<text class="font-icon icon-xiatubiao--copy"></text>
					<text>首页</text>
				</view>
				<view class="btn" @click="jumpToBuyingCart">
					<text class="font-icon icon-gouwuche"></text>
					<text>购物车</text>
				</view>
				<view class="btn" >
					<text class="font-icon icon-shoucang"></text>
					<text>收藏</text>
				</view>
			</view>
			<view class="right">
				<view class="btn "  type="primary" @click="jumpToBuyingCart"><text class="btn-txt">加购物车</text></view>
				<view class="btn" type="primary" @click="jumpToCreateOrder"><text class="btn-txt">立即购买</text></view>
			</view>
		</view>
		<!-- 分享弹出 -->
		<view class="share-popup-box" v-if="shareShow" @touchmove.stop.prevent="disabledScroll">
			<view class="mask" @click="shareShow = false" ></view>
			<view class="custom-popup" :class="shareShow ? 'custom-popup-show' : ''">
				<view class="custom-popup-header">
					<view class="line"></view>
					<text class="text">分享到</text>
					<view class="line"></view>
				</view>
				<scroll-view class="custom-popup-content" scroll-x="true" >
					<view class="share-list">
						<view class="share-list-item">
							<image src="/static/temp/share_wechat.png" mode=""></image>
							<text class="share-list-item-txt">微信好友</text>
						</view>
						<view class="share-list-item">
							<image src="/static/temp/share_moment.png" mode=""></image>
							<text class="share-list-item-txt">微信朋友圈</text>
						</view>
						<view class="share-list-item">
							<image src="/static/temp/share_qq.png" mode=""></image>
							<text class="share-list-item-txt">QQ好友</text>
						</view>
						<view class="share-list-item">
							<image src="/static/temp/share_qqzone.png" mode=""></image>
							<text class="share-list-item-txt">QQ空间</text>
						</view>
					</view>
				</scroll-view>
				<view class="custom-popup-bottom" @click="shareShow = false">
					<text>取消</text>
				</view>
			</view>
		</view>
		<!-- 规格选择 -->
		<view class="spec-select-popup-box" v-if="specShow" @touchmove.stop.prevent="disabledScroll">
			<view class="mask" @click="specShow = false"></view>
			<view class="custom-popup">
				<view class="custom-popup-top">
					<image
						:src="specSelectData.baseInfo.src"
						mode=""></image>
					<view class="right">
						<view class="price">
							<text>¥{{specSelectData.baseInfo.price}}</text>
						</view>
						<view >
							<text>库存: {{specSelectData.baseInfo.stock}}</text>
						</view>
						<view >
							<text>已选: {{specSelectData.baseInfo.selectInfo}}</text>
						</view>
					</view>	
				</view>
				<view class="spec-select" v-for="(item,index) in specSelectData.specSelectList" :key="index">
					<view class="title">
						<text>{{item.title}}</text>
					</view>
					<view class="spec-select-list">
						<view class="spec-select-list-item" :class="item.selectValue == citem.value ? 'active' : ''" v-for="(citem,cindex) in item.data" :key="citem.name" @click="changeSpec(citem)">
							 <text>{{citem.name}}</text>
						</view>
					</view>
				</view>
				<view class="btn" @click="selectSpec">
					<text>完成</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                shareShow:false,
				specShow:false,
				specSelectData:{
					baseInfo:{
						price:888,
						stock:'9999件',
						src:'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg',
						selectInfo:'XL 白色'
					},
					specSelectList:[
						{
							title:'尺寸',
							selectValue:3,
							data:[
								{
									name:'XL',
									value:1,
								},
								{
									name:'L',
									value:2,
								},
								{
									name:'M',
									value:3,
								},
								{
									name:'S',
									value:4,
								}
							]
						},
						{
							title:'颜色',
							selectValue:4,
							data:[
								{
									name:'红色',
									value:1,
								},
								{
									name:'绿色',
									value:2,
								},
								{
									name:'白色',
									value:3,
								},
								{
									name:'粉色',
									value:4,
								}
							]
						},
					]
				} 
			}
		},
		onLoad() {

		},
		methods: {
			//防止弹窗后遮罩层后内容能滚动
			disabledScroll(){
				return
			},
			//首页
            jumpToIndexPage(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			//购物车
			jumpToBuyingCart(){
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			},
			//创建订单
			jumpToCreateOrder(){
				uni.navigateTo({
					url:'/pages/cart/createOrder'
				})
			},
			//切换规格
			changeSpec(citem){
				
			},
			//商品规格选择
			selectSpec(){
				this.specShow = false;
				// this.specSelectData
				// this.specSelectData.baseInfo.selectInfo = this.specSelectData.specSelectList.find(function(){
					
				// })
			}
		}
	}
</script>

<style>
	page {
		background: #f5f5f5;
	}
</style>

<style lang="scss" scoped>


	.bg-fff {
		background: #FFFFFF;
	}
    .goods-detail{
		height: 100%;
		width: 100%;
		position: relative;
		padding-bottom: 142upx;
	}
	.goods-image-wraper {
		height: 796upx;

		.swiper {
			height: 100%;

			.swiper-item {
				height: 100%;
				width: 100%;

				image {
					height: 100%;
					width: 100%;
				}
			}
		}
	}
    //商品信息
	.goods-info {
		padding: 22upx 32upx;

		.title {
			height: 54upx;
			line-height: 54upx;
			color: #303133;
			font-size: 34upx;
		}

		.price-box {
			height: 70Upx;
			padding: 10upx 0;
			font-size: 28upx;
			color: #fa436a;
			display: flex;
			align-items: baseline;
			.price {
				font-size: 36upx;
			}
			.price2 {
				margin: 0 12upx;
				color: #909399;
				text-decoration: line-through
			}
			.tip {
				padding: 4upx 10upx;
				background: #fa436a;
				font-size: 26upx;
				color: #fff;
				border-radius: 6upx
			}
		}
		.sales-info{
			font-size: 26upx;
			display: flex;
			color: #909399;
			height: 54upx;
			align-items: center;
			.flex1{
				flex: 1;
			}
		}
	}
	//商品分享
	.goods-share-box{
		color: #606266;
		display: flex;
		align-items: center;
		padding: 12upx 32upx;
		background: #fdf5f6;
		.share-icon{
			display: flex;
			align-items: center;
			border: 1px solid #fa436a;
			width: 62upx;
			height: 32upx;
			line-height: 1;
			font-size: 24upx;
			color: #fa436a;
			.font-icon{
				margin-left: 2upx;
			}
			// .font-text{
			// 	margin:0 upx;
			// }
		}
		.share-tip{
			font-size: 30upx;
			margin-left: 10upx;
		}
		.share-button{
			font-size: 26upx;
			color: #fa436a;
			flex: 1;
			text-align: right;
			.share-button-txt{
				margin-right: 4upx;
			}
		}
	}
	//列表
	.list{
		.list-item{
			font-size: 28upx;
			border-bottom: 1px solid #E4E7ED;
			color: #606266;
			display: flex;
			align-items: center;
			padding: 22upx 32upx;
			.title{
				width: 154upx;
			}
			.content{
				flex: 1;
				.sales-promotion-list{
					line-height: 46upx;
					color: #303133
				}
				.mg-r-32{
					margin-right: 32upx;
				}
			}
		}
	}
	
	//评价
	.evaluation-section{
		padding: 22upx 32upx;
		margin-top: 16upx;
		.evaluation-header{
			display: flex;
			align-items: center;
			height: 66upx;
			font-size: 28upx;
		    color: #909399;
			.left{
				display: flex;
				align-items: center;
				.title{
					font-size: 32upx;
					color: #303133;
					margin-right: 4upx
				}
			}
			.center{
				text-align: right;
				flex: 1;
				padding-right: 10upx;
			}
		}
		.evaluation-list{
			.evaluation-list-item{
				padding: 22upx 0;
				display: flex;
				.head-img{
				   width: 44px;
				   height: 44px;
				   border-radius: 100px
				}
				.right{
				  flex: 1;
				  padding-left: 28upx;
				  font-size: 30upx;
				  color: #606266;
				  .eva-content{
					  font-size: 30upx;
					  color: #303133;
					  padding: 22upx 0;
				  }
				  .eva-bottom{
					  display: flex;
					  font-size: 26upx;
					  color: #909399;
					  align-items: center;
					  justify-content: space-between;
				  }
				}
			}
		}
	}
	
	//图文详情
	.pic-detail{
		margin-top: 16upx;
		.pic-detail-header{
			color: #303133;
			font-size:32upx;
			height: 88upx;
			line-height: 88upx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			.title{
				padding: 0 22upx;	
			}
			.line{
				width: 98upx;
				height: 0;
				border-bottom: 1px solid #ccc;
			}
		}
		.pic-content{
			height: 828upx;
			width: 100%;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
    //底部加入购物车按钮
	.bottom-btn-box{
		box-shadow:0 0 11px 0 rgb(0,0,0);
		height: 110upx;
		width: 690upx;
		background: rgba(255, 255, 255, 0.9);
		position: fixed;
		bottom: 32upx;
		left: 50%;
		padding: 0 20upx;
		transform: translate(-50%);
		border-radius: 16upx;
		display: flex;
		align-items: center;
		.left{
			display: flex;
			flex: 1;
			.btn{
			   justify-content: center;
			   display: flex;
			   flex-direction: column;
			   align-items: center;
			   height: 104upx;
			   width: 88upx;
			   font-size: 26upx;
			   color: #606266;
			   .icon-xiatubiao--copy,.icon-gouwuche{
				   font-size: 40upx;
			   }
			   .icon-shoucang{
				   font-size: 46upx;
			   }
			}
		}
		.right{
			height: 82upx;
			border-radius: 200upx;
			display: flex;
			align-items: center;
			background: linear-gradient(to right, #ffac30, #fa436a, #F56C6C);
			margin-left: 22upx;
			position: relative;
			.btn{
				// height: 100%;
				background: transparent;
				border-radius: inherit;
				font-size: 30upx;
				width: 180upx;
				text-align: center;
				border: none;
				.btn-txt{
					color: #fff;
				}
			}
			&::after{
				content: '';
				width: 1px;
				height: 30upx;
				background: #ccc;
				position: absolute;
				left: 50%;
				transform: translate(-50%);
			}
		}
	}
	
	//分享弹出层
	.share-popup-box{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 998;
		height: 100%;
		width: 100%;
		.mask{
			position: fixed;
			top: 0;
			height: 100%;
			width: 100%;
			z-index: 1;
			background: rgba(0,0,0,.5);		
		}
		.custom-popup{
			// transition: all .3s; 
			z-index: 2; 
			position: fixed;
			bottom: 0;
			left: 0;
			background: #fff;
			height: 640upx;
			width: 100%;
			transform: translateY(640upx);
			.custom-popup-header{
				height: 110upx;
				padding-top: 10upx;
				font-size: 32upx;
				display: flex;
				align-items: center;
				justify-content: center;
				.text{
					padding: 0 30upx;
				}
				.line{
					width: 230upx;
					height: 1px;
					background: #E4E7ED;
				}
			}
			.custom-popup-content{
				height: 440upx;
				.share-list{
					display: flex;
					flex-wrap: wrap;
					.share-list-item{
						width: 33.33%;
						height: 198upx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						image{
							height: 80upx;
							width: 80upx;
							margin-bottom: 16upx;
						}
						.share-list-item-txt{
							font-size: 28upx;
						    color: #606266;
						}
					}
				}
			}
			.custom-popup-bottom{
				border-top: 1px solid #E4E7ED;
				height: 90upx;
				display: flex;
				font-size: 30upx;
				align-items: center;
				justify-content: center;
				color: #303133;
			}
		}
		.custom-popup-show{
			// transform: translateY(0upx);
			animation: showPopup .3s linear forwards;
		}
		@keyframes showPopup{
			0% {
				transform: translateY(640upx);
			}
			50% {
				transform: translateY(320upx);
			}
			100% {
				transform: translateY(0);
			}
		}
		
	}
	
	//规格选择
	.spec-select-popup-box{
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0;
		width: 0;
		z-index: 998;
		.mask{
			height: 100%;
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1;
			background: rgba(0,0,0,.5);
		}
		.custom-popup{
			padding: 10upx 32upx;
			position: fixed;
			z-index: 2;
			bottom: 0;
			left: 0;
			width: 100%;
			// min-height: 45vh;
			background: #fff;
			border-radius: 10upx 10upx 0 0;
			// transform: translateY(calc(45vh + 0upx));
			.custom-popup-top{
				display: flex;
                image{
					height:186upx;
					width: 186upx;
					border-radius: 8upx;
					margin-top: -46upx;
				}
				.right{
					font-size: 28upx;
				    color: #606266;
					padding-left: 26upx;
					line-height: 46upx;
					.price{
						font-size: 34upx;
						color: #fa436a;
						margin-bottom: 10upx
					}
					
				}
			}
			.spec-select{
				font-size: 32upx;
				color: #606266;
				padding-top: 32upx;
				padding-left: 10upx;
				// display: flex;
				.spec-select-list{
					display: flex;
					padding-top: 22upx;
					.spec-select-list-item{
					   background: #eee;
					   border-radius: 110upx;
					   height:66upx;
					   line-height: 66upx;
					   text-align: center;
					   font-size: 26upx;
					   color: #303133;
					   min-width: 66upx;
					   margin-right: 22upx;
					   margin-bottom: 22upx;	  
					}
					.active{
						background: #fbebee;
						color: #fa436a;
					}
				}
			}
			.btn{
				color: #fff;
				text-align: center;
				border-radius: 110upx;
				background: #fa436a;
				font-size: 32upx;
				height: 72upx;
				line-height: 72upx;
				margin:32upx  0;
			}
			// @keyframes showPopup{
			// 	0% {
			// 		transform: translateY();
			// 	}
			// 	50% {
					
			// 	}
			// 	100% {
					
			// 	}
			// } 
		}
	}
</style>
