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
		<block v-if="hospitals.length > 0 && service.stype == '40' || service.stype == '15'	|| service.stype == '20'">
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
									<dtPicker @dtPickerChanged="onStartTimeChange" :timestamp="order.starttime"
										placeholder="请选择就诊时间"></dtPicker>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
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
	// 订单数据
	const order = reactive({
		price: '', // 价格
		starttime: 0,
		address: {
			userName: '',
			cityName: '',
			countyName: '',
			detailInfo: ''
		}
	})


	onLoad((option) => {
		getServiceDetail(option)
		console.log(option, 'option');
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
		console.log(order.price, 'order.value.price');
	}
	// 选择就诊时间
	const onStartTimeChange = (e) => {
		order.starttime = e.detail.value
		// console.log(e.detail.value, '1111')
	}
</script>

<style>
	@import './index.css';
</style>