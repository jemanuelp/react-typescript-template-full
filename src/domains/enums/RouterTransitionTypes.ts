export const routerTransitionTypes = {
  Default: 'fadeIn',
  fadeIn: 'fadeIn',
  fadeInLeft: 'fadeInLeft',
  zoomIn: 'zoomIn',
  none: 'none',
};

export type RouterTransitionTypes = keyof typeof routerTransitionTypes;