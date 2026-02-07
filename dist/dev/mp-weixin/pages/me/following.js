"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      followings: []
    };
  },
  onLoad() {
    this.initFollowings();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    initFollowings() {
      let ids = [];
      try {
        const stored = common_vendor.index.getStorageSync("discover_follow_ids");
        if (Array.isArray(stored))
          ids = stored;
      } catch (e) {
        ids = [];
      }
      const candidates = [
        {
          id: "user_shanhe",
          name: "山河入梦",
          avatar: "/static/guanzhu/1.png",
          desc: "偏爱浅色宋服与旧画册。",
          meta: "近期常在「宋韵服饰大赏」分享搭配"
        },
        {
          id: "user_qinghe",
          name: "清河小筑",
          avatar: "/static/touxiang/touxiang2.png",
          desc: "在院子里泡茶读书的人。",
          meta: "分享宋代居住空间与书房布置灵感"
        },
        {
          id: "user_meishi",
          name: "一碗清欢",
          avatar: "/static/touxiang/touxiang4.png",
          desc: "抄书、做点心，看雨落在瓦檐上。",
          meta: "常发布宋人饮食手记与复刻食谱"
        }
      ];
      this.followings = candidates.map((c) => ({
        ...c,
        followed: ids.includes(c.id)
      })).filter((c) => c.followed);
    },
    saveIds() {
      const ids = this.followings.filter((f) => f.followed).map((f) => f.id);
      try {
        common_vendor.index.setStorageSync("discover_follow_ids", ids);
      } catch (e) {
      }
    },
    toggleFollow(item) {
      this.followings = this.followings.map(
        (f) => f.id === item.id ? { ...f, followed: !f.followed } : f
      );
      this.followings = this.followings.filter((f) => f.followed);
      this.saveIds();
      common_vendor.index.showToast({
        title: item.followed ? "已取消关注" : "已关注",
        icon: "none"
      });
    },
    sayHi(item) {
      common_vendor.index.showToast({
        title: `已向「${item.name}」发送招呼（示意）`,
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $data.followings.length
  }, $data.followings.length ? {
    c: common_vendor.f($data.followings, (item, k0, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.desc),
        d: common_vendor.t(item.meta),
        e: common_vendor.t(item.followed ? "已关注" : "+ 关注"),
        f: common_vendor.o(($event) => $options.toggleFollow(item), item.id),
        g: common_vendor.o(($event) => $options.sayHi(item), item.id),
        h: item.id
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b392f320"]]);
wx.createPage(MiniProgramPage);
