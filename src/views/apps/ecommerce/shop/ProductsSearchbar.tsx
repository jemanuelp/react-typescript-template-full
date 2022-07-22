import { Search } from 'react-feather';
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap';
import {getProducts} from '../store';
import {InitialStateType} from '../models/InitialStateType';

export type ProductsSearchbarProps = {
  dispatch: any;
  getProducts: getProducts;
  store: InitialStateType;
}

const ProductsSearchbar = (props: ProductsSearchbarProps) => {
  const { dispatch, getProducts, store } = props;

  return (
    <div id='ecommerce-searchbar' className='ecommerce-searchbar'>
      <Row className='mt-1'>
        <Col sm='12'>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='Search Product'
              onChange={e => dispatch(
                getProducts({ ...store.params, q: e.target.value }),
              )}
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsSearchbar;
