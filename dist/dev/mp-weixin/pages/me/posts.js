"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      draft: "",
      posts: []
    };
  },
  onLoad() {
    this.initPosts();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    initPosts() {
      try {
        const stored = common_vendor.index.getStorageSync("me_posts");
        if (Array.isArray(stored)) {
          this.posts = stored;
          return;
        }
      } catch (e) {
      }
      this.posts = [];
    },
    persist() {
      try {
        common_vendor.index.setStorageSync("me_posts", this.posts);
      } catch (e) {
      }
    },
    publish() {
      if (!this.draft.trim()) {
        common_vendor.index.showToast({ title: "写点内容再发布吧", icon: "none" });
        return;
      }
      const now = /* @__PURE__ */ new Date();
      const time = `${now.getMonth() + 1}月${now.getDate().toString().padStart(2, "0")}日 ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      this.posts.unshift({
        id: `p_${Date.now()}`,
        content: this.draft,
        time,
        likes: 0,
        liked: false,
        topic: "#生活在宋朝"
      });
      this.draft = "";
      this.persist();
      common_vendor.index.showToast({ title: "已发布", icon: "success" });
    },
    toggleLike(item) {
      this.posts = this.posts.map(
        (p) => p.id === item.id ? {
          ...p,
          liked: !p.liked,
          likes: p.likes + (p.liked ? -1 : 1)
        } : p
      );
      this.persist();
    },
    removePost(item) {
      common_vendor.index.showModal({
        title: "删除发布",
        content: "确定要删除这条内容吗？",
        success: (res) => {
          if (res.confirm) {
            this.posts = this.posts.filter((p) => p.id !== item.id);
            this.persist();
            common_vendor.index.showToast({ title: "已删除", icon: "none" });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $data.draft,
    c: common_vendor.o(($event) => $data.draft = $event.detail.value),
    d: common_vendor.t($data.draft.length),
    e: common_vendor.o((...args) => $options.publish && $options.publish(...args)),
    f: $data.posts.length
  }, $data.posts.length ? {
    g: common_vendor.f($data.posts, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.time),
        b: common_vendor.t(item.topic),
        c: common_vendor.t(item.content),
        d: common_vendor.t(item.liked ? "💚" : "🤍"),
        e: common_vendor.t(item.likes),
        f: common_vendor.o(($event) => $options.toggleLike(item), item.id),
        g: common_vendor.o(($event) => $options.removePost(item), item.id),
        h: item.id
      };
    }),
    h: common_assets._imports_0$29
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8e45eed4"]]);
wx.createPage(MiniProgramPage);
