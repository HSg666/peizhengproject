class Utils {
	constructor() {
		// this.baseUrl = 'http://159.75.169.224:7300/pz'
		this.baseUrl = 'https://code.itndedu.com/pz'
	}

	// 获取用户信息
	getUserInfo() {
		uni.login({
			success: (res) => {
				// console.log(res, 'res');
				this.request({
					url: '/auth/wxLogin',
					method: 'GET',
					data: {
						code: res.code
					},
					isShowLoading: true,
					success: (res) => {
						console.log(res, 'request res');
					},
					fail: (err) => {
						console.log(err, 'request err');
					}

				})

			}
		})
	}
	// 二次封装请求函数
	/*
		接收一个参数对象
		options: {
			isShowLoading: false,
			url: '',
			method: '',
			data: '',
			header: '',
			success: ()=>{},
			fail: ()=>{},
		}
	*/
	request(options = {
		isShowLoading: false
	}) {
		// 如果请求地址为空，则返回出去
		if (!options.url) return false

		// 如果参数中存在动画，则启用自定义动画
		if (options.isShowLoading) {
			this.showLoadingFun()
		}

		uni.request({
			url: this.baseUrl + options.url, // 请求地址
			method: options.method ? options.method : 'GET', // 请求方式
			data: options.data ? options.data : {}, // 请求参数
			header: options.header ? options.header : {}, // 请求头
			success: (response) => {
				uni.hideLoading()
				// 10000为成功，否则为失败
				if (response.data.code != 10000) {
					if (options.fail && typeof options.fail == 'function') {
						options.fail(response)
					}
				} else {
					if (options.success && typeof options.success == 'function') {
						options.success(response)
					}
				}
			},
			fail: (err) => {
				console.log(err, 'err');
				uni.hideLoading()
			}
		})
	}
	// 封装加载动画函数
	showLoadingFun() {
		/*
			如果缓存中存在loading，则 1、隐藏加载动画 2、将缓存的值设置为false；
			不存在则为 1、不管成功失败都打开缓存的值 2、加载出错就将缓存的值设置为false
		*/
		const isLoading = uni.getStorageSync('isShowLoading')
		if (isLoading) {
			uni.hideLoading()
			uni.setStorageSync('isShowLoading', false)
		}

		uni.showLoading({
			title: '加载中...',
			complete: () => {
				uni.setStorageSync('isShowLoading', true)
			},
			fail: () => {
				uni.setStorageSync('isShowLoading', false)
			}
		})

	}
}
export default new Utils()