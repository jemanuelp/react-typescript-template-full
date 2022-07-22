export const labelColors = {
  App: 'info',
  UX: 'success',
  Images: 'warning',
  Forms: 'success',
  'Code Review': 'danger',
  'Charts & Maps': 'primary',
};

export type LabelColors = keyof typeof labelColors;
export type LabelColorClass = typeof labelColors;