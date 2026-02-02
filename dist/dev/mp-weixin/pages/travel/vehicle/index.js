"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      vehicles: [
        {
          name: "马车",
          image: "/static/travel-nav-vehicle.jpg",
          description: "宋代主要的陆路交通工具，速度快，适合中长距离出行。",
          speed: "较快",
          capacity: "2-4人",
          usage: "日常出行"
        },
        {
          name: "牛车",
          image: "/static/travel-nav-vehicle.jpg",
          description: "宋代常见的交通工具，速度较慢但稳定，适合载重。",
          speed: "较慢",
          capacity: "多人",
          usage: "货物运输"
        },
        {
          name: "轿子",
          image: "/static/travel-nav-vehicle.jpg",
          description: "宋代贵族和官员的专用交通工具，体现身份地位。",
          speed: "慢",
          capacity: "1-2人",
          usage: "身份象征"
        },
        {
          name: "船只",
          image: "/static/travel-nav-atlas.jpg",
          description: "宋代水路交通的主要工具，适合水路出行和货物运输。",
          speed: "中等",
          capacity: "多人",
          usage: "水路出行"
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
    b: common_vendor.f($data.vehicles, (vehicle, index, i0) => {
      return {
        a: vehicle.image,
        b: common_vendor.t(vehicle.name),
        c: common_vendor.t(vehicle.description),
        d: common_vendor.t(vehicle.speed),
        e: common_vendor.t(vehicle.capacity),
        f: common_vendor.t(vehicle.usage),
        g: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-766a5033"]]);
wx.createPage(MiniProgramPage);
