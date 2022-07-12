export const navbarLayoutTypes = {
  floating: 'floating',
  sticky: 'sticky',
  static: 'static',
  hidden: 'hidden',
};

export type NavbarLayoutTypes = keyof typeof navbarLayoutTypes;