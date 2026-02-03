"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      activeTab: "hot",
      activeNav: "discover",
      pageReady: false,
      currentIndex: 0,
      carouselList: [
        { image: "/static/cloth_2.png", title: "" },
        { image: "/static/cloth_3.png", title: "" },
        { image: "/static/discover_bg.png", title: "宋代衣食住行" }
      ],
      tabs: [
        { key: "home", label: "首页", path: "/pages/main_index/main_index" },
        { key: "discover", label: "发现", path: "/pages/discover/discover" },
        { key: "market", label: "集市", path: "/pages/market/market" },
        { key: "me", label: "我的", path: "/pages/me/me" }
      ],
      // 内容流数据
      feedList: [
        {
          id: "user_shanhe",
          username: "山河入梦",
          time: "一天前",
          text: "好喜欢这个配色",
          avatar: "/static/guanzhu/1.png",
          images: ["/static/guanzhu/hanfu3.png", "/static/guanzhu/hanfu4.png"],
          followed: false
        },
        {
          id: "user_qinghe",
          username: "清河小筑",
          time: "2 天前",
          text: "晨起焚一柱香，看竹影晃动，仿佛回到京都巷陌。",
          avatar: "/static/touxiang/touxiang2.png",
          images: ["/static/guanzhu/song_study.png"],
          followed: false
        },
        {
          id: "user_zhumo",
          username: "竹墨留香",
          time: "3 天前",
          text: "新绣了一件团花纹褙子，淡青配牙白，走在廊下风一吹就像画里人。",
          avatar: "/static/touxiang/touxiang3.png",
          images: ["/static/guanzhu/hanfu3.png", "/static/guanzhu/hanfu4.png"],
          followed: false
        },
        {
          id: "user_meishi",
          username: "一碗清欢",
          time: "5 天前",
          text: "用《山家清供》里的方子做了碗蟹酿橙，酸甜里带着桂花香。",
          avatar: "/static/touxiang/touxiang4.png",
          images: ["/static/guanzhu/food_guihuagao.png", "/static/guanzhu/food_xieliangcheng.png"],
          followed: false
        },
        {
          id: "user_shufa",
          username: "墨池边",
          time: "一周前",
          text: "练完小楷，把案几上的宣纸铺开，才发现窗外的月色也写进了字里行间。",
          avatar: "/static/touxiang/touxiang5.png",
          images: ["/static/guanzhu/song_study.png"],
          followed: false
        }
      ]
    };
  },
  onLoad() {
    this.initFollowState();
  },
  onReady() {
    setTimeout(() => {
      this.pageReady = true;
    }, 50);
  },
  computed: {
    // 关注列表：从所有内容里筛选已关注的用户
    followedFeeds() {
      return this.feedList.filter((item) => item.followed);
    }
  },
  methods: {
    onSwiperChange(e) {
      this.currentIndex = e.detail.current;
    },
    onCarouselClick(index, item) {
      if (item && item.title === "宋代衣食住行") {
        this.goTopic("overview");
      }
    },
    switchTab(tab) {
      this.activeTab = tab;
    },
    switchNav(key) {
      if (this.activeNav === key)
        return;
      this.activeNav = key;
      const tab = this.tabs.find((t) => t.key === key);
      if (tab && tab.path && tab.path !== "/pages/discover/discover") {
        common_vendor.index.redirectTo({
          url: tab.path
        });
      }
    },
    goTopic(key) {
      const map = {
        life: "/pages/discover/topic_life",
        clothing: "/pages/discover/topic_clothing",
        food: "/pages/discover/topic_food",
        overview: "/pages/discover/topic_overview"
      };
      const url = map[key];
      if (!url)
        return;
      common_vendor.index.navigateTo({ url });
    },
    initFollowState() {
      try {
        const stored = common_vendor.index.getStorageSync("discover_follow_ids");
        if (Array.isArray(stored) && stored.length) {
          this.feedList = this.feedList.map((item) => ({
            ...item,
            followed: stored.includes(item.id)
          }));
        }
      } catch (e) {
      }
    },
    toggleFollow(item) {
      const index = this.feedList.findIndex((feed) => feed.id === item.id);
      if (index === -1)
        return;
      const target = this.feedList[index];
      const newFollowed = !target.followed;
      this.$set(this.feedList, index, {
        ...target,
        followed: newFollowed
      });
      const followedIds = this.feedList.filter((f) => f.followed).map((f) => f.id);
      try {
        common_vendor.index.setStorageSync("discover_follow_ids", followedIds);
      } catch (e) {
      }
      common_vendor.index.showToast({
        title: newFollowed ? "已关注" : "已取消关注",
        icon: "success",
        duration: 1500
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.pageReady ? 1 : "",
    b: common_vendor.f($data.carouselList, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: item.title
      }, item.title ? {
        c: common_vendor.t(item.title)
      } : {}, {
        d: common_vendor.o(($event) => $options.onCarouselClick(index, item), index),
        e: index
      });
    }),
    c: $data.currentIndex,
    d: common_vendor.o((...args) => $options.onSwiperChange && $options.onSwiperChange(...args)),
    e: common_vendor.f($data.carouselList, (item, index, i0) => {
      return {
        a: index,
        b: index === $data.currentIndex ? 1 : ""
      };
    }),
    f: $data.pageReady ? 1 : "",
    g: $data.pageReady ? 1 : "",
    h: common_assets._imports_0$26,
    i: common_vendor.o(($event) => $options.goTopic("life")),
    j: common_assets._imports_0$25,
    k: common_vendor.o(($event) => $options.goTopic("clothing")),
    l: common_assets._imports_0$24,
    m: common_vendor.o(($event) => $options.goTopic("food")),
    n: $data.pageReady ? 1 : "",
    o: $data.activeTab === "hot" ? 1 : "",
    p: common_vendor.o(($event) => $options.switchTab("hot")),
    q: $data.activeTab === "follow" ? 1 : "",
    r: common_vendor.o(($event) => $options.switchTab("follow")),
    s: $data.pageReady ? 1 : "",
    t: $data.activeTab === "hot"
  }, $data.activeTab === "hot" ? {
    v: common_vendor.f($data.feedList, (item, k0, i0) => {
      return common_vendor.e({
        a: item.avatar,
        b: common_vendor.t(item.username),
        c: common_vendor.t(item.time),
        d: common_vendor.t(item.followed ? "已关注" : "+ 关注"),
        e: item.followed ? 1 : "",
        f: common_vendor.o(($event) => $options.toggleFollow(item), item.id),
        g: common_vendor.t(item.text),
        h: item.images && item.images.length
      }, item.images && item.images.length ? {
        i: common_vendor.f(item.images, (img, imgIndex, i1) => {
          return {
            a: img,
            b: imgIndex
          };
        })
      } : {}, {
        j: item.id
      });
    })
  } : common_vendor.e({
    w: $options.followedFeeds.length
  }, $options.followedFeeds.length ? {
    x: common_vendor.f($options.followedFeeds, (item, k0, i0) => {
      return common_vendor.e({
        a: item.avatar,
        b: common_vendor.t(item.username),
        c: common_vendor.t(item.time),
        d: common_vendor.t(item.text),
        e: item.images && item.images.length
      }, item.images && item.images.length ? {
        f: common_vendor.f(item.images, (img, imgIndex, i1) => {
          return {
            a: img,
            b: imgIndex
          };
        })
      } : {}, {
        g: item.id
      });
    })
  } : {}), {
    y: $data.pageReady ? 1 : "",
    z: common_vendor.f($data.tabs, (tab, k0, i0) => {
      return {
        a: common_vendor.n("icon-" + tab.key),
        b: common_vendor.t(tab.label),
        c: tab.key,
        d: tab.key === $data.activeNav ? 1 : "",
        e: common_vendor.o(($event) => $options.switchNav(tab.key), tab.key)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-36f2c107"]]);
wx.createPage(MiniProgramPage);
