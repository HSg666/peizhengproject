<template>
	<view>

		<view class="od-banner">
			<image class="od-banner-icon" src="/static/resource/images/od_bg_icon.png" mode="widthFix" />
			<view class="od-jd od-jd-0">
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
		<view class="pub-box">
			<view class="pub-box-bd">
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd">
						<image class="serv-icon"
							:src="service.icon_image ? service.icon_image_url : '../../static/resource/images/avatar.jpg'"
							mode='widthFix' />
					</view>
					<view class="weui-cell__bd">
						<text class="serv-name">{{ service.name }}</text>
					</view>
					<view class="weui-cell__ft">
						<view class="f5 ic_info" @click="handleServiceTap">服务内容</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 非代跑取药的，例如尊享陪诊 -->
		<block v-if="hospitals.length > 0 && service.stype == '10' || service.stype == '15'	|| service.stype == '20' ">
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd" style="display: flex;width: 100%;">
							<view class="weui-label">
								就诊医院
							</view>
							<view class="weui-cell__bd">
							</view>
							<view class="weui-cell__ft weui-cell__ft_in-access">
								<view>
									<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
										range-key="name">
										<input type="text" :disabled="true" placeholder="请选择要就诊的医院"
											:value="hospitals[hospital_index].name"
											placeholder-class="vp-placeholder" />
									</picker>
								</view>
							</view>
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd" style="display: flex;width: 100%;">
							<view class="weui-label">
								就诊时间
							</view>
							<view class="weui-cell__bd">
							</view>
							<view class="weui-cell__ft weui-cell__ft_in-access">
								<view>
									<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
										placeholder="请选择就诊时间"></dtPicker>
								</view>
							</view>
						</view>
					</view>
					<view class="weui-cell weui-cell_input" @click="goSelectPerson">
						<view class="weui-cell__hd" style="display: flex;width: 100%;">
							<view class="weui-label">
								就诊人
							</view>
							<view class="weui-cell__bd">
							</view>
							<view class="weui-cell__ft weui-cell__ft_in-access">
								<view>
									<input type="text" class="weui-input" :value="personInfo.name" placeholder="请选择就诊人"
										placeholder-class="vp-placeholder" :disabled="true"
										style="text-align: right;" />
								</view>
							</view>
						</view>
					</view>
					<!-- 尊享陪诊 -->
					<block v-if="service.stype == 15">
						<view class="weui-cell weui-cell_input">
							<view class="weui-cell__hd">接送地址</view>
							<view class="weui-cell__bd">
								<input class="weui-input" name="receiveAddress" style="text-align: right"
									placeholder-class="vp-placeholder" placeholder="请填写就诊人所在地址"
									v-model="order.receiveAddress" />
							</view>
						</view>
					</block>

					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">联系电话</view>
						<view class="weui-cell__bd">
							<input class="weui-input" type="number" name="tel" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
						</view>
					</view>
				</view>
			</view>
			<view class="pub-box">
				<view class="pub-box-tt">服务需求</view>
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__bd">
							<textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.."
								placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- 代跑取药的 -->
		<block v-if="hospitals.length > 0 && service.stype == '30' || service.stype == '40'	 ">
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">所在医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
									range-key="name">
									<input type="text" :disabled="true" placeholder="请选择就诊所在医院"
										:value="hospitals[hospital_index].name" placeholder-class="vp-placeholder" />
								</picker>
							</view>
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">服务时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
									placeholder="请选择期望服务时间"></dtPicker>
							</view>
						</view>
					</view>

					<view class="weui-cell weui-cell_input" @click="onAddressChange">
						<view class="weui-cell__hd">
							<view class="weui-label">收件信息</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<input class="weui-input" :disabled="true" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请选择收件信息" :value="userReceiveInfo" />
							<!-- {{order.address?(order.address.userName+'('+order.address.telNumber+')'):''}} -->
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">联系电话</view>
						<view class="weui-cell__bd">
							<input class="weui-input" type="number" name="tel" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
						</view>
					</view>
				</view>
			</view>
			<view class="pub-box">
				<view class="pub-box-tt">服务需求</view>
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__bd">
							<textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.."
								placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
						</view>
					</view>
				</view>
			</view>
		</block>


		<view style="height: 300rpx"></view>
		<!-- 悬浮提交按钮 -->
		<view class="vp-foot">
			<view style="background: #ffffff; padding: 20rpx">
				<view class="xieyi" style="text-align: center">
					<text :class="'is_xieyi ' + (is_xieyi ? 'is_xieyi_on' : '')" @click="onXieyiChange">我已阅读并同意</text>
					<navigator :url="cfg.page_xy">《用户协议》</navigator>
					<text>和</text>
					<navigator :url="cfg.page_fw">《服务协议》</navigator>
				</view>
				<view>
					<button :class="'btnp ' + (is_xieyi ? '' : 'btnp-disabled')" @click="submit">
						确认下单
						<block v-if="order.price > 0">（支付{{ order.price }}元）</block>
					</button>
				</view>
			</view>
		</view>

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

		<!-- 支付二维码弹窗 -->
		<uni-popup ref="QRCodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<image src="/static/resource/images/modal_closer.png" style="display:block;width:30rpx;height:30rpx"
					@click="closeQRCodePopup">
				</image>
				<view class="text-center">微信扫一扫</view>
				<!-- 关键 -->
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
		reactive,
		computed,
		toRaw
	} from "vue"

	const app = getApp() // 获取uniapp实例
	const service = ref({}) // 服务内容
	const hospital_index = ref(0) // 选中的医院索引
	const hospitals = ref([]) // 可选医院数组
	const cfg = reactive({ // 服务协议
		page_xy: '',
		page_fw: ''
	})
	const is_xieyi = ref(false) // 默认不勾选协议
	// 订单数据
	const order = reactive({
		price: '', // 价格
		starttime: 0, // 就诊时间
		tel: '', // 联系电话
		demand: '', // 服务需求
		address: {
			userName: '',
			cityName: '',
			countyName: '',
			detailInfo: ''
		},
		receiveAddress: '', // 接送地址
	})
	// 用户收货信息
	const userReceiveInfo = ref('')
	const personInfo = ref({
		name: '',
		age: '',
		mobile: '',
		sex: '',

	}) // 就诊人姓名
	// 登录弹窗
	const popup = ref(null)
	// 校验登录信息
	const validMobile = ref({
		validCode: '', // 验证码
		phone: '', // 手机号
	})
	// 验证码
	const countdown = ref({
		validText: '获取验证码',
		time: 60, // 倒计时
	})
	const QRCodePopup = ref(null) // 二维码



	onLoad((option) => {
		getServiceDetail(option)
		// console.log(option, 'option');
	})


	// 获取服务详情
	const getServiceDetail = (option) => {
		const {
			svid,
			hid
		} = option
		app.globalData.utils.request({
			url: '/Service/order',
			data: {
				svid
			},
			success: (res) => {
				// console.log(1111111111111111);
				service.value = res.data.data.service // 服务相关信息
				console.log(service.value.stype, 'service.value');
				hospitals.value = res.data.data.hospitals // 可选医院数组
				// 如果当前url中有医院的id，那么从可选医院数组中找出对应的医院名称和价格出来
				if (option.hid > 0) {
					// 将响应式数组转化为响应式之前的数组，也就是普通数组
					const hospitalsData = toRaw(hospitals.value)
					for (let i = 0; i < hospitalsData.length; i++) {
						let hosI = hospitalsData[i]
						if (hosI.id == option.hid) {
							hospital_index.value = i; // 选中的索引
							order.price = hosI.service_price ?? ''; // 医院价格
							break;
						}
					}
				}
				// console.log(res.data.data.service, '1111111res');
			}
		})
	}
	// 服务内容
	const handleServiceTap = () => {

	}

	// 监听选择的医院   将用户选中的索引和医院价格更新一下
	const onHospitalChange = (e) => {
		const changeIndex = parseInt(e.detail.value)
		hospital_index.value = changeIndex
		order.price = hospitals.value[changeIndex].service_price ?? ''
		// console.log(order.price, 'order.price');
	}
	// 选择就诊时间
	const onStartTimeChanged = (e) => {
		order.starttime = e.detail.value
		// console.log(e.detail.value, '1111')
	}
	// 就诊人
	const goSelectPerson = () => {
		uni.navigateTo({
			url: '/pages/clients/index?act=select'
		})
	}


	// 选择收货地址
	const onAddressChange = () => {
		uni.chooseAddress({
			success: (res) => {
				const {
					cityName,
					countyName,
					detailInfo,
					userName
				} = res

				userReceiveInfo.value = res ? userName + '(' + cityName + countyName + detailInfo + ')' :
					''
				order.address.userName = userName
				order.address.cityName = cityName
				order.address.countyName = countyName
				order.address.detailInfo = detailInfo

				console.log(res, 'res');
			},
			fail: (err) => {
				console.log(err, 'err');
			}
		})
	}
	// 监听协议单选
	const onXieyiChange = () => {
		is_xieyi.value = !is_xieyi.value
	}
	// 支付
	let orderData
	const submit = () => {
		// 校验 阅读协议按钮
		if (!is_xieyi.value) {
			return uni.showToast({
				title: '请您阅读并同意<用户协议>和服务协议',
				duration: 1000,
				icon: ''
			});
		}
		const serviceData = toRaw(service.value) // 返回没响应式的服务对象
		orderData = toRaw(order) // 返回没响应式的订单对象
		const personInfoData = toRaw(personInfo.value) // 返回没响应式的就诊人信息对象
		const hospitalsData = toRaw(hospitals.value) // 返回没响应式的酒店对象
		if (serviceData) {
			// 校验 选择的医院
			if (serviceData.stype < 100) {
				// 如果用户没有选择医院,则请提示
				if (hospital_index.value == 0) {
					return uni.showToast({
						title: '请选择医院',
						duration: 1000,
						icon: ''
					});
				}
				// 有则代表有选择医院,则用索引取出选择医院的id和名称
				orderData.hospital_id = hospitalsData[hospital_index.value].id
				orderData.hospital_name = hospitalsData[hospital_index.value].name
			}

			// 非代跑取药的
			if (serviceData.stype == '10' || serviceData.stype == '15' || serviceData.stype == '20') {
				// 校验 就诊时间
				if (orderData.starttime == 0) {
					return uni.showToast({
						title: '请选择就诊时间',
						duration: 1000,
						icon: ''
					});
				}

				// 校验 选择就诊人
				if (personInfoData.name == '') {
					return uni.showToast({
						title: '请选择就诊人',
						duration: 1000,
						icon: ''
					});
				}

				// 尊享陪诊
				if (serviceData.stype == '15') {
					// 校验 接送地址
					if (!orderData.receiveAddress) {
						return uni.showToast({
							title: '请填写接送地址',
							duration: 1000,
							icon: ''
						});
					}
				}
				orderData.client = personInfoData // 就诊人
			}

			// 代跑取药的
			if (serviceData.stype == '30' || serviceData.stype == '40') {

				// 校验 服务时间
				if (orderData.starttime == 0) {
					return uni.showToast({
						title: '请选择服务时间',
						duration: 1000,
						icon: ''
					});
				}

				// 校验 收件信息
				if (!orderData.address.userName) {
					return uni.showToast({
						title: '请选择收件信息',
						duration: 1000,
						icon: ''
					});
				}
			}
		}
		// console.log(serviceData, 'serviceData');
		// ------------  共用的字段 ---------------

		// 校验联系电话
		if (!order.tel) {
			return uni.showToast({
				title: '请填写联系电话',
				duration: 1000,
				icon: ''
			})
		}

		orderData.service_code = serviceData.code // 服务code
		orderData.service_id = serviceData.id // 服务id
		orderData.service_name = serviceData.name // 服务名称
		orderData.service_stype = serviceData.stype // 服务类型

		console.log(orderData, '提交订单的数据');

		// 上面验证都通过,正式创建订单之前做登录校验,验证用户是否已登录,未登录则显示弹窗,让其去手机号登录
		if (!uni.getStorageSync('token')) {
			popup.value.open('center') // 显示弹窗
		} else {
			// 创建订单逻辑
			createOrder(orderData)
		}
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
				// 接下来正式创建订单
				createOrder(orderData)
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

	// 创建订单
	const createOrder = (params) => {
		// 先显示二维码弹框，再调接口，返回的支付url给UQRCode函数，渲染展示到qrcode view标签上
		QRCodePopup.value.open('center')
		app.globalData.utils.request({
			url: '/pay/createOrder',
			method: 'POST',
			header: {
				token: uni.getStorageSync('token')
			},
			data: params,
			success: res => {
				formatWXPayToQRCode(res.wx_code)
				console.log(res)
			},
			fail: res => {
				console.log(res)
			},
		})
	}
	// 关闭二维码弹窗并去订单列表
	const closeQRCodePopup = () => {
		QRCodePopup.value.close()
		uni.switchTab({
			url: '../order/index'
		})
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
		var canvasContext = uni.createCanvasContext('qrcode');
		// 设置uQRCode实例的canvas上下文
		qr.canvasContext = canvasContext;
		// 调用绘制方法将二维码图案绘制到canvas上
		qr.drawCanvas();
	}

	// 触发全局的自定义事件  
	uni.$on('clientData', (data) => {
		const {
			age,
			mobile,
			sex,
			name
		} = data
		personInfo.value.name = name
		personInfo.value.mobile = mobile
		personInfo.value.sex = sex
		personInfo.value.age = age

		// console.log(data, 'data');
	})
</script>

<style>
	@import './index.css';
</style>