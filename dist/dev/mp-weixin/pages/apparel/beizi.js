"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      recommendList: [
        {
          id: 1,
          name: "圆领袍",
          image: "/static/apparel2.png"
        },
        {
          id: 2,
          name: "百褶裙",
          image: "/static/apparel5.jpg"
        },
        {
          id: 3,
          name: "直裰",
          image: "/static/apparel6.jpg"
        },
        {
          id: 4,
          name: "宋制襕衫",
          image: "/static/apparel4.jpg"
        },
        {
          id: 5,
          name: "宋制抹胸",
          image: "/static/apparel3.png"
        }
      ]
    };
  },
  methods: {
    // 返回apparel页面
    goBack() {
      common_vendor.index.navigateBack();
    },
    // 展开介绍
    expandIntroduction() {
      common_vendor.index.showToast({
        title: "展开详细介绍",
        icon: "none"
      });
    },
    // 前往所有推荐
    goToAllRecommend() {
      common_vendor.index.navigateTo({
        url: "/pages/apparel/recommend"
      });
    },
    // 前往推荐详情
    goToRecommendDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/apparel/recommend-detail?id=${id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$5,
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_vendor.o((...args) => $options.expandIntroduction && $options.expandIntroduction(...args)),
    d: common_vendor.o((...args) => $options.goToAllRecommend && $options.goToAllRecommend(...args)),
    e: common_vendor.f($data.recommendList, (item, index, i0) => {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4bcf10df"]]);
wx.createPage(MiniProgramPage);
