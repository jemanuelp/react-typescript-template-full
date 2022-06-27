import { useEffect, useState, createContext } from 'react';
import {IColors} from '../../domains/interfaces/layouts/IColors';
const ThemeColors = createContext<{ colors: IColors }>({} as { colors: IColors });

const ThemeContext = ({ children }: any) => {
  const [colors, setColors] = useState<IColors>({} as IColors);

  useEffect(() => {
    if (window !== undefined) {
      //** Get variable value
      const getHex = (color: any) => {
        return window.getComputedStyle(document.body).getPropertyValue(color).trim();
      };

      //** Colors obj
      const obj: IColors = {
        primary: {
          light: getHex('--bs-primary').concat('1a'),
          main: getHex('--bs-primary'),
        },
        secondary: {
          light: getHex('--bs-secondary').concat('1a'),
          main: getHex('--bs-secondary'),
        },
        success: {
          light: getHex('--bs-success').concat('1a'),
          main: getHex('--bs-success'),
        },
        danger: {
          light: getHex('--bs-danger').concat('1a'),
          main: getHex('--bs-danger'),
        },
        warning: {
          light: getHex('--bs-warning').concat('1a'),
          main: getHex('--bs-warning'),
        },
        info: {
          light: getHex('--bs-info').concat('1a'),
          main: getHex('--bs-info'),
        },
        dark: {
          light: getHex('--bs-dark').concat('1a'),
          main: getHex('--bs-dark'),
        },
      };

      setColors({ ...obj });
    }
  }, []);

  return <ThemeColors.Provider value={{ colors }}>{children}</ThemeColors.Provider>;
};

export { ThemeColors, ThemeContext };
