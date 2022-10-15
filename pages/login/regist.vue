<template>
	<view class="regist">
		<view class="content">
			<u--form errorType="border-bottom" labelPosition="left" :model="form" :rules="rules" ref="uForm">
				<u-form-item class="mg-top-20" label="用户名" labelWidth="60" prop="uname" borderBottom>
					<u--input v-model="form.uname" border="none">
					</u--input>
				</u-form-item>
				<u-form-item class="mg-top-20" label="密码" labelWidth="60" prop="password" borderBottom>
					<u--input v-model="form.password" border="none">
					</u--input>
				</u-form-item>
				<u-form-item class="mg-top-20" label="手机号" labelWidth="60" prop="password" borderBottom>
					<u--input v-model="form.phoneNum" border="none">
					</u--input>
				</u-form-item>
				<u-form-item class="mg-top-20" label="验证码" labelWidth="60" prop="password" borderBottom>
					<u--input v-model="form.validateCode" border="none">
						<template slot="suffix">
							<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
							<u-button  @tap="getCode" :text="tips" type="primary" class="getcode-btn"></u-button>
						</template>
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
					phoneNum: [{
						required: true,
						message: '请输入手机号',
						trigger: ['blur', 'change']
					}],
					validateCode: [{
						required: true,
						message: '请输入验证码',
						trigger: ['blur', 'change']
					}],
				},
				form: {
					uname: '',
					password: '',
					phoneNum: '',
					validateCode: ''
				},
				tips: '获取验证码'
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			// #ifdef MP-WEIXIN
			this.$refs.uForm.setRules(this.rules)
			// #endif
		},
		methods: {
			submit() {
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败', errors)
				})
			},
			codeChange(text) {
				this.tips = text;
			},
			//获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		width: 100%;
	}

	.regist {
		.content {
			padding: 0 40upx;
			height: 100%;
			width: 100%;

			.mg-top-20 {
				margin-top: 20upx;
			}

			.getcode-btn {
				height: 50upx;
				line-height: 50upx;
				border: none;
				background: #fa436a;
			}

			.btn-wraper {
				margin-top: 100upx;

				.btn {
					border: none;
					background: #fa436a;
				}
			}
		}
	}
</style>
