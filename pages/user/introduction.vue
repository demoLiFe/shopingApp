<template>
	<view class="introduction">
		<u--textarea height="150" :count="true" :adjustPosition="false" v-model="introduction"  confirmType="done" placeholder="说点什么介绍一下自己吧" ></u--textarea>
		<view class="btn-box">
			<u-button class="btn" type="primary" text="确定" @click="confirm"></u-button>
		</view>
	</view>
</template>

<script>
	import bus from '../../utils/bus.js'
	export default {
		data(){
			return {
				introduction:''
			}
		},
		onLoad(data) {
			if(Object.keys(data).length > 0){
				this.introduction = JSON.parse(data.introduce)
			}
		},
		methods:{
			//确定
			confirm(){
				bus.$emit('introduceChange',this.introduction)
				uni.navigateBack({
					delta:1
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #f5f5f5;
	}
	.introduction{
		background: #fff;
		padding: 30upx;
		.textarea{
			
		}
		.btn-box{
			margin-top: 30upx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.btn{
				background: var(--base-color);
				margin: 0 ;
				border: none;
				padding: 0;
				height: 70upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 26upx;
				width: 200upx;
			}
		}
	}
</style>