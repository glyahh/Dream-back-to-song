"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      settings: {
        notify: true,
        sound: true,
        dataSaver: false
      },
      cacheSize: "6.3"
    };
  },
  onLoad() {
    this.initSettings();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    initSettings() {
      try {
        const stored = common_vendor.index.getStorageSync("me_settings");
        if (stored && typeof stored === "object") {
          this.settings = { ...this.settings, ...stored };
        }
      } catch (e) {
      }
    },
    saveSettings() {
      try {
        common_vendor.index.setStorageSync("me_settings", this.settings);
      } catch (e) {
      }
    },
    onToggle(key, e) {
      const value = e.detail.value;
      this.settings = { ...this.settings, [key]: value };
      this.saveSettings();
    },
    clearCache() {
      common_vendor.index.showModal({
        title: "清理缓存",
        content: "确定要清理本地缓存吗？不会影响订单与账号数据。",
        success: (res) => {
          if (res.confirm) {
            this.cacheSize = "0.0";
            common_vendor.index.showToast({ title: "已清理", icon: "success" });
          }
        }
      });
    },
    about() {
      common_vendor.index.showModal({
        title: "关于「梦回宋朝」",
        content: "这是一幅可以慢慢逛的宋朝画卷，从衣食住行到市井烟火，尝试用小程序的形式重构一段日常。当前版本为课程项目演示用，所有数据均为示意。",
        showCancel: false
      });
    },
    logout() {
      common_vendor.index.showModal({
        title: "退出登录",
        content: "退出后仍可再次登录，不会丢失订单与收藏数据。",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({ title: "已退出（示意）", icon: "none" });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/index/index"
              });
            }, 600);
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $data.settings.notify,
    c: common_vendor.o(($event) => $options.onToggle("notify", $event)),
    d: $data.settings.sound,
    e: common_vendor.o(($event) => $options.onToggle("sound", $event)),
    f: $data.settings.dataSaver,
    g: common_vendor.o(($event) => $options.onToggle("dataSaver", $event)),
    h: common_vendor.t($data.cacheSize),
    i: common_vendor.o((...args) => $options.clearCache && $options.clearCache(...args)),
    j: common_vendor.o((...args) => $options.about && $options.about(...args)),
    k: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9b3b4787"]]);
wx.createPage(MiniProgramPage);
