<template>
	<view class="appraise">
		<!-- 导航 -->
		<view class="nav-section ">
			<view class="nav-item"  v-for="item in navList" :key="item.id" :class="current === item.id ? 'nav-item-active' : ''" @click="changeNav(item.id)">
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 内容 -->
		<swiper class="swiper" :current="current" @change="swiperChange">
			<swiper-item class="swiper-item" v-for="nav in navList" :key="nav.title">
				<scroll-view class="scroll-view" scroll-y="true" @scrolltolower="lower">
					<view  v-if="appraiseList.length > 0">
						<view class="appraise-item" v-for="(item,index) in appraiseList" :key="index">
							<!-- 待评价 -->
							<view v-if="current === 0">
								<view class="name">
									<text>{{item.name}}</text>
								</view>
								<view class="content">
									<u--image :showLoading="true" :src="item.img" width="80px" height="80px"></u--image>
									<view class="right-box">
										<text class="clamp">{{item.goodsName}}</text>
										<text class="clamp attr">{{item.goodsAttr}}</text>
										<view class="btn-box">
											<view class="btn" @click="jumpToPublishAppraise(item)">去评价</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 可追评 -->
							<view v-if="current === 1">
								<view class="content">
									<u--image :showLoading="true" :src="item.img" width="80px" height="80px"></u--image>
									<view class="right-box">
										<text class="clamp">{{item.goodsName}}</text>
										<text class="clamp attr">{{item.goodsAttr}}</text>
										<view class="btn-box">
											<view class="btn" @click="jumpToPublishAppraise(item)">追评</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 已评价 -->
							<view v-if="current === 2">
								<view class="top-box">
									<text class="date-time">{{item.dateTime}}</text>
									<view class="right" @click="showActionSheet(index)">
										<u-icon name="eye" color="#9e9e9e" size="16"></u-icon>
										<text class="tips">{{item.statusTxt}}</text>
										<u-icon name="arrow-down" color="#9e9e9e" size="16"></u-icon>
									</view>
								</view>
								<view class="appraise-txt">
									<text >{{item.appraise}}</text>
								</view>
								<view class="goods-info">
									<u--image :showLoading="true" :src="item.img" width="60px" height="60px"></u--image>
									<view class="right">
										<text class="clamp">{{item.goodsName}}</text>
										<text class="clamp attr">{{item.goodsAttr}}</text>
									</view>
								</view>
								<view class="btn-box">
									<view class="btn" @click="jumpToPublishAppraise(item)">写追评</view>
								</view>
							</view>
						</view>
						<u-loadmore style="padding: 30rpx 0;"  :status="loadStatus"  :loadmoreText="loadText.loadmoreText" :loading-text="loadText.loadingText" :nomore-text="loadText.nomoreText"  dashed line />
					</view>
					<no-data v-else></no-data>
				</scroll-view>
			</swiper-item>
		</swiper>
		<u-toast ref="uToast"></u-toast>  
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				pageNum: 1,
				pageSize: 5,
				loadStatus: 'loadmore',
				loadText: {
					loadingText: '努力加载中..',
					loadmoreText: '上拉加载',
					nomoreText: '到底啦'
				},
				navList:[
					{
						title:'待评价',
						id:0
					},
					{
						title:'可追评',
						id:1
					},
					{
						title:'已评价',
						id:2
					}
				],
				appraiseList:[]
			}
		},
		watch:{
			current:{
				handler(newVal,oldVal){
					this.appraiseList = [];
					this.pageNum = 1;
					this.loadAppraiseList();
				},
				immediate:true
			}
		},
		methods: {
			//导航切换
			changeNav(id) {
				this.current = id;
				
			},
			//加载列表
			loadAppraiseList(){
				if(this.pageNum === 1){
					uni.showLoading({
						title:'数据加载中..'
					});
				};
				this.$api.user.GetAppraiseList({type:this.current}).then(res=>{
					if(res.status === 200){
						this.appraiseList = this.appraiseList.concat(res.data);
					};
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					this.$refs.uToast.show({
						message: err
					});
				})
			},
			swiperChange(e){
				const {detail:{current}} = e;
			    this.current = current;
			},
			showActionSheet(index){
				const itemList = ['公开','隐藏'];
				uni.showActionSheet({
					itemList,
					success: (target) => {
						const {tapIndex} = target;
						this.$set(this.appraiseList[index],'statusTxt',itemList[tapIndex])
					}
				})
			},
			//上拉加载
			lower() {
				this.loadStatus = 'loading';
				this.pageNum ++ ;
				if(this.pageNum < 5){//模拟只有5页数据 后期更改
					this.loadAppraiseList();
				}else{
					this.loadStatus = 'nomore';
				}
			},
			//发表评价
			jumpToPublishAppraise(item){
				const goodinfo = {
					img:item.img,
					goodsName:item.goodsName,
					goodsAttr:item.goodsAttr
				}
				uni.navigateTo({
					url:`/pages/user/publishAppraise?goodinfo=${ JSON.stringify(goodinfo)}`
				})
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		width: 100%;
		background: #f5f5f5;
	}
</style>
<style lang="scss" scoped>
	.appraise {
		height: 100%;
		width: 100%;
		.nav-section {
			height: 80upx;
			padding: 0 10upx;
			background: #fff;
			display: flex;
			align-items: center;
			.nav-item {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;
				font-size: 28upx;
				height: 100%;
				position: relative;
				&-active::after {
					content: '';
					width: 120upx;
					height: 4upx;
					background: var(--base-color);
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}
		.swiper {
			height: calc(100% - 80upx);
			width: 100%;
			&-item {
				height: 100%;
				width: 100%;
				.scroll-view {
					height: 100%;
					width: 100%;
					margin-top: 10upx;
					.appraise-item {
						padding: 30upx;
						background: #fff;
						margin-bottom: 20upx;
						.name {
							padding-bottom: 20upx;
						}
						.top-box {
							display: flex;
							align-items: center;
							justify-content: space-between;
							font-size: 24upx;
							color: #9e9e9e;
							padding-bottom: 30upx;
							.right {
								display: flex;
								align-items: center;
								.tips {
									padding: 0 10upx;
								}
							}
						}
						.appraise-txt {
							font-size: 28upx;
							padding-bottom:30upx ;
						}
						.goods-info {
							background: #f5f5f5;
							display: flex;
							align-items: center;
							.right {
								padding-left: 10upx;
								display: flex;
								flex-direction: column;
								font-size: 24upx;
								overflow: hidden;
								.clamp {
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
								.attr {
									color: #9e9e9e;
								}
							}
						}
						.content {
							display: flex;
							.right-box {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								padding-left: 20upx;
								flex: 1;
								overflow: hidden;
								font-size: 28upx;
								.clamp {
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
								.attr {
									color: #9e9e9e;
								}
							}
						}
						.btn-box {
							padding-top: 20upx;
							width: 100%;
							border-radius: 30upx;
							display: flex;
							justify-content: flex-end;
							.btn {
								margin: 0;
								padding: 0;
								height: 60upx;
								width: 150upx;
								font-size: 24upx;
								border: 1px solid var(--base-color);
								color: var(--base-color);
								display: flex;
								align-items: center;
								justify-content: center;
								border-radius: inherit;
							}
						}
					}
				}
			}
		}
	}
</style>
