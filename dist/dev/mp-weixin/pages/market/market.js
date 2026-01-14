"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      activeNav: "market",
      pageReady: false,
      heroCurrentIndex: 0,
      heroCarouselList: [
        "/static/ji_shi/titile_bg.png",
        "/static/ji_shi/market_2.png",
        "/static/ji_shi/market_3.png",
        "/static/ji_shi/market_4.png"
      ],
      hotProducts: [
        { name: "青山远黛餐盘", img: "/static/ji_shi/left_picture.png" },
        { name: "青绿流苏团扇", img: "/static/ji_shi/right_bg.png" }
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
    onHeroSwiperChange(e) {
      this.heroCurrentIndex = e.detail.current;
    },
    switchNav(key) {
      if (this.activeNav === key)
        return;
      this.activeNav = key;
      const tab = this.tabs.find((t) => t.key === key);
      if (tab && tab.path && tab.path !== "/pages/market/market") {
        common_vendor.index.redirectTo({
          url: tab.path
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.heroCarouselList, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: $data.heroCurrentIndex,
    c: common_vendor.o((...args) => $options.onHeroSwiperChange && $options.onHeroSwiperChange(...args)),
    d: $data.pageReady ? 1 : "",
    e: common_vendor.f($data.heroCarouselList, (item, index, i0) => {
      return {
        a: index,
        b: index === $data.heroCurrentIndex ? 1 : ""
      };
    }),
    f: common_assets._imports_0$4,
    g: common_assets._imports_1$2,
    h: common_assets._imports_2$2,
    i: $data.pageReady ? 1 : "",
    j: $data.pageReady ? 1 : "",
    k: common_vendor.f($data.hotProducts, (item, k0, i0) => {
      return {
        a: item.img,
        b: common_vendor.t(item.name),
        c: item.name
      };
    }),
    l: $data.pageReady ? 1 : "",
    m: common_assets._imports_3,
    n: common_vendor.f($data.tabs, (tab, k0, i0) => {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d5ebafbc"]]);
wx.createPage(MiniProgramPage);
