<template>
	<view class="goods-list">
		<!-- 顶部导航切换 -->
		<view class="top-nav-box">
			<view class="left">
				<view class="item" :class="searchType === 0 ? 'item-active' : ''" @click="changeSearch(0)">
					<text>综合排序</text>
				</view>
				<view class="item" :class="searchType === 1 ? 'item-active' : ''" @click="changeSearch(1)">
					<text>销量优先</text>
				</view>
				<view class="item" :class="searchType === 2 ? 'item-active' : ''" @click="changeSearch(2)">
					<text>价格</text>
					<view class="icon-box">
						<text class="font-icon icon-shang"></text>
						<text class="font-icon icon-xia"></text>
					</view>
				</view>
			</view>
			<view class="right" @click="openPopup()">
				<text class="font-icon  icon-fenlei1"></text>
			</view>
		</view>
		<!-- 商品列表 -->
		<scroll-view class="scroll-view" scroll-y="true" @scrolltolower="scrollLower">
			<view class="content" v-if="goodsList.length > 0">
				<view class="goods-item" v-for="(item,index) in goodsList" :key="index">
					<view class="img-wraper">
						<image :src="item.image" mode=""></image>
					</view>
					<view class="title">
						<text>{{item.name}}</text>
					</view>
					<view class="price-box">
						<view class="price">
							<text class="price-tit">￥</text>
							<text>{{item.price}}</text>
						</view>
						<text>已售 {{item.sales}}</text>
					</view>
				</view>
			</view>
			<view class="no-data" v-else>
				<view class="no-data-content">
					<!-- <image src="../../static/emptyCart.jpg" mode=""></image> -->
					<text>暂无数据</text>
				</view>
			</view>
			<u-loadmore v-if="goodsList.length >= 6" :status="loadStatus"  :loadmoreText="loadText.loadmoreText" :loading-text="loadText.loadingText" :nomore-text="loadText.nomoreText"  dashed line />
		</scroll-view>
		<!-- 右侧弹出 -->
		<view class="right-popup-box mask" v-show="showPopup" @click="showPopup = false"  @touchmove.stop.prevent="disabledScroll">
			<view class="popup-content" :class="showPopup ? 'showPop' : ''">
				<scroll-view class="list" scroll-y="true" >
					<view class="list-item" :class="goodsClassify === item.id ? 'list-item-active' :'' " v-for="(item,index) in classifyList" :key="index" @click="changeClassify(item)">{{item.title}}</view>
				</scroll-view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchType: 0,
				goodsClassify:-1,
				showPopup:false,
				pageNum:1,
				pageSize:20,
				loadStatus: 'loadmore',
				loadText: {
					loadingText: '努力加载中..',
					loadmoreText: '上拉加载',
					nomoreText: '到底啦'
				},
				classifyList:[],//分类列表
				goodsList: [],//商品列表
			}
		},
		onLoad() {
			this.loadClassifyList();
		},
		methods: {
			//获取分类列表
			loadClassifyList(){
				uni.showLoading({
					title:'数据加载中..'
				});
				this.$api.category.GetClassifyList({}).then(res=>{
					if(res.status === 200){
						this.classifyList = res.data;
						if(this.classifyList.length > 0){
							this.goodsClassify = this.classifyList[0].id;
							this.loadGoodsList();
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
			//切换分类
			changeClassify(item){
				this.goodsClassify = item.id;
				this.pageNum = 1;
				this.goodsList = [];
				this.loadGoodsList();
			},
			//获取商品列表
			loadGoodsList(){
				if(this.pageNum === 1){
					uni.showLoading({
						title:'数据加载中..'
					});
				};
				const _params = {
					searchType:this.searchType,
					goodsClassify:this.goodsClassify
				};
				this.$api.category.GetGoodsList(_params).then(res=>{
					if(res.status === 200){
						this.goodsList = this.goodsList.concat(res.data);
					};
					uni.hideLoading();
				}).catch(err=>{
					this.$refs.uToast.show({
						message: err
					});
					uni.hideLoading();
				})
			},
			//上拉加载
			scrollLower(){
				this.loadStatus = 'loading';
				this.pageNum ++ ;
				if(this.pageNum < 5){//模拟只有5页数据 后期更改
					this.loadGoodsList();
				}else{
					this.loadStatus = 'nomore';
				}
			},
			disabledScroll(){
				return
			},
			changeSearch(type) {
				this.searchType = type;
				this.pageNum = 1;
				this.goodsList = [];
				this.loadGoodsList();
			},
			openPopup(){
				this.showPopup = true
			},
			closePopup(){
				this.showPopup = false
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F5F5F5;
		height: 100%;
		width: 100%;
	}
	.goods-list {
		height: 100%;
		width: 100%;
		//顶部导航切换
		.top-nav-box{
			height: 80upx;
			background: #fff;
			display: flex;
			align-items: center;
			.left {
				display: flex;
				flex: 1;
				height: 100%;
				.item {
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex: 1;
					position: relative;
					font-size: 30upx;
					color: #303133;
				}
				.item-active {
					color: #fa436a;
					&::before {
						content: '';
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						border-bottom: 2px solid #fa436a;
						height: 0;
						width: 120upx;
					}
				}
				.icon-box{
					margin-left: 4upx;
					display: flex;
					flex-direction: column;
					.font-icon{
						margin-bottom: 4upx;
						width: 30upx;
						height: 14upx;
						display: block;
						color: #888;
						font-size: 26upx;
					}
				}
			}
			.right {
				width: 80upx;
				display: flex;
				justify-content: center;
				position: relative;
				&::before {
					content: '';
					height: 40upx;
					width: 2upx;
					background: #ccc;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				.font-icon {
					font-size: 46upx;
				}
			}
		}
		//商品列表内容
		.scroll-view {
			height: calc(100% - 80upx);
			padding-top: 16upx;
			.content {
				padding:20upx 30upx;
				background: #fff;
				display: flex;
				flex-wrap: wrap;
				.goods-item {
					overflow: hidden;
					flex-shrink: 0;
					width: 48%;
					padding-bottom: 40upx;

					&:nth-child(2n+1) {
						margin-right: 4%;
					}
					.img-wraper {
						width: 100%;
						height: 330upx;
						background: #f3f3f3;
						font-size: 0;
						image {
							height: 100%;
							width: 100%;
						}
					}
					.title {
						line-height: 80upx;
						color: #303133;
						font-size: 32upx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					.price-box {
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #909399;
						font-size: 24upx;
						.price {
							color: #fa436a;
							font-size: 32upx;
							.price-tit {
								font-size: 26upx;
							}
						}
					}
				}
			}
			.no-data{
				height: 100%;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.no-data-content{
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					font-size: 26upx;
					image{
						height: 100upx;
						width: 100upx;
					}
				}
			}
		}
		//右侧弹出
		.right-popup-box{
			position: fixed;
			left: 0;
			top: var(--window-top);
			width: 100%;
			height: 100%;
			z-index: 99;
			.popup-content{
				position: fixed;
				right: 0;
				top: var(--window-top);
				width: 630upx;
				height: 100%;
				position: fixed;
				background: #fff;
				z-index: 3;
				transition: transform .3s;
				transform: translateX(630upx);
				.list{
					height: 100%;
					width: 100%;
					.list-item{
						padding-left: 30upx;
						font-size: 30upx;
						height: 90upx;
						line-height: 90upx;
						color: #303133;
						background: #fff;
						border-bottom: 1px solid #E4E7ED;
					}
					.list-item-active{
						color: #fa436a;
					}
				}
			}
			.showPop{
				animation: showPopup .3s linear forwards;
			}
			@keyframes showPopup {
				0% {
					transform: translate(630upx);
				}
				50% {
					transform: translate(315upx);
				}
				100% {
					transform: translate(0upx);
				}
			}
		}
		.mask{
			background: rgba(0,0,0,.5);			
		}
	}
</style>
