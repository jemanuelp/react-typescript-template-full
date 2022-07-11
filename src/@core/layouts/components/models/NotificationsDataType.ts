import {ReactElement} from 'react';
import {ColorTypes} from '../../../../views/ui-elements/cards/models/ColorTypes';

export type NotificationsDataType = {
  img?: string;
  subtitle?: string;
  title: ReactElement;
  avatarContent?: string;
  color?: ColorTypes;
  switch?: ReactElement;
  avatarIcon?: ReactElement;
}