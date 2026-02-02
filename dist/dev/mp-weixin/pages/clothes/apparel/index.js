"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeFilter: "all",
      filters: [
        { id: "all", name: "全部" },
        { id: "female", name: "女装" },
        { id: "male", name: "男装" },
        { id: "official", name: "官服" },
        { id: "folk", name: "民间" },
        { id: "accessory", name: "配饰" }
      ],
      // 左列项目数据
      leftColumnItems: [
        {
          id: 1,
          name: "褙子",
          dynasty: "宋代女装",
          image: "/static/apparel1.png",
          height: 450,
          marginTop: 0,
          category: "female"
        },
        {
          id: 3,
          name: "宋制抹胸",
          dynasty: "宋代女装",
          image: "/static/apparel3.png",
          height: 500,
          marginTop: 20,
          category: "female"
        },
        {
          id: 5,
          name: "对襟短袄",
          dynasty: "宋代常服",
          image: "/static/apparel5.jpg",
          height: 420,
          marginTop: 20,
          category: "folk"
        }
      ],
      // 右列项目数据
      rightColumnItems: [
        {
          id: 2,
          name: "圆领长袍",
          dynasty: "宋代官服",
          image: "/static/apparel2.png",
          height: 480,
          marginTop: 0,
          category: "official"
        },
        {
          id: 4,
          name: "宋制褴衫",
          dynasty: "宋代男装",
          image: "/static/apparel4.jpg",
          height: 400,
          marginTop: 20,
          category: "male"
        },
        {
          id: 6,
          name: "直裰",
          dynasty: "宋代男装",
          image: "/static/apparel6.jpg",
          height: 460,
          marginTop: 20,
          category: "male"
        }
      ]
    };
  },
  computed: {
    // 获取所有筛选后的项目
    allFilteredItems() {
      const allItems = [...this.leftColumnItems, ...this.rightColumnItems];
      if (this.activeFilter === "all") {
        return allItems;
      }
      return allItems.filter((item) => item.category === this.activeFilter);
    },
    // 重新分配到左列（奇数索引）
    filteredLeftItems() {
      return this.allFilteredItems.filter((item, index) => index % 2 === 0);
    },
    // 重新分配到右列（偶数索引）
    filteredRightItems() {
      return this.allFilteredItems.filter((item, index) => index % 2 === 1);
    },
    // 固定卡片高度，确保大小一致
    fixedItemHeight() {
      return 500;
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack({
        fail: () => {
          common_vendor.index.redirectTo({
            url: "/pages/clothes/index1"
          });
        }
      });
    },
    switchFilter(filterId) {
      if (this.activeFilter === filterId) {
        return;
      }
      this.activeFilter = filterId;
      this.$nextTick(() => {
      });
    },
    getFilterName() {
      const filter = this.filters.find((f) => f.id === this.activeFilter);
      return filter ? filter.name : "";
    },
    goToApparelDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/clothes/apparel/detail?id=${id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.filters, (filter, index, i0) => {
      return {
        a: common_vendor.t(filter.name),
        b: index,
        c: $data.activeFilter === filter.id ? 1 : "",
        d: common_vendor.o(($event) => $options.switchFilter(filter.id), index)
      };
    }),
    c: $options.filteredLeftItems.length === 0 && $options.filteredRightItems.length === 0
  }, $options.filteredLeftItems.length === 0 && $options.filteredRightItems.length === 0 ? {
    d: common_vendor.t($options.getFilterName())
  } : {
    e: common_vendor.f($options.filteredLeftItems, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.dynasty),
        d: `left-${item.id}-${$data.activeFilter}`,
        e: index * 0.1 + "s",
        f: common_vendor.o(($event) => $options.goToApparelDetail(item.id), `left-${item.id}-${$data.activeFilter}`)
      };
    }),
    f: $options.fixedItemHeight + "rpx",
    g: common_vendor.f($options.filteredRightItems, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.dynasty),
        d: `right-${item.id}-${$data.activeFilter}`,
        e: ($options.filteredLeftItems.length + index) * 0.1 + "s",
        f: common_vendor.o(($event) => $options.goToApparelDetail(item.id), `right-${item.id}-${$data.activeFilter}`)
      };
    }),
    h: $options.fixedItemHeight + "rpx"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-39915756"]]);
wx.createPage(MiniProgramPage);
