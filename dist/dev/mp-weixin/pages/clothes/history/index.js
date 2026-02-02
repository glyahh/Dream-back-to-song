"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      historyPeriods: [
        {
          title: "北宋初期",
          time: "960-1022年",
          image: "/static/cloth_index1.jpg",
          description: "北宋初期，服饰制度承袭唐代，但逐渐形成自己的特色。官服制度更加规范，民间服饰开始出现新的变化。",
          features: ["承袭唐制", "制度规范", "民间创新"]
        },
        {
          title: "北宋中期",
          time: "1023-1063年",
          image: "/static/cloth_index2.jpg",
          description: "北宋中期，服饰文化达到高峰。褙子、对襟衫等新式服装流行，色彩更加丰富，纹样更加精美。",
          features: ["褙子流行", "色彩丰富", "纹样精美"]
        },
        {
          title: "北宋后期",
          time: "1064-1127年",
          image: "/static/cloth_index3.jpg",
          description: "北宋后期，服饰风格更加精致典雅。文人雅士的服饰风格影响深远，形成了独特的宋代美学。",
          features: ["精致典雅", "文人风格", "美学形成"]
        },
        {
          title: "南宋时期",
          time: "1127-1279年",
          image: "/static/apparel2.png",
          description: "南宋时期，服饰在继承北宋传统的基础上，更加注重实用性和美观性的结合，形成了南宋独特的服饰文化。",
          features: ["继承传统", "实用美观", "文化独特"]
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
    b: common_vendor.f($data.historyPeriods, (period, index, i0) => {
      return common_vendor.e({
        a: index < $data.historyPeriods.length - 1
      }, index < $data.historyPeriods.length - 1 ? {} : {}, {
        b: common_vendor.t(period.title),
        c: common_vendor.t(period.time),
        d: period.image
      }, period.image ? {
        e: period.image
      } : {}, {
        f: common_vendor.t(period.description),
        g: common_vendor.f(period.features, (feature, fIndex, i1) => {
          return {
            a: common_vendor.t(feature),
            b: fIndex
          };
        }),
        h: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-92e6b802"]]);
wx.createPage(MiniProgramPage);
