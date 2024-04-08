"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  _easycom_NavBar2();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
if (!Math) {
  _easycom_NavBar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const bannerList = common_vendor.ref([]);
    const nav2s = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      app.globalData.utils.getUserInfo();
      app.globalData.utils.request({
        url: "/app/init",
        success: ({
          data
        }) => {
          const {
            id
          } = data.data.area;
          app.globalData.utils.request({
            url: "/Index/index",
            data: {
              aid: id
            },
            success: (ress) => {
              bannerList.value = ress.data.data.slides;
              nav2s.value = ress.data.data.nav2s;
              console.log(bannerList.value, "ress");
            }
          });
        }
      });
    });
    const goPage = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          isHome: true
        }),
        b: bannerList.value && bannerList.value.length > 0
      }, bannerList.value && bannerList.value.length > 0 ? {
        c: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: item.id
          };
        })
      } : {}, {
        d: nav2s.value && nav2s.value.length > 0
      }, nav2s.value && nav2s.value.length > 0 ? {
        e: common_vendor.f(nav2s.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: item.id,
            c: common_vendor.o(($event) => goPage(item.stype_link), item.id)
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Documents/HBuilderProjects/peizhengproject/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
