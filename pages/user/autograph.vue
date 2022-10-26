//签名
<template>
	<view class="autograph">
		<canvas type="2d" class="canvas" :style="{width:cWidth + 'px'}" canvas-id="myCanvas" id="myCanvas"
			@touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></canvas>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cWidth: 0, //画布
				ctx: '',
				startX: 0, //记录手势起点x坐标
				startY: 0, //记录手势起点y坐标
				endX: 0, //记录手势终点x坐标
				endY: 0 //记录手势终点y坐标
			}
		},
		onReady: function(e) {
			this.ctx = uni.createCanvasContext('myCanvas')
			uni.getSystemInfo({
				success: (res) => {
					this.cWidth = res.windowWidth
				}
			})
			this.ctx.lineWidth = 4;
			this.ctx.lineCap = "round"
			// this.ctx.lineJoin = "round"
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
				this.points = [];
				// console.log(e);
			},
			//保存到本地
			save() {
				uni.canvasToTempFilePath({
					canvasId: 'myCanvas',
					success: function(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath
						})
					}
				})
			},
			//清空当前内容
			clear() {
				this.ctx.clearRect(0, 0, canvasw, canvash);
				this.ctx.draw(true);
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f5f5ff;
	}

	.canvas {
		height: 400upx;
		background: #fff;
	}
</style>
