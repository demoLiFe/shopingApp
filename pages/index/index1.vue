<template>
	<view class="index-page" :style="{paddingTop:titleNviewHeight + 'px'}">
        <!-- 导航栏 -->  
		<view class="title-nview">
			<statusBar></statusBar>
			<view class="title-nview-content">
				<view  class="left">
					<image class="img" src="/static/sign-in.png" mode="aspectFit"></image>
				</view>
				<view class="center">
					<view class="tab-bar-box">
						<view class="tab-bar-item" v-for="(item,index) in tabList" :class="tabIndex === index ? 'active' : ''" :key="index" @click="changeTab(index)">
							<text>{{item.title}}</text>
						</view>
					</view>
				</view>
				<view class="right">
					<image class="img" src="/static//vip-code.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="search-box">
			<search class="search" :btnText="tabIndex === 0 ? '搜索订阅' : '搜索'">
				<template v-slot:left v-if="tabIndex === 1">
					<u-icon  name="search" size="28" color="#D9705B"></u-icon>
					<view class="divider"></view>
				</template>
				<template v-slot:right-icon v-if="tabIndex === 1">
					<u-icon name="camera" size="24" color="#72716D"></u-icon>
				</template>
			</search>
		</view>
		<view class="body">
			<view class="arc-bg"></view>
			<swiper class="swiper" :current="tabIndex" @change="swiperChange" >
				<swiper-item>
					<view class="swiper-item"></view>
				</swiper-item>
				<swiper-item class="swiper-item" >
					<view class="refresh-text" >{{refreshText}}</view>
					<scroll-view scroll-y="true" class="scroll-view"  :style="{transform:`translateY(${dropDownDistance}px)`}" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
						<!-- 导航 -->
						<view class="nav-list">
							<scroll-view scroll-x="true" style="width: 100%;">
								<view class="nav-list-item" >
									<view class="icon-box" v-for="icon in navList" :key="icon.img">
										<image class="nav-icon"  :src="icon.img"  mode="aspectFill"></image>
										<text class="nav-text">{{icon.text}}</text>
									</view>
								</view>
							</scroll-view>
						</view>
						<!-- 推荐 -->
						<view class="recommend-box">
							<view class="recommend-item b-b">
								<view class="recommend-item-bg" style="background-image:url(../../static/juhuasuan.png)"></view>
							</view>
							<view class="recommend-item b-l b-b">
								<view class="recommend-item-bg" style="background-image:url(../../static/taobaozhibo.png)"></view>
							</view>
							<view class="recommend-item">
								<view class="recommend-item-bg" style="background-image:url(../../static/youhaohuo.png)"></view>
							</view>
							<view class="recommend-item b-l">
								<view class="recommend-item-bg" style="background-image:url(../../static/taocaicai.png)"></view>
							</view>
						</view>
						<!-- 商品列表 -->
						<view class="goods-list">
							<view class="goods-list-item" v-for="item in seckillGoodsList" :key="item.image">
								<image class="img" :src="item.image" mode=""></image>
								<view class="goods-info-box">
									<text class="clamp">春秋款韩版套装男士港春秋款韩版套装男士港春秋款韩版套装男士港春秋款韩版套装男士港</text>
									<view class="price-box">
										<view class="left">
											<view >
												<text class="fs-24">￥</text>
												<text class="fs-34">{{item.price}}</text>
											</view>
										</view>
										<u-icon name="more-dot-fill" size="20"></u-icon>
									</view>
								</view>
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
		data(){
			return {
				titleNviewHeight:0,
				tabIndex:1,
				refreshThreshold:40,//刷新阈值
				dropDownDistance:0,//下拉距离
				touchStartY:0,//手指上下滑动开始位置
				isRefreshing:false,//是否刷新中
				refreshText:'',
				tabList:[
					{
						title:'订阅'
					},
					{
						title:'推荐'
					}
				],
				seckillGoodsList:[],
				navList:[
					{
					  img:'/static/tianmaoguoji.png',
					  text:'天猫国际'	  
					},
					{
					  img:'/static/taobaochihuo.png',
					  text:'淘宝吃货'	  
					},
					{
					  img:'/static/taopiaopiao.png',
					  text:'淘票票'	  
					},
					{
					  img:'/static/tuhuoxianshi.png',
					  text:'土货鲜食'	  
					},
					{
					  img:'/static/zizhiguize.png',
					  text:'资质规则'	  
					},
					{
					  img:'/static/taobaochihuo.png',
					  text:'淘宝吃货'	  
					},
					{
					  img:'/static/taobaochihuo.png',
					  text:'淘宝吃货'	  
					},
					{
					  img:'/static/taobaochihuo.png',
					  text:'淘宝吃货'	  
					},{
					  img:'/static/taobaochihuo.png',
					  text:'淘宝吃货'	  
					},
					{
					  img:'/static/tuhuoxianshi.png',
					  text:'土货鲜食'	  
					},
					{
					  img:'/static/tuhuoxianshi.png',
					  text:'土货鲜食'	  
					},
					{
					  img:'/static/tuhuoxianshi.png',
					  text:'土货鲜食'	  
					},
				]
			}
		},
		onLoad() {
			this.loadSecKillGoodsList()
		},
		onReady(){
			uni.createSelectorQuery().in(this).select('.title-nview').boundingClientRect().exec(res=>{
				if(res.length){
					this.titleNviewHeight = res[0].height
				}
			})
		},
		methods:{
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
			touchStart(e){
				this.refreshText = '下拉刷新'
				this.touchStartY = e.touches[0].pageY;
				
			},
			touchMove(e){
				let touchMoveY = e.touches[0].pageY;
				if(this.touchStartY  < touchMoveY && touchMoveY - this.touchStartY < this.refreshThreshold){
					this.showRefreshText = true;
					this.dropDownDistance = touchMoveY - this.touchStartY
				}else{
					this.isRefreshing = true;
					this.refreshText = '释放刷新'
				}
			},
			touchEnd(e){
				if(this.isRefreshing){
					this.refreshText = '加载中..'
					//模拟后端请求数据
					setTimeout(()=>{
						this.dropDownDistance = 0;
						this.isRefreshing = false;
						this.showRefreshText = false;
					},1000)
				}else{
					this.showRefreshText = false;
					this.dropDownDistance = 0;
				}
			},
			changeTab(index){
				this.tabIndex = index;
			},
			swiperChange(e){
				const {detail:{current}} = e;
				this.tabIndex = current;
			}
		}
	}
