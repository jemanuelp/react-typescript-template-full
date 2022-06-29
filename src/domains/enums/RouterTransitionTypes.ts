export const RouterTransitionTypes = {
  Default: 'fadeIn',
  fadeIn: 'fadeIn',
  fadeInLeft: 'fadeInLeft',
  zoomIn: 'zoomIn',
  none: 'none',
};

export type TypeRouterTransitionTypes = keyof typeof RouterTransitionTypes;