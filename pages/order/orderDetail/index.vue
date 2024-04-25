<template>
	<view>
		<view class="od-banner">
			<image class="od-banner-icon" src="/static/resource/images/od_bg_icon.png" mode="widthFix" />
			<view :class="'od-jd od-jd-'+orderStatus">
				<view class="od-jd-out">
					<view class="od-jd-in"></view>
				</view>
				<view class="vp-flex od-jd-text">
					<view class="vp-flex_1">
						<text class="od-jd-st-0">填写订单</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-10">在线支付</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-20">专人服务</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-30">服务完成</text>
					</view>
				</view>
			</view>
		</view>

		<view class="order-status">
			<!-- 待付款 -->
			<block v-if="orderStatus == 10">
				<view><text class="od-st">订单待支付</text></view>
				<view class="od-stt">
					请在
					<counter style="font-size: 24rpx" :second="order._exp_time" @counterOver="onCounterOver" />
					内完成支付，超时订单自动取消
				</view>
				<view class="od-op">
					<button class="btnp" @click="dopay(order.code_url)">立即支付（{{order.price}}元）</button>
				</view>
			</block>
			<!-- 进行中 -->
			<block v-if="orderStatus == 20">
				<block v-if="order.service_state == 0">
					<view><text class="od-st">正在为您安排服务专员...</text></view>
					<view class="od-stt">请保持手机畅通，稍后将有服务专员与您联系</view>
				</block>
				<block v-if="order.service_state == 1">
					<view><text class="od-st">服务进行中</text></view>
					<view class="od-stt">已安排服务专员，将于预约时间进行服务</view>
				</block>
			</block>
			<!-- 已完成 -->
			<block v-if="orderStatus == 30">
				<view><text class="od-st">服务已完成</text></view>
				<view class="od-stt">感谢您的使用，如有售后问题请联系客服</view>
			</block>
			<!-- 已取消 -->
			<block v-if="orderStatus == 40">
				<view><text class="od-st">订单已取消</text></view>
				<view class="od-stt">期待下次为您服务，如需帮助可咨询客服</view>
			</block>
		</view>
		<block v-if="orderStatus == 20">
			<view class="od-box">
				<view class="weui-cells">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label od-box-tt">本次服务专员</view>
						</view>
						<view class="weui-cell__bd"></view>
					</view>
					<view class="weui-cell od-staff">
						<view class="weui-cell__hd">
							<view>
								<image :src="order._staff.avatar_url" mode="aspectFill" class="od-staff-avatar" />
							</view>
						</view>
						<view class="weui-cell__bd">
							<view>{{ order._staff.nickname }}</view>
						</view>
						<view class="weui-cell__ft">
							<view>
								<button class="btn1m" @tap="makePhoneCall(order._staff.mobile)">电话联系</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>

		<view class="od-box">
			<view class="weui-cells">
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label od-box-tt">预约信息</view>
					</view>
					<view class="weui-cell__bd"></view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">预约服务</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>
							{{ order.service_name }}
						</view>
					</view>
				</view>
				<block v-if="order.service_stype <= 20">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.hospital_name }}
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">期望就诊时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								<formater :timestamp="order.starttime" format="YYYY-MM-dd hh:mm"></formater>
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊人</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.client_name }} {{ order.client_sex == 1 ? '男' : '女' }}
								{{ order.client_age }}周岁</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊人电话</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.tel }}
							</view>
						</view>
					</view>
					<block v-if="order.service_stype == 15">
						<view class="weui-cell">
							<view class="weui-cell__hd">
								<view class="weui-label">接送地址</view>
							</view>
							<view class="weui-cell__bd"></view>
							<view class="weui-cell__ft">
								<view>
									{{ order.receiveAddress }}
								</view>
							</view>
						</view>
					</block>
				</block>
				<block v-if="order.service_stype > 20 && order.service_stype < 100">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">所在医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.hospital_name }}
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">期望处理时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								<formater :timestamp="order.starttime" format="YYYY-MM-dd hh:mm"></formater>
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">收件人</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.address.userName }} {{ order.address.telNumber }}</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">收件地址</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.address.cityName }}{{ order.address.countyName }}{{ order.address.detailInfo }}
							</view>
						</view>
					</view>
				</block>
				<block v-if="order.service_stype > 100">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">期望服务时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								<formater :timestamp="order.starttime" format="YYYY-MM-dd hh:mm"></formater>
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">服务对象</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.client_name }} {{ order.client_sex == 1 ? '男' : '女' }}
								{{ order.client_age }}周岁</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">服务对象电话</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.client_mobile }}
							</view>
						</view>
					</view>

					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">服务地址</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.address.address }}
							</view>
						</view>
					</view>
				</block>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">其他需求</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>
							{{ order.demand }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="od-box">
			<view class="weui-cells">
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label od-box-tt">订单信息</view>
					</view>
					<view class="weui-cell__bd"></view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">联系电话</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>
							{{ order.tel }}
						</view>
					</view>
				</view>

				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">下单时间</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>
							<formater :timestamp="order.order_start_time" format="YYYY-MM-dd hh:mm"></formater>
						</view>
					</view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">应付金额</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>{{ order.price }}元</view>
					</view>
				</view>

				<block v-if="orderStatus == 20">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">实付金额</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.price }}元</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">付款时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								<formater :timestamp="order.pay_time" format="YYYY-MM-dd hh:mm"></formater>
							</view>
						</view>
					</view>
				</block>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">订单编号</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view class="color_click">
							{{ order.out_trade_no }}
						</view>
					</view>
				</view>

				<navigator class="weui-cell weui-cell_access" url="../index/server">
					<view class="weui-cell__hd">
						<view class="weui-label">联系客服</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft weui-cell__ft_in-access">疑问或投诉</view>
				</navigator>
			</view>
		</view>

		<!-- 支付二维码弹窗 -->
		<uni-popup ref="QRCodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<image src="/static/resource/images/modal_closer.png" style="display:block;width:30rpx;height:30rpx"
					@click="closeQRCodePopup">
				</image>
				<view class="text-center">微信扫一扫</view>
				<canvas id="qrcode" canvas-id="qrcode" style="width: 400rpx;height: 400rpx;"></canvas>
				<view class="text-center">请用本人微信扫描以上二维码</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import UQRCode from 'uqrcodejs';
	import {
		ref,
		computed,
	} from "vue"

	const app = getApp() // 获取uniapp实例
	const order = ref({}) // 订单数据
	const QRCodePopup = ref(null) // 二维码
	// 将订单状态映射为数字
	const orderStatus = computed(() => {
		let map = {
			"待支付": '10',
			"待服务": '20',
			"已完成": '30',
			"已取消": '40',
		}
		return map[order.value.trade_state]
	})

	onLoad((option) => {
		getOrderDetail(option.oid)
	})

	// 获取订单详情
	const getOrderDetail = (oid) => {
		app.globalData.utils.request({
			url: '/order/detail',
			method: 'GET',
			header: {
				token: uni.getStorageSync('token')
			},
			data: {
				oid // 订单id
			},
			success: res => {
				order.value = res.data.data
				console.log(order.value, 'res');
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

	// 倒计时结束重新获取订单详情
	const onCounterOver = () => {
		getOrderDetail()
	}
	// 将微信支付url转换为微信二维码
	const formatWXPayToQRCode = (url) => {
		// 获取uQRCode实例
		var qr = new UQRCode();
		// 设置二维码内容
		qr.data = url;
		// 设置二维码大小，必须与canvas设置的宽高一致
		qr.size = 200;
		// 调用制作二维码方法
		qr.make();
		// 获取canvas上下文
		var canvasContext = uni.createCanvasContext('qrcode'); // 如果是组件，this必须传入
		// 设置uQRCode实例的canvas上下文
		qr.canvasContext = canvasContext;
		// 调用绘制方法将二维码图案绘制到canvas上
		qr.drawCanvas();
	}

	// 立即支付
	const dopay = (url) => {
		// 先显示二维码弹框，再调接口，支付url给UQRCode函数，渲染展示到qrcode view标签上
		QRCodePopup.value.open('center')
		// 弹出二维码支付
		formatWXPayToQRCode(url)
	}

	// 关闭二维码弹窗并去订单列表
	const closeQRCodePopup = () => {
		QRCodePopup.value.close()
		uni.switchTab({
			url: '../../order/index'
		})
	}

	// 电话联系
	const makePhoneCall = (tel) => {
		uni.makePhoneCall({
			phoneNumber: tel
		});
	}
</script>

<style>
	@import './index.css';
</style>