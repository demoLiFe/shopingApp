<template>
	<view class="forget-password">
		<view class="content">
			<u--form errorType="border-bottom" labelPosition="left" :model="form" :rules="rules" ref="uForm">
				<u-form-item class="mg-top-20" label="账号" labelWidth="75" prop="account"
					borderBottom>
					<u--input v-model="form.account" border="none">
					</u--input>
				</u-form-item>
				<u-form-item class="mg-top-20" label="用户名" labelWidth="75" prop="uname"
					borderBottom>
					<u--input v-model="form.uname" border="none">
					</u--input>
				</u-form-item>
				<u-form-item class="mg-top-20" label="新密码" labelWidth="75" prop="password"
					borderBottom>
					<u--input v-model="form.password" border="none">
					</u--input>
				</u-form-item>
				<u-form-item class="mg-top-20" label="确认密码" labelWidth="75" prop="password"
					borderBottom>
					<u--input v-model="form.confirmPassword" border="none">
					</u--input>
				</u-form-item>
			</u--form>
			<view class="btn-wraper">
				<u-button class="btn" type="primary" @click="submit" text="提交"></u-button>
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
					uname: [{
						required: true,
						message: '请输入用户名',
						trigger: ['blur', 'change']
					}],
					password: [{
						required: true,
						message: '请输入新密码',
						trigger: ['blur', 'change']
					}],
					confirmPassword: [{
						required: true,
						message: '请输入新密码',
						trigger: ['blur', 'change']
					}],
				},
				form: {
					account: '',
					uname:'',
					password: '',
					confirmPassword:''
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
		
		}
	}
</script>

<style lang="scss" scoped> 
	page {
		height: 100%;
		width: 100%;
	}
	.forget-password{
		.content {
			padding: 0 40upx;
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
		}
	}
</style>
