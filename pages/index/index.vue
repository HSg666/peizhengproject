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
				<swiper-item v-for="(item,index) in bannerList" :key="item.id">
					<image :src="item.pic_image_url" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 2个导航 -->
		<view class="nav2-list" v-if="nav2s && nav2s.length > 0">
			<block>
				<view class="nav2-item" v-for="(item,index) in nav2s" :key="item.id" @click="goPage(item.stype_link)">
					<view class="nav2-pic">
						<image :src="item.pic_image_url" mode="widthFix"></image>
					</view>
				</view>
			</block>
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
	const app = getApp() // 获取uniapp实例
	const bannerList = ref([]) // 轮播图
	const nav2s = ref([]) // 2个导航


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
						nav2s.value = ress.data.data.nav2s // 两个导航
						console.log(bannerList.value, 'ress');
					}
				})
			},

		})
		// console.log(app.globalData.utils, 'app.globalData.utils');
	})

	const goPage = (url) => {
		uni.navigateTo({
			url
		})
	}
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

	.nav2-list {
		margin: 10rpx 20rpx 0 20rpx;
	}

	.nav2-list::after {
		content: '';
		display: block;
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}

	.nav2-item {
		float: left;
		margin-top: 20rpx;
		width: 50%;
		text-align: center;
		box-sizing: border-box;
		padding: 0 5rpx;
	}

	.nav2-pic {
		width: 100%;
	}

	.nav2-pic image {
		display: block;
		width: 100%;
	}
</style>