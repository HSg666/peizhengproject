"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_formater2 = common_vendor.resolveComponent("formater");
  const _easycom_counter2 = common_vendor.resolveComponent("counter");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_formater2 + _easycom_counter2 + _easycom_uni_popup2)();
}
const _easycom_formater = () => "../../components/formater/formater.js";
const _easycom_counter = () => "../../components/counter/counter.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_formater + _easycom_counter + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const filt = common_vendor.ref("");
    const list = common_vendor.ref([]);
    const popup = common_vendor.ref(null);
    const validMobile = common_vendor.ref({
      // 
      validCode: "",
      // 验证码
      phone: ""
      // 手机号
    });
    const countdown = common_vendor.ref({
      validText: "获取验证码",
      time: 60
      // 倒计时
    });
    common_vendor.onMounted(() => {
      console.log(app.globalData.filt, " app.globalData.filt");
      filt.value = app.globalData.filt;
      getOrderList();
    });
    const onFilterChange = (status) => {
      if (filt.value == status)
        return;
      filt.value = status;
      getOrderList();
    };
    const getOrderList = () => {
      if (!common_vendor.index.getStorageSync("token")) {
        return popup.value.open("center");
      }
      app.globalData.utils.request({
        url: "/order/list",
        method: "GET",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: {
          state: filt.value
        },
        success: (res) => {
          list.value = res.data.data;
          console.log(res.data.data, "res");
        },
        fail: (res) => {
          console.log(res, "res");
        }
      });
    };
    const onCounterOver = () => {
      filt.value = "";
      getOrderList();
    };
    const toOrder = (id) => {
      common_vendor.index.navigateTo({
        url: `./orderDetail/index?oid=${id}`
      });
    };
    let flag = false;
    const countdownChange = () => {
      if (!validMobile.value.phone) {
        return common_vendor.index.showToast({
          title: "请输入手机号",
          duration: 1e3,
          icon: "none"
        });
      }
      if (flag)
        return;
      flag = true;
      const timer = setInterval(() => {
        if (countdown.value.time <= 0) {
          countdown.value.validText = "获取验证码";
          countdown.value.time = 60;
          clearInterval(timer);
          flag = false;
        } else {
          countdown.value.time -= 1;
          countdown.value.validText = `剩余${countdown.value.time}S`;
        }
      }, 1e3);
      app.globalData.utils.request({
        url: "/get/code",
        method: "POST",
        data: {
          tel: validMobile.value.phone
          // 手机号
        },
        success: (res) => {
          common_vendor.index.showToast({
            title: "验证码发送成功,请尽快验证!",
            duration: 1e3,
            icon: "none"
          });
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: res.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      });
    };
    const cancal = () => {
      popup.value.close();
    };
    const ok = () => {
      if (!validMobile.value.phone || !validMobile.value.validCode) {
        return common_vendor.index.showToast({
          title: "请检查输入信息",
          duration: 1e3,
          icon: "none"
        });
      }
      app.globalData.utils.request({
        url: "/user/authentication",
        method: "POST",
        data: {
          tel: validMobile.value.phone,
          // 手机号
          code: validMobile.value.validCode
          // 验证码
        },
        success: (res) => {
          common_vendor.index.setStorageSync("token", res.data.data.token);
          popup.value.close();
          getOrderList();
        },
        fail: (res) => {
          popup.value.close();
          common_vendor.index.showToast({
            title: res.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n("h-tab-item vp-flex_1 " + (filt.value == "" ? "on" : "")),
        b: common_vendor.o(($event) => onFilterChange("")),
        c: common_vendor.n("h-tab-item vp-flex_1 " + (filt.value == 1 ? "on" : "")),
        d: common_vendor.o(($event) => onFilterChange(1)),
        e: common_vendor.n("h-tab-item vp-flex_1 " + (filt.value == 2 ? "on" : "")),
        f: common_vendor.o(($event) => onFilterChange(2)),
        g: common_vendor.n("h-tab-item vp-flex_1 " + (filt.value == 3 ? "on" : "")),
        h: common_vendor.o(($event) => onFilterChange(3)),
        i: common_vendor.n("h-tab-item vp-flex_1 " + (filt.value == 4 ? "on" : "")),
        j: common_vendor.o(($event) => onFilterChange(4)),
        k: list.value != null
      }, list.value != null ? common_vendor.e({
        l: list.value != null && list.value.length == 0
      }, list.value != null && list.value.length == 0 ? {
        m: common_assets._imports_0$2
      } : {
        n: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.service_logo_image_url,
            b: common_vendor.t(item.service_name),
            c: item.service_stype <= 20
          }, item.service_stype <= 20 ? {
            d: common_vendor.t(item.hospital_name),
            e: common_vendor.t(item.area_name),
            f: "e7e446b8-0-" + i0,
            g: common_vendor.p({
              timestamp: item.starttime,
              format: "MM-dd hh:mm"
            }),
            h: common_vendor.t(item.client_name)
          } : {}, {
            i: item.service_stype > 20 && item.service_stype < 100
          }, item.service_stype > 20 && item.service_stype < 100 ? {
            j: common_vendor.t(item.hospital_name),
            k: common_vendor.t(item.area_name),
            l: "e7e446b8-1-" + i0,
            m: common_vendor.p({
              timestamp: item.starttime,
              format: "MM-dd hh:mm"
            })
          } : {}, {
            n: item.service_stype > 100
          }, item.service_stype > 100 ? {
            o: "e7e446b8-2-" + i0,
            p: common_vendor.p({
              timestamp: item.starttime,
              format: "MM-dd hh:mm"
            }),
            q: common_vendor.t(item.client_name)
          } : {}, {
            r: item.trade_state == "待支付"
          }, item.trade_state == "待支付" ? {
            s: common_vendor.o(onCounterOver, index),
            t: "e7e446b8-3-" + i0,
            v: common_vendor.p({
              second: item._exp_time
            })
          } : {}, {
            w: item.trade_state == "待服务"
          }, item.trade_state == "待服务" ? {} : {}, {
            x: item.trade_state == "已完成"
          }, item.trade_state == "已完成" ? {} : {}, {
            y: item.trade_state == "已取消"
          }, item.trade_state == "已取消" ? {} : {}, {
            z: common_vendor.o(($event) => toOrder(item.out_trade_no), index),
            A: index
          });
        })
      }) : {}, {
        o: validMobile.value.phone,
        p: common_vendor.o(($event) => validMobile.value.phone = $event.detail.value),
        q: validMobile.value.validCode,
        r: common_vendor.o(($event) => validMobile.value.validCode = $event.detail.value),
        s: common_vendor.t(countdown.value.validText),
        t: common_vendor.o(countdownChange),
        v: common_vendor.o(cancal),
        w: common_vendor.o(ok),
        x: common_vendor.sr(popup, "e7e446b8-4", {
          "k": "popup"
        }),
        y: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
