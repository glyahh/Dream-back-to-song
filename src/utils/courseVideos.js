export const courseVideos = {
  1: {
    id: 1,
    title: '汉服基础入门讲解',
    fileName: 'song_clothing_form.mp4',
    durationLabel: '9分00秒',
    poster: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/cloth_index1.jpg',
    playUrl:
      'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/course-videos/song_clothing_form.mp4',
    sourceUrl: 'https://www.bilibili.com/video/BV19W411E7MV/',
    licenseNote: 'B站公开视频（本地下载）'
  },
  2: {
    id: 2,
    title: '汉服裙装穿搭示例',
    fileName: 'beizi_craft.mp4',
    durationLabel: '9分21秒',
    poster: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/cloth_index2.jpg',
    playUrl:
      'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/course-videos/beizi_craft.mp4',
    sourceUrl: 'https://www.bilibili.com/video/BV13b41187J1/',
    licenseNote: 'B站公开视频（本地下载）'
  },
  3: {
    id: 3,
    title: '日常国风穿搭参考',
    fileName: 'song_color_matching.mp4',
    durationLabel: '9分05秒',
    poster: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/cloth_index3.jpg',
    playUrl:
      'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/course-videos/song_color_matching.mp4',
    sourceUrl: 'https://www.bilibili.com/video/BV1mh411x7Td/',
    licenseNote: 'B站公开视频（本地下载）'
  },
  4: {
    id: 4,
    title: '传统服饰要点速览',
    fileName: 'official_vs_commoner.mp4',
    durationLabel: '8分35秒',
    poster: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/apparel2.png',
    playUrl:
      'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/course-videos/official_vs_commoner.mp4',
    sourceUrl: 'https://www.bilibili.com/video/BV1CCqBYmEjE/',
    licenseNote: 'B站公开视频（本地下载）'
  },
  5: {
    id: 5,
    title: '服饰剪辑与展示示例',
    fileName: 'song_accessory_culture.mp4',
    durationLabel: '8分42秒',
    poster: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/pibo.png',
    playUrl:
      'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/course-videos/song_accessory_culture.mp4',
    sourceUrl: 'https://www.bilibili.com/video/BV1Jf4y1r7oH/',
    licenseNote: 'B站公开视频（本地下载）'
  }
}

export function getCourseVideoById(id) {
  return courseVideos[id] || null
}
