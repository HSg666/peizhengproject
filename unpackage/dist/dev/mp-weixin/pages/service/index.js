"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_dtPicker2 = common_vendor.resolveComponent("dtPicker");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_dtPicker2 + _easycom_uni_popup2)();
}
const _easycom_dtPicker = () => "../../components/dtPicker/dtPicker.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_dtPicker + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const service = common_vendor.ref({});
    const hospital_index = common_vendor.ref(0);
    const hospitals = common_vendor.ref([]);
    const cfg = common_vendor.reactive({
      // 服务协议
      page_xy: "",
      page_fw: ""
    });
    const is_xieyi = common_vendor.ref(false);
    const order = common_vendor.reactive({
      price: "",
      // 价格
      starttime: 0,
      // 就诊时间
      tel: "",
      // 联系电话
      demand: "",
      // 服务需求
      address: {
        userName: "",
        cityName: "",
        countyName: "",
        detailInfo: ""
      },
      receiveAddress: ""
      // 接送地址
    });
    const userReceiveInfo = common_vendor.ref("");
    const personInfo = common_vendor.ref({
      name: "",
      age: "",
      mobile: "",
      sex: ""
    });
    const popup = common_vendor.ref(null);
    const validMobile = common_vendor.ref({
      validCode: "",
      // 验证码
      phone: ""
      // 手机号
    });
    const countdown = common_vendor.ref({
      validText: "获取验证码",
      time: 60
      // 倒计时
    });
    const QRCodePopup = common_vendor.ref(null);
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
    const onStartTimeChanged = (e) => {
      order.starttime = e.detail.value;
    };
    const goSelectPerson = () => {
      common_vendor.index.navigateTo({
        url: "/pages/clients/index?act=select"
      });
    };
    const onAddressChange = () => {
      common_vendor.index.chooseAddress({
        success: (res) => {
          const {
            cityName,
            countyName,
            detailInfo,
            userName
          } = res;
          userReceiveInfo.value = res ? userName + "(" + cityName + countyName + detailInfo + ")" : "";
          order.address.userName = userName;
          order.address.cityName = cityName;
          order.address.countyName = countyName;
          order.address.detailInfo = detailInfo;
          console.log(res, "res");
        },
        fail: (err) => {
          console.log(err, "err");
        }
      });
    };
    const onXieyiChange = () => {
      is_xieyi.value = !is_xieyi.value;
    };
    let orderData;
    const submit = () => {
      if (!is_xieyi.value) {
        return common_vendor.index.showToast({
          title: "请您阅读并同意<用户协议>和服务协议",
          duration: 1e3,
          icon: ""
        });
      }
      const serviceData = common_vendor.toRaw(service.value);
      orderData = common_vendor.toRaw(order);
      const personInfoData = common_vendor.toRaw(personInfo.value);
      const hospitalsData = common_vendor.toRaw(hospitals.value);
      if (serviceData) {
        if (serviceData.stype < 100) {
          if (hospital_index.value == 0) {
            return common_vendor.index.showToast({
              title: "请选择医院",
              duration: 1e3,
              icon: ""
            });
          }
          orderData.hospital_id = hospitalsData[hospital_index.value].id;
          orderData.hospital_name = hospitalsData[hospital_index.value].name;
        }
        if (serviceData.stype == "10" || serviceData.stype == "15" || serviceData.stype == "20") {
          if (orderData.starttime == 0) {
            return common_vendor.index.showToast({
              title: "请选择就诊时间",
              duration: 1e3,
              icon: ""
            });
          }
          if (personInfoData.name == "") {
            return common_vendor.index.showToast({
              title: "请选择就诊人",
              duration: 1e3,
              icon: ""
            });
          }
          if (serviceData.stype == "15") {
            if (!orderData.receiveAddress) {
              return common_vendor.index.showToast({
                title: "请填写接送地址",
                duration: 1e3,
                icon: ""
              });
            }
          }
          orderData.client = personInfoData;
        }
        if (serviceData.stype == "30" || serviceData.stype == "40") {
          if (orderData.starttime == 0) {
            return common_vendor.index.showToast({
              title: "请选择服务时间",
              duration: 1e3,
              icon: ""
            });
          }
          if (!orderData.address.userName) {
            return common_vendor.index.showToast({
              title: "请选择收件信息",
              duration: 1e3,
              icon: ""
            });
          }
        }
      }
      if (!order.tel) {
        return common_vendor.index.showToast({
          title: "请填写联系电话",
          duration: 1e3,
          icon: ""
        });
      }
      orderData.service_code = serviceData.code;
      orderData.service_id = serviceData.id;
      orderData.service_name = serviceData.name;
      orderData.service_stype = serviceData.stype;
      console.log(orderData, "提交订单的数据");
      if (!common_vendor.index.getStorageSync("token")) {
        popup.value.open("center");
      } else {
        createOrder(orderData);
      }
    };
    let flag = false;
    const countdownChange = () => {
      if (!validMobile.value.phone) {
        return common_vendor.index.showToast({
          title: "请输入手机号",
          duration: 1e3,
          icon: "none"
        });
      }
      if (flag)
        return;
      flag = true;
      const timer = setInterval(() => {
        if (countdown.value.time <= 0) {
          countdown.value.validText = "获取验证码";
          countdown.value.time = 60;
          clearInterval(timer);
          flag = false;
        } else {
          countdown.value.time -= 1;
          countdown.value.validText = `剩余${countdown.value.time}S`;
        }
      }, 1e3);
      app.globalData.utils.request({
        url: "/get/code",
        method: "POST",
        data: {
          tel: validMobile.value.phone
          // 手机号
        },
        success: (res) => {
          common_vendor.index.showToast({
            title: "验证码发送成功,请尽快验证!",
            duration: 1e3,
            icon: "none"
          });
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: res.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      });
    };
    const cancal = () => {
      popup.value.close();
    };
    const ok = () => {
      if (!validMobile.value.phone || !validMobile.value.validCode) {
        return common_vendor.index.showToast({
          title: "请检查输入信息",
          duration: 1e3,
          icon: "none"
        });
      }
      app.globalData.utils.request({
        url: "/user/authentication",
        method: "POST",
        data: {
          tel: validMobile.value.phone,
          // 手机号
          code: validMobile.value.validCode
          // 验证码
        },
        success: (res) => {
          common_vendor.index.setStorageSync("token", res.data.data.token);
          popup.value.close();
          createOrder(orderData);
        },
        fail: (res) => {
          popup.value.close();
          common_vendor.index.showToast({
            title: res.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      });
    };
    const createOrder = (params) => {
      QRCodePopup.value.open("center");
      app.globalData.utils.request({
        url: "/pay/createOrder",
        method: "POST",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: params,
        success: (res) => {
          formatWXPayToQRCode(res.data.wx_code);
        },
        fail: (res) => {
          console.log(res);
        }
      });
    };
    const closeQRCodePopup = () => {
      QRCodePopup.value.close();
      common_vendor.index.switchTab({
        url: "../order/index"
      });
    };
    const formatWXPayToQRCode = (url) => {
      var qr = new common_vendor.UQRCode();
      qr.data = url;
      qr.size = 200;
      qr.make();
      var canvasContext = common_vendor.index.createCanvasContext("qrcode");
      qr.canvasContext = canvasContext;
      qr.drawCanvas();
    };
    common_vendor.index.$on("clientData", (data) => {
      const {
        age,
        mobile,
        sex,
        name
      } = data;
      personInfo.value.name = name;
      personInfo.value.mobile = mobile;
      personInfo.value.sex = sex;
      personInfo.value.age = age;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$5,
        b: service.value.icon_image ? service.value.icon_image_url : "../../static/resource/images/avatar.jpg",
        c: common_vendor.t(service.value.name),
        d: common_vendor.o(handleServiceTap),
        e: hospitals.value.length > 0 && service.value.stype == "10" || service.value.stype == "15" || service.value.stype == "20"
      }, hospitals.value.length > 0 && service.value.stype == "10" || service.value.stype == "15" || service.value.stype == "20" ? common_vendor.e({
        f: hospitals.value[hospital_index.value].name,
        g: common_vendor.o(onHospitalChange),
        h: hospital_index.value,
        i: hospitals.value,
        j: common_vendor.o(onStartTimeChanged),
        k: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择就诊时间"
        }),
        l: personInfo.value.name,
        m: common_vendor.o(goSelectPerson),
        n: service.value.stype == 15
      }, service.value.stype == 15 ? {
        o: order.receiveAddress,
        p: common_vendor.o(($event) => order.receiveAddress = $event.detail.value)
      } : {}, {
        q: order.tel,
        r: common_vendor.o(($event) => order.tel = $event.detail.value),
        s: order.demand,
        t: common_vendor.o(($event) => order.demand = $event.detail.value)
      }) : {}, {
        v: hospitals.value.length > 0 && service.value.stype == "30" || service.value.stype == "40"
      }, hospitals.value.length > 0 && service.value.stype == "30" || service.value.stype == "40" ? {
        w: hospitals.value[hospital_index.value].name,
        x: common_vendor.o(onHospitalChange),
        y: hospital_index.value,
        z: hospitals.value,
        A: common_vendor.o(onStartTimeChanged),
        B: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择期望服务时间"
        }),
        C: userReceiveInfo.value,
        D: common_vendor.o(onAddressChange),
        E: order.tel,
        F: common_vendor.o(($event) => order.tel = $event.detail.value),
        G: order.demand,
        H: common_vendor.o(($event) => order.demand = $event.detail.value)
      } : {}, {
        I: common_vendor.n("is_xieyi " + (is_xieyi.value ? "is_xieyi_on" : "")),
        J: common_vendor.o(onXieyiChange),
        K: cfg.page_xy,
        L: cfg.page_fw,
        M: order.price > 0
      }, order.price > 0 ? {
        N: common_vendor.t(order.price)
      } : {}, {
        O: common_vendor.n("btnp " + (is_xieyi.value ? "" : "btnp-disabled")),
        P: common_vendor.o(submit),
        Q: validMobile.value.phone,
        R: common_vendor.o(($event) => validMobile.value.phone = $event.detail.value),
        S: validMobile.value.validCode,
        T: common_vendor.o(($event) => validMobile.value.validCode = $event.detail.value),
        U: common_vendor.t(countdown.value.validText),
        V: common_vendor.o(countdownChange),
        W: common_vendor.o(cancal),
        X: common_vendor.o(ok),
        Y: common_vendor.sr(popup, "081b76ea-2", {
          "k": "popup"
        }),
        Z: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        }),
        aa: common_assets._imports_0$1,
        ab: common_vendor.o(closeQRCodePopup),
        ac: common_vendor.sr(QRCodePopup, "081b76ea-3", {
          "k": "QRCodePopup"
        }),
        ad: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
