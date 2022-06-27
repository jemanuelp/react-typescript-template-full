import { Fragment, useState, useEffect } from 'react';
import Chat from './Chat';
import Sidebar from './SidebarLeft';
import UserProfileSidebar from './UserProfileSidebar';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, getChatContacts } from './store';
import 'src/@core/scss/base/pages/app-chat.scss';
import 'src/@core/scss/base/pages/app-chat-list.scss';
import {RootState} from "../../../redux/reducers/RootReducer";
import {IUser} from "../../../domains/interfaces/IUser";

const AppChat = () => {
  const dispatch = useDispatch<any>();
  const store = useSelector((state: RootState) => state.chat);
  const [user, setUser] = useState({});
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [userSidebarRight, setUserSidebarRight] = useState<boolean>(false);
  const [userSidebarLeft, setUserSidebarLeft] = useState<boolean>(false);

  // ** Sidebar & overlay toggle functions
  const handleSidebar = () => setSidebar(!sidebar);
  const handleUserSidebarLeft = () => setUserSidebarLeft(!userSidebarLeft);
  const handleUserSidebarRight = () => setUserSidebarRight(!userSidebarRight);
  const handleOverlayClick = () => {
    setSidebar(false);
    setUserSidebarRight(false);
    setUserSidebarLeft(false);
  };

  // ** Set user function for Right Sidebar
  const handleUser = (obj: IUser) => setUser(obj);

  // ** Get data on Mount
  useEffect(() => {
    dispatch(getChatContacts());
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <Fragment>
      <Sidebar
        store={store}
        sidebar={sidebar}
        handleSidebar={handleSidebar}
        userSidebarLeft={userSidebarLeft}
        handleUserSidebarLeft={handleUserSidebarLeft}
      />
      <div className='content-right'>
        <div className='content-wrapper'>
          <div className='content-body'>
            <div
              className={classnames('body-content-overlay', {
                show: userSidebarRight || sidebar || userSidebarLeft
              })}
              onClick={handleOverlayClick}
            ></div>
            <Chat
              store={store}
              handleUser={handleUser}
              handleSidebar={handleSidebar}
              userSidebarLeft={userSidebarLeft}
              handleUserSidebarRight={handleUserSidebarRight}
            />
            <UserProfileSidebar
              user={user}
              userSidebarRight={userSidebarRight}
              handleUserSidebarRight={handleUserSidebarRight}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppChat;
