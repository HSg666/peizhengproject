"use strict";
const common_vendor = require("../../../common/vendor.js");
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
        a: common_vendor.n("od-jd od-jd-" + orderStatus.value),
        b: orderStatus.value == 10
      }, orderStatus.value == 10 ? {
        c: common_vendor.o(onCounterOver),
        d: common_vendor.p({
          second: order.value._exp_time
        }),
        e: common_vendor.t(order.value.price),
        f: common_vendor.o(($event) => dopay(order.value.code_url))
      } : {}, {
        g: orderStatus.value == 20
      }, orderStatus.value == 20 ? common_vendor.e({
        h: order.value.service_state == 0
      }, order.value.service_state == 0 ? {} : {}, {
        i: order.value.service_state == 1
      }, order.value.service_state == 1 ? {} : {}) : {}, {
        j: orderStatus.value == 30
      }, orderStatus.value == 30 ? {} : {}, {
        k: orderStatus.value == 40
      }, orderStatus.value == 40 ? {} : {}, {
        l: orderStatus.value == 20
      }, orderStatus.value == 20 ? {
        m: order.value._staff.avatar_url,
        n: common_vendor.t(order.value._staff.nickname),
        o: common_vendor.o(($event) => makePhoneCall(order.value._staff.mobile))
      } : {}, {
        p: common_vendor.t(order.value.service_name),
        q: order.value.service_stype <= 20
      }, order.value.service_stype <= 20 ? common_vendor.e({
        r: common_vendor.t(order.value.hospital_name),
        s: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        t: common_vendor.t(order.value.client_name),
        v: common_vendor.t(order.value.client_sex == 1 ? "男" : "女"),
        w: common_vendor.t(order.value.client_age),
        x: common_vendor.t(order.value.tel),
        y: order.value.service_stype == 15
      }, order.value.service_stype == 15 ? {
        z: common_vendor.t(order.value.receiveAddress)
      } : {}) : {}, {
        A: order.value.service_stype > 20 && order.value.service_stype < 100
      }, order.value.service_stype > 20 && order.value.service_stype < 100 ? {
        B: common_vendor.t(order.value.hospital_name),
        C: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        D: common_vendor.t(order.value.address.userName),
        E: common_vendor.t(order.value.address.telNumber),
        F: common_vendor.t(order.value.address.cityName),
        G: common_vendor.t(order.value.address.countyName),
        H: common_vendor.t(order.value.address.detailInfo)
      } : {}, {
        I: order.value.service_stype > 100
      }, order.value.service_stype > 100 ? {
        J: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        K: common_vendor.t(order.value.client_name),
        L: common_vendor.t(order.value.client_sex == 1 ? "男" : "女"),
        M: common_vendor.t(order.value.client_age),
        N: common_vendor.t(order.value.client_mobile),
        O: common_vendor.t(order.value.address.address)
      } : {}, {
        P: common_vendor.t(order.value.demand),
        Q: common_vendor.t(order.value.tel),
        R: common_vendor.p({
          timestamp: order.value.order_start_time,
          format: "YYYY-MM-dd hh:mm"
        }),
        S: common_vendor.t(order.value.price),
        T: orderStatus.value == 20
      }, orderStatus.value == 20 ? {
        U: common_vendor.t(order.value.price),
        V: common_vendor.p({
          timestamp: order.value.pay_time,
          format: "YYYY-MM-dd hh:mm"
        })
      } : {}, {
        W: common_vendor.t(order.value.out_trade_no),
        X: common_vendor.o(closeQRCodePopup),
        Y: common_vendor.sr(QRCodePopup, "86379e58-6", {
          "k": "QRCodePopup"
        }),
        Z: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Documents/HBuilderProjects/peizhengproject/pages/order/orderDetail/index.vue"]]);
wx.createPage(MiniProgramPage);
