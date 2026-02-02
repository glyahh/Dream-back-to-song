"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      regionFeatures: [
        {
          name: "北方地区",
          description: "北方地区以陆路交通为主，马车、牛车等交通工具使用广泛，道路网络发达。"
        },
        {
          name: "南方地区",
          description: "南方地区水路交通发达，船只成为重要的交通工具，运河网络密集。"
        },
        {
          name: "江南地区",
          description: "江南地区水陆交通并重，既有发达的陆路，也有密集的水路，交通最为便利。"
        }
      ],
      classFeatures: [
        {
          name: "官员阶层",
          description: "官员出行有严格的礼仪规范，使用轿子、马车等交通工具，有仪仗随行。"
        },
        {
          name: "商人阶层",
          description: "商人出行注重效率和实用性，多使用马车、船只等交通工具，出行频繁。"
        },
        {
          name: "文人阶层",
          description: "文人出行注重雅致，多选择步行或简单的交通工具，追求自然与人文的和谐。"
        },
        {
          name: "平民阶层",
          description: "平民出行以步行为主，长途出行多选择公共交通工具，出行成本较低。"
        }
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.regionFeatures, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.description),
        c: index
      };
    }),
    c: common_vendor.f($data.classFeatures, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.description),
        c: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4a879bc9"]]);
wx.createPage(MiniProgramPage);
