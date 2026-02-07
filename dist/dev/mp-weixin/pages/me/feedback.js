"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      rate: 5,
      tags: ["界面设计", "交互体验", "内容建议", "功能需求", "性能问题"],
      form: {
        tags: [],
        content: "",
        contact: ""
      },
      history: []
    };
  },
  computed: {
    rateText() {
      const map = {
        1: "略显生硬",
        2: "还有提升空间",
        3: "整体还不错",
        4: "已经很喜欢",
        5: "仿佛真的在宋朝"
      };
      return map[this.rate] || "";
    }
  },
  onLoad() {
    this.initHistory();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    initHistory() {
      try {
        const stored = common_vendor.index.getStorageSync("me_feedback_history");
        if (Array.isArray(stored)) {
          this.history = stored;
        }
      } catch (e) {
      }
    },
    saveHistory() {
      try {
        common_vendor.index.setStorageSync("me_feedback_history", this.history.slice(0, 5));
      } catch (e) {
      }
    },
    setRate(n) {
      this.rate = n;
    },
    toggleTag(tag) {
      const exists = this.form.tags.includes(tag);
      this.form.tags = exists ? this.form.tags.filter((t) => t !== tag) : this.form.tags.concat(tag);
    },
    submit() {
      if (!this.form.content.trim()) {
        common_vendor.index.showToast({ title: "请写一点具体内容", icon: "none" });
        return;
      }
      const now = /* @__PURE__ */ new Date();
      const time = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      const record = {
        id: `f_${Date.now()}`,
        time,
        rate: this.rate,
        tags: this.form.tags,
        content: this.form.content.trim(),
        contact: this.form.contact.trim()
      };
      this.history.unshift(record);
      this.saveHistory();
      this.form = { tags: [], content: "", contact: "" };
      this.rate = 5;
      common_vendor.index.showToast({ title: "感谢你的反馈", icon: "success" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f(5, (n, k0, i0) => {
      return {
        a: n,
        b: n <= $data.rate ? 1 : "",
        c: common_vendor.o(($event) => $options.setRate(n), n)
      };
    }),
    c: common_vendor.t($options.rateText),
    d: common_vendor.f($data.tags, (tag, k0, i0) => {
      return {
        a: common_vendor.t(tag),
        b: tag,
        c: $data.form.tags.includes(tag) ? 1 : "",
        d: common_vendor.o(($event) => $options.toggleTag(tag), tag)
      };
    }),
    e: $data.form.content,
    f: common_vendor.o(($event) => $data.form.content = $event.detail.value),
    g: common_vendor.t($data.form.content.length),
    h: $data.form.contact,
    i: common_vendor.o(($event) => $data.form.contact = $event.detail.value),
    j: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    k: $data.history.length
  }, $data.history.length ? {
    l: common_vendor.f($data.history, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.time),
        b: common_vendor.t(item.content),
        c: item.id
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-96a8bf04"]]);
wx.createPage(MiniProgramPage);
