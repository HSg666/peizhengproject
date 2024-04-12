"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_dtPicker2 = common_vendor.resolveComponent("dtPicker");
  _easycom_dtPicker2();
}
const _easycom_dtPicker = () => "../../components/dtPicker/dtPicker.js";
if (!Math) {
  _easycom_dtPicker();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const service = common_vendor.ref({});
    const hospital_index = common_vendor.ref(0);
    const hospitals = common_vendor.ref([]);
    const order = common_vendor.reactive({
      price: "",
      // 价格
      starttime: 0,
      // 就诊时间
      address: {
        userName: "",
        cityName: "",
        countyName: "",
        detailInfo: ""
      }
    });
    const personName = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      getServiceDetail(option);
    });
    const getServiceDetail = (option) => {
      const {
        svid,
        hid
      } = option;
      app.globalData.utils.request({
        url: "/Service/order",
        data: {
          svid
        },
        success: (res) => {
          service.value = res.data.data.service;
          console.log(service.value.stype, "service.value");
          hospitals.value = res.data.data.hospitals;
          if (option.hid > 0) {
            const hospitalsData = common_vendor.toRaw(hospitals.value);
            for (let i = 0; i < hospitalsData.length; i++) {
              let hosI = hospitalsData[i];
              if (hosI.id == option.hid) {
                hospital_index.value = i;
                order.price = hosI.service_price ?? "";
                break;
              }
            }
          }
        }
      });
    };
    const handleServiceTap = () => {
    };
    const onHospitalChange = (e) => {
      const changeIndex = parseInt(e.detail.value);
      hospital_index.value = changeIndex;
      order.price = hospitals.value[changeIndex].service_price ?? "";
    };
    const onStartTimeChange = (e) => {
      order.starttime = e.detail.value;
    };
    const goSelectPerson = () => {
      common_vendor.index.navigateTo({
        url: "/pages/clients/index?act=select"
      });
    };
    common_vendor.index.$on("clientData", (data) => {
      personName.value = data.name;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: service.value.icon_image ? service.value.icon_image_url : "../../static/resource/images/avatar.jpg",
        b: common_vendor.t(service.value.name),
        c: common_vendor.o(handleServiceTap),
        d: hospitals.value.length > 0 && service.value.stype == "40" || service.value.stype == "15" || service.value.stype == "20"
      }, hospitals.value.length > 0 && service.value.stype == "40" || service.value.stype == "15" || service.value.stype == "20" ? {
        e: hospitals.value[hospital_index.value].name,
        f: common_vendor.o(onHospitalChange),
        g: hospital_index.value,
        h: hospitals.value,
        i: common_vendor.o(onStartTimeChange),
        j: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择就诊时间"
        }),
        k: personName.value,
        l: common_vendor.o(goSelectPerson)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Documents/HBuilderProjects/peizhengproject/pages/service/index.vue"]]);
wx.createPage(MiniProgramPage);
