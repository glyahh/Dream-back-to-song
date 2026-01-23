"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeFilter: "all",
      // 当前选中的筛选标签
      filters: [
        {
          id: "all",
          name: "全部",
          path: "/pages/apparel/index"
        },
        {
          id: "period",
          name: "时期",
          path: "/pages/apparel/period"
        },
        {
          id: "style",
          name: "形制",
          path: "/pages/apparel/style"
        },
        {
          id: "scene",
          name: "场景",
          path: "/pages/apparel/scene"
        }
      ],
      // 左列项目数据 - 确保图片和文字正确对应
      leftColumnItems: [
        {
          id: 1,
          name: "褙子",
          image: "/static/apparel1.png",
          // 确保这个图片确实是褙子的图片
          height: 450,
          marginTop: 0
        },
        {
          id: 3,
          name: "宋制抹胸",
          image: "/static/apparel3.png",
          // 确保这个图片确实是圆领长袍的图片
          height: 500,
          marginTop: 20
        },
        {
          id: 5,
          name: "对襟短袄",
          image: "/static/apparel5.jpg",
          // 确保这个图片确实是宋制抹胸的图片
          height: 420,
          marginTop: 20
        }
      ],
      // 右列项目数据 - 确保图片和文字正确对应
      rightColumnItems: [
        {
          id: 2,
          name: "圆领长袍",
          image: "/static/apparel2.png",
          // 确保这个图片确实是宋制褴衫的图片
          height: 480,
          marginTop: 0
        },
        {
          id: 4,
          name: "宋制褴衫",
          image: "/static/apparel4.jpg",
          // 确保这个图片确实是对襟短袄的图片
          height: 400,
          marginTop: 20
        },
        {
          id: 6,
          name: "直裰",
          image: "/static/apparel6.jpg",
          // 确保这个图片确实是直裰的图片
          height: 460,
          marginTop: 20
        }
      ]
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.redirectTo({
        url: "/pages/clothes/index1"
      });
    },
    // 切换筛选标签
    switchFilter(filterId, path) {
      this.activeFilter = filterId;
      if (filterId === "all") {
        this.loadApparelData(filterId);
      } else {
        common_vendor.index.navigateTo({
          url: path
        });
      }
    },
    // 加载服饰数据（示例函数）
    loadApparelData(filterId) {
      common_vendor.index.__f__("log", "at pages/apparel/index.vue:175", "加载筛选数据:", filterId);
    },
    // 跳转到服饰详情
    // 跳转到服饰详情
    goToApparelDetail(id) {
      if (id === 1) {
        common_vendor.index.navigateTo({
          url: "/pages/apparel/beizi"
        });
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/apparel/detail?id=${id}`
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.filters, (filter, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(filter.name),
        b: $data.activeFilter === filter.id
      }, $data.activeFilter === filter.id ? {} : {}, {
        c: index,
        d: $data.activeFilter === filter.id ? 1 : "",
        e: common_vendor.o(($event) => $options.switchFilter(filter.id, filter.path), index)
      });
    }),
    c: common_vendor.f($data.leftColumnItems, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: index,
        d: item.height + "rpx",
        e: item.marginTop + "rpx",
        f: common_vendor.o(($event) => $options.goToApparelDetail(item.id), index)
      };
    }),
    d: common_vendor.f($data.rightColumnItems, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: index,
        d: item.height + "rpx",
        e: item.marginTop + "rpx",
        f: common_vendor.o(($event) => $options.goToApparelDetail(item.id), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6cfcb87a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/apparel/index.js.map
