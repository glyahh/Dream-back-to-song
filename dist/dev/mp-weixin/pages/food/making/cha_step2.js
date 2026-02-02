"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      dishId: ""
    };
  },
  onLoad(options) {
    if (options.id) {
      this.dishId = options.id;
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    goToStep1() {
      common_vendor.index.navigateBack();
    },
    goToComplete() {
      common_vendor.index.navigateTo({
        url: "/pages/food/making/cha_complete?id=" + this.dishId
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_assets._imports_0$5,
    c: common_assets._imports_1$4,
    d: common_vendor.o((...args) => $options.goToStep1 && $options.goToStep1(...args)),
    e: common_assets._imports_1$4,
    f: common_vendor.o((...args) => $options.goToComplete && $options.goToComplete(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4bb936dd"]]);
wx.createPage(MiniProgramPage);
