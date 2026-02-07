"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      pageReady: false,
      activeTab: "match",
      tabs: [
        { key: "match", label: "穿搭灵感" },
        { key: "detail", label: "纹样细节" },
        { key: "craft", label: "工艺与用料" }
      ],
      list: [
        {
          id: 1,
          user: "簪花小娘子",
          time: "3 小时前",
          avatar: "/static/touxiang/touxiang5.png",
          badge: "今日主推",
          text: "试着用低饱和的藕粉色做里衣，外罩一件草木绿褙子，袖口加一点团花绣，整个人都柔和下来。",
          images: ["/static/cloth_2.png", "/static/cloth_3.png"],
          like: "512",
          collect: "203",
          category: "match"
        },
        {
          id: 2,
          user: "纹样收藏家",
          time: "昨天",
          avatar: "/static/touxiang/touxiang6.png",
          badge: "纹样拆解",
          text: "在宋画里找到了几种常见的折枝花纹，临摹后放到领缘和下摆位置，意外地适合现代日常通勤。",
          images: ["/static/song_cloth.png"],
          like: "361",
          collect: "187",
          category: "detail"
        },
        {
          id: 3,
          user: "布帛研究所",
          time: "2 天前",
          avatar: "/static/touxiang/touxiang7.png",
          badge: "",
          text: "尝试用亚麻和真丝混纺做褙子面料，既保留了垂坠感，又多了一点旧布的朦胧质感，更接近画中衣褶。",
          images: [],
          like: "228",
          collect: "96",
          category: "craft"
        }
      ]
    };
  },
  computed: {
    filteredList() {
      return this.list.filter((item) => item.category === this.activeTab);
    }
  },
  onReady() {
    setTimeout(() => {
      this.pageReady = true;
    }, 50);
  },
  methods: {
    goBack() {
      const pages = getCurrentPages && getCurrentPages();
      if (pages && pages.length > 1) {
        common_vendor.index.navigateBack({ delta: 1 });
      } else {
        common_vendor.index.switchTab({ url: "/pages/discover/discover" });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_assets._imports_0$25,
    c: $data.pageReady ? 1 : "",
    d: common_vendor.f($data.tabs, (tab, k0, i0) => {
      return {
        a: common_vendor.t(tab.label),
        b: tab.key,
        c: $data.activeTab === tab.key ? 1 : "",
        d: common_vendor.o(($event) => $data.activeTab = tab.key, tab.key)
      };
    }),
    e: $data.pageReady ? 1 : "",
    f: common_vendor.f($options.filteredList, (item, k0, i0) => {
      return common_vendor.e({
        a: item.avatar,
        b: common_vendor.t(item.user),
        c: common_vendor.t(item.time),
        d: item.badge
      }, item.badge ? {
        e: common_vendor.t(item.badge)
      } : {}, {
        f: common_vendor.t(item.text),
        g: item.images && item.images.length
      }, item.images && item.images.length ? {
        h: common_vendor.f(item.images, (img, idx, i1) => {
          return {
            a: img,
            b: idx
          };
        })
      } : {}, {
        i: common_vendor.t(item.like),
        j: common_vendor.t(item.collect),
        k: item.id
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-55551be1"]]);
wx.createPage(MiniProgramPage);
