"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_marketCart = require("../../utils/marketCart.js");
const utils_marketProducts = require("../../utils/marketProducts.js");
const _sfc_main = {
  data() {
    return {
      keyword: "",
      activeTab: "all",
      cartPanelOpen: false,
      cart: {}
    };
  },
  computed: {
    productMap() {
      return utils_marketProducts.getProductMap(utils_marketProducts.allProducts);
    },
    filteredProducts() {
      let list = utils_marketProducts.allProducts;
      if (this.activeTab === "new")
        list = utils_marketProducts.newProducts;
      else if (this.activeTab === "series")
        list = utils_marketProducts.seriesProducts;
      if (!this.keyword.trim())
        return list;
      const k = this.keyword.trim().toLowerCase();
      return list.filter(
        (p) => p.name && p.name.toLowerCase().includes(k) || p.desc && p.desc.toLowerCase().includes(k)
      );
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
    }
  },
  onLoad(options) {
    if (options.tab === "new")
      this.activeTab = "new";
    else if (options.tab === "series")
      this.activeTab = "series";
  },
  onShow() {
    this.cart = utils_marketCart.getCart();
  },
  methods: {
    onSearch() {
      common_vendor.index.showToast({ title: this.keyword ? `搜索: ${this.keyword}` : "请输入关键词", icon: "none" });
    },
    goDetail(item) {
      common_vendor.index.setStorageSync("market_detail_product", item);
      common_vendor.index.navigateTo({ url: `/pages/market/detail?id=${item.id}` });
    },
    getCartQty(item) {
      return this.cart[item.id] || this.cart[String(item.id)] || 0;
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
    e: $data.activeTab === "all" ? 1 : "",
    f: common_vendor.o(($event) => $data.activeTab = "all"),
    g: $data.activeTab === "new" ? 1 : "",
    h: common_vendor.o(($event) => $data.activeTab = "new"),
    i: $data.activeTab === "series" ? 1 : "",
    j: common_vendor.o(($event) => $data.activeTab = "series"),
    k: common_vendor.f($options.filteredProducts, (item, k0, i0) => {
      return common_vendor.e({
        a: item.img,
        b: item.tag
      }, item.tag ? {
        c: common_vendor.t(item.tag)
      } : {}, {
        d: common_vendor.t(item.name),
        e: common_vendor.t(item.desc),
        f: common_vendor.t(item.price),
        g: common_vendor.t(item.sales || ""),
        h: $options.getCartQty(item) > 0
      }, $options.getCartQty(item) > 0 ? {
        i: common_vendor.o(($event) => $options.minusFromCart(item), item.id),
        j: common_vendor.t($options.getCartQty(item)),
        k: common_vendor.o(($event) => $options.addToCart(item), item.id)
      } : {
        l: common_vendor.o(($event) => $options.addToCart(item), item.id)
      }, {
        m: item.id,
        n: common_vendor.o(($event) => $options.goDetail(item), item.id)
      });
    }),
    l: $options.cartTotalCount > 0
  }, $options.cartTotalCount > 0 ? common_vendor.e({
    m: $data.cartPanelOpen
  }, $data.cartPanelOpen ? {
    n: common_vendor.f($options.cartList, (row, k0, i0) => {
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
    o: common_vendor.t($options.cartTotalCount),
    p: common_vendor.t($options.cartTotalPrice),
    q: common_vendor.o((...args) => $options.goSettle && $options.goSettle(...args))
  } : {}, {
    r: common_vendor.t($options.cartTotalCount),
    s: common_vendor.t($options.cartTotalPrice),
    t: common_vendor.o((...args) => $options.goSettle && $options.goSettle(...args)),
    v: $data.cartPanelOpen ? 1 : "",
    w: common_vendor.o((...args) => $options.toggleCartPanel && $options.toggleCartPanel(...args))
  }) : {}, {
    x: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    y: $options.cartTotalCount > 0 ? 1 : ""
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ceeb6a15"]]);
wx.createPage(MiniProgramPage);
