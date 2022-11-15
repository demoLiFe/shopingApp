<template>
	<view class="publish-appraise">
		<view class="content">
			<view class="goods-info">
				<u--image :showLoading="true" :src="goodInfo.img" width="60px" height="60px"></u--image>
				<view class="right">
					<text class="clamp">{{goodInfo.goodsName}}</text>
					<text class="clamp attr">{{goodInfo.goodsAttr}}</text>
				</view>
			</view>
			<u--textarea v-model="appraise" border="none" confirmType="done" placeholder="请输入评价内容"></u--textarea>
			<view class="choose-img-box" @click="chooseImage">
                 <u-icon name="plus" size="26"></u-icon>
				 <text class="tips">上传图片</text>
			</view>
			<view class="bottom-box">
				<u-checkbox-group>
					<u-checkbox  size="16" shape="circle" activeColor="var(--base-color)" labelColor="#a3a3a3" labelSize="26rpx" label="匿名" name="1">
					</u-checkbox>
				</u-checkbox-group>
				<view class="tips-box" @click="showPopup = true">
					<text class="tips-txt">匿名会隐藏头像和昵称</text>
					<u-icon name="question-circle"></u-icon>
				</view>
			</view>
		</view>
        <view class="btn-box">
        	<u-button class="btn" type="primary" text="发表" @click="publish"></u-button>
        </view>
		<!-- 弹出层 -->
		<u-popup :show="showPopup" mode="bottom" :round="10"  @close="popClose" >
			<view class="popup-content">
				<view class="popup-content-header">
					<text>详细说明</text>
				</view>
				<view class="popup-content-body">
					<text class="title">选择匿名评价</text>
					<text class="txt">评价在评论区展示是，你的用户名和头像将不对外展示，展示方式如下:</text>
					<view class="example-box">
						<u-avatar ></u-avatar>
						<text class="nick-name">匿名卖家</text>
					</view>
					<text class="title mg-top-40">取消匿名评价</text>
					<text class="txt">评价在评论区展示是，你的用户名和头像将对外展示;</text>
					<text class="txt">用户昵称和头像展示方式如下:</text>
					<view class="example-box">
						<u-avatar ></u-avatar>
						<text class="nick-name">你的昵称</text>
					</view>
				</view>
				<view class="popup-content-bottom">
					<u-button class="btn" type="primary" text="完成" @click="showPopup = false"></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPopup:false,
				goodInfo:{
					img:'',
					goodsName:'',
					goodsAttr:''
				},
				appraise: '',
				pictureList:[]
			}
		},
		onLoad(opt) {
			if(Object.keys(opt).length > 0){
				this.goodInfo = JSON.parse(opt.goodinfo)
			};
		},
		methods:{
			//选择图片
			chooseImage(){
				uni.chooseImage({
					count:5,
					success: (res) => {
						console.log(res);
					}
				})
			},
			//发布
			publish(){
				
			},
			//弹层关闭
			popClose(){
				this.showPopup = false;
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
	.publish-appraise {
		padding: 20upx;
		.content {
			padding: 20upx 30upx;
			background: #fff;
			.goods-info {
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
			.choose-img-box {
				height: 160upx;
				width: 100%;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				border: 1px dashed #ccc;
				.tips{
					padding-top: 18upx;
					font-size: 26upx;
				}
			}
			.bottom-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;
				font-size: 26upx;
				color: #a3a3a3 ;
				.check-box{
					font-size: 26upx;
				}
				.tips-box{
					display: flex;
					align-items: center;
					.tips-txt{
						padding-right: 10upx;
					}
				}
			}
		}
		.btn-box{
			margin-top: 100upx;
			.btn{
				background: var(--base-color);
				border: none;
			}
		}
		
		//弹出层样式
		.popup-content{
			.popup-content-header{
				height: 100upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
			}
			.popup-content-body{
				padding: 20upx;
				font-size: 28upx;
				height: 500upx;
				overflow-y: auto;
				display: flex;
				flex-direction: column;
				.mg-top-40{
					margin-top: 40upx;
				}
				.title{
					padding-bottom: 10upx;
				}
				.txt{
					color: #909090;
					padding-bottom: 10upx;
				}
				.example-box{
					padding: 20upx;
					background: #e7e7e7;
					border-radius: 14upx;
					display: flex;
					align-items: center;
					.nick-name{
						font-size: 30upx;
						padding-left: 20upx;
					}
				}
			}
			.popup-content-bottom{
				padding: 20upx;
				.btn{
					border: none;
					background: var(--base-color);
				}
			}
		}
		
	}
</style>
