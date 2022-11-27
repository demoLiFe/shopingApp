<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			this.$store.commit('setUserInfo',uni.getStorageSync('userInfo') || {})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/*
		全局公共样式和字体图标
	*/
   @import '/static/fonticon/fonticon.css';	
   @import 'uview-ui/index.scss';
   view,
   scroll-view,
   swiper,
   swiper-item,
   cover-view,
   cover-image,
   icon,
   text,
   rich-text,
   progress,
   button,
   checkbox,
   form,
   input,
   label,
   radio,
   slider,
   switch,
   textarea,
   navigator,
   audio,
   camera,
   image,
   video {
   	box-sizing: border-box;
   }
   :root{
	   --base-color:#fa436a
   }
</style>
