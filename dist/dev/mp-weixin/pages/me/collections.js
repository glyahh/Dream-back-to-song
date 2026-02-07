"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentTab: "goods",
      tabs: [
        { key: "goods", label: "好物" },
        { key: "notes", label: "内容" }
      ],
      goods: [],
      notes: []
    };
  },
  onLoad() {
    this.initCollections();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    initCollections() {
      try {
        const savedGoods = common_vendor.index.getStorageSync("me_collections_goods");
        const savedNotes = common_vendor.index.getStorageSync("me_collections_notes");
        if (Array.isArray(savedGoods))
          this.goods = savedGoods;
        if (Array.isArray(savedNotes))
          this.notes = savedNotes;
        if (this.goods.length || this.notes.length)
          return;
      } catch (e) {
      }
      this.goods = [
        {
          id: "g1",
          title: "汴梁旧帖 · 宣纸套装",
          price: 56,
          img: "/static/market_newitem/汴梁旧帖.png"
        },
        {
          id: "g2",
          title: "风荷雅盏 · 茶杯",
          price: 88,
          img: "/static/market_newitem/风荷雅盏.png"
        }
      ];
      this.notes = [
        {
          id: "n1",
          tag: "#生活在宋朝",
          title: "如果在汴京开一家小茶肆",
          excerpt: "门口挂一盏暖黄灯笼，案上只做两三款茶点，让来往行人坐下歇脚、翻翻画册……",
          from: "来自「发现 · 话题广场」",
          time: "收藏于 01-20"
        }
      ];
      this.persist();
    },
    persist() {
      try {
        common_vendor.index.setStorageSync("me_collections_goods", this.goods);
        common_vendor.index.setStorageSync("me_collections_notes", this.notes);
      } catch (e) {
      }
    },
    switchTab(key) {
      this.currentTab = key;
    },
    openGoods(item) {
      common_vendor.index.navigateTo({
        url: "/pages/market/detail?from=collections"
      });
    },
    openNote(item) {
      common_vendor.index.showModal({
        title: item.title,
        content: item.excerpt,
        showCancel: false
      });
    },
    toggleCollectGoods(item) {
      common_vendor.index.showModal({
        title: "取消收藏",
        content: `不再收藏「${item.title}」？`,
        success: (res) => {
          if (res.confirm) {
            this.goods = this.goods.filter((g) => g.id !== item.id);
            this.persist();
            common_vendor.index.showToast({ title: "已取消收藏", icon: "none" });
          }
        }
      });
    },
    toggleCollectNote(item) {
      common_vendor.index.showModal({
        title: "取消收藏",
        content: `不再收藏这条内容吗？`,
        success: (res) => {
          if (res.confirm) {
            this.notes = this.notes.filter((n) => n.id !== item.id);
            this.persist();
            common_vendor.index.showToast({ title: "已取消收藏", icon: "none" });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.tabs, (tab, k0, i0) => {
      return {
        a: common_vendor.t(tab.label),
        b: tab.key,
        c: $data.currentTab === tab.key ? 1 : "",
        d: common_vendor.o(($event) => $options.switchTab(tab.key), tab.key)
      };
    }),
    c: $data.currentTab === "goods"
  }, $data.currentTab === "goods" ? common_vendor.e({
    d: common_vendor.f($data.goods, (item, k0, i0) => {
      return {
        a: item.img,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.price),
        d: item.id,
        e: common_vendor.o(($event) => $options.openGoods(item), item.id),
        f: common_vendor.o(($event) => $options.toggleCollectGoods(item), item.id)
      };
    }),
    e: !$data.goods.length
  }, !$data.goods.length ? {} : {}) : common_vendor.e({
    f: common_vendor.f($data.notes, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.tag),
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.excerpt),
        d: common_vendor.t(item.from),
        e: common_vendor.t(item.time),
        f: item.id,
        g: common_vendor.o(($event) => $options.openNote(item), item.id),
        h: common_vendor.o(($event) => $options.toggleCollectNote(item), item.id)
      };
    }),
    g: !$data.notes.length
  }, !$data.notes.length ? {} : {}));
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9e806db0"]]);
wx.createPage(MiniProgramPage);
