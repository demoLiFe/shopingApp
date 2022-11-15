<template>
	<view class="collection">
		<view class="search-box">
			 <u--input
			    v-model="searchKey"
			    class="input"
			    prefixIcon="search"
			 	prefixIconStyle="font-size: 22px;color: #909399;margin:0 20upx;"
			    :adjustPosition="false"
			    inputAlign="center"
			    placeholder="请输入内容"
			    border="none"
			    clearable
				@change="inputChange"
			  ></u--input>
		</view>
		<scroll-view scroll-y="true" class="scroll-view" @scrolltolower="lower">
			<view class="list" v-if="collectionList.length > 0">
				<view class="list-item" v-for="(item,index) in collectionList" :key="index">
					<view class="content">
						<view class="title">
							<text>{{item.title}}</text>
						</view>
						<u--image :showLoading="true" :src="item.img" width="50px" height="50px" ></u--image>
					</view>
					<view class="bottom">
						<text class="name">{{item.name}}</text>
						<text>{{item.date}}</text>
					</view>
				</view>				
				<u-loadmore style="padding: 20rpx 0;" v-if="collectionList.length > 5" :status="loadStatus"  :loadmoreText="loadText.loadmoreText" :loading-text="loadText.loadingText" :nomore-text="loadText.nomoreText"  dashed line />
			</view>
			<no-data v-else></no-data>
		</scroll-view>
		<u-toast ref="uToast"></u-toast>  
	</view>
</template>

<script>
	export default {
		data(){
			return {
				searchKey:'',
				timer:null,
				pageNum:1,
				pageSize:20,
				loadStatus: 'loadmore',
				loadText: {
					loadingText: '努力加载中..',
					loadmoreText: '上拉加载',
					nomoreText: '到底啦'
				},
				collectionList:[]
			}
		},
		onLoad() {
			this.loadCollectionList()
		},
		onUnload() {
			clearTimeout(this.timer)
		},
		methods:{
			inputChange(){
				this.pageNum = 1;
				this.collectionList = [];
				this.loadStatus = 'loadmore';
				this.debounce(this.loadCollectionList,1000)
			},
			debounce(fn,wait){
				if(this.timer){
					clearTimeout(this.timer)
				};
				this.timer = setTimeout(()=>{
					fn()
				},wait)
			},
			//触底加载
			lower(){
				this.loadStatus = 'loading';
				this.pageNum ++ ;
				if(this.pageNum < 5){//模拟只有5页数据 后期更改
					this.loadCollectionList();
				}else{
					this.loadStatus = 'nomore';
				}
			},
			//加载收藏列表
			loadCollectionList(){
				if(this.page === 1){
					uni.showLoading({
						title:'数据加载中..'
					});
				};
				this.$api.user.GetCollectionList({searchKey:this.searchKey}).then(res=>{
					if(res.status === 200){
						this.collectionList = this.collectionList.concat(res.data);
					};
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					this.$refs.uToast.show({
						message: err
					});
				})
			}
		}
	}
</script>

<style>
	page{
		background: #f5f5f5;
		height: 100%;
		width: 100%;
	}
</style>
<style lang="scss" scoped>
	.collection{
		height: 100%;
		width: 100%;
		padding: 0 20upx;
		.search-box{
			width: 100%;
			height: 120upx;
			display: flex;
			align-items: center;
			justify-content: center;
			.input{
				background: #fff ;
				height: 80upx ;
				line-height: 80upx ;
			}
		}
		.scroll-view{
			height: calc(100% - 120upx);
			width: 100%;
			.list{
				.list-item{
					background: #fff;
					padding: 30upx;
					margin-bottom: 20upx;
					.content{
						display: flex;
						overflow: hidden;
						.title{
							font-size: 28upx;
							margin-right: 20upx;
							word-break: break-all;
							flex: 1;
						}
					}
					.bottom{
						padding-top: 40upx;
						display: flex;
						font-size: 24upx;
						color: #707070;
						.name{
							flex: 1;
						}
					}
				}
			}
		}
	}
	
</style>