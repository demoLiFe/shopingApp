<template>
	<view class="order">
		<view class="nav-section bg-f">
			<view class="nav-item" v-for="(item,index) in navList" :key="index"
				:class="currentState === item.state ? 'nav-active' : ''" @click="navChange(index)">
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="container">
			<swiper class="swiper" circular @change="swiperChange" :current="currentState">
				<swiper-item class="swiper-item" v-for="v in navList" :key="v.title">
					<scroll-view class="order-list" v-if="orderList.length > 0" style="height: 100%;width: 100%;"
						scroll-y="true" @scrolltolower="lower">
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
											<text>{{item.goodsName}}</text>
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
								<view class="btn bg-f" hover-class="btn-hover" hover-stay-time="20" @click="cancelOrder(item)">取消订单</view>
								<view class="btn btn1 bg-f fc-base" hover-class="btn-hover" hover-stay-time="20" @click="jumpToPay">立即支付</view>
							</view>
							<!-- 待收货 -->
							<view class="btn-box" v-if="item.state === 2">
								<view class="btn bg-f" hover-class="btn-hover" hover-stay-time="20">延长收货</view>
								<view class="btn bg-f" hover-class="btn-hover" hover-stay-time="20">查看物流</view>
								<view class="btn btn1 bg-f fc-base" hover-class="btn-hover" hover-stay-time="20">
									确认收货
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
						<u-loadmore style="padding: 20rpx 0;"  :status="loadStatus"  :loadmoreText="loadText.loadmoreText" :loading-text="loadText.loadingText" :nomore-text="loadText.nomoreText"  dashed line />
					</scroll-view>
					<view class="no-data" v-if="orderList.length === 0">
						<view class="no-data-content">
							<image src="/static/emptyOrder.png" mode=""></image>
							<text>暂无数据</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
        <u-toast ref="uToast"></u-toast>  
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentState: -1,
				pageNum: 1,
				pageSize: 5,
				loadStatus: 'loadmore',
				loadText: {
					loadingText: '努力加载中..',
					loadmoreText: '上拉加载',
					nomoreText: '到底啦'
				},
				navList: [{
						title: '全部',
						state: 0,
					},
					{
						title: '待付款',
						state: 1,
					},
					{
						title: '待收货',
						state: 2,
					},
					{
						title: '待评价',
						state: 3,
					},
					{
						title: '售后',
						state: 4,
					}
				],
				orderList: []
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
			this.currentState = Number(opt.type) || 0
		},
		watch: {
			currentState(newVal, oldVal) {
				this.orderList = [];
				this.pageNum = 1;
				this.loadOrderList();
			}
		},
		methods: {
			//订单
			loadOrderList() {
				if (this.pageNum === 1) {
					uni.showLoading({
						title: '数据加载中..'
					});
				};
				this.$api.order.GetOrderList({
					state: this.currentState
				}).then(res => {
					if (res.status === 200) {
						this.loadStatus = 'loadmore';
						this.orderList = this.orderList.concat(res.data);
					};
					uni.hideLoading()
				}).catch(err => {
					this.$refs.uToast.show({
						message: err
					});
					uni.hideLoading()
				})
			},
			//上拉加载
			lower() {
				this.loadStatus = 'loading';
				this.pageNum ++ ;
				if(this.pageNum < 5){//模拟只有5页数据 后期更改
					this.loadOrderList();
				}else{
					this.loadStatus = 'nomore';
				}
			},
			//切换导航
			navChange(index) {
				this.currentState = index;
			},
			swiperChange(e) {
				this.currentState = e.detail.current;
			},
			//取消订单
			cancelOrder(){
				
			},
			//去支付
			jumpToPay(){
				uni.navigateTo({
					url:'/pages/cart/payPage'
				})
			},
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
						padding-top: 16upx;
						.order-item {
							margin-bottom: 16upx;
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

					.no-data {
						height: 100%;
						width: 100%;
						position: relative;

						.no-data-content {
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
							color: #7c7f84;
							font-size: 28upx;
							display: flex;
							flex-direction: column;
							align-items: center;
							image{
								height: 200upx;
								width: 200upx;
							}
						}
					}
				}
			}
		}
	}
</style>
