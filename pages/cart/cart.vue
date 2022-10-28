<template>
	<view class="cart">
		<scroll-view class="scroll-view" scroll-y="true" @scrolltolower="scrollToLower">
			<view class="cart-list" v-if="cartList.length > 0">
				<view class="list-item" v-for="(item,index) in cartList" :key="index">
					<view class="image-wraper">
						<view class="custom-check-box " @click="checked(item,index)">
							<text class="font-icon  icon-xuanzhong2" :class="item.checked ? 'checked' : ''"></text>
						</view>
						<image :src="item.image"></image>
					</view>
					<view class="center">
						<text class="title ">{{item.name}}</text>
						<text class="attr">{{item.attr}}</text>
						<text class="price">¥{{item.price}}</text>
						<view class="btn-wraper">
							<uni-number-box class="number-box" :min="1" :max="item.stock"
								:value="item.number>item.stock?item.stock:item.number"
								:isMax="item.number>=item.stock?true:false" :isMin="item.number===1" :index="index"
								@change="numberChange($event,index)"></uni-number-box>
						</view>
					</view>
					<view class="right">
						<text class="font-icon icon-fork" @click="deleteCartItem(index)"></text>
					</view>
				</view>
			</view>
			<u-loadmore v-if="cartList.length > 6" :status="loadStatus" :loadmoreText="loadText.loadmoreText"
				:loading-text="loadText.loadingText" :nomore-text="loadText.nomoreText" dashed line />
		</scroll-view>
		<!-- 底部按钮容器 -->
		<view class="bottom-btn-box">
			<view class="left-btn">
				<image class="custom-check-box" :src="isCheckAll ? '/static/selected.png' : '/static/select.png'"
					@click="checkAll"></image>
				<view class="clear-btn " :class="isCheckAll ? 'show' : 'hide'" @click="clearCart">
					<text>清空</text>
				</view>
			</view>
			<view class="total-box">
				<text class="price">¥{{totalMoney}}</text>
				<text class="coupon">已优惠<text style="color: #303133">10</text>元</text>
			</view>
			<button class="right-btn" type="primary" @click="jumpToPay"><text>去结算</text></button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCheckAll: true,
				totalMoney: 0,
				cartList: [],
				pageNum: 1,
				pageSize: 20,
				loadStatus: 'loadmore',
				loadText: {
					loadingText: '努力加载中..',
					loadmoreText: '上拉加载',
					nomoreText: '到底啦'
				},
			}
		},
		onLoad() {
			this.loadShopingCartList();
		},
		methods: {
			//获取购物车列表
			loadShopingCartList() {
				if (this.pageNum === 1) {
					uni.showLoading({
						title: '数据加载中..'
					});
				};
				this.$api.shopingCart.GetShopingCartList({}).then(res => {
					if (res.status === 200) {
						this.cartList = this.cartList.concat(res.data);
						this.loadStatus = 'loadmore';
						this.cartList.forEach(v => {
							if (this.isCheckAll) {
								v.checked = true
							} else {
								v.checked = false
							};
						});
						this.computedTotal();
					};
					uni.hideLoading()
				}).catch(err => {
					this.$refs.uToast.show({
						message: err
					});
					uni.hideLoading()
				})
			},
			//滚动到底触发
			scrollToLower(e) {
				this.loadStatus = 'loading';
				this.pageNum++;
				if (this.pageNum < 5) { //模拟只有5页数据 后期更改
					this.loadShopingCartList();
				} else {
					this.loadStatus = 'nomore';
				}
			},
			//全选
			checkAll() {
				this.isCheckAll = !this.isCheckAll;
				this.cartList.forEach(obj => {
					obj.checked = this.isCheckAll
				})
				this.computedTotal();
			},
			//单个选中
			checked(item, index) {
				this.$set(this.cartList[index], 'checked', !item.checked)
				this.isCheckAll = this.cartList.every(v => {
					return v.checked
				});
				this.computedTotal();
				// #ifndef MP
				this.$forceUpdate()
				// #endif
			},
			//计算总金额
			computedTotal() {
				this.totalMoney = this.cartList.reduce((pre, next) => {
					if (next.checked) {
						return pre + next.price * next.number
					} else {
						return (pre + next.price * next.number) - next.price * next.number
					};
					return pre + next.price * next.number
				}, 0).toFixed(2)
			},
			//删除购物车商品
			deleteCartItem(index) {
				uni.showModal({
					title: '是否删除当前商品？',
					success(res) {
						if (res.confirm) {

						}
					}
				})
			},
			//清空购物车
			clearCart() {
				uni.showModal({
					title: '是否清空购物车？',
					success(res) {
						if (res.confirm) {

						}
					}
				})
			},
			//数量切换
			numberChange(val, index) {
				this.cartList[index].number = val;
				this.computedTotal();
			},
			//去结算
			jumpToPay() {
				if (Number(this.totalMoney) === 0) {
					uni.showToast({
						icon: 'none',
						title: '请至少选择一件商品'
					})
					return;
				};
				uni.navigateTo({
					url: '/pages/cart/createOrder'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		width: 100%;
	}

	.cart {
		padding-bottom: 134upx;
		height: 100%;
		width: 100%;

		.scroll-view {
			height: 100%;
			width: 100%;

			//列表
			.cart-list {
				.list-item {
					display: flex;
					background: #fff;
					// align-items: flex-start;
					padding: 30upx 40upx;
					border-bottom: 1upx solid #E4E7ED;

					.image-wraper {
						border-radius: 8upx;
						background: #f3f3f3;
						font-size: 0;
						height: 230upx;
						width: 230upx;
						position: relative;

						.custom-check-box {
							border-radius: 50%;
							background: #fff;
							position: absolute;
							left: -16upx;
							top: -16upx;
							text-align: center;
							z-index: 2;

							.font-icon {
								font-size: 46upx;
								color: #C0C4CC;
								;
							}

							.checked {
								color: #fa436a;
							}
						}

						image {
							height: 100%;
							width: 100%;
						}
					}

					.center {
						flex: 1;
						padding-left: 30upx;
						display: flex;
						overflow: hidden;
						flex-direction: column;
						justify-content: space-between;

						.title {
							height: 40upx;
							line-height: 40upx;
							color: #303133;
							font-size: 30upx;
							display: inline-block;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}

						.attr {
							font-size: 26upx;
							height: 50upx;
							display: inline-block;
							line-height: 50upx;
							color: #909399;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}

						.price {
							height: 50upx;
							display: inline-block;
							line-height: 50upx;
							color: #303133;
							font-size: 30upx;
						}

						.btn-wraper {
							width: 230upx;
							height: 70upx;
							background: #f5f5f5;
							display: flex;
							justify-content: center;
							align-items: center;

							.number-box {
								// flex: 1;
								display: flex;
								align-items: center;
							}
						}
					}

					.right {
						padding: 4upx 10upx;
						display: flex;
						align-items: flex-start;
						color: #909399;
						font-size: 34upx;
						height: 50upx;
					}
				}
			}
		}

		.bottom-btn-box {
			/* #ifdef H5 */
			margin-bottom: 100upx;
			/* #endif */
			display: flex;
			z-index: 2;
			height: 100upx;
			position: fixed;
			width: 690upx;
			bottom: 30upx;
			left: 50%;
			padding: 0 32upx;
			border-radius: 16upx;
			transform: translate(-50%);
			box-shadow: 0px 0upx 22upx 0 rgba(0, 0, 0, .5);
			background: rgba(255, 255, 255, 0.9);
			align-items: center;

			.left-btn {
				position: relative;

				.custom-check-box {
					height: 52upx;
					z-index: 99;
					width: 52upx;
					position: absolute;
					left: 0;
					top: 0;
				}

				.clear-btn {
					font-size: 30upx;
					height: 52upx;
					line-height: 52upx;
					border-radius: 100upx;
					background: #C0C4CC;
					color: #fff;
				}

				.show {
					animation: showClearBtn .3s forwards;
					padding-left: 60upx;
				}

				.hide {
					animation: hideClearBtn .3s forwards;
					padding-left: 0upx;
				}

				@keyframes showClearBtn {
					0% {
						width: 0upx;
						opacity: 0;
					}

					50% {
						width: 74upx;
						opacity: .5;
					}

					100% {
						width: 148upx;
						opacity: 1;
					}
				}

				@keyframes hideClearBtn {
					0% {
						width: 148upx;
						opacity: 1;
					}

					50% {
						width: 74upx;
						opacity: .5;
					}

					100% {
						width: 0upx;
						opacity: 0;
					}
				}
			}

			.total-box {
				flex: 1;
				padding-right: 46upx;
				display: flex;
				flex-direction: column;
				text-align: right;

				.price {
					font-size: 34upx;
					color: #303133;
				}

				.coupon {
					font-size: 26upx;
					color: #909399;
				}
			}

			.right-btn {
				padding: 0 40upx;
				border-radius: 200upx;
				background: #fa436a;
				height: 82upx;
				line-height: 82upx;
				font-size: 32upx;
			}
		}
	}
</style>
