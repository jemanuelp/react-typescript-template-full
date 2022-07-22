import classnames from 'classnames';
import { Menu, Grid, List } from 'react-feather';
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import {ActionCreator} from '@reduxjs/toolkit';
import {InitialStateType} from '../models/InitialStateType';
import {getProducts} from '../store';
import {Dispatch, SetStateAction} from 'react';

export type ProductsHeaderProps = {
  store: InitialStateType;
  dispatch: ActionCreator<any>;
  activeView: string;
  getProducts: getProducts;
  setActiveView: Dispatch<SetStateAction<string>>;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const ProductsHeader = (props: ProductsHeaderProps) => {
  const {
    activeView,
    setActiveView,
    dispatch,
    getProducts,
    store,
    setSidebarOpen,
  } = props;

  // ** Sorting obj
  const sortToggleText = {
    'price-desc': 'Highest',
    'price-asc': 'Lowest',
    featured: 'Featured',
  };

  return (
    <div className='ecommerce-header'>
      <Row>
        <Col sm='12'>
          <div className='ecommerce-header-items'>
            <div className='result-toggler'>
              <button className='navbar-toggler shop-sidebar-toggler' onClick={() => setSidebarOpen(true)}>
                <span className='navbar-toggler-icon d-block d-lg-none'>
                  <Menu size={14} />
                </span>
              </button>
              <span className='search-results'>{store.totalProducts} Results Found</span>
            </div>
            <div className='view-options d-flex'>
              <UncontrolledButtonDropdown className='dropdown-sort'>
                <DropdownToggle className='text-capitalize me-1' color='primary' outline caret>
                  {sortToggleText[store.params.sortBy as keyof typeof sortToggleText]}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className='w-100'
                    onClick={() => dispatch(getProducts({ ...store.params, sortBy: 'featured' }))}
                  >
                    Featured
                  </DropdownItem>
                  <DropdownItem
                    className='w-100'
                    onClick={() => dispatch(getProducts({ ...store.params, sortBy: 'price-asc' }))}
                  >
                    Lowest
                  </DropdownItem>
                  <DropdownItem
                    className='w-100'
                    onClick={() => dispatch(getProducts({ ...store.params, sortBy: 'price-desc' }))}
                  >
                    Highest
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <ButtonGroup>
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn grid-view-btn', {
                    active: activeView === 'grid',
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('grid')}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn list-view-btn', {
                    active: activeView === 'list',
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('list')}
                >
                  <List size={18} />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsHeader;
