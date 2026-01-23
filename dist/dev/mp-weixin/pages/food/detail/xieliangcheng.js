"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      dish: {
        id: 1,
        name: "东坡肉",
        image: "/static/xieniangcheng-detail.png",
        // 请确保路径正确
        liked: false
      }
    };
  },
  onLoad(options) {
    if (options.id) {
      this.dish.id = options.id;
    }
    if (options.name) {
      this.dish.name = decodeURIComponent(options.name);
    }
  },
  methods: {
    goBack() {
      common_vendor.index.redirectTo({
        url: "/pages/food/category/meat"
      });
    },
    toggleLike() {
      this.dish.liked = !this.dish.liked;
      common_vendor.index.showToast({
        title: this.dish.liked ? "已点赞" : "已取消点赞",
        icon: "none",
        duration: 800
      });
    },
    startMaking() {
      common_vendor.index.navigateTo({
        url: "/pages/making/making?id=" + this.dish.id
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $data.dish.image,
    c: common_vendor.t($data.dish.liked ? "❤️" : "🤍"),
    d: $data.dish.liked ? 1 : "",
    e: common_vendor.o((...args) => $options.toggleLike && $options.toggleLike(...args)),
    f: common_vendor.t($data.dish.name),
    g: common_vendor.o((...args) => $options.startMaking && $options.startMaking(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aef01145"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/food/detail/xieliangcheng.js.map
