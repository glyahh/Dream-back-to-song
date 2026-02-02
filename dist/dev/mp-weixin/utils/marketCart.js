"use strict";
const common_vendor = require("../common/vendor.js");
const CART_KEY = "market_cart";
function getCart() {
  try {
    const str = common_vendor.index.getStorageSync(CART_KEY);
    return str ? JSON.parse(str) : {};
  } catch {
    return {};
  }
}
function setCart(cart) {
  common_vendor.index.setStorageSync(CART_KEY, JSON.stringify(cart));
}
function addToCart(productId, delta = 1) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + delta;
  setCart(cart);
  return cart;
}
function minusFromCart(productId, delta = 1) {
  const cart = getCart();
  const cur = cart[productId] || 0;
  if (cur <= 0)
    return cart;
  if (cur <= delta) {
    delete cart[productId];
  } else {
    cart[productId] = cur - delta;
  }
  setCart(cart);
  return cart;
}
function getCartList(productMap, cart) {
  const c = cart || getCart();
  const list = [];
  Object.keys(c).forEach((id) => {
    const qty = c[id];
    if (qty > 0) {
      const product = productMap[String(id)] || productMap[id];
      if (product) {
        const price = parseFloat(product.price) || 0;
        list.push({
          ...product,
          qty,
          subtotal: (price * qty).toFixed(2)
        });
      }
    }
  });
  return list;
}
exports.addToCart = addToCart;
exports.getCart = getCart;
exports.getCartList = getCartList;
exports.minusFromCart = minusFromCart;
