"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      creations: [],
      showEditor: false,
      form: {
        title: "",
        type: "",
        content: ""
      },
      typeOptions: ["服饰设计", "饮食随笔", "建筑手稿", "出行见闻", "其他"],
      typeIndex: 0
    };
  },
  onLoad() {
    this.initCreations();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    initCreations() {
      try {
        const stored = common_vendor.index.getStorageSync("me_creations");
        if (Array.isArray(stored)) {
          this.creations = stored;
          return;
        }
      } catch (e) {
      }
      this.creations = [
        {
          id: "c1",
          title: "浅绛团花褙子草图",
          type: "服饰设计",
          excerpt: "试着把宋画里的团花纹样移到褙子下摆，底色用淡绛，花纹改成更细密的线条……",
          content: "",
          time: "2026-02-01 晚上",
          words: 68,
          mood: "心静如水"
        }
      ];
    },
    persist() {
      try {
        common_vendor.index.setStorageSync("me_creations", this.creations);
      } catch (e) {
      }
    },
    openEditor() {
      this.form = {
        title: "",
        type: "",
        content: ""
      };
      this.showEditor = true;
    },
    closeEditor() {
      this.showEditor = false;
    },
    onTypeChange(e) {
      const index = Number(e.detail.value || 0);
      this.typeIndex = index;
      this.form.type = this.typeOptions[index];
    },
    submit() {
      if (!this.form.title.trim()) {
        common_vendor.index.showToast({ title: "请填写标题", icon: "none" });
        return;
      }
      if (!this.form.type) {
        common_vendor.index.showToast({ title: "请选择创作类型", icon: "none" });
        return;
      }
      if (!this.form.content.trim()) {
        common_vendor.index.showToast({ title: "请写一点内容", icon: "none" });
        return;
      }
      const words = this.form.content.length;
      const now = /* @__PURE__ */ new Date();
      const time = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      this.creations.unshift({
        id: `c_${Date.now()}`,
        title: this.form.title.trim(),
        type: this.form.type,
        excerpt: this.form.content.length > 50 ? `${this.form.content.slice(0, 50)}…` : this.form.content,
        content: this.form.content,
        time,
        words,
        mood: "宋风正浓"
      });
      this.persist();
      this.showEditor = false;
      common_vendor.index.showToast({ title: "已保存", icon: "success" });
    },
    preview(item) {
      common_vendor.index.showModal({
        title: item.title,
        content: item.content || item.excerpt,
        showCancel: false
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.t($data.creations.length),
    c: common_vendor.o((...args) => $options.openEditor && $options.openEditor(...args)),
    d: common_vendor.f($data.creations, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.type),
        c: common_vendor.t(item.excerpt),
        d: common_vendor.t(item.time),
        e: common_vendor.t(item.words),
        f: common_vendor.t(item.mood),
        g: item.id,
        h: common_vendor.o(($event) => $options.preview(item), item.id)
      };
    }),
    e: !$data.creations.length
  }, !$data.creations.length ? {} : {}, {
    f: $data.showEditor
  }, $data.showEditor ? {
    g: common_vendor.o((...args) => $options.closeEditor && $options.closeEditor(...args)),
    h: $data.form.title,
    i: common_vendor.o(($event) => $data.form.title = $event.detail.value),
    j: common_vendor.t($data.form.type || "点击选择"),
    k: $data.typeOptions,
    l: $data.typeIndex,
    m: common_vendor.o((...args) => $options.onTypeChange && $options.onTypeChange(...args)),
    n: $data.form.content,
    o: common_vendor.o(($event) => $data.form.content = $event.detail.value),
    p: common_vendor.t($data.form.content.length),
    q: common_vendor.o((...args) => $options.closeEditor && $options.closeEditor(...args)),
    r: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    s: common_vendor.o(() => {
    }),
    t: common_vendor.o((...args) => $options.closeEditor && $options.closeEditor(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f97d455b"]]);
wx.createPage(MiniProgramPage);
