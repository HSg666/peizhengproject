笔记

### 登录和绑定appId步骤

1、在common中创建公共自定义工具函数js，utils.js

说明：导出一个class，利用原型链的优势，将整个工具函数绑定在App.vue的globalData全局实例对象上。

```js
class Utils {
	// 获取用户信息
	getUserInfo() {
		uni.login({
			success: function(res) {
				console.log(res, 'res');
			}
		})
	}
}
export default new Utils()
```

登录的流程：

用微信AppId获取到微信的code码，再将code码传入uni.request调用获取用户信息接口，才能获取到用户信息。

2、App.vue

```js
<script>
	// 引入公共工具
	import Utils from "/common/js/utils.js"
	// 将公共工具绑定到全局app实例上，供于所有组件使用
		globalData: {
			utils: Utils
		}
</script>
```

3、首页使用

说明：在页面加载生命周期中调用登录

 pages/index.vue

```js
<script setup>
  
	onLoad(() => {
		// 调用绑定在全局实例对象上的公共工具函数
		app.globalData.utils.getUserInfo()
	})
</script>
```

4、绑定AppId   

①、在微信小程序 -> 详情 -> AppId -> 已申请的到公众号平台查找输入即可；没有的则去申请测试号。

- 有测试号的登录返回结果如下:

```js
{
  code: "0e3Ygx0001kLTR1Lms100HY8LQ1Ygx0D"
	errMsg: "login:ok"
}
```

- 没有测试号的：

```js
{
  code: "The code is a mock code"
	errMsg: "login:ok"
}
```

②、uniapp配置AppId，防止微信小程序每次都需要配置

uniapp -> manifest.json -> 微信小程序配置 -> 输入测试号

