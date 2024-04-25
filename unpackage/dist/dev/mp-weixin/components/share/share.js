"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "share",
  props: ["shareModal"],
  setup(__props) {
    const props = __props;
    const shareModalClone = common_vendor.ref(false);
    const preventTouchMove = () => {
      console.log("占位：函数 preventTouchMove 未声明");
    };
    const hideShareModal = () => {
      shareModalClone.value = false;
    };
    const shareByPoster = () => {
    };
    console.log(props.shareModal, "shareModal");
    common_vendor.watch(() => props.shareModal, (val) => {
      shareModalClone.value = val;
    }, { immediate: true });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: shareModalClone.value
      }, shareModalClone.value ? {
        b: common_vendor.o(preventTouchMove)
      } : {}, {
        c: shareModalClone.value
      }, shareModalClone.value ? {
        d: common_vendor.o(hideShareModal),
        e: common_vendor.o(hideShareModal),
        f: common_vendor.o(shareByPoster)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Documents/HBuilderProjects/peizhengproject/components/share/share.vue"]]);
wx.createComponent(Component);
