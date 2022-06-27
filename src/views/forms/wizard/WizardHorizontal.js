import { useRef, useState } from 'react';

import Wizard from 'src/@core/components/wizard';

// ** Steps
import Address from './steps-with-validation/Address';
import SocialLinks from './steps-with-validation/SocialLinks';
import PersonalInfo from './steps-with-validation/PersonalInfo';
import AccountDetails from './steps-with-validation/AccountDetails';

const WizardHorizontal = () => {
  const ref = useRef(null);

  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: 'account-details',
      title: 'Account Details',
      subtitle: 'Enter Your Account Details.',
      content: <AccountDetails stepper={stepper} />
    },
    {
      id: 'personal-info',
      title: 'Personal Info',
      subtitle: 'Add Personal Info',
      content: <PersonalInfo stepper={stepper} />
    },
    {
      id: 'step-address',
      title: 'Address',
      subtitle: 'Add Address',
      content: <Address stepper={stepper} />
    },
    {
      id: 'social-links',
      title: 'Social Links',
      subtitle: 'Add Social Links',
      content: <SocialLinks stepper={stepper} />
    }
  ];

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default WizardHorizontal;
