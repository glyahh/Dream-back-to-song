"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeNav: "me",
      pageReady: false,
      profile: {
        nickname: "烟雨朦胧",
        avatar: "/static/avatar.png"
      },
      tabs: [
        { key: "home", label: "首页", path: "/pages/main_index/main_index" },
        { key: "discover", label: "发现", path: "/pages/discover/discover" },
        { key: "market", label: "集市", path: "/pages/market/market" },
        { key: "me", label: "我的", path: "/pages/me/me" }
      ]
    };
  },
  onShow() {
    this.loadProfile();
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
    loadProfile() {
      try {
        const stored = common_vendor.index.getStorageSync("me_profile");
        if (stored && typeof stored === "object") {
          this.profile = {
            ...this.profile,
            ...stored
          };
        }
      } catch (e) {
      }
    },
    editProfile() {
      common_vendor.index.navigateTo({
        url: "/pages/me/profile-edit"
      });
    },
    goToOrders() {
      common_vendor.index.navigateTo({
        url: "/pages/me/orders"
      });
    },
    goToCreations() {
      common_vendor.index.navigateTo({
        url: "/pages/me/creations"
      });
    },
    goToCollections() {
      common_vendor.index.navigateTo({
        url: "/pages/me/collections"
      });
    },
    goToPosts() {
      common_vendor.index.navigateTo({
        url: "/pages/me/posts"
      });
    },
    goToFollowing() {
      common_vendor.index.navigateTo({
        url: "/pages/me/following"
      });
    },
    goToMessages() {
      common_vendor.index.navigateTo({
        url: "/pages/me/messages"
      });
    },
    goToFeedback() {
      common_vendor.index.navigateTo({
        url: "/pages/me/feedback"
      });
    },
    goToSettings() {
      common_vendor.index.navigateTo({
        url: "/pages/me/settings"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.pageReady ? 1 : "",
    b: common_vendor.o((...args) => $options.editProfile && $options.editProfile(...args)),
    c: $data.pageReady ? 1 : "",
    d: $data.profile.avatar,
    e: common_vendor.t($data.profile.nickname),
    f: $data.pageReady ? 1 : "",
    g: common_vendor.o((...args) => $options.goToOrders && $options.goToOrders(...args)),
    h: common_vendor.o((...args) => $options.goToCreations && $options.goToCreations(...args)),
    i: common_vendor.o((...args) => $options.goToCollections && $options.goToCollections(...args)),
    j: $data.pageReady ? 1 : "",
    k: common_vendor.o((...args) => $options.goToPosts && $options.goToPosts(...args)),
    l: common_vendor.o((...args) => $options.goToFollowing && $options.goToFollowing(...args)),
    m: common_vendor.o((...args) => $options.goToMessages && $options.goToMessages(...args)),
    n: common_vendor.o((...args) => $options.goToFeedback && $options.goToFeedback(...args)),
    o: common_vendor.o((...args) => $options.goToSettings && $options.goToSettings(...args)),
    p: $data.pageReady ? 1 : "",
    q: common_vendor.f($data.tabs, (tab, k0, i0) => {
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
