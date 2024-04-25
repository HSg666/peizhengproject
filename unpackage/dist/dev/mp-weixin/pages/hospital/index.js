"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  const _easycom_share2 = common_vendor.resolveComponent("share");
  (_component_navbar + _easycom_share2)();
}
const _easycom_share = () => "../../components/share/share.js";
if (!Math) {
  _easycom_share();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const hospital = common_vendor.ref({});
    const services = common_vendor.ref({});
    const clone_shareModal = common_vendor.ref(false);
    common_vendor.onLoad((option) => {
      getHospitalDetail(option.hid);
    });
    const getHospitalDetail = (hid) => {
      app.globalData.utils.request({
        url: "/Hospital/index",
        method: "GET",
        data: {
          hid
        },
        success: (res) => {
          hospital.value = res.data.data.hospital;
          services.value = res.data.data.services;
        },
        fail: (res) => {
          console.log(res);
        }
      });
    };
    const toService = (id) => {
    };
    const showShareModal = () => {
      clone_shareModal.value = !clone_shareModal.value;
    };
    const toMap = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["title-text"]: "",
          isHeight: false,
          isWhite: true,
          background: "none"
        }),
        b: hospital.value.avatar_url,
        c: hospital.value.avatar_url,
        d: common_vendor.t(hospital.value.name),
        e: common_vendor.t(hospital.value.rank),
        f: common_vendor.t(hospital.value.label),
        g: common_vendor.o(showShareModal),
        h: common_vendor.t(hospital.value.city),
        i: common_vendor.t(hospital.value.district),
        j: common_vendor.t(hospital.value.address),
        k: common_vendor.o(toMap),
        l: common_vendor.f(services.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.use_switch == 1
          }, item.use_switch == 1 ? {
            b: item.logo_image ? item.logo_image_url : "../../resource/images/avatar.jpg",
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.intro),
            e: common_vendor.t(item.price)
          } : {}, {
            f: common_vendor.o(($event) => toService(item.id), index),
            g: index
          });
        }),
        m: common_vendor.s("position:absolute;top:120rpx;padding-top:65rpx;overflow:hidden;width:100%;"),
        n: common_vendor.p({
          shareModal: clone_shareModal.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Documents/HBuilderProjects/peizhengproject/pages/hospital/index.vue"]]);
wx.createPage(MiniProgramPage);
