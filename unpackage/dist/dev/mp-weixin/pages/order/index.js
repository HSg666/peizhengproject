"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_formater2 = common_vendor.resolveComponent("formater");
  const _easycom_counter2 = common_vendor.resolveComponent("counter");
  (_easycom_formater2 + _easycom_counter2)();
}
const _easycom_formater = () => "../../components/formater/formater.js";
const _easycom_counter = () => "../../components/counter/counter.js";
if (!Math) {
  (_easycom_formater + _easycom_counter)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const filt = common_vendor.ref("");
    const list = common_vendor.ref([]);
    common_vendor.onShow(() => {
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
      getOrderList();
    };
    const toOrder = (id) => {
      common_vendor.index.navigateTo({
        url: `./orderDetail/index?oid=${id}`
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
      }, list.value != null && list.value.length == 0 ? {} : {
        m: common_vendor.f(list.value, (item, index, i0) => {
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
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Documents/HBuilderProjects/peizhengproject/pages/order/index.vue"]]);
wx.createPage(MiniProgramPage);
