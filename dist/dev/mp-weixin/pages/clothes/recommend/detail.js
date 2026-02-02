"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      detailId: null,
      detailInfo: {
        name: "褙子",
        dynasty: "宋代女装",
        image: "/static/cloth_index3.jpg",
        description: "褙子是宋代女性最流行的外衣，直领对襟，两侧开衩，长度过膝，是宋代服饰文化的典型代表。",
        features: "褙子采用直领对襟设计，两侧开衩至腋下，方便活动。衣身修长，过膝长度，袖口宽窄适中。整体造型简洁优雅，体现了宋代女性服饰的精致美学。",
        history: "褙子起源于北宋，最初为内穿服饰，后逐渐演变为外衣。在南宋时期达到流行高峰，成为宋代女性标志性服饰。其设计体现了宋代社会对女性美的独特理解，既实用又美观。",
        occasion: "褙子适合日常穿着，也可作为正式场合的外衣。常与抹胸、长裙搭配，形成完整的宋代女性服饰体系。在不同季节可选用不同材质，体现了宋代服饰的实用性。"
      },
      relatedItems: [
        { id: 2, name: "圆领袍", image: "/static/cloth_index2.jpg" },
        { id: 3, name: "百褶裙", image: "/static/apparel2.png" },
        { id: 4, name: "对襟衫", image: "/static/apparel5.jpg" }
      ]
    };
  },
  onLoad(options) {
    if (options.id) {
      this.detailId = parseInt(options.id);
      this.loadDetailInfo(this.detailId);
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    loadDetailInfo(id) {
      const details = {
        1: {
          name: "褙子",
          dynasty: "宋代女装",
          image: "/static/cloth_index3.jpg",
          description: "褙子是宋代女性最流行的外衣，直领对襟，两侧开衩，长度过膝，是宋代服饰文化的典型代表。",
          features: "褙子采用直领对襟设计，两侧开衩至腋下，方便活动。衣身修长，过膝长度，袖口宽窄适中。整体造型简洁优雅，体现了宋代女性服饰的精致美学。",
          history: "褙子起源于北宋，最初为内穿服饰，后逐渐演变为外衣。在南宋时期达到流行高峰，成为宋代女性标志性服饰。其设计体现了宋代社会对女性美的独特理解，既实用又美观。",
          occasion: "褙子适合日常穿着，也可作为正式场合的外衣。常与抹胸、长裙搭配，形成完整的宋代女性服饰体系。在不同季节可选用不同材质，体现了宋代服饰的实用性。"
        },
        2: {
          name: "圆领袍",
          dynasty: "宋代官服",
          image: "/static/cloth_index2.jpg",
          description: "圆领袍是宋代官员的常服，圆领窄袖，体现官阶等级，是宋代官服制度的典型代表。",
          features: "圆领袍采用圆领设计，领口紧贴颈部。袖口窄小，便于活动。衣身长度及膝，下摆宽大。整体造型庄重威严，体现了宋代官服的等级制度。",
          history: "圆领袍承袭唐代官服制度，在宋代得到进一步发展。不同品级的官员穿着不同颜色的圆领袍，体现了严格的等级制度。是宋代官场文化的重要体现。",
          occasion: "圆领袍主要用于官员日常办公和正式场合。不同场合可搭配不同的配饰，如腰带、官帽等，形成完整的官服体系。"
        }
      };
      if (details[id]) {
        this.detailInfo = details[id];
      }
    },
    goToRelated(id) {
      common_vendor.index.redirectTo({
        url: `/pages/clothes/recommend/detail?id=${id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $data.detailInfo.image,
    c: common_vendor.t($data.detailInfo.name),
    d: common_vendor.t($data.detailInfo.dynasty),
    e: common_vendor.t($data.detailInfo.description),
    f: common_vendor.t($data.detailInfo.features),
    g: common_vendor.t($data.detailInfo.history),
    h: common_vendor.t($data.detailInfo.occasion),
    i: common_vendor.f($data.relatedItems, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $options.goToRelated(item.id), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-06d08ff0"]]);
wx.createPage(MiniProgramPage);
