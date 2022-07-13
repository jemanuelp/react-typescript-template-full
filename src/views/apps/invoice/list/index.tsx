import {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import {columns} from './columns';
import {ChevronDown} from 'react-feather';
import DataTable from 'react-data-table-component';
import {Card} from 'reactstrap';
import {getData} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import '../../../../@core/scss/react/apps/app-invoice.scss';
import '../../../../@core/scss/react/libs/tables/react-dataTable-component.scss';
import {RootState} from '../../../../redux/reducers/RootReducer';
import CustomHeaderList from './CustomHeaderList';

const InvoiceList = () => {
  const dispatch = useDispatch<any>();
  const store = useSelector((state: RootState) => state.invoice);
  const [value, setValue] = useState('');
  const [sort, setSort] = useState('desc');
  const [sortColumn, setSortColumn] = useState<string>('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
      }),
    );
  }, [dispatch, store.data.length]);

  const handleFilter = (val: string) => {
    setValue(val);
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
      }),
    );
  };

  const handlePerPage = (e: any) => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        status: statusValue,
        perPage: parseInt(e.target.value),
      }),
    );
    setRowsPerPage(parseInt(e.target.value));
  };

  const handleStatusValue = (e: any) => {
    setStatusValue(e.target.value);
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: e.target.value,
      }),
    );
  };

  const handlePagination = (page: { selected: number }) => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        status: statusValue,
        perPage: rowsPerPage,
        page: page.selected + 1,
      }),
    );
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0));

    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ?
          currentPage - 1 :
          0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    );
  };

  const dataToRender = () => {
    const filters = {
      q: value,
      status: statusValue,
    };

    const isFiltered = Object.keys(filters).some(function(k) {
      return filters[k as keyof typeof filters].length > 0;
    });

    if (store.data.length > 0) {
      return store.data;
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
        sortColumn: column.sortField,
      }),
    );
  };

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown/>}
            className='react-dataTable'
            defaultSortFieldId='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeaderList
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
              />
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceList;
