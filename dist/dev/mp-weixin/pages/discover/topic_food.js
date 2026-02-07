"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      pageReady: false,
      activeTab: "meat",
      tabs: [
        { key: "meat", label: "宴席主菜" },
        { key: "snack", label: "点心小食" },
        { key: "drink", label: "茶酒佐餐" }
      ],
      list: [
        {
          id: 1,
          user: "东坡迷弟",
          time: "1 小时前",
          avatar: "/static/touxiang/touxiang8.png",
          badge: "宴席推荐",
          text: "按照宋人做法还原了一次东坡肉，用砂锅小火焖足两小时，出锅时浇一点酒汁，入口微甜又不腻。",
          images: ["/static/song_food.png"],
          like: "642",
          view: "2.1k",
          category: "meat"
        },
        {
          id: 2,
          user: "点心研究所",
          time: "昨天",
          avatar: "/static/touxiang/touxiang9.png",
          badge: "做法图解",
          text: "用糯米粉和糖桂花做了一版宋人桂花糕，模具选了小方印，蒸好后撒一点桂花，看上去就很有宋画里的感觉。",
          images: ["/static/hanfu1.png"],
          like: "488",
          view: "1.6k",
          category: "snack"
        },
        {
          id: 3,
          user: "茶盏里的山河",
          time: "2 天前",
          avatar: "/static/touxiang/touxiang10.png",
          badge: "",
          text: "临摹了点茶图，试着在白瓷盏里打出一片“山水”，虽然图案还不熟练，但那种专注的仪式感，真的很安静。",
          images: ["/static/discover_bg.png"],
          like: "302",
          view: "1.1k",
          category: "drink"
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
    b: common_assets._imports_0$24,
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
        j: common_vendor.t(item.view),
        k: item.id
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3d14347d"]]);
wx.createPage(MiniProgramPage);
