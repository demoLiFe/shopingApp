<template>
	<view class="custom-status-bar" :style="{height:statusBarHeight + 'px'}"></view>
</template>

<script>
	export default {
		data(){
			return {
				statusBarHeight:0,
			}
		},
		created() {
			const systemtInfo = uni.getSystemInfoSync()
			this.statusBarHeight = systemtInfo.statusBarHeight
		},
	}
</script>

<style lang="scss" scoped>
	.custom-status-bar{
		height: var(--status-bar-height);
	}
</style>