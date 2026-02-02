"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      courses: [
        {
          id: 1,
          title: "宋代服饰形制详解",
          subtitle: "了解宋代服饰的基本形制与特点",
          image: "/static/cloth_index1.jpg",
          duration: "15分钟",
          level: "初级"
        },
        {
          id: 2,
          title: "褙子的制作工艺",
          subtitle: "学习褙子的裁剪与缝制技巧",
          image: "/static/cloth_index2.jpg",
          duration: "20分钟",
          level: "中级"
        },
        {
          id: 3,
          title: "宋代服饰色彩搭配",
          subtitle: "掌握宋代服饰的色彩美学",
          image: "/static/cloth_index3.jpg",
          duration: "12分钟",
          level: "初级"
        },
        {
          id: 4,
          title: "官服与民服的区别",
          subtitle: "深入了解宋代社会等级与服饰",
          image: "/static/apparel2.png",
          duration: "18分钟",
          level: "中级"
        },
        {
          id: 5,
          title: "宋代配饰文化",
          subtitle: "探索宋代配饰的精致工艺",
          image: "/static/pibo.png",
          duration: "10分钟",
          level: "初级"
        }
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    goToCourseDetail(course) {
      common_vendor.index.navigateTo({
        url: `/pages/clothes/course/detail?id=${course.id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.courses, (course, index, i0) => {
      return {
        a: course.image,
        b: common_vendor.t(course.title),
        c: common_vendor.t(course.subtitle),
        d: common_vendor.t(course.duration),
        e: common_vendor.t(course.level),
        f: index,
        g: common_vendor.o(($event) => $options.goToCourseDetail(course), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-241e5650"]]);
wx.createPage(MiniProgramPage);
