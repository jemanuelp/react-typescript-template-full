import {X} from 'react-feather';
import Proptypes from 'prop-types';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {SidebarPropTypes} from './interfaces/SidebarProptypes';

const Sidebar = (props: SidebarPropTypes) => {
  const {
    open,
    size,
    title,
    width,
    children,
    closeBtn,
    className,
    toggleSidebar,
    bodyClassName,
    contentClassName,
    wrapperClassName,
    headerClassName,
    ...rest
  } = props;

  // ** If user passes custom close btn render that else default close btn
  const renderCloseBtn = closeBtn ?
    closeBtn :
    <X className='cursor-pointer' size={15} onClick={() => toggleSidebar}/>;

  const classNameModal = className ?
    classnames({
      [className]: className,
      'sidebar-lg': size === 'lg',
      'sidebar-sm': size === 'sm',
    }) :
    '';
  return (
    <Modal
      isOpen={open}
      toggle={() => toggleSidebar}
      contentClassName={classnames('overflow-hidden', {
        // @ts-ignore
        [contentClassName]: contentClassName,
      })}
      modalClassName={classnames('modal-slide-in', {
        // @ts-ignore
        [wrapperClassName]: wrapperClassName,
      })}
      className={classNameModal}

      {...(width !== undefined ?
        {
          style: {width: `${String(width)}px`},
        } :
        {})}
      {...rest}
    >
      <ModalHeader
        className={classnames({
          // @ts-ignore
          [headerClassName]: headerClassName,
        })}
        toggle={() => toggleSidebar}
        close={renderCloseBtn}
        tag='div'
      >
        <h5 className='modal-title'>
          <span className='align-middle'>{title}</span>
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{wheelPropagation: false}}>
        <ModalBody
          className={classnames('flex-grow-1', {
            // @ts-ignore
            [bodyClassName]: bodyClassName,
          })}
        >
          {children}
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  className: Proptypes.string,
  bodyClassName: Proptypes.string,
  open: Proptypes.bool.isRequired,
  title: Proptypes.string.isRequired,
  contentClassName: Proptypes.string,
  wrapperClassName: Proptypes.string,
  children: Proptypes.any.isRequired,
  size: Proptypes.oneOf(['sm', 'lg']),
  toggleSidebar: Proptypes.func.isRequired,
  width: Proptypes.oneOfType([Proptypes.number, Proptypes.string]),
};
