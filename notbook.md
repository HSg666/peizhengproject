# 笔记

### 一、登录和绑定appId步骤

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

### 二、获取url中的参数

a.vue

```js
uni.navigateTo({
			url: '/pages/hospital/index?hid=' + id
		})
```

b.vue

```js
import {onLoad} from "@dcloudio/uni-app"

onLoad((option) => {
		console.log(option.hid, 'option');
	})
```

### 三、uniapp中的vue3如果给变量赋值出现XX set XX undefind

只需检查初始变量时是否为reactive，同时未转成ref，那么它的赋值方式则无需.value。

```js
order.value.price 改为  order.price ,即可解决。
```

### 四、uniapp如何用自定义事件传参（全局性，各页面都能接收到）

发送事件

```js
// 发送事件名、数据
uni.$emit('clientData', item)
```

接收事件

```js
// 接收事件名、获取数据
uni.$on('clientData', (data) => {
		personName.value = data.name
	})
```

### 五、如何获取微信用户的收货地址

1、uniapp官网搜索 chooseAddress

https://uniapp.dcloud.net.cn/api/other/choose-address.html#chooseaddress

获取地址的方法

```js
uni.chooseAddress({
  success(res) {},
  fail(err){}
})
```

2、但还缺少配置微信，所以需要先配置，否则会报 requiredPrivateInfos 找不到。

①、在uniapp搜索 requiredPrivateInfos => 左侧manifest.json应用配置 => 页面找到 requiredPrivateInfos  => 点击详见

②、打开HBuildX的manifest.json => 源码视图 => 找到"小程序相关" => 将requiredPrivateInfos复制进去

 ```js
/* 小程序特有相关 */
	"mp-weixin": {
		"requiredPrivateInfos": [
      // 将这两个放进来
			"getLocation",  // 获取精确地理位置
			"chooseAddress" // 获取用户地址信息
		]
	},
 ```

### 六、如何引入扩展组件并使用

1、打开此链接，找到点击下载&安装；下载插件并导入HBuilder X

https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html

2、项目中会自动生成uni_modules目录，里面就是popup弹出框的组件

3、复制扩展组件的popup组件，在页面直接使用即可

### 七、登录完整逻辑

1、创建订单之前判断缓存中是否有token，没有则弹登录窗口

2、点击验证码校验手机号是否为空，为空提示用户

3、不为空发送验证码，点击发送定时器倒计时

- 定时器逻辑

  1、默认定时器时间为60秒，如果时间<=0，说明时间走完了，初始化验证码文案为"获取验证码"，时间初始为60，关闭定时器timer

  2、否则时间自减1，验证码文案用模板字符串动态拼接"剩余${countdown.value.time}S"

  3、性能优化，由于获取验证码之后再次触发获取按钮会积累很多定时器，所以需要用flag做防抖

  4、函数外初始flag为false，获取时如果flag为true，就不执行定时器，否则就将flag打开，并开启定时器。同时定时时间结束也要关闭flag。

4、调用发送验证码接口，发送前校验手机号，校验通过将手机号传入接口，手机查看验证码

5、调用验证验证码接口，校验手机号和验证码不能为空，通过就传入接口，获取后端返回的token，并设置到缓存Storage中。同时隐藏登录弹框。   接下来正式创建订单。

额外：进入tabbar订单

```html
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
```



```js
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
				// 接下来正式创建订单

				popup.value.close() // 关闭弹窗
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
```

### 八、微信支付url转成微信支付二维码 uQRCode

1、安装

官网地址：https://uqrcode.cn/doc/guide/getting-started.html

在HBuilder X的终端下载依赖 

```js
npm install uqrcodejs
```

下载完 HBuilder X项目中会自动多出一个node_modules依赖包，项目重启

2、页面使用

①、引入

```js
	import UQRCode from 'uqrcodejs'; 
```

②、创建方法

```js
	// 将微信支付url转换为微信二维码
	const formatWXPayToQRCode = (url) => {
		// 获取uQRCode实例
		var qr = new UQRCode();
		// 设置二维码内容
		qr.data = "https://uqrcode.cn/doc/guide/getting-started.html#%E5%AE%89%E8%A3%85";
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
```

3、用uniapp扩展组件的popup弹窗包裹

初始弹窗显/隐变量

```js
<uni-popup ref="QRCodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<image src="/static/resource/images/modal_closer.png" style="display:block;width:30rpx;height:30rpx"
					@click="closeQRCodePopup">
				</image>
				<view class="text-center">微信扫一扫</view>
				<canvas id="qrcode" canvas-id="qrcode" style="width: 300rpx;height: 300rpx;"></canvas>
				<view class="text-center">请用本人微信扫描以上二维码</view>
			</view>
		</uni-popup>

const QRCodePopup = ref(null) // 二维码


```

4、创建订单成功用接口返回的支付url传入生成微信支付二维码

```js
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
        //  后端返回的支付URL字段，wx_code: "weixin://wxpay/bizpayurl?pr=FmQEegPz3"
				formatWXPayToQRCode(res.wx_code)   // 核心在这里
				console.log(res)
			},
			fail: res => {
				console.log(res)
			},
		})
	}
```

5、关闭二维码弹窗并跳转到tabbar的订单列表

作用： 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。 

```js
	const closeQRCodePopup = () => {
		QRCodePopup.value.close()
		uni.switchTab({
			url: '../order/index'
		})
	}
```

### 九、onLoad和onShow的区别

