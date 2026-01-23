"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      activeTab: "apparel",
      // 当前选中的标签
      tabs: [
        {
          id: "apparel",
          label: "服饰图鉴",
          logo: "/static/cloth_logo1.jpg",
          path: "/pages/apparel/index"
        },
        {
          id: "history",
          label: "服饰历史",
          logo: "/static/cloth_logo2.jpg",
          path: "/pages/history/index"
        },
        {
          id: "course",
          label: "课程讲解",
          logo: "/static/cloth_logo3.jpg",
          path: "/pages/course/index"
        }
      ],
      recommendList: [
        {
          id: 1,
          name: "褙子",
          dynasty: "宋代女装",
          image: "/static/cloth_index3.jpg"
        },
        {
          id: 2,
          name: "圆领袍",
          dynasty: "宋代官服",
          image: "/static/cloth_index2.jpg"
        },
        {
          id: 3,
          name: "百褶裙",
          dynasty: "宋代民间",
          image: "/static/apparel2.png"
        },
        {
          id: 4,
          name: "对襟衫",
          dynasty: "宋代常服",
          image: "/static/apparel5.jpg"
        },
        {
          id: 5,
          name: "披帛",
          dynasty: "宋代配饰",
          image: "/static/pibo.png"
        }
      ]
    };
  },
  onLoad() {
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.redirectTo({
        url: "/pages/main_index/main_index"
      });
    },
    // 切换顶部标签
    switchTab(tabId) {
      this.activeTab = tabId;
      const tab = this.tabs.find((t) => t.id === tabId);
      if (tab && tab.path) {
        common_vendor.index.navigateTo({
          url: tab.path
        });
      }
    },
    // 前往服饰设计页面
    goToDesign() {
      common_vendor.index.navigateTo({
        url: "/pages/clothes/design/design"
      });
    },
    // 前往所有推荐
    goToAllRecommend() {
      common_vendor.index.navigateTo({
        url: "/pages/recommend/all"
      });
    },
    // 前往推荐详情
    goToRecommendDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/recommend/detail?id=${id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$3,
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_vendor.f($data.tabs, (tab, index, i0) => {
      return common_vendor.e({
        a: tab.logo,
        b: common_vendor.t(tab.label),
        c: $data.activeTab === tab.id
      }, $data.activeTab === tab.id ? {} : {}, {
        d: tab.id,
        e: $data.activeTab === tab.id ? 1 : "",
        f: common_vendor.o(($event) => $options.switchTab(tab.id), tab.id)
      });
    }),
    d: common_assets._imports_1$2,
    e: common_vendor.o((...args) => $options.goToDesign && $options.goToDesign(...args)),
    f: common_assets._imports_2$2,
    g: common_vendor.o((...args) => $options.goToAllRecommend && $options.goToAllRecommend(...args)),
    h: common_vendor.f($data.recommendList, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.dynasty),
        d: index,
        e: common_vendor.o(($event) => $options.goToRecommendDetail(item.id), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b5036269"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/clothes/index1.js.map
