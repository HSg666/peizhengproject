"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "counter",
  props: {
    second: {
      type: Number,
      default: 0
    },
    format: {
      type: String,
      default: "MM-dd hh:mm"
    },
    sformat: {
      type: String,
      default: "hh:mm:ss"
    },
    suffix: {
      type: String,
      default: ""
    }
  },
  emits: ["counterOver"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formater = common_vendor.ref("");
    common_vendor.onMounted(() => {
      formater.value = TIME_FORMAT(props.second);
    });
    const TIME_FORMAT = (ts) => {
      let res;
      const showtime = () => {
        if (ts <= 0) {
          clearInterval(run);
          emit("counterOver");
          return TIME_SFORMAT(0, props.sformat, props.suffix);
        }
        res = TIME_SFORMAT(ts, props.sformat, props.suffix);
        return res;
      };
      const run = setInterval(() => {
        ts -= 1e3;
        res = showtime();
        formater.value = res;
      }, 1e3);
    };
    const TIME_FORMIN = (param) => {
      if (param < 0) {
        param = 0;
      }
      if (param < 10) {
        param = "0" + param;
      }
      return param;
    };
    const TIME_SFORMAT = (ts, sfmt, suffix) => {
      const time = {
        "h+": TIME_FORMIN(Math.floor(ts / 1e3 / 60 / 60 % 24)),
        "m+": TIME_FORMIN(Math.floor(ts / 1e3 / 60 % 60)),
        "s+": TIME_FORMIN(Math.floor(ts / 1e3 % 60))
      };
      for (let k in time) {
        if (new RegExp("(" + k + ")").test(sfmt)) {
          sfmt = sfmt.replace(RegExp.$1, RegExp.$1.length == 1 ? time[k] : ("00" + time[k]).substr(("" + time[k]).length));
        }
      }
      return sfmt + suffix;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(formater.value)
      };
    };
  }
};
wx.createComponent(_sfc_main);
