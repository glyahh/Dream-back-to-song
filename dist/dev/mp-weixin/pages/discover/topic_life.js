"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      pageReady: false,
      activeTab: "latest",
      tabs: [
        { key: "latest", label: "最新" },
        { key: "hot", label: "最热" },
        { key: "story", label: "生活故事" }
      ],
      list: [
        {
          id: 1,
          user: "临安的清晨",
          time: "2 小时前",
          avatar: "/static/touxiang/touxiang2.png",
          badge: "图文精选",
          text: "想象自己在临安醒来，从瓦舍边的小巷走到市集，买上一笼热气腾腾的点心，再去河畔听一曲新词，这就是我心中的宋朝早晨。",
          images: ["/static/hanfu1.png", "/static/hanfu2.png"],
          like: "328",
          comment: "29",
          category: "latest"
        },
        {
          id: 2,
          user: "汴京行脚人",
          time: "昨天",
          avatar: "/static/touxiang/touxiang3.png",
          badge: "人气讨论",
          text: "如果能在《清明上河图》里挑一个摊位做生意，你会卖什么？我选茶汤和糖果，给路过的行人都添一口甜。",
          images: ["/static/discover_bg.png"],
          like: "921",
          comment: "103",
          category: "hot"
        },
        {
          id: 3,
          user: "小小簪花郎",
          time: "1 天前",
          avatar: "/static/touxiang/touxiang4.png",
          badge: "",
          text: "尝试按照《梦粱录》里的描述复刻了一桌宋人家常饭，简单却很精致，连摆盘都照着书里的顺序来做。",
          images: ["/static/song_food.png"],
          like: "417",
          comment: "46",
          category: "story"
        }
      ]
    };
  },
  computed: {
    filteredList() {
      if (this.activeTab === "latest")
        return this.list;
      if (this.activeTab === "hot")
        return this.list.slice().sort((a, b) => Number(b.like) - Number(a.like));
      return this.list.filter((item) => item.category === "story");
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
    b: common_assets._imports_0$26,
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
        j: common_vendor.t(item.comment),
        k: item.id
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c7b042f9"]]);
wx.createPage(MiniProgramPage);
