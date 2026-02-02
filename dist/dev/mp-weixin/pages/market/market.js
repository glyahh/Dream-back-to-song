"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_marketCart = require("../../utils/marketCart.js");
const utils_marketProducts = require("../../utils/marketProducts.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      cartPanelOpen: false,
      activeNav: "market",
      pageReady: false,
      heroCurrentIndex: 0,
      heroCarouselList: [
        "/static/ji_shi/titile_bg.png",
        "/static/ji_shi/market_2.png",
        "/static/ji_shi/market_3.png",
        "/static/ji_shi/market_4.png"
      ],
      hotProducts: [
        {
          id: 1,
          name: "千里江山图系列餐盘-青山远黛",
          img: "/static/ji_shi/left_picture.png",
          price: "48"
        },
        {
          id: 2,
          name: "青绿流苏团扇",
          img: "/static/ji_shi/right_bg.png",
          price: "68"
        }
      ],
      newProducts: utils_marketProducts.newProducts,
      tabs: [
        { key: "home", label: "首页", path: "/pages/main_index/main_index" },
        { key: "discover", label: "发现", path: "/pages/discover/discover" },
        { key: "market", label: "集市", path: "/pages/market/market" },
        { key: "me", label: "我的", path: "/pages/me/me" }
      ],
      cart: {}
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
    cartTotalDiscount() {
      let discount = 0;
      this.newProducts.forEach((p) => {
        const q = this.cart[p.id] || this.cart[String(p.id)] || 0;
        if (q > 0 && p.originPrice) {
          const orig = parseFloat(p.originPrice);
          const curr = parseFloat(p.price);
          if (orig > curr)
            discount += (orig - curr) * q;
        }
      });
      return Math.round(discount * 100) / 100;
    }
  },
  onShow() {
    this.cart = utils_marketCart.getCart();
  },
  onReady() {
    setTimeout(() => {
      this.pageReady = true;
    }, 50);
  },
  methods: {
    onHeroSwiperChange(e) {
      this.heroCurrentIndex = e.detail.current;
    },
    switchNav(key) {
      if (this.activeNav === key)
        return;
      this.activeNav = key;
      const tab = this.tabs.find((t) => t.key === key);
      if (tab && tab.path && tab.path !== "/pages/market/market") {
        common_vendor.index.redirectTo({
          url: tab.path
        });
      }
    },
    goProductDetail(item) {
      common_vendor.index.setStorageSync("market_detail_product", item);
      common_vendor.index.navigateTo({
        url: `/pages/market/detail?id=${item.id}`
      });
    },
    goNew() {
      common_vendor.index.navigateTo({ url: "/pages/market/all?tab=new" });
    },
    goSeries() {
      common_vendor.index.navigateTo({ url: "/pages/market/series" });
    },
    goAll() {
      common_vendor.index.navigateTo({ url: "/pages/market/all" });
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.heroCarouselList, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: $data.heroCurrentIndex,
    c: common_vendor.o((...args) => $options.onHeroSwiperChange && $options.onHeroSwiperChange(...args)),
    d: $data.pageReady ? 1 : "",
    e: common_vendor.f($data.heroCarouselList, (item, index, i0) => {
      return {
        a: index,
        b: index === $data.heroCurrentIndex ? 1 : ""
      };
    }),
    f: common_assets._imports_0$17,
    g: common_vendor.o((...args) => $options.goNew && $options.goNew(...args)),
    h: common_assets._imports_1$8,
    i: common_vendor.o((...args) => $options.goSeries && $options.goSeries(...args)),
    j: common_assets._imports_2$7,
    k: common_vendor.o((...args) => $options.goAll && $options.goAll(...args)),
    l: $data.pageReady ? 1 : "",
    m: $data.pageReady ? 1 : "",
    n: common_vendor.o((...args) => $options.goAll && $options.goAll(...args)),
    o: common_vendor.f($data.hotProducts, (item, k0, i0) => {
      return {
        a: item.img,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: item.name,
        e: common_vendor.o(($event) => $options.goProductDetail(item), item.name)
      };
    }),
    p: $data.pageReady ? 1 : "",
    q: $data.pageReady ? 1 : "",
    r: common_vendor.o((...args) => $options.goNew && $options.goNew(...args)),
    s: common_vendor.f($data.newProducts, (item, index, i0) => {
      return common_vendor.e({
        a: item.img,
        b: item.tag
      }, item.tag ? {
        c: common_vendor.t(item.tag)
      } : {}, {
        d: common_vendor.t(item.name),
        e: common_vendor.t(item.desc),
        f: common_vendor.t(item.price),
        g: item.originPrice
      }, item.originPrice ? {
        h: common_vendor.t(item.originPrice)
      } : {}, {
        i: common_vendor.f(item.tags, (t, k1, i1) => {
          return {
            a: common_vendor.t(t),
            b: t
          };
        }),
        j: common_vendor.t(item.sales),
        k: common_vendor.t(item.shop),
        l: $options.getCartQty(item) > 0
      }, $options.getCartQty(item) > 0 ? {
        m: common_vendor.o(($event) => $options.minusFromCart(item), item.id),
        n: common_vendor.t($options.getCartQty(item)),
        o: common_vendor.o(($event) => $options.addToCart(item), item.id)
      } : {
        p: common_vendor.o(($event) => $options.addToCart(item), item.id)
      }, {
        q: item.id,
        r: common_vendor.o(($event) => $options.goProductDetail(item), item.id)
      });
    }),
    t: $data.pageReady ? 1 : "",
    v: $options.cartTotalCount > 0
  }, $options.cartTotalCount > 0 ? common_vendor.e({
    w: $data.cartPanelOpen
  }, $data.cartPanelOpen ? {
    x: common_vendor.f($options.cartList, (row, k0, i0) => {
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
    y: common_vendor.t($options.cartTotalCount),
    z: common_vendor.t($options.cartTotalPrice),
    A: common_vendor.o((...args) => $options.goSettle && $options.goSettle(...args))
  } : {}, {
    B: common_vendor.t($options.cartTotalCount),
    C: common_vendor.t($options.cartTotalPrice),
    D: $options.cartTotalDiscount > 0
  }, $options.cartTotalDiscount > 0 ? {
    E: common_vendor.t($options.cartTotalDiscount.toFixed(2))
  } : {}, {
    F: common_vendor.o((...args) => $options.goSettle && $options.goSettle(...args)),
    G: $data.cartPanelOpen ? 1 : "",
    H: common_vendor.o((...args) => $options.toggleCartPanel && $options.toggleCartPanel(...args))
  }) : {}, {
    I: common_vendor.f($data.tabs, (tab, k0, i0) => {
      return {
        a: common_vendor.n("icon-" + tab.key),
        b: common_vendor.t(tab.label),
        c: tab.key,
        d: tab.key === $data.activeNav ? 1 : "",
        e: common_vendor.o(($event) => $options.switchNav(tab.key), tab.key)
      };
    }),
    J: $options.cartTotalCount > 0 ? 1 : ""
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d5ebafbc"]]);
wx.createPage(MiniProgramPage);
