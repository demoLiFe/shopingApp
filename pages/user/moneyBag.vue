<template>
	<view class="money-bag">
		<view class="bg-section">
			<view class="money-balance-box">
				<view class="top">
					<text class="title">余额</text>
					<text class="money">888</text>
				</view>
				<u-button class="btn" type="primary" text="充值" @click="openPopup"></u-button>
			</view>
		</view>
		<u-popup :show="showPopup" @close="close" :round="10">
			<view class="popup-header">
				<u-icon name="close" @click="showPopup = false"></u-icon>
			</view>
			<view class="grid">
				<view class="grid-item" v-for="(item,index) in moneyAmountList" :key="index">
					<view class="content-item" :class="amountCurrent === index ? 'content-item-active' : ''" @click="amountCurrent = index">
						<!-- 自定义金额 -->
						<view class="custom-amount" v-if="item.amount === 'custom'">
							<u--input
							    class="input"
							    v-if="showInput && amountCurrent === index"
							    placeholder="请输入"
								fontSize="12"
							    clearable
							  >
								  <template slot="suffix">
									  <text>元</text>
								  </template>
							  </u--input>
							<text v-else @click="showInput = true">自定义</text>
						</view>
						<!-- 内置金额 -->
						<text v-else>{{item.amount}}元</text>
					</view>
				</view>
				<u-button class="btn" type="primary" text="下一步" @click="nextStep"></u-button>
			</view>
			
	    </u-popup>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				amountCurrent:0,
				showPopup:false,
				showInput:false,
				inputMoney:'',
				moneyAmountList:[
					{
					   amount:30,
					},
					{
					   amount:100,
					},
					{
					   amount:200,
					},
					{
					   amount:300,
					},
					{
					   amount:500,
					},
					{
					   amount:1000,
					},
					{
					   amount:'custom',
					},
				]
			}
		},
		methods:{
			//打开弹窗
			openPopup(){
				this.showPopup = true;
			},
			//关闭
			close(){
				this.showPopup = false
			},
			//下一步
			nextStep(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f5f5f5;
	}
	.bg-section{
		height: 300upx;
		width: 100%;
		border-radius: 0 0 20upx 20upx;
		position: relative;
		background: #f34167;
		.money-balance-box{
			width: 700upx;
			background: #fff;
			position: absolute;
			top: 80upx;
			left: 50%;
			border-radius: 20upx;
			transform: translate(-50%);
			padding: 50upx;
			.top{
				display: flex;
				flex-direction: column;
				text-align: center;
				margin-bottom: 60upx;
				.title{
					font-size: 24upx;
					padding-bottom: 20upx;
					color: #959595;
				}
				.money{
					font-size: 40upx;
				}
			}
			.btn{
				border: none;
				background:#f34167;
			}
		}
	}
	.popup-header{
		// height: 60upx;
		display: flex;
		justify-content: flex-end;
		padding:30upx;
	}
	.grid{
		// height: 400upx;
		display: flex;
		padding:30upx 40upx;
		flex-wrap: wrap;
		.grid-item{
			flex-shrink: 0;
			display: flex;
			flex: 0 0 25%;
			align-items: center;
			justify-content: center;
			.content-item{
				margin-bottom: 20upx;
				line-height: 120upx;
				height: 120upx;
				text-align: center;
				border-radius: 10upx;
				width: 150upx;
				font-size: 24upx;
				background: #f8f8ff;
				.custom-amount{
					height: 100%;
					width: 100%;
					.input{
						height: 100%;
						width: 100%;
					}
				}
				
			}
			.content-item-active{
				color: #f34167;
				border: 1px solid #f34167;
			}
		}
		.btn{
			margin: 20upx 0;
			border: none;
			background:#f34167;
		}
	}

</style>