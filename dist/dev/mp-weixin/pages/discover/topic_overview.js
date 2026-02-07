"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      pageReady: false,
      sections: [
        {
          key: "life",
          kicker: "日常",
          title: "生活在宋朝",
          desc: "从晨钟暮鼓到灯市夜游，按时间轴体验宋人的一天。",
          count: "2.3k 讨论"
        },
        {
          key: "clothing",
          kicker: "衣",
          title: "宋韵服饰",
          desc: "看一看画里的褙子、霞帔，如何走进今日衣橱。",
          count: "1.6k 分享"
        },
        {
          key: "food",
          kicker: "食",
          title: "宋人食单",
          desc: "从家常小菜到御宴名馔，把书里的食谱端上桌。",
          count: "3.1k 菜谱"
        },
        {
          key: "travel",
          kicker: "行",
          title: "出行百态",
          desc: "舟车、驴骡与步行，走完一遍宋人的路网与河道。",
          count: "1.2k 图文"
        }
      ],
      list: [
        {
          id: 1,
          tag: "生活在宋朝",
          time: "今天",
          text: "如果把《清明上河图》当作一张开放世界地图，你最想从哪一条街开始游玩？"
        },
        {
          id: 2,
          tag: "宋韵服饰大赏",
          time: "昨天",
          text: "只用当代面料和版型，能不能做出一套“只在近看才发现是宋代”的通勤装？"
        },
        {
          id: 3,
          tag: "宋朝美食盛宴",
          time: "2 天前",
          text: "试着照着古籍做了一次全宋宴，结果家人最爱的一道竟然是最朴素的汤面。"
        }
      ]
    };
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
    },
    goSection(key) {
      if (key === "life") {
        common_vendor.index.navigateTo({ url: "/pages/discover/topic_life" });
      } else if (key === "clothing") {
        common_vendor.index.navigateTo({ url: "/pages/discover/topic_clothing" });
      } else if (key === "food") {
        common_vendor.index.navigateTo({ url: "/pages/discover/topic_food" });
      } else if (key === "travel") {
        common_vendor.index.navigateTo({ url: "/pages/travel/index" });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_assets._imports_0$27,
    c: $data.pageReady ? 1 : "",
    d: common_vendor.f($data.sections, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.kicker),
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.desc),
        d: common_vendor.t(item.count),
        e: item.key,
        f: common_vendor.o(($event) => $options.goSection(item.key), item.key)
      };
    }),
    e: $data.pageReady ? 1 : "",
    f: $data.pageReady ? 1 : "",
    g: common_vendor.f($data.list, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.tag),
        b: common_vendor.t(item.time),
        c: common_vendor.t(item.text),
        d: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9d03f815"]]);
wx.createPage(MiniProgramPage);
