import {Button, Col, Input, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {ChangeEvent, EventHandler} from 'react';

export type CustomHeaderProps = {
  handleFilter: Function;
  value: string;
  handleStatusValue: EventHandler<ChangeEvent<HTMLInputElement>>;
  statusValue: string;
  handlePerPage: EventHandler<ChangeEvent<HTMLInputElement>>;
  rowsPerPage: number;
}

const CustomHeaderList = ({
  handleFilter,
  value,
  handleStatusValue,
  statusValue,
  handlePerPage,
  rowsPerPage,
}: CustomHeaderProps) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center me-2'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              className='form-control ms-50 pe-3'
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
          </div>
          <Button tag={Link} to='/apps/invoice/add' color='primary'>
              Add Record
          </Button>
        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <label htmlFor='search-invoice'>Search</label>
            <Input
              id='search-invoice'
              className='ms-50 me-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='Search Invoice'
            />
          </div>
          <Input className='w-auto ' type='select' value={statusValue} onChange={handleStatusValue}>
            <option value=''>Select Status</option>
            <option value='downloaded'>Downloaded</option>
            <option value='draft'>Draft</option>
            <option value='paid'>Paid</option>
            <option value='partial payment'>Partial Payment</option>
            <option value='past due'>Past Due</option>
            <option value='sent'>Sent</option>
          </Input>
        </Col>
      </Row>
    </div>
  );
};

export default CustomHeaderList;