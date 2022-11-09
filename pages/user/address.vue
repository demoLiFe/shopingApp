<template>
	<view class="address-content">
		<view v-if="addressList.length > 0">
			<view class="item" v-for="(item,index) in addressList" :key="index">
				<view class="item-left">
					<view class="address-info">
						<text class="default-tag" v-show="item.isDefault">默认</text>
						<text>{{item.address}}</text>
					</view>
					<view class="person-info">
						<text>{{item.uname}}</text>
						<text class="phonem-num">{{item.phoneNum}}</text>
					</view>
				</view>
				<text class="font-icon icon-bianji" @click="jumpToEditAddress(item)"></text>
			</view>
			<view class="add-btn-wraper">
				<button class="add-btn" type="primary" @click="jumpToEditAddress()">新增地址</button>
			</view>
		</view>
		<no-data v-else></no-data>
		<u-toast ref="uToast"></u-toast>  
	</view>
</template>

<script>
	export default {
		data(){
			return {
				addressList:[]
			}
		},
		onShow() {
			this.loadAddressList();
		},
		methods:{
			//获取收货地址列表
			loadAddressList(){
				uni.showLoading({
					title:'数据加载中..'
				});
				this.$api.user.GetAddressList({}).then(res=>{
					if(res.status === 200){
						this.addressList = res.data;
					};
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					this.$refs.uToast.show({
						message: err
					});
				})
			},
			//编辑收货地址
			jumpToEditAddress(address = {}){
				uni.navigateTo({
					url:`/pages/user/addressEdit?address=${JSON.stringify(address)}`
				})
			},
		}
	}
</script>

<style>
	page{
		height: 100%;
		width: 100%;
	}
</style>
<style lang="scss" scoped>
	.address-content{
		height: 100%;
		width: 100%;
		padding-bottom: 112upx;
		.item{
			padding: 20upx 30upx;
			border-bottom: 1px solid #E4E7ED;
			display: flex;
			align-items: center;
			.item-left{
				flex: 1;
				.address-info{
					color: #303133;
					font-size: 30upx;
					display: flex;
					align-items: center;
					.default-tag{
						display: block;
						line-height: 1;
						padding: 4upx 10upx;
						margin-right: 10upx;
						color: #fa436a;
						border: 1px solid #ffb4c7;
						border-radius: 4upx;
						font-size: 24upx;
					}
				}
				.person-info{
					color: #909399;
					font-size: 28upx;
					margin-top: 16upx;
					.phonem-num{
						padding-left: 30upx;
					}
				}
			}
			.font-icon{
				padding-left: 30upx;
				color: #909399;
				font-size: 40upx;
			}
		}
		.add-btn-wraper{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 112upx;
			display: flex;
			align-items: center;
			justify-content: center;
			.add-btn{
				margin: 0;
				background: #fa436a;
				width: 690upx;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				border-radius: 10upx;
				font-size: 32upx;
			}
		}
	}
</style>
