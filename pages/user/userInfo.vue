<template>
	<view class="user-info">
		<view class="user-avatar-box">
			<u-avatar :src="userInfo.avatar" size="80"></u-avatar>
			<text class="tip" @click="chooseAvatar">更换头像</text>
		</view>
		<view class="list">
			<view class="list-cell" hover-class="cell-hover" hover-stay-time="60">
				<view class="list-cell-content">
					<view class="title">
						<text>用户昵称</text>
					</view>
					<view class="content">
						<text>{{userInfo.nickName}}</text>
					</view>
					<text class="font-icon icon-you"></text>
				</view>
			</view>
			<view class="list-cell"  hover-class="cell-hover" hover-stay-time="60">
				<view class="list-cell-content">
					<view class="title">
						<text>个人介绍</text>
					</view>
					<view class="content">
						<text>{{userInfo.introduce}}</text>
					</view>
					<text class="font-icon icon-you"></text>
				</view>
			</view>
			<view class="list-cell"  hover-class="cell-hover" hover-stay-time="60" @click="chooseGender">
				<view class="list-cell-content">
					<view class="title">
						<text>性别</text>
					</view>
					<view class="content">
						<text>{{userInfo.gender}}</text>
					</view>
					<text class="font-icon icon-you"></text>
				</view>
			</view>
			<view class="list-cell"  hover-class="cell-hover" hover-stay-time="60" @click="jumpToAutograph">
				<view class="list-cell-content">
					<view class="title">
						<text>个性签名</text>
					</view>
					<view class="content">
						<text>{{userInfo.autograph}}</text>
					</view>
					<text class="font-icon icon-you"></text>
				</view>
			</view>
			<view class="list-cell"  hover-class="cell-hover" hover-stay-time="60" @click="jumpToQrcode">
				<view class="list-cell-content">
					<view class="title">
						<text>我的二维码</text>
					</view>
					<view class="content">
						<text></text>
					</view>
					<text class="font-icon icon-you"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				userInfo:{
					avatar:'',
					nickName:'',
					introduce:'',
					gender:'',
					autograph:''
				}
				
			}
		},
		methods:{
			//更换头像
			chooseAvatar(){
				uni.chooseImage({
					sourceType:['album','camera'],
				    count:1,
					success: (data) => {
						const {tempFilePaths} = data;
					    console.log(tempFilePaths);	
					}
				})
			},
			//选择性别
			chooseGender(){
				const itemList = ['男','女']
				uni.showActionSheet({
					itemList,
					success: (res) => {
						this.userInfo.gender = itemList[res.tapIndex]
					}
				})
			},
			//签名
			jumpToAutograph(){
				uni.navigateTo({
					url:'/pages/user/autograph'
				})
			},
			//二维码
			jumpToQrcode(){
				uni.navigateTo({
					url:'/pages/user/qrcode'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #f5f5f5;
	}
	.user-avatar-box{
		height: 400upx;
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.tip{
			margin-top: 30upx;
			color: #f50000;
		}
	}
	.list{
		background: #fff;
		.list-cell{
			padding-left: 30upx ;			
			.list-cell-content{
				padding: 30upx;
				padding-left: 0;
				display: flex;
				align-items: center;
				width: 100%;
				border-top: 1px solid #E4E7ED;
				.title{
					color: #303133;
					font-size: 28upx;
					width: 200upx;
				}
				.content{
					flex: 1;
				}
			}
		}
		.cell-hover{
			background: #F5F5F5;
		}
	}
	
</style>