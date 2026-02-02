"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      wikiItems: [
        {
          title: "宋代交通网络",
          content: "宋代建立了完善的交通网络，包括陆路和水路两大系统。陆路以官道为主，连接各大城市；水路以运河和自然河流为主，形成了发达的交通体系。"
        },
        {
          title: "出行礼仪",
          content: "宋代出行有严格的礼仪规范，不同身份的人使用不同的交通工具。官员出行有仪仗，平民出行相对简单，体现了严格的等级制度。"
        },
        {
          title: "交通管理",
          content: "宋代对交通进行了一定的管理，设置了驿站、关卡等设施。城市内也有一定的交通规则，保证了出行的安全和秩序。"
        },
        {
          title: "出行费用",
          content: "宋代出行费用因距离和交通工具而异。短途步行免费，长途需要支付车马费或船费。不同阶层的人出行成本差异较大。"
        },
        {
          title: "出行安全",
          content: "宋代出行存在一定的安全风险，特别是长途出行。因此，人们通常会结伴而行，或者雇佣保镖，确保出行安全。"
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
    b: common_vendor.f($data.wikiItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.content),
        c: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6ffde8e0"]]);
wx.createPage(MiniProgramPage);
