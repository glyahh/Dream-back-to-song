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
      common_vendor.index.redirectTo({
        url: "/pages/food/detail/dongporou?id=" + this.dishId
      });
    },
    goToStep1() {
      common_vendor.index.navigateBack();
    },
    goToStep3() {
      common_vendor.index.navigateTo({
        url: "/pages/food/making/step3?id=" + this.dishId
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_assets._imports_0$7,
    c: common_assets._imports_1$4,
    d: common_vendor.o((...args) => $options.goToStep1 && $options.goToStep1(...args)),
    e: common_assets._imports_1$4,
    f: common_vendor.o((...args) => $options.goToStep3 && $options.goToStep3(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-130f52b6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/food/making/step2.js.map
