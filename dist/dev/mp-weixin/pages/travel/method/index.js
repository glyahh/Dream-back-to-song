"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      methods: [
        {
          name: "步行出行",
          image: "/static/travel-nav-method.jpg",
          description: "宋代城市内最常见的出行方式，适合短距离出行。",
          features: ["便捷灵活", "适合短途", "经济实惠"]
        },
        {
          name: "车马出行",
          image: "/static/travel-nav-vehicle.jpg",
          description: "宋代重要的交通工具，包括马车、牛车等，适合中长距离出行。",
          features: ["速度较快", "适合长途", "地位象征"]
        },
        {
          name: "水路出行",
          image: "/static/travel-nav-atlas.jpg",
          description: "宋代水路交通发达，船只成为重要的出行工具，尤其适合江南地区。",
          features: ["运载量大", "适合水路", "舒适平稳"]
        },
        {
          name: "轿子出行",
          image: "/static/travel-nav-wiki.jpg",
          description: "宋代贵族和官员常用的出行方式，体现了社会等级和身份地位。",
          features: ["身份象征", "舒适安全", "等级体现"]
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
    b: common_vendor.f($data.methods, (method, index, i0) => {
      return {
        a: method.image,
        b: common_vendor.t(method.name),
        c: common_vendor.t(method.description),
        d: common_vendor.f(method.features, (feature, fIndex, i1) => {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0fc36a52"]]);
wx.createPage(MiniProgramPage);
