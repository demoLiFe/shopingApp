<template>
	<scroll-view class="index-wraper" scroll-y="true">
		<view class="header">
			<view class="nav-bar-spacing"></view>
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
			<swiper class="swiper-wrap" circular @change="changeBanner">
				<swiper-item class="swiper-item" v-for="(item,index) in bannerList" :key="index">
					<image class="image" :src="item.src" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dot" v-if="bannerList.length > 0">
				<view class="num">{{bannerCurrent + 1}}</view>
				<view class="sign">/</view>
				<view class="num">{{bannerList.length}}</view>
			</view>
		</view>
		<!-- 导航 -->
		<view class="nav-section">
			<swiper class="swiper-wrap" circular @change="changeNav">
				<swiper-item class="swiper-item" v-for="(item,index) in navList" :key="index">
					<view class="nav-item" v-for="(citem,cindex) in item.list">
						<image :src="citem.icon"></image>
						<text>{{citem.title}}</text>
					</view>
				</swiper-item>
			</swiper>
			<view class="custom-indicator-dot-wrap">
				<view class="custom-indicator-dot">
					<view class="dot " v-for="(item,index) in navList" :key="index"
						:class="navCurrent === index ? 'dot-active' : ''"></view>
				</view>
			</view>
		</view>
		<view class="ad-1">
			<image src="/static/temp/ad1.jpg" mode="scaleToFill"></image>
		</view>
		<!-- 秒杀层 -->
		<view class="seckill-floor">
			<view class="s-header">
				<image src="/static/temp/secskill-img.jpg" mode=""></image>
				<text class="tip">8点场</text>
				<text class="hours">07</text>
				<text class="minute">11</text>
				<text class="second">50</text>
				<view class="right">
					<text class="font-icon icon-you"></text>
				</view>
			</view>
			<scroll-view class="scoll-wraper" scroll-x="true">
				<view class="s-content">
					<view class="s-content-item" v-for="(item,index) in seckillGoodsList" :key="index"
						@click="gotoDetail(item)">
						<image :src="item.image" mode="aspectFill"></image>
						<text class="clamp">{{item.name}}</text>
						<text class="price">￥{{item.price}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 团购层 -->
		<view class="group-buying-floor bg-fff mg-t-16 ">
			<view class="floor-header pd-0-32">
				<image src="/static/temp/h1.png"></image>
				<view class="title-box">
					<text class="title">精品团购</text>
					<text class="title2">Boutique Group Buying</text>
				</view>
			</view>
			<swiper class="swiper-wrap" circular>
				<swiper-item class="swiper-item pd-0-32" v-for="(item,index) in groupBuying" :key="index">
					<view class="item-box">
						<view class="item-left">
							<image :src="item.image" />
							<view class="content-box">
								<text class="title clamp">{{item.name}}</text>
								<view class="price-box">
									<text class="price">￥{{item.price}}</text>
									<text class="n-price">￥{{item.nprice}}</text>
								</view>
								<view class="progress-box">
									<view class="p-left">
										<view class="progress-out">
											<view class="progress-inner"></view>
										</view>
									</view>
									<text>{{item.personNum}}人成团</text>
								</view>
							</view>
						</view>
						<view class="item-right">
							<image :src="item.image1" />
							<view class="content-box">
								<text class="title clamp">{{item.name1}}</text>
								<view class="price-box">
									<text class="price">￥{{item.price1}}</text>
									<text class="n-price">￥{{item.nprice1}}</text>
								</view>
								<view class="progress-box">
									<view class="p-left">
										<view class="progress-out">
											<view class="progress-inner"></view>
										</view>
									</view>
									<text>{{item.personNum1}}人成团</text>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类精选层 -->
		<view class="cate-hot-goods-floor  mg-t-16 ">
			<view class="floor-header pd-0-32 bg-fff">
				<image src="/static/temp/h1.png"></image>
				<view class="title-box">
					<text class="title">分类精选</text>
					<text class="title2">Competitive Products For You</text>
				</view>
			</view>
			<view class="floor-content" v-for="(item,index) in cateGoodsList" :key="index">
				<view class="floor-img-box">
					<image class="floor-img" :src="item.bgimage">
					</image>
				</view>
				<view class="floor-list-wrap">
					<scroll-view scroll-x="true">
						<view class="floor-list" v-if="item.list.length > 0">
							<view class="floor-list-item" v-for="(citem,cindex) in item.list" :key="citem.image">
								<image :src="citem.image"></image>
								<text class="clamp">{{citem.name}}</text>
								<text class="price">￥{{citem.price}}</text>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="guess-you-like-floor bg-fff">
			<view class="floor-header pd-0-32">
				<image src="/static/temp/h1.png"></image>
				<view class="title-box">
					<text class="title">猜你喜欢</text>
					<text class="title2">Guess You Like It</text>
				</view>
			</view>
			<view class="floor-content pd-0-32">
				<view class="guess-item" v-for="(item,index) in likeGoodsList" :key="index">
					<view class="image-wrapper">
						<image :src="item.image"></image>
					</view>
					<text class="title clamp">{{item.name}}</text>
					<text class="price">￥{{item.price}}</text>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				titleNViewBackground: '',
				bannerCurrent: 0, //当前banner
				navCurrent: 0, //当前导航模块
				bannerList: [], //banner
				navList: [], //导航
				seckillGoodsList: [], //秒杀
				groupBuying: [], //团购
				cateGoodsList: [], //分类精选商品
				likeGoodsList: [], //猜你喜欢商品
			}
		},
		onLoad() {
			this.loadBannerList();
			this.loadSecKillGoodsList();
			this.loadGroupBuying();
			this.loadNavList();
			this.loadLikeGoodsList();
			this.loadCateGoodsList()
		},
		onNavigationBarButtonTap (e){
			if(e.index === 0){
				// #ifndef H5
				uni.scanCode({
					success: () => {
						
					}
				})
				// #endif
			}else if(e.index === 1){
				uni.navigateTo({
					url:'/pages/message/message'
				})
			};
		},
		onReady() {

		},
		methods: {
			//获取banner
			loadBannerList() {
				uni.showLoading({
					title: '数据加载中...'
				});
				this.$api.index.GetBannerList({}).then(res => {
					if (res.status === 200) {
						this.bannerList = res.data
						this.titleNViewBackground = this.bannerList[0].background;
					};
					uni.hideLoading();
				}).catch(err => {
					this.$refs.uToast.show({
						message: err
					});
					uni.hideLoading();
				});

			},
			//获取导航列表
			loadNavList() {
				uni.showLoading({
					title: '数据加载中...'
				});
				this.$api.index.GetNavList({}).then(res => {
					if (res.status === 200) {
						this.navList = res.data;
					};
					uni.hideLoading();
				}).catch(err => {
					this.$refs.uToast.show({
						message: err
					});
					uni.hideLoading();
				});
			},
			//获取秒杀商品
			loadSecKillGoodsList() {
				uni.showLoading({
					title: '数据加载中...'
				});
				this.$api.index.GetSecKillGoodsList({}).then(res => {
					if (res.status === 200) {
						this.seckillGoodsList = res.data;
					};
					uni.hideLoading();
				}).catch(err => {
					this.$refs.uToast.show({
						message: err
					});
					uni.hideLoading();
				});
			},
			//获取分类精选商品
			loadCateGoodsList() {
				uni.showLoading({
					title: '数据加载中...'
				});
				this.$api.index.GetCateGoodsList({}).then(res => {
					if (res.status === 200) {
						this.cateGoodsList = res.data;
					};
					uni.hideLoading();
				}).catch(err => {
					this.$refs.uToast.show({
						message: err
					});
					uni.hideLoading();
				})
			},
			//获取精品团购商品
			loadGroupBuying() {
				uni.showLoading({
					title: '数据加载中...'
				});
				this.$api.index.GetGroupBuying({}).then(res => {
					if (res.status === 200) {
						this.groupBuying = res.data;
					};
					uni.hideLoading();
				}).catch(err => {
					this.$refs.uToast.show({
						message: err
					});
					uni.hideLoading();
				})
			},
			//猜你喜欢
			loadLikeGoodsList() {
				uni.showLoading({
					title: '数据加载中...'
				});
				this.$api.index.GetLikeGoodsList({}).then(res => {
					if (res.status === 200) {
						this.likeGoodsList = res.data;
					};
					uni.hideLoading();
				}).catch(err => {
					this.$refs.uToast.show({
						message: err
					});
					uni.hideLoading()
				})
			},
			//切换banner
			changeBanner(e) {
				this.bannerCurrent = e.detail.current;
				this.titleNViewBackground = this.bannerList[index].background;
			},
			//切换导航模块
			changeNav(e) {
				this.navCurrent = e.detail.current;
			},
			//跳转商品详情页
			gotoDetail() {
				uni.navigateTo({
					url: '/pages/index/goodsDetail'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f5f5f5;
	}

	.index-wraper {

		//顶部bnner图
		.header {
			position: relative;
			padding-top: 10px;

			.titleNview-background {
				height: 426upx;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				z-index: 0;
			}

			.nav-bar-spacing {
				height: var(--status-bar-height);
				padding-top: 44px;
				box-sizing: content-box;

			}

			.swiper-wrap {
				width: 100%;
				height: 350upx;

				.swiper-item {
					width: 100%;
					height: 100%;
					padding: 0 28upx;

					// box-shadow: 0upx 0upx 10upx #000;   
					.image {
						width: 100%;
						height: 100%;
						border-radius: 10upx;
					}
				}
			}

			.swiper-dot {
				display: flex;
				justify-content: space-between;
				position: absolute;
				left: 60upx;
				bottom: 15upx;
				width: 72upx;
				height: 36upx;
				background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
				background-size: 100% 100%;

				.num {
					width: 36upx;
					height: 36upx;
					border-radius: 50px;
					font-size: 24upx;
					color: #fff;
					text-align: center;
					line-height: 36upx;
				}

				.sign {
					position: absolute;
					top: 0;
					left: 50%;
					line-height: 36upx;
					font-size: 12upx;
					color: #fff;
					transform: translateX(-50%);
				}
			}
		}

		//导航选择
		.nav-section {
			display: flex;
			justify-content: space-around;
			background: #fff;
			padding: 32upx 24upx;
			display: flex;
			flex-direction: column;

			.swiper-wrap {
				width: 100%;
				min-height: 300upx;

				.swiper-item {
					height: 100%;
					width: 100%;
					display: flex;
					flex-wrap: wrap;

					.nav-item {
						flex: 0 0 25%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						font-size: 26upx;
						height: 150upx;
						color: #303133;

						image {
							width: 88upx;
							height: 88upx;
							margin-bottom: 14upx;
							border-radius: 50%;
							opacity: .7;
							box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
						}
					}
				}
			}

			.custom-indicator-dot-wrap {
				height: 50upx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				.custom-indicator-dot {
					// min-width: 200upx;
					display: flex;

					.dot {
						margin-right: 10upx;
						height: 15upx;
						width: 15upx;
						background: #ccc;
						border-radius: 50%;
					}

					.dot-active {
						background: #fa436a;
					}
				}
			}
		}

		.ad-1 {
			width: 100%;
			height: 252upx;
			padding: 10upx 0;
			background: #fff;

			image {
				height: 100%;
				width: 100%;
			}
		}

		// 秒杀层
		.seckill-floor {
			padding: 4upx 32upx 22upx;
			margin-top: 16upx;
			background-color: #fff;

			.s-header {
				height: 100upx;
				display: flex;
				align-items: center;

				image {
					height: 32upx;
					width: 154upx;
				}

				.tip {
					font-size: 30upx;
					margin: 0 22upx 0 45upx;
					color: #909399
				}

				.hours,
				.minute,
				.second {
					background: rgba(0, 0, 0, 0.8);
					height: 38upx;
					width: 46upx;
					text-align: center;
					line-height: 38upx;
					font-size: 28upx;
					margin-right: 14upx;
					color: #fff;
				}

				.right {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					// text-align: right;
				}
			}

			.scoll-wraper {
				.s-content {
					display: flex;

					.s-content-item {
						width: 164upx;
						display: flex;
						flex-direction: column;
						align-items: center;
						color: #303133;
						margin-right: 22upx;
						line-height: 1.8;
						font-size: 28upx;

						image {
							height: 164upx;
							width: 164upx;
							border-radius: 6upx;
						}

						.clamp {
							width: 100%;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
							display: block;
						}

						.price {
							color: #fa436a
						}
					}
				}
			}
		}

		//公共头部样式
		.floor-header {
			display: flex;
			align-items: center;
			padding: 6upx 0 8upx;
			line-height: 1.1;
			height: 154upx;

			image {
				margin-right: 22upx;
				height: 88upx;
				width: 88upx;
			}

			.title-box {
				display: flex;
				flex: 1;
				flex-direction: column;

				.title {
					font-size: 36upx;
					line-height: 1.3;
				}

				.title2 {
					font-size: 26upx;
					color: #909399;
				}
			}
		}

		.bg-fff {
			background: #fff;
		}

		.mg-t-16 {
			margin-top: 16upx;
		}

		.pd-0-32 {
			padding: 0 32upx;
		}

		// 团购层 
		.group-buying-floor {
			.swiper-wrap {
				height: 716upx;
				padding-bottom: 16px;

				.swiper-item {
					.item-box {
						height: auto;
						display: flex;

						.item-left {
							flex: 1.2;
							margin-right: 26upx;
							overflow: hidden;
						}

						.item-right {
							flex: 0.8;
							display: flex;
							overflow: hidden;
							flex-direction: column-reverse;
						}

						image {
							height: 506upx;
							width: 100%;
						}

						.content-box {
							height: 176upx;
							padding-top: 22upx;
							font-size: 32upx;
							color: #303133;
							line-height: 1.6;

							.clamp {
								width: 100%;
								text-overflow: ellipsis;
								overflow: hidden;
								white-space: nowrap;
								display: block;
							}

							.price-box {
								color: #fa436a;

								.n-price {
									text-decoration: line-through;
									font-size: 28upx;
									color: #909399;
									margin-left: 8upx;
								}
							}

							.progress-box {
								display: flex;
								font-size: 26upx;
								align-items: center;
								margin-top: 10upx;
								padding-right: 10upx;

								.p-left {
									flex: 1;
									margin-right: 8upx;

									.progress-out {
										height: 10upx;
										background: rgb(235, 235, 235);
										border-radius: 6upx;
									}

									.progress-inner {
										width: 60%;
										height: 100%;
										background: rgb(250, 67, 106);
									}
								}

							}
						}
					}
				}
			}
		}

		//分类精选
		.cate-hot-goods-floor {
			.floor-content {
				margin-bottom: 22upx;

				.floor-img-box {
					height: 352upx;
					width: 100%;

					.floor-img {
						height: 100%;
						width: 100%;
					}
				}

				.floor-list-wrap {
					background: #fff;
					border-radius: 6upx;
					padding: 22upx;
					border-radius: 6upx;
					margin-top: -154upx;
					margin-left: 32upx;
					position: relative;

					.floor-list {
						display: flex;

						.floor-list-item {
							color: #303133;
							line-height: 1.8;
							display: flex;
							flex-direction: column;
							font-size: 28upx;
							margin-right: 22upx;
							width: 198upx;

							image {
								width: 198upx;
								height: 198upx;
							}

							.clamp {
								width: 100%;
								text-overflow: ellipsis;
								overflow: hidden;
								white-space: nowrap;
							}

							.price {
								color: #fa436a;
							}

						}
					}
				}
			}
		}

		//猜你喜欢
		.guess-you-like-floor {
			.floor-content {
				display: flex;
				flex-wrap: wrap;

				// justify-content: space-between;
				.guess-item {
					flex-shrink: 0;
					overflow: hidden;
					width: 48%;
					padding-bottom: 46upx;

					&:nth-child(2n+1) {
						margin-right: 4%;
					}

					.image-wrapper {
						background: #f3f3f3;
						height: 364upx;
						width: 100%;

						image {
							height: 100%;
							width: 100%;
						}
					}

					.title {
						font-size: 34upx;
						color: #303133;
						line-height: 88upx;
					}

					.clamp {
						width: 100%;
						overflow-y: hidden;
						text-overflow: ellipsis;
						display: block;
						white-space: nowrap;
					}

					.price {
						font-size: 34upx;
						color: #fa436a;
						line-height: 1;
					}
				}
			}
		}
	}
</style>
