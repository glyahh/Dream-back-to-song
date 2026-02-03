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
      ],
      // 宋朝美学画卷轮播
      aestheticCurrentIndex: 0,
      aestheticGallery: [
        {
          key: "qingming",
          img: "/static/painting-qingming.png",
          tag: "宋画一角",
          title: "汴河烟树",
          desc: "沿着画卷缓缓移动，街市与楼船次第展开，是可以行走其间的宋朝烟火。"
        },
        {
          key: "qianli",
          img: "/static/painting-qianli.png",
          tag: "远山长卷",
          title: "千里江山",
          desc: "青绿与金粉铺陈山川气象，色彩却温润内敛，如同宋人收拾好的山河梦。"
        },
        {
          key: "qiuchuang",
          img: "/static/painting-qiuchuang.png",
          tag: "一窗秋意",
          title: "秋窗风雨",
          desc: "檐下几片落叶、案头一卷残书，画中留住的是宋人最细微的日常心绪。"
        }
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
    onAestheticSwiperChange(e) {
      this.aestheticCurrentIndex = e.detail.current;
    },
    handleCard(item) {
      if (item.title === "服饰") {
        common_vendor.index.redirectTo({
          // 修改为 redirectTo
          url: "/pages/clothes/index1"
        });
      } else if (item.title === "饮食") {
        common_vendor.index.redirectTo({
          // 修改为 redirectTo
          url: "/pages/food/index"
        });
      } else if (item.title === "住宿") {
        common_vendor.index.redirectTo({
          // 修改为 redirectTo
          url: "/pages/lodging/index"
        });
      } else if (item.title === "出行") {
        common_vendor.index.redirectTo({
          // 修改为 redirectTo
          url: "/pages/travel/index"
        });
      } else {
        common_vendor.index.showToast({
          title: `前往${item.title}`,
          icon: "none"
        });
      }
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
    j: common_vendor.f($data.aestheticGallery, (item, index, i0) => {
      return {
        a: item.img,
        b: common_vendor.t(item.tag),
        c: common_vendor.t(item.title),
        d: common_vendor.t(item.desc),
        e: item.key
      };
    }),
    k: $data.aestheticCurrentIndex,
    l: common_vendor.o((...args) => $options.onAestheticSwiperChange && $options.onAestheticSwiperChange(...args)),
    m: common_vendor.f($data.aestheticGallery, (item, index, i0) => {
      return {
        a: item.key,
        b: index === $data.aestheticCurrentIndex ? 1 : ""
      };
    }),
    n: $data.pageReady ? 1 : "",
    o: $data.pageReady ? 1 : "",
    p: common_vendor.f($data.tabs, (tab, k0, i0) => {
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
