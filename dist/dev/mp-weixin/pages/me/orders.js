"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentStatus: "all",
      statusTabs: [
        { key: "all", label: "全部" },
        { key: "pending", label: "待付款" },
        { key: "shipped", label: "待收货" },
        { key: "finished", label: "已完成" }
      ],
      statusText: {
        pending: "待付款",
        shipped: "待收货",
        finished: "已完成"
      },
      orders: []
    };
  },
  computed: {
    filteredOrders() {
      if (this.currentStatus === "all")
        return this.orders;
      return this.orders.filter((item) => item.status === this.currentStatus);
    }
  },
  onLoad() {
    this.initOrders();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    initOrders() {
      const mock = [
        {
          id: "order1",
          title: "汴河清赏 · 茶器礼盒",
          desc: "一盏茶、一方木托，随手即是宋人茶席。",
          img: "/static/market_newitem/风荷雅盏.png",
          time: "下单时间：2026-02-01 20:14",
          status: "pending",
          count: 1,
          price: 189
        },
        {
          id: "order2",
          title: "千里江山 · 手卷书签套装",
          desc: "从画卷中取一角，夹在书页之间。",
          img: "/static/market_allitem/汴梁旧帖.png",
          time: "下单时间：2026-01-20 14:32",
          status: "shipped",
          count: 2,
          price: 98
        },
        {
          id: "order3",
          title: "宋韵点心盘 · 桂花款",
          desc: "仿汴京点心盘，晨起一碟，伴书香茶烟。",
          img: "/static/market_allitem/风荷雅盏.png",
          time: "下单时间：2026-01-05 09:10",
          status: "finished",
          count: 1,
          price: 129
        }
      ];
      try {
        const stored = common_vendor.index.getStorageSync("me_orders");
        this.orders = Array.isArray(stored) && stored.length ? stored : mock;
      } catch (e) {
        this.orders = mock;
      }
    },
    switchStatus(key) {
      this.currentStatus = key;
    },
    persist() {
      try {
        common_vendor.index.setStorageSync("me_orders", this.orders);
      } catch (e) {
      }
    },
    payOrder(item) {
      common_vendor.index.showToast({ title: "模拟支付成功", icon: "success" });
      this.orders = this.orders.map(
        (o) => o.id === item.id ? { ...o, status: "shipped" } : o
      );
      this.persist();
    },
    cancelOrder(item) {
      common_vendor.index.showModal({
        title: "取消订单",
        content: "确定要取消这笔订单吗？",
        success: (res) => {
          if (res.confirm) {
            this.orders = this.orders.filter((o) => o.id !== item.id);
            this.persist();
            common_vendor.index.showToast({ title: "已取消", icon: "none" });
          }
        }
      });
    },
    confirmOrder(item) {
      common_vendor.index.showToast({ title: "已确认收货", icon: "success" });
      this.orders = this.orders.map(
        (o) => o.id === item.id ? { ...o, status: "finished" } : o
      );
      this.persist();
    },
    viewLogistics(item) {
      common_vendor.index.showToast({
        title: "物流信息：包裹已送达「汴京驿站」",
        icon: "none"
      });
    },
    goDetail(item) {
      common_vendor.index.navigateTo({
        url: "/pages/market/detail?from=orders"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.statusTabs, (tab, k0, i0) => {
      return {
        a: common_vendor.t(tab.label),
        b: tab.key,
        c: $data.currentStatus === tab.key ? 1 : "",
        d: common_vendor.o(($event) => $options.switchStatus(tab.key), tab.key)
      };
    }),
    c: $options.filteredOrders.length
  }, $options.filteredOrders.length ? {
    d: common_vendor.f($options.filteredOrders, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t($data.statusText[item.status]),
        b: common_vendor.n("status-" + item.status),
        c: item.img,
        d: common_vendor.t(item.title),
        e: common_vendor.t(item.desc),
        f: common_vendor.t(item.time),
        g: common_vendor.t(item.count),
        h: common_vendor.t(item.price),
        i: item.status === "pending"
      }, item.status === "pending" ? {
        j: common_vendor.o(($event) => $options.cancelOrder(item), item.id)
      } : {}, {
        k: item.status === "pending"
      }, item.status === "pending" ? {
        l: common_vendor.o(($event) => $options.payOrder(item), item.id)
      } : {}, {
        m: item.status === "shipped"
      }, item.status === "shipped" ? {
        n: common_vendor.o(($event) => $options.confirmOrder(item), item.id)
      } : {}, {
        o: item.status === "finished"
      }, item.status === "finished" ? {
        p: common_vendor.o(($event) => $options.viewLogistics(item), item.id)
      } : {}, {
        q: item.id,
        r: common_vendor.o(($event) => $options.goDetail(item), item.id)
      });
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-757dfd22"]]);
wx.createPage(MiniProgramPage);
