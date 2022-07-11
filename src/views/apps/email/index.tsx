import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import Mails from './Mails';
import Sidebar from './Sidebar';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMails,
  selectMail,
  updateMails,
  paginateMail,
  selectAllMail,
  updateMailLabel,
  resetSelectedMail,
  selectCurrentMail,
} from './store';
import '../../../@core/scss/react/apps/app-email.scss';
import {RootState} from '../../../redux/reducers/RootReducer';

const EmailApp = () => {
  const [query, setQuery] = useState('');
  const [openMail, setOpenMail] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [composeOpen, setComposeOpen] = useState<boolean>(false);
  const toggleCompose = () => setComposeOpen(!composeOpen);
  const dispatch = useDispatch<any>();
  const store = useSelector((state: RootState) => state.email);
  const params = useParams();

  // ** UseEffect: GET initial data on Mount
  useEffect(() => {
    dispatch(getMails(
      { q: query || '', folder: params.folder || 'inbox', label: params.label || '' },
    ));
  }, [query, params.folder, params.label]);

  return (
    <Fragment>
      <Sidebar
        store={store}
        dispatch={dispatch}
        getMails={getMails}
        setOpenMail={setOpenMail}
        sidebarOpen={sidebarOpen}
        toggleCompose={toggleCompose}
        setSidebarOpen={setSidebarOpen}
        resetSelectedMail={resetSelectedMail}
      />
      <div className='content-right'>
        <div className='content-body'>
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen,
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <Mails
            store={store}
            query={query}
            setQuery={setQuery}
            dispatch={dispatch}
            getMails={getMails}
            openMail={openMail}
            selectMail={selectMail}
            setOpenMail={setOpenMail}
            updateMails={updateMails}
            composeOpen={composeOpen}
            paginateMail={paginateMail}
            selectAllMail={selectAllMail}
            toggleCompose={toggleCompose}
            setSidebarOpen={setSidebarOpen}
            updateMailLabel={updateMailLabel}
            selectCurrentMail={selectCurrentMail}
            resetSelectedMail={resetSelectedMail}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default EmailApp;
