import {OptionsOrGroups} from 'react-select/dist/declarations/src/types';
import {SelectedOptionLabelColors} from '../../../../domains/interfaces/SelectedOptionLabelColors';

export const labelOptions: OptionsOrGroups<SelectedOptionLabelColors, any> = [
  { value: 'UX', label: 'UX' },
  { value: 'App', label: 'App' },
  { value: 'Forms', label: 'Forms' },
  { value: 'Images', label: 'Images' },
  { value: 'Code Review', label: 'Code Review' },
  { value: 'Charts & Maps', label: 'Charts & Maps' },
];

export type LabelOptions = typeof labelOptions[number];