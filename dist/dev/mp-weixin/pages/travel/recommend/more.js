"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      recommendations: [
        {
          id: 1,
          title: "汴京街市车马图",
          desc: "北宋都城繁华的交通景象",
          image: "/static/travel-recommend-main.png",
          path: "/pages/travel/recommend/detail"
        },
        {
          id: 2,
          title: "清明上河图",
          desc: "展现宋代城市交通的经典画作",
          image: "/static/painting-qingming.png",
          path: "/pages/travel/recommend/detail"
        },
        {
          id: 3,
          title: "宋代交通图",
          desc: "宋代交通网络的详细地图",
          image: "/static/travel-nav-atlas.jpg",
          path: "/pages/travel/recommend/detail"
        },
        {
          id: 4,
          title: "出行工具图鉴",
          desc: "宋代各种交通工具的详细介绍",
          image: "/static/travel-nav-vehicle.jpg",
          path: "/pages/travel/recommend/detail"
        }
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    goToDetail(item) {
      if (item.path) {
        common_vendor.index.navigateTo({
          url: item.path
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.recommendations, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.desc),
        d: index,
        e: common_vendor.o(($event) => $options.goToDetail(item), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-abd3e9a8"]]);
wx.createPage(MiniProgramPage);
