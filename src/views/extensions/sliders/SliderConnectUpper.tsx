import Nouislider from 'nouislider-react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import {SliderProptypes} from '../interfaces/SliderProptypes';

const SliderConnectUpper = ({ direction }: SliderProptypes) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Connect to upper</CardTitle>
      </CardHeader>
      <CardBody className='text-center'>
        <Nouislider
          start={30}
          // connect='upper'
          direction={direction}
          orientation='vertical'
          range={{
            min: 0,
            max: 100,
          }}
          style={{
            height: '200px',
          }}
        />
      </CardBody>
    </Card>
  );
};

export default SliderConnectUpper;
