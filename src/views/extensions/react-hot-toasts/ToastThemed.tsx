import { useContext } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import toast from 'react-hot-toast';
import { Feather } from 'react-feather';
import { ThemeColors } from '../../../utility/context/ThemeColors';

const ToastThemed = () => {
  const { colors } = useContext(ThemeColors);

  const handleClick = () => {
    return toast.success('Look at me, I have brand styles.', {
      style: {
        padding: '16px',
        color: colors.primary.main,
        border: `1px solid ${colors.primary.main}`,
      },
      iconTheme: {
        primary: colors.primary.main,
        secondary: colors.secondary.main,
      },
    });
  };

  return (
    <Card>
      <CardBody>
        <div className='d-flex text-center align-items-center flex-column'>
          <Feather size='32' className='mb-1' />
          <h5 className='mb-1 fw-bolder'>Themed</h5>
          <p className='mb-50'>Customize the default styles the way you want.</p>
          <Button color='primary' onClick={handleClick}>
            Emoji
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ToastThemed;