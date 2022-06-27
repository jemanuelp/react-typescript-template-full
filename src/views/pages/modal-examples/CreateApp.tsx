import { Fragment, useState, useRef } from 'react';
import { Card, Modal, Button, CardBody, CardText, CardTitle, ModalBody, ModalHeader } from 'reactstrap';
import { Book, Package, Command, CreditCard, Check } from 'react-feather';
import SubmitStep from './create-app-steps/SubmitStep';
import DetailsStep from './create-app-steps/DetailsStep';
import BillingStep from './create-app-steps/BillingStep';
import DatabaseStep from './create-app-steps/DatabaseStep';
import FrameworkStep from './create-app-steps/FrameworkStep';
import '../../../@core/scss/react/pages/modal-create-app.scss';
import Wizard from '../../../@core/components/wizard';

const CreateAppExample = () => {
  const ref = useRef(null);
  const [show, setShow] = useState<boolean>(false);
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: 'details',
      title: 'Details',
      subtitle: 'Enter App Details.',
      icon: <Book className='font-medium-3' />,
      content: <DetailsStep stepper={stepper} />,
    },
    {
      id: 'frameworks',
      title: 'Frameworks',
      subtitle: 'Select Framework',
      icon: <Package className='font-medium-3' />,
      content: <FrameworkStep stepper={stepper} />,
    },
    {
      id: 'database',
      title: 'Database',
      subtitle: 'Select Database',
      icon: <Command className='font-medium-3' />,
      content: <DatabaseStep stepper={stepper} />,
    },
    {
      id: 'billing',
      title: 'Billing',
      subtitle: 'Enter billing info',
      icon: <CreditCard className='font-medium-3' />,
      content: <BillingStep stepper={stepper} />,
    },
    {
      id: 'submit',
      title: 'Submit',
      subtitle: 'Review & Submit',
      icon: <Check className='font-medium-3' />,
      content: <SubmitStep stepper={stepper} setShow={setShow} />,
    },
  ];

  return (
    <Fragment>
      <Card>
        <CardBody className='text-center'>
          <Package className='font-large-2 mb-1' />
          <CardTitle tag='h5'>Create App</CardTitle>
          <CardText>Provide application data with this form modal popup example, easy to use in any page.</CardText>
          <Button color='primary' onClick={() => setShow(true)}>
            Show
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-3'>
          <h1 className='text-center mb-1'>Create App</h1>
          <p className='text-center mb-2'>Provide application data with this form</p>
          <Wizard
            ref={ref}
            steps={steps}
            type='vertical'
            headerClassName='border-0'
            options={{ linear: false }}
            instance={(el: any) => setStepper(el)}
            contentClassName='shadow-none'
            className='bg-transparent create-app-wizard shadow-none'
          />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default CreateAppExample;
