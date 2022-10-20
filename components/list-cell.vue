<template>
	<view class="list-cell"  hover-class="cell-hover" hover-stay-time="60" @click="jumpToPage">
		<view class="list-cell-content" :class="showBorder ? 'border-bottom' :''">
			<text class="title">{{title}}</text>
			<text class="des">{{desc}}</text>
			<slot name="right">
				<text class="font-icon icon-you"></text>
			</slot>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:'1'
			},
			desc:{
				type:String,
				default:''
			},
			url:{
				type:String,
				default:''
			},
			showBorder:{
				type:Boolean,
				default:true
			},
			canJump:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			jumpToPage(){
				if(!!this.url && this.canJump){
					uni.navigateTo({
						url:this.url
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell{
		padding-left:  30upx;
		background: #fff;
		.list-cell-content{
			padding-right: 30upx;
			min-height: 100upx;
			display: flex;
			align-items: center;
			.title{
				flex: 1;
				font-size: 30upx;
				color: #303133;
				margin-right: 10upx;
			}
			.des{
				margin-right: 10upx;
				color: #909399;
				font-size: 28upx;
			}
			.font-icon{
				font-size: 32upx;
				color: #909399;
			}
		}
	}
	.border-bottom{
		border-bottom: 1px solid #E4E7ED;
	}
	.cell-hover{
		background: #F5F5F5;
	}
</style>
