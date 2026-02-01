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
          name: "茶",
          image: "/static/food_drink.jpg",
          liked: false,
          likeCount: 68,
          favorited: false,
          favoriteCount: 35,
          description: "宋代茶文化，清香淡雅，回味悠长"
        },
        {
          id: 2,
          name: "酒",
          image: "/static/food_drink.jpg",
          liked: true,
          likeCount: 55,
          favorited: false,
          favoriteCount: 28,
          description: "宋代美酒，醇厚甘甜，温润如玉"
        },
        {
          id: 3,
          name: "汤",
          image: "/static/food_drink.jpg",
          liked: false,
          likeCount: 42,
          favorited: true,
          favoriteCount: 21,
          description: "养生汤品，温润滋补，清香淡雅"
        },
        {
          id: 4,
          name: "露",
          image: "/static/food_drink.jpg",
          liked: false,
          likeCount: 38,
          favorited: false,
          favoriteCount: 19,
          description: "花露饮品，清香怡人，甘甜爽口"
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
      const detailPages = {
        1: "/pages/food/detail/cha",
        // 茶
        2: "/pages/food/detail/jiu",
        // 酒
        3: "/pages/food/detail/tang",
        // 汤
        4: "/pages/food/detail/lu"
        // 露
      };
      const pagePath = detailPages[dish.id];
      if (pagePath) {
        common_vendor.index.navigateTo({
          url: `${pagePath}?id=${dish.id}&name=${encodeURIComponent(dish.name)}`
        });
      } else {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-32f9ee36"]]);
wx.createPage(MiniProgramPage);
