//签名
<template>
	<view class="autograph">
		<canvas type="2d" class="canvas" :style="{width:cWidth + 'px',height:cHeight + 'px'}" canvas-id="myCanvas" id="myCanvas"
			@touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></canvas>
		<view class="btn-box">
			<u-button class="btn" type="error" icon="trash" text="清空" @click="clear"></u-button>
			<u-button class="btn" type="primary" icon="download" text="保存到本地" @click="save"></u-button>
		</view>
		<view class="tips">
			<text>提示:请在上方空白区域书写签名</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cWidth: 0, //画布宽度
				cHeight:0,//画布高度
				ctx: '',
				startX: 0, //记录手势起点x坐标
				startY: 0, //记录手势起点y坐标
				endX: 0, //记录手势终点x坐标
				endY: 0, //记录手势终点y坐标
			}
		},
		onReady: function(e) {
			this.ctx = uni.createCanvasContext('myCanvas')
			uni.getSystemInfo({
				success: (res) => {
					this.cWidth = res.windowWidth
					this.cHeight = res.windowHeight * 0.3
				}
			})
			this.ctx.lineWidth = 4;
		},
		methods: {
			touchStart(e) {
				//记录初始路径坐标
				this.startX = e.touches[0].x
				this.startY = e.touches[0].y
				//每次触摸开始，开启新的路径
				this.ctx.beginPath();
			},
			touchMove(e) {
				//记录手指移动路径的坐标
				this.endX = e.touches[0].x;
				this.endY = e.touches[0].y;
				//两点画一笔
				this.ctx.moveTo(this.startX, this.startY)
				this.ctx.lineTo(this.endX, this.endY)
				this.ctx.stroke()
				this.ctx.draw(true)
				//将上一次的终点作为下一次绘制的起点
				this.startX = e.touches[0].x
				this.startY = e.touches[0].y
			},
			touchEnd(e) {
				// console.log(e);
			},
			//保存到本地
			save() {
				// #ifdef APP-PLUS
				   uni.canvasToTempFilePath({
				   	canvasId: 'myCanvas',
				   	success: function(res) {
				   		uni.saveImageToPhotosAlbum({
				   			filePath: res.tempFilePath
				   		})
				   	}
				   })
				// #endif
				
			},
			//清空当前内容
			clear() {
				uni.showModal({
					title:'提示',
					content:'确定要清空吗？',
					success: (res) => {
						if(res.confirm){
							this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
							this.ctx.draw(true);
						}
					}
				})
			
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f5f5ff;
	}
	.canvas {
		// height: 400upx;
		background: #fff;
	}
	.btn-box {
		background: #fff;
		padding: 30upx;
		display: flex;
		justify-content: space-between;
		border-top: 1px solid #f1f1f1;
		.btn {
			// margin
			margin: 0;
			// margin-left: 20upx;
			padding: 0;
			width: 220upx;
			height: 70upx;
			display: flex;
			align-items: center;
			justify-content: center;		
		}
	}
	.tips{
		padding-top: 20upx;
		color: #f50000;
		font-size: 28upx;
		text-align: center;
	}
</style>
