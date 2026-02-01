"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      activeTab: "hot",
      activeNav: "discover",
      pageReady: false,
      currentIndex: 0,
      carouselList: [
        { image: "/static/cloth_2.png", title: "" },
        { image: "/static/cloth_3.png", title: "" },
        { image: "/static/discover_bg.png", title: "宋代衣食住行" }
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
    onSwiperChange(e) {
      this.currentIndex = e.detail.current;
    },
    switchTab(tab) {
      this.activeTab = tab;
    },
    switchNav(key) {
      if (this.activeNav === key)
        return;
      this.activeNav = key;
      const tab = this.tabs.find((t) => t.key === key);
      if (tab && tab.path && tab.path !== "/pages/discover/discover") {
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
    b: common_vendor.f($data.carouselList, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: item.title
      }, item.title ? {
        c: common_vendor.t(item.title)
      } : {}, {
        d: index
      });
    }),
    c: $data.currentIndex,
    d: common_vendor.o((...args) => $options.onSwiperChange && $options.onSwiperChange(...args)),
    e: common_vendor.f($data.carouselList, (item, index, i0) => {
      return {
        a: index,
        b: index === $data.currentIndex ? 1 : ""
      };
    }),
    f: $data.pageReady ? 1 : "",
    g: $data.pageReady ? 1 : "",
    h: common_assets._imports_0$16,
    i: common_assets._imports_1$7,
    j: common_assets._imports_2$6,
    k: $data.pageReady ? 1 : "",
    l: $data.activeTab === "hot" ? 1 : "",
    m: common_vendor.o(($event) => $options.switchTab("hot")),
    n: $data.activeTab === "follow" ? 1 : "",
    o: common_vendor.o(($event) => $options.switchTab("follow")),
    p: $data.pageReady ? 1 : "",
    q: common_assets._imports_0$15,
    r: common_assets._imports_4$2,
    s: common_assets._imports_5$2,
    t: $data.pageReady ? 1 : "",
    v: common_vendor.f($data.tabs, (tab, k0, i0) => {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-36f2c107"]]);
wx.createPage(MiniProgramPage);
