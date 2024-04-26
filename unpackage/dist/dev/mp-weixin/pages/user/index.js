"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_share2 = common_vendor.resolveComponent("share");
  _easycom_share2();
}
const _easycom_share = () => "../../components/share/share.js";
if (!Math) {
  _easycom_share();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const mine = common_vendor.ref({});
    const statistic = common_vendor.ref({});
    common_vendor.onShow(() => {
      getUserInfo();
    });
    const getUserInfo = () => {
      app.globalData.utils.request({
        url: "/User/index",
        method: "GET",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        success: (res) => {
          mine.value = res.data.data.mine;
          statistic.value = res.data.data.statistic;
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: res.msg
          });
        }
      });
    };
    const toOrders = (filt) => {
      app.globalData.filt = filt;
      common_vendor.index.switchTab({
        url: "../order/index"
      });
    };
    const clone_shareModal = common_vendor.ref(false);
    const showShareModal = () => {
      clone_shareModal.value = !clone_shareModal.value;
    };
    const toServiceManager = () => {
      common_vendor.index.navigateTo({
        url: "../clients/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: mine.value.avatar
      }, mine.value.avatar ? {
        b: mine.value.avatar_url
      } : {}, {
        c: common_vendor.t(mine.value.nickname ? mine.value.nickname : "用户" + mine.value._id),
        d: common_vendor.o(($event) => toOrders("")),
        e: statistic.value.topays > 0
      }, statistic.value.topays > 0 ? {
        f: common_vendor.t(statistic.value.topays)
      } : {}, {
        g: common_vendor.o(($event) => toOrders(1)),
        h: statistic.value.todos > 0
      }, statistic.value.todos > 0 ? {
        i: common_vendor.t(statistic.value.todos)
      } : {}, {
        j: common_vendor.o(($event) => toOrders(2)),
        k: common_vendor.o(($event) => toOrders(3)),
        l: common_vendor.o(($event) => toOrders(4)),
        m: common_vendor.o(toServiceManager),
        n: common_vendor.o(showShareModal),
        o: common_vendor.p({
          shareModal: clone_shareModal.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Documents/HBuilderProjects/peizhengproject/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
