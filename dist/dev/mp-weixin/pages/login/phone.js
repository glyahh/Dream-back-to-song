"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_userProfile = require("../../utils/userProfile.js");
const utils_auth = require("../../utils/auth.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      phone: "",
      code: "",
      counting: false,
      countDown: 60,
      timer: null
    };
  },
  computed: {
    validPhone() {
      return /^1\d{10}$/.test(this.phone);
    },
    validCode() {
      return this.code && this.code.length === 6;
    }
  },
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    backToLogin() {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    },
    async sendCode() {
      if (this.counting || !this.validPhone)
        return;
      try {
        await utils_auth.sendVerifyCode(this.phone);
        common_vendor.index.showToast({
          title: "验证码已发送",
          icon: "none"
        });
        this.counting = true;
        this.countDown = 60;
        this.timer = setInterval(() => {
          this.countDown -= 1;
          if (this.countDown <= 0) {
            clearInterval(this.timer);
            this.timer = null;
            this.counting = false;
          }
        }, 1e3);
      } catch (e) {
        common_vendor.index.showToast({
          title: "发送失败，请稍后重试",
          icon: "none"
        });
      }
    },
    async confirmLogin() {
      if (!this.validPhone) {
        common_vendor.index.showToast({ title: "请输入正确的手机号", icon: "none" });
        return;
      }
      if (!this.validCode) {
        common_vendor.index.showToast({ title: "请输入 6 位验证码", icon: "none" });
        return;
      }
      try {
        await utils_auth.verifyCode(this.phone, this.code);
      } catch (e) {
        common_vendor.index.showToast({ title: "验证码错误或已失效", icon: "none" });
        return;
      }
      try {
        const base = utils_userProfile.getUserProfile();
        utils_userProfile.saveUserProfile({
          ...base,
          phone: this.phone
        });
      } catch (e) {
      }
      common_vendor.index.showToast({ title: "登录成功（示意）", icon: "success" });
      setTimeout(() => {
        common_vendor.index.reLaunch({
          url: "/pages/main_index/main_index"
        });
      }, 600);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: $data.phone,
    d: common_vendor.o(($event) => $data.phone = $event.detail.value),
    e: $data.code,
    f: common_vendor.o(($event) => $data.code = $event.detail.value),
    g: common_vendor.t($data.counting ? $data.countDown + "s" : "获取验证码"),
    h: $data.counting || !$options.validPhone ? 1 : "",
    i: common_vendor.o((...args) => $options.sendCode && $options.sendCode(...args)),
    j: !$options.validPhone || !$options.validCode ? 1 : "",
    k: !$options.validPhone || !$options.validCode,
    l: common_vendor.o((...args) => $options.confirmLogin && $options.confirmLogin(...args)),
    m: common_vendor.o((...args) => $options.backToLogin && $options.backToLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ca029e96"]]);
wx.createPage(MiniProgramPage);
