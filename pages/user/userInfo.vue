<template>
	<view class="user-info">
		<view class="user-avatar-box">
			<u-avatar :src="userinfo.avatar" size="80"></u-avatar>
			<text class="tip" @click="chooseAvatar">更换头像</text>
		</view>
		<view class="list">
			<view class="list-cell" >
				<view class="list-cell-content">
					<view class="title">
						<text>用户昵称</text>
					</view>
					<view class="content">
						<u--input fontSize="26rpx" border="none"  placeholder="请输入昵称" v-model="userinfo.userName" type="text" value="" />
					</view>
					<text class="font-icon icon-you"></text>
				</view>
			</view>
			<view class="list-cell"  hover-class="cell-hover" hover-stay-time="60" @click="jumpToIntroduction">
				<view class="list-cell-content">
					<view class="title">
						<text>个人介绍</text>
					</view>
					<view class="content">
						<text>{{!!userinfo.introduce ? userinfo.introduce : '这个人很懒，什么也没留下'  }}</text>
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
						<text>{{userinfo.gender}}</text>
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
						<text>{{userinfo.autograph}}</text>
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
		<view class="btn-box">
			<text>保存修改</text>
		</view>
		<view class="tips">
			<text>提示:修改后内容需要保存后才生效</text>
		</view>
	</view>
</template>

<script>
	import bus from '../../utils/bus.js'
	import {mapState} from 'vuex'
	export default {
		data(){
			return {
				userinfo:{}
			}
		},
		onLoad(opt) {
			bus.$on('introduceChange',(data)=>{
				this.userinfo.introduce = data;
			});
			//拷贝
			this.userinfo = Object.assign({},this.userInfo)
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
			})
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
						this.userinfo.gender = itemList[res.tapIndex]
					}
				})
			},
			//跳转去个人介绍
			jumpToIntroduction(){
				uni.navigateTo({
					url:`/pages/user/introduction?introduce=${JSON.stringify(this.userinfo.introduce)}`
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
				overflow: hidden;
				.title{
					color: #303133;
					font-size: 28upx;
					width: 200upx;
				}
				.content{
					font-size: 26upx;
					flex: 1;
					color: #ccc;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
		}
		.cell-hover{
			background: #F5F5F5;
		}
	}
	.btn-box{
		padding: 30upx;
		background: #fff;
		text-align: center;
		color: #f50000;
		margin-top: 30upx;
	}
	.tips{
		margin: 20upx 0;
		text-align: center;
		color: #f50000;
		font-size: 24upx;
	}
</style>