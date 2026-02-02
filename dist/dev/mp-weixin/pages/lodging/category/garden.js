"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      gardens: [
        {
          id: 1,
          name: "苏州拙政园",
          location: "江苏苏州",
          image: "/static/building-suzhou.png",
          description: "江南古典园林的代表作品，以水为中心，萦绕错落有致的假山及精致的庭院建筑",
          path: "/pages/lodging/detail/suzhou"
        },
        {
          id: 2,
          name: "环溪",
          location: "河南洛阳",
          image: "/static/building-huanyixi.png",
          description: "宋代著名园林，以溪流环绕为特色，体现了宋代园林的自然美学",
          path: "/pages/lodging/detail/huanyixi"
        },
        {
          id: 3,
          name: "私家园林",
          location: "江南地区",
          image: "/static/nav-garden.jpg",
          description: "宋代私家园林兴盛，文人雅士追求自然与人文的完美结合",
          path: ""
        }
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    goToDetail(garden) {
      if (garden.path) {
        common_vendor.index.navigateTo({
          url: garden.path
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.gardens, (garden, index, i0) => {
      return {
        a: garden.image,
        b: common_vendor.t(garden.name),
        c: common_vendor.t(garden.location),
        d: common_vendor.t(garden.description),
        e: index,
        f: common_vendor.o(($event) => $options.goToDetail(garden), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8bdd30b0"]]);
wx.createPage(MiniProgramPage);
