<template>
	<view class="login">
		<view class="content">
			<view class="title">登陆</view>
			<u--form errorType="border-bottom" labelPosition="left" :model="form" :rules="rules" ref="uForm">
				<u-form-item class="mg-top-20" leftIcon="account" leftIconStyle="font-size: 22px;color: #909399;" prop="account"
					borderBottom>
					<u--input v-model="form.account" border="none">
					</u--input>
				</u-form-item>
				<u-form-item class="mg-top-20" leftIcon="lock" leftIconStyle="font-size: 22px;color: #909399;" prop="password"
					borderBottom>
					<u--input v-model="form.password" border="none">
					</u--input>
				</u-form-item>
			</u--form>
			<view class="btn-wraper">
				<u-button class="btn" type="primary" @click="submit" text="确定"></u-button>
			</view>
			<view class="regist-box">
				<text @click="jumpToForgetPassWord">忘记密码？</text>
				<text @click="jumpToRegist">立即注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rules: {
					account: [{
						required: true,
						message: '请输入账号',
						trigger: ['blur', 'change']
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}],
				},
				form: {
					account: '',
					password: ''
				}
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			// #ifdef MP-WEIXIN
			this.$refs.uForm.setRules(this.rules)
			// #endif
		},
		methods: {
           submit(){
			  this.$refs.uForm.validate().then(res => {
			  	uni.$u.toast('校验通过')
			  }).catch(errors => {
			  	uni.$u.toast('校验失败',errors)
			  })
		   },
		   //忘记密码
		   jumpToForgetPassWord(){
			   uni.navigateTo({
			   	    url:'/pages/login/forgetPassWord'
			   })
		   },
		   //注册
		   jumpToRegist(){
			   uni.navigateTo({
			   	  url:'/pages/login/regist'
			   })
		   }
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		width: 100%;
	}

	.login {
		height: 100%;
		width: 100%;
		.title {
			margin-bottom: 160upx;
			font-size: 40upx;
		}
		.content {
			padding: 0 40upx;
			padding-top: 240upx;
			height: 100%;
			width: 100%;
			.mg-top-20{
				margin-top: 20upx;
			}
			.btn-wraper{
				margin-top: 100upx;
				.btn{
					border: none;
					background: #fa436a;
				}
			}
			.regist-box{
				color: #909399;
			   font-size: 28upx;
			   margin-top: 100upx;
			   display: flex;
			   align-items: center;
			   justify-content: space-between;
			}
		}
	}
</style>
