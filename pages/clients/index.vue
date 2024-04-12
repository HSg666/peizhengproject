<template>
	<view>
		<view class="cell-box" v-for="(item, index) in clients" :key="index">
			<view class="weui-cell">
				<view class="weui-cell__bd">
					<view>
						<text style="font-weight: bold">{{ item.name }}</text>
					</view>
					<view>
						<text :class="'sext' + item.sex">{{ item.sex == 1 ? '男' : '女' }}</text>
						<text style="margin-left: 10rpx">{{ item.age }}周岁</text>
						<text style="margin-left: 10rpx">{{ item.mobile }}</text>
					</view>
				</view>
				<view class="weui-cell__ft">
					<text v-if="act == 'select'" @click="onClientSelected(item)" style="
		                display: inline-block;
		                padding: 15rpx 30rpx;
		                border: 1rpx solid #0bb584;
		                color: #0bb584;
		                font-weight: bold;
		                border-radius: 10rpx;
		                font-size: 28rpx;
		                overflow: hidden;
		            ">
						选择
					</text>
					<text v-else @click="removeClient" :data-id="item.id" style="
		                display: inline-block;
		                padding: 15rpx 30rpx;
		                border: 1rpx solid #eeeeee;
		                color: #f13e6d;
		                border-radius: 10rpx;
		                font-size: 28rpx;
		                overflow: hidden;
		            ">
						移除
					</text>
				</view>
			</view>
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
		computed,
		toRaw
	} from "vue"
	const app = getApp()
	const clients = ref([]) // 服务对象列表
	const act = ref('') // 页面来源标识

	onLoad((option) => {
		act.value = option.act // 页面来源标识
		// 根据url中的参数显示不同的页面标题文本
		if (option.act == 'select') {
			uni.setNavigationBarTitle({
				title: '请选择服务对象'
			})
		} else {
			uni.setNavigationBarTitle({
				title: '服务对象管理'
			})
		}
		// 获取服务对象列表
		app.globalData.utils.request({
			url: '/User/clients',
			success: (res) => {
				clients.value = res.data.data.clients
				// console.log(res.data.data.clients, 'res');
			}
		})
	})
	// 监听选中的服务对象
	const onClientSelected = (item) => {
		// console.log(item, 'item');
		// 将选中的数据保存到全局的clientData上，并发送出去
		uni.$emit('clientData', item)
		uni.navigateBack() // 回到上个页面
	}
	// 移出服务对象
	const removeClient = (item) => {

	}
</script>

<style>
	@import 'index.css';
</style>