onLoad：需要加载重新渲染的页面会使用到，还能从option形参中获取到从其他页面传来的参数

onShow: 切换页面时不会重新渲染的页面，例如：底部tabbar，其原理是已经加载过的页面会缓存起来，切换只是显示和隐藏。

### 十、拨打电话

https://uniapp.dcloud.net.cn/api/system/phone.html#makephonecall

传入用户手机号即可

```js
	const makePhoneCall = (tel) => {
		uni.makePhoneCall({
			phoneNumber: tel
		});
	}
```

### 十一、使用自定义导航栏

例如：hospital.vue 医院详情，在pages.json的医院详情路由style中加入custom

```js
"style": {
					"navigationStyle": "custom" // 使用自定义导航栏
			}
```

### 十二、腾讯地图导航定位

逻辑：

pages.json配置微信id
将用户的经、纬度格式化为腾讯支持的经、纬度
key：获取腾讯地图开发者的key
referer: 取全局项目名称
坐标参数：医院名称、经、纬度    
配置url正式跳转

1、pages.json配置微信id

```js
"plugins": {
		"routePlan": {
			"version": "1.0.19",
			"provider": "wx16ed4e0dc3c11b15"
		}
	},
```

2、医院详情 将后端返回该医院的经纬度进行格式化为腾讯地图支持格式

```js
// 医院详情数据如下: 
{
  name: "武汉中心医院",
	lat: 30.62827,
  lng: 114.26553,
  ...
} 

用户点击导航按钮时将医院经纬度传入
	const toMap = () => {
		const point = bMapTransQQMap(hospital.value.lng, hospital.value.lat)
	  const key = ''; // 腾讯地图的key
    const referer = ''; // 项目名称

    
    // 包裹一个经纬度和医院名称对象，用于腾讯地图URL跳转
    const endPoint =JSON.stringify({
          name:hospital.value.name,
          latitude: point.lat,
          longitude: point.lng
    })
    
        // 组装拼接跳转
    uni.navigateTo({
           url: "plugin://routePlan/index?key=’+ key + '&referer='T+ referer + '&endPoint='+ endpoint + '&navigation=1'
      })
    
   }

 // 将用户的经纬度格式为腾讯地图支持的经纬度
	const bMapTransQQMap = (lng, lat) => {
		let x_pi = (3.141592653589793 * 3000) / 180;
		let x = lng - 0.0065;
		let y = lat - 0.006;
		let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
		let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
		let lngs = z * Math.cos(theta);
		let lats = z * Math.sin(theta);
		return {
			lng: lngs,
			lat: lats
		}
	}
```

注意：微信id需要在"微信开发者中心"配置第三方"腾讯位置服务"授权，否则无法使用。



### 十三、uniapp打包流程

##### 1、检查AppId

作用：检查HBuider X配置的AppId是否跟要上线的微信小程序AppId是否对应，这是打包微信小程序的。

两个方案二选一即可。

方案一：

配置路径：manafest.json => 微信小程序配置 => 微信小程序AppId

忘了AppId就登录到微信公众号平台去查看，开发 => 开发管理 => 开发者ID

 https://mp.weixin.qq.com/cgi-bin/loginpage?url=%2Fwxamp%2Fdevprofile%2Fget_profile%3Ftoken%3D2101804115%26lang%3Dzh_CN

方案二、

配置路径：manafest.json =>源码视图 => 微信小程序AppId

```js
/* 小程序特有相关 */
	"mp-weixin": {
		"appid": "wx16ed4e0dc3c11b15", // 直接在此修改
	}
```

##### 2、检查接口安全性

`报错信息：处理 http://XXX 不在以下 request 合法域名列表中`

- 开发环境：uniapp想使用本地服务器，就在 微信开发者工具 => 详情 => 本地设置 => 将“不校验合法域名、web-view(业务域名)、TLS版本以及HTTPS 证书”，勾选✔上。

- 生产环境：

到封装的功能请求函数中把请求地址更换，即：common/js/utils  

```js
本地           this.baseUrl = 'http://159.75.169.224:7300/pz'
替换为生产环境的  this.baseUrl = 'https://code.itndedu.com/pz'
```

- 把线上的https合法域名在微信小程序平台配置一下

https://mp.weixin.qq.com/wxamp/wadevelopcode/sandbox?lang=zh_CN&token=1221471645

①、个人的：服务器域名 => 修改或开始配置 => request合法域名的文本框填上你的完整域名地址 => 保存并提交

例如： https://code.itndedu.com

企业的配置也差不多。

②、配置完在微信开发者工具检查 => 详情 => 项目配置 => 域名信息 => request域名就是我们刚刚配置的域名。

如果没看到更新的点一下刷新按钮。

##### 3、发布

HBuilder X：工具栏-发行 => 小程序-微信(仅适用于uni-app) => 检查项目名称和AppId => 发行（此时会自动打开 微信开发者工具）

微信开发者工具： 信任作者并运行 => 本地设置 => 取消勾选“不校验合法域名、web-view(业务域名)、TLS版本以及HTTPS 证书” => 上传 => 填写版本号 => 确定

小程序官网：https://mp.weixin.qq.com/wxamp/wadevelopcode/sandbox?lang=zh_CN&token=1221471645

管理 => 版本管理 => 开发版本 => 点击体验就可以用手机查看了，或者在微信开发者工具用"真机调试"

打包视频教程：https://www.bilibili.com/video/BV1jc411z7qG?p=37&vd_source=ac6f954f925d420ce11cce0f0cdd6566