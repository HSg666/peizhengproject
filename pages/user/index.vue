<template>
	<view>
		<view class="op-cells"
			style="background-color: #ffffff; padding: 0 0 60rpx 0; overflow: hidden; text-align: center">
			<view style="margin-top: 40rpx">
				<view
					style="display: inline-block; width: 150rpx; height: 150rpx; border-radius: 200rpx; overflow: hidden">
					<block v-if="mine.avatar">
						<image :src="mine.avatar_url" style="width: 150rpx; height: 150rpx" />
					</block>
					<block v-else>
						<image src="/static/resource/images/avatar.jpg" style="width: 150rpx; height: 150rpx" />
					</block>
				</view>
			</view>
			<view style="padding-top: 20rpx">
				<text class="user-nickname">{{ mine.nickname ? mine.nickname : '用户' + mine._id }}</text>
			</view>
		</view>
		<view class="weui-cells op-cells" style="margin-top: 20rpx">
			<view class="weui-cell">
				<view class="weui-cell__bd">我的订单</view>
				<view class="weui-cell__ft"><text @tap="toOrders('')" style="font-size: 26rpx">全部</text></view>
			</view>
			<view class="weui-cell" style="padding: 0">
				<view class="weui-cell__bd">
					<view class="data-cell" hover-class="weui-cell_active" @tap="toOrders(1)">
						<view class="data-icon">
							<image src="/static/resource/images/od_10.png" mode="widthFix" />
						</view>
						<view class="data-txt">待支付</view>
						<text v-if="statistic.topays > 0"
							class="data-cell-hint data-cell-hint-red">{{ statistic.topays }}</text>
					</view>
				</view>
				<view class="weui-cell__bd">
					<view class="data-cell" hover-class="weui-cell_active" @tap="toOrders(2)">
						<view class="data-icon">
							<image src="/static/resource/images/od_20.png" mode="widthFix" />
						</view>
						<view class="data-txt">待服务</view>
						<text v-if="statistic.todos > 0"
							class="data-cell-hint data-cell-hint-red">{{ statistic.todos }}</text>
					</view>
				</view>
				<view class="weui-cell__bd">
					<view class="data-cell" hover-class="weui-cell_active" @tap="toOrders(3)">
						<view class="data-icon">
							<image src="/static/resource/images/od_30.png" mode="widthFix" />
						</view>
						<view class="data-txt">已完成</view>
					</view>
				</view>
				<view class="weui-cell__bd">
					<view class="data-cell" hover-class="weui-cell_active" @tap="toOrders(4)">
						<view class="data-icon">
							<image src="/static/resource/images/od_40.png" mode="widthFix" />
						</view>
						<view class="data-txt">已取消</view>
					</view>
				</view>
			</view>
		</view>
		<view class="weui-cells op-cells" style="margin-top: 20rpx">
			<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="toServiceManager">
				<view class="weui-cell__hd">
					<image src="/static/resource/images/ic_clients.png"
						style="display: block; margin-right: 20rpx; width: 20px; height: 20px"></image>
				</view>
				<view class="weui-cell__bd">服务对象管理</view>
				<view class="weui-cell__ft weui-cell__ft_in-access"></view>
			</view>
			<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="showShareModal">
				<view class="weui-cell__hd">
					<image src="/static/resource/images/ic_share.png"
						style="display: block; margin-right: 20rpx; width: 20px; height: 20px"></image>
				</view>
				<view class="weui-cell__bd">分享转发</view>
				<view class="weui-cell__ft weui-cell__ft_in-access"></view>
			</view>
		</view>
		<share :shareModal="clone_shareModal"></share>

		<!-- 手机登录弹窗 -->
		<uni-popup ref="popup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="popup-content">
				<view class="group">
					<input class="uni-input" type="tel" v-model="validMobile.phone" placeholder="手机号" />
				</view>
				<view class="group">
					<input class="uni-input" v-model="validMobile.validCode" placeholder="请输入验证码" />
					<text class="valid-text" @click="countdownChange">{{countdown.validText}}</text>
				</view>
			</view>
			<view class="btns">
				<view class="cancal" @click="cancal">取消</view>
				<view class="ok" @click="ok">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

	const app = getApp()
	const mine = ref({}) // 用户信息
	const statistic = ref({}) // 订单数量
	const popup = ref(null) // 登录弹框
	const validMobile = ref({ // 
		validCode: '', // 验证码
		phone: '' // 手机号
	})
	// 验证码
	const countdown = ref({
		validText: '获取验证码',
		time: 60, // 倒计时
	})

	onMounted(() => {

		getUserInfo()
	})

	// 获取个人信息
	const getUserInfo = () => {
		// 如果用户没登录就弹框手机验证码登录
		if (!uni.getStorageSync('token')) {
			return popup.value.open('center')
		}


		app.globalData.utils.request({
			url: '/User/index',
			method: 'GET',
			header: {
				token: uni.getStorageSync('token')
			},
			success: (res) => {
				mine.value = res.data.data.mine
				statistic.value = res.data.data.statistic

			},
			fail: res => {
				uni.showToast({
					title: res.msg
				})
			}
		})
	}
	// 去订单列表
	const toOrders = (filt) => {
		// 将选中的订单状态保存到全局，去订单列表时就能直接获取并跳转到对应的tab栏
		app.globalData.filt = filt
		uni.switchTab({
			url: '../order/index'
		})
	}

	const clone_shareModal = ref(false) // 控制转发弹窗的显/隐
	// 展示转发组件
	const showShareModal = () => {
		clone_shareModal.value = !clone_shareModal.value
	}
	// 去服务管理
	const toServiceManager = () => {
		uni.navigateTo({
			url: '../clients/index'
		})
	}



	// 登录
	let flag = false // 做防抖
	const countdownChange = () => {

		// 校验 手机号
		if (!validMobile.value.phone) {
			return uni.showToast({
				title: '请输入手机号',
				duration: 1000,
				icon: 'none'
			})
		}

		// 1.如果flag还开着,带着有定时器,那么直接return出去
		if (flag) return
		// 2.进来就打开
		flag = true
		// 3.开启定时器
		const timer = setInterval(() => {
			if (countdown.value.time <= 0) {
				countdown.value.validText = '获取验证码'
				countdown.value.time = 60
				clearInterval(timer)
				// 时间走完要关闭
				flag = false
			} else {
				countdown.value.time -= 1
				countdown.value.validText = `剩余${countdown.value.time}S`
			}
		}, 1000)

		// 获取验证码
		app.globalData.utils.request({
			url: '/get/code',
			method: 'POST',
			data: {
				tel: validMobile.value.phone // 手机号
			},
			success: res => {

				uni.showToast({
					title: '验证码发送成功,请尽快验证!',
					duration: 1000,
					icon: 'none'
				})
			},
			fail: res => {
				uni.showToast({
					title: res.msg,
					duration: 1000,
					icon: 'none'
				})
			}
		})
	}

	// 取消弹窗
	const cancal = () => {
		popup.value.close() // 关闭弹窗
	}

	// 确认弹窗
	const ok = () => {
		// 如果手机号为空 或 验证码为空,则提示用户
		if (!validMobile.value.phone || !validMobile.value.validCode) {
			return uni.showToast({
				title: '请检查输入信息',
				duration: 1000,
				icon: 'none'
			})
		}
		// 验证码验证,正式登录  
		app.globalData.utils.request({
			url: '/user/authentication',
			method: 'POST',
			data: {
				tel: validMobile.value.phone, // 手机号
				code: validMobile.value.validCode // 验证码
			},
			success: (res) => {
				// 登录成功将token设置到缓存中
				uni.setStorageSync('token', res.data.data.token)
				popup.value.close() // 关闭弹窗
				// 接下来获取用户信息
				getUserInfo()
			},
			fail: (res) => {
				popup.value.close() // 关闭弹窗
				uni.showToast({
					title: res.msg,
					duration: 1000,
					icon: 'none'
				})
			}
		})
	}
</script>

<style>
	@import './index.css';
</style>