import { useState, useEffect } from 'react';
import { columns } from './columns';
import DataTable from 'react-data-table-component';
import { ChevronDown, ExternalLink, Printer, FileText, File, Clipboard, Copy } from 'react-feather';
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import { getData } from '../../invoice/store';
import { useDispatch, useSelector } from 'react-redux';
import 'src/@core/scss/react/apps/app-invoice.scss';
import 'src/@core/scss/react/libs/tables/react-dataTable-component.scss';
import {RootState} from "../../../../redux/reducers/RootReducer";

const InvoiceList = () => {
  const dispatch = useDispatch<any>();
  const store = useSelector((state: RootState) => state.invoice);
  const [value] = useState('');
  const [rowsPerPage] = useState(6);
  const [currentPage] = useState(1);
  const [statusValue] = useState('');
  const [sort, setSort] = useState('desc');
  const [sortColumn, setSortColumn] = useState('id');

  useEffect(() => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue
      })
    );
  }, [dispatch, store.data.length]);

  const dataToRender = () => {
    const filters = {
      status: statusValue,
      q: value
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k as keyof typeof filters].length > 0;
    });

    if (store.data.length > 0) {
      return store.data.slice(0, rowsPerPage);
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column: any, sortDirection: any) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    );
  };

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <CardHeader className='py-1'>
          <CardTitle tag='h4'>Invoices</CardTitle>
          <UncontrolledButtonDropdown>
            <DropdownToggle color='secondary' outline caret>
              <ExternalLink className='font-small-4 me-50' />
              <span>Export</span>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem className='w-100'>
                <Printer className='font-small-4 me-50' />
                <span>Print</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <FileText className='font-small-4 me-50' />
                <span>CSV</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <File className='font-small-4 me-50' />
                <span>Excel</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <Clipboard className='font-small-4 me-50' />
                <span>PDF</span>
              </DropdownItem>
              <DropdownItem className='w-100'>
                <Copy className='font-small-4 me-50' />
                <span>Copy</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </CardHeader>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            sortServer
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortFieldId={'invoiceId'}
          />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceList;
