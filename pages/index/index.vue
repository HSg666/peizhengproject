<template>
	<view>
		<!-- 导航栏 -->
		<NavBar :isHome="true"></NavBar>
		<!-- 通知栏 -->
		<view style="margin-top: 130rpx;">
			<view class="weui-cell" style="background-color: #fff9eb;">
				<view class="weui-cell__hd">
					<image src="/static/resource/images/ic_myapp.png"
						style="display:block;width:40rpx;height:40rpx;margin-right:14rpx;"></image>
				</view>
				<view class="weui-cell__bd">
					<text style="color:#be9719;font-size:26rpx;">点击右上角“添加到我的小程序”，方便下次找到!</text>
				</view>
				<view class="weui-cell__ft">
					<image src="/static/resource/images/modal_closer.png"
						style="display:block;width:30rpx;height:30rpx;"></image>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="index-swiper" v-if="bannerList && bannerList.length > 0">
			<swiper :indicator-dots="true" circular autoplay :interval="4000" :duration="1000">
				<swiper-item v-for="(item,index) in bannerList" :key="item.id" :data-index="index">
					<image :src="item.pic_image_url" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref,
		reactive,
		computed
	} from "vue"
	const app = getApp()
	const bannerList = ref([]) // 轮播图


	onLoad(() => {
		// 调用绑定在全局实例对象上的公共工具函数
		app.globalData.utils.getUserInfo()
		// 先获取地区码
		app.globalData.utils.request({
			url: '/app/init',
			success: ({
				data
			}) => {
				const {
					id
				} = data.data.area

				// 根据地区码获取该地区的医院信息（轮播图）
				app.globalData.utils.request({
					url: '/Index/index',
					data: {
						aid: id
					},
					success: (ress) => {
						bannerList.value = ress.data.data.slides // 轮播图
						console.log(bannerList.value, 'ress');
					}
				})
			},

		})
		// console.log(app.globalData.utils, 'app.globalData.utils');
	})
</script>

<style>
	.index-swiper {
		overflow: hidden;
		margin: 20rpx 20rpx 0;
	}

	.index-swiper swiper {
		overflow: hidden;
		height: 320rpx;
		border-radius: 10rpx;
	}

	.index-swiper swiper-item image {
		width: 100%;
		height: 100%;
	}
</style>