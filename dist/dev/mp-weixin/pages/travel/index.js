"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      // 导航图标数据 - 四个项目
      navItems: [
        {
          title: "出行方式",
          icon: "/static/travel-nav-method.jpg",
          path: "/pages/travel/method/index"
        },
        {
          title: "交通工具",
          icon: "/static/travel-nav-vehicle.jpg",
          path: "/pages/travel/vehicle/index"
        },
        {
          title: "出行百科",
          icon: "/static/travel-nav-wiki.jpg",
          path: "/pages/travel/wiki/index"
        },
        {
          title: "交通图典",
          icon: "/static/travel-nav-atlas.jpg",
          path: "/pages/travel/atlas/index"
        }
      ],
      // 探索出行数据
      exploreItems: [
        {
          title: "出行体验",
          desc: "体验宋朝人的出行方式",
          image: "/static/travel-explore-experience.png",
          path: "/pages/travel/explore/experience"
        },
        {
          title: "分类",
          desc: "种类丰富多样",
          image: "/static/travel-explore-category.png",
          path: "/pages/travel/explore/category"
        },
        {
          title: "特征",
          desc: "地域和阶层",
          image: "/static/travel-explore-feature.jpg",
          path: "/pages/travel/explore/feature"
        }
      ],
      // 主推荐项目
      mainRecommendation: {
        title: "汴京街市车马图",
        desc: "北宋都城繁华的交通景象",
        image: "/static/travel-recommend-main.png",
        path: "/pages/travel/recommend/detail"
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
    handleExploreClick(item) {
      if (item.path) {
        common_vendor.index.navigateTo({
          url: item.path
        });
      }
    },
    handleRecommendationClick(item) {
      if (item.path) {
        common_vendor.index.navigateTo({
          url: item.path
        });
      }
    },
    goToMoreRecommendations() {
      common_vendor.index.navigateTo({
        url: "/pages/travel/recommend/more"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$27,
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_vendor.f($data.navItems, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.title),
        c: index,
        d: common_vendor.o(($event) => $options.handleNavClick(item), index)
      };
    }),
    d: $data.exploreItems[0].image,
    e: common_vendor.t($data.exploreItems[0].title),
    f: common_vendor.t($data.exploreItems[0].desc),
    g: common_vendor.o(($event) => $options.handleExploreClick($data.exploreItems[0])),
    h: $data.exploreItems[1].image,
    i: common_vendor.t($data.exploreItems[1].title),
    j: common_vendor.t($data.exploreItems[1].desc),
    k: common_vendor.o(($event) => $options.handleExploreClick($data.exploreItems[1])),
    l: $data.exploreItems[2].image,
    m: common_vendor.t($data.exploreItems[2].title),
    n: common_vendor.t($data.exploreItems[2].desc),
    o: common_vendor.o(($event) => $options.handleExploreClick($data.exploreItems[2])),
    p: common_vendor.o((...args) => $options.goToMoreRecommendations && $options.goToMoreRecommendations(...args)),
    q: $data.mainRecommendation.image,
    r: common_vendor.t($data.mainRecommendation.title),
    s: common_vendor.t($data.mainRecommendation.desc),
    t: common_vendor.o(($event) => $options.handleRecommendationClick($data.mainRecommendation))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8cb6d06b"]]);
wx.createPage(MiniProgramPage);
