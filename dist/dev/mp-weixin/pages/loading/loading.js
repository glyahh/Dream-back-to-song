"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      showFirstPage: true,
      // 是否显示第一页
      showAnimation: false,
      // 第一页动画控制
      swiperIndex: 0,
      // swiper当前索引（0-2，对应第2、3、4页）
      autoPlayTimer: null,
      // 自动播放定时器
      firstPageTimer: null
      // 第一页等待定时器
    };
  },
  onLoad() {
    this.startFirstPageAnimation();
    this.startFirstPageTimer();
  },
  onUnload() {
    this.clearAllTimers();
  },
  computed: {
    // 是否显示跳过按钮（最后一张不显示）
    showSkipBtn() {
      return !this.showFirstPage && this.swiperIndex !== 2;
    }
  },
  methods: {
    // 启动第一页动画
    startFirstPageAnimation() {
      setTimeout(() => {
        this.showAnimation = true;
      }, 100);
    },
    // 第一页等待3秒后切换到第二页
    startFirstPageTimer() {
      this.firstPageTimer = setTimeout(() => {
        if (this.showFirstPage) {
          this.showFirstPage = false;
          this.swiperIndex = 0;
          this.startAutoPlay();
        }
      }, 3e3);
    },
    // 启动自动播放（5秒切换一页）
    startAutoPlay() {
      this.clearAutoPlayTimer();
      this.autoPlayTimer = setInterval(() => {
        if (this.swiperIndex < 2) {
          this.swiperIndex++;
        } else {
          this.clearAutoPlayTimer();
        }
      }, 5e3);
    },
    // 清理自动播放定时器
    clearAutoPlayTimer() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
    },
    // 清理所有定时器
    clearAllTimers() {
      this.clearAutoPlayTimer();
      if (this.firstPageTimer) {
        clearTimeout(this.firstPageTimer);
        this.firstPageTimer = null;
      }
    },
    // 轮播图切换事件
    handleSwiperChange(e) {
      const newIndex = e.detail.current;
      this.swiperIndex = newIndex;
      if (this.swiperIndex < 2) {
        this.startAutoPlay();
      } else {
        this.clearAutoPlayTimer();
      }
    },
    // 跳过按钮点击
    handleSkip() {
      this.clearAllTimers();
      this.navigateToLogin();
    },
    // 进入按钮点击（最后一页）
    handleEnter() {
      this.clearAllTimers();
      this.navigateToLogin();
    },
    // 跳转到登录页
    navigateToLogin() {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.showSkipBtn
  }, $options.showSkipBtn ? {
    b: common_vendor.o((...args) => $options.handleSkip && $options.handleSkip(...args))
  } : {}, {
    c: $data.showFirstPage
  }, $data.showFirstPage ? {
    d: common_assets._imports_0,
    e: common_assets._imports_1,
    f: common_assets._imports_2,
    g: $data.showAnimation ? 1 : ""
  } : common_vendor.e({
    h: common_assets._imports_3,
    i: common_assets._imports_4,
    j: common_assets._imports_5,
    k: common_vendor.o((...args) => $options.handleEnter && $options.handleEnter(...args)),
    l: $data.swiperIndex,
    m: common_vendor.o((...args) => $options.handleSwiperChange && $options.handleSwiperChange(...args)),
    n: $data.swiperIndex < 2
  }, $data.swiperIndex < 2 ? {
    o: common_vendor.f(3, (item, index, i0) => {
      return {
        a: index,
        b: $data.swiperIndex === index ? 1 : ""
      };
    })
  } : {}));
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8c647b94"]]);
wx.createPage(MiniProgramPage);
