"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_userProfile = require("../../utils/userProfile.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      // 当前识别手机号，初始为空，待用户授权后由微信能力或后端写入
      phone: "",
      // 是否已勾选协议
      isAgreed: false
    };
  },
  onShow() {
    const profile = utils_userProfile.getUserProfile();
    this.phone = profile.phone || "";
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
    // 一键登录点击：
    // - 如果还没有手机号：提示当前无法自动获取微信手机号，引导去短信验证码登录页
    // - 如果已有手机号（用户之前用验证码登陆过）：直接进入首页
    handleOneTapLogin() {
      if (!this.isAgreed) {
        common_vendor.index.showToast({
          title: "请先阅读并同意协议",
          icon: "none"
        });
        return;
      }
      if (!this.phone) {
        common_vendor.index.showModal({
          title: "请先绑定手机号",
          content: "当前版本暂不支持自动获取微信绑定手机号，请先使用手机号码 + 短信验证码登录。登录成功后，下次即可在此一键登录。",
          confirmText: "去验证码登录",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.navigateTo({
                url: "/pages/login/phone"
              });
            }
          }
        });
        return;
      }
      this.completeLogin();
    },
    // 完成登录：统一的跳转逻辑
    completeLogin() {
      common_vendor.index.reLaunch({
        url: "/pages/main_index/main_index"
      });
    },
    // 其他手机号登录点击
    handleOtherPhone() {
      common_vendor.index.navigateTo({
        url: "/pages/login/phone"
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
