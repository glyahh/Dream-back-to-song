const making = '/pages/food/making/'

export const legacyFoodFlows = [
  { key: 'dongporou', detail: '/pages/food/detail/dongporou',
    steps: ['making', 'step2', 'step3', 'step4', 'step5', 'step6'].map((name) => making + name), complete: making + 'complete' },
  ...[
    ['sucaidoufu', 3], ['tangmian', 2], ['guihuagao', 3], ['cha', 2],
  ].map(([key, count]) => ({ key, detail: `/pages/food/detail/${key}`,
    steps: Array.from({ length: count }, (_, index) => `${making}${key}_${index === 0 ? 'making' : `step${index + 1}`}`),
    complete: `${making}${key}_complete`,
  })),
]
