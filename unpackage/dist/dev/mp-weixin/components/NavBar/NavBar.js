"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "NavBar",
  props: {
    // 状态栏
    StatusBGColor: {
      type: String,
      default: "rgba(255,255,255,1)"
    },
    // 内容
    containerBGColor: {
      type: String,
      default: "rgba(255,255,255,1)"
    },
    // 字体大小
    fontSize: {
      type: Number,
      default: 32
    },
    // 文字颜色
    textColor: {
      type: String,
      default: "rgba(0,0,0,1)"
    },
    // 图片宽度
    iconWidth: {
      type: Number,
      default: 116
    },
    // 图片高度
    iconHeight: {
      type: Number,
      default: 38
    },
    // 标题
    title: {
      type: String,
      default: "首页"
    },
    isHome: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const statusH = common_vendor.ref(0);
    const containerH = common_vendor.ref(0);
    const statusBackground = common_vendor.ref("");
    const contaninerBackground = common_vendor.ref("");
    const iconStyle = common_vendor.ref("");
    const textStyle = common_vendor.ref("");
    const pageLeng = common_vendor.ref(getCurrentPages().length);
    const menu = common_vendor.reactive(common_vendor.index.getMenuButtonBoundingClientRect());
    const setNavStyle = () => {
      const {
        statusBarHeight,
        system
      } = common_vendor.index.getSystemInfoSync();
      statusH.value = statusBarHeight * 2;
      const isIOS = system.indexOf("iOS") > -1;
      if (!isIOS) {
        containerH.value = 96;
      } else {
        containerH.value = 88;
      }
    };
    const setStyle = () => {
      const {
        StatusBGColor,
        containerBGColor,
        iconHeight,
        iconWidth,
        fontSize,
        textColor
      } = props;
      statusBackground.value = ["background-color:" + StatusBGColor].join(";");
      contaninerBackground.value = ["background-color:" + containerBGColor].join(";");
      iconStyle.value = ["width:" + iconWidth + "rpx;height:" + iconHeight + "rpx"].join(";");
      textStyle.value = ["color:" + textColor + ";font-size:" + fontSize + "rpx"].join(";");
    };
    const goPage = () => {
      if (pageLeng.value > 1) {
        common_vendor.index.navigateBack({
          delta: pageLeng.value
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/index/index"
        });
      }
    };
    common_vendor.onBeforeMount(() => {
      setNavStyle();
      setStyle();
    });
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s("height:" + statusH.value + "rpx;" + statusBackground.value),
        b: __props.isHome
      }, __props.isHome ? {
        c: common_vendor.s("height:" + menu.height * 2 + "rpx;line-height:" + menu.height * 2 + "rpx;margin-left:56rpx;margin-right:" + (menu.width * 2 + 24) + "rpx;margin-top:" + (menu.top * 2 - statusH.value) + "rpx;"),
        d: common_vendor.s("height:" + containerH.value + "rpx;line-height:" + containerH.value + "rpx;")
      } : common_vendor.e({
        e: pageLeng.value > 1
      }, pageLeng.value > 1 ? {
        f: common_assets._imports_0$6
      } : {
        g: common_assets._imports_1$1
      }, {
        h: common_vendor.o(goPage),
        i: common_vendor.t(__props.title),
        j: common_vendor.s("height:" + containerH.value + "rpx;line-height:" + containerH.value + "rpx;" + textStyle.value),
        k: common_vendor.s("height:" + containerH.value + "rpx;" + contaninerBackground.value)
      }));
    };
  }
};
wx.createComponent(_sfc_main);
