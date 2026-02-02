"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      dish: {
        id: 1,
        name: "汤面",
        image: "/static/food_noodle.jpg",
        liked: false
      },
      isNavigating: false
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
      if (this.isNavigating)
        return;
      this.isNavigating = true;
      common_vendor.index.navigateBack({
        delta: 1,
        fail: () => {
          this.isNavigating = false;
          common_vendor.index.redirectTo({
            url: "/pages/food/category/noodle"
          });
        },
        complete: () => {
          setTimeout(() => {
            this.isNavigating = false;
          }, 300);
        }
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
        url: "/pages/food/making/tangmian_making?id=" + this.dish.id
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6b10f74a"]]);
wx.createPage(MiniProgramPage);
