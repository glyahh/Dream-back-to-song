const CART_KEY = 'market_cart'

export function getCart() {
  try {
    const str = uni.getStorageSync(CART_KEY)
    return str ? JSON.parse(str) : {}
  } catch {
    return {}
  }
}

export function setCart(cart) {
  uni.setStorageSync(CART_KEY, JSON.stringify(cart))
}

export function getCartQty(cart, productId) {
  return cart[productId] || 0
}

export function addToCart(productId, delta = 1) {
  const cart = getCart()
  cart[productId] = (cart[productId] || 0) + delta
  setCart(cart)
  return cart
}

export function minusFromCart(productId, delta = 1) {
  const cart = getCart()
  const cur = cart[productId] || 0
  if (cur <= 0) return cart
  if (cur <= delta) {
    delete cart[productId]
  } else {
    cart[productId] = cur - delta
  }
  setCart(cart)
  return cart
}

export function getCartList(productMap, cart) {
  const c = cart || getCart()
  const list = []
  Object.keys(c).forEach((id) => {
    const qty = c[id]
    if (qty > 0) {
      const product = productMap[String(id)] || productMap[id]
      if (product) {
        const price = parseFloat(product.price) || 0
        list.push({
          ...product,
          qty,
          subtotal: (price * qty).toFixed(2),
        })
      }
    }
  })
  return list
}

export function getCartTotal(cart, productMap) {
  let total = 0
  Object.keys(cart).forEach((id) => {
    const qty = cart[id]
    const product = productMap[id]
    if (qty > 0 && product) {
      total += parseFloat(product.price) * qty
    }
  })
  return total.toFixed(2)
}

export function getCartCount(cart) {
  return Object.values(cart).reduce((sum, q) => sum + (q || 0), 0)
}
