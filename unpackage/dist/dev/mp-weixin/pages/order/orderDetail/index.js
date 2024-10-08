"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_counter2 = common_vendor.resolveComponent("counter");
  const _easycom_formater2 = common_vendor.resolveComponent("formater");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_counter2 + _easycom_formater2 + _easycom_uni_popup2)();
}
const _easycom_counter = () => "../../../components/counter/counter.js";
const _easycom_formater = () => "../../../components/formater/formater.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_counter + _easycom_formater + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const order = common_vendor.ref({});
    const QRCodePopup = common_vendor.ref(null);
    const orderStatus = common_vendor.computed(() => {
      let map = {
        "待支付": "10",
        "待服务": "20",
        "已完成": "30",
        "已取消": "40"
      };
      return map[order.value.trade_state];
    });
    common_vendor.onLoad((option) => {
      getOrderDetail(option.oid);
    });
    const getOrderDetail = (oid) => {
      app.globalData.utils.request({
        url: "/order/detail",
        method: "GET",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: {
          oid
          // 订单id
        },
        success: (res) => {
          order.value = res.data.data;
          console.log(order.value, "res");
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
    const onCounterOver = () => {
      getOrderDetail();
    };
    const formatWXPayToQRCode = (url) => {
      var qr = new common_vendor.UQRCode();
      qr.data = url;
      qr.size = 200;
      qr.make();
      var canvasContext = common_vendor.index.createCanvasContext("qrcode");
      qr.canvasContext = canvasContext;
      qr.drawCanvas();
    };
    const dopay = (url) => {
      QRCodePopup.value.open("center");
      formatWXPayToQRCode(url);
    };
    const closeQRCodePopup = () => {
      QRCodePopup.value.close();
      common_vendor.index.switchTab({
        url: "../../order/index"
      });
    };
    const makePhoneCall = (tel) => {
      common_vendor.index.makePhoneCall({
        phoneNumber: tel
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$5,
        b: common_vendor.n("od-jd od-jd-" + orderStatus.value),
        c: orderStatus.value == 10
      }, orderStatus.value == 10 ? {
        d: common_vendor.o(onCounterOver),
        e: common_vendor.p({
          second: order.value._exp_time
        }),
        f: common_vendor.t(order.value.price),
        g: common_vendor.o(($event) => dopay(order.value.code_url))
      } : {}, {
        h: orderStatus.value == 20
      }, orderStatus.value == 20 ? common_vendor.e({
        i: order.value.service_state == 0
      }, order.value.service_state == 0 ? {} : {}, {
        j: order.value.service_state == 1
      }, order.value.service_state == 1 ? {} : {}) : {}, {
        k: orderStatus.value == 30
      }, orderStatus.value == 30 ? {} : {}, {
        l: orderStatus.value == 40
      }, orderStatus.value == 40 ? {} : {}, {
        m: orderStatus.value == 20
      }, orderStatus.value == 20 ? {
        n: order.value._staff.avatar_url,
        o: common_vendor.t(order.value._staff.nickname),
        p: common_vendor.o(($event) => makePhoneCall(order.value._staff.mobile))
      } : {}, {
        q: common_vendor.t(order.value.service_name),
        r: order.value.service_stype <= 20
      }, order.value.service_stype <= 20 ? common_vendor.e({
        s: common_vendor.t(order.value.hospital_name),
        t: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        v: common_vendor.t(order.value.client_name),
        w: common_vendor.t(order.value.client_sex == 1 ? "男" : "女"),
        x: common_vendor.t(order.value.client_age),
        y: common_vendor.t(order.value.tel),
        z: order.value.service_stype == 15
      }, order.value.service_stype == 15 ? {
        A: common_vendor.t(order.value.receiveAddress)
      } : {}) : {}, {
        B: order.value.service_stype > 20 && order.value.service_stype < 100
      }, order.value.service_stype > 20 && order.value.service_stype < 100 ? {
        C: common_vendor.t(order.value.hospital_name),
        D: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        E: common_vendor.t(order.value.address.userName),
        F: common_vendor.t(order.value.address.telNumber),
        G: common_vendor.t(order.value.address.cityName),
        H: common_vendor.t(order.value.address.countyName),
        I: common_vendor.t(order.value.address.detailInfo)
      } : {}, {
        J: order.value.service_stype > 100
      }, order.value.service_stype > 100 ? {
        K: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        L: common_vendor.t(order.value.client_name),
        M: common_vendor.t(order.value.client_sex == 1 ? "男" : "女"),
        N: common_vendor.t(order.value.client_age),
        O: common_vendor.t(order.value.client_mobile),
        P: common_vendor.t(order.value.address.address)
      } : {}, {
        Q: common_vendor.t(order.value.demand),
        R: common_vendor.t(order.value.tel),
        S: common_vendor.p({
          timestamp: order.value.order_start_time,
          format: "YYYY-MM-dd hh:mm"
        }),
        T: common_vendor.t(order.value.price),
        U: orderStatus.value == 20
      }, orderStatus.value == 20 ? {
        V: common_vendor.t(order.value.price),
        W: common_vendor.p({
          timestamp: order.value.pay_time,
          format: "YYYY-MM-dd hh:mm"
        })
      } : {}, {
        X: common_vendor.t(order.value.out_trade_no),
        Y: common_assets._imports_0$1,
        Z: common_vendor.o(closeQRCodePopup),
        aa: common_vendor.sr(QRCodePopup, "86379e58-6", {
          "k": "QRCodePopup"
        }),
        ab: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
