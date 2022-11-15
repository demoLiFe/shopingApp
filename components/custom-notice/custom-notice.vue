<template>
	<view class="custom-notice" :class="showNotice ? 'open' : ''" v-if="showNotice">
		<view class="custom-notice-content">
			<view class="left">
				<text class="title clamp">{{title}}</text>
				<text class="content clamp">{{content}}</text>
			</view>
			<u-icon name="close-circle" color="#fff" @click="close"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props:{},
		data(){
			return {
				showNotice:false,
				title:'',
				content:'',
			}
		},
		methods:{
			close(){
				this.showNotice = false
			},
			open(){
				this.showNotice = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.custom-notice{
		display: flex;
		align-items: center;
		height: 120upx;
		padding: 0 20upx;
		position: absolute;
		left: 0;
		width: 100%;
		z-index: 999;
		top: var(--status-bar-height);
		transform: translateY(-120upx);
		transition: all .5s; 
		.custom-notice-content{
			display: flex;
			align-items: center;
			width: 100%;
			padding:10upx 20upx;
			background: rgba(0, 0, 0, .9);
			border-radius: 14upx;
			.left{
				color: #fff;
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				.clamp{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.title{
					font-size: 28upx;
				}
				.content{
					font-size: 24upx;
				}
			}
		}
	}
	.open{
	   animation: open .5s forwards;
	}
	@keyframes open{
		0% {
			transform: translateY(-120upx);
			opacity: 0;
		}
		100% {
			transform: translateY(0upx);
			opacity: 1;
		}
	}
</style>