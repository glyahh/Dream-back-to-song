"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      scenes: [
        {
          id: 1,
          title: "官员出行",
          description: "体验宋代官员的出行方式，感受官场的威严与礼仪",
          image: "/static/travel-explore-experience.png"
        },
        {
          id: 2,
          title: "商人出行",
          description: "体验宋代商人的出行方式，感受商业活动的繁忙",
          image: "/static/travel-explore-experience.png"
        },
        {
          id: 3,
          title: "文人出行",
          description: "体验宋代文人的出行方式，感受文人的雅致与闲适",
          image: "/static/travel-explore-experience.png"
        },
        {
          id: 4,
          title: "平民出行",
          description: "体验宋代平民的出行方式，感受普通人的生活",
          image: "/static/travel-explore-experience.png"
        }
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    startExperience(scene) {
      common_vendor.index.showToast({
        title: "体验功能开发中",
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.scenes, (scene, index, i0) => {
      return {
        a: scene.image,
        b: common_vendor.t(scene.title),
        c: common_vendor.t(scene.description),
        d: common_vendor.o(($event) => $options.startExperience(scene), index),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ba7150d5"]]);
wx.createPage(MiniProgramPage);
