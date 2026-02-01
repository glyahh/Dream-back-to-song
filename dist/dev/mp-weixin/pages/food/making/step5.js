"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      dishId: "",
      isNavigating: false
    };
  },
  onLoad(options) {
    if (options.id) {
      this.dishId = options.id;
    }
  },
  methods: {
    goBack() {
      if (this.isNavigating)
        return;
      this.isNavigating = true;
      common_vendor.index.navigateBack({
        delta: 1,
        fail: () => {
          this.isNavigating = false;
          common_vendor.index.redirectTo({
            url: "/pages/food/detail/dongporou?id=" + this.dishId
          });
        },
        complete: () => {
          setTimeout(() => {
            this.isNavigating = false;
          }, 300);
        }
      });
    },
    goToStep4() {
      common_vendor.index.navigateBack();
    },
    goToStep6() {
      common_vendor.index.navigateTo({
        url: "/pages/food/making/step6?id=" + this.dishId
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_assets._imports_0$10,
    c: common_assets._imports_1$4,
    d: common_vendor.o((...args) => $options.goToStep4 && $options.goToStep4(...args)),
    e: common_assets._imports_1$4,
    f: common_vendor.o((...args) => $options.goToStep6 && $options.goToStep6(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9f21ce0a"]]);
wx.createPage(MiniProgramPage);
