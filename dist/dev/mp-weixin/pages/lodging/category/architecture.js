"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      architectureTypes: [
        {
          name: "宫殿建筑",
          image: "/static/nav-architecture.jpg",
          description: "宋代宫殿建筑规模宏大，布局严谨，体现了皇权的威严与尊贵。",
          features: ["规模宏大", "布局严谨", "装饰精美"]
        },
        {
          name: "寺庙建筑",
          image: "/static/building-jinci.png",
          description: "宋代寺庙建筑融合了宗教文化与建筑艺术，形成了独特的建筑风格。",
          features: ["宗教文化", "建筑艺术", "风格独特"]
        },
        {
          name: "民居建筑",
          image: "/static/building-hebei.png",
          description: "宋代民居建筑注重实用性与美观性的结合，体现了宋代人的生活智慧。",
          features: ["实用美观", "布局合理", "生活智慧"]
        },
        {
          name: "园林建筑",
          image: "/static/building-suzhou.png",
          description: "宋代园林建筑追求自然与人文的和谐统一，形成了独特的园林美学。",
          features: ["自然和谐", "人文统一", "美学独特"]
        }
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.architectureTypes, (type, index, i0) => {
      return {
        a: type.image,
        b: common_vendor.t(type.name),
        c: common_vendor.t(type.description),
        d: common_vendor.f(type.features, (feature, fIndex, i1) => {
          return {
            a: common_vendor.t(feature),
            b: fIndex
          };
        }),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5af9c80d"]]);
wx.createPage(MiniProgramPage);
