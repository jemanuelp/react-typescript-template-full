import {Placement} from '@popperjs/core';
import {ComponentClass} from 'react';

export type CardBrowserType = {
  title?: string;
  placement?: Placement;
  img?: string;
  imgHeight?: number;
  imgWidth?: number;
  tag?: ComponentClass<any> | string | 'div';
  meta?: string;
  className?: string;
}