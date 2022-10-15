<template>
	<view class="cate">
		<view class="left-aside">
			<scroll-view class="scroll-view" :scroll-y="true">
				<view class="left-item" v-for="(item,index) in leftList" :key="index"
					:class="leftCurrent === index ? 'left-item-active' :''" @click="tabHandleClick(index)">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				leftCurrent: 0,
				leftList: [{
						title: '手机数码'
					},
					{
						title: '鲜花礼品'
					},
					{
						title: '男装女装'
					},
					{
						title: '母婴用品'
					},
					{
						title: '儿童玩具'
					},
				],
				goodsList:[
					{
						title:'手机通讯',
						list:[
							{
								id: 8,
								pid: 5,
								name: '全面屏手机',
								picture: '/static/temp/cate2.jpg'
							},
							{
								id: 9,
								pid: 5,
								name: '游戏手机',
								picture: '/static/temp/cate3.jpg'
							},
							{
								id: 10,
								pid: 5,
								name: '老人机',
								picture: '/static/temp/cate1.jpg'
							},
							{
								id: 11,
								pid: 5,
								name: '拍照手机',
								picture: '/static/temp/cate4.jpg'
							},
							{
								id: 12,
								pid: 5,
								name: '女性手机',
								picture: '/static/temp/cate5.jpg'
							},
							{
								id: 14,
								pid: 6,
								name: '合约机',
								picture: '/static/temp/cate1.jpg'
							},
							{
								id: 15,
								pid: 6,
								name: '选好卡',
								picture: '/static/temp/cate4.jpg'
							},
						]
					},
					{
						title:'礼品鲜花',
						list:[
                           {
                           	id: 19,
                           	pid: 17,
                           	name: '公益摆件',
                           	picture: '/static/temp/cate7.jpg'
                           },
                           {
                           	id: 20,
                           	pid: 17,
                           	name: '创意礼品',
                           	picture: '/static/temp/cate8.jpg'
                           },
                           {
                           	id: 21,
                           	pid: 18,
                           	name: '鲜花',
                           	picture: '/static/temp/cate9.jpg'
                           },
                           {
                           	id: 22,
                           	pid: 18,
                           	name: '每周一花',
                           	picture: '/static/temp/cate10.jpg'
                           },
                           {
                           	id: 23,
                           	pid: 18,
                           	name: '卡通花束',
                           	picture: '/static/temp/cate11.jpg'
                           },
                           {
                           	id: 24,
                           	pid: 18,
                           	name: '永生花',
                           	picture: '/static/temp/cate12.jpg'
                           },
						]
					},
					{
						title:'男装女装',
						list:[
					      {
					      	id: 27,
					      	pid: 25,
					      	name: '男士T恤',
					      	picture: '/static/temp/cate13.jpg'
					      },
					      {
					      	id: 28,
					      	pid: 25,
					      	name: '男士外套',
					      	picture: '/static/temp/cate14.jpg'
					      },
					      {
					      	id: 29,
					      	pid: 26,
					      	name: '裙装',
					      	picture: '/static/temp/cate15.jpg'
					      },
					      {
					      	id: 30,
					      	pid: 26,
					      	name: 'T恤',
					      	picture: '/static/temp/cate16.jpg'
					      },
					      {
					      	id: 31,
					      	pid: 26,
					      	name: '上装',
					      	picture: '/static/temp/cate15.jpg'
					      },
					      {
					      	id: 32,
					      	pid: 26,
					      	name: '下装',
					      	picture: '/static/temp/cate16.jpg'
					      },
						]
					}
				]
			}
		},
		methods: {
			//点击左边导航
			tabHandleClick(index) {
				this.leftCurrent = index;
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

<style lang="scss" scoped>
	page {
		background: #F5F5F5;
		height: 100%;
		width: 100%;
	}

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
									background: #ccc;
								}

							}
						}
					}
				}
			}
		}
	}
</style>
