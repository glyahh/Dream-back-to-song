"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentTab: "system",
      tabs: [
        { key: "system", label: "系统" },
        { key: "social", label: "互动" },
        { key: "order", label: "订单" }
      ],
      messages: []
    };
  },
  computed: {
    filteredMessages() {
      return this.messages.filter((m) => m.category === this.currentTab);
    }
  },
  onLoad() {
    this.initMessages();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    initMessages() {
      try {
        const stored = common_vendor.index.getStorageSync("me_messages");
        if (Array.isArray(stored)) {
          this.messages = stored;
          return;
        }
      } catch (e) {
      }
      this.messages = [
        {
          id: "m1",
          category: "system",
          title: "欢迎来到「梦回宋朝」",
          preview: "为你准备了一份宋风指南，带你从衣食住行走进画卷。",
          content: "欢迎来到「梦回宋朝」。你可以从首页的「遇见宋朝」开始，按衣、食、住、行慢慢浏览，也可以在「发现」页关注你喜欢的作者，或者在「集市」中收集几件宋风好物。",
          time: "昨天 21:40",
          read: false
        },
        {
          id: "m2",
          category: "social",
          title: "山河入梦 赞了你的发布",
          preview: "「用《山家清供》里的方子做了碗蟹酿橙……」",
          content: "山河入梦 赞了你的发布：「用《山家清供》里的方子做了碗蟹酿橙……」。对方觉得你的宋风生活很有味道。",
          time: "今天 09:12",
          read: false
        },
        {
          id: "m3",
          category: "order",
          title: "订单已发货",
          preview: "你的「风荷雅盏 · 茶杯」已由汴京驿站发出。",
          content: "你的「风荷雅盏 · 茶杯」已由汴京驿站打包发出，预计三至五日抵达。收货后记得在「我的订单」中确认哦。",
          time: "02-01 20:30",
          read: true
        }
      ];
    },
    persist() {
      try {
        common_vendor.index.setStorageSync("me_messages", this.messages);
      } catch (e) {
      }
    },
    switchTab(key) {
      this.currentTab = key;
    },
    unreadCount(category) {
      return this.messages.filter((m) => m.category === category && !m.read).length;
    },
    openMessage(msg) {
      this.messages = this.messages.map(
        (m) => m.id === msg.id ? { ...m, read: true } : m
      );
      this.persist();
      common_vendor.index.showModal({
        title: msg.title,
        content: msg.content,
        showCancel: false
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.tabs, (tab, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.label),
        b: $options.unreadCount(tab.key)
      }, $options.unreadCount(tab.key) ? {
        c: common_vendor.t($options.unreadCount(tab.key))
      } : {}, {
        d: tab.key,
        e: $data.currentTab === tab.key ? 1 : "",
        f: common_vendor.o(($event) => $options.switchTab(tab.key), tab.key)
      });
    }),
    c: common_vendor.f($options.filteredMessages, (msg, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(msg.title),
        b: !msg.read
      }, !msg.read ? {} : {}, {
        c: common_vendor.t(msg.preview),
        d: common_vendor.t(msg.time),
        e: msg.id,
        f: !msg.read ? 1 : "",
        g: common_vendor.o(($event) => $options.openMessage(msg), msg.id)
      });
    }),
    d: !$options.filteredMessages.length
  }, !$options.filteredMessages.length ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-84d40586"]]);
wx.createPage(MiniProgramPage);
