import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Label } from 'reactstrap';

import axios from 'axios';
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import {
  File,
  Image,
  Figma,
  Globe,
  Slack,
  Chrome,
  GitHub,
  Gitlab,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  Dribbble,
  FileText,
  Instagram,
} from 'react-feather';
import {IColorOptions} from '../interfaces/IColorOptions';
import {OnChangeValue} from 'react-select/dist/declarations/src/types';
import {selectThemeColors} from '../../../../utility/Utils';

const colorOptions: IColorOptions[] = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isFixed: true },
  { value: 'purple', label: 'Purple', color: '#5243AA', isFixed: true },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: false },
  { value: 'orange', label: 'Orange', color: '#FF8B00', isFixed: false },
  { value: 'yellow', label: 'Yellow', color: '#FFC400', isFixed: false },
];

const iconOptions = [
  {
    label: 'Social Media',
    options: [
      {
        value: 'facebook',
        label: 'Facebook',
        icon: Facebook,
      },
      {
        value: 'twitter',
        label: 'Twitter',
        icon: Twitter,
      },
      {
        value: 'linkedin',
        label: 'Linkedin',
        icon: Linkedin,
      },
      {
        value: 'github',
        label: 'Github',
        icon: GitHub,
      },
      {
        value: 'instagram',
        label: 'Instagram',
        icon: Instagram,
      },
      {
        value: 'dribbble',
        label: 'Dribbble',
        icon: Dribbble,
      },
      {
        value: 'gitlab',
        label: 'Gitlab',
        icon: Gitlab,
      },
    ],
  },
  {
    label: 'File Types',
    options: [
      { value: 'pdf', label: 'PDF', icon: File },
      { value: 'txt', label: 'txt', icon: FileText },
      { value: 'image', label: 'Image', icon: Image },
    ],
  },
  {
    label: 'Others',
    options: [
      { value: 'figma', label: 'Figma', icon: Figma },
      { value: 'chrome', label: 'Chrome', icon: Chrome },
      { value: 'safari', label: 'Safari', icon: Globe },
      { value: 'slack', label: 'Slack', icon: Slack },
      { value: 'youtube', label: 'Youtube', icon: Youtube },
    ],
  },
];

const OptionComponent = ({ data, ...props }: any) => {
  const Icon = data.icon;

  return (
    <components.Option {...props}>
      <Icon className='me-50' size={14} />
      {data.label}
    </components.Option>
  );
};

const groupedOptions = [
  {
    label: 'Ice Creams',
    options: [
      { value: 'vanilla', label: 'Vanilla' },
      { value: 'Dark Chocolate', label: 'Dark Chocolate' },
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'salted-caramel', label: 'Salted Caramel' },
    ],
  },
  {
    label: 'Snacks',
    options: [
      { value: 'Pizza', label: 'Pizza' },
      { value: 'Burger', label: 'Burger' },
      { value: 'Pasta', label: 'Pasta' },
      { value: 'Pretzel', label: 'Pretzel' },
      { value: 'Popcorn', label: 'Popcorn' },
    ],
  },
];

const animatedComponents = makeAnimated();

const styles = {
  multiValue: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, opacity: '0.5' } : base;
  },
  multiValueLabel: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, color: '#626262', paddingRight: 6 } : base;
  },
  multiValueRemove: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base;
  },
};

const orderOptions = (values: any) => {
  if (values.length > 0) return values
    .filter((v: any) => v.isFixed)
    .concat(values.filter((v: any) => !v.isFixed));
};

const formatGroupLabel = (data: any) => (
  <div className='d-flex justify-content-between align-center'>
    <strong>
      <span>{data.label}</span>
    </strong>
    <span>{data.options.length}</span>
  </div>
);

