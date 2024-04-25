<template>
	<view>
		<view class="modal-mask" @touchmove.stop.prevent="preventTouchMove" v-if="shareModalClone"></view>
		<view class="modal-dialog" v-if="shareModalClone">
			<view class="vp-flex" style="height: 100%; flex-direction: column">
				<view class="vp-flex_1" @tap="hideShareModal"></view>
				<view>
					<view class="modal-main" style="background: #f4f4f4">
						<view class="modal-hd">
							<text class="modal-hd-title">转发分享</text>
							<image class="modal-hd-closer" src="/static/resource/images/modal_closer.png" mode="widthFix" @tap="hideShareModal" />
						</view>
						<view class="modal-bd">
							<view style="padding: 60rpx 0">
								<view class="push-types">
									<view class="vp-flex">
										<view class="vp-flex_1">
											<button open-type="share" class="push-type">
												<view class="push-icon"><image src="/static/resource/images/push_wx.png" mode="widthFix" /></view>
												<view class="push-text"><text>发给微信好友</text></view>
											</button>
										</view>
										<view class="vp-flex_1">
											<view class="push-type" @tap="shareByPoster">
												<view class="push-icon"><image src="/static/resource/images/push_img.png" mode="widthFix" /></view>
												<view class="push-text"><text>生成分享图片</text></view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, watch } from 'vue'
	const props = defineProps(['shareModal'])
	const shareModalClone = ref(false)
	const preventTouchMove = () => {
		console.log('占位：函数 preventTouchMove 未声明')
	}
	const hideShareModal = () => {
		shareModalClone.value = false
	}
	const shareByPoster = () => {
		
	}
	console.log(props.shareModal, 'shareModal')
	watch(() => props.shareModal, (val) => {
		shareModalClone.value = val
	}, { immediate: true })
</script>

<style>
@import './share.css';
</style>