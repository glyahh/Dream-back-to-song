"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      routes: [
        {
          name: "京杭大运河",
          image: "/static/travel-nav-atlas.jpg",
          description: "连接南北的重要水路交通线，是宋代最重要的交通动脉之一。",
          start: "北京",
          end: "杭州",
          distance: "约1800公里"
        },
        {
          name: "汴京至洛阳",
          image: "/static/travel-nav-atlas.jpg",
          description: "连接北宋都城与古都的重要陆路交通线。",
          start: "汴京",
          end: "洛阳",
          distance: "约300公里"
        },
        {
          name: "临安至苏州",
          image: "/static/travel-nav-atlas.jpg",
          description: "南宋时期连接都城与江南重镇的重要水路。",
          start: "临安",
          end: "苏州",
          distance: "约200公里"
        },
        {
          name: "长江水路",
          image: "/static/travel-nav-atlas.jpg",
          description: "横贯东西的重要水路交通线，连接多个重要城市。",
          start: "四川",
          end: "江苏",
          distance: "约2000公里"
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
    b: common_vendor.f($data.routes, (route, index, i0) => {
      return {
        a: route.image,
        b: common_vendor.t(route.name),
        c: common_vendor.t(route.description),
        d: common_vendor.t(route.start),
        e: common_vendor.t(route.end),
        f: common_vendor.t(route.distance),
        g: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a93763fc"]]);
wx.createPage(MiniProgramPage);
