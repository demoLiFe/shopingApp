<template>
	<view class="create-order">
		<!-- 地址 -->
		<view class="address-section">
			<view class="address">
				<view class="left">
					<text class="font-icon icon-shouhuodizhi"></text>
				</view>
				<view class="center">
					<view class="top">
						<text class="name">{{addressInfo.name}}</text>
						<text class="mobile">{{addressInfo.mobile}}</text>
					</view>
					<view class="bottom">
						<text>{{addressInfo.address}}</text>
					</view>
				</view>
				<view class="right">
					<text class="font-icon icon-you"></text>
				</view>
			</view>
		</view>
		<!-- 商品 -->
		<view class="goods-section">
			<view class="goods-header">
				<view class="logo">
					
				</view>
				<view class="name">
					<text>店铺</text>
				</view>
			</view>
			<view class="goods-list">
				<view class="goods-item" v-for="(item,index) in goodsList" :key="index">
					 <image src="" mode=""></image>
					 <view class="right">
					 	 <text class="title">{{item.title}}</text>
						 <text class="spec">{{item.spec}}</text>
						 <view class="price-box">
						 	<text class="price">{{item.price}}</text>
							<text class="num">x{{item.num}}</text>
						 </view>
					 </view>
				</view>
				
			</view>
		</view>
		
		<!-- 列表 -->
		<view class="list">
			<view class="list-cell">
				<view class="cell-icon">
					<text>券</text>
				</view>
				<view class="cell-content">
					<text class="title">优惠券</text>
				</view>
				<view class="cell-right fc-base">
					<text >选择优惠券</text>
				</view>
			</view>
			<view class="list-cell">
				<view class="cell-icon">
					<text>减</text>
				</view>
				<view class="cell-content">
					<text class="title">商家促销</text>
				</view>
				<view class="cell-right fc-90">
					<text>暂无可用优惠券</text>
				</view>
			</view>
		</view>
		
		<view class="list">
			<view class="list-cell">
				<view class="cell-content">
					<text class="title">商品金额</text>
				</view>
				<view class="cell-right ">
					<text >￥199</text>
				</view>
			</view>
			<view class="list-cell">
				<view class="cell-content">
					<text class="title">优惠金额</text>
				</view>
				<view class="cell-right fc-base">
					<text >￥19</text>
				</view>
			</view>
			<view class="list-cell">
				<view class="cell-content">
					<text class="title">运费</text>
				</view>
				<view class="cell-right fc-base">
					<text >免运费</text>
				</view>
			</view>
			<view class="list-cell">
				<view class="remarks">
					<text class="title">备注</text>
				</view>
				<input class="input" type="text" value="" placeholder="请输入备注信息" />
			</view>
		</view>
		
		<!-- 底部 -->
		<view class="bottom-box">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">199</text>
			</view>
			<button class="submit" type="primary" @click="submit">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				addressInfo:{
					name:'刘星星',
					mobile:182023114224,
					address:'成都市成华区长天路18号'
				},
				goodsList:[
					{
						title:'古黛妃 短袖t恤女夏装2019新款',
						spec:'春装款 L',
						price:'￥17.8',
						num:'1'
					},
					{
						title:'古黛妃 短袖t恤女夏装2019新款',
						spec:'春装款 L',
						price:'￥17.8',
						num:'1'
					}
				]
			}
		},
		methods:{
			submit(){
				uni.navigateTo({
					url:'/pages/cart/payPage'
				})
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
	.create-order{
		padding-bottom: 100upx;
	}
	//地址
	.address-section{
		background: #fff;
		padding: 30upx 0;
		.address{
			display: flex;
			align-items: center;
			.left{
				width: 90upx;
				color: #888;
				display: flex;
				align-items: center;
				justify-content: center;
				.icon-shouhuodizhi{
					font-size: 46upx
				}
			}
			.center{
				flex: 1;
				.top{
				   .name{
					   margin-right: 24upx;
					   font-size: 34upx;
				   }	
				}
				.bottom{
					margin-top: 16upx;
					margin-right: 20upx;
					color: #909399;
				}
			}
			.right{
				font-size: 32upx;
				color: #909399;
				margin-right: 30upx
			}
		}
	}
	
	//商品
	.goods-section{
		margin-top: 16upx;
		background: #fff;
		.goods-header{
			height: 82upx;
			padding: 0 30upx;
			border-bottom: 1px solid #E4E7ED;
			display: flex;
			align-items: center;
			.logo{
				height: 50upx;
				width: 50upx;
				border-radius: 200upx;
			}
			.name{
				font-size: 30upx;
				color: #606266;
				margin-left: 24upx
			}
		}
		.goods-list{
			.goods-item{
				padding: 20upx 30upx;
				display: flex;
				image{
					height: 140upx;
					width: 140upx;
					border-radius: 4upx;
				}
				.right{
					padding-left: 24upx;
					flex: 1;
					overflow: hidden;
					.title{
						font-size: 30upx;
						color: #303133;
						display: block;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					.spec{
						color: #909399;
						font-size:26upx;
					}
					.price-box{
						font-size: 32upx;
						color: #303133;
						padding-top: 10upx;
						display: flex;
						align-items: center;
						.price{
							margin-bottom: 4upx;
						}
						.num{
							color: #606266;
							font-size: 26upx;
							margin-left: 20upx;
						}
					}
				}
			}
		}
	}
	//列表
	.list{
		margin-top: 16upx;
		background: #fff;
		padding-left: 40upx;
		.list-cell{
			padding: 10upx 30upx 10upx 0upx;
			display: flex;
			align-items: center;
			border-bottom: 1upx solid #E4E7ED;
			line-height: 70upx;
			// height: 70upx;
			.cell-icon{
				font-size: 22upx;
				color: #fff;
				border-radius: 4upx;
				height: 32upx;
				width: 32upx;
				background: #f85e52;
				text-align: center;
				line-height: 32upx;
				margin-right: 12upx;
			}
			.cell-content{
				font-size: 26upx;
				color: #909399;
				flex: 1;
				margin-right: 10upx;
				overflow: hidden;
				.title{
					display: block;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
			.remarks{
				font-size: 26upx;
				color: #909399;
				width: 90upx;
				margin-right: 10upx;
			}
			.cell-right{
				color: #303133;
				font-size: 26upx;	
			}
			.input{
				width: 100%;
				font-size: 26upx;
				color: #303133;
			}
			.fc-base{
				color: #fa436a;
			}
			.fc-90{
				color: #909399;
			}
		}
	}
	//底部
	.bottom-box{
		height: 90upx;
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		color: #606266;
		font-size: 30upx;
		.price-content{
			flex: 1;
			padding-left: 30upx;
			.price-tip{
				color: #fa436a;
				margin-left: 8upx
			}
			.price{
				font-size: 36upx;
				color: #fa436a;
			}
		}
		.submit{
			width: 280upx;
			font-size: 32upx;
			height: 100%;
			border-radius: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #fa436a;
		}
	}
</style>
