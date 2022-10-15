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
			<view class="right" @click="showPopup = true">
				<text class="font-icon  icon-fenlei1"></text>
			</view>
		</view>
		<!-- 商品列表 -->
		<scroll-view class="scroll-view" scroll-y="true">
			<view class="content">
				<view class="goods-item" v-for="(item,index) in goodsList" :key="index">
					<view class="img-wraper">
						<image :src="item.image" mode=""></image>
					</view>
					<view class="title">
						<text>{{item.title}}</text>
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
		</scroll-view>
		<!-- 右侧弹出 -->
		<view class="right-popup-box mask" v-show="showPopup" @click="showPopup = false"  @touchmove.stop.prevent="disabledScroll">
			<view class="popup-content" :class="showPopup ? 'showPop' : ''">
				<scroll-view class="list" scroll-y="true" >
					<view class="list-item" :class="goodsClassify === index ? 'list-item-active' :'' " v-for="(item,index) in typeList" :key="index" @click="goodsClassify = index">{{item.title}}</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchType: 0,
				goodsClassify:0,
				showPopup:false,
				typeList:[
					{
						title:'全面屏手机',
						id:1,
					},
					{
						title:'游戏手机',
						id:2,
					},
					{
						title:'老人机',
						id:3,
					},
					{
						title:'拍照手机',
						id:4,
					},
					{
						title:'女性手机',
						id:5,
					},
					{
						title:'合约机',
						id:6,
					},
					{
						title:'办套餐',
						id:7,
					}
					
				],
				goodsList: [{
						image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
						image2: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
						image3: "http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg",
						title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
						price: 179,
						sales: 61,
					},
					{
						image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg",
						image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
						image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
						title: "潘歌针织连衣裙",
						price: 78,
						sales: 16,
					},
					{
						image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg",
						image2: "http://m.360buyimg.com/n12/jfs/t247/42/1078640382/162559/3628a0b/53f5ad09N0dd79894.jpg%21q70.jpg",
						image3: "http://ikids.61kids.com.cn/upload/2018-12-29/1546070626796114.jpg",
						title: "巧谷2019春夏季新品新款女装",
						price: 108.8,
						sales: 5,
					}, {
						image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=756705744,3505936868&fm=11&gp=0.jpg",
						image2: "http://images.jaadee.com/images/201702/goods_img/30150_d85aed83521.jpg",
						image3: "http://img13.360buyimg.com/popWaterMark/jfs/t865/120/206320620/138889/dcc94caa/550acedcN613e2a9d.jpg",
						title: "私萱连衣裙",
						price: 265,
						sales: 88,
					}, {
						image: "https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg",
						image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553418265666&di=d4a7f7eb0ae3c859edeb921641ee1c3a&imgtype=0&src=http%3A%2F%2Fimg003.hc360.cn%2Fy3%2FM02%2FF8%2F9F%2FwKhQh1TuSkGELIlQAAAAAPuLl4M987.jpg",
						image3: "http://img.ef43.com.cn/product/2016/8/05100204b0c.jpg",
						title: "娇诗茹 ulzzang原宿风学生潮韩版春夏短",
						price: 422,
						sales: 137,
					}, {
						image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
						image2: "http://image5.suning.cn/uimg/b2c/newcatentries/0070158827-000000000622091973_2_800x800.jpg",
						image3: "http://img.61ef.cn/news/201903/20/2019032009251784.jpg",
						title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
						price: 179,
						sales: 95,
					},
				]
			}
		},
		methods: {
			disabledScroll(){
				return
			},
			changeSearch(type) {
				this.searchType = type;
			},
			closePopup(){
				this.showPopup = false
			}
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
