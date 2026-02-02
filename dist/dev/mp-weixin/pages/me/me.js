"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      activeNav: "me",
      pageReady: false,
      tabs: [
        { key: "home", label: "首页", path: "/pages/main_index/main_index" },
        { key: "discover", label: "发现", path: "/pages/discover/discover" },
        { key: "market", label: "集市", path: "/pages/market/market" },
        { key: "me", label: "我的", path: "/pages/me/me" }
      ]
    };
  },
  onReady() {
    setTimeout(() => {
      this.pageReady = true;
    }, 50);
  },
  methods: {
    switchNav(key) {
      if (this.activeNav === key)
        return;
      this.activeNav = key;
      const tab = this.tabs.find((t) => t.key === key);
      if (tab && tab.path && tab.path !== "/pages/me/me") {
        common_vendor.index.redirectTo({
          url: tab.path
        });
      }
    },
    editProfile() {
      common_vendor.index.showToast({ title: "编辑资料", icon: "none" });
    },
    goToOrders() {
      common_vendor.index.showToast({ title: "我的订单", icon: "none" });
    },
    goToCreations() {
      common_vendor.index.showToast({ title: "我的创作", icon: "none" });
    },
    goToCollections() {
      common_vendor.index.showToast({ title: "我的收藏", icon: "none" });
    },
    goToPosts() {
      common_vendor.index.showToast({ title: "我的发布", icon: "none" });
    },
    goToFollowing() {
      common_vendor.index.showToast({ title: "我的关注", icon: "none" });
    },
    goToMessages() {
      common_vendor.index.showToast({ title: "消息通知", icon: "none" });
    },
    goToFeedback() {
      common_vendor.index.showToast({ title: "意见反馈", icon: "none" });
    },
    goToSettings() {
      common_vendor.index.showToast({ title: "设置", icon: "none" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.pageReady ? 1 : "",
    b: common_vendor.o((...args) => $options.editProfile && $options.editProfile(...args)),
    c: $data.pageReady ? 1 : "",
    d: common_assets._imports_0$15,
    e: $data.pageReady ? 1 : "",
    f: common_vendor.o((...args) => $options.goToOrders && $options.goToOrders(...args)),
    g: common_vendor.o((...args) => $options.goToCreations && $options.goToCreations(...args)),
    h: common_vendor.o((...args) => $options.goToCollections && $options.goToCollections(...args)),
    i: $data.pageReady ? 1 : "",
    j: common_vendor.o((...args) => $options.goToPosts && $options.goToPosts(...args)),
    k: common_vendor.o((...args) => $options.goToFollowing && $options.goToFollowing(...args)),
    l: common_vendor.o((...args) => $options.goToMessages && $options.goToMessages(...args)),
    m: common_vendor.o((...args) => $options.goToFeedback && $options.goToFeedback(...args)),
    n: common_vendor.o((...args) => $options.goToSettings && $options.goToSettings(...args)),
    o: $data.pageReady ? 1 : "",
    p: common_vendor.f($data.tabs, (tab, k0, i0) => {
      return {
        a: common_vendor.n("icon-" + tab.key),
        b: common_vendor.t(tab.label),
        c: tab.key,
        d: tab.key === $data.activeNav ? 1 : "",
        e: common_vendor.o(($event) => $options.switchNav(tab.key), tab.key)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-371b06ea"]]);
wx.createPage(MiniProgramPage);
