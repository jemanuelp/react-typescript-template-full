import {ChangeEvent, FormEvent, useState} from 'react';
import { selectThemeColors } from '../../../../utility/Utils';
import Select from 'react-select';
import classnames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { Button, Label, FormText, Form, Input } from 'reactstrap';
import { addUser } from '../store';
import { useDispatch } from 'react-redux';
import {IUser} from '../../../../domains/interfaces/IUser';
import {CountryOptionsSidebar} from '../../../../domains/const/options/CountryOptions';
import Sidebar from '../../../../../src/@core/components/sidebar';
import {SizeTypes} from '../../../../domains/enums/SizeTypes';

const defaultValues: Partial<IUser> = {
  email: '',
  contact: '',
  company: '',
  fullName: '',
  username: '',
  country: null,
};

const checkIsValid = (data: Partial<IUser>) => {
  return Object.values(data).every((field: any) => (typeof field === 'object'
    ? field !== null
    : field.length > 0));
};

const SidebarNewUsers = ({ open, toggleSidebar }: any) => {
  const [data, setData] = useState<Partial<IUser> | null>(null);
  const [plan, setPlan] = useState('basic');
  const [role, setRole] = useState('subscriber');
  
  const dispatch = useDispatch<any>();
  
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ** Function to handle form submit
  const onSubmit = (data: any) => {
    setData(data);
    if (checkIsValid(data)) {
      toggleSidebar();
      dispatch(
        addUser({
          role,
          avatar: '',
          status: 'active',
          email: data.email,
          currentPlan: plan,
          billing: 'auto debit',
          company: data.company,
          contact: data.contact,
          fullName: data.fullName,
          username: data.username,
          country: data.country.value,
        }),
      );
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError('country', {
            type: 'manual',
          });
        }
        if (data[key] !== null && data[key].length === 0) {
          const validKey = key as keyof typeof defaultValues;
          setError(validKey, {
            type: 'manual',
          });
        }
      }
    }
  };

  const handleSidebarClosed = (): void => {
    for (const key in defaultValues) {
      const validKey = key as keyof typeof defaultValues;
      setValue(validKey, defaultValues[validKey as keyof typeof defaultValues]);
    }
    setRole('subscriber');
    setPlan('basic');
  };

  return (
    <Sidebar
      size={SizeTypes.Lg}
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='fullName'>
            Full Name <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='fullName'
            control={control}
            render={({ field }) => (
              <Input id='fullName' placeholder='John Doe' invalid={errors.fullName && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='username'>
            Username <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <Input id='username' placeholder='johnDoe99' invalid={errors.username && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='userEmail'>
            Email <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                type='email'
                id='userEmail'
                placeholder='john.doe@example.com'
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          <FormText color='muted'>You can use letters, numbers & periods</FormText>
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='contact'>
            Contact <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='contact'
            control={control}
            render={(
              // { field }
            ) => (
              <Input
                placeholder='(397) 294-5153'
                invalid={errors.contact && true}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='company'>
            Company <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='company'
            control={control}
            render={({ field }) => (
              <Input id='company' placeholder='Company Pvt Ltd' invalid={errors.company && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='country'>
            Country <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='country'
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={CountryOptionsSidebar}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.country === null })}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='user-role'>
            User Role
          </Label>
          <Input type='select' id='user-role' name='user-role' value={role} onChange={e => setRole(e.target.value)}>
            <option value='subscriber'>Subscriber</option>
            <option value='editor'>Editor</option>
            <option value='maintainer'>Maintainer</option>
            <option value='author'>Author</option>
            <option value='admin'>Admin</option>
          </Input>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='select-plan'>
            Select Plan
          </Label>
          <Input type='select' id='select-plan' name='select-plan'
            value={plan}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => {
                if (e.target) {
                  setPlan(e.target.value);
                }
              }}>
            <option value='basic'>Basic</option>
            <option value='enterprise'>Enterprise</option>
            <option value='company'>Company</option>
            <option value='team'>Team</option>
          </Input>
        </div>
        <Button type='submit' className='me-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
