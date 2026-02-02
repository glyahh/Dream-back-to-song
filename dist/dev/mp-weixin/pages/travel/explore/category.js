"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      categories: [
        {
          name: "按距离分类",
          image: "/static/travel-explore-category.png",
          description: "根据出行距离的不同，选择不同的出行方式",
          items: ["短途出行", "中途出行", "长途出行"]
        },
        {
          name: "按目的分类",
          image: "/static/travel-explore-category.png",
          description: "根据出行目的的不同，选择不同的出行方式",
          items: ["公务出行", "商业出行", "探亲访友", "旅游观光"]
        },
        {
          name: "按阶层分类",
          image: "/static/travel-explore-category.png",
          description: "不同社会阶层的人，出行方式也有所不同",
          items: ["官员出行", "商人出行", "文人出行", "平民出行"]
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
    b: common_vendor.f($data.categories, (category, index, i0) => {
      return {
        a: category.image,
        b: common_vendor.t(category.name),
        c: common_vendor.t(category.description),
        d: common_vendor.f(category.items, (item, iIndex, i1) => {
          return {
            a: common_vendor.t(item),
            b: iIndex
          };
        }),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-23332de1"]]);
wx.createPage(MiniProgramPage);
