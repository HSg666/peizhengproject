"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "dtPicker",
  props: {
    timestamp: {
      type: Number,
      default: 0
    },
    emptyText: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  emits: ["dtPickerChanged"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const now = (/* @__PURE__ */ new Date()).getTime();
    const self_range = common_vendor.ref([]);
    let self_days = null;
    let self_days_text = "";
    let self_hours = null;
    let self_seconds = null;
    const self_value = common_vendor.ref([0, 0, 0]);
    const value_text = common_vendor.ref();
    common_vendor.onBeforeMount(() => {
      const days = [""];
      const days_text = [props.emptyText];
      for (let i = 0; i < 20; i++) {
        days.push(TIME_FORMAT(now + 864e5 * i, "YYYY-MM-dd"));
        let text = TIME_FORMAT(now + 864e5 * i, "M月d日");
        if (i == 0) {
          text += " （今天）";
        }
        if (i == 1) {
          text += " （明天）";
        }
        if (i == 2) {
          text += " （后天）";
        }
        days_text.push(text);
        const hours = [
          "00",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23"
        ];
        const seconds = [
          "00",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
          "43",
          "44",
          "45",
          "46",
          "47",
          "48",
          "49",
          "50",
          "51",
          "52",
          "53",
          "54",
          "55",
          "56",
          "57",
          "58",
          "59"
        ];
        const range = [];
        range[0] = days_text;
        range[1] = hours;
        range[2] = seconds;
        self_range.value = range;
        self_days = days;
        self_days_text = days_text;
        self_hours = hours;
        self_seconds = seconds;
      }
    });
    const doChange = () => {
      value_text.value = getValueText();
      var day = self_days[self_value.value[0]];
      var hour = self_hours[self_value.value[1]];
      var second = self_seconds[self_value.value[2]];
      var datetime = "";
      if (day) {
        datetime = day + " " + hour + ":" + second;
      }
      var timestamp = 0;
      if (datetime) {
        timestamp = new Date(datetime.replace(/-/g, "/")).getTime();
      }
      emit("dtPickerChanged", {
        detail: {
          value: timestamp
        }
      });
    };
    const doColumnChange = (e) => {
      var value = self_value.value;
      value[e.detail.column] = e.detail.value;
      self_value.value = value;
    };
    const TIME_FORMAT = (t, fmt) => {
      const newDate = /* @__PURE__ */ new Date();
      newDate.setTime(t);
      return newDate.VP_FORMAT(fmt);
    };
    const timestampChange = (timestamp) => {
      if (!self_days) {
        return;
      }
      if (timestamp > 0) {
        var days = self_days;
        var hours = self_hours;
        var seconds = self_seconds;
      }
      if (timestamp < now) {
        timestamp = now;
      }
      var date = TIME_FORMAT(timestamp, "YYYY-MM-dd");
      var hour = TIME_FORMAT(timestamp, "hh");
      var minutes = TIME_FORMAT(timestamp, "mm");
      var value = common_vendor.toRaw(self_value.value);
      for (var i = 0; i < days.length; i++) {
        if (date == days[i]) {
          value[0] = i;
          break;
        }
      }
      for (var i = 0; i < hours.length; i++) {
        if (hour == hours[i]) {
          value[1] = i;
          break;
        }
      }
      for (var i = 0; i < seconds.length; i++) {
        if (minutes == seconds[i]) {
          value[2] = i;
          break;
        }
      }
      self_value.value = value;
      value_text.value = getValueText();
    };
    const getValueText = () => {
      var day = self_days_text[self_value.value[0]];
      var hour = self_hours[self_value.value[1]];
      var second = self_seconds[self_value.value[2]];
      if (self_days[self_value.value[0]] == "") {
        return day;
      } else {
        return day + " " + hour + ":" + second;
      }
    };
    console.log(props, "props");
    common_vendor.watch(props.timestamp, (nd) => {
      timestampChange(nd);
    }, { immediate: true });
    return (_ctx, _cache) => {
      return {
        a: __props.placeholder,
        b: value_text.value,
        c: common_vendor.o(doChange),
        d: common_vendor.o(doColumnChange),
        e: self_value.value,
        f: self_range.value
      };
    };
  }
};
wx.createComponent(_sfc_main);
