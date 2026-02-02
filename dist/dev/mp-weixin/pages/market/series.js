"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_marketCart = require("../../utils/marketCart.js");
const utils_marketProducts = require("../../utils/marketProducts.js");
const _sfc_main = {
  data() {
    return {
      keyword: "",
      bannerText: "宋韵好物 · 精选文创至高享8折",
      featuredProduct: null,
      cartPanelOpen: false,
      cart: {},
      seriesProducts: utils_marketProducts.seriesProducts
    };
  },
  computed: {
    productMap() {
      return utils_marketProducts.getProductMap(utils_marketProducts.allProducts);
    },
    cartList() {
      return utils_marketCart.getCartList(this.productMap, this.cart);
    },
    cartTotalCount() {
      return Object.values(this.cart).reduce((s, q) => s + (Number(q) || 0), 0);
    },
    cartTotalPrice() {
      let total = 0;
      utils_marketProducts.allProducts.forEach((p) => {
        const q = this.cart[p.id] || this.cart[String(p.id)] || 0;
        if (q > 0)
          total += parseFloat(p.price) * q;
      });
      return total.toFixed(2);
    },
    filteredProducts() {
      if (!this.keyword.trim())
        return this.seriesProducts;
      const k = this.keyword.trim().toLowerCase();
      return this.seriesProducts.filter(
        (p) => p.name && p.name.toLowerCase().includes(k) || p.desc && p.desc.toLowerCase().includes(k)
      );
    }
  },
  onLoad() {
    this.featuredProduct = this.seriesProducts[0] || null;
  },
  onShow() {
    this.cart = utils_marketCart.getCart();
  },
  methods: {
    getCartQty(item) {
      return this.cart[item.id] || this.cart[String(item.id)] || 0;
    },
    onSearch() {
      common_vendor.index.showToast({ title: this.keyword ? `搜索: ${this.keyword}` : "请输入关键词", icon: "none" });
    },
    onBannerAction() {
      common_vendor.index.showToast({ title: "查看活动", icon: "none" });
    },
    goDetail(item) {
      common_vendor.index.setStorageSync("market_detail_product", item);
      common_vendor.index.navigateTo({ url: `/pages/market/detail?id=${item.id}` });
    },
    addToCart(item) {
      this.cart = utils_marketCart.addToCart(String(item.id), 1);
    },
    minusFromCart(item) {
      this.cart = utils_marketCart.minusFromCart(String(item.id), 1);
    },
    toggleCartPanel() {
      this.cartPanelOpen = !this.cartPanelOpen;
    },
    cartPlus(row) {
      this.cart = utils_marketCart.addToCart(String(row.id), 1);
    },
    cartMinus(row) {
      this.cart = utils_marketCart.minusFromCart(String(row.id), 1);
    },
    goSettle() {
      if (this.cartTotalCount <= 0)
        return;
      common_vendor.index.showToast({ title: "去结算", icon: "none" });
    },
    goTopic() {
      common_vendor.index.showToast({ title: "精选话题", icon: "none" });
    },
    goBack() {
      common_vendor.index.navigateBack({ delta: 1, fail: () => common_vendor.index.redirectTo({ url: "/pages/market/market" }) });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.onSearch && $options.onSearch(...args)),
    b: $data.keyword,
    c: common_vendor.o(($event) => $data.keyword = $event.detail.value),
    d: common_vendor.o((...args) => $options.onSearch && $options.onSearch(...args)),
    e: $data.bannerText
  }, $data.bannerText ? {
    f: common_vendor.t($data.bannerText),
    g: common_vendor.o((...args) => $options.onBannerAction && $options.onBannerAction(...args)),
    h: common_vendor.o(($event) => $data.bannerText = "")
  } : {}, {
    i: $data.featuredProduct
  }, $data.featuredProduct ? common_vendor.e({
    j: $data.featuredProduct.img,
    k: $data.featuredProduct.tag
  }, $data.featuredProduct.tag ? {
    l: common_vendor.t($data.featuredProduct.tag)
  } : {}, {
    m: common_vendor.t($data.featuredProduct.name),
    n: common_vendor.t($data.featuredProduct.desc),
    o: common_vendor.t($data.featuredProduct.price),
    p: common_vendor.t($data.featuredProduct.sales),
    q: $options.getCartQty($data.featuredProduct) > 0
  }, $options.getCartQty($data.featuredProduct) > 0 ? {
    r: common_vendor.o(($event) => $options.minusFromCart($data.featuredProduct)),
    s: common_vendor.t($options.getCartQty($data.featuredProduct)),
    t: common_vendor.o(($event) => $options.addToCart($data.featuredProduct))
  } : {
    v: common_vendor.o(($event) => $options.addToCart($data.featuredProduct))
  }, {
    w: common_vendor.o(($event) => $options.goDetail($data.featuredProduct))
  }) : {}, {
    x: common_vendor.o((...args) => $options.goTopic && $options.goTopic(...args)),
    y: common_vendor.f($options.filteredProducts, (item, k0, i0) => {
      return common_vendor.e({
        a: item.img,
        b: item.tag
      }, item.tag ? {
        c: common_vendor.t(item.tag)
      } : {}, {
        d: item.tag2
      }, item.tag2 ? {
        e: common_vendor.t(item.tag2)
      } : {}, {
        f: common_vendor.t(item.name),
        g: common_vendor.t(item.desc),
        h: common_vendor.t(item.price),
        i: common_vendor.t(item.sales),
        j: $options.getCartQty(item) > 0
      }, $options.getCartQty(item) > 0 ? {
        k: common_vendor.o(($event) => $options.minusFromCart(item), item.id),
        l: common_vendor.t($options.getCartQty(item)),
        m: common_vendor.o(($event) => $options.addToCart(item), item.id)
      } : {
        n: common_vendor.o(($event) => $options.addToCart(item), item.id)
      }, {
        o: item.id,
        p: common_vendor.o(($event) => $options.goDetail(item), item.id)
      });
    }),
    z: $options.cartTotalCount > 0
  }, $options.cartTotalCount > 0 ? common_vendor.e({
    A: $data.cartPanelOpen
  }, $data.cartPanelOpen ? {
    B: common_vendor.f($options.cartList, (row, k0, i0) => {
      return {
        a: row.img,
        b: common_vendor.t(row.name),
        c: common_vendor.t(row.price),
        d: common_vendor.t(row.qty),
        e: common_vendor.o(($event) => $options.cartMinus(row), row.id),
        f: common_vendor.t(row.qty),
        g: common_vendor.o(($event) => $options.cartPlus(row), row.id),
        h: common_vendor.t(row.subtotal),
        i: row.id
      };
    }),
    C: common_vendor.t($options.cartTotalCount),
    D: common_vendor.t($options.cartTotalPrice),
    E: common_vendor.o((...args) => $options.goSettle && $options.goSettle(...args))
  } : {}, {
    F: common_vendor.t($options.cartTotalCount),
    G: common_vendor.t($options.cartTotalPrice),
    H: common_vendor.o((...args) => $options.goSettle && $options.goSettle(...args)),
    I: $data.cartPanelOpen ? 1 : "",
    J: common_vendor.o((...args) => $options.toggleCartPanel && $options.toggleCartPanel(...args))
  }) : {}, {
    K: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    L: $options.cartTotalCount > 0 ? 1 : ""
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4048659c"]]);
wx.createPage(MiniProgramPage);
