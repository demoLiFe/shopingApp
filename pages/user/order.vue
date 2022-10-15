<template>
	<view class="order">
		<view class="nav-section bg-f">
			<view class="nav-item" v-for="(item,index) in navList" :key="index"
				:class="currentIndex === index ? 'nav-active' : ''" @click="navChange(index)">
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="container">
			<swiper class="swiper" circular @change="swiperChange" :current="currentIndex">
				<swiper-item class="swiper-item" v-for="v in navList" :key="v.title">
					<scroll-view class="scroll-view" style="height: 100%;width: 100%;" scroll-y="true">
						<view class="order-list" v-if="orderList.length > 0">
							<view class="order-item bg-f" v-for="(item,index) in orderList" :key="index">
								<view class="header">
									<text class="date-time">{{item.dateTime}}</text>
									<text
										:class="item.state === 1 ? 'fc-base' : 'fc-90'">{{item.state | filterState}}</text>
									<view class="delete" v-if="item.state === 5">
										<text style="padding: 0 20upx;">|</text>
										<text class="font-icon icon-iconfontshanchu1"></text>
									</view>
								</view>
								<scroll-view scroll-x="true">
									<view class="content">
										<view class="img-wraper">
											<image :src="item.img" mode=""></image>
										</view>
										<view class="right">
											<view class="title">
												<text>{{item.goodsTitle}}</text>
											</view>
											<view class="attr-box">
												<text>{{item.goodsAttr}}</text>
											</view>
											<view class="price">
												<text class="price-tit">￥</text>
												<text>{{item.goodsPrice}}</text>
											</view>
										</view>
									</view>
								</scroll-view>
								<view class="price-box">
									<text>共</text>
									<text class="num">{{item.goodsNum}}</text>
									<text>件商品 实付款</text>
									<text class="price-tit">￥</text>
									<text class="price">{{item.relPrice}}</text>
								</view>
								<!-- 待付款 -->
								<view class="btn-box" v-if="item.state === 1">
									<view class="btn bg-f" hover-class="btn-hover" hover-stay-time="20">取消订单</view>
									<view class="btn btn1 bg-f fc-base" hover-class="btn-hover" hover-stay-time="20">立即支付
									</view>
								</view>
								<!-- 待收货 -->
								<view class="btn-box" v-if="item.state === 2">
									<view class="btn bg-f" hover-class="btn-hover" hover-stay-time="20">延长收货</view>
									<view class="btn bg-f" hover-class="btn-hover" hover-stay-time="20">查看物流</view>
									<view class="btn btn1 bg-f fc-base" hover-class="btn-hover" hover-stay-time="20">确认收货
									</view>
								</view>
								<!-- 待评价 -->
								<view class="btn-box" v-if="item.state === 3">
									<view class="btn bg-f" hover-class="btn-hover" hover-stay-time="20">加入购物车</view>
									<view class="btn bg-f" hover-class="btn-hover" hover-stay-time="20">查看物流</view>
									<view class="btn btn1 bg-f fc-base" hover-class="btn-hover" hover-stay-time="20">评价
									</view>
								</view>
							</view>
						</view>
						<view class="no-data" v-if="orderList.length === 0">
							 <view class="no-data-content">
							 	<text>暂无数据</text>
							 </view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				navList: [{
						title: '全部'
					},
					{
						title: '待付款'
					},
					{
						title: '待收货'
					},
					{
						title: '待评价'
					},
					{
						title: '售后'
					}
				],
				orderList: [{
						dateTime: '2022-10-11 12:00:00',
						state: 1,
						goodsNum: 8,
						relPrice: '188.8',
						goodsTitle: '回力女鞋高帮帆布鞋女学生韩版鞋子女2019潮鞋女鞋新款春季板鞋女',
						goodsAttr: '白色-高帮 39  x 1',
						goodsPrice: '199.8',
						img: 'https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg',
					},
					{
						dateTime: '2022-10-11 12:00:00',
						state: 4,
						goodsNum: 8,
						relPrice: '188.8',
						goodsTitle: '回力女鞋高帮帆布鞋女学生韩版鞋子女2019潮鞋女鞋新款春季板鞋女',
						goodsAttr: '白色-高帮 39  x 1',
						goodsPrice: '199.8',
                        img: 'https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg', 
					},
					{
						dateTime: '2022-10-11 11:00:00',
						state: 2,
						goodsNum: 8,
						relPrice: '188.8',
						goodsTitle: '回力女鞋高帮帆布鞋女学生韩版鞋子女2019潮鞋女鞋新款春季板鞋女',
						goodsAttr: '白色-高帮 39  x 1',
						goodsPrice: '199.8',
						img: 'https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg',
					},
					{
						dateTime: '2022-10-11 11:00:00',
						state: 5,
						goodsNum: 8,
						relPrice: '188.8',
						goodsTitle: '回力女鞋高帮帆布鞋女学生韩版鞋子女2019潮鞋女鞋新款春季板鞋女',
						goodsAttr: '白色-高帮 39  x 1',
						goodsPrice: '199.8',
						img: 'https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg',
					}
				]
			}
		},
		filters: {
			filterState(val) {
				switch (val) {
					case 1:
						return '待付款'
						break;
					case 2:
						return '待收货'
						break;
					case 3:
						return '待评价'
						break;
					case 4:
						return '交易完成'
						break;	
					case 5:
						return '订单已关闭'
						break;
					default:
						return ''
						break;
				}
			}
		},
		onLoad(opt) {
			// this.orderList = []
			console.log(opt);
			this.currentIndex = Number(opt.type)
			
		},
		methods: {
			navChange(index) {
				this.currentIndex = index;
			},
			swiperChange(e) {
				this.currentIndex = e.detail.current;
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f5f5f5;
		height: 100%;
		width: 100%;
	}

	.bg-f {
		background: #fff;
	}

	.fc-base {
		color: #fa436a;
	}

	.fc-90 {
		color: #909399;
	}

	.order {
		height: 100%;
		width: 100%;

		.nav-section {
			height: 80upx;
			padding: 0 10upx;
			display: flex;
			align-items: center;

			.nav-item {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				color: #303133;
				font-size: 30upx;
				position: relative;
			}

			.nav-active {
				&::after {
					content: '';
					border-bottom: 4upx solid #fa436a;
					position: absolute;
					width: 88upx;
					height: 0;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}

		.container {
			width: 100%;
			height: calc(100% - 80upx);
			.swiper {
				height: 100%;
				width: 100%;
				.swiper-item {
					height: 100%;
					width: 100%;
                    .order-list {
						.order-item {
							margin-top: 16upx;
							padding-left: 30upx;
							.header {
								padding-right: 30upx;
								font-size: 28upx;
								align-items: center;
								border-bottom: 1px solid #E4E7ED;
								color: #303133;
								display: flex;
								height: 80upx;
								.date-time {
									flex: 1;
								}
								.delete {
									color: #909399;
									display: flex;
									align-items: center;
									font-size: 28upx;
									padding: 10upx 0;
						
									.font-icon {
										font-size: 32upx;
									}
								}
							}
							.content {
								padding: 20upx 0;
								min-height: 160upx;
								display: flex;
								.img-wraper {
									background: #ccc;
									border-radius: 8upx;
									height: 120upx;
									width: 120upx;
									margin-right: 24upx;
									image {
										border-radius: inherit;
										height: 100%;
										width: 100%;
									}
								}
								.right {
									flex: 1;
									overflow: hidden;
									.title {
										text-overflow: ellipsis;
										overflow: hidden;
										white-space: nowrap;
										color: #303133;
										font-size: 30upx;
									}
									.attr-box {
										color: #909399;
										font-size: 26upx;
										padding: 10upx 12upx;
									}
									.price {
										color: #303133;
										font-size: 30upx;
										.price-tit {
											font-size: 24upx;
											margin: 0 2upx 0 8upx;
										}
									}
								}
							}
							.price-box {
								padding: 20upx 30upx;
								color: #909399;
								font-size: 26upx;
								display: flex;
								align-items: center;
								justify-content: flex-end;
								.num {
									padding: 0 8upx;
								}
								.price-tit {
									display: inline-block;
									color: #303133;
									padding: 8upx 0;
								}
								.price {
									color: #303133;
									font-size: 32upx;
								}
							}
							.btn-box {
								border-top: 1px solid #E4E7ED;
								height: 100upx;
								padding: 0 30upx;
								display: flex;
								align-items: center;
								justify-content: flex-end;
								.btn {
									border: 1px solid #E4E7ED;
									min-width: 160upx;
									height: 60upx;
									line-height: 60upx;
									margin-left: 24upx;
									text-align: center;
									font-size: 26upx;
									color: #303133;
									border-radius: 200upx;
								}
								.btn1 {
									color: #fa436a;
								}
								.btn-hover {
									color: #7c7f84;
								}
							}
						}
					}
					.no-data{
						height: 100%;
						width: 100%;
						position: relative;
						.no-data-content{
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%,-50%);
							color: #7c7f84;
							font-size: 28upx;
						}
					}
				}
			}
		}
	}
</style>
