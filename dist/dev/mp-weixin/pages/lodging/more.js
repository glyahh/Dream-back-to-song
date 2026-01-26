"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      buildings: [
        {
          id: 1,
          name: "河南洛阳环溪",
          location: "河南洛阳",
          image: "/static/building-huanyixi.png",
          description: "宋代著名园林，以溪流环绕为特色",
          path: "/pages/lodging/detail/huanyixi"
        },
        {
          id: 2,
          name: "山西晋祠圣母殿",
          location: "山西太原",
          image: "/static/building-jinci.png",
          description: "宋代建筑代表，精美的建筑工艺",
          path: "/pages/lodging/detail/jinci"
        },
        {
          id: 3,
          name: "河北承德避暑山庄",
          location: "河北承德",
          image: "/static/building-hebei.png",
          description: "清代皇家园林，深受宋代影响",
          path: "/pages/lodging/detail/hebei"
        },
        {
          id: 4,
          name: "苏州拙政园",
          location: "江苏苏州",
          image: "/static/building-suzhou.png",
          description: "江南古典园林的代表作品",
          path: "/pages/lodging/detail/suzhou"
        },
        {
          id: 5,
          name: "开封铁塔",
          location: "河南开封",
          image: "/static/nav-architecture.jpg",
          description: "宋代建筑，中国现存最早的琉璃塔",
          path: ""
        },
        {
          id: 6,
          name: "应县木塔",
          location: "山西应县",
          image: "/static/nav-architecture.jpg",
          description: "宋代木结构建筑，世界现存最古老的木塔",
          path: ""
        }
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    goToDetail(building) {
      if (building.path) {
        common_vendor.index.navigateTo({
          url: building.path
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.buildings, (building, index, i0) => {
      return {
        a: building.image,
        b: common_vendor.t(building.name),
        c: common_vendor.t(building.location),
        d: common_vendor.t(building.description),
        e: index,
        f: common_vendor.o(($event) => $options.goToDetail(building), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-741e3c89"]]);
wx.createPage(MiniProgramPage);
