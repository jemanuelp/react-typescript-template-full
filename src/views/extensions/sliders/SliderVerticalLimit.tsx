import Nouislider from 'nouislider-react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import {SliderProptypes} from '../interfaces/SliderProptypes';

const SliderLimit = ({ direction }: SliderProptypes) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Limit</CardTitle>
      </CardHeader>
      <CardBody className='text-center'>
        <Nouislider
          limit={40}
          connect={true}
          start={[40, 60]}
          behaviour={'drag'}
          direction={direction}
          orientation={'vertical'}
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

export default SliderLimit;