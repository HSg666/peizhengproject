>前言：这是跟着B站视频学的uniApp vue3陪诊小程序项目，有真实下单、微信扫码支付、封装时间组件、手机号验证码登录等核心功能。
<br>
B站视频源地址：
https://www.bilibili.com/video/BV1jc411z7qG/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click&vd_source=ac6f954f925d420ce11cce0f0cdd6566
<br>
<br>
接口地址：
https://apifox.com/apidoc/shared-50a14ca5-c1d1-47ca-99f0-315ecfa52706/api-130967234
<br>
<br>
二维码插件地址：
https://uqrcode.cn/doc/guide/getting-started.html#%E7%AE%80%E5%8D%95%E7%94%A8%E6%B3%95-2
<br>
<br>
开发工具：HBuilder X 4.08、微信开发者工具 (1.06.xxx)
<br>
<br>
项目框架：Vue3、uniapp
<br>
<br>
如何启动呢？
<br>
<br>
1、用HBuilder X打开项目，在HBuildren X编辑器顶部工具栏 => 运行 => 运行到小程序模拟器 => 微信开发者工具(peizhengproject)
提示：
①、电脑提前下载好微信开发者工具。
②、HBuilder X记得设置"微信开发者工具"的路径，这样HBuilder X才能启动"微信开发者工具"。
在HBuildren X编辑器顶部工具栏 => 运行 => 运行设置 => 小程序运行设置 => 点击浏览 指向到你"微信开发者工具"安装的目录。
<br>
<br>
2、没有微信开发者工具的测试号(AppId)，就去"微信公众平台"申请一个。
微信公众平台链接：https://mp.weixin.qq.com/     微信扫码进入就有了测试号了
<br>
<br>
3、测试号(AppId)有地方需要用到，HBuilder X 和 微信开发者工具
HBuilder X：项目目录找到 manifest.json 文件 => 左侧栏"源码视图" => mp-weixin => 你的测试号(appid)设置进去
微信开发者工具：点击"微信开发者工具"编辑器面板的右上角"详情" => 基本信息 => 把你的appid(测试号)写进去
<br>
至此appid设置完毕。
<br>
<br>
4、微信开发者工具需要修改一些配置，改后启动才能不报错。
<br>
<br>
①点击"微信开发者工具"编辑器面板的右上角"详情" => 本地设置 => 把 "不校验合法域名、web-view(业务域名)、TLS版本以及 HTTPS 证书"  勾选✔。
<br>
<br>
②、点击"微信开发者工具"编辑器顶部工具栏的设置 => 代理 => 代理设置 => 勾选✔ 不使用任何代理，勾选后直连网络
<br>
<br>
5、如果上面这些文字教程中间卡壳或者一直有问题，推荐看源视频，前几点在视频中老师都有手把手教。

### 项目效果图
##### 首页
![image](https://github.com/HSg666/peizhengproject/blob/main/static/resource/reviewProject/%E9%A6%96%E9%A1%B5.jpg)

##### 医院详情
![image](https://github.com/HSg666/peizhengproject/blob/main/static/resource/reviewProject/%E5%8C%BB%E9%99%A2%E8%AF%A6%E6%83%85.jpg)

##### 创建订单
![image](https://github.com/HSg666/peizhengproject/blob/main/static/resource/reviewProject/%E5%88%9B%E5%BB%BA%E8%AE%A2%E5%8D%95.png)

##### 微信扫码支付
![image](https://github.com/HSg666/peizhengproject/blob/main/static/resource/reviewProject/%E6%89%AB%E7%A0%81%E6%94%AF%E4%BB%98.png)

##### 个人中心
![image](https://github.com/HSg666/peizhengproject/blob/main/static/resource/reviewProject/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83.png)

##### 真实手机号验证码登录
![image](https://github.com/HSg666/peizhengproject/blob/main/static/resource/reviewProject/%E7%99%BB%E5%BD%95.png)

##### 服务对象管理
![image](https://github.com/HSg666/peizhengproject/blob/main/static/resource/reviewProject/%E6%9C%8D%E5%8A%A1%E5%AF%B9%E8%B1%A1%E7%AE%A1%E7%90%86.png)

