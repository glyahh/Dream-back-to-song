"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      activeTab: "home",
      pressedIndex: -1,
      pageReady: false,
      cards: [
        { title: "服饰", img: "/static/fushi.png" },
        { title: "饮食", img: "/static/yinshi.png" },
        { title: "住宿", img: "/static/zhusuo.png" },
        { title: "出行", img: "/static/chuxin.png" }
      ],
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
    handleTouchStart(index) {
      this.pressedIndex = index;
    },
    handleTouchEnd() {
      setTimeout(() => {
        this.pressedIndex = -1;
      }, 150);
    },
    handleCard(item) {
      common_vendor.index.showToast({
        title: `前往${item.title}`,
        icon: "none"
      });
    },
    switchTab(key) {
      this.activeTab = key;
      const tab = this.tabs.find((t) => t.key === key);
      if (tab && tab.path && tab.key !== "home") {
        common_vendor.index.redirectTo({
          url: tab.path
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.pageReady ? 1 : "",
    b: common_assets._imports_0$2,
    c: $data.pageReady ? 1 : "",
    d: $data.pageReady ? 1 : "",
    e: $data.pageReady ? 1 : "",
    f: common_vendor.f($data.cards, (item, index, i0) => {
      return {
        a: item.img,
        b: common_vendor.t(item.title),
        c: item.title,
        d: $data.pressedIndex === index ? 1 : "",
        e: common_vendor.o(($event) => $options.handleTouchStart(index), item.title),
        f: common_vendor.o((...args) => $options.handleTouchEnd && $options.handleTouchEnd(...args), item.title),
        g: common_vendor.o(($event) => $options.handleCard(item), item.title)
      };
    }),
    g: $data.pageReady ? 1 : "",
    h: $data.pageReady ? 1 : "",
    i: $data.pageReady ? 1 : "",
    j: common_vendor.f($data.tabs, (tab, k0, i0) => {
      return {
        a: common_vendor.n("icon-" + tab.key),
        b: common_vendor.t(tab.label),
        c: tab.key,
        d: tab.key === $data.activeTab ? 1 : "",
        e: common_vendor.o(($event) => $options.switchTab(tab.key), tab.key)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-03c595bb"]]);
wx.createPage(MiniProgramPage);
