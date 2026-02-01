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
      console.log("第六步页面收到的id:", this.dishId);
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
    goToStep5() {
      common_vendor.index.navigateBack();
    },
    goToComplete() {
      console.log("跳转到完成页，id:", this.dishId);
      if (!this.dishId) {
        common_vendor.index.showToast({ title: "数据错误，请返回重试", icon: "none" });
        return;
      }
      common_vendor.index.redirectTo({
        url: `/pages/food/making/complete?id=${this.dishId}`,
        fail: (err) => {
          console.error("跳转失败:", err);
          common_vendor.index.showModal({
            title: "跳转失败",
            content: `错误信息: ${JSON.stringify(err)}
请检查页面是否存在`,
            showCancel: false
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_assets._imports_0$11,
    c: common_assets._imports_1$4,
    d: common_vendor.o((...args) => $options.goToStep5 && $options.goToStep5(...args)),
    e: common_assets._imports_1$4,
    f: common_vendor.o((...args) => $options.goToComplete && $options.goToComplete(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f03455bf"]]);
wx.createPage(MiniProgramPage);
