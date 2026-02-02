"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      scrollTop: 0,
      paintings: [
        {
          id: 1,
          name: "千里江山图",
          dynasty: "[北宋]王希孟",
          material: "绢本设色",
          image: "/static/painting-qianli.png",
          detailPath: "/pages/lodging/painting/detail/qianli"
          // 预留详情页路径
        },
        {
          id: 2,
          name: "清明上河图",
          dynasty: "[北宋]张择端",
          material: "绢本设色",
          image: "/static/painting-qingming.png",
          detailPath: "/pages/lodging/painting/detail/qingming"
        },
        {
          id: 3,
          name: "秋窗读书图",
          dynasty: "[南宋]刘松年",
          material: "绢本设色",
          image: "/static/painting-qiuchuang.png",
          detailPath: "/pages/lodging/painting/detail/qiuchuang"
        },
        {
          id: 4,
          name: "妆靓仕女图",
          dynasty: "[北宋]苏汉臣",
          material: "绢本设色",
          image: "/static/painting-zhuangling.png",
          detailPath: "/pages/lodging/painting/detail/zhuangling"
        }
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.redirectTo({
        url: "/pages/lodging/index"
      });
    },
    navigateToDetail(id) {
      const painting = this.paintings.find((item) => item.id === id);
      if (painting && painting.detailPath) {
        common_vendor.index.navigateTo({
          url: painting.detailPath
        });
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/lodging/painting/detail/index?id=${id}`
        });
      }
    },
    onScroll(e) {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_assets._imports_0$14,
    c: common_vendor.o(($event) => $options.navigateToDetail(1)),
    d: common_vendor.o(($event) => $options.navigateToDetail(1)),
    e: common_assets._imports_1$6,
    f: common_vendor.o(($event) => $options.navigateToDetail(2)),
    g: common_vendor.o(($event) => $options.navigateToDetail(2)),
    h: common_assets._imports_2$5,
    i: common_vendor.o(($event) => $options.navigateToDetail(3)),
    j: common_vendor.o(($event) => $options.navigateToDetail(3)),
    k: common_assets._imports_3$2,
    l: common_vendor.o(($event) => $options.navigateToDetail(4)),
    m: common_vendor.o(($event) => $options.navigateToDetail(4)),
    n: $data.scrollTop,
    o: common_vendor.o((...args) => $options.onScroll && $options.onScroll(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-41b59307"]]);
wx.createPage(MiniProgramPage);
