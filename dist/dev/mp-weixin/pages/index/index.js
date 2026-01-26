"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      // 当前识别手机号（示例），实际可从后端或微信能力获取
      phone: "15212345746",
      // 是否已勾选协议
      isAgreed: false
    };
  },
  computed: {
    // 掩码后的手机号显示，保护隐私
    maskedPhone() {
      if (!this.phone)
        return "";
      return this.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
    }
  },
  methods: {
    // 切换协议勾选
    toggleAgree() {
      this.isAgreed = !this.isAgreed;
    },
    // 一键登录点击
    handleOneTapLogin() {
      if (!this.isAgreed) {
        common_vendor.index.showToast({
          title: "请先阅读并同意协议",
          icon: "none"
        });
        return;
      }
      common_vendor.index.reLaunch({
        url: "/pages/main_index/main_index"
      });
    },
    // 其他手机号登录点击
    handleOtherPhone() {
      common_vendor.index.showToast({
        title: "模拟：跳转到手机号验证码登录页",
        icon: "none"
      });
    },
    // 打开用户协议
    handleOpenUser() {
      common_vendor.index.showToast({
        title: "打开《用户协议》",
        icon: "none"
      });
    },
    // 打开隐私政策
    handleOpenPrivacy() {
      common_vendor.index.showToast({
        title: "打开《隐私政策》",
        icon: "none"
      });
    },
    // 微信登录点击
    handleWechatLogin() {
      common_vendor.index.showToast({
        title: "微信登录（示意）",
        icon: "none"
      });
    },
    // QQ 登录点击
    handleQQLogin() {
      common_vendor.index.showToast({
        title: "QQ 登录（示意）",
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$1,
    b: common_vendor.t($options.maskedPhone),
    c: !$data.isAgreed ? 1 : "",
    d: !$data.isAgreed,
    e: common_vendor.o((...args) => $options.handleOneTapLogin && $options.handleOneTapLogin(...args)),
    f: common_vendor.o((...args) => $options.handleOtherPhone && $options.handleOtherPhone(...args)),
    g: $data.isAgreed
  }, $data.isAgreed ? {} : {}, {
    h: $data.isAgreed ? 1 : "",
    i: common_vendor.o((...args) => $options.handleOpenUser && $options.handleOpenUser(...args)),
    j: common_vendor.o((...args) => $options.handleOpenPrivacy && $options.handleOpenPrivacy(...args)),
    k: common_vendor.o((...args) => $options.toggleAgree && $options.toggleAgree(...args)),
    l: common_assets._imports_1$1,
    m: common_vendor.o((...args) => $options.handleWechatLogin && $options.handleWechatLogin(...args)),
    n: common_assets._imports_2$1,
    o: common_vendor.o((...args) => $options.handleQQLogin && $options.handleQQLogin(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
