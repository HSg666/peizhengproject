"use strict";
const common_vendor = require("../vendor.js");
class Utils {
  constructor() {
    this.baseUrl = "https://code.itndedu.com/pz";
  }
  // 获取用户信息
  getUserInfo() {
    common_vendor.index.login({
      success: (res) => {
        this.request({
          url: "/auth/wxLogin",
          method: "GET",
          data: {
            code: res.code
          },
          isShowLoading: true,
          success: (res2) => {
            console.log(res2, "request res");
          },
          fail: (err) => {
            console.log(err, "request err");
          }
        });
      }
    });
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
    if (!options.url)
      return false;
    if (options.isShowLoading) {
      this.showLoadingFun();
    }
    common_vendor.index.request({
      url: this.baseUrl + options.url,
      // 请求地址
      method: options.method ? options.method : "GET",
      // 请求方式
      data: options.data ? options.data : {},
      // 请求参数
      header: options.header ? options.header : {},
      // 请求头
      success: (response) => {
        common_vendor.index.hideLoading();
        if (response.data.code != 1e4) {
          if (options.fail && typeof options.fail == "function") {
            options.fail(response);
          }
        } else {
          if (options.success && typeof options.success == "function") {
            options.success(response);
          }
        }
      },
      fail: (err) => {
        console.log(err, "err");
        common_vendor.index.hideLoading();
      }
    });
  }
  // 封装加载动画函数
  showLoadingFun() {
    const isLoading = common_vendor.index.getStorageSync("isShowLoading");
    if (isLoading) {
      common_vendor.index.hideLoading();
      common_vendor.index.setStorageSync("isShowLoading", false);
    }
    common_vendor.index.showLoading({
      title: "加载中...",
      complete: () => {
        common_vendor.index.setStorageSync("isShowLoading", true);
      },
      fail: () => {
        common_vendor.index.setStorageSync("isShowLoading", false);
      }
    });
  }
}
const Utils$1 = new Utils();
exports.Utils = Utils$1;
