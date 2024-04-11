"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const service = common_vendor.ref({});
    const hospital_index = common_vendor.ref(0);
    const hospitals = common_vendor.ref([]);
    const hospitals_price = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      getServiceDetail(option);
      console.log(option, "option");
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
                hospitals_price.value = hosI.service_price;
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
      hospitals_price.value = hospitals[changeIndex].service_price;
      console.log(e, "onHospitalChange");
    };
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
        h: hospitals.value
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Documents/HBuilderProjects/peizhengproject/pages/service/index.vue"]]);
wx.createPage(MiniProgramPage);
