"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      gender: "female",
      // 'female' 或 'male'
      activeCategory: "top",
      // 'top', 'bottom', 'outerwear', 'style', 'color', 'fabric', 'pattern'
      currentStyle: null,
      currentColor: null,
      currentFabric: null,
      currentPattern: null,
      currentOutfit: {
        top: null,
        bottom: null,
        outerwear: null,
        accessories: null
      },
      // 模特图片
      modelImage: "/static/clothes/model/female_base.jpg",
      // 分类
      categories: [
        { id: "top", name: "上衣" },
        { id: "bottom", name: "下装" },
        { id: "outerwear", name: "外衣" },
        { id: "style", name: "形制" },
        { id: "color", name: "颜色" },
        { id: "fabric", name: "布料" },
        { id: "pattern", name: "花纹" }
      ],
      // 形制数据
      styles: {
        female: [
          { id: 1, name: "直领对襟褙子", icon: "/static/clothes/icons/style1.png" },
          { id: 2, name: "交领襦裙", icon: "/static/clothes/icons/style2.png" },
          { id: 3, name: "大袖衫", icon: "/static/clothes/icons/style3.png" },
          { id: 4, name: "半袖襦", icon: "/static/clothes/icons/style4.png" },
          { id: 5, name: "抹胸+褙子", icon: "/static/clothes/icons/style5.png" }
        ],
        male: [
          { id: 6, name: "直裰", icon: "/static/clothes/icons/style6.png" },
          { id: 7, name: "道袍", icon: "/static/clothes/icons/style7.png" },
          { id: 8, name: "圆领袍", icon: "/static/clothes/icons/style8.png" }
        ]
      },
      // 颜色数据
      colors: [
        { id: 1, name: "豆绿", value: "#9bbf7f" },
        { id: 2, name: "姜黄", value: "#ffc773" },
        { id: 3, name: "藕荷粉", value: "#e4c2c1" },
        { id: 4, name: "水蓝", value: "#87ceeb" },
        { id: 5, name: "黛青", value: "#4a5b6d" },
        { id: 6, name: "月白", value: "#e3f0ff" },
        { id: 7, name: "朱红", value: "#d03c3c" },
        { id: 8, name: "玄色", value: "#1a1a1a" }
      ],
      // 布料数据
      fabrics: [
        { id: 1, name: "丝绸", preview: "/static/clothes/fabrics/silk.jpg" },
        { id: 2, name: "棉布", preview: "/static/clothes/fabrics/cotton.jpg" },
        { id: 3, name: "麻布", preview: "/static/clothes/fabrics/linen.jpg" },
        { id: 4, name: "锦缎", preview: "/static/clothes/fabrics/brocade.jpg" },
        { id: 5, name: "纱罗", preview: "/static/clothes/fabrics/gauze.jpg" }
      ],
      // 花纹数据
      patterns: [
        { id: 1, name: "缠枝花卉纹", preview: "/static/clothes/patterns/floral.png" },
        { id: 2, name: "四合如意纹", preview: "/static/clothes/patterns/ruyi.png" },
        { id: 3, name: "芙蓉花纹", preview: "/static/clothes/patterns/hibiscus.png" },
        { id: 4, name: "云纹", preview: "/static/clothes/patterns/cloud.png" },
        { id: 5, name: "龙凤纹", preview: "/static/clothes/patterns/dragon.png" },
        { id: 6, name: "几何纹", preview: "/static/clothes/patterns/geometric.png" }
      ],
      // 服装数据库
      clothingDatabase: {
        female: {
          top: [
            { id: 1, name: "褙子", thumbnail: "/static/clothes/tops/褙子.png", image: "/static/clothes/tops/full/抹胸.png", compatibleStyles: [1, 2, 5] },
            { id: 2, name: "大袖衫", thumbnail: "/static/clothes/tops/大袖衫.png", image: "/static/clothes/tops/full/半臂.png", compatibleStyles: [2, 4] },
            { id: 3, name: "半袖", thumbnail: "/static/clothes/tops/半袖.png", image: "/static/clothes/tops/full/襦.png", compatibleStyles: [2] }
          ],
          bottom: [
            { id: 4, name: "百褶裙", thumbnail: "/static/clothes/bottoms/百褶裙.png", image: "/static/clothes/bottoms/full/百褶裙.png", compatibleStyles: [1, 2] },
            { id: 5, name: "马面裙", thumbnail: "/static/clothes/bottoms/马面裙.png", image: "/static/clothes/bottoms/full/马面裙.png", compatibleStyles: [1, 2, 5] },
            { id: 6, name: "裤子", thumbnail: "/static/clothes/bottoms/裤子.png", image: "/static/clothes/bottoms/full/裤子.png", compatibleStyles: [3] }
          ],
          outerwear: [
            { id: 7, name: "直领褙子", thumbnail: "/static/clothes/outerwear/直领褙子.png", image: "/static/clothes/outerwear/full/直领褙子.png", compatibleStyles: [1, 5] },
            { id: 8, name: "大袖衫", thumbnail: "/static/clothes/outerwear/大袖衫.png", image: "/static/clothes/outerwear/full/大袖衫.png", compatibleStyles: [3] },
            { id: 9, name: "半袖襦", thumbnail: "/static/clothes/outerwear/半袖襦.png", image: "/static/clothes/outerwear/full/半袖襦.png", compatibleStyles: [4] }
          ]
        },
        male: {
          top: [
            { id: 10, name: "中衣", thumbnail: "/static/clothes/male/tops/中衣.png", image: "/static/clothes/male/tops/full/中衣.png", compatibleStyles: [6, 7, 8] }
          ],
          bottom: [
            { id: 11, name: "裤子", thumbnail: "/static/clothes/male/bottoms/裤子.png", image: "/static/clothes/male/bottoms/full/裤子.png", compatibleStyles: [6, 7, 8] }
          ],
          outerwear: [
            { id: 12, name: "直裰", thumbnail: "/static/clothes/male/outerwear/直裰.png", image: "/static/clothes/male/outerwear/full/直裰.png", compatibleStyles: [6] },
            { id: 13, name: "道袍", thumbnail: "/static/clothes/male/outerwear/道袍.png", image: "/static/clothes/male/outerwear/full/道袍.png", compatibleStyles: [7] },
            { id: 14, name: "圆领袍", thumbnail: "/static/clothes/male/outerwear/圆领袍.png", image: "/static/clothes/male/outerwear/full/圆领袍.png", compatibleStyles: [8] }
          ]
        }
      }
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack();
    },
    // 切换性别
    changeGender(newGender) {
      this.gender = newGender;
      this.modelImage = `/static/clothes/model/${newGender}_base.png`;
      this.resetOutfit();
    },
    // 获取当前分类的服装项
    getCurrentClothingItems() {
      if (this.activeCategory === "top" || this.activeCategory === "bottom" || this.activeCategory === "outerwear") {
        const items = this.clothingDatabase[this.gender][this.activeCategory];
        if (this.currentStyle) {
          return items.filter(
            (item) => item.compatibleStyles.includes(this.currentStyle.id)
          );
        }
        return items;
      }
      return [];
    },
    // 检查是否选中
    isItemSelected(item) {
      var _a;
      return ((_a = this.currentOutfit[this.activeCategory]) == null ? void 0 : _a.id) === item.id;
    },
    // 选择服装项
    selectClothingItem(item) {
      this.currentOutfit[this.activeCategory] = item;
      this.applyVisualEffects();
    },
    // 选择形制
    selectStyle(style) {
      this.currentStyle = style;
      Object.keys(this.currentOutfit).forEach((category) => {
        if (this.currentOutfit[category] && !this.currentOutfit[category].compatibleStyles.includes(style.id)) {
          this.currentOutfit[category] = null;
        }
      });
    },
    // 选择颜色
    selectColor(color) {
      this.currentColor = color;
      this.applyVisualEffects();
    },
    // 选择布料
    selectFabric(fabric) {
      this.currentFabric = fabric;
      this.applyVisualEffects();
    },
    // 选择花纹
    selectPattern(pattern) {
      this.currentPattern = pattern;
      this.applyVisualEffects();
    },
    // 应用视觉效果（颜色、布料、花纹）
    applyVisualEffects() {
      console.log("应用视觉效果:", {
        color: this.currentColor,
        fabric: this.currentFabric,
        pattern: this.currentPattern
      });
    },
    // 重置搭配
    resetOutfit() {
      this.currentOutfit = {
        top: null,
        bottom: null,
        outerwear: null,
        accessories: null
      };
      this.currentStyle = null;
      this.currentColor = null;
      this.currentFabric = null;
      this.currentPattern = null;
    },
    // 保存搭配
    saveOutfit() {
      if (!this.currentOutfit.top && !this.currentOutfit.bottom) {
        common_vendor.index.showToast({
          title: "请至少选择一件服装",
          icon: "none"
        });
        return;
      }
      const outfitData = {
        gender: this.gender,
        style: this.currentStyle,
        color: this.currentColor,
        fabric: this.currentFabric,
        pattern: this.currentPattern,
        outfit: this.currentOutfit,
        timestamp: Date.now()
      };
      let savedOutfits = common_vendor.index.getStorageSync("savedOutfits") || [];
      savedOutfits.unshift(outfitData);
      common_vendor.index.setStorageSync("savedOutfits", savedOutfits);
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $data.gender === "female" ? 1 : "",
    c: common_vendor.o(($event) => $options.changeGender("female")),
    d: $data.gender === "male" ? 1 : "",
    e: common_vendor.o(($event) => $options.changeGender("male")),
    f: $data.modelImage,
    g: $data.currentOutfit.top
  }, $data.currentOutfit.top ? {
    h: $data.currentOutfit.top.image
  } : {}, {
    i: $data.currentOutfit.bottom
  }, $data.currentOutfit.bottom ? {
    j: $data.currentOutfit.bottom.image
  } : {}, {
    k: $data.currentOutfit.outerwear
  }, $data.currentOutfit.outerwear ? {
    l: $data.currentOutfit.outerwear.image
  } : {}, {
    m: common_vendor.f($data.categories, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.name),
        b: category.id,
        c: $data.activeCategory === category.id ? 1 : "",
        d: common_vendor.o(($event) => $data.activeCategory = category.id, category.id)
      };
    }),
    n: $data.activeCategory === "style"
  }, $data.activeCategory === "style" ? {
    o: common_vendor.f($data.styles[$data.gender], (style, k0, i0) => {
      return {
        a: style.icon,
        b: common_vendor.t(style.name),
        c: style.id,
        d: common_vendor.o(($event) => $options.selectStyle(style), style.id)
      };
    })
  } : $data.activeCategory === "color" ? {
    q: common_vendor.f($data.colors, (color, k0, i0) => {
      return {
        a: color.value,
        b: common_vendor.t(color.name),
        c: color.id,
        d: common_vendor.o(($event) => $options.selectColor(color), color.id)
      };
    })
  } : $data.activeCategory === "fabric" ? {
    s: common_vendor.f($data.fabrics, (fabric, k0, i0) => {
      return {
        a: fabric.preview,
        b: common_vendor.t(fabric.name),
        c: fabric.id,
        d: common_vendor.o(($event) => $options.selectFabric(fabric), fabric.id)
      };
    })
  } : $data.activeCategory === "pattern" ? {
    v: common_vendor.f($data.patterns, (pattern, k0, i0) => {
      return {
        a: pattern.preview,
        b: common_vendor.t(pattern.name),
        c: pattern.id,
        d: common_vendor.o(($event) => $options.selectPattern(pattern), pattern.id)
      };
    })
  } : {
    w: common_vendor.f($options.getCurrentClothingItems(), (item, k0, i0) => {
      return {
        a: item.thumbnail,
        b: common_vendor.t(item.name),
        c: item.id,
        d: $options.isItemSelected(item) ? 1 : "",
        e: common_vendor.o(($event) => $options.selectClothingItem(item), item.id)
      };
    })
  }, {
    p: $data.activeCategory === "color",
    r: $data.activeCategory === "fabric",
    t: $data.activeCategory === "pattern",
    x: $data.currentStyle
  }, $data.currentStyle ? {
    y: common_vendor.t($data.currentStyle.name)
  } : {}, {
    z: $data.currentColor
  }, $data.currentColor ? {
    A: $data.currentColor.value,
    B: common_vendor.t($data.currentColor.name)
  } : {}, {
    C: common_vendor.o((...args) => $options.resetOutfit && $options.resetOutfit(...args)),
    D: common_vendor.o((...args) => $options.saveOutfit && $options.saveOutfit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ce4e730e"]]);
wx.createPage(MiniProgramPage);
