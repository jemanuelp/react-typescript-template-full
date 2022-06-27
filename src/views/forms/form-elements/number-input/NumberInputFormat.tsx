import InputNumber from 'rc-input-number';
import { Plus, Minus } from 'react-feather';
import { Card, CardHeader, CardTitle, CardBody, Label } from 'reactstrap';

const NumberInputFormat = () => {
  const numberWithCommas = (x: number | undefined) => {
    if (x === undefined) {
      return '';
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const format = (num: number | undefined) => {
    return `$ ${numberWithCommas(num)}`;
  };

  const parser = (num: any) => {
    const cells = num.toString().split(' ');
    if (!cells[1]) {
      return num;
    }

    const parsed = cells[1].replace(/,*/g, '');

    return parsed;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Formatting</CardTitle>
      </CardHeader>
      <CardBody>
        <div>
          <Label className='form-label' for='formatting-number-input'>
            Formatting Input
          </Label>
          <InputNumber
            parser={parser}
            defaultValue={5}
            formatter={format}
            upHandler={<Plus />}
            downHandler={<Minus />}
            id='formatting-number-input'
          />
        </div>
      </CardBody>
    </Card>
  );
};
export default NumberInputFormat;
