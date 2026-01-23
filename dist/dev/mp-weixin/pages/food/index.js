"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      // 可以添加数据
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.redirectTo({
        url: "/pages/main_index/main_index"
      });
    },
    // 跳转到分类页面
    goToCategory(category) {
      const routes = {
        meat: "/pages/food/category/meat",
        vegetarian: "/pages/food/category/vegetarian",
        dessert: "/pages/food/category/dessert",
        noodle: "/pages/food/category/noodle",
        drink: "/pages/food/category/drink"
      };
      common_vendor.index.navigateTo({
        url: routes[category]
      });
    },
    // 跳转到食在宋朝页面
    goToSongDynasty() {
      common_vendor.index.navigateTo({
        url: "/pages/food/song-dynasty"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$4,
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_assets._imports_1$3,
    d: common_vendor.o(($event) => $options.goToCategory("meat")),
    e: common_assets._imports_2$3,
    f: common_vendor.o(($event) => $options.goToCategory("noodle")),
    g: common_assets._imports_3$1,
    h: common_vendor.o(($event) => $options.goToCategory("vegetarian")),
    i: common_assets._imports_4$1,
    j: common_vendor.o(($event) => $options.goToCategory("dessert")),
    k: common_assets._imports_5$1,
    l: common_vendor.o(($event) => $options.goToCategory("drink")),
    m: common_vendor.o((...args) => $options.goToSongDynasty && $options.goToSongDynasty(...args)),
    n: common_assets._imports_6
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dccd5ad7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/food/index.js.map
