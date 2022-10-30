<template>
	<view class="cate">
		<view class="left-aside">
			<scroll-view class="scroll-view" :scroll-y="true">
				<view class="left-item" v-for="(item,index) in navList" :key="index"
					:class="navCurrentId === item.id ? 'left-item-active' :''" @click="tabHandleClick(item)">
					<text>{{item.title}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="right-aside">
			<scroll-view class="scroll-view" :scroll-y="true">
				<view class="goods-list">
					<view class="good-list-item" v-for="(item,index) in goodsList" :key="item.title">
						<view class="title">
							<text>{{item.title}}</text>
						</view>
						<view class="content">
							<view class="goods" v-for="(citem,cindex) in item.list" :key="cindex" @click="jumpToGoodsList()">
								<image :src="citem.picture" mode=""></image>
								<text>{{citem.name}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navCurrentId: '',
				navList: [],
				goodsList:[]
			}
		},
		onLoad() {
			this.loadNavList();
		},
		methods: {
			//获取左边导航
			loadNavList(){
				uni.showLoading({
					title:'数据加载中..'
				});
				this.$api.category.GetNavList({}).then(res=>{
					if(res.status === 200){
						this.navList = res.data;
						if(this.navList.length > 0){
							this.navCurrentId = this.navList[0].id;//默认选中第一个
							this.loadNavGoodsList();
						};
					};
					uni.hideLoading();
				}).catch(err=>{
					this.$refs.uToast.show({
						message: err
					});
					uni.hideLoading();
				});
			},
			//获取右侧商品
			loadNavGoodsList(){
				uni.showLoading({
					title:'数据加载中..'
				});
				this.$api.category.GetNavGoodsList({id:this.navCurrentId}).then(res=>{
					if(res.status === 200){
						this.goodsList = res.data;
					};
					uni.hideLoading();
				}).catch(err=>{
					this.$refs.uToast.show({
						message: err
					});
					uni.hideLoading();
				});
			},
			//点击左边导航
			tabHandleClick(item) {
				this.navCurrentId = item.id;
				this.loadNavGoodsList()
			},
			//商品列表
			jumpToGoodsList(){
				uni.navigateTo({
					url:'/pages/category/goodsList'
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F5F5F5;
		height: 100%;
		width: 100%;
	}
</style>

<style lang="scss" scoped>


	.cate {
		height: 100%;
		width: 100%;
		display: flex;

		.left-aside {
			width: 200upx;
			height: 100%;
			background: #fff;

			.scroll-view {
				height: 100%;
				width: 100%;

				.left-item {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100upx;
					width: 100%;
					font-size: 28upx;
					color: #606266;
					position: relative;
				}

				.left-item-active {
					background: #f8f8f8;
					color: #fa436a;

					&::before {
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						content: '';
						height: 38upx;
						width: 8upx;
						border-radius: 0 8upx 8upx 0;
						background: #fa436a;
					}
				}
			}
		}

		.right-aside {
			flex: 1;
			padding-left: 20upx;
			height: 100%;

			.scroll-view {
				height: 100%;
				width: 100%;

				.goods-list {
					.good-list-item {
						.title {
							display: flex;
							align-items: center;
							height: 70upx;
							font-size: 28upx;
							color: #303133;
							padding-top: 8upx;
						}

						.content {
							background: #fff;
							display: flex;
							flex-wrap: wrap;
							padding-top: 12upx;

							.goods {
								padding-bottom: 20upx;
								flex-shrink: 0;
								flex: 0 0 33.33%;
								color: #666;
								font-size: 26upx;
								display: flex;
								flex-direction: column;
								align-items: center;

								image {
									height: 140upx;
									width: 140upx;
									// background: #ccc;
								}

							}
						}
					}
				}
			}
		}
	}
</style>
