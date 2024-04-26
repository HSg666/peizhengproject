<template>
	<view>
		<view style="width: 100%; border-bottom: 0 none; position: fixed; z-index: 2">
			<view style="background: #ffffff; position: relative">
				<view class="h-tab vp-flex">
					<view :class="'h-tab-item vp-flex_1 ' + (filt == '' ? 'on' : '')" @tap="onFilterChange('')">全部
					</view>
					<view :class="'h-tab-item vp-flex_1 ' + (filt == 1 ? 'on' : '')" @tap="onFilterChange(1)">待支付</view>
					<view :class="'h-tab-item vp-flex_1 ' + (filt == 2 ? 'on' : '')" @tap="onFilterChange(2)">待服务</view>
					<view :class="'h-tab-item vp-flex_1 ' + (filt == 3 ? 'on' : '')" @tap="onFilterChange(3)">已完成</view>
					<view :class="'h-tab-item vp-flex_1 ' + (filt == 4 ? 'on' : '')" @tap="onFilterChange(4)">已取消</view>
				</view>
			</view>
		</view>

		<view style="height: 100rpx"></view>
		<block v-if="list != null">
			<view v-if="list != null && list.length == 0" style="padding: 40rpx 40rpx 40rpx 40rpx; text-align: center">
				<image src="/static/resource/images/empty.png" mode="widthFix" style="width: 200rpx" />
				<view class="f5">没有相关内容~</view>
			</view>
			<view v-else class="od-list">
				<block v-for="(item, index) in list" :key="index">
					<view class="od-item" @tap="toOrder(item.out_trade_no)">
						<view class="weui-cell weui-cell_access">
							<view class="weui-cell__hd">
								<view>
									<image :src="item.service_logo_image_url" mode="widthFix" class="od-logo"
										style="width: 100rpx; height: 100rpx; margin-right: 20rpx" />
								</view>
							</view>
							<view class="weui-cell__bd">
								<view>
									<text style="font-weight: bold">{{ item.service_name }}</text>
								</view>
								<view class="od-info">
									<block v-if="item.service_stype <= 20">
										<view>
											<text>{{ item.hospital_name }}（{{ item.area_name }}）</text>
										</view>
										<view>
											预约时间：
											<formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
										</view>
										<view>
											就诊人员：
											<text>{{ item.client_name }}</text>
										</view>
									</block>
									<block v-if="item.service_stype > 20 && item.service_stype < 100">
										<view>
											<text>{{ item.hospital_name }}（{{ item.area_name }}）</text>
										</view>
										<view>
											处理时间：
											<formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
										</view>
									</block>
									<block v-if="item.service_stype > 100">
										<view>
											服务时间：
											<formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
										</view>
										<view>
											服务对象：
											<text>{{ item.client_name }}</text>
										</view>
										<!-- <view>服务地址：<text>{{item.address.address}}</text> </view> -->
									</block>
								</view>
							</view>
							<view class="weui-cell__ft">
								<!-- 待付款 -->
								<block v-if="item.trade_state == '待支付'">
									<view style="color: #ffa200"><text>待支付</text></view>
									<view style="color: #ffa200">
										<counter style="font-size: 24rpx" :second="item._exp_time"
											@counterOver="onCounterOver" />
									</view>
								</block>
								<!-- 进行中 -->
								<block v-if="item.trade_state == '待服务'">
									<view style="color: #1da6fd"><text>待服务</text></view>
								</block>
								<!-- 已完成 -->
								<block v-if="item.trade_state == '已完成'">
									<view style="color: #21c521"><text>已完成</text></view>
								</block>
								<!-- 已取消 -->
								<block v-if="item.trade_state == '已取消'">
									<view style="color: #999999"><text>已取消</text></view>
								</block>
							</view>
						</view>
					</view>
				</block>
			</view>
		</block>


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
	import UQRCode from 'uqrcodejs';
	import {
		ref,
		reactive,
		computed,
		toRaw,
		onMounted
	} from "vue"
	const app = getApp() // 获取uniapp实例
	const filt = ref('') // tab标志
	const list = ref([]) // 订单列表
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
		console.log(app.globalData.filt, ' app.globalData.filt');
		// 获取从个人中心保存到全局的订单状态值
		filt.value = app.globalData.filt
		getOrderList()
	})

	// 切换tab栏
	const onFilterChange = (status) => {
		if (filt.value == status) return
		filt.value = status // 将选中的tab标识赋值给选中标识，用于页面样式的切换
		getOrderList(status)
	}

	// 获取订单列表
	const getOrderList = () => {
		// 如果用户没登录就弹框手机验证码登录
		if (!uni.getStorageSync('token')) {
			return popup.value.open('center')
		}

		app.globalData.utils.request({
			url: '/order/list',
			method: 'GET',
			header: {
				token: uni.getStorageSync('token')
			},
			data: {
				state: filt.value
			},
			success: res => {
				list.value = res.data.data
				console.log(res.data.data, 'res');
			},
			fail: res => {
				console.log(res, 'res');
			}
		})
	}
	// 倒计时结束重新获取订单列表
	const onCounterOver = () => {
		filt.value = ''
		getOrderList()
	}

	// 去订单详情
	const toOrder = (id) => {
		uni.navigateTo({
			url: `./orderDetail/index?oid=${id}`
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
				// 接下来获取订单列表
				getOrderList()
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
	@import "./index.css"
</style>