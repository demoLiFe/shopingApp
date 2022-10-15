<template>
	<view class="pay-page">
		<!-- 支付金额 -->
		<view class="price-box">
			<text>支付金额</text>
			<view class="bottom">
				<text class="price-tip">￥</text>
				<text class="price">888</text>
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="pay-type-list">
			<radio-group @change="radioChange">
				<view class="pay-type-list-item">
					<text class="item-icon font-icon icon-weixinzhifu"></text>
					<view class="item-content">
						<text class="title">微信支付</text>
						<text class="des">推荐使用微信支付</text>
					</view>
					<view class="item-radios">
						<radio value="1" color="#f85e52" :checked="payType  === 1" />
					</view>
				</view>
				<view class="pay-type-list-item">
					<text class="item-icon font-icon icon-alipay"></text>
					<view class="item-content">
						<text class="title">支付宝支付</text>
					</view>
					<view class="item-radios">
						<radio value="2" color="#f85e52" :checked="payType  === 2" />
					</view>
				</view>
				<view class="pay-type-list-item">
					<text class="item-icon font-icon icon-erjiye-yucunkuan"></text>
					<view class="item-content">
						<text class="title">预存款支付</text>
						<text class="des">可用余额199</text>
					</view>
					<view class="item-radios">
						<radio value="3" color="#f85e52" :checked="payType  === 3" />
					</view>
				</view>
			</radio-group>
		</view>
		<!-- 按钮 -->
		<button type="primary" class="btn" @click="confirmPay">确认支付</button>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				payType:1
			}
		},
		methods:{
			radioChange(e){
				const {value} = e.detail;
				this.payType = value;
			},
			//确认支付
			confirmPay(){
				uni.redirectTo({
					url:'/pages/cart/paySuccess'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	 .price-box{
		 display: flex;
		 flex-direction: column;
		 justify-content: center;
		 align-items: center;
		 height: 168upx;
		 font-size: 28upx;
		 color: #909399;
		 .bottom{
			 margin-top: 12upx;
			 color: #303133;
			 .price-tip{
				 font-size: 40upx;
			 }
			 .price{
				 font-size: 50upx;
			 }
		 }
		 
	 }
	 
	 //支付方式
	 .pay-type-list{
		 margin-top: 20upx;
		 background: #fff;
		 padding-left: 60upx;
		 .pay-type-list-item{
			 height: 120upx;
			 font-size: 30upx;
			 display: flex;
			 align-items: center;
			 padding: 20upx 0;
			 padding-right: 60upx;
			 border-bottom: 1px solid #E4E7ED;
			 .item-icon{ 
				 width: 100upx;
				 font-size: 52upx;
			 }
			 .icon-weixinzhifu{
				 color: #36cb59;
			 }
			 .icon-alipay{
				 color: #01aaef;
			 }
			 .icon-erjiye-yucunkuan{
				 color: #fe8e2e;
			 }
			 .item-content{
				 flex: 1;
				 display: flex;
				 flex-direction: column;
				 font-size: 24upx;
				 color: #909399;
				 .title{
					 color: #303133;
					 font-size: 32upx;
					 margin-bottom: 4upx;
				 }
			 }
		 }
	 }
	 .btn{
		 font-size: 32upx;
		 background-color: #fa436a;
		 width: 630upx;
		 border-radius: 10upx;
		 margin: 80upx auto 30upx;
	 }
</style>
