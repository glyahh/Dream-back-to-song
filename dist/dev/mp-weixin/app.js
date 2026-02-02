"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/loading/loading.js";
  "./pages/index/index.js";
  "./pages/main_index/main_index.js";
  "./pages/clothes/index1.js";
  "./pages/food/index.js";
  "./pages/apparel/index.js";
  "./pages/apparel/beizi.js";
  "./pages/clothes/design/design.js";
  "./pages/food/category/meat.js";
  "./pages/food/category/vegetarian.js";
  "./pages/food/category/noodle.js";
  "./pages/food/category/dessert.js";
  "./pages/food/category/drink.js";
  "./pages/food/detail/dongporou.js";
  "./pages/food/detail/pangxiegeng.js";
  "./pages/food/detail/xieliangcheng.js";
  "./pages/food/detail/xiansunzhengji.js";
  "./pages/food/detail/shanzhuyang.js";
  "./pages/food/detail/jianxiaoji.js";
  "./pages/food/making/making.js";
  "./pages/food/making/step2.js";
  "./pages/food/making/step3.js";
  "./pages/food/making/step4.js";
  "./pages/food/making/step5.js";
  "./pages/food/making/step6.js";
  "./pages/food/making/complete.js";
  "./pages/lodging/index.js";
  "./pages/lodging/painting/gallery.js";
  "./pages/discover/discover.js";
  "./pages/market/market.js";
  "./pages/market/detail.js";
  "./pages/market/series.js";
  "./pages/market/all.js";
  "./pages/me/me.js";
  "./pages/travel/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
