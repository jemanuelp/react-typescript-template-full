import {ChangeEvent, Fragment} from 'react';
import MailCard from './MailCard';
import MailDetails from './MailDetails';
import ComposePopUp from './ComposePopup';
import {formatDateToMonthShort} from '../../../utility/Utils';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {Menu, Search, Folder, Tag, Mail, Trash, Edit2, Info} from 'react-feather';
import {
  Input,
  Label,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import {IEmail} from './interfaces/IEmail';
import {
  EmailState,
  getMails,
  paginateMail, resetSelectedMail,
  selectAllMail,
  selectCurrentMail,
  selectMail,
  updateMailLabel,
  updateMails,
} from './store';
import {labelColors} from './interfaces/Colors';

export type MailsProptypes = {
  store: EmailState;
  query: string;
  setQuery: Function;
  dispatch: any;
  getMails: getMails;
  openMail: boolean;
  selectMail: selectMail;
  setOpenMail: Function;
  updateMails: updateMails;
  composeOpen: boolean;
  paginateMail: paginateMail;
  selectAllMail: selectAllMail;
  toggleCompose: Function;
  setSidebarOpen: Function;
  updateMailLabel: updateMailLabel;
  selectCurrentMail: selectCurrentMail;
  resetSelectedMail: resetSelectedMail;
}

const Mails = (props: MailsProptypes) => {
  const {
    query,
    store,
    openMail,
    setQuery,
    dispatch,
    selectMail,
    composeOpen,
    updateMails,
    setOpenMail,
    paginateMail,
    selectAllMail,
    toggleCompose,
    setSidebarOpen,
    updateMailLabel,
    resetSelectedMail,
    selectCurrentMail,
  } = props;

  const {mails, selectedMails} = store;

  // ** Handles Update Functions
  const handleMailClick = (id: number) => {
    dispatch(selectCurrentMail(id));
    setOpenMail(true);
  };

  // ** Handles SelectAll
  const handleSelectAll = (e: any) => {
    dispatch(selectAllMail(e.target.checked));
  };

  // ** Handles Folder Update
  const handleFolderUpdate = (e: any, folder: any, ids = selectedMails) => {
    e.preventDefault();
    dispatch(updateMails({emailIds: ids, dataToUpdate: {folder}}));
    dispatch(resetSelectedMail());
  };

  // ** Handles Label Update
  const handleLabelsUpdate = (e: any, label: string, ids = selectedMails) => {
    e.preventDefault();
    dispatch(updateMailLabel({emailIds: ids, label}));
    dispatch(resetSelectedMail());
  };

  // ** Handles Mail Read Update
  const handleMailReadUpdate = (arr: any[], bool: boolean) => {
    dispatch(updateMails({emailIds: arr, dataToUpdate: {isRead: bool}})).then(
      () => dispatch(resetSelectedMail()),
    );
    dispatch(selectAllMail(false));
  };

  // ** Handles Move to Trash
  const handleMailToTrash = (ids: number[]) => {
    dispatch(updateMails({emailIds: ids, dataToUpdate: {folder: 'trash'}}));
    dispatch(resetSelectedMail());
  };

  // ** Renders Mail
  const renderMails = () => {
    if (mails.length) {
      return <>
        {
          mails.map((mail: IEmail, index: number) => {
            return (
              <MailCard
                mail={mail}
                key={index}
                dispatch={dispatch}
                selectMail={selectMail}
                updateMails={updateMails}
                labelColors={labelColors}
                selectedMails={selectedMails}
                handleMailClick={handleMailClick}
                handleMailReadUpdate={handleMailReadUpdate}
                formatDateToMonthShort={formatDateToMonthShort}
              />
            );
          })
        }
      </>;
    }
  };

  return (
    <Fragment>
      <div className='email-app-list'>
        <div className='app-fixed-search d-flex align-items-center'>
          <div className='sidebar-toggle d-block d-lg-none ms-1' onClick={() => setSidebarOpen(true)}>
            <Menu size='21'/>
          </div>
          <div className='d-flex align-content-center justify-content-between w-100'>
            <InputGroup className='input-group-merge'>
              <InputGroupText>
                <Search className='text-muted' size={14}/>
              </InputGroupText>
              <Input
                id='email-search'
                placeholder='Search email'
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
        <div className='app-action'>
          <div className='action-left form-check'>
            <Input
              type='checkbox'
              id='select-all'
              onChange={handleSelectAll}
              checked={Boolean(
                selectedMails.length && selectedMails.length === mails.length,
              )}
            />
            <Label className='form-check-label fw-bolder ps-25 mb-0' for='select-all'>
                Select All
            </Label>
          </div>
          {selectedMails.length ?
            (
              <div className='action-right'>
                <ul className='list-inline m-0'>
                  <li className='list-inline-item me-1'>
                    <UncontrolledDropdown>
                      <DropdownToggle tag='span'>
                        <Folder size={18}/>
                      </DropdownToggle>
                      <DropdownMenu end>
                        <DropdownItem
                          tag='a'
                          href='/'
                          onClick={e => handleFolderUpdate(e, 'draft')}
                          className='d-flex align-items-center'
                        >
                          <Edit2 className='me-50' size={18}/>
                          <span>Draft</span>
                        </DropdownItem>
                        <DropdownItem
                          tag='a'
                          href='/'
                          onClick={e => handleFolderUpdate(e, 'spam')}
                          className='d-flex align-items-center'
                        >
                          <Info className='me-50' size={18}/>
                          <span>Spam</span>
                        </DropdownItem>
                        <DropdownItem
                          tag='a'
                          href='/'
                          onClick={e => handleFolderUpdate(e, 'trash')}
                          className='d-flex align-items-center'
                        >
                          <Trash className='me-50' size={18}/>
                          <span>Trash</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                  <li className='list-inline-item me-1'>
                    <UncontrolledDropdown>
                      <DropdownToggle tag='span'>
                        <Tag size={18}/>
                      </DropdownToggle>
                      <DropdownMenu end>
                        <DropdownItem
                          tag='a'
                          href='/'
                          onClick={e => handleLabelsUpdate(e, 'personal')}
                          className='d-flex align-items-center'
                        >
                          <span className='bullet bullet-success bullet-sm me-50'/>
                          <span>Personal</span>
                        </DropdownItem>
                        <DropdownItem
                          tag='a'
                          href='/'
                          onClick={e => handleLabelsUpdate(e, 'company')}
                          className='d-flex align-items-center'
                        >
                          <span className='bullet bullet-primary bullet-sm me-50'/>
                          <span>Company</span>
                        </DropdownItem>
                        <DropdownItem
                          tag='a'
                          href='/'
                          onClick={e => handleLabelsUpdate(e, 'important')}
                          className='d-flex align-items-center'
                        >
                          <span className='bullet bullet-warning bullet-sm me-50'/>
                          <span>Important</span>
                        </DropdownItem>
                        <DropdownItem
                          tag='a'
                          href='/'
                          onClick={e => handleLabelsUpdate(e, 'private')}
                          className='d-flex align-items-center'
                        >
                          <span className='bullet bullet-danger bullet-sm me-50'/>
                          <span>Private</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                  <li className='list-inline-item me-1'>
                    <span className='action-icon' onClick={() => handleMailReadUpdate(selectedMails, false)}>
                      <Mail size={18}/>
                    </span>
                  </li>
                  <li className='list-inline-item'>
                    <span className='action-icon' onClick={() => handleMailToTrash(selectedMails)}>
                      <Trash size={18}/>
                    </span>
                  </li>
                </ul>
              </div>
            ) :
            null}
        </div>

        <PerfectScrollbar className='email-user-list' options={{wheelPropagation: false}}>
          {mails.length ?
            (
              <ul className='email-media-list'>{renderMails()}</ul>
            ) :
            (
              <div className='no-results d-block'>
                <h5>No Items Found</h5>
              </div>
            )}
        </PerfectScrollbar>
      </div>
      <MailDetails
        openMail={openMail}
        dispatch={dispatch}
        mail={store.currentMail}
        labelColors={labelColors}
        setOpenMail={setOpenMail}
        updateMails={updateMails}
        paginateMail={paginateMail}
        updateMailLabel={updateMailLabel}
        handleMailToTrash={handleMailToTrash}
        handleFolderUpdate={handleFolderUpdate}
        handleLabelsUpdate={handleLabelsUpdate}
        handleMailReadUpdate={handleMailReadUpdate}
        formatDateToMonthShort={formatDateToMonthShort}
      />
      <ComposePopUp composeOpen={composeOpen} toggleCompose={toggleCompose}/>
    </Fragment>
  );
};

export default Mails;