import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { ChevronLeft, ChevronRight } from 'react-feather';

const PaginationInfo = () => {
  return (
    <Pagination className='d-flex mt-3' listClassName='pagination-info'>
      <PaginationItem>
        <PaginationLink href='#' onClick={e => e.preventDefault()} first>
          <ChevronLeft size={15} />
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href='#' onClick={e => e.preventDefault()}>
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href='#' onClick={e => e.preventDefault()}>
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href='#' onClick={e => e.preventDefault()}>
          3
        </PaginationLink>
      </PaginationItem>
      <PaginationItem active>
        <PaginationLink href='#' onClick={e => e.preventDefault()}>
          4
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href='#' onClick={e => e.preventDefault()}>
          5
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href='#' onClick={e => e.preventDefault()}>
          6
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href='#' onClick={e => e.preventDefault()}>
          7
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href='#' onClick={e => e.preventDefault()} last>
          <ChevronRight size={15} />
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};
export default PaginationInfo;
