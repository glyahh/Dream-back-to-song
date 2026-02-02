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
      recommendList: [
        {
          id: 1,
          name: "褙子",
          dynasty: "宋代女装",
          image: "/static/cloth_index3.jpg",
          description: "宋代女性最流行的外衣，直领对襟，两侧开衩",
          category: "female"
        },
        {
          id: 2,
          name: "圆领袍",
          dynasty: "宋代官服",
          image: "/static/cloth_index2.jpg",
          description: "宋代官员常服，圆领窄袖，体现官阶等级",
          category: "official"
        },
        {
          id: 3,
          name: "百褶裙",
          dynasty: "宋代民间",
          image: "/static/apparel2.png",
          description: "宋代女性下装，褶裥细密，行走飘逸",
          category: "female"
        },
        {
          id: 4,
          name: "对襟衫",
          dynasty: "宋代常服",
          image: "/static/apparel5.jpg",
          description: "宋代男女通用上衣，对襟直领，简洁大方",
          category: "folk"
        },
        {
          id: 5,
          name: "披帛",
          dynasty: "宋代配饰",
          image: "/static/pibo.png",
          description: "宋代女性配饰，长条状，增添飘逸美感",
          category: "accessory"
        },
        {
          id: 6,
          name: "直裰",
          dynasty: "宋代男装",
          image: "/static/apparel6.jpg",
          description: "宋代文人常服，直身长袍，体现文人风骨",
          category: "male"
        },
        {
          id: 7,
          name: "道袍",
          dynasty: "宋代男装",
          image: "/static/apparel4.jpg",
          description: "宋代男性外衣，交领右衽，宽袖飘逸",
          category: "male"
        },
        {
          id: 8,
          name: "抹胸",
          dynasty: "宋代女装",
          image: "/static/apparel3.png",
          description: "宋代女性内衣，贴身穿着，外搭褙子",
          category: "female"
        }
      ]
    };
  },
  computed: {
    filteredList() {
      if (this.activeFilter === "all") {
        return this.recommendList;
      }
      return this.recommendList.filter((item) => item.category === this.activeFilter);
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    switchFilter(filterId) {
      this.activeFilter = filterId;
    },
    goToDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/clothes/recommend/detail?id=${id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.filters, (filter, index, i0) => {
      return {
        a: common_vendor.t(filter.name),
        b: index,
        c: $data.activeFilter === filter.id ? 1 : "",
        d: common_vendor.o(($event) => $options.switchFilter(filter.id), index)
      };
    }),
    c: common_vendor.f($options.filteredList, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.dynasty),
        d: common_vendor.t(item.description),
        e: index,
        f: common_vendor.o(($event) => $options.goToDetail(item.id), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e14d5d1e"]]);
wx.createPage(MiniProgramPage);