</script>
<style>
	page{
		height: 100%;
		width: 100%;
		background: #F4FBFC;
	}
</style>
<style lang="scss" scoped>
	.index-page{
		height: 100%;
		width: 100%;
		//标题栏
		.title-nview{
			background: #F4FBFC;
			z-index: 999;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: auto;
			.title-nview-content{
				display: flex;
				align-items: center;
				height: 44px;
				padding:0 30upx;
				.left,.right{
					height: 100%;
					display: flex;
					align-items: center;
					.img{
						width: 120upx;
						height: 100%;
					}
				}
				.center{
					padding: 0 20upx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex: 1;
					.tab-bar-box{
						display: flex;
						align-items: center;
						width: 200upx;
						.tab-bar-item{
							flex: 1;
						}
						.active{
							font-weight: 600;
							font-size: 36upx;
						}
					}
				}
			}
		}
		//搜索框
		.search-box{
			z-index: 999;
			width: 100%;
			height: 96upx;
			padding: 0 30upx;
			display: flex;
			align-items: center;
			background: #F4FBFC;
			.search{
				flex: 1;
			}
			.divider{
				border-right: 1px solid #d3d3d3;
				height: 34upx;
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		.body{
			height: calc(100% - 90upx);
			width: 100%;
			position: relative;
			padding: 0 20upx;
			// transform: translateY(30px);
			.arc-bg{
				width: 100%;
				position: absolute;
				left: 0;
				top:-36upx;
				height: 36upx;
				z-index: -1;
				background: url(../../static/arc.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}
			.swiper{
				height: 100%;
				width: 100%;
				.swiper-item{
					height: 100%;
					width: 100%;
					position: relative;
					.refresh-text{
						position: absolute;
						height: 40upx;
						text-align: center;
						line-height: 40upx;
						top: 0;
						left: 0;
						width: 100%;
						font-size: 24upx;
					}
					.scroll-view{
						height: 100%;
						background: #F4FBFC;
						width: 100%;
						.nav-list{
		                    width: 100%;  
							padding: 20upx 0 10upx 0;
							background: #fff;
							border-radius: 30upx;
							.nav-list-item{
								width: 200%;
								display: flex;
								flex-wrap: wrap;
								.icon-box{
									flex-shrink: 0;
									width: 10%;
									padding:0 10upx;
									padding-bottom: 30upx;
									display: flex;
									align-items: center;
									justify-content: center;
									flex-direction: column;
									.nav-icon{
										height: 76upx;
										width: 76upx;
										margin-bottom: 23upx;
									}
									.nav-text{
										font-size: 28upx;
										color: #6A6A6A;
									}
								}
								
							}
						}
						//推荐
						.recommend-box{
							background: #fff;
							border-radius: 30upx;
							margin-top: 20upx;
							padding: 20upx;
							display: flex;
							flex-wrap: wrap;
							.recommend-item{
								flex-shrink: 0;
								width: 50%;
								height: 190upx;
								.recommend-item-bg{
									height: 100%;
									width: 100%;
									background-size: 100% 100%;
									background-repeat: no-repeat;
								}
							}
							.b-l{
								border-left: 1px solid #F0F0F0;
							}
							.b-b{
								border-bottom: 1px solid #F0F0F0;
							}
						}
						//商品列表
						.goods-list{
							margin-top: 20upx;
							display: flex;
							flex-wrap: wrap;
							.goods-list-item{
								flex-shrink: 0;
								width: calc(50% - 10upx);
								margin-bottom: 20upx;
								background: #fff;
								border-radius: 16upx;
								.img{
									width: 100%;
									height: 564upx;
									border-radius: 16upx 16upx 0 0 ;
								}
								&:nth-child(2n + 1) {
									margin-right: 20upx;
								}
								.goods-info-box{
									padding: 12upx;
									overflow: hidden;
									.clamp{
										font-size: 26upx;
										display: block;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
									.price-box{
										padding-top: 12upx;
										display: flex;
										align-items: center;
										.left{
											flex: 1;
											.fs-24{
												font-size: 24upx;
												color:  #E46135;
											}
											.fs-34{
												color:  #E46135;
												font-size: 34upx;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}

	
	}
	
</style>