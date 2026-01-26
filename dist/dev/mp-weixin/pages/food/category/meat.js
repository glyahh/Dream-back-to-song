"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchKeyword: "",
      pressedIndex: -1,
      isNavigating: false,
      dishes: [
        {
          id: 1,
          name: "东坡肉",
          image: "/static/dongporou.png",
          liked: false,
          likeCount: 42,
          favorited: false,
          favoriteCount: 23,
          description: "东坡肉，杭州名菜，肥而不腻，酥香味美"
        },
        {
          id: 2,
          name: "螃蟹羹",
          image: "/static/pangxiegeng.png",
          liked: true,
          likeCount: 38,
          favorited: false,
          favoriteCount: 15,
          description: "宋代流行的蟹肉羹，鲜美细腻，营养丰富"
        },
        {
          id: 3,
          name: "蟹酿橙",
          image: "/static/xieliangcheng.png",
          liked: false,
          likeCount: 56,
          favorited: true,
          favoriteCount: 31,
          description: "将蟹肉酿入橙中，橙香蟹鲜，别具风味"
        },
        {
          id: 4,
          name: "鲜笋蒸鸡",
          image: "/static/xiansunzhenge.jpg",
          liked: false,
          likeCount: 29,
          favorited: false,
          favoriteCount: 12,
          description: "春笋与鸡肉同蒸，鲜嫩爽口，清香四溢"
        },
        {
          id: 5,
          name: "山煮羊",
          image: "/static/shanzhuyang.png",
          liked: true,
          likeCount: 67,
          favorited: true,
          favoriteCount: 45,
          description: "山羊肉慢火炖煮，肉质酥烂，汤浓味醇"
        },
        {
          id: 6,
          name: "煎小鸡",
          image: "/static/jianxiaoji.png",
          liked: false,
          likeCount: 34,
          favorited: false,
          favoriteCount: 18,
          description: "嫩鸡肉香煎，外酥里嫩，香气扑鼻"
        }
      ]
    };
  },
  computed: {
    filteredDishes() {
      if (!this.searchKeyword.trim()) {
        return this.dishes;
      }
      const keyword = this.searchKeyword.toLowerCase();
      return this.dishes.filter(
        (dish) => dish.name.toLowerCase().includes(keyword) || dish.description.toLowerCase().includes(keyword)
      );
    }
  },
  methods: {
    goBack() {
      if (this.isNavigating)
        return;
      this.isNavigating = true;
      common_vendor.index.navigateBack({
        delta: 1,
        fail: () => {
          this.isNavigating = false;
          common_vendor.index.redirectTo({
            url: "/pages/food/index"
          });
        },
        complete: () => {
          setTimeout(() => {
            this.isNavigating = false;
          }, 300);
        }
      });
    },
    onSearch() {
      console.log("搜索关键词:", this.searchKeyword);
    },
    handleTouchStart(index) {
      this.pressedIndex = index;
    },
    handleTouchEnd() {
      setTimeout(() => {
        this.pressedIndex = -1;
      }, 150);
    },
    toggleLike(dish) {
      dish.liked = !dish.liked;
      dish.likeCount += dish.liked ? 1 : -1;
      common_vendor.index.showToast({
        title: dish.liked ? "已点赞" : "已取消点赞",
        icon: "none",
        duration: 800
      });
    },
    toggleFavorite(dish) {
      dish.favorited = !dish.favorited;
      dish.favoriteCount += dish.favorited ? 1 : -1;
      common_vendor.index.showToast({
        title: dish.favorited ? "已收藏" : "已取消收藏",
        icon: "none",
        duration: 800
      });
    },
    goToDishDetail(dish) {
      console.log("点击菜品:", dish.name, "ID:", dish.id);
      const detailPages = {
        1: "/pages/food/detail/dongporou",
        // 东坡肉
        2: "/pages/food/detail/pangxiegeng",
        // 螃蟹羹
        3: "/pages/food/detail/xieliangcheng",
        // 蟹酿橙
        4: "/pages/food/detail/xiansunzhengji",
        // 鲜笋蒸鸡
        5: "/pages/food/detail/shanzhuyang",
        // 山煮羊
        6: "/pages/food/detail/jianxiaoji"
        // 煎小鸡
      };
      const pagePath = detailPages[dish.id];
      console.log("跳转路径:", pagePath);
      if (pagePath) {
        common_vendor.index.navigateTo({
          url: `${pagePath}?id=${dish.id}&name=${encodeURIComponent(dish.name)}`,
          success: (res) => {
            console.log("跳转成功", res);
          },
          fail: (err) => {
            console.log("跳转失败", err);
            common_vendor.index.showToast({
              title: "页面未找到",
              icon: "none"
            });
          }
        });
      } else {
        console.log("找不到对应页面，ID:", dish.id);
        common_vendor.index.showToast({
          title: "页面开发中",
          icon: "none"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o((...args) => $options.onSearch && $options.onSearch(...args)),
    c: $data.searchKeyword,
    d: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    e: common_vendor.f($options.filteredDishes, (dish, index, i0) => {
      return {
        a: dish.image,
        b: common_vendor.t(dish.name),
        c: dish.liked ? 1 : "",
        d: common_vendor.o(($event) => $options.toggleLike(dish), dish.id),
        e: dish.favorited ? 1 : "",
        f: common_vendor.o(($event) => $options.toggleFavorite(dish), dish.id),
        g: dish.id,
        h: $data.pressedIndex === index ? 1 : "",
        i: common_vendor.o(($event) => $options.handleTouchStart(index), dish.id),
        j: common_vendor.o((...args) => $options.handleTouchEnd && $options.handleTouchEnd(...args), dish.id),
        k: common_vendor.o(($event) => $options.goToDishDetail(dish), dish.id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-34df1a7f"]]);
wx.createPage(MiniProgramPage);
