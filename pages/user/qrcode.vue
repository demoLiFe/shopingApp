<template>
	<view class="qrcode">
			<view class="qrcode-wraper">
				<uqrcode ref="uqrcode" canvas-id="qrcode" :value="qrcodeVal" @complete="qrcodeComplete" :options="{ margin: 10 }"></uqrcode>
			</view>
			<u-button class="btn" type="primary" @click="qrcodeSave" text="保存到相册"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				qrcodeVal:'123456789',//二维码生成内容
				qrcodeStatus:false,//二维码是否生成
			}
		},
		methods:{
			qrcodeComplete(res){
				this.qrcodeStatus = res.success
			},
			qrcodeSave(){
				if(this.qrcodeStatus){
					//导出二维码临时文件路径
					this.$refs.uqrcode.toTempFilePath({
					  success: res => {
						const {tempFilePath} = res
						//保存到本地相册 除H5
						// #ifndef H5
						   uni.saveImageToPhotosAlbum({
						       filePath: tempFilePath,
						       success: res => {
						           console.log(res);
						       },
						       fail: err => {
						           console.log(err);
						       }
						   });
						// #endif
						// #ifdef H5
							const aEle = document.createElement('a');
							aEle.download = 'uQRCode'; // 设置下载的文件名，默认是'下载'
							aEle.href = tempFilePath;
							document.body.appendChild(aEle);
							aEle.click();
							aEle.remove(); // 下载之后把创建的元素删除
						// #endif
					  }
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #f5f5f5;
	}
	.qrcode{
		background: #fff;
		padding: 30upx;
	}
	.qrcode-wraper{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 500upx;
	}
	.btn{
		width: 680upx;
		background: #f34167;
		border: none;
	}
</style>