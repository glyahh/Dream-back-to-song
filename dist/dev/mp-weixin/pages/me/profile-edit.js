"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_userProfile = require("../../utils/userProfile.js");
const _sfc_main = {
  data() {
    return {
      form: {
        nickname: "",
        avatar: "/static/avatar.png",
        bio: ""
      },
      presetAvatars: [
        "/static/touxiang/touxiang1.png",
        "/static/touxiang/touxiang2.png",
        "/static/touxiang/touxiang3.png",
        "/static/touxiang/touxiang4.png",
        "/static/touxiang/touxiang5.png",
        "/static/touxiang/touxiang6.png",
        "/static/touxiang/touxiang7.png",
        "/static/touxiang/touxiang8.png",
        "/static/touxiang/touxiang9.png",
        "/static/touxiang/touxiang10.png"
      ]
    };
  },
  onLoad() {
    const profile = utils_userProfile.getUserProfile();
    this.form = { ...this.form, ...profile };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    changeAvatar() {
      const idx = Math.floor(Math.random() * this.presetAvatars.length);
      this.form.avatar = this.presetAvatars[idx];
    },
    validate() {
      if (!this.form.nickname.trim()) {
        common_vendor.index.showToast({ title: "请填写昵称", icon: "none" });
        return false;
      }
      return true;
    },
    handleSave() {
      if (!this.validate())
        return;
      try {
        utils_userProfile.saveUserProfile(this.form);
        common_vendor.index.showToast({ title: "已保存", icon: "success" });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 500);
      } catch (e) {
        common_vendor.index.showToast({ title: "保存失败，请稍后重试", icon: "none" });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $data.form.avatar,
    c: common_vendor.o((...args) => $options.changeAvatar && $options.changeAvatar(...args)),
    d: $data.form.nickname,
    e: common_vendor.o(($event) => $data.form.nickname = $event.detail.value),
    f: $data.form.bio,
    g: common_vendor.o(($event) => $data.form.bio = $event.detail.value),
    h: common_vendor.t($data.form.bio.length),
    i: common_vendor.o((...args) => $options.handleSave && $options.handleSave(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aef46dc4"]]);
wx.createPage(MiniProgramPage);