const SelectOptions = () => {
  const [params, setParams] = useState('');
  const [selectedDBVal, setSelectedDBVal] = useState(null);
  const [fixedValue, setFixedValue] = useState(
    orderOptions([colorOptions[0], colorOptions[1], colorOptions[3]]),
  );

  const filterColors1 = (inputValue: string) => {
    return colorOptions.filter(i => {
      return i.label.toLowerCase().includes(inputValue.toLowerCase());
    });
  };

  const loadOptions = (inputValue: string, callback: Function) => {
    setTimeout(() => {
      callback(filterColors1(inputValue));
    }, 2000);
  };

  const filterColors2 = (inputValue: string): IColorOptions[] => {
    return colorOptions.filter(i => {
      return i.label.toLowerCase().includes(inputValue.toLowerCase());
    });
  };

  const fixedOnChange = (value: any, { action, removedValue }: any) => {
    switch (action) {
    case 'remove-value':
    case 'pop-value':
      if (removedValue.isFixed) {
        return;
      }
      break;
    case 'clear':
      value = colorOptions.filter(v => v.isFixed);
      break;
    default:
      break;
    }

    value = orderOptions(value);
    setFixedValue(value);
  };

  const handleInputChange = (newValue: string) => {
    const val = newValue.replace(/\W/g, '');
    return val;
  };

  const handleDBInputChange = (newValue: string) => {
    setParams(newValue);
  };

  // handle selection
  const handleDBChange = (value: OnChangeValue<any, boolean>) => {
    setSelectedDBVal(value);
  };

  const promiseOptions = (inputValue: string): Promise<IColorOptions[]> => {
    return new Promise(resolve => {
      resolve(filterColors2(inputValue));
    });
  };

  const loadOptionsDB = () => {
    return axios.get('/api/select/data', { params }).then(res => {
      return res.data;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Options</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col className='mb-1' md='6' sm='12'>
            <Label className='form-label'>Multi Select</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              defaultValue={[colorOptions[2], colorOptions[3]]}
              isMulti
              name='colors'
              options={colorOptions}
              className='react-select'
              classNamePrefix='select'
            />
          </Col>
          <Col className='mb-1' md='6' sm='12'>
            <Label className='form-label'>Grouped Select</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              defaultValue={colorOptions[1]}
              options={groupedOptions}
              formatGroupLabel={formatGroupLabel}
              className='react-select'
              classNamePrefix='select'
            />
          </Col>
          <Col className='mb-1' md='6' sm='12'>
            <Label className='form-label'>Animated Select</Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={[colorOptions[4], colorOptions[5]]}
              isMulti
              options={colorOptions}
              className='react-select'
              classNamePrefix='select'
            />
          </Col>
          <Col className='mb-1' md='6' sm='12'>
            <Label className='form-label'>Fixed Options Select</Label>
            <Select
              isClearable={false}
              value={fixedValue}
              styles={styles}
              isMulti
              onChange={fixedOnChange}
              theme={selectThemeColors}
              name='colors'
              className='react-select'
              classNamePrefix='select'
              options={colorOptions}
            />
          </Col>
          <Col md={6} xs={12} className='mb-1'>
            <Label className='form-label'>Async Callback Select</Label>
            <AsyncSelect
              isClearable={false}
              className='react-select'
              classNamePrefix='select'
              name='callback-react-select'
              loadOptions={loadOptions}
              defaultOptions
              onInputChange={handleInputChange}
              theme={selectThemeColors}
            />
          </Col>
          <Col md={6} xs={12} className='mb-1'>
            <Label className='form-label'>Async Promises Select</Label>
            <AsyncSelect
              isClearable={false}
              className='react-select'
              classNamePrefix='select'
              loadOptions={promiseOptions}
              cacheOptions
              defaultOptions
            />
          </Col>
          <Col className='mb-1' md='6' sm='12'>
            <Label className='form-label'>Creatable Select</Label>
            <CreatableSelect options={colorOptions} className='react-select' classNamePrefix='select' />
          </Col>
          <Col className='mb-1' md='6' sm='12'>
            <Label className='form-label'>Icons</Label>
            <Select
              options={iconOptions}
              className='react-select'
              classNamePrefix='select'
              components={{
                Option: OptionComponent,
              }}
            />
          </Col>
          <Col className='mb-1' md='6' sm='12'>
            <Label className='form-label'>Async Select With Database</Label>
            <AsyncSelect
              defaultOptions
              isClearable={false}
              value={selectedDBVal}
              name='db-react-select'
              className='react-select'
              classNamePrefix='select'
              onChange={handleDBChange}
              theme={selectThemeColors}
              loadOptions={loadOptionsDB}
              onInputChange={handleDBInputChange}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default SelectOptions;
