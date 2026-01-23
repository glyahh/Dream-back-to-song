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
    common_vendor.index.__f__("log", "at pages/food/making/complete.vue:66", "完成页加载，参数:", options);
    if (options.id) {
      this.dishId = options.id;
    }
  },
  methods: {
    goBack() {
      common_vendor.index.reLaunch({
        url: "/pages/food/detail/dongporou?id=" + this.dishId
      });
    },
    // 保存功能
    handleSave() {
      common_vendor.index.__f__("log", "at pages/food/making/complete.vue:81", "保存图片");
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success",
        duration: 2e3
      });
    },
    // 分享功能
    handleShare() {
      common_vendor.index.__f__("log", "at pages/food/making/complete.vue:91", "分享图片");
      common_vendor.index.showToast({
        title: "分享成功",
        icon: "success",
        duration: 2e3
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_assets._imports_0$12,
    c: common_assets._imports_1$5,
    d: common_vendor.o((...args) => $options.handleSave && $options.handleSave(...args)),
    e: common_assets._imports_2$4,
    f: common_vendor.o((...args) => $options.handleShare && $options.handleShare(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-61a885d5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/food/making/complete.js.map
