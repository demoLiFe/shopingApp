<template>
	<view class="cart">
		<view class="cart-list" v-if="cartList.length > 0">
			<view class="list-item" v-for="(item,index) in cartList" :key="index">
				<view class="image-wraper">
					<view class="custom-check-box " @click="checked(item,index)">
						<text class="font-icon  icon-xuanzhong2" :class="item.checked ? 'checked' : ''"  ></text>
					</view>
					<image :src="item.image" ></image>
				</view>
				<view class="center">
					<text class="title ">{{item.title}}</text>
					<text class="attr">{{item.attr_val}}</text>
					<text class="price">¥{{item.price}}</text>
					<view class="btn-wraper">
						<uni-number-box
							class="number-box"
							:min="1" 
							:max="item.stock"
							:value="item.number>item.stock?item.stock:item.number"
							:isMax="item.number>=item.stock?true:false"
							:isMin="item.number===1"
							:index="index"
							@change="numberChange($event,index)"
						></uni-number-box>
					</view>
				</view>
				<view class="right">
					<text class="font-icon icon-fork" @click="deleteCartItem(index)"></text>
				</view>
			</view>
		</view>
		
		<!-- 底部按钮容器 -->
		<view class="bottom-btn-box">
			<view class="left-btn">
				<image class="custom-check-box" :src="isCheckAll ? '/static/selected.png' : '/static/select.png'" @click="checkAll"></image>
				<view class="clear-btn " :class="isCheckAll ? 'show' : 'hide'" @click="clearCart">
					<text>清空</text>
				</view>
			</view>
			<view class="total-box">
				<text class="price">¥{{totalMoney}}</text>
				<text class="coupon">已优惠<text style="color: #303133">10</text>元</text>
			</view>
			<button class="right-btn" type="primary" @click="jumpToPay"><text>去结算</text></button>
			
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				isCheckAll:true,
				totalMoney:0,
				cartList:[
					{
							id: 1,
							image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg',
							attr_val: '春装款 L',
							stock: 15,
							title: 'OVBE 长袖风衣',
							price: 278.00,
							number: 1
						},
						{
							id: 3,
							image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
							attr_val: '激光导航 扫拖一体',
							stock: 3,
							title: '科沃斯 Ecovacs 扫地机器人',
							price: 1348.00,
							number: 5
						},
						{
							id: 4,
							image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
							attr_val: 'XL',
							stock: 55,
							title: '朵绒菲小西装',
							price: 175.88,
							number: 1
						},
						{
							id: 5,
							image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
							attr_val: '520 #粉红色',
							stock: 15,
							title: '迪奥（Dior）烈艳唇膏',
							price: 1089.00,
							number: 1
						},
						{
							id: 6,
							image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
							attr_val: '樱花味润手霜 30ml',
							stock: 15,
							title: "欧舒丹（L'OCCITANE）乳木果",
							price: 128,
							number: 1
						},
						{
							id: 7,
							image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
							attr_val: '特级 12个',
							stock: 7,
							title: '新疆阿克苏苹果 特级',
							price: 58.8,
							number: 10
						},
						{
							id: 8,
							image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
							attr_val: '激光导航 扫拖一体',
							stock: 15,
							title: '科沃斯 Ecovacs 扫地机器人',
							price: 1348.00,
							number: 1
						},
						{
							id: 9,
							image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
							attr_val: 'XL',
							stock: 55,
							title: '朵绒菲小西装',
							price: 175.88,
							number: 1
						},
						{
							id: 10,
							image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
							attr_val: '520 #粉红色',
							stock: 15,
							title: '迪奥（Dior）烈艳唇膏',
							price: 1089.00,
							number: 1
						},
						{
							id: 11,
							image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
							attr_val: '樱花味润手霜 30ml',
							stock: 15,
							title: "欧舒丹（L'OCCITANE）乳木果",
							price: 128,
							number: 1
						},
						{
							id: 12,
							image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
							attr_val: '特级 12个',
							stock: 7,
							title: '新疆阿克苏苹果 特级',
							price: 58.8,
							number: 10
						},
						{
							id: 13,
							image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552405266625&di=a703f2b2cdb0fe7f3f05f62dd91307ab&imgtype=0&src=http%3A%2F%2Fwww.78.cn%2Fzixun%2Fnews%2Fupload%2F20190214%2F1550114706486250.jpg',
							attr_val: '春装款/m',
							stock: 15,
							title: '女装2019春秋新款',
							price: 420.00,
							number: 1
						}
				]
			}
		},
		onLoad() {
			this.cartList.forEach(v=>{
				if(this.isCheckAll){
					v.checked = true
				}else {
					v.checked = false
				};
			})
			this.computedTotal();
		},
		methods:{
			//全选
			checkAll(){
				this.isCheckAll = !this.isCheckAll;
				this.cartList.forEach(obj=>{
					obj.checked = this.isCheckAll
				})
				this.computedTotal();
			},
			//单个选中
			checked(item,index){
				this.$set(this.cartList[index],'checked',!item.checked)
				this.isCheckAll = this.cartList.every(v=>{
					return v.checked
				});
				this.computedTotal();
				this.$forceUpdate()
			},
			//计算总金额
			computedTotal(){
				this.totalMoney = this.cartList.reduce((pre,next)=>{
					if(next.checked){
						return pre + next.price * next.number
					}else {
						return (pre + next.price * next.number) - next.price * next.number
					};
					return pre + next.price * next.number
				},0).toFixed(2)
			},
			//删除购物车商品
			deleteCartItem(index){
				uni.showModal({
					title:'是否删除当前商品？',
					success(res) {
						if(res.confirm){
							
						}
					}
				})
			},
			//清空购物车
			clearCart(){
				uni.showModal({
					title:'是否清空购物车？',
					success(res) {
						if(res.confirm){
							
						}
					}
				})
			},
			//数量切换
			numberChange(val,index){
				this.cartList[index].number = val;
				this.computedTotal();
			},
			//去结算
			jumpToPay(){
				if(Number(this.totalMoney) === 0){
					uni.showToast({
						icon:'none',
						title:'请至少选择一件商品'
					})
					return;
				};
				uni.navigateTo({
					url:'/pages/cart/createOrder'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.cart{
	   padding-bottom: 134upx;
	}
	//列表
	.cart-list{
		.list-item{
			display: flex;
			background: #fff;
			// align-items: flex-start;
			padding: 30upx 40upx;
			border-bottom: 1upx solid #E4E7ED;
			.image-wraper{
				border-radius: 8upx;
				background: #f3f3f3;
				font-size: 0;
				height: 230upx;
				width: 230upx;
				position: relative;
				.custom-check-box{
					border-radius: 50%;
					background: #fff;
					position: absolute;
					left:-16upx;
					top: -16upx;
					text-align: center;
					z-index: 2;
					.font-icon{
						font-size: 46upx;
						color: #C0C4CC;;
					}
					.checked{
						color: #fa436a;
					}
				}
				
				image{
					height: 100%;
					width: 100%;
				}
			}
			.center{
				flex: 1;
				padding-left: 30upx;
				display: flex;
				overflow: hidden;
				flex-direction: column;
				justify-content: space-between;
				.title{
					height: 40upx;
					line-height: 40upx;
					color: #303133;
					font-size: 30upx;
					display: inline-block;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.attr{
					font-size: 26upx;
					height: 50upx;
					display: inline-block;
					line-height: 50upx;
					color: #909399;
				}
				.price{
					height: 50upx;
					display: inline-block;
					line-height: 50upx;
					color: #303133;
					font-size: 30upx;
				}
				.btn-wraper{
					width: 230upx;
					height: 70upx;
					background: #f5f5f5;
					display: flex;
					justify-content: center;
					align-items: center;
					.number-box{
						// flex: 1;
						display: flex;
						align-items: center;
					}
				}
			}
			.right{
				padding: 4upx 10upx;
				display: flex;
				align-items: flex-start;
				color: #909399;
				font-size: 34upx;
				height: 50upx;
			}
		}
	}
	
	.bottom-btn-box{
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		display: flex;
		z-index: 2;
		height: 100upx;
		position: fixed;
		width: 690upx;
		bottom: 30upx;
		left: 50%;
		padding: 0 32upx;
		border-radius: 16upx;
		transform: translate(-50%);
		box-shadow: 0px 0upx 22upx 0 rgba(0,0,0,.5);
		background: rgba(255, 255, 255, 0.9);
		align-items: center;
		.left-btn{
			position: relative;
			.custom-check-box{
				height: 52upx;
				z-index: 99;
				width: 52upx;
				position: absolute;
				left: 0;
				top: 0;
			}
			.clear-btn{
				font-size: 30upx;
				height: 52upx;
				line-height: 52upx;
				border-radius:100upx;
				background: #C0C4CC;
				color: #fff;
			}
			.show{
				animation: showClearBtn .3s forwards;
				padding-left: 60upx;
			}
			.hide{
				animation: hideClearBtn .3s forwards;
				padding-left: 0upx;
			}
			@keyframes showClearBtn{
				0% {
					width: 0upx;
					opacity: 0;
				}
				50% {
					width: 74upx;
					opacity: .5;
				}
				100% {
					width: 148upx;
					opacity: 1;
				}
			}
			@keyframes hideClearBtn{
				0% {
					width: 148upx;
					opacity: 1;
				}
				50% {
					width: 74upx;
					opacity: .5;
				}
				100% {
					width: 0upx;
					opacity: 0;
				}
			}
		}
		.total-box{
			flex: 1;
			padding-right: 46upx;
			display: flex;
			flex-direction: column;
			text-align: right;
			.price{
				font-size: 34upx;
				color: #303133;
			}
			.coupon{
				font-size: 26upx;
				color: #909399;
			}
		}
		.right-btn{
			padding: 0 40upx;
			border-radius: 200upx;
			background: #fa436a;
			height: 82upx;
			line-height: 82upx;
			font-size: 32upx;
		}
	}
	
</style>
