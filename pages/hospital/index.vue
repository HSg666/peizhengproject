<template>
	<view>
		<navbar title-text="" :isHeight="false" :isWhite="true" background="none" />
		<view style="position: relative;">
			<image :src="hospital.avatar_url" mode="aspectFill"
				style="filter: blur(50rpx) brightness(0.8); display: block; width: 100%; height: 550rpx; overflow: hidden">
			</image>
			<view :style="'position:absolute;top:' + 0 + 'rpx;padding-top:65rpx;overflow:hidden;width:100%;'">
				<view class="hospital-hd">
					<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="showShareModal">
						<view class="weui-cell__hd">
							<image :src="hospital.avatar_url" mode="aspectFill"
								style="position: absolute; top: -65rpx; display: block; width: 150rpx; height: 135rpx; border-radius: 10rpx; overflow: hidden">
							</image>
						</view>
						<view class="weui-cell__bd" style="padding-left: 170rpx">
							<view style="position: absolute; top: -65rpx">
								<text
									style="font-size: 36rpx; color: #ffffff; font-weight: bold">{{ hospital.name }}</text>
							</view>
							<view>
								<text class="hosp-rank">{{ hospital.rank }}</text>
								<text class="hosp-label">{{ hospital.label }}</text>
							</view>
						</view>
						<view class="weui-cell__ft weui-cell__ft_in-access"><text class="f4">转发</text></view>
					</view>
					<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
						<view class="weui-cell__hd">
							<image src="/static/resource/images/ic_address.png" mode="aspectFill"
								style="margin-right: 10rpx; display: block; width: 40rpx; height: 40rpx"></image>
						</view>
						<view class="weui-cell__bd">
							<view>
								<text
									style="font-size: 24rpx">{{ hospital.city }}{{ hospital.district }}{{ hospital.address }}</text>
							</view>
						</view>
						<view class="weui-cell__ft weui-cell__ft_in-access"><text class="f4">导航</text></view>
					</view>
				</view>
				<view class="hospital-bd">
					<view class="weui-cells serv-list">
						<view class="weui-cell serv-item">
							<view class="weui-cell__bd">
								<view style="padding-top: 10rpx"><text class="serv-name">在线预约您需要的服务</text></view>
							</view>
							<view class="weui-cell__ft"></view>
						</view>
						<view class="weui-cell serv-item" @tap="toService(item.id)" v-for="(item, index) in services"
							:key="index">
							<block v-if="item.use_switch == 1">
								<view class="weui-cell__hd">
									<image class="serv-logo"
										:src="item.logo_image ? item.logo_image_url : '../../resource/images/avatar.jpg'"
										mode="aspectFill" />
								</view>

								<view class="weui-cell__bd">
									<view>
										<text class="serv-name">{{ item.name }}</text>
									</view>
									<view class="serv-line serv-intro">{{ item.intro }}</view>
									<view class="serv-line">
										<text class="serv-price">{{ item.price }}</text>
										<text class="serv-unit">元/次</text>
									</view>
								</view>

								<view class="weui-cell__ft">
									<button class="btn1m">预约</button>
								</view>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		<share :shareModal="clone_shareModal"></share>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app"

	const app = getApp()
	// 医院详情数据
	const hospital = ref({})
	// 医院服务数据
	const services = ref({})
	// 分享弹框
	const clone_shareModal = ref(false)

	onLoad((option) => {
		// 根据首页传来的医院id获取详情
		getHospitalDetail(option.hid)
	})

	// 获取医院详情
	const getHospitalDetail = (hid) => {
		app.globalData.utils.request({
			url: '/Hospital/index',
			method: 'GET',
			data: {
				hid
			},
			success: (res) => {
				hospital.value = res.data.data.hospital // 医院数据
				services.value = res.data.data.services // 服务数据
				// console.log(res, 'res');
			},
			fail: (res) => {
				console.log(res);
			}
		})
	}

	// 去预约
	const toService = (id) => {
		uni.navigateTo({
			url: '../service/index?hid=' + hospital.value.id + '&svid=' + id
		})
	}


	// 显示转发弹框
	const showShareModal = () => {
		clone_shareModal.value = !clone_shareModal.value
	}
</script>

<style>
	@import "./index.css";
</style>