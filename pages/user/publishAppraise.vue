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
				<text>匿名会隐藏头像和昵称</text>
			</view>
		</view>
        <view class="btn-box">
        	<u-button class="btn" type="primary" text="发表" @click="publish"></u-button>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				
			}
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
			}
		}
		.btn-box{
			margin-top: 100upx;
			.btn{
				background: var(--base-color);
				border: none;
			}
		}
	}
</style>
