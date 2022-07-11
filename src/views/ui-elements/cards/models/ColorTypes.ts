export const colorTypes = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  danger: 'danger',
  info: 'info',
  warning: 'warning',
  dark: 'dark',
  'light-primary': 'light-primary',
  'light-secondary': 'light-secondary',
  'light-success': 'light-success',
  'light-danger': 'light-danger',
  'light-info': 'light-info',
  'light-warning': 'light-warning',
  'light-dark': 'light-dark',
};

export const colorTypesWithoutLight = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  danger: 'danger',
  info: 'info',
  warning: 'warning',
  dark: 'dark',
};

export type ColorTypes = keyof typeof colorTypes;
export type ColorTypesWithoutLight = keyof typeof colorTypesWithoutLight;