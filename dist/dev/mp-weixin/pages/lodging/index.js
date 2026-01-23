"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      navItems: [
        {
          title: "园林景观",
          icon: "/static/nav-garden.jpg",
          path: "/pages/lodging/category/garden"
        },
        {
          title: "建筑类型",
          icon: "/static/nav-architecture.jpg",
          path: "/pages/lodging/category/architecture"
        },
        {
          title: "室内设计",
          icon: "/static/nav-interior.jpg",
          path: "/pages/lodging/category/interior"
        }
      ],
      recommendedBuildings: [
        {
          name: "河南洛阳环溪",
          location: "河南洛阳",
          image: "/static/building-huanyixi.png",
          path: "/pages/lodging/detail/huanyixi"
        },
        {
          name: "山西晋祠圣母殿",
          location: "山西太原",
          image: "/static/building-jinci.png",
          path: "/pages/lodging/detail/jinci"
        },
        {
          name: "河北承德避暑山庄",
          location: "河北承德",
          image: "/static/building-hebei.png",
          path: "/pages/lodging/detail/hebei"
        },
        {
          name: "苏州拙政园",
          location: "江苏苏州",
          image: "/static/building-suzhou.png",
          path: "/pages/lodging/detail/suzhou"
        }
      ],
      painting: {
        title: "名画中的宋朝居所",
        image: "/static/painting-main.png",
        path: "/pages/lodging/painting/gallery"
      }
    };
  },
  methods: {
    goBack() {
      common_vendor.index.redirectTo({
        url: "/pages/main_index/main_index"
      });
    },
    handleNavClick(item) {
      if (item.path) {
        common_vendor.index.navigateTo({
          url: item.path
        });
      }
    },
    handleBuildingClick(building) {
      if (building.path) {
        common_vendor.index.navigateTo({
          url: building.path
        });
      }
    },
    handlePaintingClick(painting) {
      if (painting.path) {
        common_vendor.index.navigateTo({
          url: painting.path
        });
      }
    },
    goToMoreBuildings() {
      common_vendor.index.navigateTo({
        url: "/pages/lodging/more"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$13,
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_vendor.f($data.navItems, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.title),
        c: index,
        d: common_vendor.o(($event) => $options.handleNavClick(item), index)
      };
    }),
    d: common_vendor.o((...args) => $options.goToMoreBuildings && $options.goToMoreBuildings(...args)),
    e: common_vendor.f($data.recommendedBuildings, (building, index, i0) => {
      return {
        a: building.image,
        b: common_vendor.t(building.name),
        c: common_vendor.t(building.location),
        d: index,
        e: common_vendor.o(($event) => $options.handleBuildingClick(building), index)
      };
    }),
    f: $data.painting.image,
    g: common_vendor.o(($event) => $options.handlePaintingClick($data.painting))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-550acc49"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/lodging/index.js.map
