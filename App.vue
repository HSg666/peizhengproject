<script>
	// 引入公共工具
	import Utils from "/common/js/utils.js"
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		// 将公共工具绑定到全局app实例上，供于所有组件使用
		globalData: {
			utils: Utils
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import '/app.css';
</style>