"use strict";
const common_vendor = require("../common/vendor.js");
const PROFILE_STORAGE_KEY = "me_profile";
const DEFAULT_PROFILE = {
  nickname: "烟雨朦胧",
  avatar: "/static/avatar.png",
  bio: "",
  phone: ""
};
function getUserProfile() {
  try {
    const stored = common_vendor.index.getStorageSync(PROFILE_STORAGE_KEY);
    if (stored && typeof stored === "object") {
      return { ...DEFAULT_PROFILE, ...stored };
    }
  } catch (e) {
  }
  return { ...DEFAULT_PROFILE };
}
function saveUserProfile(profile) {
  try {
    const data = {
      nickname: profile.nickname || DEFAULT_PROFILE.nickname,
      avatar: profile.avatar || DEFAULT_PROFILE.avatar,
      bio: profile.bio || "",
      phone: profile.phone || ""
    };
    common_vendor.index.setStorageSync(PROFILE_STORAGE_KEY, data);
    return data;
  } catch (e) {
    throw e;
  }
}
exports.getUserProfile = getUserProfile;
exports.saveUserProfile = saveUserProfile;
