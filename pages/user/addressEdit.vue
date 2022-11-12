<template>
	<view class="address-edit">
		<view class="list">
			<view class="list-item">
				<view class="title">
					<text>联系人</text>
				</view>
				<view class="right">
					<input v-model="addressInfo.uname" maxlength="90" placeholder="请输入联系人" />
				</view>
			</view>
			<view class="list-item">
				<view class="title">
					<text>手机号</text>
				</view>
				<view class="right">
					<input v-model="addressInfo.phoneNum" maxlength="90" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="list-item">
				<view class="title">
					<text>地址</text>
				</view>
				<view class="right" @click="chooseLocation">
					<!-- <text class="txt">{{addressInfo.address}}</text> -->
					<input type="text" v-model="addressInfo.address" value="" />
					<text class="font-icon icon-shouhuodizhi"></text>
				</view>
			</view>
			<view class="list-item">
				<view class="title">
					<text>门牌号</text>
				</view>
				<view class="right">
					<input v-model="addressInfo.doorNum" maxlength="90" placeholder="请输入门牌号" />
				</view>
			</view>
		</view>
		<view class="setting-default">
			<text>设为默认</text>
			<u-switch v-model="addressInfo.isDefault" activeColor="#e07472"  ></u-switch>
		</view>
		<view class="submit-btn-wrap">
			<button class="submit-btn" type="primary" @click="submit">提交</button>
		</view>
		<u-toast ref="uToast"></u-toast>  
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressInfo: {
					uname: '',
					address: '',
					phoneNum: '',
					doorNum: '',
					isDefault: false
				},
				type:'',
				
			}
		},
		onLoad(opt) {
			let title = ''
			if(!!opt.address && Object.keys(JSON.parse(opt.address)).length > 0){
				this.addressInfo = JSON.parse(opt.address) 
				title = '编辑收货地址';
				this.type = 'edit';
			}else{
				title = '新增收货地址';
				this.type = 'create';
			};
			uni.setNavigationBarTitle({
				title
			});
		},
		methods: {
			//选择地址
			chooseLocation() {
				// uni.getLocation({
				// 	type: 'wgs84',
				// 	success: function(res) {
				// 		const latitude = res.latitude;
				// 		const longitude = res.longitude;
				// 		uni.openLocation({
				// 			latitude: latitude,
				// 			longitude: longitude,
				// 			success: function() {
				// 				console.log('success');
				// 			}
				// 		});
				// 	}
				// });
			},
			//提交
			submit() {
				if (this.isEmpty()) {
                    if(this.type === 'create'){
						this.$api.user.CreateAddressList(this.addressInfo).then(res=>{
							this.$refs.uToast.show({
								message: '操作成功'
							});
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/user/address'
								})
							}, 2000)
						}).catch(err=>{
							this.$refs.uToast.show({
								message: err
							});
						});
					}else if(this.type === 'edit'){
						this.$api.user.EditAddressList(this.addressInfo).then(res=>{
							this.$refs.uToast.show({
								message: '操作成功'
							});
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/user/address'
								})
							}, 2000)
						}).catch(err=>{
							this.$refs.uToast.show({
								message: err
							});
						});
					};
					
				} else {
					uni.showToast({
						icon: 'none',
						title: '请填写完整'
					})
				};
			},
			//验证是否为空
			isEmpty() {
				const values = Object.values(this.addressInfo).filter(v=>{
					return typeof v !== 'boolean'
				});
				const res = values.every(v => {
					return  !!v
				})
				return res
			},

		}
	}
</script>

<style>
	page {
		background: #f5f5f5;
	}
</style>
<style lang="scss" scoped>
	.list {
		padding-top: 16upx;

		.list-item {
			background: #fff;
			padding: 0 30upx;
			height: 110upx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #E4E7ED;

			.title {
				width: 120upx;
				font-size: 30upx;
				color: #303133;
			}

			.right {
				flex: 1;
				display: flex;
				align-items: center;

				.txt,
				input {
					flex: 1;
					color: #303133;
					font-size: 30upx;
				}

				.font-icon {
					color: #909399;
					font-size: 36upx;
				}
			}
		}
	}

	.setting-default {
		display: flex;
		background: #fff;
		align-items: center;
		height: 110upx;
		margin-top: 16upx;
		padding: 0 30upx;
		justify-content: space-between;
		font-size: 30upx;
		color: #303133;
	}

	.submit-btn-wrap {
		margin: 60upx 0;
		display: flex;
		align-items: center;
		justify-content: center;

		.submit-btn {
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
</style>
