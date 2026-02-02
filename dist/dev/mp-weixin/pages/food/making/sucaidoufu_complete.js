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
      if (this.isNavigating)
        return;
      this.isNavigating = true;
      common_vendor.index.navigateBack({
        delta: 1,
        fail: () => {
          this.isNavigating = false;
          common_vendor.index.redirectTo({
            url: "/pages/food/detail/sucaidoufu?id=" + this.dishId
          });
        },
        complete: () => {
          setTimeout(() => {
            this.isNavigating = false;
          }, 300);
        }
      });
    },
    goToDetail() {
      common_vendor.index.redirectTo({
        url: "/pages/food/detail/sucaidoufu?id=" + this.dishId
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_assets._imports_0$7,
    c: common_assets._imports_1$4,
    d: common_vendor.o((...args) => $options.goToDetail && $options.goToDetail(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-af22aa08"]]);
wx.createPage(MiniProgramPage);
