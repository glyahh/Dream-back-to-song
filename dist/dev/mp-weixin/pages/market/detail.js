"use strict";
const common_vendor = require("../../common/vendor.js");
function buildProductFromItem(item) {
  if (!item)
    return null;
  const images = item.images && item.images.length ? item.images : item.img ? [item.img] : [];
  const styles = item.styles && item.styles.length ? item.styles : item.img ? [{ thumb: item.img }] : [];
  return {
    id: item.id,
    name: item.name || "",
    subtitle: item.desc || item.subtitle || "",
    price: item.price || "0",
    originPrice: item.originPrice || "",
    shippingFrom: item.shippingFrom || "四川成都",
    service: item.service || "破损包退・极速退款・售后保障",
    images,
    styles,
    tagLabels: item.tags || [],
    sales: item.sales || "",
    shop: item.shop || ""
  };
}
const defaultProduct = {
  id: 1,
  name: "千里江山图系列餐盘-青山远黛",
  subtitle: "源于千里江山图",
  price: "48",
  originPrice: "",
  shippingFrom: "四川成都",
  service: "破损包退・极速退款・售后保障",
  images: [
    "/static/ji_shi/left_picture.png",
    "/static/ji_shi/titile_bg.png",
    "/static/ji_shi/market_2.png",
    "/static/ji_shi/market_3.png"
  ],
  styles: [
    { id: 1, name: "青山远黛", thumb: "/static/ji_shi/left_picture.png" },
    { id: 2, name: "青绿流苏", thumb: "/static/ji_shi/right_bg.png" }
  ],
  tagLabels: ["包邮", "换购"],
  sales: "",
  shop: ""
};
const _sfc_main = {
  data() {
    return {
      galleryIndex: 0,
      selectedStyleIndex: 0,
      product: {
        ...defaultProduct,
        images: [...defaultProduct.images],
        styles: [...defaultProduct.styles]
      }
    };
  },
  onLoad(options) {
    const stored = common_vendor.index.getStorageSync("market_detail_product");
    const built = buildProductFromItem(stored);
    if (built && built.images && built.images.length) {
      this.product = built;
    } else if (options.id) {
      this.product.id = options.id;
      if (options.name)
        this.product.name = decodeURIComponent(options.name);
    }
  },
  methods: {
    onGalleryChange(e) {
      this.galleryIndex = e.detail.current;
    },
    viewOffers() {
      common_vendor.index.showToast({ title: "查看优惠", icon: "none" });
    },
    selectStyle(idx) {
      this.selectedStyleIndex = idx;
    },
    showStylePicker() {
    },
    goCart() {
      common_vendor.index.showToast({ title: "购物车", icon: "none" });
    },
    addToCart() {
      common_vendor.index.showToast({ title: "已加入购物车", icon: "success" });
    },
    buyNow() {
      common_vendor.index.showToast({ title: "立即购买", icon: "none" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.product.images && $data.product.images.length
  }, $data.product.images && $data.product.images.length ? common_vendor.e({
    b: common_vendor.f($data.product.images, (img, i, i0) => {
      return {
        a: img,
        b: i
      };
    }),
    c: $data.galleryIndex,
    d: $data.product.images.length > 1,
    e: common_vendor.o((...args) => $options.onGalleryChange && $options.onGalleryChange(...args)),
    f: common_vendor.t($data.galleryIndex + 1),
    g: common_vendor.t($data.product.images.length),
    h: common_vendor.t($data.product.price),
    i: $data.product.tagLabels && $data.product.tagLabels.length
  }, $data.product.tagLabels && $data.product.tagLabels.length ? {
    j: common_vendor.f($data.product.tagLabels, (t, k0, i0) => {
      return {
        a: common_vendor.t(t),
        b: t
      };
    })
  } : {}, {
    k: common_vendor.o((...args) => $options.viewOffers && $options.viewOffers(...args)),
    l: $data.product.originPrice
  }, $data.product.originPrice ? {
    m: common_vendor.t($data.product.originPrice)
  } : {}, {
    n: common_vendor.t($data.product.name),
    o: $data.product.subtitle
  }, $data.product.subtitle ? {
    p: common_vendor.t($data.product.subtitle)
  } : {}, {
    q: common_vendor.t($data.product.shippingFrom),
    r: common_vendor.t($data.product.service),
    s: $data.product.sales || $data.product.shop
  }, $data.product.sales || $data.product.shop ? common_vendor.e({
    t: $data.product.sales
  }, $data.product.sales ? {
    v: common_vendor.t($data.product.sales)
  } : {}, {
    w: $data.product.shop
  }, $data.product.shop ? {
    x: common_vendor.t($data.product.shop)
  } : {}) : {}, {
    y: $data.product.styles && $data.product.styles.length
  }, $data.product.styles && $data.product.styles.length ? {
    z: common_vendor.f($data.product.styles, (style, idx, i0) => {
      return common_vendor.e({
        a: style.thumb,
        b: idx === $data.selectedStyleIndex
      }, idx === $data.selectedStyleIndex ? {} : {}, {
        c: idx,
        d: idx === $data.selectedStyleIndex ? 1 : "",
        e: common_vendor.o(($event) => $options.selectStyle(idx), idx)
      });
    }),
    A: common_vendor.o((...args) => $options.showStylePicker && $options.showStylePicker(...args))
  } : {}, {
    B: common_vendor.o((...args) => $options.goCart && $options.goCart(...args)),
    C: common_vendor.o((...args) => $options.addToCart && $options.addToCart(...args)),
    D: common_vendor.o((...args) => $options.buyNow && $options.buyNow(...args))
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e6d740f7"]]);
wx.createPage(MiniProgramPage);
