import App from './App'
Date.prototype.VP_FORMAT = function(format) {
	// console.log('==========>this.getDate() ' + this.getTime() / (24 * 60 * 60 * 1000));
	// console.log('==========>new Date().getDate() ' + new Date().getTime() / (24 * 60 * 60 * 1000));
	var ds = parseInt(this.getTime() / (24 * 60 * 60 * 1000)) - parseInt(new Date().getTime() / (24 * 60 * 60 *
		1000));
	var n = '';
	if (ds == 0) {
		n = '(今天)';
	}
	if (ds == 1) {
		n = '(明天)';
	}
	if (ds == 2) {
		n = '(后天)';
	}
	if (ds == -1) {
		n = '(昨天)';
	}
	if (ds == -2) {
		n = '(前天)';
	}
	var date = {
		'M+': this.getMonth() + 1,
		'd+': this.getDate(),
		'h+': this.getHours(),
		'm+': this.getMinutes(),
		's+': this.getSeconds(),
		'q+': Math.floor((this.getMonth() + 3) / 3),
		'S+': this.getMilliseconds(),
		'n+': n
	};
	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in date) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[
				k]).length));
		}
	}
	return format;
};


// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif