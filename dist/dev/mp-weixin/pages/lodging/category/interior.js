"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      interiorItems: [
        {
          name: "厅堂设计",
          image: "/static/nav-interior.jpg",
          description: "宋代厅堂设计注重空间的开阔与通透，体现了宋代人对生活品质的追求。",
          style: "简洁典雅",
          feature: "空间开阔"
        },
        {
          name: "书房设计",
          image: "/static/nav-interior.jpg",
          description: "宋代书房设计体现了文人的雅致品味，注重采光与通风，营造良好的阅读环境。",
          style: "文人雅致",
          feature: "采光通风"
        },
        {
          name: "卧室设计",
          image: "/static/nav-interior.jpg",
          description: "宋代卧室设计注重私密性与舒适性，布局合理，装饰精致。",
          style: "舒适私密",
          feature: "布局合理"
        },
        {
          name: "厨房设计",
          image: "/static/nav-interior.jpg",
          description: "宋代厨房设计注重实用性与功能性，体现了宋代饮食文化的繁荣。",
          style: "实用功能",
          feature: "功能完善"
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
    b: common_vendor.f($data.interiorItems, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.description),
        d: common_vendor.t(item.style),
        e: common_vendor.t(item.feature),
        f: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-81d26783"]]);
wx.createPage(MiniProgramPage);
